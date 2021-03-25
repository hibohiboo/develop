#!/usr/bin/env node
import * as childProcess from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path'

const bundlePath = './bundle';
export const NODE_LAMBDA_LAYER_DIR = path.resolve(process.cwd(), bundlePath);
const NODE_LAMBDA_LAYER_RUNTIME_DIR_NAME = `nodejs`;
const runtimeDirName = path.resolve(process.cwd(), `${bundlePath}/${NODE_LAMBDA_LAYER_RUNTIME_DIR_NAME}`);
const distFilePath = (file: string) => path.resolve(process.cwd(), `${bundlePath}/${NODE_LAMBDA_LAYER_RUNTIME_DIR_NAME}/${file}`)
const srcFilePath = (file: string) => path.resolve(`${process.cwd()}/../${file}`)

export const bundleNpm = () => {
  // create bundle directory
  copyPackageJson();

  // install package.json (production)
  childProcess.execSync(`npm install --production`, {
    cwd: getModulesInstallDirName(),
    // bundle時にパイプで出力するtemplate.yamlに、余分な文字列が含まれてしまわないように出力はオフ
    stdio: ['ignore', 'ignore', 'ignore'],
    env: { ...process.env },
    shell: 'bash'
  });
};

const copyPackageJson = () => {

  // copy package.json and package.lock.json
  fs.mkdirsSync(getModulesInstallDirName());
  ['package.json']
    .map(file => fs.copyFileSync(srcFilePath(file), distFilePath(file)));

};

const getModulesInstallDirName = (): string => {
  return runtimeDirName;
};
