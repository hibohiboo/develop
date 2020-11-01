## 手順
Azure Functionsのインストール。

以下のコマンドが実行される。
```
npm install -g azure-functions-core-tools@3
```

上記コマンドでは、デバッグ実行でつまずいたため、chocolateyからインストールする。

https://chocolatey.org/packages/azure-functions-core-tools
https://github.com/Azure/azure-functions-core-tools
※デバッグ実行のためには64bit版が必要

```
choco install azure-functions-core-tools-3 --params "'/x64'"
```

## 参考

[Visual Studio Code から Azure Functions をデプロイする](https://docs.microsoft.com/ja-jp/azure/developer/javascript/tutorial-vscode-serverless-node-01?tabs=bash)
[vscode-recipes](https://github.com/microsoft/vscode-recipes/blob/master/Docker-TypeScript/package.json)
[Functions ローカルデバッグ](https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-reference-node?tabs=v2#local-debugging)