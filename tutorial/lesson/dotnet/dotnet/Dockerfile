FROM microsoft/aspnetcore-build
WORKDIR /aspnetapp
COPY . .
WORKDIR /aspnetapp/project/src/SampleWebApplication
RUN dotnet restore
ENTRYPOINT ["dotnet", "run"]