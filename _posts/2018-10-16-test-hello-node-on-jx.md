---

layout: post
title:  "Deploying a Node.JS application on Kubernetes using Jenkins X"
date:   2018-10-12 12:00:00 CEST
tags:   howto kubernetes gcp jenkins nodejs

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

<!-- 2018-10-15 12:21 CEST -->

Type the following commands in case the `jx` command was not properly installed:

```shell
mkdir -p ~/.jx/bin
curl -L \
  https://github.com/jenkins-x/jx/releases/download/v1.3.431/jx-linux-amd64.tar.gz \
  | tar xzv -C ~/.jx/bin
export PATH=$PATH:~/.jx/bin
echo 'export PATH=$PATH:~/.jx/bin' >> ~/.bashrc
```

#### Verify that jx is correctly configured

<!-- 2018-10-15 16:17 CEST -->

```shell
jx status
```

Expected output:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx status
Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_howlernoon): 3 nodes, memory 15% of 17354292Ki, cpu 41% of 5790m. Jenkins is running at http://jenkins.jx.35.195.140.178.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

<!-- 2018-10-15 16:18 CEST -->

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
jx                 1.3.431
jenkins x platform 0.0.2765
Kubernetes cluster v1.9.7-gke.6
kubectl            v1.10.7
helm client        v2.10.0+g9ad53aa
helm server        v2.10.0+g9ad53aa
git                git version 2.11.0

Jenkins X Status:
 Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_howlernoon): 3 nodes, memory 15% of 17354292Ki, cpu 41% of 5790m. Jenkins is running at http://jenkins.jx.35.195.140.178.nip.io

Kubernetes PVCs:
 NAME                        STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
jenkins                     Bound     pvc-59d7abdc-d065-11e8-8172-42010a8401ee   30Gi       RWO            standard       3h
jenkins-x-chartmuseum       Bound     pvc-59d670d0-d065-11e8-8172-42010a8401ee   8Gi        RWO            standard       3h
jenkins-x-docker-registry   Bound     pvc-59d72bce-d065-11e8-8172-42010a8401ee   100Gi      RWO            standard       3h
jenkins-x-mongodb           Bound     pvc-59d90e70-d065-11e8-8172-42010a8401ee   8Gi        RWO            standard       3h
jenkins-x-nexus             Bound     pvc-59da88d9-d065-11e8-8172-42010a8401ee   8Gi        RWO            standard       3h

Kubernetes Pods:
 NAME                                            READY     STATUS    RESTARTS   AGE
jenkins-5dcf5bcd85-7xflw                        1/1       Running   0          3h
jenkins-x-chartmuseum-645d78c798-fckz4          1/1       Running   0          3h
jenkins-x-controllerteam-858ff8c6b8-m728p       1/1       Running   0          3h
jenkins-x-controllerworkflow-595d54767-fqvqd    1/1       Running   0          3h
jenkins-x-docker-registry-dcb6d6d44-2xcvn       1/1       Running   0          3h
jenkins-x-heapster-96bd95dcf-kdgjj              2/2       Running   0          3h
jenkins-x-mongodb-968b595dd-ngjpg               1/1       Running   1          3h
jenkins-x-monocular-api-6cff5d65df-9wwgq        1/1       Running   2          3h
jenkins-x-monocular-prerender-6d8897856-dx4kq   1/1       Running   0          3h
jenkins-x-monocular-ui-6b7645b67-w8qt6          1/1       Running   0          3h
jenkins-x-nexus-55f87888dc-b5l59                1/1       Running   0          3h

Kubernetes Ingresses:
 NAME              HOSTS                                      ADDRESS          PORTS     AGE
chartmuseum       chartmuseum.jx.35.195.140.178.nip.io       35.233.119.214   80        3h
docker-registry   docker-registry.jx.35.195.140.178.nip.io   35.233.119.214   80        3h
jenkins           jenkins.jx.35.195.140.178.nip.io           35.233.119.214   80        3h
monocular         monocular.jx.35.195.140.178.nip.io         35.233.119.214   80        3h
nexus             nexus.jx.35.195.140.178.nip.io             35.233.119.214   80        3h

