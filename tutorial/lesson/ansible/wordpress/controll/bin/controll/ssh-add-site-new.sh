#!/bin/bash
# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

eval `ssh-agent`
ssh-add /home/vagrant/.ssh/id_rsa_web

address="192.168.74.60"
site="test"
site_user="testuser_wp"
site_email="test@gmail.com"
site_title=$site
site_options="--url=$address/$site/"
site_theme="twentyseventeen"
wp="ssh 192.168.74.60 -p 22 -l vagrant  /usr/local/bin/wp-cli.phar --path='/wordpress'"
$wp post list 
create="$wp post create --post_author=testuser_wp --post_status=publish --porcelain $site_options"

# サイト追加
$wp site create --slug=$site --title=$site_title --email=$site_email

# パーマリンク設定
$wp rewrite structure '/%category%/%post_id%' $site_options

# オプション設定
# wp option list | grep comment
# コメント受付をデフォルトでオフに
$wp option update default_comment_status closed $site_options
# ピン通知をオフに
$wp option update default_ping_status closed $site_options
$wp option update default_pingback_flag 0 $site_options
# # テーマ設定
$wp theme enable $site_theme --activate $site_options

# サンプル投稿削除
delete_id=`$wp post list --post_type=post --format=ids --name=hello-world $site_options | sed -n 2P `
$wp post delete $delete_id $site_options --force

# サンプル固定ページ削除
delete_id=`$wp post list --post_type=page --format=ids --name=sample-page $site_options | sed -n 2P `
$wp post delete $delete_id $site_options --force

# 未分類カテゴリの設定
$wp term update category 1 --name="コラム" --slug="column" $site_options

# サイトインポートプラグインのインストール
$wp plugin install wordpress-importer --activate

# プラグイン有効化
$wp plugin install wordpress-importer --activate $site_options
$wp plugin install wp-multibyte-patch --activate $site_options
