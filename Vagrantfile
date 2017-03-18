# ansibleインストール用shell
$ansible_install = <<SHELL
    if ! type ansible > /dev/null 2>&1; then
      sudo apt-get update
      sudo apt-get -y install libffi-dev libssl-dev python-pip # package管理ツール
      sudo pip install --upgrade pip
      sudo pip install ansible           # provisioning ツール
    fi
SHELL

# virtual machine設定
Vagrant.configure(2) do |config|
  # 使用するディストリビューションのボックスの設定
  config.vm.box = "bento/ubuntu-16.04"

  # ネットワーク設定。
  # 繋がらないときは/etc/network/interfaces を確認。enp0s8に設定してやる。
  config.vm.network "private_network", ip: "192.168.50.10", auto_config:false
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  # 共有するフォルダの設定
  # config.vm.synced_folder 'angular2', '/home/vagrant/angular2'
  
  # 使用するメモリ容量を変更。
  # デフォルトだと512で少ないためdockerのbuildが失敗しやすい
  config.vm.provider "virtualbox" do |vm|
    # メモリを1024MBに設定
    vm.memory = 2048
    # Vagrant1.8から利用出来るLinked Cloneをオンにする。
    vm.linked_clone = true
    # vm.cpus = 2
    vm.customize [ "modifyvm", :id, "--ioapic", "on"]
    # ↓起動が止まるときの確認用
    # vm.gui = true
  end

  # vagrant provision を行ったときに以下のエラーが出る対策
  # mesg: ttyname failed: Inappropriate ioctl for device
  # config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
  
  # ansibleをインストール
  config.vm.provision "shell", inline: $ansible_install
  # ansibleを実行
  config.vm.provision "shell", inline: <<-SHELL
    # provision 実行
    sudo ansible-playbook -i /vagrant/provision/playbooks/inventory/hosts /vagrant/provision/playbooks/site.yml -c local
  SHELL
end
