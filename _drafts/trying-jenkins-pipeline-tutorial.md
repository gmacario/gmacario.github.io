---
layout: post
title:  "Trying Jenkins Pipeline Tutorial"
date:   2016-01-25 17:00:00 CET
categories: howto jenkins pipeline tutorial
---

# Introduction

TODO

## Trying the Docker image for Pipeline demo

(2016-01-26 14:34 CET)

See <https://github.com/jenkinsci/workflow-plugin/blob/master/demo/README.md>

Logged as gmacario@itm-gmacario-w7, open a Git Bash shell and type the following commands:

```
$ eval $(docker-machine env ies-genbld01-vm)
$ docker-machine ip $(docker-machine active)
$ docker pull jenkinsci/workflow-demo
$ docker run -p 8080:8080 -p 8081:8081 -p 9418:9418 -i jenkinsci/workflow-demo
```

Result:

```
gmacario@ITM-GMACARIO-W7 ~
$ docker-machine ip $(docker-machine active)
139.181.213.96

gmacario@ITM-GMACARIO-W7 ~
$ docker pull jenkinsci/workflow-demo
Using default tag: latest
latest: Pulling from jenkinsci/workflow-demo
Digest: sha256:1664449b73ed58540f0faa3390c40913d5aca99f57acb724c4298989dbdd607e
Status: Image is up to date for jenkinsci/workflow-demo:latest

gmacario@ITM-GMACARIO-W7 ~
$ docker run -p 8080:8080 -p 8081:8081 -p 9418:9418 -i jenkinsci/workflow-demo
[3974] Ready to rumble
START_INI      =  /opt/jetty/start.ini
START_D        =  /opt/jetty/start.d
JETTY_HOME     =  /opt/jetty
JETTY_BASE     =  /opt/jetty
JETTY_CONF     =  /opt/jetty/etc/jetty.conf
JETTY_PID      =  /tmp/jetty.pid
JETTY_START    =  /opt/jetty/start.jar
JETTY_ARGS     =  jetty.port=8081 jetty.state=/opt/jetty/jetty.state jetty-logging.xml jetty-started.xml
JAVA_OPTIONS   =  -Djetty.logs=/opt/jetty/logs -Djetty.home=/opt/jetty -Djetty.base=/opt/jetty -Djava.io.tmpdir=/tmp
JAVA           =  /usr/bin/java
RUN_CMD        =  /usr/bin/java -Djetty.logs=/opt/jetty/logs -Djetty.home=/opt/jetty -Djetty.base=/opt/jetty -Djava.io.tmpdir=/tmp -jar /opt/jetty/start.jar jetty.port=8081 jetty.state=/opt/jetty/jetty.state jetty-logging.xml jetty-started.xml
WARNING: Property jetty.port in <command-line> already set in /opt/jetty/start.ini
2016-01-26 13:39:50.309:INFO::main: Logging initialized @1419ms
2016-01-26 13:39:50.506:WARN:oejs.HomeBaseWarning:main: This instance of Jetty is not running from a separate {jetty.base} directory, this is not recommended.  See documentation at http://www.eclipse.org/jetty/documentation/current/startup.html
2016-01-26 13:39:50.928:INFO::main: Redirecting stderr/stdout to /opt/jetty-distribution-9.2.12.v20150709/logs/2016_01_26.stderrout.log
Running from: /usr/share/jenkins/jenkins.war
webroot: EnvVars.masterEnvVars.get("JENKINS_HOME")
Jan 26, 2016 1:39:55 PM winstone.Logger logInternal
INFO: Beginning extraction from war file
Jan 26, 2016 1:39:57 PM org.eclipse.jetty.util.log.JavaUtilLog info
INFO: jetty-winstone-2.8
Jan 26, 2016 1:40:00 PM org.eclipse.jetty.util.log.JavaUtilLog info
INFO: NO JSP Support for , did not find org.apache.jasper.servlet.JspServlet
Jenkins home directory: /var/jenkins_home found at: EnvVars.masterEnvVars.get("JENKINS_HOME")
Jan 26, 2016 1:40:00 PM org.eclipse.jetty.util.log.JavaUtilLog info
INFO: Started SelectChannelConnector@0.0.0.0:8080
Jan 26, 2016 1:40:00 PM winstone.Logger logInternal
INFO: Winstone Servlet Engine v2.0 running: controlPort=disabled
Jan 26, 2016 1:40:01 PM jenkins.InitReactorRunner$1 onAttained
INFO: Started initialization
Jan 26, 2016 1:40:21 PM jenkins.InitReactorRunner$1 onAttained
INFO: Listed all plugins
Jan 26, 2016 1:40:21 PM jenkins.InitReactorRunner$1 onAttained
INFO: Prepared all plugins
Jan 26, 2016 1:40:21 PM jenkins.InitReactorRunner$1 onAttained
INFO: Started all plugins
Jan 26, 2016 1:40:29 PM jenkins.InitReactorRunner$1 onAttained
INFO: Augmented all extensions
Jan 26, 2016 1:40:29 PM jenkins.InitReactorRunner$1 onAttained
INFO: Loaded all jobs
Jan 26, 2016 1:40:29 PM hudson.model.AsyncPeriodicWork$1 run
INFO: Started Download metadata
Jan 26, 2016 1:40:29 PM org.jenkinsci.main.modules.sshd.SSHD start
INFO: Started SSHD at port 57581
Jan 26, 2016 1:40:29 PM jenkins.util.groovy.GroovyHookScript execute
INFO: Executing /var/jenkins_home/init.groovy.d/tcp-slave-agent-port.groovy
Jan 26, 2016 1:40:30 PM jenkins.InitReactorRunner$1 onAttained
INFO: Completed initialization
Jan 26, 2016 1:40:30 PM hudson.WebAppMain$3 run
INFO: Jenkins is fully up and running
Jan 26, 2016 1:40:33 PM hudson.model.UpdateSite updateData
INFO: Obtained the latest update center data file for UpdateSource default
Jan 26, 2016 1:40:33 PM hudson.model.DownloadService$Downloadable load
INFO: Obtained the updated data file for hudson.tasks.Maven.MavenInstaller
Jan 26, 2016 1:40:34 PM hudson.model.DownloadService$Downloadable load
INFO: Obtained the updated data file for hudson.tasks.Ant.AntInstaller
Jan 26, 2016 1:40:36 PM hudson.model.DownloadService$Downloadable load
INFO: Obtained the updated data file for hudson.tools.JDKInstaller
Jan 26, 2016 1:40:36 PM hudson.model.AsyncPeriodicWork$1 run
INFO: Finished Download metadata. 6,926 ms
--> setting agent port for jnlp
--> setting agent port for jnlp... done
[6446] Connection from 127.0.0.1:36043
[6446] Extended attributes (16 bytes) exist <host=localhost>
[6446] Request upload-pack for '/repo'
[3974] [6446] Disconnected
[6451] Connection from 127.0.0.1:34157
[6451] Extended attributes (16 bytes) exist <host=localhost>
[6451] Request upload-pack for '/repo'
[3974] [6451] Disconnected
[6457] Connection from 127.0.0.1:38620
[6457] Extended attributes (16 bytes) exist <host=localhost>
[6457] Request upload-pack for '/repo'
[3974] [6457] Disconnected
[6472] Connection from [::1]:52780
[6472] Extended attributes (16 bytes) exist <host=localhost>
[6472] Request upload-pack for '/repo'
[3974] [6472] Disconnected
[6499] Connection from [::1]:52781
[6499] Extended attributes (16 bytes) exist <host=localhost>
[6499] Request upload-pack for '/repo'
[3974] [6499] Disconnected
Jan 26, 2016 1:41:03 PM hudson.slaves.NodeProvisioner$StandardStrategyImpl apply
INFO: Started provisioning Mock Slave #1 from mock with 1 executors. Remaining excess workload: 0
Jan 26, 2016 1:41:04 PM hudson.slaves.NodeProvisioner$2 run
INFO: Mock Slave #1 provisioning successfully completed. We have now 2 computer(s)
Jan 26, 2016 1:41:09 PM org.jenkinci.plugins.mock_slave.MockSlaveLauncher launch
INFO: slave agent launched for mock-slave-1
[6587] Connection from [::1]:52783
[6587] Extended attributes (16 bytes) exist <host=localhost>
[6587] Request upload-pack for '/repo'
[3974] [6587] Disconnected
[6614] Connection from [::1]:52784
[6614] Extended attributes (16 bytes) exist <host=localhost>
[6614] Request upload-pack for '/repo'
[3974] [6614] Disconnected
Jan 26, 2016 1:41:17 PM org.jenkinsci.plugins.workflow.steps.scm.MultiSCMRevisionState add
WARNING: overriding old revision state hudson.scm.SCMRevisionState$None@5b82e79 from git git://localhost/repo
Jan 26, 2016 1:41:35 PM hudson.remoting.SynchronousCommandTransport$ReaderThread run
SEVERE: I/O error in channel mock-slave-1
java.net.SocketException: Socket closed
        at java.net.SocketInputStream.socketRead0(Native Method)
        at java.net.SocketInputStream.socketRead(SocketInputStream.java:116)
        at java.net.SocketInputStream.read(SocketInputStream.java:170)
        at java.net.SocketInputStream.read(SocketInputStream.java:141)
        at java.net.SocketInputStream.read(SocketInputStream.java:223)
        at hudson.remoting.FlightRecorderInputStream.read(FlightRecorderInputStream.java:82)
        at hudson.remoting.ChunkedInputStream.readHeader(ChunkedInputStream.java:72)
        at hudson.remoting.ChunkedInputStream.readUntilBreak(ChunkedInputStream.java:103)
        at hudson.remoting.ChunkedCommandTransport.readBlock(ChunkedCommandTransport.java:39)
        at hudson.remoting.AbstractSynchronousByteArrayCommandTransport.read(AbstractSynchronousByteArrayCommandTransport.java:34)
        at hudson.remoting.SynchronousCommandTransport$ReaderThread.run(SynchronousCommandTransport.java:48)

Jan 26, 2016 1:41:36 PM hudson.slaves.NodeProvisioner$StandardStrategyImpl apply
INFO: Started provisioning Mock Slave #2 from mock with 1 executors. Remaining excess workload: 0
Jan 26, 2016 1:41:37 PM hudson.slaves.NodeProvisioner$2 run
INFO: Mock Slave #2 provisioning successfully completed. We have now 2 computer(s)
Jan 26, 2016 1:41:40 PM org.jenkinci.plugins.mock_slave.MockSlaveLauncher launch
INFO: slave agent launched for mock-slave-2
Jan 26, 2016 1:41:41 PM hudson.slaves.NodeProvisioner$StandardStrategyImpl apply
INFO: Started provisioning Mock Slave #3 from mock with 1 executors. Remaining excess workload: -0.265
Jan 26, 2016 1:41:42 PM hudson.slaves.NodeProvisioner$2 run
INFO: Mock Slave #3 provisioning successfully completed. We have now 3 computer(s)
Jan 26, 2016 1:41:45 PM org.jenkinci.plugins.mock_slave.MockSlaveLauncher launch
INFO: slave agent launched for mock-slave-3
[6754] Connection from [::1]:52787
[6754] Extended attributes (16 bytes) exist <host=localhost>
[6754] Request upload-pack for '/repo'
[3974] [6754] Disconnected
[6780] Connection from [::1]:52788
[6780] Extended attributes (16 bytes) exist <host=localhost>
[6780] Request upload-pack for '/repo'
[3974] [6780] Disconnected
Jan 26, 2016 1:41:47 PM org.jenkinsci.plugins.workflow.steps.scm.MultiSCMRevisionState add
WARNING: overriding old revision state hudson.scm.SCMRevisionState$None@5b82e79 from git git://localhost/repo
[6818] Connection from [::1]:52789
[6818] Extended attributes (16 bytes) exist <host=localhost>
[6818] Request upload-pack for '/repo'
[3974] [6818] Disconnected
[6843] Connection from [::1]:52790
[6843] Extended attributes (16 bytes) exist <host=localhost>
[6843] Request upload-pack for '/repo'
[3974] [6843] Disconnected
Jan 26, 2016 1:41:52 PM org.jenkinsci.plugins.workflow.steps.scm.MultiSCMRevisionState add
WARNING: overriding old revision state hudson.scm.SCMRevisionState$None@5b82e79 from git git://localhost/repo
Jan 26, 2016 1:42:34 PM hudson.remoting.SynchronousCommandTransport$ReaderThread run
SEVERE: I/O error in channel mock-slave-3
java.net.SocketException: Socket closed
        at java.net.SocketInputStream.socketRead0(Native Method)
        at java.net.SocketInputStream.socketRead(SocketInputStream.java:116)
        at java.net.SocketInputStream.read(SocketInputStream.java:170)
        at java.net.SocketInputStream.read(SocketInputStream.java:141)
        at java.net.SocketInputStream.read(SocketInputStream.java:223)
        at hudson.remoting.FlightRecorderInputStream.read(FlightRecorderInputStream.java:82)
        at hudson.remoting.ChunkedInputStream.readHeader(ChunkedInputStream.java:72)
        at hudson.remoting.ChunkedInputStream.readUntilBreak(ChunkedInputStream.java:103)
        at hudson.remoting.ChunkedCommandTransport.readBlock(ChunkedCommandTransport.java:39)
        at hudson.remoting.AbstractSynchronousByteArrayCommandTransport.read(AbstractSynchronousByteArrayCommandTransport.java:34)
        at hudson.remoting.SynchronousCommandTransport$ReaderThread.run(SynchronousCommandTransport.java:48)

Jan 26, 2016 1:42:43 PM hudson.remoting.SynchronousCommandTransport$ReaderThread run
SEVERE: I/O error in channel mock-slave-2
java.net.SocketException: Socket closed
        at java.net.SocketInputStream.socketRead0(Native Method)
        at java.net.SocketInputStream.socketRead(SocketInputStream.java:116)
        at java.net.SocketInputStream.read(SocketInputStream.java:170)
        at java.net.SocketInputStream.read(SocketInputStream.java:141)
        at java.net.SocketInputStream.read(SocketInputStream.java:223)
        at hudson.remoting.FlightRecorderInputStream.read(FlightRecorderInputStream.java:82)
        at hudson.remoting.ChunkedInputStream.readHeader(ChunkedInputStream.java:72)
        at hudson.remoting.ChunkedInputStream.readUntilBreak(ChunkedInputStream.java:103)
        at hudson.remoting.ChunkedCommandTransport.readBlock(ChunkedCommandTransport.java:39)
        at hudson.remoting.AbstractSynchronousByteArrayCommandTransport.read(AbstractSynchronousByteArrayCommandTransport.java:34)
        at hudson.remoting.SynchronousCommandTransport$ReaderThread.run(SynchronousCommandTransport.java:48)

Jan 26, 2016 1:42:44 PM hudson.slaves.NodeProvisioner$StandardStrategyImpl apply
INFO: Started provisioning Mock Slave #4 from mock with 1 executors. Remaining excess workload: 0
Jan 26, 2016 1:42:45 PM hudson.slaves.NodeProvisioner$2 run
INFO: Mock Slave #4 provisioning successfully completed. We have now 2 computer(s)
Jan 26, 2016 1:42:48 PM org.jenkinci.plugins.mock_slave.MockSlaveLauncher launch
INFO: slave agent launched for mock-slave-4
Jan 26, 2016 1:42:59 PM hudson.remoting.SynchronousCommandTransport$ReaderThread run
SEVERE: I/O error in channel mock-slave-4
java.net.SocketException: Socket closed
        at java.net.SocketInputStream.socketRead0(Native Method)
        at java.net.SocketInputStream.socketRead(SocketInputStream.java:116)
        at java.net.SocketInputStream.read(SocketInputStream.java:170)
        at java.net.SocketInputStream.read(SocketInputStream.java:141)
        at java.net.SocketInputStream.read(SocketInputStream.java:223)
        at hudson.remoting.FlightRecorderInputStream.read(FlightRecorderInputStream.java:82)
        at hudson.remoting.ChunkedInputStream.readHeader(ChunkedInputStream.java:72)
        at hudson.remoting.ChunkedInputStream.readUntilBreak(ChunkedInputStream.java:103)
        at hudson.remoting.ChunkedCommandTransport.readBlock(ChunkedCommandTransport.java:39)
        at hudson.remoting.AbstractSynchronousByteArrayCommandTransport.read(AbstractSynchronousByteArrayCommandTransport.java:34)
        at hudson.remoting.SynchronousCommandTransport$ReaderThread.run(SynchronousCommandTransport.java:48)

[7032] Connection from 127.0.0.1:44413
[7032] Extended attributes (16 bytes) exist <host=localhost>
[7032] Request upload-pack for '/repo'
[3974] [7032] Disconnected
[7035] Connection from 127.0.0.1:58712
[7035] Extended attributes (16 bytes) exist <host=localhost>
[7035] Request upload-pack for '/repo'
[3974] [7035] Disconnected
[7043] Connection from 127.0.0.1:46273
[7043] Extended attributes (16 bytes) exist <host=localhost>
[7043] Request upload-pack for '/repo'
[3974] [7043] Disconnected
[7046] Connection from 127.0.0.1:54460
[7046] Extended attributes (16 bytes) exist <host=localhost>
[7046] Request upload-pack for '/repo'
[3974] [7046] Disconnected
[7054] Connection from 127.0.0.1:38558
[7054] Extended attributes (16 bytes) exist <host=localhost>
[7054] Request upload-pack for '/repo'
[3974] [7054] Disconnected
[7057] Connection from 127.0.0.1:54926
[7057] Extended attributes (16 bytes) exist <host=localhost>
[7057] Request upload-pack for '/repo'
[3974] [7057] Disconnected
[7064] Connection from 127.0.0.1:48630
[7064] Extended attributes (16 bytes) exist <host=localhost>
[7064] Request upload-pack for '/repo'
[3974] [7064] Disconnected
[7067] Connection from 127.0.0.1:40324
[7067] Extended attributes (16 bytes) exist <host=localhost>
[7067] Request upload-pack for '/repo'
[3974] [7067] Disconnected
[7073] Connection from 127.0.0.1:60408
[7073] Extended attributes (16 bytes) exist <host=localhost>
[7073] Request upload-pack for '/repo'
[3974] [7073] Disconnected
[7076] Connection from 127.0.0.1:44663
[7076] Extended attributes (16 bytes) exist <host=localhost>
[7076] Request upload-pack for '/repo'
[3974] [7076] Disconnected
[7082] Connection from 127.0.0.1:60741
[7082] Extended attributes (16 bytes) exist <host=localhost>
[7082] Request upload-pack for '/repo'
[3974] [7082] Disconnected
[7085] Connection from 127.0.0.1:38192
[7085] Extended attributes (16 bytes) exist <host=localhost>
[7085] Request upload-pack for '/repo'
[3974] [7085] Disconnected
[7091] Connection from 127.0.0.1:33373
[7091] Extended attributes (16 bytes) exist <host=localhost>
[7091] Request upload-pack for '/repo'
[3974] [7091] Disconnected
[7094] Connection from 127.0.0.1:49106
[7094] Extended attributes (16 bytes) exist <host=localhost>
[7094] Request upload-pack for '/repo'
[3974] [7094] Disconnected
```