Kubernetes Secrets:
 NAME                                       TYPE                                  DATA      AGE
cleanup-token-bql7k                        kubernetes.io/service-account-token   3         3h
default-token-g42q9                        kubernetes.io/service-account-token   3         3h
expose-token-6dlll                         kubernetes.io/service-account-token   3         3h
jenkins                                    Opaque                                3         3h
jenkins-docker-cfg                         Opaque                                1         3h
jenkins-git-credentials                    Opaque                                1         3h
jenkins-git-ssh                            Opaque                                2         3h
jenkins-hub-api-token                      Opaque                                1         3h
jenkins-maven-settings                     Opaque                                1         3h
jenkins-npm-token                          Opaque                                1         3h
jenkins-release-gpg                        Opaque                                4         3h
jenkins-ssh-config                         Opaque                                1         3h
jenkins-token-929mw                        kubernetes.io/service-account-token   3         3h
jenkins-x-chartmuseum                      Opaque                                2         3h
jenkins-x-controllerteam-token-m4dsz       kubernetes.io/service-account-token   3         3h
jenkins-x-controllerworkflow-token-vbzsm   kubernetes.io/service-account-token   3         3h
jenkins-x-docker-registry-secret           Opaque                                1         3h
jenkins-x-mongodb                          Opaque                                1         3h
jx-basic-auth                              Opaque                                1         3h
jx-install-config                          Opaque                                3         3h
jx-pipeline-git-github-github              Opaque                                2         3h
nexus                                      Opaque                                1         3h

Please visit https://jenkins-x.io/faq/issues/ for any known issues.
Finished printing diagnostic information.
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

### Create quickstart application `node-http-hmi-repository`

<!-- 2018-10-12 16:51CEST -->

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

Select gmacario

```
? Which organisation do you want to use? gmacario
? Enter the new repository name:  (node-http-hmi-repository)
```

Accept default

```
? Enter the new repository name:  node-http-hmi-repository


Creating repository gmacario/node-http-hmi-repository
Pushed Git repository to https://github.com/gmacario/node-http-hmi-repository

Created Jenkins Project: http://jenkins.jx.35.195.52.165.nip.io/job/gmacario/job/node-http-hmi-repository/

Watch pipeline activity via:    jx get activity -f node-http-hmi-repository -w
Browse the pipeline log via:    jx get build logs gmacario/node-http-hmi-repository/master
Open the Jenkins console via    jx console
You can list the pipelines via: jx get pipelines
When the pipeline is complete:  jx get applications

For more help on available commands see: https://jenkins-x.io/developing/browsing/

Note that your first pipeline may take a few minutes to start while the necessary images get downloaded!

Creating GitHub webhook for gmacario/node-http-hmi-repository for url http://jenkins.jx.35.195.52.165.nip.io/github-webhook/
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

#### Run `jx status`

<!-- 2018-10-15 16:21 CEST -->

Command

```shell
jx status
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx status
Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_howlernoon): 3 nodes, memory 15% of 17354292Ki, cpu 41% of 5790m. Jenkins is running at http://jenkins.jx.35.195.140.178.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

#### Run `jx console`

<!-- 2018-10-15 16:21 CEST -->

To know the URL of the Jenkins Dashboard, use the `jx console` command:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx console
Jenkins Console: http://jenkins.jx.35.195.140.178.nip.io/blue
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

In our example, browse <http://jenkins.jx.35.195.140.178.nip.io/blue>

**NOTE**: Jenkins login credentials (username: `admin`, password: `****`) were displayed during the installation of Jenkins X, and are stored in file `~/.jx/jenkinsAuth.yaml`.

You should find three pipelines:

* gmacario/environment-howlernoon-production
* gmacario/environment-howlernoon-staging
* gmacario/node-http-hmi-repository

#### Run `jx get build logs`

<!-- 2018-10-15 16:23 CEST -->

