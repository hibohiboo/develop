# -*- coding: utf-8 -*-
# Unicorn設定ファイル
# 次のURLのサンプルをベースにしている。
# http://unicorn.bogomips.org/examples/unicorn.conf.rb

# 専用サーバーであればコアにつき1個以上を指定する。
worker_processes 3

# リクエスト待ち受け口、TCPとUNIXドメインとが指定可能。
listen "{{ redmine_dir }}/tmp/sockets/unicorn.sock", :backlog => 32
listen 8282, :tcp_nopush => true

# タイムアウト秒数
timeout 30

# 稼働中のプロセスのPIDを書いておくファイル。
pid "{{ redmine_dir }}/tmp/pids/unicorn.pid"

# デーモンで起動すると標準出力／標準エラー出力が/dev/nullになるので、
# それぞれログファイルに出力する。
stderr_path '{{ redmine_dir }}/log/unicorn.stderr.log'
stdout_path '{{ redmine_dir }}/log/unicorn.stdout.log'

# マスタープロセス起動時にアプリケーションをロードする(true時)。
# ワーカープロセス側でロードをしないのでメモリ消費、応答性良好になる。
# ただし、ソケットはfork後に開きなおす必要あり。
# HUPシグナルでアプリケーションはロードされない。
preload_app true

# unicornと同一ホスト上のクライアントとのコネクション限定で、維持されているかを
# アプリケーションを呼ぶ前にチェックする。
check_client_connection false

before_fork do |server, worker|
  # Railsでpreload_appをtrueにしているときは強く推奨
  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!
  
  # unicorn serviceスクリプト側で制御するのでここは一旦コメントアウト
  # 制御が確認できれば削除する予定
  # 新しいマスタープロセスを起動した後に古いマスタープロセスをQUITする
  #old_pid = "#{server.config[:pid]}.oldbin"
  #if old_pid != server.pid
  #  begin
  #    sig = (worker.nr + 1) >= server.worker_processes ? :QUIT : :TTOU
  #      Process.kill(sig, File.read(old_pid).to_i)
  #  rescue Errno::ENOENT, Errno::ESRCH
  #  end
  #end
  #
  #sleep 1
end

after_fork do |server, worker|
  # Railsでpreload_appをtrueにしているときは必須
  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.establish_connection

  begin
    uid, gid = Process.euid, Process.egid
    user, group = "redmine", "redmine"
    ENV["HOME"] = "/home/redmine"
    target_uid = Etc.getpwnam(user).uid
    target_gid = Etc.getgrnam(group).gid
    worker.tmp.chown(target_uid, target_gid)
    if uid != target_uid or gid != target.gid
      Process.initgroups(user, target_gid)
      Process::GID.change_privilege(target_gid)
      Process::UID.change_privilege(target_uid)
    end
  rescue
    if RAILS_ENV = "development"
      STDERR.puts "could not change user, oh well"
    else
      STDERR.puts "could not change user, oh well"
      raise e
    end
  end
end