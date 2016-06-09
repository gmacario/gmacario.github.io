---
layout: post
title:  "Installing GENIVI DLT Viewer on Windows"
date:   2016-01-08 14:00:00 CET
categories: howto install genivi dlt qt5
---

This blog post explains how I installed the [GENIVI DLT](http://projects.genivi.org/diagnostic-log-trace) (Diagnostics Log and Trace) Viewer on my laptop running MS Windows 7.

The GENIVI DLT viewer is a Qt5 application available in source at <http://projects.genivi.org/diagnostic-log-trace/download>.

Read the [INSTALL.txt](http://git.projects.genivi.org/?p=dlt-viewer.git;a=blob;f=INSTALL.txt;h=aa9f66ef82a1acd3df56ab97be74bf884a4eb0a9;hb=HEAD) file to check the main project dependencies - basically, a recent Qt5 Software Development Kit.

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
>
> * Directory: `E:\opt\Qt` (was: `C:\Qt`)
> * [X] Associate common file types with Qt Creator.

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

When the Qt5 install wizard shows "Installation finished!" click "Next >"

> Qt Setup
>
> Completing the Qt Wizard
>
> Click Finish to exit the Qt Wizard.
>
> * [X] Launch Qt Creator

Click "Finish"

The Qt Creator main window should then be displayed.

### (optional) Get familiar with Qt Creator

Inside Qt Creator, click on the "Welcome" icon, then "Get Started Now"

Help > IDE Overview | Qt Creator Manual

Read page "Using Version Control Systems"

#### Create a sample Qt project

Qt Creator: File > New file or Project...

> New File or Project
>
> Choose a template: Projects > Application > Qt Widgets Application

Click "Choose..."

> Qt Widgets Application
>
> Introduction and Project Location
>
> * Name: my-first-qt-app
> * Create in: `C:\users\gmacario\Documents`

Click "Next"

> Qt Widgets Application
>
> Kit Selection
>
> Qt Creator can use the following kits for project **my-first-qt-app**:
>
> [X] Select all kits
> * [X] Desktop Qt 5.4.2 MinGW 32bit2
> * [X] Desktop Qt 5.5.1 MinGW 32bit

Click "Next"

> Qt Widgets Application
>
> Class Information
>
> Specify basic information about the classes for which you want to generate skeleton source code files.
>
> * Class name: MainWindow
> * Base class: QMainWindow
> * Header file: `mainwindow.h`
> * Source file: `mainwindow.cpp`
> * Generate form: [X]
> * Form file: `mainwindow.ui`

Click "Next"

> Qt Widgets Application
>
> Project Management
>
> * Add as a subproject to project: "<none>"
> * Add to version control: "<none>"
>
> Files to be added in `C:\Users\gmacario\Documents\my-first-qt-app`:
> * `main.cpp`
> * `mainwindow.cpp`
> * `mainwindow.h`
> * `mainwindow.ui`
> * `my-first-qt-app.pro`

Click "Finish"

Type "Ctrl-R" to run the application

### Configure Git inside Qt Creator

Qt Creator: Options > Version Control > Git

* Prepend to PATH: `E:\cygwin64\bin` (was `E:\cygwin\bin`)

### Clone GENIVI DLT Viewer sources from git

TODO: How to clone a git repository from Qt Creator?

Start a Cygwin terminal

```
$ cd ~/Documents
$ git clone git://git.projects.genivi.org/dlt-viewer.git
```

Inside Qt Creator: File > Open File or Project...

* File name: `C:\User\gmacario\Documents\dlt-viewer\BuildDltViewer.pro`

> Configure Project
>
> Qt Creator can use the following kits for project **BuildDltViewer**:
> The project **BuildDltViewer** is not yet configured.
> Qt Creator uses the kit **Desktop Qt 5.5.1 MinGW 32bit** to parse the project.
>
> [?] Select all kits
> * [-] Desktop Qt 5.4.2 MinGW 32bit2
> * [X] Desktop Qt 5.5.1 MinGW 32bit
> * Import Build From...

Click "Configure Project"

When the compilation is complete, type "Ctrl-R" to run the DLT Viewer application

<!-- image: Capture-20160108-1050.png -->

DLT Viewer: File > Open

<!-- TODO: better image -->

<!-- EOF -->
