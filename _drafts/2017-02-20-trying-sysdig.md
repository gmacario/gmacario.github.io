---
layout: post
title:  "Trying Sysdig"
date:   2017-02-20 18:00:00 CET
# categories: template android howto development
---

This blog post explains my experiences with [Sysdig](http://www.sysdig.org/).

Following instructions at <http://www.sysdig.org/install/>

Tested on ies-genbld01-ub16 (Ubuntu 16.04.2 LTS 64-bit)

```
sudo apt -y install linux-headers-$(uname -r)

docker pull sysdig/sysdig
```

Run sysdig inside a container

```
docker run -it --rm --name sysdig --privileged \
    -v /var/run/docker.sock:/host/var/run/docker.sock \
    -v /dev:/host/dev \
    -v /proc:/host/proc:ro \
    -v /boot:/host/boot:ro \
    -v /lib/modules:/host/lib/modules:ro \
    -v /usr:/host/usr:ro \
    sysdig/sysdig
```

Logged as root@container

```
csysdig
```

Video: <https://www.youtube.com/watch?v=UJ4wVrbP-Q8> (YouTube video, 3:05)

Video: <https://www.youtube.com/watch?v=-PyXXrf9V0E> (YouTube video, 1:02:03)

### See also

* <http://www.sysdig.org/>

<!-- EOF -->
