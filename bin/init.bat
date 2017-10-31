@echo off

rem �����R�[�h��utf8�ŕ\�����悤�Ƃ������A���{��Ή�����������̂őf����Shift JIS�ŕۑ�
rem chcp 65001

rem �J�����g�f�B���N�g����o�b�`�̒u���Ă���f�B���N�g���ɕύX
set currentDir=%~dp0

rem chocolatey�C���X�g�[��
echo chocolatey�C���X�g�[��
if exist "%ALLUSERSPROFILE%\chocolatey\bin\" (
    WHERE /Q choco
    if %ERRORLEVEL% == 0 (
        echo chocolatey�C���X�g�[���ς�
        goto chocoend
    )
)
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

:chocoend


echo git�C���X�g�[��
choco install -y git

rem goto end

echo git�̐ݒ�̊J�n

rem redmine�pgit_hook�̐ݒ��s��
rem echo �R�~�b�g����redmine�̃`�P�b�g�ƕR�Â��鐔����u�����`������擾���ăR�~�b�g���b�Z�[�W�ɒǉ�
rem copy %currentDir%\git\commit-msg %currentDir%\..\.git\hooks\commit-msg
rem copy %currentDir%\git\common.sh %currentDir%\..\.git\hooks\common.sh
rem echo develop, master�u�����`�y��fix/#0/hoge�ȊO�̌`���̃u�����`���̃R�~�b�g��֎~
rem copy %currentDir%\git\pre-commit %currentDir%\..\.git\hooks\pre-commit

echo git�ۑ�����crlf��ύX���Ȃ��悤�ɂ���
echo alias��ȉ��̂悤�ɐݒ肷��
echo "git checkout -> git co | git status -> git st" 
echo "git branch -> git br | git log -> git hist"
copy %currentDir%\git\config %currentDir%\..\.git\config

echo gitk�̕��������΍�
git config --global gui.encoding utf-8

echo virtualbox�C���X�g�[��
choco install -y virtualbox

echo vagrant�C���X�g�[��
choco install -y vagrant

echo visual studio code �C���X�g�[��
choco install -y visualstudiocode --pre

:end
echo �����ݒ������܂���
pause > nul
exit
