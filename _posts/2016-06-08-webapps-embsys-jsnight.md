---
layout: post
title: "Gianpaolo talk at jsNight, 2016-06-08"
date: 2016-06-08 19:00:00 CEST
categories: slides jsnight udooneo embedded
---

From <http://www.treatabit.com/article/torinojs-jsnight-1>

> Torna **#jsNight** un evento dedicato alla programmazione javascript
> e alle tecnologie web open source.
>
> L'incontro si terrà l' 8 giugno presso [I3P](http://i3p.it/), l'incubatore
del Politecnico di Torino, ci saranno 3 x 25min sessioni su importanti
questioni dell'ecosistema javascript e infine social networking con chi rimane!
>
> Ti senti perso tra: NodeJS, AngularJS, MeteorJS, ReactJS, app, Phonegap,.. e JSon? Parliamone!
>
> Programma
>
> - 19:00: Intro - Luigi Maselli
> - 19:10: [Web Applications su sistemi embedded](https://github.com/TorinoJS/torinojs.github.io/issues/6) - Gianpaolo Macario
> - 19:40: [Sistemi LoRa - Gianfranco Poncini](https://github.com/TorinoJS/torinojs.github.io/issues/8)
> - 20:10: [Typescript = JavaScript + OO](https://github.com/TorinoJS/torinojs.github.io/issues/9) - Paolo Marino

## Slides "Web Applications on embedded systems"

* [View slides online](http://slides.com/gianpaolomacario/webapps-jsnight-2016-06-08)
* [PDF version of the slide deck](/images/webapps-jsnight-2016-06-08.pdf)


## UDOO NEO Hands-on (supplement to slides)

### Installing Node.js on UDOO NEO

<!-- 2016-05-31 13:33 CEST -->

Prerequisites

* One [UDOO NEO](http://www.udoo.org/udoo-neo/) (tested with udooneo-gm1 - UDOO NEO Full)
* One 8 GiB MicroSD formatted with [UDOObuntu v2.0rc2](http://www.udoo.org/downloads/)
* Internet connectivity via wired Ethernet or Wi-Fi
* (optional) [USB-to-TTL (3.3V) adapter](http://shop.udoo.org/eu/catalog/product/view/id/50/s/usb-serial-debug-module-for-neo/category/3/)
* One laptop to control the UDOO NEO

Steps

* Connect Ethernet cable.
  - Alternatively, configure Wi-Fi to a local access point
* Connect power supply to the barrel jack
  - Alternatively, power board via Micro-USB from a USB wall charger
* (optional) Connect debug serial

Power up udooneo-gm01, then login as udooer@udooneo-gm01

```
$ sudo apt-get update && sudo apt-get -y dist-upgrade
$ sudo apt-get -y install git nodejs
$ export LANG=C
```

(Optional) Check installed version of git

```
udooer@udooneo:~$ git --version
git version 1.9.1
udooer@udooneo:~$
```

(Optional) Check installed version of nodejs

(Reference: <https://nodejs.org/en/>)

```
udooer@udooneo:~$ nodejs --version
v5.11.1
udooer@udooneo:~$
```

(Optional) Check installed version of npm (comes with nodejs)

(Reference: <https://docs.npmjs.com/getting-started/installing-node>)

```
udooer@udooneo:~$ npm --version
3.8.6
udooer@udooneo:~$
```

(Optional) Get familiar with npm tool

```
$ npm
$ npm help npm
```

Reference: <https://docs.npmjs.com/>

### Inspecting udoo-web-conf

<!-- 2016-06-07 06:47 CEST -->

Inspecting UDOObuntu package `udoo-web-conf`

```
udooer@udooneo:~$ apt show udoo-web-conf
Package: udoo-web-conf
Version: 0.3.0-6
Maintainer: Ettore Chimenti <ek5.chimenti@gmail.com>
Installed-Size: 7,579 kB
Depends: sysv-rc (>= 2.88dsf-24) | file-rc (>= 0.8.16), udoo-web-docs, nodejs (>= 5.7), udoo-web-conf-modules (= 0.3.0-6), network-manager, dtweb
Homepage: http://www.udoo.org
Priority: optional
Section: utils
Download-Size: 2,293 kB
APT-Manual-Installed: yes
APT-Sources: http://repository.udoo.org/ udoobuntu/main armhf Packages
Description: UDOO Neo Web Configurator
 This tool is designed to allow easy configuration and act as an handy web-based
 control panel for UDOO NEO.

udooer@udooneo:~$
```

See <https://github.com/UDOOboard/udoo-web-conf>


Inspecting UDOObuntu package `dtweb`

```
udooer@udooneo:~$ apt show dtweb
Package: dtweb
Version: 1.10
Maintainer: Francesco Montefoschi <francesco.monte@gmail.com>
Installed-Size: 3,409 kB
Depends: php5-cli, build-essential, gksu
Homepage: https://github.com/fmntf/dtweb
Priority: optional
Section: admin
Download-Size: 1,226 kB
APT-Manual-Installed: yes
APT-Sources: http://repository.udoo.org/ udoobuntu/main armhf Packages
Description: Device Tree editor
 Device Tree editor in a web browser

udooer@udooneo:~$
```


### Testing react-isomorphic-minimal on UDOO NEO

<!-- 2016-05-31 13:33 CEST -->

Testing >https://github.com/corso-javascript/react-isomorphic-minimal> on UDOO NEO (UDOObuntu v2.0rc2)

Clone boilerplate

```
$ git clone https://github.com/gmacario/react-isomorphic-minimal example
$ cd example
```

<!-- 2016-05-31 13:51 CEST -->

Install dependencies (see `package.json`):

```
$ npm install
```

Result: WARN

```
...
  |   `-- querystringify@0.0.3
  +-- stream-cache@0.0.2
  +-- strip-ansi@3.0.1
  | `-- ansi-regex@2.0.0
  +-- supports-color@3.1.2
  `-- webpack-dev-middleware@1.6.1
    `-- mime@1.3.4

npm WARN optional Skipping failed optional dependency /chokidar/fsevents:
npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.0.12
udooer@udooneo:~/example$
```

Compile (in development mode)

```
$ npm run build
```

Result: OK

Run (in development mode) and watch for source changes

```
$ npm run watch
```


<!-- 2016-05-31 14:23 CEST -->


```
$ npm run build
$ NODE_ENV=production PORT=3000 HOSTNAME=udooneo npm run start
```

Then browse <http://192.168.12.103:3000/>


### Testing Meteor.js on UDOO NEO

TODO: Check

* <https://udoo.hackster.io/tomfreudenberg/meteor-on-udoo-and-others-a98e6d>
* <https://github.com/4commerce-technologies-AG/meteor>


### Testing ownCloud on UDOO NEO

<!-- 2016-06-07 06:23 CEST -->

Following instructions at [ownCloud docs](https://doc.owncloud.org/server/9.0/admin_manual/installation/source_installation.html)

Stop udoo-web-conf (otherwise will contend port 80)

```
$ sudo service udoo-web-conf stop
```

Install prerequisites

```
$ sudo apt-get install -y apache2 mariadb-server libapache2-mod-php5
$ sudo apt-get install -y php5-gd php5-json php5-mysql php5-curl
$ sudo apt-get install -y php5-intl php5-mcrypt php5-imagick
```

FIXME: Apache: could not start - address :80 already in use (by node)

```
$ sudo service apache2 start
```

TEST: Browse <http://udooneo-ip-address> (i.e. <http://100.84.248.76/>) ==> OK

Donwload and install ownCloud

```
$ mkdir -p ~/Downloads && cd ~/Downloads
$ wget https://download.owncloud.org/community/owncloud-9.0.2.tar.bz2
$ sudo tar -xv -C /var/www -f owncloud-9.0.2.tar.bz2
```

Configure Apache

```
$ cat >/tmp/owncloud.conf <<END
Alias /owncloud "/var/www/owncloud/"

<Directory /var/www/owncloud/>
  Options +FollowSymlinks
  AllowOverride All

 <IfModule mod_dav.c>
  Dav off
 </IfModule>

 SetEnv HOME /var/www/owncloud
 SetEnv HTTP_HOME /var/www/owncloud

</Directory>
END
$ sudo cp /tmp/owncloud.conf /etc/apache2/sites-available/
$ sudo ln -s /etc/apache2/sites-available/owncloud.conf /etc/apache2/sites-enabled/owncloud.conf
$ sudo service apache2 restart
```

TEST: Browse <http://udooneo-ip-address/owncloud> (i.e. <http://100.84.248.76/owncloud>) ==> OK

TODO: Check

* <https://owncloud.org/>
* <https://nextcloud.com/>


## See also

* [Installation, Environment Setup, and Adding Proxy to npm and Node.js Packages](https://dzone.com/articles/installation-environment-setup-and-adding-proxy-to) - Web Dev Zone, 2016-06-01

* [TorinoJS](http://torino.js.org/)

* [Treatabit](http://www.treatabit.com/)

* [#jsNight: 8giugno2016 - Info e registrazione](https://www.eventbrite.it/e/biglietti-torinojs-jsnight-8giu2016-incontro-su-javascript-e-tecnologie-web-open-source-25083305843)

<!-- EOF -->
