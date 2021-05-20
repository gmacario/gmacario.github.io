---
layout: post
title:  "Trying Genymotion Android Emulator"
date:   2015-04-19 09:50:00
tags:   android howto development
---
<!-- markdown-link-check-disable -->

This blog post explains how I installed the [Genymotion Android Emulator](https://www.genymotion.com/) on my laptop running MS Windows 7.

## Installing Genymotion

### Download Genymotion

Browse <https://www.genymotion.com/>
Select "Get Genymotion".

Choose the "Free" version, then "Download".
Review system requirements, then "Get Genymotion".

As I had already installed [Oracle VirtualBox]() on my laptop, I instead chose "Get Genymotion (**without** VirtualBox)" which has a smaller size.

file:`genymotion-2.4.0.exe` (25.39 MB)

We will defer the "Purchase a license" option after we get familiar with it.


### Launch Genymotion Setup Wizard

<!-- 2015-04-17 08:24 CEST -->

Double click on the `genymotion-2.4.0.exe` file to launch the Genymotion Setup Wizard.

> Select Setup Language

* Select the language to use during the installation: English

> Setup - Genymotion
>
> Welcome to the Genimotion Setup Wizard
>
> This will install Genymotion version 2.4.0 on your computer.
> It is recommended that your close all other applications before continuing.
> Click Next to continue, or Cancel to exit Setup.

Click "Next >".

> Select Destination Location
>
> Where should Genymotion be installed?

* Install directory: `E:\opt\Android\Genymotion` (was: `C:\Program Files\Genymobile\Genymotion`)

Click "Next >".

> Select Start Menu Folder
>
> Where should Setup place the program's shortcuts?

* Folder: Genymotion (default)

Click "Next >".

> Select Additional tasks
>
> Which additional tasks should be performed?

* Create a desktop icon: Yes

Click "Next >".

Review the selected installation options, then click "Install".

When the installation is complete, the following dialog box will be displayed:

> Completing the Genymotion Setup Wizard
>
> Setup has finished installing Genymotion on your computer. The application may be launched by selecting the installed icons.
> Click Finish to exit Setup.

Click "Finish".

### Launch Genymotion

#### Add a Virtual Device

The first time you launch Genymotion the following dialog box will be displayed

> Add a first virtual device
>
> You do not have any virtual device yet.
>
> Do you want to add a new one?

Click "Yes".

The "Virtual device creation wizard" will then be displayed.

In order to access all available virtual devices you need to sign in with your Genymotion account.

Click "Sign in", the fill in your credentials.

Select the virtual device you want to install - example: "Samsung Galaxy S2 - 4.1.1. - API 16 - 480x800", then click "Next".

Review the virtual device properties before deployment:

* Virtual device name: Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800
* Description: Samsung Galaxy S2 (4.3",480x800,HDPI) AOSP4.1.1 API 16
* System Version
  - Name: Genymotion Phone - 4.1.1 - API 16 - 2.4.0
  - Description: Genymotion Virtual Device for Phone
  - Android Version: 4.1.1
  - Release date: mar 17 feb 11:28:01 2015
  - Version number: 2.4.0
* Screen size - Density: 480x800 - 240 dpi
* Memory size: 1024 MB
* Number of CPUs: 1
* Data disk capacity: 32768 MB

If OK, then click "Next". The files required by the virtual device will then be downloaded from the Genymotion servers.

When the Virtual device creation wizard displays "The virtual device has been created successfully.", click "Finish".

#### Start a Virtual Device

Select an installed virtual device (example: "Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800"), then click "Start".

Notice that the Android Virtual Device will be deployed as a VM inside Oracle VirtualBox. You may launch the Oracle VM VirtualBox Manager to review the VM settings, inspect the Storage configuration, etc.

In our example (VM "Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800"):

* General
  - Name: Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800
  - Type: Linux
  - Version: Other Linux (32 bit)
* System
  - Motherboard
    - Base Memory: 1024 MB
    - Boot Order: Hard Disk
    - Chipset: PIIX3
    - Pointing Device: PS/2 Mouse
    - Extended Features:
      - Enable I/O APIC: Yes
      - Enable EFI (special OSes only): No
      - Hardware Clock in UTC Time: Yes
  - Processor
    - Processor(s): 1 CPU
    - Execution Cap: 100%
    - Extended Features:
      - Enable PAE/NX: No
  - Acceleration
    - Hardware Virtualization:
      - Enable VT-x/AMD-V: Yes
      - Enable Nested Paging: Yes
* Display
  - Video
    - Video Memory: 32 MB
    - Monitor Count: 1
    - Extended Features:
      - Enable 3D Acceleration: No
      - Enable 2D Video Acceleration: No
  - Remote Display
    - Enable Server: No
  - Video Capture
    - Enable Video Capture: No
* Storage
  + Controller: IDEController
    - **android_system-disk.vmdk**
      - Attributes
        - Hard Disk: IDE Primary Master
        - Solid-state Drive: No
      - Information
        - Type (Format): Normal (VMDK)
        - Virtual Size: 540,82 MB
        - Actual Size: 234,69 MB
        - Details: Dynamically allocated differencing storage
        - Location: `C:\Users\gmacario\AppData\Local|Genymobile\Genymotiono\Genymobile\Genymotion\deployed\Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800\android_system_disk.vmdk`
        - Attached to: Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800 (factory-backup)
    - **android_data_disk.vmdk**
      - Attributes
        - Hard Disk: IDE Primary Slave
        - Solid-state Drive: No
      - Information
        - Type (Format): Normal (VMDK)
        - Virtual Size: 5,51 GB
        - Actual Size: 8,50 MB
        - Details: Dynamically allocated differencing storage
        - Location: `C:\Users\gmacario\AppData\Local|Genymobile\Genymotiono\Genymobile\Genymotion\deployed\Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800\android_data_disk.vmdk`
        - Attached to: Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800 (factory-backup)
    - **sdcard.vdi**
      - Attributes
        - Hard Disk: IDE Secondary Master
        - Solid-state Drive: No
      - Information
        - Type (Format): Normal (VMDK)
        - Virtual Size: 32,00 GB
        - Actual Size: 2,00 MB
        - Details: Dynamically allocated differencing storage
        - Location: `C:\Users\gmacario\AppData\Local|Genymobile\Genymotiono\Genymobile\Genymotion\deployed\Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800\sdcard.vdi`
        - Attached to: Samsung Galaxy S2 - 4.1.1 - API 16 - 480x800 (factory-backup)* Audio
  - Enable Audio: Yes
  - Host Audio Driver: Windows DirectSound
  - Audio Controller: ICH AC97
* Network
  - Adapter 1
    - Enable Network Adapter: Yes
    - Attached to: Host-only Adapter
    - Name: VirtualBox Host-Only Ethernet Adapter
    - Adapter Type: Paravirtualized Network (virtio-net)
    - Promiscuous Mode: Deny
    - MAC Address: xxxxxxxxxxxx
    - Cable Connected: Yes
  - Adapter 2
    - Enable Network Adapter: Yes
    - Attached to: NAT
    - Name: (none)
    - Adapter Type: Paravirtualized Network (virtio-net)
    - Promiscuous Mode: Deny
    - MAC Address: xxxxxxxxxxxx
    - Cable Connected: Yes
    - Port Forwarding Rules: (none)
* Serial Ports
  - (none)
* USB
  - Enable USB Controller: Yes
    - Enable USB 2.0 (EHCI) Controller: No
    - USB Device Filters: (none)
* Shared Folders
  - (none)

### Trying the Genymotion Shell

See <https://www.genymotion.com/#!/developers/user-guide>

### Connecting to Android Studio

This will be the subject of a future blog post. Stay tuned!

<!-- markdown-link-check-enable -->
<!-- EOF -->
