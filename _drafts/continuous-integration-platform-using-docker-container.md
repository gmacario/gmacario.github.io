---
layout: post
title:  "Continuous Integration Platform using Docker containers"
date:   2015-12-13 14:10:00 CET
categories: howto docker compose continuous integration jenkins gitlab
---

### Introduction

This page explains how to install an integrated set of open-source CI Tools (Jenkins, Gitlab, Nexus, SonarQube and Selenium Grid) inside Docker containers.

This is based on the excellent [blog post by Mark Birkner](https://blog.codecentric.de/en/2015/10/continuous-integration-platform-using-docker-container-jenkins-sonarqube-nexus-gitlab).

Tested on a laptop with MS Windows 7 64-bit.

### Install Docker Toolbox 1.9.1c

Download Docker Toolbox for your host OS (I chose MS Windows) from <https://www.docker.com/docker-toolbox>

Double click the Docker Toolbox installer.

When the installation is complete, launch "Docker Quickstart Terminal"

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

You may want to allocate more resources to the docker-machine VM.
For instance, assuming you want to allocate 4096 MB of RAM to the VM:

```
$ docker-machine stop default
$ VBoxManage modifyvm default --memory 4096
```

Then launch the Docker Quickstart Terminal, the docker-machine VM will be restarted with the new memory settings.


### Deploy containers using docker-ci-tool-stack

Inside the Docker Quickstart Terminal, clone project docker-ci-tool-stack from GitHub

```
$ git clone https://github.com/marcelbirkner/docker-ci-tool-stack
$ cd docker-ci-tool-stack
```

Now bring up the containers using `docker-compose up`

```
$ docker-compose up
```

Note: The first time the Docker images have to be pulled or built, so this may take a long time to execute.

Unfortunately I got an error:

```
gmacario@ITM-GMACARIO-W7 MINGW64 /e/data/MYGIT/docker-ci-tool-stack (master)
$ docker-compose up
Pulling postgresql (sameersbn/postgresql:9.4-3)...
9.4-3: Pulling from sameersbn/postgresql
Pulling repository docker.io/sameersbn/postgresql
Status: Downloaded newer image for sameersbn/postgresql:9.4-3
docker.io/sameersbn/postgresql: this image was pulled from a legacy registry.  Important: This registry version will not be supported in future versions of docker.
Creating dockercitoolstack_postgresql_1
Building nexus
Step 1 : FROM centos:6
6: Pulling from library/centos
...
TODO
```

TODO: New issue on <https://github.com/marcelbirkner/docker-ci-tool-stack/issues>

Does not work on Docker Toolbox for Windows

When trying the CI Tools Demo on MS Windows 7 64-bit (using Docker Toolbox 1.9.1c) I got the following error:

```
```

# Fix issue TODO

Fork project [marcelbirkner/docker-ci-tool-stack](https://github.com/marcelbirkner/docker-ci-tool-stack)

```
$ git remote add gmacario git@github.com:gmacario/docker-ci-tool-stack.git
```

Create file `.gitattributes`

```
$ git checkout -b fix-issue-xxx
$ git fetch --all --prune
$ git add .gitattributes
$ cat <<END | git commit -s
Add .gitattributes

Make sure that scripts that will be copied into the Docker images have the correct Unix line endings.

Tested with Docker Toolbox 1.9.1c running on MS Windows 7 64-bit.

Fix TODO
END
$ git push -u gmacario fix-issue-xxx
```

TODO: New PR on <https://github.com/marcelbirkner/docker-ci-tool-stack/pulls>

<!-- EOF -->
