import * as fs from 'fs';
import * as path from 'path'
import { SampleStack } from '../sample-stack';
const launchFilePath = path.resolve(process.cwd(), '..', '.vscode', 'launch.json');
const assetPlaceHolder = 'ASSET_PATH';
const debugPort = 5858;
const configuration = {
  "type": "node",
  "request": "attach",
  "name": "",
  "port": debugPort,
  "address": "localhost",
  "localRoot": "${workspaceFolder}/cdk/cdk.out/" + assetPlaceHolder,
  "remoteRoot": "/var/task",
  "protocol": "inspector",
}
type Config = typeof configuration
export const createLaunch = async (stack: SampleStack) => {
  const buf = fs.readFileSync(path.join(process.cwd(), 'cdk.out', stack.templateFile))
  const template = JSON.parse(buf.toString());
  const resources = template.Resources;
  const confs: Config[] = [];

  for (const prop in resources) {
    if (resources[prop].Type !== 'AWS::Lambda::Function') continue

    confs.push({
      ...configuration,
      name: `lambda ${prop}`,
      localRoot: configuration.localRoot.replace(assetPlaceHolder, resources[prop].Metadata['aws:asset:path'])
    })
  }

  const launch = {
    "version": "0.2.0",
    "configurations": confs
  }
  fs.writeFileSync(launchFilePath, JSON.stringify(launch))
}