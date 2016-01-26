---
layout: post
title:  "Trying Jenkins Pipeline Tutorial"
date:   2016-01-25 17:00:00 CET
categories: howto jenkins pipeline tutorial
---

# Introduction

TODO

## Trying the Docker image for Pipeline demo

See <https://github.com/jenkinsci/workflow-plugin/blob/master/demo/README.md>

Logged as gmacario@itm-gmacario-w7, open a Git Bash shell and type the following commands:

```
$ docker-machine ip $(docker-machine active)
$ docker run -p 8080:8080 -p 8081:8081 -p 9418:9418 -i jenkinsci/workflow-demo
```

Result:

```
...
```

Now browse <http://192.168.99.100:8080/>

TODO

## Trying the Jenkins Pipeline tutorial using easy-jenkins

See <https://github.com/jenkinsci/workflow-plugin/blob/master/TUTORIAL.md>

### Create a Jenkins instance using easy-jenkins

Logged as gmacario@itm-gmacario-w7, open a Git Bash shell and type the following commands:

```
$ git clone https://github.com/gmacario/easy-jenkins
$ cd easy-jenkins
$ ./runme.sh
```

Result:

```
gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (master)
$ ./runme.sh
WARNING: Docker machine easy-jenkins exists, skipping docker-machine create
INFO: Using Docker machine easy-jenkins
easyjenkins_myjenkins_1 is up-to-date
easyjenkins_build-yocto-slave_1 is up-to-date
INFO: Browse http://192.168.99.100:9080/ to access the Jenkins dashboard
INFO: Run the following command to configure your shell:
INFO: eval $(docker-machine env easy-jenkins)

gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (master)
$
```

Then browse the URL displayed on the console (in our example, <http://192.168.99.100:9080/>) to access the Jenkins dashboard

### Create a Pipeline

Inside the Jenkins dashboard, click **New Item**

* Name: `my-sample-pipeline`
* Type: Pipeline

then click **Ok**.

You will be taken to the configuration screen for the Pipeline.

Definition: `echo 'hello from Pipeline'`

<!-- EOF -->
