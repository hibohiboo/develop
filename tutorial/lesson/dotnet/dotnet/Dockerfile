FROM microsoft/aspnetcore-build
WORKDIR /aspnetapp
COPY . .
WORKDIR /aspnetapp/project/src/SampleWebApplication
RUN dotnet restore
RUN bower install --allow-root
ENTRYPOINT ["dotnet", "run"]