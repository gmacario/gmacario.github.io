---
layout: post
title:  "Continuous Integration Platform using Docker Container: Jenkins, SonarQube, Nexus, GitLab"
date:   2015-12-12 23:10:00 CET
categories: howto docker compose continuous integration gitlab
---

### Introduction

See <https://blog.codecentric.de/en/2015/10/continuous-integration-platform-using-docker-container-jenkins-sonarqube-nexus-gitlab>

### Install Docker Toolbox 1.9.1c

Launch "Docker Quickstart Terminal"

```
.                        ##         .
                   ## ## ##        ==
                ## ## ## ## ##    ===
            /"""""""""""""""""\___/ ===
       ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
            \______ o           __/
             \    \         __/
              \____\_______/

docker is configured to use the default machine with IP 192.168.99.101
For help getting started, check out the docs at https://docs.docker.com


gmacario@ITM-GMACARIO-W7 MINGW64 ~
$ docker-machine version
C:\Program Files\Docker Toolbox\docker-machine.exe version 0.5.2 ( 0456b9f )

gmacario@ITM-GMACARIO-W7 MINGW64 ~
$
```

Try upgrading docker-machine

```
gmacario@ITM-GMACARIO-W7 MINGW64 ~
$ docker-machine upgrade default
Detecting the provisioner...
Upgrading docker...
Downloading latest boot2docker iso...
Latest release for github.com/boot2docker/boot2docker is v1.9.1
Downloading https://github.com/boot2docker/boot2docker/releases/download/v1.9.1/
boot2docker.iso to C:\Users\gmacario\.docker\machine\cache\boot2docker.iso...
0%....10%....20%....30%....40%....50%....60%....70%....80%....90%....100%
Stopping machine to do the upgrade...
(default) Stopping VM...
Upgrading machine "default"...
Starting machine back up...
(default) Starting VM...
Restarting docker...

gmacario@ITM-GMACARIO-W7 MINGW64 ~
$ docker-machine version
C:\Program Files\Docker Toolbox\docker-machine.exe version 0.5.2 ( 0456b9f )

gmacario@ITM-GMACARIO-W7 MINGW64 ~
$
```

### Deploy containers using docker-ci-tool-stack

Logged as gmacario@itm-gmacario-w7, start Docker Quickstart Terminal, then clone docker-ci-tool-stack from GitHub

```
$ git clone https://github.com/marcelbirkner/docker-ci-tool-stack
$ cd docker-ci-tool-stack
```

(2015-12-12 09:54 CET)

```
$ docker-compose up
```

TODO


# Fix bug

Create file `.gitattributes`

TODO: new PR <https://github.com/marcelbirkner/docker-ci-tool-stack>

<!-- EOF -->
