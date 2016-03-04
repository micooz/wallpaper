#!/usr/bin/env bash
#http://askubuntu.com/questions/414422/command-to-change-the-wallpaper-in-xubuntu

connectedOutputs=$(xrandr | grep " connected" | sed -e "s/\([A-Z0-9]\+\) connected.*/\1/")
activeOutput=$(xrandr | grep -e " connected [^(]" | sed -e "s/\([A-Z0-9]\+\) connected.*/\1/") 
connected=$(echo $connectedOutputs | wc -w)

xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitor0/image-path -n -t string -s  $1
xfconf-query -c xfce4-desktop -p /backdrop/screen0/monitorLVDS1/workspace0/last-image -n -t string -s  $1

for i in $(xfconf-query -c xfce4-desktop -p /backdrop -l|egrep -e "screen.*/monitor.*image-path$" -e "screen.*/monitor.*/last-image$"); do
    xfconf-query -c xfce4-desktop -p $i -n -t string -s $1 
    xfconf-query -c xfce4-desktop -p $i -s $1
done