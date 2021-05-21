---
layout: post
title:  "Syncing minikube configuration with Cygwin"
date:   2018-09-28 07:30:00
tags:   howto kubernetes minikube windows cygwin
---
<!-- markdown-link-check-disable -->

### The Problem

I have [Cygwin64](https://www.cygwin.com/) installed on my laptop which is running Windows 7 and I use both Windows CMD as well as Cygwin bash.

Logged in a Cygwin64 bash shell as gpmacario@HW2457, after doing

```shell
minikube start
minikube status
```

My local Minikube cluster is correctly identified

```
gpmacario@HW2457:~ $ minikube status
minikube: Running
cluster: Running
kubectl: Correctly Configured: pointing to minikube-vm at 192.168.99.100
gpmacario@HW2457:~ $
```

However when I start minikube from a Windows command shell, the cluster is not reachable

```
C:\Users\GPMacario>minikube status
minikube:
cluster:
kubectl:

C:\Users\GPMacario>
```

### Troubleshooting

By default Minikube stores its configuration in a `.minikube` directory under your home folder.

Unfortunately (as of v0.29) Minikube is not Cygwin64-aware and interprets the home directory differently depending on whether it was launched from Windows CMD or Cygwin bash.

* On Windows: `C:\Users\GPMacario`
* On Cygwin bash: `C:\cygwin64\home\gpmacario`

After looking through the Minikube documentation I found <https://github.com/kubernetes/minikube/blob/master/docs/env_vars.md>:

> **MINIKUBE_HOME** - (string) sets the path for the .minikube directory that minikube uses for state/configuration

### Solution

Start > Computer > Properties > Advanced > Environment Variables

and set environment variable `MINIKUBE_HOME`

```
MINIKUBE_HOME=C:\cygwin64\home\gpmacario\.minikube
```

In this way when launched from Windows CMD, minikube will find its configuration files in the same directory where they were stored when launched from Cygwin bash:

Start > cmd

```
Microsoft Windows [Versione 6.1.7601]
Copyright (c) 2009 Microsoft Corporation. Tutti i diritti riservati.

C:\Users\GPMacario>echo %MINIKUBE_HOME%
C:\cygwin64\home\gpmacario\.minikube

C:\Users\GPMacario>minikube status
minikube: Running
cluster: Running
kubectl: Correctly Configured: pointing to minikube-vm at 192.168.99.100

C:\Users\GPMacario>
```

<!-- markdown-link-check-enable -->
<!-- EOF -->
