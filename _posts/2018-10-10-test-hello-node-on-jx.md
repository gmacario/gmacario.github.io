---
layout: post
title:  "Deploying a Node.JS application on Kubernetes using Jenkins X"
date:   2018-10-10 12:00:00
categories: howto kubernetes gcp jenkins nodejs
---

### Introduction

This article explains how to deploy a simple [Node.JS](https://nodejs.org/) application on a [Kubernetes](https://kubernetes.io/) cluster using [Jenkins X](https://jenkins-x.io/).

This post is the follow-up to my previous article [Installing Jenkins X on Google Cloud Platform](https://gmacario.github.io/howto/kubernetes/gcp/jenkins/2018/10/09/install-jenkinsx-on-gcp.html).

The following instructions have been tested on host "nemo" (Ubuntu 18.04.1 LTS 64-bit).

We will create our sample application using Jenkins X Quickstart. Quickstarts are pre-made applications you can start a project from, instead of starting from scratch.

### References

* <https://jenkins-x.io/getting-started/>
* <https://gmacario.github.io/howto/kubernetes/gcp/jenkins/2018/10/09/install-jenkinsx-on-gcp.html>

### Prerequisites

* The `jx` binary is installed and available from your shell
* Jenkins X properly configured

Browse <https://console.cloud.google.com/>

Select the proper GCP project (in our case, `kubernetes-workshop-218213`)

Click on the "Activate Cloud Shell" icon.

#### To install the `jx` binary

```shell
mkdir -p ~/Downloads && cd ~/Downloads
curl -L https://github.com/jenkins-x/jx/releases/download/v1.3.399/jx-linux-amd64.tar.gz | tar xzv
sudo mv jx /usr/local/bin
```

Verify that jx is correctly configured

```shell
jx status
```

Expected output:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx status
Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_tonguetree): 3 nodes, memory 15% of 17354292Ki, cpu 41% of 5790m. Jenkins is running at http://jenkins.jx.35.241.213.226.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

### Create quickstart application `node-http-hmi-repository`

<!-- 2018-10-09 12:40 CEST -->

Reference: <https://jenkins-x.io/developing/create-quickstart/>

Logged as `gmacario@cloudshell`

```shell
jx create quickstart
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx create quickstart
? select the quickstart you wish to create  [Use arrows to move, type to filter]
> android-quickstart
  angular-io-quickstart
  aspnet-app
  dlang-http
  golang-http
  jenkins-cwp-quickstart
  jenkins-quickstart
```

Select `node-http`

```
? select the quickstart you wish to create node-http
? Project name (node-http)
```

Type `node-http-hmi-repository`

```
? Project name node-http-hmi-repository
Generated quickstart at /home/gmacario/node-http-hmi-repository
### NO charts folder /home/gmacario/node-http-hmi-repository/charts/node-http
Created project at /home/gmacario/node-http-hmi-repository

No username defined for the current Git server!
? Do you wish to use gmacario as the Git user name: (Y/n)
```

Type `Y`

```
? Do you wish to use gmacario as the Git user name: Yes
The directory /home/gmacario/node-http-hmi-repository is not yet using git
? Would you like to initialise git now? (Y/n)
```

Type `Y`

```
? Would you like to initialise git now? Yes
? Commit message:  (Initial import)
```

Accept default

```
? Commit message:  Initial import
Git repository created
performing pack detection in folder /home/gmacario/node-http-hmi-repository
--> Draft detected JavaScript (36.530078%)
selected pack: /home/gmacario/.jx/draft/packs/github.com/jenkins-x/draft-packs/packs/javascript
replacing placeholders in directory /home/gmacario/node-http-hmi-repository
app name: node-http-hmi-repository, git server: github.com, org: gmacario, Docker registry org: gmacario
skipping directory "/home/gmacario/node-http-hmi-repository/.git"
Using Git provider GitHub at https://github.com


About to create repository node-http-hmi-repository on server https://github.com with user gmacario
? Which organisation do you want to use?  [Use arrows to move, type to filter]
  SOLARMA
  TorinoTech
  arolgroup
> gmacario
  hackafake
  kuruho
  robotrokers
```

Select `gmacario`

```
? Which organisation do you want to use? gmacario
? Enter the new repository name:  (node-http-hmi-repository)
```

Accept default

```
? Enter the new repository name:  node-http-hmi-repository


Creating repository gmacario/node-http-hmi-repository
Pushed Git repository to https://github.com/gmacario/node-http-hmi-repository

Created Jenkins Project: http://jenkins.jx.35.241.213.226.nip.io/job/gmacario/job/node-http-hmi-repository/

Watch pipeline activity via:    jx get activity -f node-http-hmi-repository -w
Browse the pipeline log via:    jx get build logs gmacario/node-http-hmi-repository/master
Open the Jenkins console via    jx console
You can list the pipelines via: jx get pipelines
When the pipeline is complete:  jx get applications

For more help on available commands see: https://jenkins-x.io/developing/browsing/

Note that your first pipeline may take a few minutes to start while the necessary images get downloaded!

Creating GitHub webhook for gmacario/node-http-hmi-repository for url http://jenkins.jx.35.241.213.226.nip.io/github-webhook/
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

#### Run `jx status`

Command

```shell
jx status
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx status
Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_tonguetree): 3 nodes, memory 15% of 17354292Ki, cpu 41% of 5790m. Jenkins is running at http://jenkins.jx.35.241.213.226.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

#### Display Jenkins Dashboard

Login to Jenkins Dashboard at the URL returned by the `$(jx console)` command.

In our example this is <http://jenkins.jx.35.241.213.226.nip.io>

**NOTE**: Jenkins login credentials (username: `admin`, password: `****`) have been provided during the installation of Jenkins X, and are stored in file `~/.jx/jenkinsAuth.yaml`.

#### Preview staging environment

Browse GCP Console > Kubernetes Engine > Services

In tab "Kubernetes service", filter by "Service Type: Ingress"

Browse app sources at <https://github.com/gmacario/node-http-hmi-repository>

Browse the staging environment of "node-http-hmi-repository" at <http://node-http-hmi-repository.jx-staging.35.241.213.226.nip.io/>

Browse the production environment of "node-http-hmi-repository" at TODO





#### Run `TODO`

Command

```shell
TODO
```

Result

```
TODO
```

TODO TODO

### See also

* <https://jenkins-x.io/>
* <https://jenkins.io/projects/jenkins-x/>

<!-- EOF -->
