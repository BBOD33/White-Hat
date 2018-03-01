@echo off
cls
echo Bu skript sizi hatalardan ve kapanmalardan kurtarýr!
title Bot AnaPanel
:StartServer
node bot.js
echo (%time%) Bot hata verdi veya kapandý, yeniden baþlýyor...
goto StartServer
