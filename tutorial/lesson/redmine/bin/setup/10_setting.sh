#!/bin/bash
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/../.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)

cd $docker_dir && export $(cat .env | grep -v ^\# | xargs); \
cat << '_EOQ_' | docker exec --interactive mysql mysql $REDMINE_DB_DATABASE && \
docker exec redmine passenger-config restart-app /usr/src/redmine
INSERT INTO `settings` (`name`, `value`) VALUES
('search_results_per_page','30'), -- ページごとの検索結果表示件数 (10)
('host_name','redmine.example.com'), -- ホスト名とパス (localhost:3000)
('protocol','https'), -- プロトコル (http)
('text_formatting','markdown'), -- テキスト書式 (textile)
('default_language','ja'), -- デフォルトの言語 (en)
('force_default_language_for_anonymous','1'), -- 匿名ユーザーにデフォルトの言語を強制 (0)
('force_default_language_for_loggedin','1'), -- ログインユーザーにデフォルトの言語を強制 (0)
('user_format','lastname_firstname'), -- ユーザー名の表示形式 (firstname_lastname)
('thumbnails_enabled','1'), -- 添付ファイルのサムネイル画像を表示 (0)
('login_required','1'), -- 認証が必要 (0)
('autologin','7'), -- 自動ログイン (0)
('max_additional_emails','0'), -- 追加メールアドレス数の上限 (5)
('session_lifetime','43200'), -- 有効期間の最大値 (0)
('session_timeout','480'), -- 無操作タイムアウト (0)
('default_users_time_zone','Tokyo'), -- タイムゾーン ()
('rest_api_enabled','1'), -- RESTによるWebサービスを有効にする (0)
('jsonp_enabled','1'), -- JSONPを有効にする (0)
('default_projects_public','0'), -- デフォルトで新しいプロジェクトは公開にする (1)
('default_projects_modules','---
- issue_tracking
- time_tracking
- wiki
- repository
- calendar
- gantt
'), -- 新規プロジェクトにおいてデフォルトで有効になるモジュールチケットトラッキング
('default_projects_tracker_ids','---
- \'1\'
- \'2\'
- \'3\'
'), -- 新規プロジェクトにおいてデフォルトで有効になるトラッカー
('cross_project_issue_relations','1'), -- 異なるプロジェクトのチケット間で関連の設定を許可 (0)
('default_issue_start_date_to_creation_date','0'), -- 現在の日付を新しいチケットの開始日とする (1)
('issue_done_ratio','issue_status'), -- 進捗率の算出方法 (issue_field)
('issue_list_default_totals','---
- estimated_hours
- spent_hours
'), -- チケットの一覧で表示する項目（合計）
('attachment_max_size','51200'), -- 添付ファイルサイズの上限 (5120)
('repositories_encodings','utf-8,cp932,euc-jp'), -- 添付ファイルとリポジトリのエンコーディング ()
('mail_from','admin@example.com'), -- 送信元メールアドレス (redmine@example.net)
('enabled_scm','---
- Git
'), -- 使用するバージョン管理システム
('commit_ref_keywords','refs,references,IssueID,*'), -- 参照用キーワード (refs,references,IssueID)
('commit_cross_project_ref','1'); -- 異なるプロジェクトのチケットの参照/修正を許可 (0)
_EOQ_