---
title: "Searching for files inside Ubuntu packages"
pubDatetime: 2015-11-07T08:55:00+01:00
tags:
  - howto
  - linux
  - ubuntu
  - package
  - search
description: "Every once in a while I need to know which files were installed as part of a given package of a dpkg-based distro such as Debian, Ubuntu, etc."
---

<!-- markdown-link-check-disable -->

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

<!-- markdown-link-check-enable -->
<!-- EOF -->
