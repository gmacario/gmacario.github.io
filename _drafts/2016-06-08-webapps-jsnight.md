# My talk at jsNight, 2016-06-08

From http://www.treatabit.com/article/torinojs-jsnight-1

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

[Slides: Web Applications on embedded systems](http://slides.com/gianpaolomacario/webapps-jsnight-2016-06-08)

See also:

* [TorinoJS](http://torino.js.org/)

* [Treatabit](http://www.treatabit.com/)

* [#jsNight: 8giugno2016 - Info e registrazione](https://www.eventbrite.it/e/biglietti-torinojs-jsnight-8giu2016-incontro-su-javascript-e-tecnologie-web-open-source-25083305843)

----------------------------------

### Testing react-isomorphic-minimal on UDOO NEO

(2016-05-31 13:33 CEST)

Testing https://github.com/corso-javascript/react-isomorphic-minimal on UDOO NEO (UDOObuntu v2.0rc2)

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

Clone boilerplate

```
$ git clone https://github.com/gmacario/react-isomorphic-minimal example
$ cd example
```

(2016-05-31 13:51 CEST)

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



TODO

Run (in development mode) and watch for source changes

```
$ npm run watch
```

TODO

(2016-05-31 14:23 CEST)


```
$ npm run build
$ NODE_ENV=production PORT=3000 HOSTNAME=udooneo npm run start
```

Then browse <http://192.168.12.103:3000/>



Inspecting UDOObuntu package `udoo-web-conf`

```
udooer@udooneo:~$ apt-cache show udoo-web-conf
Package: udoo-web-conf
Version: 0.3.0-6
Architecture: all
Maintainer: Ettore Chimenti <ek5.chimenti@gmail.com>
Installed-Size: 7401
Depends: sysv-rc (>= 2.88dsf-24) | file-rc (>= 0.8.16), udoo-web-docs, nodejs (>= 5.7), udoo-web-conf-modules (= 0.3.0-6), network-manager, dtweb
Homepage: http://www.udoo.org
Priority: optional
Section: utils
Filename: pool/main/u/udoo-web-conf/udoo-web-conf_0.3.0-6_all.deb
Size: 2292736
SHA256: 8f542c5db4d6d2bfdf1dca7710c5a43895328f0a09d650b98ea5fc0179bc9d84
SHA1: 500bd2ddf40cda37894c6cd2e316c35742f14b68
MD5sum: 420a170a5a72a30dde42a5b7a76eecaf
Description: UDOO Neo Web Configurator
 This tool is designed to allow easy configuration and act as an handy web-based
 control panel for UDOO NEO.
Description-md5: 599cc78c9bad14f800ef246470f9d7f6

udooer@udooneo:~$
```

See https://github.com/UDOOboard/udoo-web-conf

Inspecting UDOObuntu package `dtweb`

```
udooer@udooneo:~$ apt-cache show dtweb
Package: dtweb
Version: 1.10
Architecture: armhf
Maintainer: Francesco Montefoschi <francesco.monte@gmail.com>
Installed-Size: 3329
Depends: php5-cli, build-essential, gksu
Homepage: https://github.com/fmntf/dtweb
Priority: optional
Section: admin
Filename: pool/main/d/dtweb/dtweb_1.10_armhf.deb
Size: 1225942
SHA256: 001bef9ffcfdf0e6311f656b86068adbc2610f9e05eff30023c1bd7a7cae539e
SHA1: 7226926fe162c2121ea6c3b3bcec722e63968dd4
MD5sum: 9c59381eec1a36531bca272940f50ad3
Description: Device Tree editor
 Device Tree editor in a web browser
Description-md5: b7e8faa00d786d3e68c642b0ff96dfd4

udooer@udooneo:~$
```

TODO

### Testing Meteor.js on UDOO NEO

TODO: Check

* https://udoo.hackster.io/tomfreudenberg/meteor-on-udoo-and-others-a98e6d
* https://github.com/4commerce-technologies-AG/meteor


### Testing ownCloud on UDOO NEO

TODO: Check

* https://owncloud.org/
* https://nextcloud.com/


## See also

* [Installation, Environment Setup, and Adding Proxy to npm and Node.js Packages](https://dzone.com/articles/installation-environment-setup-and-adding-proxy-to) - Web Dev Zone, 2016-06-01

<!-- EOF -->
