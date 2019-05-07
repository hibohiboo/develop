#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..

bash $parent_dir/react-app/bin/build.sh
bash $parent_dir/vue-app/bin/build.sh
