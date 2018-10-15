---

layout: post
title:  "Deploying a Node.JS application on Kubernetes using Jenkins X"
# date:   2018-10-12 12:00:00 CEST
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

<!-- 2018-10-15 08:49 CEST -->

Type the following commands in case the `jx` command was not properly installed:

```shell
mkdir -p ~/.jx/bin
curl -L \
  https://github.com/jenkins-x/jx/releases/download/v1.3.430/jx-linux-amd64.tar.gz \
  | tar xzv -C ~/.jx/bin
echo 'export PATH=$PATH:~/.jx/bin' >> ~/.bashrc
source ~/.bashrc
```

#### Verify that jx is correctly configured

<!-- 2018-10-15 08:50 CEST -->

```shell
jx status
```

Expected output:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx status
Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_craftersaber): 3 nodes, memory 10% of 17354292Ki, cpu 32% of 5790m. Jenkins is running at http://jenkins.jx.35.195.52.165.nip.io
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
jx                 1.3.430
jenkins x platform 0.0.2755
Kubernetes cluster v1.10.6-gke.2
kubectl            v1.10.7
helm client        v2.10.0+g9ad53aa
helm server        v2.10.0+g9ad53aa
git                git version 2.11.0

Jenkins X Status:
 Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_craftersaber): 3 nodes, memory 12% of 17334288Ki, cpu 39% of 5790m. Jenkins is running at http://jenkins.jx.35.195.52.165.nip.io

Kubernetes PVCs:
 NAME                        STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
jenkins                     Bound     pvc-d269e2fd-ce24-11e8-bd76-42010a840074   30Gi       RWO            standard       2d
jenkins-x-chartmuseum       Bound     pvc-d2678ec2-ce24-11e8-bd76-42010a840074   8Gi        RWO            standard       2d
jenkins-x-docker-registry   Bound     pvc-d2689cda-ce24-11e8-bd76-42010a840074   100Gi      RWO            standard       2d
jenkins-x-mongodb           Bound     pvc-d26c3044-ce24-11e8-bd76-42010a840074   8Gi        RWO            standard       2d
jenkins-x-nexus             Bound     pvc-d271bccb-ce24-11e8-bd76-42010a840074   8Gi        RWO            standard       2d

Kubernetes Pods:
 NAME                                            READY     STATUS    RESTARTS   AGE
jenkins-6d89bdd984-fsqfg                        1/1       Running   0          2d
jenkins-x-chartmuseum-645d78c798-qbp66          1/1       Running   0          2d
jenkins-x-controllerteam-858ff8c6b8-7ms9l       1/1       Running   0          2d
jenkins-x-controllerworkflow-6fcb699cd6-5slth   1/1       Running   0          2d
jenkins-x-docker-registry-dcb6d6d44-smn94       1/1       Running   0          2d
jenkins-x-heapster-96bd95dcf-8qbmn              2/2       Running   0          2d
jenkins-x-mongodb-968b595dd-mbc5t               1/1       Running   0          2d
jenkins-x-monocular-api-6bcb8f4c6d-fh4kc        1/1       Running   0          2d
jenkins-x-monocular-prerender-6d8897856-qj58d   1/1       Running   0          2d
jenkins-x-monocular-ui-6656c65c97-ddhkl         1/1       Running   0          2d
jenkins-x-nexus-55f87888dc-rjxsr                1/1       Running   0          2d

Kubernetes Ingresses:
 NAME              HOSTS                                     ADDRESS           PORTS     AGE
chartmuseum       chartmuseum.jx.35.195.52.165.nip.io       104.155.114.199   80        2d
docker-registry   docker-registry.jx.35.195.52.165.nip.io   104.155.114.199   80        2d
jenkins           jenkins.jx.35.195.52.165.nip.io           104.155.114.199   80        2d
monocular         monocular.jx.35.195.52.165.nip.io         104.155.114.199   80        2d
nexus             nexus.jx.35.195.52.165.nip.io             104.155.114.199   80        2d

Kubernetes Secrets:
 NAME                                       TYPE                                  DATA      AGE
cleanup-token-pdzqh                        kubernetes.io/service-account-token   3         2d
default-token-mm7kr                        kubernetes.io/service-account-token   3         2d
expose-token-ktmxg                         kubernetes.io/service-account-token   3         2d
jenkins                                    Opaque                                3         2d
jenkins-docker-cfg                         Opaque                                1         2d
jenkins-git-credentials                    Opaque                                1         2d
jenkins-git-ssh                            Opaque                                2         2d
jenkins-hub-api-token                      Opaque                                1         2d
jenkins-maven-settings                     Opaque                                1         2d
jenkins-npm-token                          Opaque                                1         2d
jenkins-release-gpg                        Opaque                                4         2d
jenkins-ssh-config                         Opaque                                1         2d
jenkins-token-mr4sb                        kubernetes.io/service-account-token   3         2d
jenkins-x-chartmuseum                      Opaque                                2         2d
jenkins-x-controllerteam-token-c4pxj       kubernetes.io/service-account-token   3         2d
jenkins-x-controllerworkflow-token-7z42m   kubernetes.io/service-account-token   3         2d
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

