# wallpaper

wallpaper is a cross-platform javascript application that can change your wallpaper with a simple command line:

    # OS X / Linux
    $ wallpaper --source bing
    $ wallpaper --source http://awesome.org/wallpaper.jpg
    
    # Windows
    > wallpaper --source bing --style Fill

wallpaper supports custom image source. The **lib/sources/bing.js** was provided by default while you can custom your source from other websites, see **lib/sources/your.js** for more information.

# Installtion

## Download

You can download the latest source files from the [Releases](https://github.com/micooz/wallpaper/releases) page.

## Use NPM

If you have had npm installed, you can simply type the command to install wallpaper globally:

    $ npm install -g wallpaper-js
   
# Usage

    $ wallpaper --help
    
    Usage: node wallpaper [options]
    
    Options:
       -h, --help    show help information.
       -s, --style   the wallpaper style[Tile, Center, Stretch, Fit, Fill], Windows Only.  [Stretch]
       --source      the wallpaper source, support imageset[bing, ...] (see lib/sources/) OR uri  [bing]

# Principles

## Windows

On **Windows** platform, there is no direct way in nodejs to set wallpaper. The best solution is make use of Windows API, so I provided a binary executable `wallpaper.exe` as well as C++ sources to do this.

## OS X

There are many solutions to change wallpaper on OS X, but some of them are for older versions of the system. On OS X 10.9+, thers is an SQLite database file **(~/Library/Application Support/Dock/desktoppicture.db)** which manages the desktop background preferences including the wallpaper.

## Linux

Unfortunately, there are many desktop environment like GNOME, KDE on Linux. So the interfaces are totally different. To make it simple, just call the interfaces one by one until one of them succeed.

# Acknowledgement

* [q](https://github.com/kriskowal/q)
* [shelljs](http://github.com/arturadib/shelljs)
* [log4js](https://github.com/nomiddlename/log4js-node)
* [nomnom](http://github.com/harthur/nomnom)
* [sqlite3](http://github.com/mapbox/node-sqlite3)
* [urllib](http://github.com/node-modules/urllib)

# References

* http://1klb.com/posts/2013/11/02/desktop-background-on-os-x-109-mavericks/
* https://github.com/sindresorhus/linux-wallpaper
* https://code.msdn.microsoft.com/windowsdesktop/CppSetDesktopWallpaper-eb969505

# Issues / Contribution

You can easily make contribution through Github's Issue and PullRequest system：

Issues：https://github.com/micooz/wallpaper/issues

PullRequest：https://github.com/micooz/wallpaper/pulls

# Author
Micooz: micooz@hotmail.com

# License
The MIT License