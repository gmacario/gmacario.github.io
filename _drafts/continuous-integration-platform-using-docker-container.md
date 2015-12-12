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

#### Fix issue marcelbirkner/docker-ci-tool-stack/issues/2

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

#### Cleanup and retry `docker-compose up`

<!-- 2015-12-12 17:30 CET -->

```
gmacario@ITM-GMACARIO-W7 MINGW64 /e/data/MYGIT/docker-ci-tool-stack (fix-issue-2)
$ docker-compose.exe up
Creating dockercitoolstack_postgresql_1
Building nexus
Step 1 : FROM centos:6
 ---> 1a895dd3954a
Step 2 : MAINTAINER Marcel Birkner <marcel.birkner@codecentric.de>
 ---> Running in 7fa868da5e2e
 ---> 7d4f31f3f6de
Removing intermediate container 7fa868da5e2e
Step 3 : USER root
 ---> Running in 2f1d390b5965
 ---> 029841754b1c
Removing intermediate container 2f1d390b5965
Step 4 : RUN yum -y update;     yum clean all
 ---> Running in 57c6af8637c4
Loaded plugins: fastestmirror
Setting up Update Process
Resolving Dependencies
--> Running transaction check
---> Package bash.x86_64 0:4.1.2-33.el6 will be updated
...
Status: Downloaded newer image for selenium/node-firefox-debug:latest
Creating dockercitoolstack_nodeff_1
Attaching to dockercitoolstack_postgresql_1, dockercitoolstack_nexus_1, dockercitoolstack_redis_1, dockercitoolstack_gitlab_1, dockercitoolstack_sonar_1, dockercitoolstack_db_1, dockercitoolstack_selhub_1, dockercitoolstack_jenkins_1, dockercitoolstack_nodechrome_1, dockercitoolstack_nodeff_1
postgresql_1 | Creating user "gitlab"...
postgresql_1 | 2015-12-12 15:05:42 UTC [20-1] LOG:  database system was interrupted; last known up at 2015-12-12 13:54:27 UTC
nexus_1      | Running Nexus OSS...
postgresql_1 | 2015-12-12 15:05:42 UTC [20-2] LOG:  database system was not properly shut down; automatic recovery in progress
nexus_1      | wrapper  | --> Wrapper Started as Console
postgresql_1 | 2015-12-12 15:05:42 UTC [20-3] LOG:  record with zero length at 0/1892CD8
redis_1      | Starting redis-server...
postgresql_1 | 2015-12-12 15:05:42 UTC [20-4] LOG:  redo is not required
postgresql_1 | 2015-12-12 15:05:42 UTC [20-5] ERROR:  role "gitlab" already exists
nexus_1      | wrapper  | Launching a JVM...
postgresql_1 | 2015-12-12 15:05:42 UTC [20-6] STATEMENT:  CREATE ROLE gitlab with LOGIN CREATEDB PASSWORD 'password';
redis_1      |                 _._
postgresql_1 |
redis_1      |            _.-``__ ''-._
nexus_1      | jvm 1    | Wrapper (Version 3.2.3) http://wrapper.tanukisoftware.org
gitlab_1     | Waiting for database server to accept connections
redis_1      |       _.-``    `.  `_.  ''-._           Redis 2.8.4 (00000000/0) 64 bit
nexus_1      | jvm 1    |   Copyright 1999-2006 Tanuki Software, Inc.  All Rights Reserved.
postgresql_1 | Creating database "gitlabhq_production"...
sonar_1      | 2015.12.12 15:09:47 INFO  app[o.s.p.m.JavaProcessLauncher] Launch process[search]: /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java -Djava.awt.headless=true -Xmx1G -Xms256m -Xss256k -Djava.net.preferIPv4Stack=true -XX:+UseParNewGC -XX:+UseConcMarkSweepGC -XX:CMSInitiatingOccupancyFraction=75 -XX:+UseCMSInitiatingOccupancyOnly -XX:+HeapDumpOnOutOfMemoryError -Djava.io.tmpdir=/opt/sonarqube/temp -cp ./lib/common/*:./lib/search/* org.sonar.search.SearchServer /tmp/sq-process3518480578304016331properties
redis_1      |   .-`` .-```.  ```\/    _.,_ ''-._
nexus_1      | jvm 1    |
gitlab_1     | Starting supervisord...
redis_1      |  (    '      ,       .-`  | `,    )     Running in stand alone mode
db_1         | The files belonging to this database system will be owned by user "postgres".
postgresql_1 | 2015-12-12 15:05:42 UTC [25-1] ERROR:  database "gitlabhq_production" already exists
selhub_1     | starting selenium hub with configuration:
redis_1      |  |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
nexus_1      | jvm 1    | 2015-12-12 15:09:41,347+0000 INFO  [WrapperListener_start_runner] *SYSTEM org.sonatype.nexus.bootstrap.jsw.JswLauncher - Starting with arguments: [./conf/jetty.xml, ./conf/jetty-requestlog.xml]
sonar_1      | 2015.12.12 15:09:48 INFO   es[o.s.p.ProcessEntryPoint]  Starting search
db_1         | This user must also own the server process.
postgresql_1 | 2015-12-12 15:05:42 UTC [25-2] STATEMENT:  CREATE DATABASE gitlabhq_production;
gitlab_1     | 2015-12-12 16:09:46,944 CRIT Supervisor running as root (no user in config file)
redis_1      |  |    `-._   `._    /     _.-'    |     PID: 1
nexus_1      | jvm 1    | 2015-12-12 15:09:41,351+0000 INFO  [WrapperListener_start_runner] *SYSTEM org.sonatype.nexus.bootstrap.jsw.JswLauncher - JVM ID: 1, JVM PID: 56, Wrapper PID: 54, User: nexus
selhub_1     |
db_1         |
Traceback (most recent call last):
  File "<string>", line 3, in <module>
  File "C:\projects\compose\compose\cli\main.py", line 54, in main
  File "C:\projects\compose\compose\cli\docopt_command.py", line 23, in sys_dispatch
  File "C:\projects\compose\compose\cli\docopt_command.py", line 26, in dispatch
  File "C:\projects\compose\compose\cli\main.py", line 171, in perform_command
  File "C:\projects\compose\compose\cli\main.py", line 551, in up
  File "C:\projects\compose\compose\cli\main.py", line 683, in attach_to_logs
  File "C:\projects\compose\compose\cli\log_printer.py", line 27, in run
  File "C:\projects\compose\compose\cli\multiplexer.py", line 35, in loop
socket.error: [Errno 10054] An existing connection was forcibly closed by the remote host
docker-compose returned -1

gmacario@ITM-GMACARIO-W7 MINGW64 /e/data/MYGIT/docker-ci-tool-stack (fix-issue-2)
$
```

