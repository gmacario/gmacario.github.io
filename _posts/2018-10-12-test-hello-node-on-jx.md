---
layout: post
title:  "Deploying a Node.JS application on Kubernetes using Jenkins X"
date:   2018-10-12 12:00:00 CEST
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

#### Reinstalling the `jx` binary

<!-- 2018-10-12 10:01 CEST -->

Type the following commands in case the `jx` command was not properly installed:

```shell
mkdir -p ~/.jx/bin
curl -L https://github.com/jenkins-x/jx/releases/download/v1.3.414/jx-linux-amd64.tar.gz | tar xzv -C ~/.jx/bin
export PATH=$PATH:~/.jx/bin
echo 'export PATH=$PATH:~/.jx/bin' >> ~/.bashrc
source ~/.bashrc
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

```shell
jx diagnose
```

Expected output:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx diagnose
Running in namespace: jx
Jenkins X Version:
 Using helmBinary helm with feature flag: none
NAME               VERSION
jx                 1.3.414
jenkins x platform 0.0.2755
Kubernetes cluster v1.9.7-gke.6
kubectl            v1.10.7
helm client        v2.10.0+g9ad53aa
helm server        v2.10.0+g9ad53aa
git                git version 2.11.0

Jenkins X Status:
 Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_tonguetree): 3 nodes, memory 15% of 17354292Ki, cpu 41% of 5790m. Jenkins is running at http://jenkins.jx.35.241.213.226.nip.io

Kubernetes PVCs:
 NAME                        STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
jenkins                     Bound     pvc-4014d9f4-cb9c-11e8-a1b0-42010a84014f   30Gi       RWO            standard       2d
jenkins-x-chartmuseum       Bound     pvc-40120cba-cb9c-11e8-a1b0-42010a84014f   8Gi        RWO            standard       2d
jenkins-x-docker-registry   Bound     pvc-40131c4c-cb9c-11e8-a1b0-42010a84014f   100Gi      RWO            standard       2d
jenkins-x-mongodb           Bound     pvc-4015b339-cb9c-11e8-a1b0-42010a84014f   8Gi        RWO            standard       2d
jenkins-x-nexus             Bound     pvc-401782ce-cb9c-11e8-a1b0-42010a84014f   8Gi        RWO            standard       2d

Kubernetes Pods:
 NAME                                            READY     STATUS    RESTARTS   AGE
jenkins-6d89bdd984-kgdrk                        1/1       Running   0          2d
jenkins-x-chartmuseum-645d78c798-9frf6          1/1       Running   0          2d
jenkins-x-controllerteam-858ff8c6b8-5vvjq       1/1       Running   0          2d
jenkins-x-controllerworkflow-6fcb699cd6-d4khj   1/1       Running   0          2d
jenkins-x-docker-registry-dcb6d6d44-dsz4n       1/1       Running   0          2d
jenkins-x-heapster-96bd95dcf-g27x4              2/2       Running   0          2d
jenkins-x-mongodb-968b595dd-rk5qs               1/1       Running   1          2d
jenkins-x-monocular-api-745c8dcd5f-kr6tg        1/1       Running   5          2d
jenkins-x-monocular-prerender-6d8897856-nlln5   1/1       Running   0          2d
jenkins-x-monocular-ui-7854f96776-njl6g         1/1       Running   0          2d
jenkins-x-nexus-55f87888dc-h5s4h                1/1       Running   0          2d

Kubernetes Ingresses:
 NAME              HOSTS                                      ADDRESS         PORTS     AGE
chartmuseum       chartmuseum.jx.35.241.213.226.nip.io       35.205.100.81   80        2d
docker-registry   docker-registry.jx.35.241.213.226.nip.io   35.205.100.81   80        2d
jenkins           jenkins.jx.35.241.213.226.nip.io           35.205.100.81   80        2d
monocular         monocular.jx.35.241.213.226.nip.io         35.205.100.81   80        2d
nexus             nexus.jx.35.241.213.226.nip.io             35.205.100.81   80        2d

Kubernetes Secrets:
 NAME                                       TYPE                                  DATA      AGE
cleanup-token-8dflb                        kubernetes.io/service-account-token   3         2d
default-token-qdwxp                        kubernetes.io/service-account-token   3         2d
expose-token-x8pt5                         kubernetes.io/service-account-token   3         2d
jenkins                                    Opaque                                3         2d
jenkins-docker-cfg                         Opaque                                1         2d
jenkins-git-credentials                    Opaque                                1         2d
jenkins-git-ssh                            Opaque                                2         2d
jenkins-hub-api-token                      Opaque                                1         2d
jenkins-maven-settings                     Opaque                                1         2d
jenkins-npm-token                          Opaque                                1         2d
jenkins-release-gpg                        Opaque                                4         2d
jenkins-ssh-config                         Opaque                                1         2d
jenkins-token-pt9cx                        kubernetes.io/service-account-token   3         2d
jenkins-x-chartmuseum                      Opaque                                2         2d
jenkins-x-controllerteam-token-zvn89       kubernetes.io/service-account-token   3         2d
jenkins-x-controllerworkflow-token-hwr86   kubernetes.io/service-account-token   3         2d
jenkins-x-docker-registry-secret           Opaque                                1         2d
jenkins-x-mongodb                          Opaque                                1         2d
jx-basic-auth                              Opaque                                1         2d
jx-install-config                          Opaque                                3         2d
jx-pipeline-git-github-github              Opaque                                2         2d
nexus                                      Opaque                                1         2d

Please visit https://jenkins-x.io/faq/issues/ for any known issues.
Finished printing diagnostic information.
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

#### Run `jx get apps`

<!-- 2018-10-12 11:08 CEST -->

Command

```shell
jx get apps
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx get apps
APPLICATION              STAGING PODS URL                                                              PRODUCTION PODS URL
node-http-hmi-repository 0.0.3   1/1  http://node-http-hmi-repository.jx-staging.35.241.213.226.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

