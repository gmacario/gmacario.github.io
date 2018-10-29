---
layout: post
title:  "Searching for files inside Ubuntu packages"
date:   2015-11-07 08:55 CET
tags:   howto linux ubuntu package search
---

Every once in a while I need to know which files were installed as part of a given package of a dpkg-based distro such as Debian, Ubuntu, etc.

Here is how:

```
$ dpkg-query --listfiles <package-name>
```

Example:

```
gmacario@dc7600-gm:~$ dpkg-query --listfiles lxc-docker
/.
/usr
/usr/share
/usr/share/doc
/usr/share/doc/lxc-docker
/usr/share/doc/lxc-docker/changelog.Debian.gz
gmacario@dc7600-gm:~$
```

or the other way round, i.e. finding out which Ubuntu package has installed some file in my filesystem.

```
$ dpkg-query --search <filename>
```

Example 1:

```
gmacario@dc7600-gm:~$ dpkg-query --search /bin/ls
coreutils: /bin/ls
gmacario@dc7600-gm:~$
```

Reference: `man dpkg-query`

<!-- EOF -->
