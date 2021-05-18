---
layout: post
title:  "Trying Jenkins Pipeline Tutorial"
date:   2016-01-25 17:00:00 CET
categories: howto jenkins pipeline tutorial
---
<!-- markdown-link-check-disable -->

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
(2016-02-01 17:15)

Deploy master branch of gmacario/easy-jenkins to machine `ies-genbld01-vm`

Browse `${JENKINS_URL}` at <http://ies-genbld01-vm.ies.mentorg.com:9080/>

Browse `${JENKINS_URL}/view/All`, then click **New Item**

* Item name: `seed_sysadmin_projects`
* Item type: Copy existing Item
  - Copy from: `TEST-seed-gm-projects`

then click **OK**. Edit the project configuration:

* Build > Add build step > Process Job DSLs
  - Look on Filesystem: Yes
    - DSL Scripts: `mydsl/seed_add_jenkins_slave.groovy`
    - Action for existing jobs and views: Ignore changes: No
    - Action for removed jobs: Ignore
    - Action for removed views: Ignore

Inside `${JENKINS_URL}/job/seed_sysadmin_projects/`, click **Build Now**.

Browse `${JENKINS_URL}/job/add_jenkins_slave`, review project configuration:

- Adjust Branches to build: `*/master` (was: `fix-issue-16-v2`)
- TODO

Browse `${JENKINS_URL}/job/add_jenkins_slave`, then click **Build with Parameters**

- TODO

Result: ERROR

Excerpt from <http://ies-genbld01-vm.ies.mentorg.com:9080/job/add_jenkins_slave/2/console>

```
...
First time build. Skipping changelog.
 > git tag -a -f -m Jenkins Build #2 jenkins-add_jenkins_slave-2 # timeout=10
FATAL: Could not apply tag jenkins-add_jenkins_slave-2
hudson.plugins.git.GitException: Could not apply tag jenkins-add_jenkins_slave-2
	at org.jenkinsci.plugins.gitclient.CliGitAPIImpl.tag(CliGitAPIImpl.java:1263)
	at hudson.plugins.git.GitAPI.tag(GitAPI.java:274)
	at hudson.plugins.git.extensions.impl.PerBuildTag.onCheckoutCompleted(PerBuildTag.java:30)
	at hudson.plugins.git.GitSCM.checkout(GitSCM.java:1098)
	at hudson.scm.SCM.checkout(SCM.java:485)
	at hudson.model.AbstractProject.checkout(AbstractProject.java:1276)
	at hudson.model.AbstractBuild$AbstractBuildExecution.defaultCheckout(AbstractBuild.java:607)
	at jenkins.scm.SCMCheckoutStrategy.checkout(SCMCheckoutStrategy.java:86)
	at hudson.model.AbstractBuild$AbstractBuildExecution.run(AbstractBuild.java:529)
	at hudson.model.Run.execute(Run.java:1738)
	at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
	at hudson.model.ResourceController.execute(ResourceController.java:98)
	at hudson.model.Executor.run(Executor.java:410)
Caused by: hudson.plugins.git.GitException: Command "git tag -a -f -m Jenkins Build #2 jenkins-add_jenkins_slave-2" returned status code 128:
stdout:
stderr:
*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'root@16b3dcf7846d.(none)')

	at org.jenkinsci.plugins.gitclient.CliGitAPIImpl.launchCommandIn(CliGitAPIImpl.java:1693)
	at org.jenkinsci.plugins.gitclient.CliGitAPIImpl.launchCommandIn(CliGitAPIImpl.java:1669)
	at org.jenkinsci.plugins.gitclient.CliGitAPIImpl.launchCommandIn(CliGitAPIImpl.java:1665)
	at org.jenkinsci.plugins.gitclient.CliGitAPIImpl.launchCommand(CliGitAPIImpl.java:1307)
	at org.jenkinsci.plugins.gitclient.CliGitAPIImpl.launchCommand(CliGitAPIImpl.java:1319)
	at org.jenkinsci.plugins.gitclient.CliGitAPIImpl.tag(CliGitAPIImpl.java:1261)
	... 12 more
Notifying upstream projects of job completion
Finished: FAILURE
```

