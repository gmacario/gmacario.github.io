# Trying Jenkins X on Google Cloud Platform

<!-- 2018-10-09 09:25 CEST -->

### Introduction

Here are my notes while deploying Jenkins X on a Kubernetes cluster on GCP.

Tested on nemo (Ubuntu 18.04.1 LTS 64-bit)

### References

* <https://jenkins-x.io/getting-started/>

### Create cluster on GCP

<!-- 2018-10-09 09:47 CEST -->

Reference: <https://jenkins-x.io/getting-started/create-cluster/>

Browse Google Cloud Console at <https://console.cloud.google.com/>

Select GCP project "kubernetes-workshop-218213", then click on the "Activate Cloud Shell" icon.

Logged as `gmacario@cloudshell`, install the `jx` binary:

```shell
mkdir -p ~/Downloads && cd ~/Downloads
curl -L https://github.com/jenkins-x/jx/releases/download/v1.3.399/jx-linux-amd64.tar.gz | tar xzv
sudo mv jx /usr/local/bin
```

Now use the [jx create cluster gke](https://jenkins-x.io/commands/jx_create_cluster_gke) command.

You can see a demo of this command here: <https://jenkins-x.io/demos/create_cluster_gke/>

```shell
jx create cluster gke --skip-login
```

Result:

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx create cluster gke --skip-login
? Missing required dependencies, deselect to avoid auto installing: helm
Downloading https://storage.googleapis.com/kubernetes-helm/helm-v2.11.0-linux-amd64.tar.gz to /home/gmacario/.jx/bin/helm.tgz...
Downloaded /home/gmacario/.jx/bin/helm.tgz
Using helmBinary helm with feature flag: none
? Google Cloud Project: kubernetes-workshop-218213
Updated property [core/project].
Let's ensure we have container and compute enabled on your project via: gcloud services enable container compute
Operation "operations/acf.e25f2f16-c2a5-41db-b5cb-3a93e2dac508" finished successfully.
No cluster name provided so using a generated one: tonguetree
? Google Cloud Zone: europe-west1-b
? Google Cloud Machine Type: n1-standard-2
? Minimum number of Nodes 3
? Maximum number of Nodes 5
Creating cluster...Initialising cluster ...
Using helmBinary helm with feature flag: none
Storing the kubernetes provider gke in the TeamSettings
Updated the team settings in namespace jx
? Please enter the name you wish to use with git:  Gianpaolo Macario
? Please enter the email address you wish to use with git:  gmacario@gmail.com
Git configured for user: Gianpaolo Macario and email gmacario@gmail.com
Trying to create ClusterRoleBinding gmacario-gmail-com-cluster-admin-binding for role: cluster-admin for user gmacario@gmail.com
: clusterrolebindings.rbac.authorization.k8s.io "gmacario-gmail-com-cluster-admin-binding" not foundCreated ClusterRoleBinding gmacario-gmail-com-cluster-admin-binding
Using helm2
Configuring tiller
Created ServiceAccount tiller in namespace kube-system
Trying to create ClusterRoleBinding tiller for role: cluster-admin and ServiceAccount: kube-system/tiller
Created ClusterRoleBinding tiller
Initialising helm using ServiceAccount tiller in namespace kube-system
Using helmBinary helm with feature flag: none 
helm installed and configured
? No existing ingress controller found in the kube-system namespace, shall we install one? Yes
Installing using helm binary: helm
Waiting for external loadbalancer to be created and update the nginx-ingress-controller service in kube-system namespace
Note: this loadbalancer will fail to be provisioned if you have insufficient quotas, this can happen easily on a GKE free account. To view quotas run: gcloud compute project-info describe
External loadbalancer created
Waiting to find the external host name of the ingress controller Service in namespace kube-system with name jxing-nginx-ingress-controller
You can now configure a wildcard DNS pointing to the new loadbalancer address 35.241.213.226

If you do not have a custom domain setup yet, Ingress rules will be set for magic dns nip.io.
Once you have a customer domain ready, you can update with the command jx upgrade ingress --cluster
If you don't have a wildcard DNS setup then setup a new CNAME and point it at: 35.241.213.226.nip.io then use the DNS domain in the next input...? Domain 35.241.213.226.nip.io
nginx ingress controller installed and configured
Lets set up a Git username and API token to be able to perform CI/CD

? GitHub user name: gmacario
To be able to create a repository on GitHub we need an API Token
Please click this URL https://github.com/settings/tokens/new?scopes=repo,read:user,read:org,user:email,write:repo_hook,delete_repo

Then COPY the token and enter in into the form below:

? API Token: 
```

Browse <https://github.com/settings/tokens/new?scopes=repo,read:user,read:org,user:email,write:repo_hook,delete_repo>

then paste the API Token into the terminal

```
? API Token: ****************************************
Updated the team settings in namespace jx
Cloning the Jenkins X cloud environments repo to /home/gmacario/.jx/cloud-environments
Enumerating objects: 44, done.
Counting objects: 100% (44/44), done.
Compressing objects: 100% (32/32), done.
Total 1001 (delta 19), reused 33 (delta 12), pack-reused 957
Generated helm values /home/gmacario/.jx/extraValues.yaml
Installing Jenkins X platform helm chart from: /home/gmacario/.jx/cloud-environments/env-gke
Installing jx into namespace jx
waiting for install to be ready, if this is the first time then it will take a while to download images
Jenkins X deployments ready in namespace jx


        ********************************************************

             NOTE: Your admin password is: tigermaple

        ********************************************************


Getting Jenkins API Token
Using url http://jenkins.jx.35.241.213.226.nip.io/me/configure
Unable to automatically find API token with chromedp using URL http://jenkins.jx.35.241.213.226.nip.io/me/configure
Error: fork/exec /usr/bin/google-chrome: no such file or directory
Please go to http://jenkins.jx.35.241.213.226.nip.io/me/configure and click Show API Token to get your API Token
Then COPY the token and enter in into the form below:

? API Token: 
```

<!-- 2018-10-09 10:30 CEST -->

Login to <http://jenkins.jx.35.241.213.226.nip.io/me/configure> (username: admin; password: see above),
copy the API Token and paste it into the terminal

```
? API Token: ********************************
Created user admin API Token for Jenkins server jenkins.jx.35.241.213.226.nip.io at http://jenkins.jx.35.241.213.226.nip.io
Updating Jenkins with new external URL details http://jenkins.jx.35.241.213.226.nip.io
Creating default staging and production environments
Using Git provider GitHub at https://github.com


About to create repository environment-tonguetree-staging on server https://github.com with user gmacario


Creating repository gmacario/environment-tonguetree-staging
Creating Git repository gmacario/environment-tonguetree-staging
Pushed Git repository to https://github.com/gmacario/environment-tonguetree-staging

Created environment staging
Created Jenkins Project: http://jenkins.jx.35.241.213.226.nip.io/job/gmacario/job/environment-tonguetree-staging/

Note that your first pipeline may take a few minutes to start while the necessary images get downloaded!

Creating GitHub webhook for gmacario/environment-tonguetree-staging for url http://jenkins.jx.35.241.213.226.nip.io/github-webhook/
Using Git provider GitHub at https://github.com


About to create repository environment-tonguetree-production on server https://github.com with user gmacario


Creating repository gmacario/environment-tonguetree-production
Creating Git repository gmacario/environment-tonguetree-production
Pushed Git repository to https://github.com/gmacario/environment-tonguetree-production

Created environment production
Created Jenkins Project: http://jenkins.jx.35.241.213.226.nip.io/job/gmacario/job/environment-tonguetree-production/

Note that your first pipeline may take a few minutes to start while the necessary images get downloaded!

Creating GitHub webhook for gmacario/environment-tonguetree-production for url http://jenkins.jx.35.241.213.226.nip.io/github-webhook/

Jenkins X installation completed successfully


        ********************************************************

             NOTE: Your admin password is: xxxx

        ********************************************************



Your Kubernetes context is now set to the namespace: jx
To switch back to your original namespace use: jx ns default
For help on switching contexts see: https://jenkins-x.io/developing/kube-context/

To import existing projects into Jenkins:       jx import
To create a new Spring Boot microservice:       jx create spring -d web -d actuator
To create a new microservice from a quickstart: jx create quickstart
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

### Inspecting the products of `jx create cluster gke`

#### Kubernetes cluster

Logged as `gmacario@cloudshell`

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ kubectl cluster-info
Kubernetes master is running at https://35.195.217.164
GLBCDefaultBackend is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/default-http-backend:http/proxy
Heapster is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/heapster/proxy
KubeDNS is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
kubernetes-dashboard is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy
Metrics-server is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/https:metrics-server:/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

#### Others

* Jenkins: http://jenkins.jx.35.241.213.226.nip.io/
* https://github.com/gmacario/environment-tonguetree-staging
* https://github.com/gmacario/environment-tonguetree-production

#### Run `jx diagnose` as gmacario@cloudshell

<!-- 2018-10-09 11:39 CEST -->

Logged in as `gmacario@cloudshell`, type the following command

```shell
jx diagnose
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx diagnose
Running in namespace: jx
Jenkins X Version:
 Using helmBinary helm with feature flag: none
Failed to find helm installs: failed to run 'helm list' command in directory '', output: 'Error: incompatible versions client[v2.11.0] server[v2.10.0]': exit status 1
NAME               VERSION
jx                 1.3.399
Kubernetes cluster v1.9.7-gke.6
kubectl            v1.10.7
helm client        v2.11.0+g2e55dbe
helm server        v2.10.0+g9ad53aa
git                git version 2.11.0

Jenkins X Status:
 Jenkins X checks passed for Cluster(gke_kubernetes-workshop-218213_europe-west1-b_tonguetree): 3 nodes, memory 14% of 17354292Ki, cpu 37% of 5790m. Jenkins is running at http://jenkins.jx.35.241.213.226.nip.io

Kubernetes PVCs:
 NAME                        STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
jenkins                     Bound     pvc-4014d9f4-cb9c-11e8-a1b0-42010a84014f   30Gi       RWO            standard       1h
jenkins-x-chartmuseum       Bound     pvc-40120cba-cb9c-11e8-a1b0-42010a84014f   8Gi        RWO            standard       1h
jenkins-x-docker-registry   Bound     pvc-40131c4c-cb9c-11e8-a1b0-42010a84014f   100Gi      RWO            standard       1h
jenkins-x-mongodb           Bound     pvc-4015b339-cb9c-11e8-a1b0-42010a84014f   8Gi        RWO            standard       1h
jenkins-x-nexus             Bound     pvc-401782ce-cb9c-11e8-a1b0-42010a84014f   8Gi        RWO            standard       1h

Kubernetes Pods:
 NAME                                            READY     STATUS    RESTARTS   AGE
jenkins-6d89bdd984-kgdrk                        1/1       Running   0          1h
jenkins-x-chartmuseum-645d78c798-9frf6          1/1       Running   0          1h
jenkins-x-controllerteam-858ff8c6b8-5vvjq       1/1       Running   0          1h
jenkins-x-controllerworkflow-6fcb699cd6-d4khj   1/1       Running   0          1h
jenkins-x-docker-registry-dcb6d6d44-dsz4n       1/1       Running   0          1h
jenkins-x-heapster-96bd95dcf-g27x4              2/2       Running   0          1h
jenkins-x-mongodb-968b595dd-rk5qs               1/1       Running   1          1h
jenkins-x-monocular-api-745c8dcd5f-kr6tg        1/1       Running   5          1h
jenkins-x-monocular-prerender-6d8897856-nlln5   1/1       Running   0          1h
jenkins-x-monocular-ui-7854f96776-njl6g         1/1       Running   0          1h
jenkins-x-nexus-55f87888dc-h5s4h                1/1       Running   0          1h

Kubernetes Ingresses:
 NAME              HOSTS                                      ADDRESS         PORTS     AGE
chartmuseum       chartmuseum.jx.35.241.213.226.nip.io       35.205.100.81   80        1h
docker-registry   docker-registry.jx.35.241.213.226.nip.io   35.205.100.81   80        1h
jenkins           jenkins.jx.35.241.213.226.nip.io           35.205.100.81   80        1h
monocular         monocular.jx.35.241.213.226.nip.io         35.205.100.81   80        1h
nexus             nexus.jx.35.241.213.226.nip.io             35.205.100.81   80        1h

Kubernetes Secrets:
 NAME                                       TYPE                                  DATA      AGE
cleanup-token-8dflb                        kubernetes.io/service-account-token   3         1h
default-token-qdwxp                        kubernetes.io/service-account-token   3         1h
expose-token-x8pt5                         kubernetes.io/service-account-token   3         1h
jenkins                                    Opaque                                3         1h
jenkins-docker-cfg                         Opaque                                1         1h
jenkins-git-credentials                    Opaque                                1         1h
jenkins-git-ssh                            Opaque                                2         1h
jenkins-hub-api-token                      Opaque                                1         1h
jenkins-maven-settings                     Opaque                                1         1h
jenkins-npm-token                          Opaque                                1         1h
jenkins-release-gpg                        Opaque                                4         1h
jenkins-ssh-config                         Opaque                                1         1h
jenkins-token-pt9cx                        kubernetes.io/service-account-token   3         1h
jenkins-x-chartmuseum                      Opaque                                2         1h
jenkins-x-controllerteam-token-zvn89       kubernetes.io/service-account-token   3         1h
jenkins-x-controllerworkflow-token-hwr86   kubernetes.io/service-account-token   3         1h
jenkins-x-docker-registry-secret           Opaque                                1         1h
jenkins-x-mongodb                          Opaque                                1         1h
jx-basic-auth                              Opaque                                1         1h
jx-install-config                          Opaque                                3         1h
jx-pipeline-git-github-github              Opaque                                2         1h
nexus                                      Opaque                                1         1h

Please visit https://jenkins-x.io/faq/issues/ for any known issues.
Finished printing diagnostic information.
gmacario@cloudshell:~ (kubernetes-workshop-218213)$:
```

#### Run `jx compliance` as gmacario@cloudshell

<!-- 2018-10-09 11:42 CEST -->

Logged in as `gmacario@cloudshell`, type the following command

```shell
jx compliance
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx compliance
Run compliance tests against Kubernetes cluster

Available Commands:
  compliance delete  Deletes the Kubernetes resources allocated by the compliance tests
  compliance logs    Prints the logs of compliance tests
  compliance results Shows the results of compliance tests
  compliance run     Runs the compliance tests
  compliance status  Retrieves the status of compliance tests
Usage:
  jx compliance ACTION [flags] [options]
Use "jx <command> --help" for more information about a given command.
Use "jx options" for a list of global command-line options (applies to all commands).
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

<!-- 2018-10-09 11:44 CEST -->

Command

```shell
jx compliance run
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx compliance run
INFO[0000] created object                                name=heptio-sonobuoy namespace= resource=namespaces
INFO[0000] created object                                name=sonobuoy-serviceaccount namespace=heptio-sonobuoy resource=serviceaccounts
INFO[0000] created object                                name=sonobuoy-serviceaccount-heptio-sonobuoy namespace= resource=clusterrolebindings
INFO[0000] created object                                name=sonobuoy-serviceaccount namespace= resource=clusterroles
INFO[0000] created object                                name=sonobuoy-config-cm namespace=heptio-sonobuoy resource=configmaps
INFO[0000] created object                                name=sonobuoy-plugins-cm namespace=heptio-sonobuoy resource=configmaps
INFO[0000] created object                                name=sonobuoy namespace=heptio-sonobuoy resource=pods
INFO[0000] created object                                name=sonobuoy-master namespace=heptio-sonobuoy resource=services
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

Command

```shell
jx compliance status
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx compliance status
Compliance tests are still running, it can take up to 60 minutes.
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

<!-- 2018-10-09 13:45 CEST -->

After about 1h

```shell
jx compliance status
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx compliance status
Compliance tests completed. Use `jx compliance results` to display the results.
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

Command

```shell
jx compliance results
```

Result

```
gmacario@cloudshell:~ (kubernetes-workshop-218213)$ jx compliance results
STATUS TEST
FAILED [sig-storage] ConfigMap binary data should be reflected in volume [NodeConformance] [Conformance]
PASSED [k8s.io] Container Lifecycle Hook when create a pod with lifecycle hook should execute poststart exec hook properly [NodeConformance] [Conformance]
PASSED [k8s.io] Container Lifecycle Hook when create a pod with lifecycle hook should execute prestop exec hook properly [NodeConformance] [Conformance]
PASSED [k8s.io] Container Lifecycle Hook when create a pod with lifecycle hook should execute prestop http hook properly [NodeConformance] [Conformance]
PASSED [k8s.io] Docker Containers should be able to override the image's default arguments (docker cmd) [NodeConformance] [Conformance]
PASSED [k8s.io] Docker Containers should be able to override the image's default command (docker entrypoint) [NodeConformance] [Conformance]
PASSED [k8s.io] Docker Containers should be able to override the image's default command and arguments [NodeConformance] [Conformance]
PASSED [k8s.io] Docker Containers should use the image defaults if command and args are blank [NodeConformance] [Conformance]
PASSED [k8s.io] InitContainer [NodeConformance] should invoke init containers on a RestartAlways pod [Conformance]
PASSED [k8s.io] InitContainer [NodeConformance] should invoke init containers on a RestartNever pod [Conformance]
PASSED [k8s.io] InitContainer [NodeConformance] should not start app containers and fail the pod if init containers fail on a RestartNever pod [Conformance]
PASSED [k8s.io] InitContainer [NodeConformance] should not start app containers if init containers fail on a RestartAlways pod [Conformance]
PASSED [k8s.io] KubeletManagedEtcHosts should test kubelet managed /etc/hosts file [NodeConformance] [Conformance]
PASSED [k8s.io] Pods should allow activeDeadlineSeconds to be updated [NodeConformance] [Conformance]
PASSED [k8s.io] Pods should be submitted and removed [NodeConformance] [Conformance]
PASSED [k8s.io] Pods should be updated [NodeConformance] [Conformance]
PASSED [k8s.io] Pods should contain environment variables for services [NodeConformance] [Conformance]
PASSED [k8s.io] Pods should get a host IP [NodeConformance] [Conformance]
PASSED [k8s.io] Probing container should *not* be restarted with a /healthz http liveness probe [NodeConformance] [Conformance]
PASSED [k8s.io] Probing container should *not* be restarted with a exec "cat /tmp/health" liveness probe [NodeConformance] [Conformance]
PASSED [k8s.io] Probing container should be restarted with a /healthz http liveness probe [NodeConformance] [Conformance]
PASSED [k8s.io] Probing container should be restarted with a exec "cat /tmp/health" liveness probe [NodeConformance] [Conformance]
PASSED [k8s.io] Probing container should have monotonically increasing restart count [Slow][NodeConformance] [Conformance]
PASSED [k8s.io] Probing container with readiness probe should not be ready before initial delay and never restart [NodeConformance] [Conformance]
PASSED [k8s.io] Probing container with readiness probe that fails should never be ready and never restart [NodeConformance] [Conformance]
PASSED [k8s.io] Variable Expansion should allow composing env vars into new env vars [NodeConformance] [Conformance]
PASSED [k8s.io] Variable Expansion should allow substituting values in a container's args [NodeConformance] [Conformance]
PASSED [k8s.io] Variable Expansion should allow substituting values in a container's command [NodeConformance] [Conformance]
PASSED [k8s.io] [sig-node] Events should be sent by kubelets and the scheduler about pods scheduling and running  [Conformance]
PASSED [k8s.io] [sig-node] Pods Extended [k8s.io] Pods Set QOS Class should be submitted and removed  [Conformance]
PASSED [k8s.io] [sig-node] PreStop should call prestop when killing a pod  [Conformance]
PASSED [sig-api-machinery] ConfigMap should be consumable via environment variable [NodeConformance] [Conformance]
PASSED [sig-api-machinery] ConfigMap should be consumable via the environment [NodeConformance] [Conformance]
PASSED [sig-api-machinery] CustomResourceDefinition resources Simple CustomResourceDefinition creating/deleting custom resource definition objects works  [Conformance]
PASSED [sig-api-machinery] Downward API should provide container's limits.cpu/memory and requests.cpu/memory as env vars [NodeConformance] [Conformance]
PASSED [sig-api-machinery] Downward API should provide default limits.cpu/memory from node allocatable [NodeConformance] [Conformance]
PASSED [sig-api-machinery] Downward API should provide host IP as an env var [NodeConformance] [Conformance]
PASSED [sig-api-machinery] Downward API should provide pod UID as env vars [NodeConformance] [Conformance]
PASSED [sig-api-machinery] Downward API should provide pod name, namespace and IP address as env vars [NodeConformance] [Conformance]
PASSED [sig-api-machinery] Garbage collector should delete RS created by deployment when not orphaning [Conformance]
PASSED [sig-api-machinery] Garbage collector should delete pods created by rc when not orphaning [Conformance]
PASSED [sig-api-machinery] Garbage collector should keep the rc around until all its pods are deleted if the deleteOptions says so [Conformance]
PASSED [sig-api-machinery] Garbage collector should not be blocked by dependency circle [Conformance]
PASSED [sig-api-machinery] Garbage collector should not delete dependents that have both valid owner and owner that's waiting for dependents to be deleted [Conformance]
PASSED [sig-api-machinery] Garbage collector should orphan RS created by deployment when deleteOptions.PropagationPolicy is Orphan [Conformance]
PASSED [sig-api-machinery] Garbage collector should orphan pods created by rc if delete options say so [Conformance]
PASSED [sig-api-machinery] Namespaces [Serial] should ensure that all pods are removed when a namespace is deleted [Conformance]
PASSED [sig-api-machinery] Namespaces [Serial] should ensure that all services are removed when a namespace is deleted [Conformance]
PASSED [sig-api-machinery] Secrets should be consumable from pods in env vars [NodeConformance] [Conformance]
PASSED [sig-api-machinery] Secrets should be consumable via the environment [NodeConformance] [Conformance]
PASSED [sig-api-machinery] Watchers should be able to restart watching from the last resource version observed by the previous watch [Conformance]
PASSED [sig-api-machinery] Watchers should be able to start watching from a specific resource version [Conformance]
PASSED [sig-api-machinery] Watchers should observe add, update, and delete watch notifications on configmaps [Conformance]
PASSED [sig-api-machinery] Watchers should observe an object deletion if it stops meeting the requirements of the selector [Conformance]
PASSED [sig-apps] Daemon set [Serial] should retry creating failed daemon pods [Conformance]
PASSED [sig-apps] Daemon set [Serial] should run and stop complex daemon [Conformance]
PASSED [sig-apps] Daemon set [Serial] should run and stop simple daemon [Conformance]
PASSED [sig-apps] Daemon set [Serial] should update pod when spec was updated and update strategy is RollingUpdate [Conformance]
PASSED [sig-apps] Deployment RecreateDeployment should delete old pods and create new ones [Conformance]
PASSED [sig-apps] Deployment RollingUpdateDeployment should delete old pods and create new ones [Conformance]
PASSED [sig-apps] Deployment deployment should delete old replica sets [Conformance]
PASSED [sig-apps] Deployment deployment should support proportional scaling [Conformance]
PASSED [sig-apps] Deployment deployment should support rollover [Conformance]
PASSED [sig-apps] ReplicaSet should serve a basic image on each replica with a public image  [Conformance]
PASSED [sig-apps] ReplicationController should serve a basic image on each replica with a public image  [Conformance]
PASSED [sig-apps] StatefulSet [k8s.io] Basic StatefulSet functionality [StatefulSetBasic] Burst scaling should run to completion even with unhealthy pods [Conformance]
PASSED [sig-apps] StatefulSet [k8s.io] Basic StatefulSet functionality [StatefulSetBasic] Scaling should happen in predictable order and halt if any stateful pod is unhealthy [Conformance]
PASSED [sig-apps] StatefulSet [k8s.io] Basic StatefulSet functionality [StatefulSetBasic] Should recreate evicted statefulset [Conformance]
PASSED [sig-apps] StatefulSet [k8s.io] Basic StatefulSet functionality [StatefulSetBasic] should perform canary updates and phased rolling updates of template modifications [Conformance]
PASSED [sig-apps] StatefulSet [k8s.io] Basic StatefulSet functionality [StatefulSetBasic] should perform rolling updates and roll backs of template modifications [Conformance]
PASSED [sig-auth] ServiceAccounts should allow opting out of API token automount  [Conformance]
PASSED [sig-auth] ServiceAccounts should mount an API token into pods  [Conformance]
PASSED [sig-network] DNS should provide DNS for services  [Conformance]
PASSED [sig-network] DNS should provide DNS for the cluster  [Conformance]
PASSED [sig-network] Networking Granular Checks: Pods should function for intra-pod communication: http [NodeConformance] [Conformance]
PASSED [sig-network] Networking Granular Checks: Pods should function for intra-pod communication: udp [NodeConformance] [Conformance]
PASSED [sig-network] Networking Granular Checks: Pods should function for node-pod communication: http [NodeConformance] [Conformance]
PASSED [sig-network] Networking Granular Checks: Pods should function for node-pod communication: udp [NodeConformance] [Conformance]
PASSED [sig-network] Proxy version v1 should proxy logs on node using proxy subresource  [Conformance]
PASSED [sig-network] Proxy version v1 should proxy logs on node with explicit kubelet port using proxy subresource  [Conformance]
PASSED [sig-network] Proxy version v1 should proxy through a service and a pod  [Conformance]
PASSED [sig-network] Service endpoints latency should not be very high  [Conformance]
PASSED [sig-network] Services should provide secure master service  [Conformance]
PASSED [sig-network] Services should serve a basic endpoint from pods  [Conformance]
PASSED [sig-network] Services should serve multiport endpoints from pods  [Conformance]
PASSED [sig-scheduling] SchedulerPredicates [Serial] validates resource limits of pods that are allowed to run  [Conformance]
PASSED [sig-scheduling] SchedulerPredicates [Serial] validates that NodeSelector is respected if matching  [Conformance]
PASSED [sig-scheduling] SchedulerPredicates [Serial] validates that NodeSelector is respected if not matching  [Conformance]
PASSED [k8s.io] Container Lifecycle Hook when create a pod with lifecycle hook should execute poststart http hook properly [NodeConformance] [Conformance]
PASSED [sig-storage] ConfigMap optional updates should be reflected in volume [NodeConformance] [Conformance]
PASSED [sig-storage] ConfigMap should be consumable from pods in volume [NodeConformance] [Conformance]
PASSED [sig-storage] ConfigMap should be consumable from pods in volume as non-root [NodeConformance] [Conformance]
PASSED [sig-storage] ConfigMap should be consumable from pods in volume with defaultMode set [NodeConformance] [Conformance]
PASSED [sig-storage] ConfigMap should be consumable from pods in volume with mappings [NodeConformance] [Conformance]
PASSED [sig-storage] ConfigMap should be consumable from pods in volume with mappings and Item mode set [NodeConformance] [Conformance]
PASSED [sig-storage] ConfigMap should be consumable from pods in volume with mappings as non-root [NodeConformance] [Conformance]
PASSED [sig-storage] ConfigMap should be consumable in multiple volumes in the same pod [NodeConformance] [Conformance]
PASSED [sig-storage] ConfigMap updates should be reflected in volume [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should provide container's cpu limit [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should provide container's cpu request [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should provide container's memory limit [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should provide container's memory request [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should provide node allocatable (cpu) as default cpu limit if the limit is not set [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should provide node allocatable (memory) as default memory limit if the limit is not set [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should provide podname only [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should set DefaultMode on files [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should set mode on item file [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should update annotations on modification [NodeConformance] [Conformance]
PASSED [sig-storage] Downward API volume should update labels on modification [NodeConformance] [Conformance]
PASSED [sig-storage] EmptyDir volumes should support (non-root,0644,default) [NodeConformance] [Conformance]
PASSED [sig-storage] EmptyDir volumes should support (non-root,0644,tmpfs) [NodeConformance] [Conformance]
PASSED [sig-storage] EmptyDir volumes should support (non-root,0666,default) [NodeConformance] [Conformance]
PASSED [sig-storage] EmptyDir volumes should support (non-root,0666,tmpfs) [NodeConformance] [Conformance]
PASSED [sig-storage] EmptyDir volumes should support (non-root,0777,default) [NodeConformance] [Conformance]
...
PASSED [sig-storage] Subpath Atomic writer volumes should support subpaths with configmap pod with mountPath of existing file [Conformance]
PASSED [sig-storage] Subpath Atomic writer volumes should support subpaths with downward pod [Conformance]
PASSED [sig-storage] Subpath Atomic writer volumes should support subpaths with projected pod [Conformance]
PASSED [sig-storage] Subpath Atomic writer volumes should support subpaths with secret pod [Conformance]
gmacario@cloudshell:~ (kubernetes-workshop-218213)$
```

### Control cluster from nemo

Browse <https://console.cloud.google.com> > Kubernetes Engine > Clusters

* Select cluster "tonguetree" > Details
  - Take note of Endpoint: 35.195.217.164
* Click "Show cluster certificate"
  - Take note of Cluster CA certificate: ...

Reference: <https://cloud.google.com/sdk/gcloud/reference/container/clusters/get-credentials>

#### List Kubernetes clusters on GCP

Logged as `gpmacario@nemo`

```shell
gcloud container clusters list
```

Result:
```
gpmacario@nemo:~ $ gcloud container clusters list
NAME        LOCATION        MASTER_VERSION  MASTER_IP       MACHINE_TYPE   NODE_VERSION  NUM_NODES  STATUS
kube-101    europe-west1-b  1.10.7-gke.2    35.241.146.224  n1-standard-1  1.10.7-gke.2  2          RUNNING
tonguetree  europe-west1-b  1.9.7-gke.6     35.195.217.164  n1-standard-2  1.9.7-gke.6   3          RUNNING
gpmacario@nemo:~ $
```

#### Get credentials for GKE cluster "tonguetree"

Logged as gpmacario@nemo

```shell
gcloud container clusters get-credentials tonguetree
```

Result

```
gpmacario@nemo:~ $ gcloud container clusters get-credentials tonguetree
Fetching cluster endpoint and auth data.
kubeconfig entry generated for tonguetree.
gpmacario@nemo:~ $
```

#### run `kubectl cluster-info`

Command

```shell
kubectl cluster-info
```

Result

```
gpmacario@nemo:~ $ kubectl cluster-info
Kubernetes master is running at https://35.195.217.164
GLBCDefaultBackend is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/default-http-backend:http/proxy
Heapster is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/heapster/proxy
KubeDNS is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
kubernetes-dashboard is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy
Metrics-server is running at https://35.195.217.164/api/v1/namespaces/kube-system/services/https:metrics-server:/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
gpmacario@nemo:~ $
```

#### Run `kubectl get nodes`

Command

```shell
kubectl get nodes
```

Result

```
gpmacario@nemo:~ $ kubectl get nodes
NAME                                        STATUS   ROLES    AGE   VERSION
gke-tonguetree-default-pool-5c0fe7ba-t50s   Ready    <none>   68m   v1.9.7-gke.6
gke-tonguetree-default-pool-5c0fe7ba-x7mw   Ready    <none>   68m   v1.9.7-gke.6
gke-tonguetree-default-pool-5c0fe7ba-xj5l   Ready    <none>   68m   v1.9.7-gke.6
gpmacario@nemo:~ $
```

#### Run `kubectl get namespaces`

Command

```shell
kubectl get namespaces
```

Result

```
gpmacario@nemo:~ $ kubectl get namespaces
NAME            STATUS   AGE
default         Active   75m
jx              Active   74m
jx-production   Active   52m
jx-staging      Active   52m
kube-public     Active   75m
kube-system     Active   75m
gpmacario@nemo:~ $
```

#### Run `kubectl get services -n jx`

Command

```shell
kubectl get services -n jx
```

Result

```
gpmacario@nemo:~ $ kubectl get services -n jx
NAME                            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)     AGE
heapster                        ClusterIP   10.27.247.74    <none>        8082/TCP    63m
jenkins                         ClusterIP   10.27.249.0     <none>        8080/TCP    63m
jenkins-agent                   ClusterIP   10.27.253.40    <none>        50000/TCP   63m
jenkins-x-chartmuseum           ClusterIP   10.27.240.69    <none>        8080/TCP    63m
jenkins-x-docker-registry       ClusterIP   10.27.252.143   <none>        5000/TCP    63m
jenkins-x-mongodb               ClusterIP   10.27.251.85    <none>        27017/TCP   63m
jenkins-x-monocular-api         ClusterIP   10.27.241.218   <none>        80/TCP      63m
jenkins-x-monocular-prerender   ClusterIP   10.27.243.227   <none>        80/TCP      63m
jenkins-x-monocular-ui          ClusterIP   10.27.243.130   <none>        80/TCP      63m
nexus                           ClusterIP   10.27.243.12    <none>        80/TCP      63m
gpmacario@nemo:~ $
```

#### Run `kubectl proxy`

Command

```shell
kubectl proxy
```

```
gpmacario@nemo:~ $ kubectl proxy
Starting to serve on 127.0.0.1:8001
```

#### Display Kubernetes dasboard

Logged as `gpmacario@nemo`, 
browse <http://127.0.0.1:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy>

> **Kubeconfig**
>
> Please select the kubeconfig file that you have created to configure access to the cluster.
> To find out more about how to configure and use kubeconfig file, please refer to the
> [Configure Access to Multiple Clusters](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) section.
>
> **Token**
>
> Every Service Account has a Secret with valid Bearer Token that can be used to log in to Dashboard.
> To find out more about how to configure and use Bearer Tokens, please refer to the
> [Authentication](https://kubernetes.io/docs/admin/authentication/) section.

TODO

### Trying `jx` commands from nemo

#### Install the `jx` binary

Reference: <https://jenkins-x.io/getting-started/install/>

Logged as gpmacario@nemo

```shell
mkdir -p ~/Downloads && cd ~/Downloads
curl -L https://github.com/jenkins-x/jx/releases/download/v1.3.399/jx-linux-amd64.tar.gz | tar xzv
sudo mv jx /usr/local/bin
```

#### Display jx help

```
gpmacario@nemo:~ $ jx


Installing:
  install                   Install Jenkins X in the current Kubernetes cluster
  uninstall                 Uninstall the Jenkins X platform
  upgrade                   Upgrades a resource
  create cluster            Create a new Kubernetes cluster
  update cluster            Updates an existing Kubernetes cluster
  create jenkins token      Adds a new username and API token for a Jenkins server
  init                      Init Jenkins X

Adding Projects to Jenkins X:
  import                    Imports a local project or Git repository into Jenkins
  create archetype          Create a new app from a Maven Archetype and import the generated code into Git and Jenkins for CI/CD
  create spring             Create a new Spring Boot application and import the generated code into Git and Jenkins for CI/CD
  create lile               Create a new Lile based application and import the generated code into Git and Jenkins for CI/CD
  create micro              Create a new micro based application and import the generated code into Git and Jenkins for CI/CD
  create quickstart         Create a new app from a Quickstart and import the generated code into Git and Jenkins for CI/CD
  create quickstartlocation Create a location of quickstarts for your team

Addons:
  create addon              Creates an addon
  create token addon        Adds a new token/login for a user for a given addon
  delete addon              Deletes one or more addons
  delete token addon        Deletes one or more API tokens for a user on an issue addon server

Git:
  create git server         Creates a new Git server URL


Working with CloudBees application:
  cloudbees                 Opens the CloudBees app for Kubernetes for visualising CI/CD and your environments
  login                     Onboard an user into the CloudBees application

Working with Environments:
  preview                   Creates or updates a Preview Environment for the current version of an application
  promote                   Promotes a version of an application to an Environment
  create environment        Create a new Environment which is used to promote your Team's Applications via Continuous Delivery
  delete environment        Deletes one or more Environments
  edit environment          Edits an Environment which is used to promote your Team's Applications via Continuous Delivery
  get environments          Display one or more Environments

Working with Jenkins X resources:
  get                       Display one or more resources
  edit                      Edit a resource
  create                    Create a new resource
  update                    Updates an existing resource
  delete                    Deletes one or more resources
  start                     Starts a process such as a pipeline
  stop                      Stops a process such as a pipeline

Jenkins X Pipeline Commands:
  step                      pipeline steps

Jenkins X services:
  controller                Runs a controller
  gc                        Garbage collects Jenkins X resources

Other Commands:
  diagnose                  Print diagnostic information about the Jenkins X installation
  docs                      Open the documentation in a browser
  help                      Help about any command
  version                   Print the version information
Options:
      --version=false: version for jx
Usage:
  jx [flags] [options]
Use "jx <command> --help" for more information about a given command.
Use "jx options" for a list of global command-line options (applies to all commands).
gpmacario@nemo:~ $
```

#### Run `jx --version`

Command

```shell
jx --version
```

Result

```
gpmacario@nemo:~ $ jx --version
1.3.399
gpmacario@nemo:~ $
```

#### Run `jx diagnose` as gpmacario@nemo

Command

```shell
jx diagnose
```

Result

```
gpmacario@nemo:~ $ jx diagnose
Running in namespace: default
Jenkins X Version:
 Using helmBinary helm with feature flag: none
NAME               VERSION
jx                 1.3.399
jenkins x platform 0.0.2755
Kubernetes cluster v1.9.7-gke.6
kubectl            v1.12.1
helm client        v2.9.1+g20adb27
helm server        v2.10.0+g9ad53aa
git                git version 2.17.1
Unable to get the Jenkins X Status
error: Command failed 'jx status': Unable to find JX components in Cluster(gke_kubernetes-workshop-218213_europe-west1-b_tonguetree): 3 nodes, memory 14% of 17354292Ki, cpu 37% of 5790m
you could try:   # Default installer which uses interactive prompts to generate git secrets
  jx install
  
  # Install with a GitHub personal access token
  jx install --git-username jenkins-x-bot --git-api-token 9fdbd2d070cd81eb12bca87861bcd850
  
  # If you know the cloud provider you can pass this as a CLI argument. E.g. for AWS
  jx install --provider=aws

Installs the Jenkins X platform on a Kubernetes cluster 

Requires a --git-username and --git-api-token that can be used to create a new token. This is so the Jenkins X platform can git tag your releases 

For more documentation see: https://jenkins-x.io/getting-started/install-on-cluster/

The current requirements are: 

 *RBAC is enabled on the cluster 

 *Insecure Docker registry is enabled for Docker registries running locally inside Kubernetes on the service IP range. See the above documentation for more detailerror: no deployments found in namespace default exit status 1
gpmacario@nemo:~ $
```

### Create Quickstart application `node-http-hmi-repository`

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
