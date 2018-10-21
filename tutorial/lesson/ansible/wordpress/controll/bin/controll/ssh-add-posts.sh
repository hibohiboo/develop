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


# サイト追加content=`cat $bin_dir/templates/post.html`
num=1
content="サンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプルサンプル"
$create --post_type=post --post_title="新規サイト開設のお知らせ" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="イベントのお知らせ:$((num++))月" --post_content="$content" --post_category='information'
num=1
$create --post_type=post --post_title="ルールブック$((num++))巻発売！" --post_content="$content" --post_category='book'
$create --post_type=post --post_title="ルールブック$((num++))巻発売！" --post_content="$content" --post_category='book'
$create --post_type=post --post_title="ルールブック$((num++))巻発売！" --post_content="$content" --post_category='book'
$create --post_type=post --post_title="ルールブック$((num++))巻発売！" --post_content="$content" --post_category='book'

$create --post_type=post --post_title="コンベンション情報のお知らせ:7月札幌" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="コンベンション情報のお知らせ:8月大阪" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="コンベンション情報のお知らせ:9月東京" --post_content="$content" --post_category='information'
$create --post_type=post --post_title="コンベンション情報のお知らせ:10月名古屋" --post_content="$content" --post_category='information'