FIXME: Must configure git first (or at least define `domainname`)

WORKAROUND:

```
# docker exec -u root -ti easyjenkins_myjenkins_1 /bin/bash
# git config --global user.name "$(whoami)"
# git config --global user.email "$(whoami)@$(hostname)"
```

(2016-02-01 17:40 CET)

Browse `${JENKINS_URL}/job/add_jenkins_slave/configure`

* Build > Add build step > Execute system Groovy script
  - Groovy script file: `myscripts/add_slave_nodes.groovy`

click **Save**, then **Build with Parameters**

- AgentList: `build-yocto-slave` (default)
- AgentDescription: (default)
- AgentExecutors: 2 (default)

then click **Build**.

Result: SUCCESS

Excerpt from <http://ies-genbld01-vm.ies.mentorg.com:9080/job/add_jenkins_slave/5/console>

```
Started by user anonymous
[EnvInject] - Loading node environment variables.
Building in workspace /var/jenkins_home/workspace/add_jenkins_slave
 > git rev-parse --is-inside-work-tree # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url https://github.com/gmacario/easy-jenkins # timeout=10
Fetching upstream changes from https://github.com/gmacario/easy-jenkins
 > git --version # timeout=10
 > git -c core.askpass=true fetch --tags --progress https://github.com/gmacario/easy-jenkins +refs/heads/*:refs/remotes/origin/*
 > git rev-parse refs/remotes/origin/master^{commit} # timeout=10
 > git rev-parse refs/remotes/origin/origin/master^{commit} # timeout=10
Checking out Revision 89700d5299b37e834fb107778277e46b9d377d45 (refs/remotes/origin/master)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f 89700d5299b37e834fb107778277e46b9d377d45
 > git rev-list 89700d5299b37e834fb107778277e46b9d377d45 # timeout=10
 > git tag -a -f -m Jenkins Build #5 jenkins-add_jenkins_slave-5 # timeout=10
Agent 'build-yocto-slave' created with 2 executors and home '/home/jenkins'
Notifying upstream projects of job completion
Finished: SUCCESS
```

Browse `${JENKINS_URL}/computer/`, verify that the new slave node is listed and connected


----------------------
(2016-02-01 18:58 CET)

Deploy master branch of gmacario/easy-jenkins to machine `mv-linux-powerhorse`

Browse `${JENKINS_URL}` at <http://mv-linux-powerhorse.solarma.it:9080/>

Browse `${JENKINS_URL}/job/seed`, then click **Build Now**

Result: Three generated items:

1. add_jenkins_slave
2. build_gdp
3. configure_git

Browse `${JENKINS_URL}/job/add_jenkins_slave`, then click **Build with Parameters**

- AgentList: `build-yocto-slave`
- AgentDescription: `Auto-created Jenkins agent`
- AgentHome: `/home/jenkins`
- AgentExecutors: `2`

TODO: Add Text parameter "AgentLabels"

then click **Build**

Result: FAILURE

Excerpt from <http://mv-linux-powerhorse.solarma.it:9080/job/add_jenkins_slave/1/console>

```
...
Build #1 jenkins-add_jenkins_slave-1" returned status code 128:
stdout:
stderr:
*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'root@452d4b206b23.(none)')
...
```

TODO: Create issue
Workaround: Run `configure_git` first

(2016-02-01 19:05 CET)

Browse `${JENKINS_URL}/job/configure_git/`, then click **Build Now**

Verify in the Console Output that the job was run on the master node.

(2016-02-01 19:07 CET)

Browse `${JENKINS_URL}/job/add_jenkins_slave/` then click **Build with Parameters**

