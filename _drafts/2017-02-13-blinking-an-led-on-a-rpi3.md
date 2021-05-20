---
layout: post
title:  "Blinking and LED on the Raspberry Pi 3"
date:   2017-02-13 21:00:00 CET
# categories: template android howto development
---
<!-- markdown-link-check-disable -->

<!-- 2017-02-13 12:56 CET) -->

This blog post explains how to blink an LED connected to a Raspberry Pi using the RPi.GPIO Python library.

### References

* Tutorial (with video): <https://www.oreilly.com/learning/connecting-led-to-raspberry-pi>
* RPi GPIO Layout: <https://www.oreilly.com/learning/connecting-led-to-raspberry-pi>

### Step-by-step instructions

```python

import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.OUT)

GPIO.output(18, True)
GPIO.output(18, False)
```

### See also

* RPi.GPIO 0.6.3: <https://pypi.python.org/pypi/RPi.GPIO>
* RPi.GPIO module basics: <https://sourceforge.net/p/raspberry-gpio-python/wiki/BasicUsage/>

<!-- markdown-link-check-enable -->
<!-- EOF -->

<!-- markdown-link-check-enable -->
<!-- EOF -->
