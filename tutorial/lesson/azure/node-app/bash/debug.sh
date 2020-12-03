#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)

cd $parent_dir
node --inspect-brk ./bin/www
# chromeのdeveloperツールでデバッグ可能