- AgentList: `build-yocto-slave`
- AgentDescription: `Auto-created Jenkins agent`
- AgentHome: `/home/jenkins`
- AgentExecutors: `2`

TODO: Add Text parameter "AgentLabels"

then click **Build**

Result: SUCCESS

Browse `${JENKINS_URL}`, verify that node `build-yocto-slave` is running.

Browse `${JENKINS_URL}/computer/build-yocto-slave/`, then click **Configure**

- Labels: `yocto`

Then click **Save**.

Browse `${JENKINS_URL}/job/build_gdp/`, then click **Configure**

- Restrict where this project can be run: Yes
  - Label Expression: `yocto`

Then click **Save**.

(2016-02-01 19:10 CET)

Browse `${JENKINS_URL}/job/configure_git/`, then click **Configure**

- Restrict where this project can be run: Yes
  - Label Expression: `build-yocto-slave`

Click **Save**, then click **Build Now**

Browse `${JENKINS_URL}/job/build_gdp/`, then click **Build Now**

(2016-02-02 09:44)

Result: SUCCESS

Excerpt from <http://mv-linux-powerhorse.solarma.it:9080/job/build_gdp/2/console>

```
...
NOTE: Running noexec task 4390 of 4394 (ID: 3607, /home/jenkins/workspace/build_gdp/gdp-src-build/../meta-genivi-demo/recipes-devtools/python/python-pyqt_5.3.1.bb, do_build)
NOTE: Running noexec task 4391 of 4394 (ID: 1853, /home/jenkins/workspace/build_gdp/gdp-src-build/../meta-genivi-demo/recipes-extended/genivi-browser-test-hmi-precompiled/genivi-browser-test-hmi-precompiled.bb, do_build)
NOTE: Running noexec task 4392 of 4394 (ID: 410, /home/jenkins/workspace/build_gdp/gdp-src-build/../meta-genivi-demo/recipes-demo-platform/packagegroups/packagegroup-gdp-browser.bb, do_build)
NOTE: Running task 4393 of 4394 (ID: 7, /home/jenkins/workspace/build_gdp/gdp-src-build/../meta-genivi-demo/recipes-demo-platform/images/genivi-demo-platform.bb, do_rootfs)
NOTE: recipe genivi-demo-platform-1.3+snapshot-20160201-r0: task do_rootfs: Started
NOTE: recipe genivi-demo-platform-1.3+snapshot-20160201-r0: task do_rootfs: Succeeded
NOTE: Running noexec task 4394 of 4394 (ID: 11, /home/jenkins/workspace/build_gdp/gdp-src-build/../meta-genivi-demo/recipes-demo-platform/images/genivi-demo-platform.bb, do_build)
NOTE: Tasks Summary: Attempted 4394 tasks of which 22 didn't need to be rerun and all succeeded.

Summary: There were 16 WARNING messages shown.
Notifying upstream projects of job completion
Finished: SUCCESS
```