<!-- 2018-10-12 16:58 CEST -->

Command

```shell
jx status
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx status
Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_craftersaber): 3 nodes, memory 18% of 17354292Ki, cpu 49% of 5790m. Jenkins is running at http://jenkins.jx.35.195.52.165.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

#### Run `jx console`

<!-- 2018-10-12 17:03 CEST -->

To know the URL of the Jenkins Dashboard, use the `jx console` command:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx console
Jenkins Console: http://jenkins.jx.35.195.52.165.nip.io/blue
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

In our example, browse <http://jenkins.jx.35.195.52.165.nip.io/blue>

**NOTE**: Jenkins login credentials (username: `admin`, password: `****`) were displayed during the installation of Jenkins X, and are stored in file `~/.jx/jenkinsAuth.yaml`.

You should find three pipelines:

* gmacario/environment-tonguetree-production
* gmacario/environment-tonguetree-staging
* gmacario/node-http-hmi-repository

#### Run `jx build logs`

<!-- 2018-10-12 17:09 CEST -->

You may also inspect the logs of the Jenkins pipelines
with the `jx build logs` command:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx get build logs
? Which pipeline do you want to view the logs of?:   [Use arrows to move, type to filter]
> gmacario/environment-craftersaber-production/master
  gmacario/environment-craftersaber-staging/master
  gmacario/node-http-hmi-repository/master
```

Inspect each of the above pipelines and make sure that all of them
have completed successfully.


#### Preview the staging environment

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx open --env staging
Name                     URL
node-http-hmi-repository http://node-http-hmi-repository.jx-staging.35.195.52.165.nip.io
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

then browse the URL corresponding to service `node-http-hmi-repository` - 
in our case, <http://node-http-hmi-repository.jx-staging.35.195.52.165.nip.io>

Alternatively:

Browse GCP Console > Kubernetes Engine > Services

In tab "Kubernetes service", filter by "Service Type: Ingress"

Browse application source code at
<https://github.com/gmacario/node-http-hmi-repository>

Browse the staging environment of "node-http-hmi-repository" at
<http://node-http-hmi-repository.jx-staging.35.195.52.165.nip.io/>

**NOTE**: The application has not yet been deployed to the production environment - see below.


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

Now if we have installed the "hub" tool, we can create a Pull Request
directly from the Command Line. Otherwise do it from GitHub web interface.

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
gmacario/node-http-hmi-repository/feature%2Fupdate-index #1    64h32m7s      54s Succeeded
  Checkout Source                                             64h31m22s       8s Succeeded
  CI Build and push snapshot                                  64h31m14s          NotExecuted
  Build Release                                               64h31m14s          NotExecuted
  Promote to Environments                                     64h31m14s          NotExecuted
  Clean up                                                    64h31m14s       1s Succeeded
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

<!-- FIXME: Browsing theia URL returns "403 Service Unavailable" -->

#### Promote to production

<!-- 2018-10-15 11:12 CEST -->

```shell
cd ~/node-http-hmi-repository
jx promote
```

Result:

```
[root@gmacario-nodejs node-http-hmi-repository]# jx promote
Using helmBinary helm with feature flag: none
? Pick environment: production
Promoting latest version of app node-http-hmi-repository to namespace jx-production
pipeline gmacario/node-http-hmi-repository/master
Failed to try detect the current Jenkins pipeline for gmacario/node-http-hmi-repository/master due to 500 Server Error
? Do you wish to use gmacario as the user name to submit the Pull Request Yes
Created Pull Request: https://github.com/gmacario/environment-craftersaber-production/pull/2

pipeline gmacario/node-http-hmi-repository/master
Failed to try detect the current Jenkins pipeline for gmacario/node-http-hmi-repository/master due to 500 Server Error
Failed to query the Pull Request last commit status for https://github.com/gmacario/environment-craftersaber-production/pull/2 ref 95b1110dc4021ec4494150937358609278ec0e30 Could not find a status for repository gmacario/environment-craftersaber-production with ref 95b1110dc4021ec4494150937358609278ec0e30
Pull Request https://github.com/gmacario/environment-craftersaber-production/pull/2 is merged at sha 73ecaa71f08ba5f065d90573dc162a940acaa93d
Merge commit has not yet any statuses on repo gmacario/environment-craftersaber-production merge sha 73ecaa71f08ba5f065d90573dc162a940acaa93d
```

Browse <https://github.com/gmacario/environment-craftersaber-production/pull/2> and click "Merge".

Browse the production environment of "node-http-hmi-repository" at
<http://node-http-hmi-repository.jx-production.35.195.52.165.nip.io/>

**FIXME**: <http://node-http-hmi-repository.jx-production.35.195.52.165.nip.io/> still returns "default backend - 404"

TODO TODO TODO

```shell
jx env production
```

Result:

```
TODO
```


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
* [Jenkins X: Easy CI/CD for Kubernetes - James Strachan, CloudBees (Intermediate Skill Level)](https://youtu.be/UTKIT6STSVM) (YouTube Video, 34:55)

<!-- EOF -->
