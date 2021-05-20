---
layout: post
title:  "Trying Rancher on dc7600-gm"
date:   2016-02-13 15:00:00 CET
categories: howto docker rancher container linux ubuntu
---
<!-- markdown-link-check-disable -->

<!-- (2016-02-11 20:10 CET) -->

Testing Rancher server on dc7600-gm

* Ubuntu 14.04.3 LTS 64-bit
* Docker Engine 10.0.1

### Step-by-step instructions

Following instructions at <http://rancher.com/getting-started/>

#### 1. Prepare the Linux Host

Login as gmacario@dc7600-gm, check that Docker Engine is correctly installed

```
$ docker version
```

#### 2. Start Rancher Server

```
$ docker pull rancher/server
$ docker run -d --restart=always -p 8080:8080 rancher/server
# Tail the logs to show Rancher
$ sudo docker logs -f <containerid>
```

Test: Browse <http://dc7600-gm.solarma.it:8080>

==> OK, got Rancher server v0.59.0

#### 3. Configure Access Control

Browse <http://dc7600-gm.solarma.it:8080> > Admin > Access Control > Local

> 1. Setup an Admin user
>
> This user will become the admin that has full control over Rancher

* Login Username: `admin`
* Full Name: `admin`
* Password: `xxxx`
* Confirm Password: `xxxx`

then click **Enable Local Auth**

#### 4. Add Hosts

Browse <http://dc7600-gm.solarma.it:8080> > Infrastructure > Hosts > Add Host

Confirm Host Registration URL: `http://dc7600-gm.solarma.it:8080`, then click **Save**

Hosts: Add Host > Custom

Read steps, (optional) add labels, then copy the command line below and paste into a terminal:

```
sudo docker run -d --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/rancher:/var/lib/rancher rancher/agent:v0.9.2 http://dc7600-gm.solarma.it:8080/v1/scripts/58B176CF674D45CA34C4:1455516000000:Hijvj2IOYuzIYAXTWw6YgoyUkM
```

Click **Close**

After a few minutes a new host `dc7600-gm` should appear in <http://dc7600-gm.solarma.it:8080> > Infrastructure > Hosts

TODO

### See also

* [Upgrading Rancher](http://docs.rancher.com/rancher/upgrading/)
* [How to Upgrade Rancher](https://forums.rancher.com/t/how-to-upgrade-rancher/1600)

<!-- markdown-link-check-enable -->
<!-- EOF -->
