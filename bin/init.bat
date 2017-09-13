@echo off

rem 文字コードをutf8で表示しようとしたが、日本語対応が難しかったので素直にShift JISで保存
rem chcp 65001

rem カレントディレクトリをバッチの置いてあるディレクトリに変更
set currentDir=%~dp0

rem chocolateyインストール
echo chocolateyインストール
if exist "%ALLUSERSPROFILE%\chocolatey\bin\" (
    WHERE /Q choco
    if %ERRORLEVEL% == 0 (
        echo chocolateyインストール済み
        goto chocoend
    )
)
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

:chocoend


echo gitインストール
choco install -y git

rem goto end

echo gitの設定の開始

rem redmine用git_hookの設定を行う
rem echo コミット時にredmineのチケットと紐づける数字をブランチ名から取得してコミットメッセージに追加
rem copy %currentDir%\git\commit-msg %currentDir%\..\.git\hooks\commit-msg
rem copy %currentDir%\git\common.sh %currentDir%\..\.git\hooks\common.sh
rem echo develop, masterブランチ及びfix/#0/hoge以外の形式のブランチ名のコミットを禁止
rem copy %currentDir%\git\pre-commit %currentDir%\..\.git\hooks\pre-commit

echo git保存時にcrlfを変更しないようにする
echo aliasを以下のように設定する
echo "git checkout -> git co | git status -> git st" 
echo "git branch -> git br | git log -> git hist"
copy %currentDir%\git\config %currentDir%\..\.git\config

echo gitkの文字化け対策
git config --global gui.encoding utf-8

echo virtualboxインストール
choco install -y virtualbox

echo vagrantインストール
choco install -y vagrant

echo visual studio code インストール
choco install -y visualstudiocode-insiders --pre

:end
echo 初期設定を完了しました
pause > nul
exit
