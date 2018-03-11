@echo off

setlocal

set HTTPS_PROXY=http://127.0.0.1:7777

curl -o history https://omahaproxy.appspot.com/history

endlocal