**NOTE**: The error is mostly due to low memory.
Adjust VM settings (set Base Memory: 4096 MB) as explained earlier, then retry.

#### Extend VM Base Memory, then retry `docker-compose up`

<!-- 2015-12-12 17:40 CET -->

```
$ docker-machine stop default
$ VBoxManage modifyvm default --memory 4096
$ docker-machine start default
$ eval "docker-machine env default"
```

Result:

```
gmacario@ITM-GMACARIO-W7 MINGW64 /e/data/MYGIT/docker-ci-tool-stack (fix-issue-2)
$ docker-machine stop default
(default) Stopping VM...

gmacario@ITM-GMACARIO-W7 MINGW64 /e/data/MYGIT/docker-ci-tool-stack (fix-issue-2)
$ VBoxManage modifyvm default --memory 4096

gmacario@ITM-GMACARIO-W7 MINGW64 /e/data/MYGIT/docker-ci-tool-stack (fix-issue-2)
$ docker-machine start default
(default) Starting VM...
Started machines may have new IP addresses. You may need to re-run the `docker-machine env` command.

gmacario@ITM-GMACARIO-W7 MINGW64 /e/data/MYGIT/docker-ci-tool-stack (fix-issue-2)
$ eval "docker-machine env default"
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.102:2376"
export DOCKER_CERT_PATH="C:\Users\gmacario\.docker\machine\machines\default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval "$(C:\Program Files\Docker Toolbox\docker-machine.exe env default)"

gmacario@ITM-GMACARIO-W7 MINGW64 /e/data/MYGIT/docker-ci-tool-stack (fix-issue-2)
$
```

Now bring up the containers

```
$ docker-compose up
```

Access the web interface of the installed tools:

```
BASE=$(docker-machine ip default)
```

| Tool          | URL                            | Credentials       | Notes |
|---------------|--------------------------------|-------------------|-------|
| Jenkins       | http://$BASE:18080/            | no login required | The URL in the blog is incorrect |
| SonarQube     | http://$BASE:19000/            | admin/admin       | ERR_CONNECTION_REFUSED |
| Nexus         | http://$BASE:18081/nexus       | admin/admin123    | OK |
| GitLab        | http://$BASE:10080/            | root/5iveL!fe     | ERR_CONNECTION_REFUSED |
| Selenium Grid | http://$BASE:4444/grid/console | no login required | OK |

<!-- EOF -->