Inspecting [project workspace](http://mv-linux-powerhorse.solarma.it:9080/job/build_gdp/ws/)

```
- .git
+ gdp-src-build
  - buildhistory/images/qemux86_64/glibc/genivi-demo-platform
	- cache
	- conf
	- downloads
	- sstate-cache
	+ tmp
    - buildstats/genivi-demo-platform-qemux86-64/201602011814
	  - cache/default-glibc/qemux86-64
	  + deploy
      + images/qemux86-64
        - bzImage	6.31 MB
        - bzImage--3.14.24+git0+a227f20eff_02120556b0-r0-qemux86-64-20160201181402.bin	6.31 MB
        - bzImage-qemux86-64.bin	6.31 MB
        - genivi-demo-platform-qemux86-64.ext3	776.38 MB
        - genivi-demo-platform-qemux86-64.manifest	42.14 KB
        - genivi-demo-platform-qemux86-64.tar.bz2	172.08 MB
        - genivi-demo-platform-qemux86-64-20160201181402.rootfs.ext3	776.38 MB
        - genivi-demo-platform-qemux86-64-20160201181402.rootfs.manifest	42.14 KB
        - genivi-demo-platform-qemux86-64-20160201181402.rootfs.tar.bz2	172.08 MB
        - modules--3.14.24+git0+a227f20eff_02120556b0-r0-qemux86-64-20160201181402.tgz	66.84 MB
        - modules-qemux86-64.tgz	66.84 MB
        - README_-_DO_NOT_DELETE_FILES_IN_THIS_DIRECTORY.txt	294 B
	    - ipk
	    - licenses
      - rpm
	  - log/cooker/qemux86-64
	  - sstate-control
	  - stamps
	  - sysroots
	  - work
	  - work-shared/gcc-4.9.1-r0
	  - abi_version	1 B
	  - qa.log	779 B
	  - saved_tmpdir	51 B
	  - bitbake.lock	0 B
- meta-genivi-demo
- meta-ivi
- meta-openembedded
- meta-qt5
- poky
- .gitignore	204 B
- .gitmodules	470 B
- init.sh	908 B
- README.md
```


-----------------------------
(2016-02-02 07:58 CET)

Deploy master branch of gmacario/easy-jenkins to machine `dc7600-gm`

```
$ cd ~/easy-jenkins
$ eval $(docker-machine env dc7600-gm)
$ docker-compose stop; docker-compose rm -f; docker-compose build --pull
$ ./runme.sh
```

(Optional) Watch docker-compose logs until line `INFO: Jenkins is fully up and running` is displayed:

```
$ docker-compose logs
...
myjenkins_1         | INFO: Completed initialization
myjenkins_1         | Feb 02, 2016 7:05:31 AM hudson.WebAppMain$3 run
myjenkins_1         | INFO: Jenkins is fully up and running
...
```

Browse `${JENKINS_URL}` at <http://dc7600-gm.solarma.it:9080/> and verify that the Jenkins dashboard is displayed correctly.

Browse `${JENKINS_URL}/job/seed`, then click **Build Now**

Result: The following items will be generated and show up in the Jenkins dashboard:

1. add_jenkins_slave
2. build_gdp
3. configure_git

(2016-02-02 08:08 CET)

Browse `${JENKINS_URL}/job/configure_git/`, then click **Build Now**

Verify in the Console Output that the job was run on the master node (at this point there should not be any slave nodes yet)

(2016-02-02 08:10 CET)

Browse `${JENKINS_URL}/job/add_jenkins_slave/` then click **Build with Parameters**

- AgentList: `build-yocto-slave`
- AgentDescription: `Auto-created Jenkins agent`
- AgentHome: `/home/jenkins`
- AgentExecutors: `2`

TODO: Add Text parameter "AgentLabels"

then click **Build**

Result: SUCCESS

Browse `${JENKINS_URL}`, verify that node `build-yocto-slave` is running.

(2016-02-02 08:11 CET)

Browse `${JENKINS_URL}/computer/build-yocto-slave/`, then click **Configure**

- Labels: `yocto`

Then click **Save**.

(2016-02-02 08:14 CET)

Browse `${JENKINS_URL}/job/configure_git/`, then click **Configure**

- Restrict where this project can be run: Yes
  - Label Expression: `build-yocto-slave`

Click **Save**, then click **Build Now**

Verify in the Console Output that the job was run on the slave.

(2016-02-02 08:15 CET)

Browse `${JENKINS_URL}/job/build_gdp/`, then click **Configure**

- Restrict where this project can be run: Yes
  - Label Expression: `yocto`

Then click **Save**.

Browse `${JENKINS_URL}/job/build_gdp/`, then click **Build Now**

Result:

TODO TODO TODO


------------
1.0.92.303740

1.0.21.303740


<!-- markdown-link-check-enable -->
<!-- EOF -->
