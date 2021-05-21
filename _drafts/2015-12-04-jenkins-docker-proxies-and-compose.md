---
layout: post
title:  "Trying Jenkins in Docker with Proxies and Compose"
date:   2015-12-04 18:00:00 CET
categories: howto docker jenkins compose nginx
---
<!-- markdown-link-check-disable -->

# Introduction

Here are some notes I took while getting my hands dirty with Jenkins, Docker, nginx and docker-compose.

Kudos to [Maxfield Stewart](https://disqus.com/by/maxfieldstewart/) (Engineering Manager @[Riot Games](http://riotgames.com/careers)) for his excellent post [Jenkins, Docker, Proxies, and Compose](http://engineering.riotgames.com/news/jenkins-docker-proxies-and-compose) from which I started to do what explained below.

I made my tests it on a Dell laptop with 4 GB running MS Windows 7 64-bit.

### Install Docker Toolbox

Download Docker Toolbox from <https://www.docker.com/docker-toolbox>

Select the version for your Host OS (I chose Windows)

As of 2015-12-04 I got file `DockerToolbox-1.9.1b.exe` (199 MB)


#### Launch Quickstart Terminal

Start > All Programs > Docker > Docker Quickstart Terminal

```
.                       ##         .
                  ## ## ##        ==
               ## ## ## ## ##    ===
           /"""""""""""""""""\___/ ===
      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
           \______ o           __/
             \    \         __/
              \____\_______/

docker is configured to use the default machine with IP 192.168.99.100
For help getting started, check out the docs at https://docs.docker.com

gmacario@ITM-GMACARIO-W7 MINGW64 ~
$
```

#### Checkout source code from GitHub

The supporting code explained inside Maxfield Stewart post is available at <https://github.com/maxfields2000/dockerjenkins_tutorial>

```
$ mkdir -p ~/test && cd ~/test
$ git clone https://github.com/maxfields2000/dockerjenkins_tutorial.git
$ cd dockerjenkins_tutorial
```


### Tutorial 1: Putting Jenkins inside a Docker container

The tutorial can be found here: <http://engineering.riotgames.com//news/putting-jenkins-docker-container>

```
$ cd ~/test/dockerjenkins_tutorial/tutorial_01
```

As the `make` tool was not available inside the Docker Toolbox, let us execute the commands from the shell instead

#### Pull the Jenkins image

```
$ docker pull jenkins
```

The first time the command is executed (or whenever a newer version of the container is published), this command will cause the Docker image to be pulled from [Docker Hub](https://hub.docker.com/).

If the command is successful you should get a similar message:

```
...
7ddeecde82ec: Pull complete
eb4159b3ff2f: Pull complete
Digest: sha256:e33a1565ecb5075f984cf48ba7f0aec321aa67115421012790cd797081dbe7ce
Status: Downloaded newer image for jenkins:latest

gmacario@ITM-GMACARIO-W7 MINGW64 ~/test/dockerjenkins_tutorial/tutorial_01 (mast
er)
$
```

Subsequent executions will be much faster as the Docker image will be already available in the local cache.

#### Run the container

```
$ docker run -p 8080:8080 \
  --name=jenkins-master -d \
  --env JAVA_OPTS="-Xmx8192m" \
  --env JENKINS_OPTS="--handlerCountStartup=100 --handlerCountMax=300" \
  jenkins
```

Now open your favourite web browser (i.e. Chrome) and point it to _http://yourdockermachineiphere:8080_

If you do not know the IP address of your Docker machine (it was displayed just after the Docker Quickstart Terminal was launched), type the following command:

```
$ docker-machine ip default
```

In our case, the returned IP address is `192.168.99.100`, so browse URL <http://192.168.99.100:8080>.

Your web browser should then display the Jenkins dashboard.

#### Stop the container

Remove the container from your Docker machine

```
$ docker stop jenkins-master
$ docker rm -v jenkins-master
```


### Tutorial 2: A Jenkins base image wrapper

While inside the Docker Quickstart Terminal, type the following

```
$ cd ~/test/dockerjenkins_tutorial/tutorial_02
```

Review the contents of the `Dockerfile`

TODO


### Tutorial 3

TODO


### Tutorial 4

TODO


### Tutorial 5

TODO


### Tutorial 6

TODO

# Links

Code


# TODO

Create a simple NGINX container

Follow-up to Maxfield Steward on Disqus

Hello,

Thanks for the excellent blog post!

I just discovered that Docker Toolbox 1.9.1b for Windows now includes docker-compose

Please see my blog post at TODO

# OLD STUFF BELOW

This blog post explains how I did [something](http://www.something.com/) on my laptop running MS Windows 7.

Sample table

<!-- TIP: <http://www.tablesgenerator.com/markdown_tables> -->

| First | Last  | Role | Notes             |
|-------|-------|------|-------------------|
| John  | Doe   | CEO  | The big boss      |
| Mary  | Smith | CFO  | She got the money |

<!-- markdown-link-check-enable -->
<!-- EOF -->
