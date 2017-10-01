#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

cd $bin_dir/.. && docker-compose run pandoc /bin/bash -c "for f in *.md; do pandoc \$f -s -o ../dist/\${f%.md}.html; done"