---
layout: post
title:  "My first experiments with the Arduino YUN"
date:   2015-02-28 14:00:00 CET
categories: arduino fablab torino yun
---

Please refer to <https://github.com/gmacario/learning-arduino>
to get the Fritzing schematics and the corresponding the Arduino sketches.

Read documentation at <http://arduino.cc/en/Main/ArduinoBoardYun>

Start Arduino IDE (version 1.5.6 or later)

Arduino: File > Examples > 01.Basics > Blink

Arduino: Tools > Board > Arduino Yun

Arduino: Tools > Port > COMxx (Arduino Yun)

Arduino: File > Upload

Verify that L13 is blinking every 1000 msec

Adjust the values in the `delay(xxx)` instruction after each
`digitalWrite`, upload the new sketch and verify that the blinking rate
is changing accordingly.

<!-- EOF -->
