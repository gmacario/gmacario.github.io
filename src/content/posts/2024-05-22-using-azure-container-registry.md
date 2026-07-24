---
title: "Using the Azure Container Registry"
pubDatetime: 2024-05-22T00:00:00+02:00
tags:
  - howto
  - docker
  - azure
  - container
description: "This blog post explains in detail how to use the Azure Container Registry (ACR) to publish and distribute Docker images on the cloud."
---

## Table of contents

## Introduction

This blog post explains in detail how to use the [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry) (ACR) to publish and distribute Docker images on the cloud.

Azure Container Regsitry is an Azure service which implements a registry of Docker and Open Container Initiative (OCI) images, with support for all OCI artifacts.

The images published on ACR may be used within Azure cloud to run container images, or used on premise or with other cloud providers.

## References

* [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry)

## Login to Azure portal

Login to Azure portal at <https://aka.ms/azureportal>

* Username: (enter the email used to authenticate to Azure - example: `gianpaolo.macario@arol.com`)

TIP: Click the "JSON View" link to inspect the details of the resource:

Azure portal: All resources > arolgroup (Container registry) > JSON View

### Training and documentation about ACR

Inside the "Container registry" resource page on <https://portal.azure.com>, click tab "Tutorials"

> **Free Trainings from Microsoft**
>
> * [Build and store container images with Container Registry](https://aka.ms/acr/container-image-store-tutorial) 6 units, 49 min
>   Learn how to build and store container images with Container Registry.
> * [Build and deploy container images in the cloud with Container Registry Tasks](https://aka.ms/acr/container-image-build-tutorial) 6 units, 1 hour
>   Learn how to use Container Registry Tasks for automated container image builds on code commit and base image update.
> * [Manage container images in Container Registry](https://aka.ms/acr/publish-container-tutorial) 8 units, 31 min
Learn how to use Container Registry to store your container images, and automate builds and deployments.
>
> **Useful links**
>
> * [Best practices for Container Registry](https://aka.ms/acr/best-practices)
> * [How to consume and maintain public content with Container Registry Tasks](https://aka.ms/acr/public-content)

## Training: [Build and store container images with Container Registry](https://aka.ms/acr/container-image-store-tutorial)

(6 units, 49 min)

> Learn how to build and store container images with Container Registry.

### Introduction to Azure Container Registry

<!-- (2024-05-21 11:33 CEST) -->

<https://learn.microsoft.com/en-us/training/modules/build-and-store-container-images/1-intro-to-azure-container-registry>

(2 min)

...

> **Important**
>
> All exercises in this module use the [Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/overview), which already has all the needed tooling installed.
> If you prefer to run the examples in your own terminal, you need to have the [Azure CLI](https://learn.microsoft.com/en-us/azure/aks/kubernetes-walkthrough) installed.

### Exercise - Deploy an Azure container registry

<!-- (2024-05-21 11:36 CEST) -->

<https://learn.microsoft.com/en-us/training/modules/build-and-store-container-images/2-deploy-azure-container-registry>

(5 min)

Launch [Azure Cloud Shell](https://shell.azure.com/bash) and sign in to your Azure account using the az login command.

![2024-05-21-fig01-login-to-azure-cloud-shell.png](/assets/2024-05-21-using-azure-container-registry/2024-05-21-fig01-login-to-azure-cloud-shell.png)

Read warning

> Subscription used to launch your CloudShell b5d3feec-1307-4495-b12e-f1619ced3d95 is not registered to Microsoft.CloudShell Namespace.
> Please follow these instructions "<https://aka.ms/RegisterCloudShell>" to register.
> In future, unregistered subscriptions will have restricted access to CloudShell service.

... skip part of this tutorial since the Azure Container Registry "arolgroup" was already created

Check that we can correctly access the Azure Container Registry

```bash
az -h
az version

az login
az account show

az acr -h
az acr list
az acr check-name --name arolgroup
az acr check-health --name arolgroup
# az acr credential show --name arolgroup
```

The last (commented) command above fails at this point in the walkthrough,
because the registry's admin account isn't enabled yet:

```text
macario [ ~ ]$ az acr credential show --name arolgroup
Run 'az acr update -n arolgroup --admin-enabled true' to enable admin first.
macario [ ~ ]$
```

The error message says exactly what to do — see "Enable the registry admin
account" further down in this post.

<!-- (2024-05-21 12:29 CEST) -->

Try creating a resource group named *learn-acr-rg* to hold the resources for this module using the `az group create` command.

```bash
az group create --name learn-acr-rg --location eastus
```

Result:

```text
macario [ ~/test-node-acr ]$ az group create --name learn-acr-rg --location eastus
(AuthorizationFailed) The client 'gianpaolo.macario@arol.com' with object id 'a1b0xxxx-xxxx-xxxx-xxxx-xxxxxxxxa4a4' does not have authorization to perform action 'Microsoft.Resources/subscriptions/resourcegroups/write' over scope '/subscriptions/b5d3xxxx-xxxx-xxxx-xxxx-xxxxxxxx3d95/resourcegroups/learn-acr-rg' or the scope is invalid. If access was recently granted, please refresh your credentials.
Code: AuthorizationFailed
Message: The client 'gianpaolo.macario@arol.com' with object id 'a1b0xxxx-xxxx-xxxx-xxxx-xxxxxxxxa4a4' does not have authorization to perform action 'Microsoft.Resources/subscriptions/resourcegroups/write' over scope '/subscriptions/b5d3xxxx-xxxx-xxxx-xxxx-xxxxxxxx3d95/resourcegroups/learn-acr-rg' or the scope is invalid. If access was recently granted, please refresh your credentials.
macario [ ~/test-node-acr ]$
```

### Exercise - Build container images using Azure Container Registry Tasks

<!-- (2024-05-21 11:53 CEST) -->

<https://learn.microsoft.com/en-us/training/modules/build-and-store-container-images/3-build-container-image>

(10 min)

Open the Cloud Shell editor and create a new file named Dockerfile using the code command.

```bash
mkdir -p ~/test-node-acr
cd ~/test-node-acr
code Dockerfile
```

Type the following text

```text
FROM    node:9-alpine
ADD     https://raw.githubusercontent.com/Azure-Samples/acr-build-helloworld-node/master/package.json /
ADD     https://raw.githubusercontent.com/Azure-Samples/acr-build-helloworld-node/master/server.js /
RUN     npm install
EXPOSE  80
CMD     ["node", "server.js"]
```

Save the file, then build the container with the following command

```bash
ACR_NAME="arolgroup"
az acr build --registry $ACR_NAME --image helloacrtasks:v1 .
```

Result:

```text
macario [ ~/test-node-acr ]$ az acr build --registry $ACR_NAME --image helloacrtasks:v1 .
Packing source code into tar to upload...
Uploading archived source code from '/tmp/build_archive_3e8ff4121f84442abfbd4be63c1562d6.tar.gz'...
Sending context (495.000 Bytes) to registry: arolgroup...
Queued a build with ID: cb1
Waiting for an agent...
2024/05/21 10:04:01 Downloading source code...
2024/05/21 10:04:01 Finished downloading source code
2024/05/21 10:04:02 Using acb_vol_f1fc1fcf-5830-45a5-b9ac-263d0834c140 as the home volume
2024/05/21 10:04:02 Setting up Docker configuration...
2024/05/21 10:04:02 Successfully set up Docker configuration
2024/05/21 10:04:02 Logging in to registry: arolgroup.azurecr.io
2024/05/21 10:04:03 Successfully logged into arolgroup.azurecr.io
2024/05/21 10:04:03 Executing step ID: build. Timeout(sec): 28800, Working directory: '', Network: ''
2024/05/21 10:04:03 Scanning for dependencies...
2024/05/21 10:04:03 Successfully scanned dependencies
2024/05/21 10:04:03 Launching container with name: build
Sending build context to Docker daemon  3.072kB
Step 1/6 : FROM    node:9-alpine
9-alpine: Pulling from library/node
a073c86ecf9e: Pulling fs layer
0e28711eb56d: Pulling fs layer
e460dd483fdd: Pulling fs layer
a073c86ecf9e: Verifying Checksum
a073c86ecf9e: Download complete
a073c86ecf9e: Pull complete
e460dd483fdd: Verifying Checksum
e460dd483fdd: Download complete
0e28711eb56d: Verifying Checksum
0e28711eb56d: Download complete
0e28711eb56d: Pull complete
e460dd483fdd: Pull complete
Digest: sha256:8dafc0968fb4d62834d9b826d85a8feecc69bd72cd51723c62c7db67c6dec6fa
Status: Downloaded newer image for node:9-alpine
 ---> a56170f59699
Step 2/6 : ADD     https://raw.githubusercontent.com/Azure-Samples/acr-build-helloworld-node/master/package.json /

 ---> 25db52becec1
Step 3/6 : ADD     https://raw.githubusercontent.com/Azure-Samples/acr-build-helloworld-node/master/server.js /

 ---> e51b4026a4f1
Step 4/6 : RUN     npm install
 ---> Running in 6e9fa5a80c5c
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN helloworld@1.0.0 No repository field.

up to date in 0.057s
Removing intermediate container 6e9fa5a80c5c
 ---> f217d9f045b9
Step 5/6 : EXPOSE  80
 ---> Running in f35599aa5cf3
Removing intermediate container f35599aa5cf3
 ---> 2e14aefcfd47
Step 6/6 : CMD     ["node", "server.js"]
 ---> Running in 5447bb0cb542
Removing intermediate container 5447bb0cb542
 ---> 33112d4542d4
Successfully built 33112d4542d4
Successfully tagged arolgroup.azurecr.io/helloacrtasks:v1
2024/05/21 10:04:13 Successfully executed container: build
2024/05/21 10:04:13 Executing step ID: push. Timeout(sec): 3600, Working directory: '', Network: ''
2024/05/21 10:04:13 Pushing image: arolgroup.azurecr.io/helloacrtasks:v1, attempt 1
The push refers to repository [arolgroup.azurecr.io/helloacrtasks]
b6b679ebf8e9: Preparing
105fab5e99d4: Preparing
51978827661c: Preparing
172ed8ca5e43: Preparing
8c9992f4e5dd: Preparing
8dfad2055603: Preparing
8dfad2055603: Waiting
105fab5e99d4: Pushed
b6b679ebf8e9: Pushed
51978827661c: Pushed
8dfad2055603: Pushed
8c9992f4e5dd: Pushed
172ed8ca5e43: Pushed
v1: digest: sha256:fa7c187a329bb373d1018f211c319470e2261ff8c79d207493239e29e49a6f3e size: 1572
2024/05/21 10:04:25 Successfully pushed image: arolgroup.azurecr.io/helloacrtasks:v1
2024/05/21 10:04:25 Step ID: build marked as successful (elapsed time in seconds: 9.907800)
2024/05/21 10:04:25 Populating digests for step ID: build...
2024/05/21 10:04:26 Successfully populated digests for step ID: build
2024/05/21 10:04:26 Step ID: push marked as successful (elapsed time in seconds: 12.172301)
2024/05/21 10:04:26 The following dependencies were found:
2024/05/21 10:04:26 
- image:
    registry: arolgroup.azurecr.io
    repository: helloacrtasks
    tag: v1
    digest: sha256:fa7c187a329bb373d1018f211c319470e2261ff8c79d207493239e29e49a6f3e
  runtime-dependency:
    registry: registry.hub.docker.com
    repository: library/node
    tag: 9-alpine
    digest: sha256:8dafc0968fb4d62834d9b826d85a8feecc69bd72cd51723c62c7db67c6dec6fa
  git: {}


Run ID: cb1 was successful after 26s
macario [ ~/test-node-acr ]
```

Verify that the image has been created and stored in the registry using the `az acr repository list` command.

```bash
az acr repository list --name $ACR_NAME --output table
```

Result:

```text
macario [ ~/test-node-acr ]$ az acr repository list --name $ACR_NAME --output table
Result
----------------
helloacrtasks
swap/swap-client
swap/swap-server
macario [ ~/test-node-acr ]$
```

### Exercise - Deploy images from Azure Container Registry

<!-- (2024-05-21 12:08 CEST) -->

<https://learn.microsoft.com/en-us/training/modules/build-and-store-container-images/4-deploy-container-image>

(15 min)

#### Registry authentication

> Azure Container Registry doesn't support unauthenticated access and requires authentication for all operations.
> Registries support two types of identities:
>
> * **Microsoft Entra identities**, including both user and service principals. Access to a registry with a Microsoft Entra identity is role-based and you can assign identities one of three roles: **reader** (pull access only), **contributor** (push and pull access), or **owner** (pull, push, and assign roles to other users).
> * The **admin** account included with each registry. The admin account is disabled by default.
>
> **Important**
>
> The admin account provides a quick option to try a new registry.
> You can enable the account and use the username and password in workflows and apps that need access.
> After you've confirmed the registry works as expected, you should disable the admin account and use Microsoft Entra identities to ensure the security of your registry.
> Do not share the admin account credentials with others.

#### Enable the registry admin account

<!-- (2024-05-21 12:13 CEST) -->

Enable the admin account on your registry using the `az acr update` command.

```bash
az acr update -n $ACR_NAME --admin-enabled true
```

Result:

```text
macario [ ~/test-node-acr ]$ az acr update -n $ACR_NAME --admin-enabled true
{
  "adminUserEnabled": true,
  "anonymousPullEnabled": false,
  "creationDate": "2024-05-10T12:02:31.910341+00:00",
  "dataEndpointEnabled": false,
  "dataEndpointHostNames": [],
  "encryption": {
    "keyVaultProperties": null,
    "status": "disabled"
  },
  "id": "/subscriptions/b5d3feec-1307-4495-b12e-f1619ced3d95/resourceGroups/global_resources/providers/Microsoft.ContainerRegistry/registries/arolgroup",
  "identity": null,
  "location": "westeurope",
  "loginServer": "arolgroup.azurecr.io",
  "metadataSearch": "Disabled",
  "name": "arolgroup",
  "networkRuleBypassOptions": "AzureServices",
  "networkRuleSet": null,
  "policies": {
    "azureAdAuthenticationAsArmPolicy": {
      "status": "enabled"
    },
    "exportPolicy": {
      "status": "enabled"
    },
    "quarantinePolicy": {
      "status": "disabled"
    },
    "retentionPolicy": {
      "days": 7,
      "lastUpdatedTime": "2024-05-10T12:02:39.180362+00:00",
      "status": "disabled"
    },
    "softDeletePolicy": {
      "lastUpdatedTime": "2024-05-10T12:02:39.180402+00:00",
      "retentionDays": 7,
      "status": "disabled"
    },
    "trustPolicy": {
      "status": "disabled",
      "type": "Notary"
    }
  },
  "privateEndpointConnections": [],
  "provisioningState": "Succeeded",
  "publicNetworkAccess": "Enabled",
  "resourceGroup": "global_resources",
  "sku": {
    "name": "Standard",
    "tier": "Standard"
  },
  "status": null,
  "systemData": {
    "createdAt": "2024-05-10T12:02:31.910341+00:00",
    "createdBy": "xxxx.xxxx@xxxx.com",
    "createdByType": "User",
    "lastModifiedAt": "2024-05-21T10:14:53.800856+00:00",
    "lastModifiedBy": "xxxx.xxxx@xxxx.com",
    "lastModifiedByType": "User"
  },
  "tags": {},
  "type": "Microsoft.ContainerRegistry/registries",
  "zoneRedundancy": "Disabled"
}
macario [ ~/test-node-acr ]$
```

Retrieve the username and password for the admin account using the `az acr credential show` command.

```bash
az acr credential show --name $ACR_NAME
```

Result (NOTE: SECRETS ANONYMIZED):

```text
macario [ ~/test-node-acr ]$ az acr credential show --name $ACR_NAME
[Warning] This output may compromise security by showing the following secrets: passwords, value. Learn more at: https://go.microsoft.com/fwlink/?linkid=2258669
{
  "passwords": [
    {
      "name": "password",
      "value": "1oGNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxNjJ"
    },
    {
      "name": "password2",
      "value": "EOEzxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxErDz"
    }
  ],
  "username": "arolgroup"
}
macario [ ~/test-node-acr ]$
```

Take note of the `username` and `password` values in the output for use in future commands.

#### Deploy a container with Azure CLI

<!-- (2024-05-21 12:23 CEST) -->

Deploy a container instance using the `az container create` command.
Make sure you replace `<admin-username>` and `<admin-password>` with your admin username and password from the previous command.

```bash
az container create --resource-group learn-acr-rg --name acr-tasks --image $ACR_NAME.azurecr.io/helloacrtasks:v1 --registry-login-server $ACR_NAME.azurecr.io --ip-address Public --location eastus --registry-username <admin-username> --registry-password <admin-password>
```

Result:

<!-- markdownlint-disable MD013 -->

```text
macario [ ~/test-node-acr ]$ az container create --resource-group learn-acr-rg --name acr-tasks --image $ACR_NAME.azurecr.io/helloacrtasks:v1 --registry-login-server $ACR_NAME.azurecr.io --ip-address Public --location eastus --registry-username "arolgroup" --registry-password "1oGNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxNjJ"
(AuthorizationFailed) The client 'gianpaolo.macario@arol.com' with object id 'a1b0xxxx-xxxx-xxxx-xxxx-xxxxxxxxa4a4' does not have authorization to perform action 'Microsoft.ContainerInstance/containerGroups/write' over scope '/subscriptions/b5d3xxxx-xxxx-xxxx-xxxx-xxxxxxxx3d95/resourceGroups/learn-acr-rg/providers/Microsoft.ContainerInstance/containerGroups/acr-tasks' or the scope is invalid. If access was recently granted, please refresh your credentials.
Code: AuthorizationFailed
Message: The client 'gianpaolo.macario@arol.com' with object id 'a1b0xxxx-xxxx-xxxx-xxxx-xxxxxxxxa4a4' does not have authorization to perform action 'Microsoft.ContainerInstance/containerGroups/write' over scope '/subscriptions/b5d3xxxx-xxxx-xxxx-xxxx-xxxxxxxx3d95/resourceGroups/learn-acr-rg/providers/Microsoft.ContainerInstance/containerGroups/acr-tasks' or the scope is invalid. If access was recently granted, please refresh your credentials.
macario [ ~/test-node-acr ]$
```

<!-- markdownlint-enable -->

Get the IP address of the Azure container instance using the az container show command.

```bash
az container show --resource-group learn-acr-rg --name acr-tasks --query ipAddress.ip --output table
```

Result: this step could not be completed in my subscription, because the
container deployment above failed with an authorization error. When it
succeeds, this command prints the container's public IP address.

In a separate browser tab, navigate to the IP address of the container.
If everything is configured correctly, you should see a simple web page
confirming the container is up and running.

*(No screenshot here, since my container instance never started — see the
authorization error above.)*

### Exercise - Replicate a container image to different Azure regions

<https://learn.microsoft.com/en-us/training/modules/build-and-store-container-images/5-replicate-container-image>

(5 min)

This exercise shows how to replicate a registry to a second Azure region for
lower latency and better resiliency. *(Not run against my own subscription,
following the authorization error above — the steps below follow the
referenced Microsoft Learn module.)*

#### Create a replicated region for an Azure Container Registry

Azure Container Registry supports **geo-replication**: push an image once and
pull it from a regional replica closer to where it's deployed, reducing
latency for multi-region deployments.

Replicate your registry to another region using the `az acr replication create` command. In this example, we replicate to the `japaneast` region.

```bash
az acr replication create --registry $ACR_NAME --location japaneast
```

*(Output not captured here — see the [referenced Microsoft Learn
module](https://learn.microsoft.com/en-us/training/modules/build-and-store-container-images/5-replicate-container-image)
for a full example.)*

View all the container image replicas using the `az acr replication list` command.

```bash
az acr replication list --registry $ACR_NAME --output table
```

*(Output not captured here — the table lists each replicated region and its
provisioning status.)*

You can also use the Azure portal to view your container images by navigating to your container registry and selecting `Replications`.

*(Screenshot not captured here — the pane lists each region and its sync
status.)*

#### Clean up resources

<!-- (2024-05-21 13:01 CEST) -->

Remove the resources you created in this module to avoid incurring charges.
Deleting the resource group also deletes all its associated resources.

Navigate to the [Azure Cloud Shell](https://shell.azure.com/bash).

Delete the resource group using the az group delete command.

```bash
az group delete --name learn-acr-rg --yes --no-wait
```

Result:

```text
macario [ ~ ]$ az group delete --name learn-acr-rg --yes --no-wait
(AuthorizationFailed) The client 'gianpaolo.macario@arol.com' with object id 'a1b0xxxx-xxxx-xxxx-xxxx-xxxxxxxxa4a4' does not have authorization to perform action 'Microsoft.Resources/subscriptions/resourcegroups/delete' over scope '/subscriptions/b5d3xxxx-xxxx-xxxx-xxxx-xxxxxxxx3d95/resourcegroups/learn-acr-rg' or the scope is invalid. If access was recently granted, please refresh your credentials.
Code: AuthorizationFailed
Message: The client 'gianpaolo.macario@arol.com' with object id 'a1b0xxxx-xxxx-xxxx-xxxx-xxxxxxxxa4a4' does not have authorization to perform action 'Microsoft.Resources/subscriptions/resourcegroups/delete' over scope '/subscriptions/b5d3xxxx-xxxx-xxxx-xxxx-xxxxxxxx3d95/resourcegroups/learn-acr-rg' or the scope is invalid. If access was recently granted, please refresh your credentials.
macario [ ~ ]$
```

#### Learn more

Learn more about Azure Container Registry and Docker on Azure with the following resources:

* [Azure Container Registry (ACR) documentation](https://learn.microsoft.com/en-us/azure/container-registry/)
* [Docker on Azure](https://learn.microsoft.com/en-us/azure/docker/)

### Knowledge check

<!-- (2024-05-21 13:06 CEST) -->

<https://learn.microsoft.com/en-us/training/modules/build-and-store-container-images/6-knowledge-check>

(5 min)

#### Check your knowledge

**1.** Which of the following options *isn't* a benefit of using Azure Container Registry?

* [ ] Replicate container images to multiple Azure data centers.
* [ ] Pull container images using any Docker container-related technology.
* [x] Allow public access to container images for pull operations.
* [ ] Build container images without the need for locally installed Docker tools.

**2.** What's the recommended authentication method for Azure Container Registry?

* [ ] Admin account
* [ ] Username and password
* [x] Azure service principal
* [ ] No authentication

**3.** Let's say you use container images to run compute workloads in multiple regions throughout the world. You plan to enable the geo-replication feature of Azure Container Registry to decrease the time required to provision an instance. In which regions should you configure the Azure Container Registry geo-replication feature?

* [ ] Place a container registry in the region closest to your development team.
* [x] Place a container registry in each region where images are run.
* [ ] Place a container registry in every Azure region.

Check your answers

Congratulations!
You earned experience points for completing the knowledge check.
200 XP

## Azure Container Registry authentication with service principals

<!-- (2024-05-21 15:10 CEST) -->

Reference: <https://learn.microsoft.com/en-us/azure/container-registry/container-registry-auth-service-principal>

Login to Microsoft Entra admin center: <https://entra.microsoft.com/>

MS Entra: Settings > Directories + subscriptions

* Select Directory name: "Arol Spa"

<!--
MS Entra: **Identity** > **Applications** > **App registrations** > New registration

* Name: "Docker test"
* Supported account types: Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)
* Redirect URI (optional): (empty)

then click **Register**.

Result:

![image](https://gist.github.com/assets/75182/b1d8fc5a-7859-49c1-b4b5-3016dc898bb1)
-->

### Create a service principal with ACR pull permissions

<!-- (2024-05-21 15:33 CEST) -->

Logged into [Azure Cloud Shell](https://shell.azure.com/bash), type the following commands:

```bash
ACR_NAME=arolgroup
SERVICE_PRINCIPAL_NAME=dockertest01

# Obtain the full registry ID
ACR_REGISTRY_ID=$(az acr show --name $ACR_NAME --query "id" --output tsv)

# Create the service principal with rights scoped to the registry.
# Default permissions are for docker pull access. Modify the '--role'
# argument value as desired:
# acrpull:     pull only
# acrpush:     push and pull
# owner:       push, pull, and assign roles
PASSWORD=$(az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role acrpull --query "password" --output tsv)
USER_NAME=$(az ad sp list --display-name $SERVICE_PRINCIPAL_NAME --query "[].appId" --output tsv)
```

Result:

```text
macario [ ~ ]$ ACR_NAME=arolgroup
macario [ ~ ]$ SERVICE_PRINCIPAL_NAME=dockertest01
macario [ ~ ]$
macario [ ~ ]$ ACR_REGISTRY_ID=$(az acr show --name $ACR_NAME --query "id" --output tsv)
macario [ ~ ]$ SP_PASSWORD=$(az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role acrpull --query "password" --output tsv)
WARNING: Creating 'acrpull' role assignment under scope '/subscriptions/b5d3feec-1307-4495-b12e-f1619ced3d95/resourceGroups/global_resources/providers/Microsoft.ContainerRegistry/registries/arolgroup'
WARNING: The output includes credentials that you must protect. Be sure that you do not include these credentials in your code or check the credentials into your source control. For more information, see https://aka.ms/azadsp-cli
macario [ ~ ]$ SP_USERNAME=$(az ad sp list --display-name $SERVICE_PRINCIPAL_NAME --query "[].appId" --output tsv)
macario [ ~ ]$
```

Take note of the following credentials and safe them in a secure place:

```text
macario [ ~ ]$ echo $ACR_REGISTRY_ID
/subscriptions/b5d3xxxx-xxxx-xxxx-xxxx-xxxxxxxx3d95/resourceGroups/global_resources/providers/Microsoft.ContainerRegistry/registries/arolgroup
macario [ ~ ]$ echo $SP_USERNAME
4bf0xxxx-xxxx-xxxx-xxxx-xxxxxxxx1e18
macario [ ~ ]$ echo $SP_PASSWORD
I4D8xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdcrj
macario [ ~ ]$
```

### Create a service principal with ACR push permissions

<!-- (2024-05-27 10:20 CEST) -->

**NOTE**: In order to minimize the attack surface it is advised to limit distributions of Service Principals with push permissions to CI/CD pipelines, and create a different service principal per project, as in the following example.

Logged into [Azure Cloud Shell](https://shell.azure.com/bash), type the following commands:

```bash
ACR_NAME=arolgroup
SERVICE_PRINCIPAL_NAME=j0720_push

# Obtain the full registry ID
ACR_REGISTRY_ID=$(az acr show --name $ACR_NAME --query "id" --output tsv)

# Create the service principal with rights scoped to the registry.
# Default permissions are for docker pull access. Modify the '--role'
# argument value as desired:
# acrpull:     pull only
# acrpush:     push and pull
# owner:       push, pull, and assign roles
AZ_PASSWORD=$(az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role acrpush --query "password" --output tsv)
AZ_USERNAME=$(az ad sp list --display-name $SERVICE_PRINCIPAL_NAME --query "[].appId" --output tsv)
```

Result:

```text
macario [ ~ ]$ ACR_NAME=arolgroup
macario [ ~ ]$ SERVICE_PRINCIPAL_NAME=j0720_push
macario [ ~ ]$ ACR_REGISTRY_ID=$(az acr show --name $ACR_NAME --query "id" --output tsv)
macario [ ~ ]$ AZ_PASSWORD=$(az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role acrpush --query "password" --output tsv)
WARNING: Creating 'acrpush' role assignment under scope '/subscriptions/b5d3feec-1307-4495-b12e-f1619ced3d95/resourceGroups/global_resources/providers/Microsoft.ContainerRegistry/registries/arolgroup'
WARNING: The output includes credentials that you must protect. Be sure that you do not include these credentials in your code or check the credentials into your source control. For more information, see https://aka.ms/azadsp-cli
macario [ ~ ]$ AZ_USERNAME=$(az ad sp list --display-name $SERVICE_PRINCIPAL_NAME --query "[].appId" --output tsv)
macario [ ~ ]$
```

Take note of the following credentials and safe them in a secure place:

```bash
echo $ACR_NAME
echo $SERVICE_PRINCIPAL_NAME
echo $ACR_REGISTRY_ID
echo $AZ_USERNAME
echo $AZ_PASSWORD
```

Result (partially hidden for privacy reasons):

```text
macario [ ~ ]$ echo $ACR_NAME
arolgroup
macario [ ~ ]$ echo $SERVICE_PRINCIPAL_NAME
j0720_push
macario [ ~ ]$ echo $ACR_REGISTRY_ID
/subscriptions/b5d3xxxx-xxxx-xxxx-xxxx-xxxxxxxx3d95/resourceGroups/global_resources/providers/Microsoft.ContainerRegistry/registries/arolgroup
macario [ ~ ]$ echo $AZ_USERNAME
bfd2xxxx-xxxx-xxxx-xxxx-xxxxxxxx7204
macario [ ~ ]$ echo $AZ_PASSWORD
yNZ8xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxSaas
macario [ ~ ]$
```

### Authenticate using the service principal

<!-- (2024-05-21 15:44 CEST) -->

Once you have a service principal that you've granted access to your container registry, you can configure its credentials for access to "headless" services and applications, or enter them using the docker login command. Use the following values:

* **Username** - service principal's **application (client) ID**
* **Password** - service principal's **password (client secret)**

The **Username** value has the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

> **Tip**
>
> You can regenerate the password (client secret) of a service principal by running the [az ad sp credential reset](https://learn.microsoft.com/en-us/cli/azure/ad/sp/credential#az-ad-sp-credential-reset) command.

#### Use with docker login

You can run `docker login` using a service principal. In the following example, the service principal application ID is passed in the environment variable `$SP_APP_ID`, and the password in the variable `$SP_PASSWD`. For recommended practices to manage Docker credentials, see the [docker login](https://docs.docker.com/engine/reference/commandline/login/) command reference.

```bash
# Log in to Docker with service principal credentials
docker login myregistry.azurecr.io --username $SP_APP_ID --password $SP_PASSWD
```

Once logged in, Docker caches the credentials.

Example:

```text
gmacario@hw2228:~$ SP_APP_ID="4bf0****-****-****-****-********1e18"
gmacario@hw2228:~$ SP_PASSWD="I4D8********************************dcrj"
gmacario@hw2228:~$ docker login arolgroup.azurecr.io --username $SP_APP_ID --password $SP_PASSWD
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
WARNING! Your password will be stored unencrypted in /home/gmacario/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
gmacario@hw2228:~$

gmacario@hw2228:~$ docker pull arolgroup.azurecr.io/helloacrtasks:v1
v1: Pulling from helloacrtasks
a073c86ecf9e: Pull complete
0e28711eb56d: Pull complete
e460dd483fdd: Pull complete
5803b80e8518: Pull complete
3cded40882e4: Pull complete
719e7c4bdfb4: Pull complete
Digest: sha256:fa7c187a329bb373d1018f211c319470e2261ff8c79d207493239e29e49a6f3e
Status: Downloaded newer image for arolgroup.azurecr.io/helloacrtasks:v1
arolgroup.azurecr.io/helloacrtasks:v1
gmacario@hw2228:~$
```

### Running helloacrtasks from Docker CLI

Logged in as `gmacario@hw2228` (Ubuntu 22.04.4 LTS)

```bash
SP_APP_ID="4bf0****-****-****-****-********1e18"
SP_PASSWD="I4D8********************************dcrj"
docker login arolgroup.azurecr.io --username $SP_APP_ID --password $SP_PASSWD

docker pull arolgroup.azurecr.io/helloacrtasks:v1
docker run -p 2080:80 arolgroup.azurecr.io/helloacrtasks:v1
```

Result:

```text
gmacario@hw2228:~$ docker run -p 2080:80 arolgroup.azurecr.io/helloacrtasks:v1
Server running at http://localhost: 80
```

Then open URL <http://hw2228.tail2b437.ts.net:2080> from your browser:

![2024-05-21-fig02-helloacrtasks-v1-browser.png](/assets/2024-05-21-using-azure-container-registry/2024-05-21-fig02-helloacrtasks-v1-browser.png)

## Access Azure Container Registry from VS Code

Click ![2024-05-21-fig03-vscode-docker-icon.png](/assets/2024-05-21-using-azure-container-registry/2024-05-21-fig03-vscode-docker-icon.png)

VS Code: Docker > Registries > Azure > `_Azure subscription 1`

Expand registry `arolgroup`

![2024-05-21-fig04-vscode-docker-registries.png](/assets/2024-05-21-using-azure-container-registry/2024-05-21-fig04-vscode-docker-registries.png)

<!-- EOF -->
