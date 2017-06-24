---
layout: post
title:  "Preparation for Expo Mattoncino 3"
date:   2017-06-22 20:00:00 CEST
tag: arduino lego neopixel
---

This post explains how we prepared for [Expo Mattoncino 3](http://www.tomake.info/expo-mattoncino-2017/) which took place in Pinerolo (TO) on 21 and 22-MAY-2017.

### Preparing the LED strip

In order to create the light effect we will use an Arduino UNO to control the LED strip.

#### Required materials

| Qty | Description | Price [EUR] | Notes |
|-----|-------------|-------------|-------|
| 1 | Arduino UNO | ? | - |
| 1 | [DC5v 5m 60 LED/m ws2812b WS2812 LED Strip Smart RGB 5050 Full color Pixel IC Digital individually Addressable IP67 waterproof tape light](https://www.aliexpress.com/item/DC5V-1m-4m-5m-ws2812b-WS2812-LED-Strip-Smart-RGB-5050-Full-color-Pixel-IC-Ditigal/32647587825.html?spm=2114.13010608.0.0.8TcrW3) | 28.80 | - |
| 1 | [Driver for Power LED AC110V-240V to DC 5V 40A strip Power Supply Adapter Transformer Driver for LED Strip light /CCTV](https://www.aliexpress.com/item/Driver-for-Power-LED-AC110V-240V-to-DC-5V-12V-24V-1A-60A-strip-Power-Supply/32486954065.html?spm=2114.13010608.0.0.8TcrW3) | 25.21 | - |
| 1 | Power cable 220Vac Italian plug | ? | - |
| 1 | Cable USB-A female | ? | - |
| 1 | Electrolytic Capacitor 1000 uF 16V | ? | - |
| 1 | Resistor 470 Ohm 0.25 W | ? | - |

#### Assemble Hardware

1. Connect the Red wire of the LED strip to a +5Vdc screw of the Power Supply
2. Connect White wire of the LED strip to a GND screw of the Power Supply
3. Connect the white wire of the female connector of the LED strip to the Arduino GND pin
4. Connect the green wire of the female connector of the LED strip to the Arduino Pin6 through a 470 Ohm resistor
5. Place the Electrolytic Capacitor near the Red and White wires of the LED strip
6. Connect the main power cable to the input of the Power Supply
7. Plug the main power cable. All the LEDs in the strip should turn white after few seconds.

#### Configure project `strandtest`

Checkout <https://github.com/adafruit/Adafruit_NeoPixel>

```shell
git clone https://github.com/adafruit/Adafruit_NeoPixel
cd Adafruit_NeoPixel/examples/strandtest
```

Now edit file `strandtest.ino` and make the following changes

```diff
gmacario@ITM-GPAOLO-W10:~/Adafruit_NeoPixel/examples/strandtest (master)*$ git diff
diff --git a/examples/strandtest/strandtest.ino b/examples/strandtest/strandtest.ino
index 350b0a5..1a46fc3 100644
--- a/examples/strandtest/strandtest.ino
+++ b/examples/strandtest/strandtest.ino
@@ -13,7 +13,7 @@
 //   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
 //   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
 //   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)
-Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, PIN, NEO_GRB + NEO_KHZ800);
+Adafruit_NeoPixel strip = Adafruit_NeoPixel(300, PIN, NEO_GRB + NEO_KHZ800);

 // IMPORTANT: To reduce NeoPixel burnout risk, add 1000 uF capacitor across
 // pixel power leads, add 300 - 500 Ohm resistor on first pixel's data input
gmacario@ITM-GPAOLO-W10:~/Adafruit_NeoPixel/examples/strandtest (master)*$
```

Start Arduino IDE (tested on Arduino 1.8.2)

* Arduino: Tools > Board: "Arduino/Genuino Uno"
* Arduino: Tools > Port > (choose appropriate COM port)
* Arduino: Sketch > Include Library > Manage Libraries
  * Install "Adafruit NeoPixel" version 1.1.1
* Arduino: File > Open project `strandtest`
* Arduino: Sketch > Verify/Compile
* Arduino: Sketch > Upload

Verify that the LED strips changes colors as instructed in the sketch.

If everything works as expected unplug the USB connector of the Arduino from the PC and connect to the 5Vdc Power Supply.

### Result

![Photo of the assembled LED strip](../images/20170624-114755.jpg)

### References

#### NeoPixel LEDs

* [The Magic of NeoPixels](https://learn.adafruit.com/adafruit-neopixel-uberguide) - Adafruit NeoPixel Uberguide
* Adafruit NeoPixel Library (GitHub): <https://github.com/adafruit/Adafruit_NeoPixel>
* [NeoPixel LEDs: Arduino Basics](https://create.arduino.cc/projecthub/glowascii/neopixel-leds-arduino-basics-126d1a) - Arduino Project Hub
* [Arduino: Come usare LED RGB NeoPixel](http://www.sciamannalucio.it/arduino-come-usare-led-rgb-neopixel/) - Sciammanna Lucio

#### Misc links

* [WS2812 Datasheet](https://cdn-shop.adafruit.com/datasheets/WS2812.pdf) (PDF, 5 pages)
* <https://github.com/craftcodiness/arduino-lights>

<!-- EOF -->
