---
layout: post
title:  "Trying Android Studio on itm-gmacario-w7"
date:   2015-04-16 12:40:00
categories: android howto development
---

This blog post explains how I installed [Android Studio](http://developer.android.com/tools/studio/index.html) on my laptop running MS Windows 7.

## Installing Android Studio

### Download Java SE 8 for Windows x84

Browse <http://www.oracle.com/technetwork/java/javase/downloads/index.html>
Select "Download Java Platform (JDK) 8u45"

Accept License Agreement, then download Java SE Development Kit 8u45 for Windows x64

file:`jdk-8u45-windows-x64.exe` (180.42 MB)

### Install Java SE 8 for Windows x84

<!-- 2015-04-16 17:00 CEST -->

Double click on the `jdk-8u45-windows-x64.exe` file to start the JDK install wizard.

> Welcome to the Installation Wizard for Java SE Development Kit 8 Update 45
>
> This wizard will guide you through the installation process for the Java SE Development Kit 8 Update 45.
>
> The Java Mission Control profiling and diagnostics tools uite is now available as part of the JDK.

Click "Next >"

* Install to: `C:\Program Files\Java\jdk1.8.0_45\` (default)

Click "Next >"

Another window with the JRE install wizard will open up.

> Choose Destination Folder for the Java Runtime Environment (JRE)

* Install to: `C:\Program Files\Java\jre1.8.0_45\` (deafult)

Click "Next >"

The program installs the files.

> Java SE Development Kit 7 Update 45 (64-bit) successfully installed.
>
> Click Next Steps to access tutorials, API documentation, developer guides,
> release notes and more to help you get started with the JDK.

Click "Next Steps", your browser will open a page on <http://docs.oracle.com/javase/8/docs/>

Click "Close"

Open a Windows command shell to verify that JDK has been correctly installed:

```
C:\Users\gmacario>java -version
java version "1.8.0_45"
Java(TM) SE Runtime Environment (build 1.8.0_45-b14)
Java HotSpot(TM) 64-Bit Server VM (build 25.45-b02, mixed mode)

C:\Users\gmacario>
```

### Download Android Studio

Browse <http://developer.android.com/sdk/index.html> then select "Download Android Studio".

You should read and agred with the Terms and Conditions before you may download Android Studio.

As of 2015-04-16 the latest version (for Windows) is `android-studio-bundle-135.1740770-windows.exe` (856233768 bytes)

### Install Android Studio

Double click on the `android-studio-bundle-135.1740770-windows.exe` file to start the Android Studio Setup wizard.

> Welcome to Android Studio Setup

Read the displayed message, then click "Next >" to continue.

Select components to install (or simply accept defaults), then click "Next >"

Read the License Agreement(s), then click "I Agree"

Choose Install Locations
* Android Studio Insallation Location: `E:\opt\Android\Android_Studio` (was `C:\Program Files\Android\Android Studio`)
* Android SDK Installation Location: `E:\opt\Android\sdk` (was `C:\Users\gmacario\AppData\Local\Android\sdk`)

In the Emulator Setup menu, set the maximum amount of RAM available for the Intel Hardware Accelerated Manager (HAXM) to use for all x86 emulator instances

* Recommended: 2 GB

Choose Start Menu Folder: Android Studio

Click "Install", the files will be copied to the chosen locations.

Click "Finish" to close Setup and launch Android Studio.

If you get the following error message:

> Error launching Android Studio
>
> No JVM installation found. Please install a 64-bit JDK.
> If you already have a JDK installed, define a JAVA_HOME variable in
> Computer > System Properties > System Settings > Environment Variables.

make sure that the JDK was correctly installed as explained in the previous section.

The first time you run Android Studio, it will download the missing components, such as:

* Android SDK Tools, revision 24.1.2
* Google APIs Intel x86 Atom System Image, Google Inc. API 21, revision 4
* ...

NOTE: The complete download may take about 1h on a fast Internet connection.

## Using Android Studio

Launch Android Studio, the following window will be displayed

> Welcome to Android Studio
>
> Quick Start
> * Start a new Android Studio project
> * Open an existing Android Studio project
> * Import an Android code sample
> * Check out project from Version Control
> * Import project (Eclipse ADT, Gradle, etc.)
> * Configure
>   * SDK Manager
>   * Setttings
>   * Plugins
>   * Import Settings
>   * Export Settings
>   * Project Defaults
> * Docs and How-Tos
>   * Read Help
>   * Tips of the Day
>   * Default Keymap Reference
>   * JetBrains TV
>   * Plugin Development

### Try a sample app

Select "Import and Android code stample", then select "Getting started > Action Bar Compat - Basic"

### Creating sample app "OMG Android"

<!-- 2015-04-16 18:00 CEST -->

See <http://www.raywenderlich.com/78574/android-tutorial-for-beginners-part-1>

From Android Studio: File > New Project

* Application name: OMG Android
* Company Domain: gmacario.example.com
* Package Name: com.example.gmacario.omgandroid
* Project location: `C:\Users\gmacario\AndroidStudioProjects\OMGAndroid`

Select "Next"

> Select the form factors your app will run on

* (Y) Phone and Tablet
  - Minimum SDK: API 15: Android 4.0.3 (IceCreamSandwich)
* (N) TV
  - Minimum SDK:
* (N) Wear
  - Minimum SDK:
* (N) Glass (Not Installed)
- Minimum SDK:

Select "Next"

> Add an activity to Mobile

Select "Black Activity"

* Activity Name: MainActivity
* Layout Name: activity_main
* Title: MainActivity
* Menu Resource Name: menu_main

then click "Finish".

From Android Studio: Tools > Android AVD Manager

Click **Create Virtual Device...**

Select **Nexus S** in the list of devices available in the phone category, then click "Next"

Select System Image:

* Release Name: Unknown
* API Level: 22
* ABI: x86_64
* Target: Android 5.1.1

> Android Virtual Device (AVD) - Verify Configuration

* AVD Name: Nexus S API 22
* Device: Nexus S - 4.0" 480x800 hdip
* OS: Android 5.1.1 x86_64
* Startup size and orientation
  - Scale: Auto
  - Orientation: Portrait
* Emulated Performance
  - (Y) Use Host GPU
  - (n) Store a snapshort for faster setup

Show Advanced Settings

* AVD Id: Nexus_S_API_22
* Camera:
  - Front: None

Then click "Finish".

From Android Studio: Run > Run 'app'

> Choose Device

* (n) Choose a running device
* (Y) Launch emulator
  - Android virtual device: Nexus S API 22
* (n) Use same device for future launches

Then click "OK".




------------------
## TODO

Configure Git from Android Studio


### Installing Genymotion

TODO: Move to a separate page




------------------
# LEFTOVERS


<!-- EOF -->
