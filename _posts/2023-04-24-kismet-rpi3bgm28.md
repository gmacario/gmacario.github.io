---
layout: post
title: "Running Kismet on a Raspberry Pi"
date: 2023/04/24
tags: howto ble wifi kismet raspberry
---

## Introduction

This post describes how to install [Kismet](https://www.kismetwireless.net/) on a Linux host, then use the program to perform some "network intelligence".

![image](https://user-images.githubusercontent.com/75182/236668176-cfafef6f-2652-422e-a7a6-5c06e84555cc.png)

## Requirements

- A host running a recent Debian-based distribution.
  Tested on `rpi3bgm28` - a [Raspberry Pi 3 Model B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/) running [Raspberry Pi OS Lite](https://www.raspberrypi.com/software/) 64-bit (bullseye)
- A Wi-Fi adapter which supports monitor mode. Tested with a [D-Link DWL-G122](https://support.dlink.com/ProductInfo.aspx?m=DWL-G122) Wireless-G USB Dongle

## Step-by-step instructions

Login to the Raspberry Pi via SSH:

```bash
ssh rpi3bgm28
```

Check the version of the installed OS

```bash
uname -a
lsb_release -a
```

Result

```text
gmacario@rpi3bgm28:~ $ uname -a
Linux rpi3bgm28 6.1.21-v8+ #1642 SMP PREEMPT Mon Apr  3 17:24:16 BST 2023 aarch64 GNU/Linux
gmacario@rpi3bgm28:~ $ lsb_release -a
No LSB modules are available.
Distributor ID: Debian
Description:    Debian GNU/Linux 11 (bullseye)
Release:        11
Codename:       bullseye
gmacario@rpi3bgm28:~ $
```

In our case we are running [Raspberry Pi OS Lite](https://www.raspberrypi.com/software/):

- System: 64-bit (arch=`aarch64`)
- Debian Release: 11 (bullseye)

Make sure the distribution is up-to-date

```bash
sudo apt-get update \
  && sudo apt-get -y dist-upgrade \
  && sudo apt-get -y autoremove --purge
```

Install Kismet following the instructions at <https://www.kismetwireless.net/packages/> (use the one which corresponds to the installed OS)

```bash
wget -O - https://www.kismetwireless.net/repos/kismet-release.gpg.key --quiet | gpg --dearmor | sudo tee /usr/share/keyrings/kismet-archive-keyring.gpg >/dev/null
echo 'deb [signed-by=/usr/share/keyrings/kismet-archive-keyring.gpg] https://www.kismetwireless.net/repos/apt/release/bullseye bullseye main' | sudo tee /etc/apt/sources.list.d/kismet.list >/dev/null
sudo apt update
sudo apt install kismet
```

Provide the following answers when requested:

- Do you want to continue? Y
- Should Kismet be installed with suid-root helpers? Yes

Verify that Kismet has been installed correctly:

```text
gmacario@rpi3bgm28:~ $ kismet --version
Kismet 2022-08-R1
gmacario@rpi3bgm28:~ $
```

Add current user to group `kismet`:

```bash
sudo usermod -aG kismet $USER
newgrp kismet
```

Logged in as `gmacario@rpi3bgm28`, type `iwconfig` to list the existing Wireless interfaces.

```text
gmacario@rpi3bgm28:~ $ iwconfig
lo        no wireless extensions.

eth0      no wireless extensions.

wlan0     IEEE 802.11  ESSID:"Galaxy A32 gpmacario"
          Mode:Managed  Frequency:2.437 GHz  Access Point: A6:B5:89:FE:22:0D
          Bit Rate=65 Mb/s   Tx-Power=31 dBm
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Power Management:on
          Link Quality=57/70  Signal level=-53 dBm
          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0
          Tx excessive retries:0  Invalid misc:0   Missed beacon:0

tailscale0  no wireless extensions.

docker0   no wireless extensions.

gmacario@rpi3bgm28:~ $
```

Now insert the [D-Link DWL-G122](https://support.dlink.com/ProductInfo.aspx?m=DWL-G122)
into one USB port of the Raspberry Pi.

Execute the `iwconfig` command again and verify that the Wi-Fi USB dongle gets recognized.
Take note of the new interface name (in our case, this is `wlan1`):

```text
gmacario@rpi3bgm28:~ $ iwconfig
lo        no wireless extensions.

eth0      no wireless extensions.

wlan0     IEEE 802.11  ESSID:"Galaxy A32 gpmacario"
          Mode:Managed  Frequency:2.437 GHz  Access Point: A6:B5:89:FE:22:0D
          Bit Rate=72.2 Mb/s   Tx-Power=31 dBm
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Power Management:on
          Link Quality=56/70  Signal level=-54 dBm
          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0
          Tx excessive retries:0  Invalid misc:0   Missed beacon:0

tailscale0  no wireless extensions.

docker0   no wireless extensions.

wlan1     IEEE 802.11  ESSID:"Galaxy A32 gpmacario"
          Mode:Managed  Frequency:2.437 GHz  Access Point: A6:B5:89:FE:22:0D
          Bit Rate=54 Mb/s   Tx-Power=20 dBm
          Retry short limit:7   RTS thr:off   Fragment thr:off
          Power Management:on
          Link Quality=62/70  Signal level=-48 dBm
          Rx invalid nwid:0  Rx invalid crypt:0  Rx invalid frag:0
          Tx excessive retries:0  Invalid misc:21   Missed beacon:0

gmacario@rpi3bgm28:~ $
```

Launch Kismet and configure it to use new Wi-Fi interface as datasource:

```bash
kismet -c wlan1
```

Result:

```text
gmacario@rpi3bgm28:~ $ kismet -c wlan1
INFO: Including sub-config file: /etc/kismet/kismet_httpd.conf
INFO: Including sub-config file: /etc/kismet/kismet_memory.conf
INFO: Including sub-config file: /etc/kismet/kismet_alerts.conf
INFO: Including sub-config file: /etc/kismet/kismet_80211.conf
INFO: Including sub-config file: /etc/kismet/kismet_logging.conf
INFO: Including sub-config file: /etc/kismet/kismet_filter.conf
INFO: Including sub-config file: /etc/kismet/kismet_uav.conf
INFO: Loading config override file '/etc/kismet/kismet_package.conf'
INFO: Optional sub-config file not present: /etc/kismet/kismet_package.conf
INFO: Loading config override file '/etc/kismet/kismet_site.conf'
INFO: Optional sub-config file not present: /etc/kismet/kismet_site.conf
KISMET - Point your browser to http://localhost:2501 (or the address of this system) for the INFO: Keeping EAPOL packets in memory for easy download and WIDS
      functionality; this can use more RAM.
INFO: Registered PHY handler 'IEEE802.11' as ID 0
INFO: Registered PHY handler 'RTL433' as ID 1
INFO: Registered PHY handler 'Z-Wave' as ID 2
INFO: Registered PHY handler 'Bluetooth' as ID 3
INFO: Registered PHY handler 'UAV' as ID 4
INFO: Registered PHY handler 'NrfMousejack' as ID 5
INFO: Using default rates of 10/min, 1/sec for alert 'BLEEDINGTOOTH'
INFO: Registered PHY handler 'BTLE' as ID 6
INFO: Registered PHY handler 'METER' as ID 7
INFO: Indexing ADSB ICAO db
INFO: Completed indexing ADSB ICAO db, 322278 lines 6446 indexes
INFO: Registered PHY handler 'ADSB' as ID 8
INFO: Registered PHY handler '802.15.4' as ID 9
INFO: Registered PHY handler 'RADIATION' as ID 10
INFO: Serving static file content from /usr/share/kismet/httpd/
INFO: Enabling channel hopping by default on sources which support channel
      control.
INFO: Setting default channel hop rate to 5/sec
INFO: Enabling channel list splitting on sources which share the same list
      of channels
INFO: Enabling channel list shuffling to optimize overlaps
INFO: Sources will be re-opened if they encounter an error
INFO: Saving datasources to the Kismet database log every 30 seconds.
INFO: Launching remote capture server on 127.0.0.1 3501
INFO: Data sources passed on the command line (via -c source), ignoring
      source= definitions in the Kismet config file.
INFO: Probing interface 'wlan1' to find datasource type
INFO: Opened kismetdb log file './/Kismet-20230424-12-35-40-1.kismet'
INFO: Saving packets to the Kismet database log.
INFO: GPS track will be logged to the Kismet logfile
INFO: Starting Kismet web server...
INFO: HTTP server listening on 0.0.0.0:2501
INFO: Could not open system plugin directory (/usr/lib/kismet/), skipping:
      No such file or directory
INFO: Did not find a user plugin directory (/home/gmacario/.kismet//plugins
      /), skipping: No such file or directory
INFO: Found type 'linuxwifi' for 'wlan1'
INFO: wlan1 bringing down parent interface 'wlan1'
INFO: wlan1 finished configuring wlan1mon, ready to capture
INFO: Data source 'wlan1' launched successfully
```

Browse <http://rpi3bgm28:2501> to access Kismet web UI.

The first time you access the web UI, the following questions will be displayed:

> **Set Login**
>
> To finish setting up Kismet, you need to configure a login.
>
> This login will be stored in `.kismet/kismet_httpd.conf` in the
> _home directory of the user who launched Kismet_;
> This server is running as gmacario, and the login will be saved
> in `~gmacario/.kismet/kismet_httpd.conf`.
>
> Set Login
>
> - User name: ...
> - Password: ...
> - Confirm: ...

Fill in the requested information, then click "Save".

> **Welcome**
>
> Welcome!
>
> This is the first time you've used this Kismet server in this browser.
>
> Kismet stores local settings in the HTML5 storage of your browser.
>
> You should configure your preferences and login settings in the settings panel!
>
> Settings | Continue

<!-- TODO -->

### Runtime censorship

Kismet can be configured to censor some information - such as the last digits of MAC address or SSID - displayed in the web UI, in order to make it easier to share screenshots or demos without revealing sensitive data.

Censorship mode can be enabled by adding `?censor=1` to Kismet URL, for instance
<http://localhost:2501/?censor=1> or <http://rpi3bgm28:2501/?censor=1>

<!-- TODO: Screenshot -->

Reference: <https://www.kismetwireless.net/docs/readme/configuring/webserver/>

<!--
TODO: Try enabling Data Source hci0
(should not be connected via wlab0, though)

See also:
- <https://www.kismetwireless.net/docs/readme/datasources/datasources/>
- <https://www.kismetwireless.net/docs/readme/datasources/bluetooth-hci-bluetooth/>

Kismet web UI: Data Sources > TODO

kismet -c hci0
-->

### Export `*.kismet` files to `*.pcap`

```bash
gmacario@rpi3bgm28:~ $ kismetdb_to_pcap \
    --in Kismet-20230424-12-57-23-1.kismet \
    --out Kismet-20230424-12-57-23-1.kismet.pcap
Done...
gmacario@rpi3bgm28:~ $ ls -la Kismet-20230424-12-57-23-1.kismet*
-rw-r--r-- 1 gmacario gmacario 9347072 Apr 24 15:17 Kismet-20230424-12-57-23-1.kismet
-rw-r--r-- 1 gmacario gmacario 3575696 Apr 24 15:17 Kismet-20230424-12-57-23-1.kismet.pcap
gmacario@rpi3bgm28:~ $
```

You may then open the generated `*.pcap` file using a suitable tool, for instance [Wireshark](https://www.wireshark.org/).

<!-- TODO: Screenshot -->

### Recovering lost passwords

After converting `*.kismet` to `*.pcap` using the `kismetdb_to_pcap` tool,
browse <https://hashcat.net/cap2hashcat/> and upload the `*.pcap` file.

The tool will verify the `*.pcap` file and convert it to a format
suitable for the [hashcat](https://hashcat.net/hashcat/) tool.

<!-- TODO -->

### (Optional) Add location data to Kismet reports

Reference: <https://www.kismetwireless.net/docs/readme/gps/gps_gpsd/>

If you have a GPS (for instance, [this one](https://www.amazon.com/Receiver-Antenna-Gmouse-Laptop-Navigation/dp/B073P3Y48Q)) available and follow the instruction in this section, you will be able to augment Kismet reports with actual location information.

**NOTE**: WORK-IN-PROGRESS

#### Install GPSD

Following the instructions at <https://gpsd.gitlab.io/gpsd/installation.html>,
connect a USB GPS into an empty USB port of the Raspberry Pi.

Verify with `sudo dmesg -w` that the GPS is correctly recognized:

```text
[494743.803508] usb 1-1.2: new full-speed USB device number 5 using dwc_otg
[494743.905774] usb 1-1.2: New USB device found, idVendor=067b, idProduct=2303, bcdDevice= 3.00
[494743.905806] usb 1-1.2: New USB device strings: Mfr=1, Product=2, SerialNumber=0
[494743.905820] usb 1-1.2: Product: USB-Serial Controller
[494743.905831] usb 1-1.2: Manufacturer: Prolific Technology Inc.
[494744.259635] usbcore: registered new interface driver usbserial_generic
[494744.259789] usbserial: USB Serial support registered for generic
[494744.270315] usbcore: registered new interface driver pl2303
[494744.270427] usbserial: USB Serial support registered for pl2303
[494744.270591] pl2303 1-1.2:1.0: pl2303 converter detected
[494744.277325] usb 1-1.2: pl2303 converter now attached to ttyUSB0
```

Verify that the character device has been created correctly:

```text
gmacario@rpi3bgm28:~ $ ls -la /dev/ttyUSB0
crw-rw---- 1 root dialout 188, 0 May  7 15:15 /dev/ttyUSB0
gmacario@rpi3bgm28:~ $
```

If you are not running as root ensure that the user is of the group owning the device:

```bash
sudo usermod -aG dialout $USER
newgrp dialout
```

Make sure you can get data from your GPS (replace `ttyXXX` with the filename of the port detected by `dmesg`):

```bash
stty -F /dev/ttyXXX ispeed 4800 && cat </dev/ttyXXX
```

Example:

```text
gmacario@rpi3bgm28:~ $ stty -F /dev/ttyUSB0 ispeed 4800 && cat </dev/ttyUSB0
3▒F▒▒f▒▒▒f▒▒▒▒SF6k
$GPVTG,,T,,M,,N,,K,N*2C

$GPGGA,001012.039,,,,,0,00,,,M,0.0,M,,0000*5E

$GPGSA,A,1,,,,,,,,,,,,,,,*1E

$GPRMC,001012.039,V,,,,,,,291006,,,N*49

$GPVTG,,T,,M,,N,,K,N*2C

$GPGGA,001013.039,,,,,0,00,,,M,0.0,M,,0000*5F

$GPGSA,A,1,,,,,,,,,,,,,,,*1E

$GPRMC,001013.039,V,,,,,,,291006,,,N*48

$GPVTG,,T,,M,,N,,K,N*2C

^C
gmacario@rpi3bgm28:~ $
```

Install `gpsd` and `gpsd-clients` (the second package is optional but will make troubleshooting easier):

```bash
sudo apt install gpsd
sudo apt install gpsd-clients
```

Reboot the Raspberry Pi to verify that the GPSD service automatically starts at boot.

#### Test GPSD

Connect to port 2947 on localhost. You should be greeted with a JSON message returning the version of GPSD which is correctly running:

```text
gmacario@rpi3bgm28:~ $ tailscale nc localhost 2947
{"class":"VERSION","release":"3.22","rev":"3.22","proto_major":3,"proto_minor":14}
```

Now start raw and watcher modes. After a few minutes you should start receiving GPS reports:

```text
?WATCH={"enable":true,"json":true};
{"class":"DEVICES","devices":[{"class":"DEVICE","path":"/dev/ttyUSB0","activated":"2023-05-07T13:34:29.463Z","native":0,"bps":9600,"parity":"N","stopbits":1,"cycle":1.00}]}
{"class":"WATCH","enable":true,"json":true,"nmea":false,"raw":0,"scaled":false,"timing":false,"split24":false,"pps":false}
{"class":"DEVICE","path":"/dev/ttyUSB0","driver":"NMEA0183","activated":"2023-05-07T13:35:03.168Z","native":0,"bps":4800,"parity":"N","stopbits":1,"cycle":1.00}
{"class":"TPV","device":"/dev/ttyUSB0","mode":1}
{"class":"TPV","device":"/dev/ttyUSB0","mode":1}
{"class":"TPV","device":"/dev/ttyUSB0","mode":1}
{"class":"DEVICE","path":"/dev/ttyUSB0","driver":"SiRF","activated":"2023-05-07T13:35:04.277Z","flags":1,"native":1,"bps":4800,"parity":"N","stopbits":1,"cycle":1.00}
{"class":"SKY","device":"/dev/ttyUSB0","time":"2026-06-14T00:04:20.040Z","nSat":0,"uSat":0}
{"class":"TPV","device":"/dev/ttyUSB0","mode":1,"time":"2026-06-14T00:04:20.040Z","ept":0.005}
{"class":"DEVICE","path":"/dev/ttyUSB0","driver":"SiRF","subtype":"GSW3.2.4-SDK_3.1.00.12-SDK001P1.00 ","activated":"2023-05-07T13:35:05.183Z","flags":1,"native":1,"bps":4800,"parity":"N","stopbits":1,"cycle":1.00}
{"class":"DEVICE","path":"/dev/ttyUSB0","driver":"SiRF","subtype":"GSW3.2.4-SDK_3.1.00.12-SDK001P1.00 ","activated":"2023-05-07T13:35:05.309Z","flags":1,"native":1,"bps":4800,"parity":"N","stopbits":1,"cycle":1.00}
{"class":"SKY","device":"/dev/ttyUSB0","time":"2026-06-14T00:04:21.040Z","hdop":0.00,"nSat":0,"uSat":0}
{"class":"TPV","device":"/dev/ttyUSB0","mode":1,"time":"2026-06-14T00:04:21.040Z","ept":0.005}
{"class":"DEVICE","path":"/dev/ttyUSB0","driver":"SiRF","subtype":"GSW3.2.4-SDK_3.1.00.12-SDK001P1.00 ","activated":"2023-05-07T13:35:06.463Z","flags":1,"native":1,"bps":4800,"parity":"N","stopbits":1,"cycle":1.00}
{"class":"SKY","device":"/dev/ttyUSB0","time":"2026-06-14T00:04:22.050Z","hdop":0.00,"nSat":0,"uSat":0}
{"class":"TPV","device":"/dev/ttyUSB0","mode":1,"time":"2026-06-14T00:04:22.050Z","ept":0.005}
{"class":"SKY","device":"/dev/ttyUSB0","time":"2026-06-14T00:04:23.040Z","hdop":0.00,"nSat":0,"uSat":0}
{"class":"TPV","device":"/dev/ttyUSB0","mode":1,"time":"2026-06-14T00:04:23.040Z","ept":0.005}
```

Type "Ctrl-C" to close the socket.

If you have installed `gpsd-clients`, start the xgps or cgps client.

![image](https://user-images.githubusercontent.com/75182/236681456-e13aba0d-6c98-4dd8-bb66-4b0c07d906fc.png)

### Configure Kismet to use GPSD

Edit file `/etc/kismet/kismet_site.conf` and add the following lines:

```text
# See https://www.kismetwireless.net/docs/readme/gps/gps_gpsd/
gps=gpsd:host=localhost,port=2947
```

```bash
sudo service kismet restart
```

You should then have location information on the top right of the web interface:

![image](https://user-images.githubusercontent.com/75182/236682589-2af05653-50df-4e68-aa17-0327b4eef1b8.png)

## See also

- [WPA Cracking from Kismet sensors](https://www.linkielist.com/hacks/wpa-cracking-from-kismet-sensors/) - Linkielist.com, 2020-03-25
- [How to Secure Your Home Wireless Infrastructure with Kismet and Python](https://www.freecodecamp.org/news/wireless-security-using-raspberry-pi-4-kismet-and-python/) - Jose Vicente Nunez on freeCodeCamp, 2022-03-02

<!-- EOF -->
