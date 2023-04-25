# Running Kismet on a Raspberry Pi

## Introduction

TODO

## Requirements

- A host running a recent Debian-based distribution. Tested on `rpi3bgm28` - a [Raspberry Pi 3 Model B](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/) running [Raspberry Pi OS Lite](https://www.raspberrypi.com/software/) 64-bit (bullseye)
- A Wi-Fi adapter which supports monitor mode. Tested with a [D-Link DWL-G122](https://support.dlink.com/ProductInfo.aspx?m=DWL-G122) Wireless-G USB Dongle

## Step-by-step instructions

Login to the Raspberry Pi via SSH.

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

In our case we are running [Raspberry Pi OS Lite](https://www.raspberrypi.com/software/)

- System: 64-bit (arch=aarch64).
- Debian version: 11 (bullseye)

Make sure the distribution is up-to-date

```bash
sudo apt-get update && sudo apt-get -y dist-upgrade && sudo apt-get -y autoremove --purge
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

Logout and login to apply the changes.

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

Browse <http://rpi3gm28:2501> to access Kismet web UI.

The first time you access the web UI you the following dialog box will be displayed:

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
> - User name: TODO
> - Password: TODO
> - Confirm: TODO

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

TODO

### Runtime censorship

Kismet can be configured to censor some information - such as the last digits of MAC address or SSID - displayed in the web UI, in order to make it easier to share screenshots or demos without revealing sensitive data.

Censorship mode can be enabled by adding `?censor=1` to Kismet URL, for instance
<http://localhost:2501/?censor=1> or <http://rpi3bgm28:2501/?censor=1>

TODO: Screenshot

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

You may then open the generated `*.pcap` with a tool such as Wireshark:

<!-- TODO: Screenshot -->

<!--
TODO: After converting `*.kismet` to `*.pcap` using the kismetdb_to_pcap tool,
browse <https://hashcat.net/cap2hashcat/> and upload the `*.pcap` file.

The tool will verify the *.pcap file and convert it to a format
suitable for the [hascat](https://hashcat.net/hashcat/) tool.

See also: [WPA Cracking from Kismet sensors](https://www.linkielist.com/hacks/wpa-cracking-from-kismet-sensors/) - Linkielist.com, 2020-03-25
-->

<!--
See also: [How to Secure Your Home Wireless Infrastructure with Kismet and Python](https://www.freecodecamp.org/news/wireless-security-using-raspberry-pi-4-kismet-and-python/) - Jose Vicente Nunez on freeCodeCamp, 2022-03-02
-->

<!-- EOF -->
