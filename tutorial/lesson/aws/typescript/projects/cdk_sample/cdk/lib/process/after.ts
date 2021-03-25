import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as fs from 'fs';
import * as path from 'path'
import { SampleStack } from '../sample-stack';
const launchFilePath = path.resolve(process.cwd(), '..', '.vscode', 'launch.json');
const assetIndex = 1;
const debugPort = 5858;
const configuration = {
  "type": "node",
  "request": "attach",
  "name": "api echo ",
  "port": debugPort,
  "address": "localhost",
  "localRoot": "${workspaceFolder}/cdk/cdk.out/ASSET_PATH",
  "remoteRoot": "/var/task",
  "protocol": "inspector",
}
export const createLaunch = async (stack: SampleStack) => {
  const confs = stack.node.children.filter((item): item is NodejsFunction => item instanceof NodejsFunction)
    .map((item: NodejsFunction) => ({
      ...configuration,
      // @ts-ignore
      name: `lambda ${item.physicalName} ${item.permissionsNode.uniqueId.replace(stack.stackName, '')}`, // uniqueIdはdeprecatedだが現在templateに出力されているので使う
      // @ts-ignore
      localRoot: configuration.localRoot.replace('ASSET_PATH', item.node.children[assetIndex].assetPath)
    }))
  const launch = {
    "version": "0.2.0",
    "configurations": confs
  }
  fs.writeFileSync(launchFilePath, JSON.stringify(launch))
}