You may also inspect the logs of the Jenkins pipelines
with the `jx build logs` command:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx get build logs
? Which pipeline do you want to view the logs of?:   [Use arrows to move, type to filter]
> gmacario/environment-howlernoon-production/master
  gmacario/environment-howlernoon-staging/master
  gmacario/node-http-hmi-repository/master
```

Inspect each of the above pipelines and make sure that all of them
have completed successfully.


### Preview the application

<!-- 2018-10-15 16:23 CEST -->

Use the `jx get environment` command to display the configured Jenkins X environments:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx get environment
NAME       LABEL       KIND        PROMOTE NAMESPACE     ORDER CLUSTER SOURCE                                                            REF PR
dev        Development Development Never   jx            0                                                              
staging    Staging     Permanent   Auto    jx-staging    100           https://github.com/gmacario/environment-howlernoon-staging.git
production Production  Permanent   Manual  jx-production 200           https://github.com/gmacario/environment-howlernoon-production.git
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

#### Preview the staging environment

<!-- 2018-10-15 16:23 CEST -->

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx open --env staging
Name                     URL
node-http-hmi-repository http://node-http-hmi-repository.jx-staging.35.195.140.178.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

then browse the URL corresponding to service `node-http-hmi-repository` -
in our case, <http://node-http-hmi-repository.jx-staging.35.195.140.178.nip.io>

Alternatively:

Browse GCP Console > Kubernetes Engine > Services

In tab "Kubernetes services", filter by "Service Type: Ingress"

Browse the staging environment of "node-http-hmi-repository" at
<http://node-http-hmi-repository.jx-staging.35.195.140.178.nip.io/>

#### Preview the production environment

For the time being no applications have been deployed to the production environment:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx open --env production
Name URL
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

As demonstrated by the `jx get environment` command above,
the deployment to the production environment is configured to be performed manually.

### Typical application development workflow

#### Create an issue to node-http-hmi-repository

<!-- 2018-10-12 17:21 CEST -->

Logged as gmacario@cloudshell

```shell
cd ~/node-http-hmi-repository
jx create issue -t "Change message on the homepage"
```

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ cd node-http-hmi-repository/
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$ jx create issue -t "Change message on the homepage"
? Do you wish to use gmacario as the user name to use for authenticating with git issues Yes

Created issue #1 at https://github.com/gmacario/node-http-hmi-repository/issues/1
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$
```

Double check: <https://github.com/gmacario/node-http-hmi-repository/issues>

#### Create a development branch

<!-- 2018-10-12 17:23 CEST -->

Now let us switch to a branch where we can work on fixing the issue

```shell
git checkout -b feature/update-index
vi index.html
git add index.html
git commit -a -m "index.html: Update text - fixes #1"
git push -u origin feature/update-index
```

Now if we installed the "[hub](https://hub.github.com/)" tool,
we could create a Pull Request directly from the Command Line.
Otherwise we can just do it from the GitHub web interface.

#### Create a Pull Request to node-http-hmi-repository

Browse <https://github.com/gmacario/node-http-hmi-repository>
and create a Pull Request from the branch you have just pushed

From <https://github.com/gmacario/node-http-hmi-repository/pull/2>

