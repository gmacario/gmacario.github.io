---
layout: post
title:  "Transferring files to an embedded target without scp"
date:   2018-09-20 17:30:00
tags:   howto embedded file development
---
<!-- markdown-link-check-disable -->

If you have a tiny embedded system which does not include the `scp` tool, you may use the `nc` tool and achieve the same results.

The only prerequisite is that host and target are connected via IP networking.

Notice that nc is implemented as part of BusyBox, so there is a high chance that this tool is available inside your embedded target filesystem.

### Example: Copy a tarball from the host to the target

In this example, let us create a tarball with the `/etc` directory of the host and transfer it to the target:

```
root@target:~# ifconfig
root@target:~# nc -l -p 4000 >myfile.tar.gz
```

You may choose to listen to any available TCP port (I picked 4000 at random). You need to be root to listen to a privileged port (below 1024).

Assuming that the IP address of the target was 192.168.12.35, the following command executed on the host will create a tarball with the contents of the `/etc` directory and transfer it to the target:

```
user@host:~$ tar cvz /etc | nc 192.168.12.35 4000
```

You may verify the integrity of the transferred file with the following command

```
root@target:~# tar -xvzf myfile.tar.gz
```

Of course you may do many more things, just do `man nc` (on the host) to learn how!

<!-- markdown-link-check-enable -->
<!-- EOF -->
