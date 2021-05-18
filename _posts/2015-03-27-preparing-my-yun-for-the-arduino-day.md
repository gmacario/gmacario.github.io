---
layout: post
title:  "Preparing my Arduino YUN for the Arduino Day"
date:   2015-03-26 14:00:00 CET
tags:   arduino yun day fablab torino
---
<-- markdown-link-check-disable -->
Hi there
Tomorrow I will be attending the [Arduino PRO Workshop](http://www.eventbrite.it/e/biglietti-workshop-pro-arduino-day-2015-torino-16276959825) at the [Arduino DAY 2015 here in Torino](http://local.arduino.cc/torino/2015/02/04/arduino-day-2015/).
Time to do some preparation...
### Restore Arduino Yun factory settings
Reference: <http://arduino.cc/en/Main/ArduinoBoardYun>
1. Plug MicroUSB to power up Yun
2. Press and hold the WiFi Reset button for 30 seconds to restore factory settings
3. From the laptop search for a WiFi network `Arduino-Yun-xxxxxx` and connect to it
4. Browse <http://arduino.local/> (or <http://192.168.240.1>)
> Welcome to your Arduino Yun. Please enter password to access the web control panel
>
> Password: xxxx
The default factory password is `arduino`
### Configure Arduino Yun networking
After successfully logging in you should get the following page (your actual data may vary):
> WELCOME TO **ARDUINO**, YOUR ARDUINO YUN
>
> WIFI (WLAN0) CONNECTED
> * Address: **192.168.240.1**
> * Netmask: **255.255.255.0**
> * MAC Address: **90.A2:DA:F3:0C:7B**
> * Received: **72.79 KB**
> * Transmitted: **146.48 KB**
>
> WIRED ETHERNET (ETH1): DISCONNECTED
> * MAC Address: **90:A2:DA:FB:0C:7B**
> * Received: **0.0 B**
> * Transmitted: **0.0 B**
You can change defaults by selecting the "CONFIGURE" button, which will you return the following page:
> For more advanced network configuration features, see the _advanced configuration panel (luci)_
>
> **YUN BOARD CONFIGURATION**
> * YUN NAME: `Arduino`
> * PASSWORD: ` `
> * CONFIRM PASSWORD: ` `
> * TIMEZONE: Rest of the World (UTC)
>
> **WIRELESS PARAMETERS**
> * CONFIGURE A WIRELESS NETWORK: Yes
> * DETECT WIRELESS NETWORKS (Select a wifi network...)
> * WIRELESS NAME: ` `
> * SECURITY: None
>
> (DISCARD) (CONFIGURE & RESTART)
>
> **REST API ACCESS**
>
> * REST API ACCESS: ( ) OPEN (X) WITH PASSWORD
>
> REST APIs allow you to access your sketch from the web, sending commands or exchanging configuration values.
> If your Yun is on a public network, or controlling sensitive equipment, or both, we recommend you leave the REST API password protected.
You may attach to an existing WiFi network by setting the appropriate wireless parameters, then selecting the "CONFIGURE & RESTART" button
See also: <http://fibasile.github.io/arduino-yun-getting-started.html>
#### Run a simple sketch on my Arduino Yun
TODO
### Learn about Temboo
Reference: <https://www.temboo.com/arduino/yun/>
#### Getting started with Temboo on your Arduino Yun
From <https://www.temboo.com/arduino/yun/getting-started>
1. [Log in](https://www.temboo.com/login) to Temboo.
  * Example: gmacario/xxx
2.  Go to our Library and find the [Yahoo > Weather > GetWeatherByAddress](https://www.temboo.com/library/Library/Yahoo/Weather/GetWeatherByAddress/) Choreo.
3. Enter any complete address in the **Address** input field.
  * Example: `Via Egeo, 2 Torino Italy`
4. Now click **Run**. After a moment you'll see the data that Yahoo Weather sends back shown in the Output section of the page (which is right below the Input section).
#### Make your Arduino Sketch
5. Turn on **IoT Mode** and select Arduino Yun.
TODO
<-- markdown-link-check-enable-->
<-- EOF -->
