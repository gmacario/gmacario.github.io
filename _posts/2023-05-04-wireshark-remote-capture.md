---
layout: post
title: "Remote capture of BLE packets with Wireshark"
date: 2023/05/04
tags: howto bluetooth ble tcpdump wireshark
---

This post explains how to use Open Source tools for capturing Bluetooth Low Energy packets on a remote Linux host and display them in real-time on [Wireshark](https://www.wireshark.org/).

## Before you begin

To follow the directions in this guide, you’ll need the following:

- A Linux host (acting as BLE packet capturing device) with the following characteristics:
  - OS: a recent Debian or Ubuntu distribution
  - SSH server installed
  - Package `bluez-utils` installed
  - A Bluetooth Low Energy adapter supported by the Linux host
- [Wireshark](https://www.wireshark.org/) installed either on the Linux host or on another machine (in this case the OS may also be Windows or macOS)

Those instructions were tested on the following configuration:

- Packet capturing device (no display): `udoox86gm1` (Ubuntu 22.04.2 LTS)
- Wireshark running on `alpha` (Windows 10 Pro)

## Reference documents

- [sshdump(1) Manual Page](https://www.wireshark.org/docs/man-pages/sshdump.html)
- [How to run a remote packet capture with Wireshark and tcpdump](https://www.comparitech.com/net-admin/tcpdump-capture-wireshark/)
- [Btsnoop as pipe input?](https://ask.wireshark.org/question/26666/btsnoop-as-pipe-input/) - ask.wireshark.org, 2022-04-07
- [wireshark/doc/extcap_example.py](https://github.com/wireshark/wireshark/blob/master/doc/extcap_example.py) - wireshark sources
- [Link-Layer Header Types](https://www.tcpdump.org/linktypes.html) - tcpdump and libpcap

## Step-by-step instructions

### Install `dumpcap` on the remote capturing device

ssh gmacario@udoox86gm1

```bash
sudo apt-get update \
  && sudo apt-get -y install tshark
```

#### List interfaces on the remote capturing device

ssh gmacario@udoox86gm1

```bash
dumpcap --list-interfaces
```

Result:

```text
gmacario@udoox86gm1:~$ dumpcap --list-interfaces
1. enp2s0
2. tailscale0
3. docker0
4. veth0228b18
5. any
6. lo (Loopback)
7. virbr0
8. wlp3s0
9. bluetooth0
10. bluetooth-monitor
11. nflog
12. nfqueue
13. dbus-system
14. dbus-session
gmacario@udoox86gm1:~$
```

Make sure that interface `bluetooth-monitor` is listed. If not, verify that the `bluez` package is correctly installed and at least one `hcixx` interface is listed as a result of the `hciconfig -a` command.

### Launch Wireshark

Launch Wireshark on your local machine.

![image](https://user-images.githubusercontent.com/75182/236686774-5695edf7-7d3d-4b08-b82f-51a1b5492f76.png)

#### Capturing from `bluetooth-monitor` on remote device

Wireshark: Capture > Options...

Select "SSH remote capture" > Settings

- Tab "Server"
  - Remote SSH server address: `udoox86gm1`
  - Remote SSH server port: 22
- Tab "Authentication"
  - Remote SSH server username: (none)
  - Remote SSH server password: (none)
  - Path to SSH private key: (none)
  - SSH key passphrase: (none)
  - ProxyCommand: (none)
- Tab "Capture"
  - Remote interface: `bluetooth-monitor`
  - Remote capture command: dumpcap
  - Use sudo on the remote machine: (unchecked)
  - No promiscuous mode: (unchecked)
  - Remote capture filter: (empty)
  - Packets to capture: 0
- Tap "Debug"
  - Set the log level: Message
  - Use a file for debug: (empty)
- Save parameter(s) on capture start: Yes

then click "Save".

Wireshark: Capture > Start

The display on Wireshark gets updated as soon as HCI packets are captured from the remote device.

![image](https://user-images.githubusercontent.com/75182/236293319-971638cb-5db4-4147-bdd8-cb89727efdb9.png)

You may than execute the usual Wireshark commands, such as apply Display Filters, save the packet trace in a `*.pcapng` file, etc.

#### Example: Troubleshoot BLE connections

Execute `bluetoothctl` on the remote capture device:

```text
gmaca@alpha MINGW64 ~
$ ssh gmacario@udoox86gm1 bluetoothctl
[bluetooth]#
Agent registered
[CHG] Controller 30:E3:7A:65:25:FB Pairable: yes
[bluetooth]#
```

then type the following commands (replace `$PERIPHERAL_BT_ADDR` with the one of the peripheral you want to try connecting):

```text
scan on
connect $PERIPHERAL_BT_ADDR

# Wait about 1 minute, then if the connection is still on
disconnect
```

Apply the following Display Filter on Wireshark to focus on the commands and events involved in the connection and disconnection:

```text
(bthci_cmd.opcode == 0x0005) || \
(bthci_cmd.opcode == 0x0405) || \
(bthci_cmd.opcode == 0x0406) || \
(bthci_cmd.opcode == 0x200d) || \
(bthci_cmd.opcode == 0x2043) || \
(bthci_evt.code == 0x03) || \
(bthci_evt.code == 0x05) || \
(bthci_evt.code == 0x0f && \
    ((bthci_evt.opcode == 0x0405) || \
    (bthci_evt.opcode == 0x0406) || \
    (bthci_evt.opcode == 0x200d) || \
    (bthci_evt.opcode == 0x2043)) || \\
(bthci_evt.code == 0x3e && bthci_evt.le_meta_subevent == 0x0a)
```

Result:

![image](https://user-images.githubusercontent.com/75182/236319898-9562e848-ba8b-48ee-9eee-cd4190f087a7.png)

## See also

- <https://tshark.dev/capture/dumpcap>
- [dumpcap(1) Manual Page](https://www.wireshark.org/docs/man-pages/dumpcap.html)

<!-- EOF -->