> PR built and available in a preview environment **gmacario-node-http-hmi-repository-pr-2** [here](http://node-http-hmi-repository.jx-gmacario-node-http-hmi-repository-pr-2.35.195.52.165.nip.io/)

After the PR is merged to master, the change will be deployed to the staging environment.

You may verify the progress of the pipelines with the following command

```shell
jx get build logs
```

<!-- 2018-10-15 09:26 CEST -->

If we run the `jx get apps` command, we can see that version 0.0.2 has been deployed to the staging environment:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx get apps
APPLICATION              STAGING PODS URL                                                             PRODUCTION PODS URL
node-http-hmi-repository 0.0.2   1/1  http://node-http-hmi-repository.jx-staging.35.195.52.165.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

List the services in the development environment:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx open
Name                      URL
jenkins                   http://jenkins.jx.35.195.52.165.nip.io
jenkins-x-chartmuseum     http://chartmuseum.jx.35.195.52.165.nip.io
jenkins-x-docker-registry http://docker-registry.jx.35.195.52.165.nip.io
jenkins-x-monocular-api   http://monocular.jx.35.195.52.165.nip.io
jenkins-x-monocular-ui    http://monocular.jx.35.195.52.165.nip.io
nexus                     http://nexus.jx.35.195.52.165.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

List the services in the staging environment:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx open --env staging
Name                     URL
node-http-hmi-repository http://node-http-hmi-repository.jx-staging.35.195.52.165.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

List the services in the production environment:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx open --env production
Name URL
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

<!-- 2018-10-15 09:58 CEST -->

Display the activities for application "node-http-hmi-repository"

```shell
jx get activity -f node-http-hmi-repository
```

Result:

```
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$ jx get activity -f node-http-hmi-repository
STEP                                                        STARTED AGO DURATION STATUS
gmacario/node-http-hmi-repository/master #1                    65h2m37s    6m19s Succeeded Version: 0.0.1
  Checkout Source                                              65h1m46s      11s Succeeded
  CI Build and push snapshot                                   65h1m35s          NotExecuted
  Build Release                                                65h1m34s    1m11s Succeeded
  Promote to Environments                                      65h0m23s     4m4s Succeeded
  Promote: staging                                            64h59m55s    3m29s Succeeded
    PullRequest                                               64h59m55s     2m7s Succeeded  PullRequest: https://github.com/gmacario/environment-craftersaber-staging/pull/1 Merge SHA: f6c065ce56e1eb0e9f63def06b3cea2f9934c15a
    Update                                                    64h57m48s    1m22s Succeeded  Status: Success at: http://jenkins.jx.35.195.52.165.nip.io/job/gmacario/job/environment-craftersaber-staging/job/master/4/display/redirect
    Promoted                                                  64h57m48s    1m22s Succeeded  Application is at: http://node-http-hmi-repository.jx-staging.35.195.52.165.nip.io
  Clean up                                                    64h56m19s       1s Succeeded
gmacario/node-http-hmi-repository/master #2                    64h28m3s    4m25s Succeeded Version: 0.0.2
  Checkout Source                                             64h27m35s       8s Succeeded
  CI Build and push snapshot                                  64h27m27s          NotExecuted
  Build Release                                               64h27m26s      47s Succeeded
  Promote to Environments                                     64h26m39s     3m1s Succeeded
  Promote: staging                                            64h26m12s    2m28s Succeeded
    PullRequest                                               64h26m12s    1m26s Succeeded  PullRequest: https://github.com/gmacario/environment-craftersaber-staging/pull/2 Merge SHA: 032d965749c9abb38a1a17da94e71e0530413848
    Update                                                    64h24m46s     1m2s Succeeded  Status: Success at: http://jenkins.jx.35.195.52.165.nip.io/job/gmacario/job/environment-craftersaber-staging/job/master/5/display/redirect
    Promoted                                                  64h24m46s     1m2s Succeeded  Application is at: http://node-http-hmi-repository.jx-staging.35.195.52.165.nip.io
  Clean up                                                    64h23m38s       0s Succeeded
gmacario/node-http-hmi-repository/PR-2 #1                     64h31m13s    1m43s Succeeded
  Checkout Source                                             64h30m45s       8s Succeeded
  CI Build and push snapshot                                  64h30m37s     1m7s Succeeded
  Preview                                                     64h29m31s           https://github.com/gmacario/node-http-hmi-repository/pull/2
    Preview Application                                       64h29m31s           http://node-http-hmi-repository.jx-gmacario-node-http-hmi-repository-pr-2.35.195.52.165.nip.io
  Build Release                                               64h29m30s          NotExecuted
  Promote to Environments                                     64h29m30s          NotExecuted
  Clean up                                                    64h29m30s       0s Succeeded
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$
```

#### Creating a devpod

<!-- 2018-10-15 10:18 CEST -->

```shell
jx create devpod
```

Result:

```
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$ jx create devpod
Installing the ExposecontrollerService in the namespace: jx-edit-gmacario
Updating Helm repository...
Using helmBinary helm with feature flag: none
Helm repository update done.
Creating a DevPod of label: nodejs
Created pod gmacario-nodejs - waiting for it to be ready...
Updating Helm repository...
Helm repository update done.
Pod gmacario-nodejs is now ready!
You can open other shells into this DevPod via jx create devpod
You can edit your app using Theia (a browser based IDE) at http://gmacario-nodejs-theia.jx.35.195.52.165.nip.io
Port 80 is open on [http://gmacario-nodejs-port-3000.jx.35.195.52.165.nip.io http://gmacario-nodejs-port-9229.jx.35.195.52.165.nip.io] and forwarded to the devpod
Installing Bash Completion into DevPod
Defaulting container name to nodejs.
Use 'kubectl describe pod/gmacario-nodejs -n jx' to see all of the containers in this pod.
Generated Git credentials file /home/jenkins/git/credentials
Cloning into 'node-http-hmi-repository'...
remote: Enumerating objects: 62, done.
remote: Counting objects: 100% (62/62), done.
remote: Compressing objects: 100% (40/40), done.
remote: Total 62 (delta 15), reused 60 (delta 14), pack-reused 0
Unpacking objects: 100% (62/62), done.
Checking connectivity... done.
[root@gmacario-nodejs node-http-hmi-repository]#
```

The command has now opened a devshell in my devpod.
It's a bit like ssh-ing into my devpod.

If I now type `docker ps` I will list the containers running on my Kubernetes cluster:

```
[root@gmacario-nodejs node-http-hmi-repository]# docker ps
CONTAINER ID        IMAGE                                                 COMMAND                  CREATED             STATUS              PORTS               NAMES
4879c689cac6        jenkinsxio/builder-nodejs                             "/bin/sh -c cat"         10 minutes ago      Up 10 minutes                           k8s_nodejs_gmacario-nodejs_jx_1292aab6-d053-11e8-a13f-42010a84007c_0
46c0a72de1a3        jenkinsxio/exposecontroller                           "/exposecontroller -…"   12 minutes ago      Up 12 minutes                           k8s_exposecontroller-service_exposecontroller-service-6b5bf9cc68-h47br_jx-edit-gmacario_127c8a9b-d053-11e8-a13f-42010a84007c_0
6a3012ffa069        k8s.gcr.io/pause-amd64:3.1                            "/pause"                 12 minutes ago      Up 12 minutes                           k8s_POD_gmacario-nodejs_jx_1292aab6-d053-11e8-a13f-42010a84007c_0
019cba949c7b        k8s.gcr.io/pause-amd64:3.1                            "/pause"                 12 minutes ago      Up 12 minutes                           k8s_POD_exposecontroller-service-6b5bf9cc68-h47br_jx-edit-gmacario_127c8a9b-d053-11e8-a13f-42010a84007c_0
a5349f2f3e1e        055e8e6ae33a                                          "/monitor --stackdri…"   2 days ago          Up 2 days                               k8s_prometheus-to-sd-exporter_fluentd-gcp-v3.1.0-l9swq_kube-system_1f1ac6d2-ceab-11e8-a13f-42010a84007c_0
6952d5766cc4        gcr.io/stackdriver-agents/stackdriver-logging-agent   "/entrypoint.sh /usr…"   2 days ago          Up 2 days                               k8s_fluentd-gcp_fluentd-gcp-v3.1.0-l9swq_kube-system_1f1ac6d2-ceab-11e8-a13f-42010a84007c_0
06794ae76980        k8s.gcr.io/pause-amd64:3.1                            "/pause"                 2 days ago          Up 2 days                               k8s_POD_fluentd-gcp-v3.1.0-l9swq_kube-system_1f1ac6d2-ceab-11e8-a13f-42010a84007c_0
4919cf79de07        380b233f1574                                          "/bin/sh -c 'exec ku…"   2 days ago          Up 2 days                               k8s_kube-proxy_kube-proxy-gke-craftersaber-default-pool-9203d5e5-xkws_kube-system_0cfe54e72c47cb3c4efc7f396ebbda85_0
d0543cb37dfa        k8s.gcr.io/pause-amd64:3.1                            "/pause"                 2 days ago          Up 2 days                               k8s_POD_kube-proxy-gke-craftersaber-default-pool-9203d5e5-xkws_kube-system_0cfe54e72c47cb3c4efc7f396ebbda85_0
[root@gmacario-nodejs node-http-hmi-repository]#
```

This command has also run the `ksync` command.
[Ksync](https://vapor-ware.github.io/ksync) is an open source tool which syncs files from your local system to a specific container running in a Kubernetes cluster.

```
[root@gmacario-nodejs node-http-hmi-repository]# pwd
/workspace/node-http-hmi-repository
[root@gmacario-nodejs node-http-hmi-repository]# ls -la
total 84
drwxr-xr-x 4 root root  4096 Oct 15 08:30 .
drwxrwxrwx 3 root root  4096 Oct 15 08:30 ..
drwxr-xr-x 4 root root  4096 Oct 15 08:30 charts
-rwxr-xr-x 1 root root   122 Oct 15 08:30 curlloop.sh
-rw-r--r-- 1 root root    93 Oct 15 08:30 Dockerfile
-rw-r--r-- 1 root root    43 Oct 15 08:30 .dockerignore
drwxr-xr-x 8 root root  4096 Oct 15 08:30 .git
-rw-r--r-- 1 root root   884 Oct 15 08:30 .gitignore
-rw-r--r-- 1 root root   398 Oct 15 08:30 .helmignore
-rw-r--r-- 1 root root   193 Oct 15 08:30 index.html
-rw-r--r-- 1 root root  2620 Oct 15 08:30 Jenkinsfile
-rw-r--r-- 1 root root 11357 Oct 15 08:30 LICENSE
-rw-r--r-- 1 root root    44 Oct 15 08:30 OWNERS
-rw-r--r-- 1 root root    74 Oct 15 08:30 OWNERS_ALIASES
-rw-r--r-- 1 root root   244 Oct 15 08:30 package.json
-rw-r--r-- 1 root root    59 Oct 15 08:30 README.md
-rw-r--r-- 1 root root   419 Oct 15 08:30 server.js
-rw-r--r-- 1 root root   760 Oct 15 08:30 skaffold.yaml
-rwxr-xr-x 1 root root   179 Oct 15 08:30 watch.sh
[root@gmacario-nodejs node-http-hmi-repository]#
```

<!-- FIXME: jx sync returns "ksync version mismatch" -->

```shell
cd ~/node-http-hmi-repository
jx sync
```

Result:

```
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$ jx sync
ksync is already available on your PATH at /home/gmacario/.jx/bin/ksync
Looks like 'ksync watch' is not running: Command failed 'ksync get': time="2018-10-15T11:43:28+02:00" level=fatal msg="Having problems querying status. Are you running watch?" exit status 1
Started the ksync watch
INFO[0000] listening                                     bind=127.0.0.1 port=40322
INFO[0003] syncthing listening                           port=8384 syncthing=localhost
```

#### Promote to production

<!-- 2018-10-16 10:30 CEST -->

The promotion to the production environment should be performed by an user with the proper permissions to create and merge Pull Request to repository <https://github.com/gmacario/environment-howlernoon-production>

```shell
cd ~/node-http-hmi-repository
git status
jx promote --version 0.0.3 --env production
```

Result:

```
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$ jx promote --version 0.0.3 --env production
Using helmBinary helm with feature flag: none
Promoting app node-http-hmi-repository version 0.0.3 to namespace jx-production
pipeline gmacario/node-http-hmi-repository/master
Username for 'https://github.com': gmacario
Password for 'https://gmacario@github.com':
? Do you wish to use gmacario as the user name to submit the Pull Request Yes
Created Pull Request: https://github.com/gmacario/environment-howlernoon-production/pull/2
pipeline gmacario/node-http-hmi-repository/master
Failed to query the Pull Request last commit status for https://github.com/gmacario/environment-howlernoon-production/pull/2 ref 27758a287b0b389a43477f099d8d8d23a6f32e52 Could not find a status for repository gmacario/environment-howlernoon-production with ref 27758a287b0b389a43477f099d8d8d23a6f32e52
Failed to query the Pull Request last commit status for https://github.com/gmacario/environment-howlernoon-production/pull/2 ref 27758a287b0b389a43477f099d8d8d23a6f32e52 Could not find a status for repository gmacario/environment-howlernoon-production with ref 27758a287b0b389a43477f099d8d8d23a6f32e52
Pull Request https://github.com/gmacario/environment-howlernoon-production/pull/2 is merged at sha 9d64dad34d425d90b846b3bfdcf5904f9ed017cd
Merge commit has not yet any statuses on repo gmacario/environment-howlernoon-production merge sha 9d64dad34d425d90b846b3bfdcf5904f9ed017cd
merge status: pending for URL https://api.github.com/repos/gmacario/environment-howlernoon-production/statuses/9d64dad34d425d90b846b3bfdcf5904f9ed017cd with target: http://jenkins.jx.35.195.140.178.nip.io/job/gmacario/job/environment-howlernoon-production/job/master/3/display/redirect description: This commit is being built
merge status: success for URL https://api.github.com/repos/gmacario/environment-howlernoon-production/statuses/9d64dad34d425d90b846b3bfdcf5904f9ed017cd with target: http://jenkins.jx.35.195.140.178.nip.io/job/gmacario/job/environment-howlernoon-production/job/master/3/display/redirect description: This commit looks good
Merge status checks all passed so the promotion worked!
? Do you wish to use gmacario as the user name to comment on issues Yes
Commenting that issue https://github.com/gmacario/node-http-hmi-repository/issues/1 is now in Production
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$
```

You may follow the progress of the PR at <https://github.com/gmacario/environment-howlernoon-production/pull/2>

Verify that release 0.0.3 of `node-http-hmi-repository` has been deployed in production:

```
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$ jx get apps -e production
APPLICATION              PRODUCTION PODS URL
node-http-hmi-repository 0.0.3      1/1  http://node-http-hmi-repository.jx-production.35.195.140.178.nip.io
gmacario@cloudshell:~/node-http-hmi-repository (kubernetes-workshop-218213)$
```

Browse the production environment of "node-http-hmi-repository" at
<http://node-http-hmi-repository.jx-production.35.195.140.178.nip.io/>


### Things which do not yet work as expected

<!-- FIXME: Browsing theia URL returns "403 Service Unavailable" -->

#### Browse Monocular instance

```shell
jx open
```

Browse <http://monocular.jx.35.195.140.178.nip.io/>

The page seems to hang after displaying title.
Maybe is this due to [jx issues/1417](https://github.com/jenkins-x/jx/issues/1417)?

<!--
TODO TODO TODO

```shell
jx get env
```

```shell
jx env production
```

Result:

```
TODO
```
-->

<!--
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
-->

### Summary

This article explained how to perform CI/CD of a Node.JS web application on a Kubernetes cluster using Jenkins X.

Jenkins X is quite recent and therefore presents a few rough edges as the list of [issues on GitHub](https://github.com/jenkins-x/jx/issues) can testify, however it shows great potential to represent a very helpful tool for making the journey of application developers to Kubernetes smoother.

### See also

* <https://jenkins-x.io/>
* <https://jenkins.io/projects/jenkins-x/>
* [Jenkins X: Easy CI/CD for Kubernetes - James Strachan, CloudBees (Intermediate Skill Level)](https://youtu.be/UTKIT6STSVM) (YouTube Video, 34:55)

<!--
* [Jenkins X - Automated CI/CD for Kubernetes](https://www.cloudbees.com/resource/webinar-recording/ondemand-webinar-easy-cicd-kubernetes/thank-you)
-->

<!-- EOF -->