#### Display Jenkins Dashboard

To know the URL of the Jenkins Dashboard, use the `jx console` command:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx console
Jenkins Console: http://jenkins.jx.35.241.213.226.nip.io/blue
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

In our example, browse <http://jenkins.jx.35.241.213.226.nip.io/blue>

**NOTE**: Jenkins login credentials (username: `admin`, password: `****`) were displayed during the installation of Jenkins X, and are stored in file `~/.jx/jenkinsAuth.yaml`.

You should find three pipelines:

* gmacario/environment-tonguetree-production
* gmacario/environment-tonguetree-staging
* gmacario/node-http-hmi-repository

<!-- FIXME: "jx get build logs" returns Error 500 -->

#### Preview staging environment

Browse GCP Console > Kubernetes Engine > Services

In tab "Kubernetes service", filter by "Service Type: Ingress"

Browse application source code at
<https://github.com/gmacario/node-http-hmi-repository>

Browse the staging environment of "node-http-hmi-repository" at
<http://node-http-hmi-repository.jx-staging.35.241.213.226.nip.io/>


### Typical app development workflow

#### Create an issue to node-http-hmi-repository

Logged as gmacario@cloudshell

```
cd ~/node-http-hmi-repository
jx create issue -t "Add a homepage"
```

```
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$ jx create issue -t "Add a homepage"
? Do you wish to use gmacario as the user name to use for authenticating with git issues Yes

Created issue #2 at https://github.com/gmacario/node-http-hmi-repository/issues/2
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$
```

Double check: <https://github.com/gmacario/node-http-hmi-repository/issues>

#### Create a development branch

Now let us switch to a branch where we can work on fixing the issue

```
git checkout -b wip
echo "test" > test.txt
git add test
git commit -a -m "Add test.txt fixes #2"
git push origin wip
```

Now if we have installed the "hub" tool, we can create a Pull Request
directly from the Command Line. Otherwise do it from GitHub web interface.

#### Create a Pull Request to node-http-hmi-repository

Browse <https://github.com/gmacario/node-http-hmi-repository>
and create a Pull Request from the branch you have just pushed

From <https://github.com/gmacario/node-http-hmi-repository/pull/1>

> PR built and available in a preview environment **gmacario-node-http-hmi-repository-pr-1** [here](http://node-http-hmi-repository.jx-gmacario-node-http-hmi-repository-pr-1.35.241.213.226.nip.io/)

After the PR is merged to master, the change will be deployed to the staging environment.

TODO TODO TODO

```shell
jx get build logs
```

ERROR

```
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$ jx get build logs
error: 500 Server Error
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$
```

Now we can run the `jx get apps` command and we can see that TODO:

```
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$ jx get apps
APPLICATION              STAGING PODS URL                                                              PRODUCTION PODS URL
node-http-hmi-repository 0.0.3   1/1  http://node-http-hmi-repository.jx-staging.35.241.213.226.nip.io
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$
```

Display URL of services in namespace "jx":

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx open
Name                      URL
jenkins                   http://jenkins.jx.35.241.213.226.nip.io
jenkins-x-chartmuseum     http://chartmuseum.jx.35.241.213.226.nip.io
jenkins-x-docker-registry http://docker-registry.jx.35.241.213.226.nip.io
jenkins-x-monocular-api   http://monocular.jx.35.241.213.226.nip.io
jenkins-x-monocular-ui    http://monocular.jx.35.241.213.226.nip.io
nexus                     http://nexus.jx.35.241.213.226.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

Display URL of services in the staging environment:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx open --env staging
Name                     URL
node-http-hmi-repository http://node-http-hmi-repository.jx-staging.35.241.213.226.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

Display URL of services in the staging environment:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx open --env production
Name URL
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

#### Promote to production

Now that we are happy with our changes we can promote it to the production environment.

The promotion to production environment is done manually with the following command

```shell
cd $HOME/node-http-htmi-repository
jx promote --version v0.0.3 --env production --timeout 1h
```

Result:

```
TODO
```

TODO

jx env production


Browse the production environment of "node-http-hmi-repository" at
<http://node-http-hmi-repository.jx-production.35.241.213.226.nip.io/>


### Discover Monocular

jx open

Browse <http://monocular.jx.35.241.213.226.nip.io/>

TODO: Page hangs after displaying title



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
