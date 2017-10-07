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

rem gitのインストールは必要ないのでコメントアウト
rem echo gitインストール
rem choco install git -y

rem goto end

echo gitの設定の開始

rem git_hookの設定を行う
echo コミット時にredmineのチケットと紐づける数字をブランチ名から取得してコミットメッセージに追加
copy %currentDir%\git\commit-msg %currentDir%\..\..\.git\hooks\commit-msg
copy %currentDir%\git\common.sh %currentDir%\..\..\.git\hooks\common.sh
echo develop, masterブランチ及びfix/#0/hoge以外の形式のブランチ名のコミットを禁止
copy %currentDir%\git\pre-commit %currentDir%\..\..\.git\hooks\pre-commit

echo git保存時にcrlfを変更しないようにする
echo aliasを以下のように設定する
echo "git checkout -> git co | git status -> git st" 
echo "git branch -> git br | git log -> git hist"
copy %currentDir%\git\config %currentDir%\..\..\.git\config


echo virtualboxインストール
choco install -y virtualbox

echo vagrantインストール
choco install -y vagrant

:end
echo 初期設定を完了しました
pause > nul
exit