Browse `http://${DOCKER_MACHINE_IP}:8080`- in our example <http://139.181.213.96:8080/>

then follow the instructions at <https://github.com/jenkinsci/workflow-plugin/blob/master/demo/README.md>

TODO

## Trying the Jenkins Pipeline tutorial using easy-jenkins

See <https://github.com/jenkinsci/workflow-plugin/blob/master/TUTORIAL.md>

### Create a Jenkins instance using easy-jenkins

Logged as gmacario@itm-gmacario-w7, open a Git Bash shell and type the following commands:

(OPTIONAL) If you want to deploy Jenkins to an existing Docker machine

```
$ eval $(docker-machine env ies-genbld01-vm)
```

Clone the git repository, then launch the startup script

```
$ git clone https://github.com/gmacario/easy-jenkins
$ cd easy-jenkins
$ ./runme.sh
```

Result:

```
gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (master)
$ ./runme.sh
INFO: Docker machine ies-genbld01-vm exists, skipping docker-machine create
INFO: Using Docker machine ies-genbld01-vm
easyjenkins_myjenkins_1 is up-to-date
easyjenkins_build-yocto-slave_1 is up-to-date
INFO: Browse http://139.181.213.96:9080/ to access the Jenkins dashboard
INFO: Run the following command to configure your shell:
INFO: eval $(docker-machine env ies-genbld01-vm)

gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (master)
$
```

