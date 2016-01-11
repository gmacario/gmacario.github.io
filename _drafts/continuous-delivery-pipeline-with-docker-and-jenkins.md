---
layout: post
title:  "Continuous Delivery Pipeline with Docker and Jenkins"
date:   2016-01-08 18:00:00 CET
categories: continuous delivery docker jenkins
---

[Video: Continuous Delivery Pipeline with Docker and Jenkins](https://www.youtube.com/watch?v=88ZWAv4jPh4) - Talk by Camilo Ribeiro on Docker Stockholm meetup group, 2015-11-25

Want to learn more?

* CDEasy: <https://github.com/camiloribeiro/cdeasy>
  - Jenkins running in Docker with examples

* Job DSL playground: <http://job-dsl.herokuapp.com/
  - Know your xml when you write the groovy scripts

* Job DSL reference: <https://jenkinsci.github.io/job-dsl-plugin/>
  - Nice documentation with current state of Job DSL

<!-- (2016-01-08 19:00 CET) -->

Trying CDeasy on itm-gmacario-w7

Start > Git Bash

```
$ mkdir ~/tmp && cd ~/tmp
$ git clone https://github.com/camiloribeiro/cdeasy.git
$ cd cdeasy
$ git remote add gmacario git@github.com:gmacario/cdeasy.git
$ git fetch --all --prune && git checkout TODO
$ ./setup.sh
```

When the script ends, browse <http://192.168.99.100:8080/>

The Jenkins dashboard should be displayed

Select item "seed" > Build Now

TODO

<!-- EOF -->
