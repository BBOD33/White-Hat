@echo off
cls
echo Bu skript sizi hatalardan ve kapanmalardan kurtar�r!
title Bot AnaPanel
:StartServer
node bot.js
echo (%time%) Bot hata verdi veya kapand�, yeniden ba�l�yor...
goto StartServer
