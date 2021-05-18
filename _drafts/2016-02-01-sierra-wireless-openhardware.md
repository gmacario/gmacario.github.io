---
layout: post
title:  "Sierra Wireless Opensource and OpenHardware"
date:   2016-01-29 18:00:00 CET
categories: openhardware opensource iot arduino
---
<-- markdown-link-check-disable -->
<56 CET) -->
### Legato™
* [Legato](http://source.sierrawireless.com/legato/)™ Open source embedded platform built on Linux
  * Legato main components:
    - **Application framework** contains application sandbox, robust APIs, customizable middleware components, C-based APIs, and supports multiple programming languages.
    - **Linux distribution**: running on a long-term supported Linux kernel with a plethora of free open source packages like Busybox, open ssl, dhcp, ppp, open ssh. AirPrime WP and AR series board support packages for hardware interface and power management support.
    - **Development environment**: based on a Sierra Wireless IDE with command line and multi-language support, diagnostics, debugging tools, monitoring, profiling and Yocto tooling.
  * Go to [legato.io](http://legato.io/) today to learn how to develop your first Legato application.
  * [Learn More](http://www.sierrawireless.com/productsandservices/airprime_wireless_modules/smart_modules/legato/)
  * Getting Started
    - [Getting Started](http://www.legato.io/legato-docs/15_08/getstarted_main.html)
    - [Hello World sample app](https://github.com/legatoproject/legato-helloworld)
    - [Modem sample app](https://github.com/legatoproject/legato-modemSample)
    - [AirVantage sample app](https://github.com/legatoproject/legato-airvantageSample)
  * Resources
    - [Legato app framework](https://github.com/legatoproject/legato-af)
    - [Legato Downloads](http://source.sierrawireless.com/resources/legato/downloads)
    - [API documentation](http://www.legato.io/legato-docs/15_08/c__a_p_is.html)
  * Community
    - [Legato Forum](http://forum.sierrawireless.com/viewforum.php?f=177)
    - [Legato GitHub](http://www.legato.io/)
    - [Yocto Tools Resources](http://www.yoctoproject.org/tools-resources)
* [Legato Interactive Video](http://www.sierrawireless.com/resources/videos/legato-interactive-video/)
* From http://www.legato.io/
  - [Legato 15.10 Beta Now Available](http://source.sierrawireless.com/resources/legato/downloads/)
  - Application Framework: [repository](https://github.com/legatoproject/legato-af), [documentation](http://www.legato.io/legato-docs/)
  - ['Hello World' sample app](https://github.com/legatoproject/legato-helloWorld)
  - [Modem sample app](https://github.com/legatoproject/legato-modemSample)
* From http://www.legato.io/legato-docs/15_10/
  * [Legato Runtime Architecture](http://www.legato.io/legato-docs/15_10/basic_runtime_arch.html)
  * Legato Security Model is based on:
    - [Sandboxes](http://www.legato.io/legato-docs/15_10/basic_security_sandbox.html)
    - [SMACK](http://www.legato.io/legato-docs/15_10/basic_security_smack.html)
  * Tools
    - [Target](http://www.legato.io/legato-docs/15_10/tools_target.html)
    - [Host](http://www.legato.io/legato-docs/15_10/tools_host.html)
    - [Build](http://www.legato.io/legato-docs/15_10/build_tools.html)
  * [Software Update](http://www.legato.io/legato-docs/15_10/software_update.html) is primarily carried out by the Update Daemon. However, the Supervisor and start also have a role to play in rolling-back when updates fail. start also supports installation (via firmware update or other means) of read-only file systems containing full "golden" systems.
* [Legato Downloads](http://source.sierrawireless.com/resources/legato/downloads/)
* Legato Project GitHub: https://github.com/legatoproject
  - Legato Application Framework: https://github.com/legatoproject/legato-af
  - ...
### Project mangOH™ Open Hardware
* [Project mangOH](http://mangoh.io/)™ is a new kind of open source hardware for Internet-of-Things (IoT) industrial-grade products. Project mangOH is born from a reference design provided under open source licence (business friendly) by Sierra Wireless.
- Video: [Project mangOH, open hardware IoT reference design for the WP Series](https://www.youtube.com/watch?v=fATxcm_gTH4) (01:56)
- [Announcement: Open hardware reference design, Project mangOH™](http://www.sierrawireless.com/resources/videos/announcement-open-hardware-reference-design-project-mangoh/)
From http://source.sierrawireless.com/mangoh/
> * Project mangOH™ is an open source reference design for the CF3 form factor modules, including Sierra Wireless WP Series & HL Series.
* When used with WP Series, it provides an out-of-the box wireless and cloud connected reference design, and enables rapid prototyping of new ideas for IoT developers.
* With its Arduino connector and its 3 IoT connectors fully supported by the Legato™ platform, you can try out multiple wireless and sensor technology combinations to best meet your specific use-case requirements.
* Once your prototype is complete, you can then reuse the industrial-grade design and IoT modules in final production
* Project mangOH by Sierra Wireless is licensed under a Creative Commons Attribution 4.0 International License
### IoT Connector
From http://source.sierrawireless.com/iotconnector/
> * The IoT Connector is an open interface standard from Sierra Wireless to simplify product development with a single interface for connectivity and sensor module technology.
* Just as the minicard standard simplified development for the laptop, tablet, and networking industry, so the IoT connector brings plug’n’play hardware solutions offering electrical and feature compatibility across various IoT technologies.
* Develop new applications and use-cases on-demand by combining any number of industrial-grade IoT modules.
* IoT modules coming shortly are:
  - Freescale Thread module for home automation applications
  - Linear Technology Dust Networks module for short-range industrial monitoring applications
  - Texas Instruments combination Wi-Fi, Zigbee, and Bluetooth for a variety of networking and short-range industrial applications
* The first implementation of the IoT Connector is on the beta release of Project mangOH™ an open hardware reference design that provides out-of-the-box wireless and cloud connectivity for IoT developers.
* IoT Connectors by Sierra Wireless is licensed under a Creative Commons Attribution 4.0 International License.
#### IoT Connector - Resources
* [Design Specifications](http://source.sierrawireless.com/~/media/support_downloads/openhardware/iotconnector/iot%20module%20design%20specification%20v1.ashx)
* [Test Sample Design](http://source.sierrawireless.com/~/media/support_downloads/openhardware/iotconnector/test%20module.ashx)
* [USB Test Sample Design](http://source.sierrawireless.com/~/media/support_downloads/openhardware/iotconnector/test%20module%20usb.ashx)
* [Dust Network Manager IoT Module USB](http://source.sierrawireless.com/~/media/support_downloads/openhardware/iotconnector/dust_iot_manager_board_files_usb_only.ashx)
* [Project mangOH](http://source.sierrawireless.com/mangoh)
#### IoT Connector - Community
* [Talon RF IoT Module](http://www.taloncom.com/rfmodules.htm)
### See also
* http://forum.sierrawireless.com/
* http://source.sierrawireless.com/
* http://www.sierrawireless.com/products-and-solutions/embedded-solutions/open-source-initiatives/
<-- markdown-link-check-enable-->
<-- EOF -->
