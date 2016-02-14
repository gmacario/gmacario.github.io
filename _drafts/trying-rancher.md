---
layout: post
title:  "Trying Rancher on dc7600-gm"
date:   2016-02-13 15:00:00 CET
categories: howo docker rancher container linux ubuntu
---

<!-- (2016-02-11 20:10 CET) -->

TODO: Follow <http://rancher.com/getting-started/>

### 1. Prepare a Linux Host

Login as gmacario@dc7600-gm

```
$ docker version
```

### 2. Start Rancher Server

```
$ docker pull rancher/server
$ docker run -d --restart=always -p 8080:8080 rancher/server
# Tail the logs to show Rancher
$ sudo docker logs -f <containerid>
```

### 3. Add Hosts

TODO


TODO

<!-- EOF -->
