---
layout: post
title:  "Configuring gmacario/vagrant-atlassian"
date:   2015-05-18 12:40:00
categories: template android howto development
---
<-- markdown-link-check-disable -->
TODO: Merge contents into <https://github.com/gmacario/vagrant-atlassian/blob/master/docs/confluence_change_server_base_url.md>
See <http://www.mikeperham.com/2014/07/07/use-runit/>
See also: <http://smarden.org/runit/>
Log into the container
```
$ cd .../vagrant-atlassian
$ vagrant up --container=docker
$ vagrant ssh
```
Stop the "confluence" service
```
# sv stop confluence
```
FIXME: There are still zombie processes...
Workaround: inspect process tree
```
# ps axfv
```
and kill the following ones:
* `su -m confluence -c ./catalina.sh run`
* `/opt/atlassian/confluence/jre//bin/java -Djava.util.logging.config.file=xxx xxx`
```
# kill <pidxx> <pidxy>
```
Verify through another `ps axfw` that there are no more Confluence processes running.
Edit `/opt/atlassian/confluence/conf/server.xml` (as per <https://github.com/gmacario/vagrant-atlassian/blob/master/docs/confluence_change_server_base_url.md>)
```
# cd /opt/atlassian/confluence/conf
# cp server.xml server.xml.ORIG
# vi server.xml
```
Restart the "confluence" service
```
# sv start confluence
```
# OLD
This blog post explains how I installed [something](http://www.something.com/) on my laptop running MS Windows 7.
Sample table
< <http://www.tablesgenerator.com/markdown_tables> -->
| First | Last  | Role | Notes             |
|-------|-------|------|-------------------|
| John  | Doe   | CEO  | The big boss      |
| Mary  | Smith | CFO  | She got the money |
<-- markdown-link-check-enable-->
<-- EOF -->
