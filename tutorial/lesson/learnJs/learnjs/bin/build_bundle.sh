#!/bin/bash -x

  check_node_deps
#  pushd services
#  rm archive.zip
#  npm install || exit 1
  mkdir -p dist
  cp -r node_modules dist/
  cp -r lib/* dist/
  cd dist
  chmod -R a+r *
  zip -r archive.zip *
#  mv archive.zip ..
  mv archive.zip /dist/
#  cd ..
#  rm -rf dist
#  popd