---
layout: post
title:  "Connecting to UDOO Neo serial console"
date:   2015-11-08 19:00:00
categories: howto udoo neo embedded software development
---

### Introduction

This post explains how to connect to the Cortex-A9 debug serial of your [UDOO Neo](http://www.udoo.org/udoo-neo/) to control the U-Boot bootloader, watch your Linux kernel boot, and eventually get a login.

### Reference

* See <http://www.udoo.org/docs-neo/Hardware_&_Accessories/Uart_serial.html>
* [UDOO_NEO_schematics.pdf](http://udoo.org/download/files/schematics/UDOO_NEO_schematics.pdf) - UDOO Neo Rev.D2 (JUL-2015) Schematics

### Required material

* One UDOO Neo
* One 8GB MicroSD Card formatted with a bootable image for your UDOO Neo
  * Example: [Udoobuntu2 beta3](http://udoo.org/download/files/Beta/NEO/images/)
* One USB-to-TTL dongle (3.3V level) with male headers
* One laptop with a terminal emulator installed
  * Example: PuTTY on MS Windows
* One battery pack with MicroUSB plug (to power up the UDOO Neo)

### UDOO Neo - Cortex A9 Serial Debug Configuration

* Connect to UART_1 (Cortex A9 serial debug)
* Serial Port Parameters: 115200,8,n,1

### Wiring Diagram

Connect the TTL-level pins of the USB-to-TTL dongle to your UDOO Neo as follows:

| Dongle Pin  | UDOO Neo Pin  | Signal     |
|-------------|---------------|------------|
| GND         | GND           | GND        |
| TX          | 47            | UART1_RXD  |
| RX          | 46            | UART1_TXD  |

#### Detail on UART_1 connections

![Detail on UART_1 connections](/images/20151107-112751.jpg)

### Trying Udoobuntu2_beta3 - Step-by-step instructions

* Plug a 8GB MicroSD Card formatted with Udoobuntu2_beta3 into the MicroSD slot of your UDOO Neo
* Connect the USB plug of the USB-to-TTL dongle on your laptop
* Identify the serial port that is exposed by the USB-to-TTL dongle on your laptop
* Start the terminal emulator on your laptop (parameters: COMxx:115200,8,n,1)
  * For convenience you may create a logfile of the data exchanged on the serial console
* Connect a USB battery pack to the MicroUSB connector to power-up the board
* Watch the U-Boot and kernel boot messages on the serial console

Sample logfile: [20151107-1106-udoobuntu2_beta3-udooneo.txt](/images/20151107-1106-udoobuntu2_beta3-udooneo.txt)

<!-- EOF -->