Then browse the URL displayed on the console (in our example, <http://139.181.213.96:9080/>) to access the Jenkins dashboard.

### Creating my first Pipeline

To create a pipeline, browse the Jenkins dashboard and perform the following steps:

1. Click "New Item", pick a name for your job (example: `my-first-pipeline`), select **Pipeline**, and click **OK**.

  You will be taken to the configuration screen for the Pipeline. The *Script* text area is important as ... Pipeline script is defined. We'll start with a trivial script:

```
echo 'hello from Pipeline'
```

Click "Save" when you are done.

Click "Build Now" to run the pipeline. You should see `#1` under *Build History*.

Click "V" and select "Console Output" to see the output:

```
Started by user anonymous
[Pipeline] echo
hello from Pipeline
[Pipeline] End of Pipeline
Finished: SUCCESS
```

#### Understanding Pipeline Scripts

...

### Creating a simple pipeline

#### Setting Up

Browse `${JENKINS_URL}` Manage Jenkins > Configure System

* Maven > Maven installations > Add Maven
  - Name: `M3`
  - Install automatically: Yes
    - Install from Apache; Version: `3.3.9`

Click **Save**.

#### Checking out and Building Sources

Browse `${JENKINS_URL}` > New Item

* Name: `a-simple-pipeline`
* Type: Copy existing Item
  - Copy from: `my-first-pipeline`

Click **OK**.

Inside the project configuration:

* Pipeline
  - Definition: Pipeline script
  - Script:
```
node {
  git url: 'https://github.com/jglick/simple-maven-project-with-tests.git'
  def mvnHome = tool 'M3'
  sh "${mvnHome}/bin/mvn -B verify"
}
```

Click **Save**, then **Build Now**.

#### Understanding Syntax

TODO

### Create GDP Build Pipeline


-------------------------
(2016-01-27 10:47 CET)

Logged as gmacario@itm-gmacario-w7 on a Git Bash

```
$ cd ~/easy-jenkins/
$ git checkout feat-test-pipeline && git pull --all --prune && git status
$ eval $(docker-machine env ies-genbld01-vm)
```

Reboot VM

```
$ docker-machine ssh ies-genbld01-vm
# sudo apt-get update && sudo apt-get -y dist-upgrade && sudo reboot
```

Rebuild

```
$ cd ~/easy-jenkins/
$ eval $(docker-machine env ies-genbld01-vm)
$ docker-compose kill
$ docker-compose rm
$ docker-compose pull
$ docker-compose build
```

Run

```
$ ./runme.sh
```

Result:

```
gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (feat-test-pipeline)
$ ./runme.sh
INFO: Docker machine ies-genbld01-vm exists, skipping docker-machine create
INFO: Using Docker machine ies-genbld01-vm
Creating easyjenkins_myjenkins_1
Creating easyjenkins_build-yocto-slave_1
INFO: Browse http://139.181.213.96:9080/ to access the Jenkins dashboard
INFO: Run the following command to configure your shell:
INFO: eval $(docker-machine env ies-genbld01-vm)

gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (feat-test-pipeline)
$
```

(2016-01-27 12:00 CET)

Browse <http://139.181.213.96:9080/> ==> Jenkins dashboard displayed

* Browse <http://139.181.213.96:9080/script>, paste script from <https://raw.githubusercontent.com/gmacario/easy-jenkins/master/myscripts/list-plugins.groovy>
* Compare result with <https://github.com/gmacario/easy-jenkins/blob/feat-test-pipeline/myjenkins/plugins.txt> ==> OK, same contents

Merging [easy-jenkins PR #14](https://github.com/gmacario/easy-jenkins/pull/14)


----------------------
# Test easy-jenkins with the Jenkins Pipeline tutorial

(2016-01-27 13:34 CET)

See <https://github.com/gmacario/easy-jenkins/issues/15>


Logged as gmacario@itm-gmacario-w7 on a Git Bash

```
$ cd ~/easy-jenkins/
$ git checkout master && git pull --all --prune && git status
$ eval $(docker-machine env ies-genbld01-vm)
$ ./runme.sh
```

Result:

```
gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (master)
$ ./runme.sh
INFO: Docker machine ies-genbld01-vm exists, skipping docker-machine create
INFO: Using Docker machine ies-genbld01-vm
easyjenkins_myjenkins_1 is up-to-date
easyjenkins_build-yocto-slave_1 is up-to-date
INFO: Browse http://139.181.213.96:9080/ to access the Jenkins dashboard
INFO: Run the following command to configure your shell:
INFO: eval $(docker-machine env ies-genbld01-vm)

gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (master)
$
```

Browse the Jenkins dashboard at <http://139.181.213.96:9080/>

Notice that docker-compose service `build-yocto-slave_1` is running, but there is no slave in Jenkins dashboard.

Create new issue: <https://github.com/gmacario/easy-jenkins/issues/16>

Temporary workaround:

* (Recommended) Watch docker-compose logs
  ```
  $ docker-compose logs
  ```

* Browse `http://${DOCKER_MACHINE_IP}:9080/computer/` to show the defined Jenkins nodes
* If slave node `build-yocto-slave` is not shown, click **New Node**
  - Node name: `build-yocto-slave`
  - Node type: **Dumb Slave**
* Inside the node configuration page, add the following information:
  - Name: (keep default)
  - Remote root directory: `/home/jenkins`
  - Labels: `yocto`
  - Launch method: Launch slave agents via Java Web Start

  then click **Save**

* Verify that node `build-yocto-slave` is now connected



------------------
### Continue replaying Jenkins Pipeline tutorial

(2016-01-27 13:30 CET)

See <https://github.com/gmacario/easy-jenkins/issues/15>

* Browse `http://${DOCKER_MACHINE_IP}:9080/`, click **New Item**
  - Item name: `build-genivi-swm-poc`
  - Type: **Pipeline**

  then click **OK**

* Inside the project configuration page, fill-in the following information:
  - Pipeline
    - Definition: Pipeline script from SCM
    - SCM: Git
      - Repositories
        - Repository URL: `https://gist.github.com/gmacario/5b13a4514c5062f1bfa1`

  then click **Save**

* Browse `http://${DOCKER_MACHINE_IP}:9080/job/build-genivi-swm-poc/build?delay=0sec` to trigger a build


FIXME: Build error - see <http://139.181.213.96:9080/job/build-genivi-swm-poc/1/console>:

```
Started by user anonymous
Cloning the remote Git repository
Cloning repository https://gist.github.com/gmacario/5b13a4514c5062f1bfa1
 > git init /var/jenkins_home/workspace/build-genivi-swm-poc@script # timeout=10
Fetching upstream changes from https://gist.github.com/gmacario/5b13a4514c5062f1bfa1
 > git --version # timeout=10
 > git -c core.askpass=true fetch --tags --progress https://gist.github.com/gmacario/5b13a4514c5062f1bfa1 +refs/heads/*:refs/remotes/origin/*
 > git config remote.origin.url https://gist.github.com/gmacario/5b13a4514c5062f1bfa1 # timeout=10
 > git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* # timeout=10
 > git config remote.origin.url https://gist.github.com/gmacario/5b13a4514c5062f1bfa1 # timeout=10
Fetching upstream changes from https://gist.github.com/gmacario/5b13a4514c5062f1bfa1
 > git -c core.askpass=true fetch --tags --progress https://gist.github.com/gmacario/5b13a4514c5062f1bfa1 +refs/heads/*:refs/remotes/origin/*
 > git rev-parse refs/remotes/origin/master^{commit} # timeout=10
 > git rev-parse refs/remotes/origin/origin/master^{commit} # timeout=10
Checking out Revision 6065e47b873e6acdb7803a70c3e64bda01094409 (refs/remotes/origin/master)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f 6065e47b873e6acdb7803a70c3e64bda01094409
First time build. Skipping changelog.
ERROR: /var/jenkins_home/workspace/build-genivi-swm-poc@script/Jenkinsfile not found
Finished: FAILURE
```


----------------------
(2016-01-20 16:00)

<!-- EOF -->
