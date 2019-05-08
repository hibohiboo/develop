FROM node:11.15.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app
# COPY ./* /app/
# RUN yarn install
RUN yarn add --dev \
  @angular/compiler-cli \
  @angular-devkit/build-angular \
  @angular/cli \
  @angular/language-service \
  @types/jasmine \
  @types/jasminewd2 \
  @types/node \
  codelyzer \
  jasmine-core \
  jasmine-spec-reporter \
  karma \
  karma-chrome-launcher \
  karma-coverage-istanbul-reporter \
  karma-jasmine \
  karma-jasmine-html-reporter \
  protractor \
  ts-node \
  tslint

RUN yarn add \
  @angular/animations \
  @angular/common \
  @angular/compiler \
  @angular/core \
  @angular/elements \
  @angular/forms \
  @angular/http \
  @angular/platform-browser \
  @angular/platform-browser-dynamic \
  @angular/router \
  rxjs \
  zone.js \
  document-register-element 

# ERROR in The Angular Compiler requires TypeScript >=3.1.1 and <3.3.0 but 3.4.5 was found instead.
RUN yarn add --dev typescript@3.2.x
# core-js 3.0系だとエラー
RUN yarn add core-js@2.6.x