---
layout: post
title:  "Installing Terminator on Ubuntu 14.04"
date:   2015-11-15 10:30:00 CET
tags:   howto install ubuntu terminal
---

If you are one (like myself) who

* works on Linux - using especially command-line tools
* does coding and sysadmin tasks
* wants a tool for arranging as many terminals as possible on the screen

then [Gnome Terminator](http://gnometerminator.blogspot.it/p/introduction.html) is the program you probably need.

### Install Terminator package in Ubuntu (or Debian)

Terminator is now a native package of Debian and Ubuntu

```
$ sudo apt-get install terminator
```

Notice that this may be not the most recent version.

### Install Terminator using Ubuntu PPA

You may get the very latest Terminator from Ubuntu PPA:

```
$ sudo add apt-repository ppa:gnome-terminator
$ sudo apt-get update
$ sudo apt-get install terminator
```

### Run Terminator inside a container

You may also choose run Terminator inside a Docker container.

I will explore this option in a future post. Stay tuned!

### See also

* [Gnome Terminator Home Page](http://gnometerminator.blogspot.it/)
* [Terminator in Launchpad](https://launchpad.net/terminator)
* [PPA for Terminator](https://launchpad.net/~gnome-terminator/+archive/ubuntu/ppa)

<!-- EOF -->
