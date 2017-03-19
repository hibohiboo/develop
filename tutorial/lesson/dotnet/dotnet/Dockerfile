FROM microsoft/aspnetcore-build
WORKDIR /aspnetapp
# COPY ./project/src/SampleWebApplication ./project/src/SampleWebApplication
# WORKDIR /aspnetapp/project/src/SampleWebApplication
# RUN dotnet restore
# RUN bower install --allow-root
# ENTRYPOINT ["dotnet", "run"]
COPY ./project/src/aspnetcoreapp ./project/src/aspnetcoreapp
WORKDIR /aspnetapp/project/src/aspnetcoreapp
RUN dotnet restore

ENTRYPOINT ["dotnet", "run"]