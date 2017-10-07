@echo off
rem 管理者としてinit/init.batファイルを実行
powershell.exe -Command Start-Process """%~dp0%\init\init.bat""" -Verb Runas
