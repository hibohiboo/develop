# dotnet

dockerでインストール。

Dockerfile.

```docker
FROM microsoft/dotnet:1.1.1-sdk

WORKDIR /dotnetapp
RUN git clone https://github.com/dotnet/dotnet-docker-samples
WORKDIR /dotnetapp/dotnet-docker-samples/dotnetapp-dev
RUN dotnet restore
ENTRYPOINT ["dotnet", "run"]
```

dotnet runをして、ASP.netではないことに気づく。

## 参照

[dotnet docker][*1]

[*1]:https://github.com/dotnet/dotnet-docker