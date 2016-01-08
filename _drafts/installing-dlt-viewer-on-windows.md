---
layout: post
title:  "Installing GENIVI DLT Viewer on Windows"
date:   2016-01-07 18:00:00 CET
categories: howto install genivi dlt qt5
---

This blog post explains how I installed the [GENIVI DLT Viewer](http://projects.genivi.org/diagnostic-log-trace) on my laptop running MS Windows 7.

The GENIVI DLT (Diagnostics Log and Trace) viewer is a Qt5 application available in source at  <http://projects.genivi.org/diagnostic-log-trace/download>

Read [INSTALL.txt](http://git.projects.genivi.org/?p=dlt-viewer.git;a=blob;f=INSTALL.txt;h=aa9f66ef82a1acd3df56ab97be74bf884a4eb0a9;hb=HEAD)

### Installing Qt5 SDK (including Qt Creator and MinGW)

<!-- (2016-01-08 09:51) -->

Browse <http://www.qt.io/download-open-source/> > Download Now

Double click `qt-unified-windows-x86-2.0.2-2-online.exe`

> Welcome to the Qt online installer
>
> The installer provides you with the option to download either an open source
> or commercial version of Qt

Click "Next"

> Qt Account - Your unified login to everything Qt

Click "Skip"

> Setup - Qt
>
> Welcome to open source Qt setup.

Click "Next"

> Qt Setup
>
> Installation Folder
> Please specify the folder where Qt will be installed

* Directory: `E:\opt\Qt` (was: `C:\Qt`)
* [X] Associate common file types with Qt Creator.

Click "Next"

Select Components

Accept the default options (Qt 5.5, Qt 5.4, Tools, all Qt Extras)

Read and agree to the License Agreement, click "Next"

Start Menu shortcuts: Select "Qt". Click "Next"

> Qt Setup
>
> Ready to Install
>
> Setup is now ready to begin installing Qt on your computer.
> Installation will use 5.98 GB of disk space.

<!-- (2016-01-08 09:57 CET) -->

Click "Install"

TODO

### Clone GENIVI DLT Viewer git repository

TODO


# OLD STUFF BELOW

Sample table

<!-- TIP: <http://www.tablesgenerator.com/markdown_tables> -->

| First | Last  | Role | Notes             |
|-------|-------|------|-------------------|
| John  | Doe   | CEO  | The big boss      |
| Mary  | Smith | CFO  | She got the money |

<!-- EOF -->
