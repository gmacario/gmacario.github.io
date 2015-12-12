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
Step 13 : RUN cd /opt/sonarqube/extensions/plugins/   && curl -o sonar-java-plugin-3.5.jar -fSL $SONAR_DOWNLOAD_URL/sonar-java-plugin/sonar-java-plugin-3.5.jar   && curl -o sonar-web-plugin-2.4.jar -fSL $SONAR_DOWNLOAD_URL/sonar-web-plugin/sonar-web-plugin-2.4.jar   && curl -o sonar-scm-git-plugin-1.1.jar -fSL http://downloads.sonarsource.com/plugins/org/codehaus/sonar-plugins/sonar-scm-git-plugin/1.1/sonar-scm-git-plugin-1.1.jar
 ---> Running in 98caf842835c
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100 2896k  100 2896k    0     0   242k      0  0:00:11  0:00:11 --:--:--  296k
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100  834k  100  834k    0     0   153k      0  0:00:05  0:00:05 --:--:--  180k
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 2617k  100 2617k    0     0  50044      0  0:00:53  0:00:53 --:--:-- 53773
 ---> ffd13e4bcb67
Removing intermediate container 98caf842835c
Step 14 : VOLUME $SONARQUBE_HOME/data $SONARQUBE_HOME/extensions
 ---> Running in 3c1ecce138d2
 ---> 4dd84a6c1c5b
Removing intermediate container 3c1ecce138d2
Step 15 : WORKDIR $SONARQUBE_HOME
 ---> Running in bae34b882e6f
 ---> f621439a1d04
Removing intermediate container bae34b882e6f
Step 16 : COPY run.sh $SONARQUBE_HOME/bin/
 ---> 52eed104b885
Removing intermediate container 46b465a63782
Step 17 : RUN chmod +x $SONARQUBE_HOME/bin/run.sh
 ---> Running in 61968ebb0760
 ---> c4ee608a8ddd
Removing intermediate container 61968ebb0760
Step 18 : ENTRYPOINT ./bin/run.sh
 ---> Running in e4e236656546
 ---> e3b9da9eed3f
Removing intermediate container e4e236656546
Successfully built e3b9da9eed3f
Creating dockercitoolstack_sonar_1
Cannot start container 7f83a11bdf605b1d66d1d65b8af3f7440548aab3a79f580af45c26a06d75051e: [8] System error: no such file or directory

gmacario@ITM-GMACARIO-W7 MINGW64 /e/data/MYGIT/docker-ci-tool-stack (master)
$
```

<!-- 2015-12-12 15:51 CET -->

Create new issue on <https://github.com/marcelbirkner/docker-ci-tool-stack/issues>

> Does not work on Docker Toolbox for Windows

<https://github.com/marcelbirkner/docker-ci-tool-stack/issues/2>

#### Fixing issue marcelbirkner/docker-ci-tool-stack/issues/2

Fork project [marcelbirkner/docker-ci-tool-stack](https://github.com/marcelbirkner/docker-ci-tool-stack)

Create file `.gitattributes`

```
$ git remote add gmacario git@github.com:gmacario/docker-ci-tool-stack.git
$ git checkout -b fix-issue-2
$ git fetch --all --prune
$ git add .gitattributes
$ git commit
$ git push -u gmacario fix-issue-2
```

<!-- 2015-12-12 17:26 CET -->

Created new PR on <https://github.com/marcelbirkner/docker-ci-tool-stack/pulls>

> Add .gitattributes

<https://github.com/marcelbirkner/docker-ci-tool-stack/pull/3>

<!-- EOF -->
