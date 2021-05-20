---
layout: post
title:  "Configuring remote access to Docker Engine"
date:   2016-01-14 18:00:00 CET
categories: howto docker engine remote access https
---
<!-- markdown-link-check-disable -->


TODO

* https://integratedcode.us/2015/07/29/using-tls-with-the-docker-engine/
* https://docs.docker.com/engine/articles/https/

Tested on dc7600-gm (Ubuntu 14.04.3 64-bit LTS)

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gm-personal/gmhome
$ docker-machine create --driver none --url https://dc7600-gm.solarma.it:2376 dc7600-gm
Running pre-create checks...
Creating machine...
To see how to connect Docker to this machine, run: C:\Program Files\Docker Toolbox\docker-machine.exe env dc7600-gm

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gm-personal/gmhome
$
```

Configuring environment variables

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gm-personal/gmhome
$ eval $(docker-machine env dc7600-gm)
Error checking TLS connection: Error checking and/or regenerating the certs: There was an error validating certificates for host "dc7600-gm.solarma.it:2376": open C:\Users\gmacario\.docker\machine\machines\dc7600-gm\server.pem: The system cannot find the file specified.
You can attempt to regenerate them using 'docker-machine regenerate-certs [name]'.
Be advised that this will trigger a Docker daemon restart which will stop running containers.


gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gm-personal/gmhome
$
```

Try regenerating certificates

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gm-personal/gmhome
$ docker-machine regenerate-certs dc7600-gm
Regenerate TLS machine certs?  Warning: this is irreversible. (y/n): y
Regenerating TLS certificates
Detecting the provisioner...
Error getting SSH command: Something went wrong running an SSH command!
command : cat /etc/os-release
err     : exit status 255
output  : usage: ssh [-1246AaCfGgKkMNnqsTtVvXxYy] [-b bind_address] [-c cipher_spec]
           [-D [bind_address:]port] [-E log_file] [-e escape_char]
           [-F configfile] [-I pkcs11] [-i identity_file]
           [-L address] [-l login_name] [-m mac_spec]
           [-O ctl_cmd] [-o option] [-p port]
           [-Q cipher | cipher-auth | mac | kex | key]
           [-R address] [-S ctl_path] [-W host:port]
           [-w local_tun[:remote_tun]] [user@]hostname [command]

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gm-personal/gmhome
$
```

### TRYING AGAIN (2016-01-14 15:33 CET)

```
$ docker-machine rm dc7600-gm
$ ping dc7600-gm.solarma.it
$ docker-machine --debug create --driver generic --generic-ip-address 192.168.64.70 --generic-ssh-user gmacario dc7600-gm
```

Result:

```
gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (master)
$ docker-machine --debug create --driver generic --generic-ip-address 192.168.64.70 --generic-ssh-user gmacario dc7600-gm
Docker Machine Version: 0.5.2 ( 0456b9f )
Found binary path at C:\Program Files\Docker Toolbox\docker-machine-driver-generic.exe
Launching plugin server for driver generic
Plugin server listening at address 127.0.0.1:56120
() Calling .GetVersion
Using API Version 1
() Calling .SetConfigRaw
() Calling .GetMachineName
(flag-lookup) Calling .GetCreateFlags
Making call to close connection to plugin binary
Making call to close driver server
(flag-lookup) Calling .Close
Successfully made call to close driver server
Found binary path at C:\Program Files\Docker Toolbox\docker-machine-driver-generic.exe
Launching plugin server for driver generic
Plugin server listening at address 127.0.0.1:56124
() Calling .GetVersion
Using API Version 1
() Calling .SetConfigRaw
() Calling .GetMachineName
(dc7600-gm) Calling .GetMachineName
(dc7600-gm) Calling .DriverName
(dc7600-gm) Calling .GetCreateFlags
(dc7600-gm) Calling .SetConfigFromFlags
Running pre-create checks...
(dc7600-gm) Calling .PreCreateCheck
(dc7600-gm) Calling .GetConfigRaw
Creating machine...
(dc7600-gm) Calling .Create
(dc7600-gm) Importing SSH key...
(dc7600-gm) Calling .GetConfigRaw
(dc7600-gm) DBG | IP: 192.168.64.70
(dc7600-gm) Calling .DriverName
Waiting for machine to be running, this may take a few minutes...
(dc7600-gm) Calling .GetState
Machine is running, waiting for SSH to be available...
Getting to WaitForSSH function...
(dc7600-gm) Calling .GetSSHHostname
(dc7600-gm) Calling .GetSSHPort
(dc7600-gm) Calling .GetSSHKeyPath
(dc7600-gm) Calling .GetSSHUsername
Using SSH client type: external
About to run SSH command:
exit 0
SSH cmd err, output: <nil>:
Detecting operating system of created instance...
Detecting the provisioner...
(dc7600-gm) Calling .GetSSHHostname
(dc7600-gm) Calling .GetSSHPort
(dc7600-gm) Calling .GetSSHKeyPath
(dc7600-gm) Calling .GetSSHUsername
Using SSH client type: external
About to run SSH command:
cat /etc/os-release
SSH cmd err, output: <nil>: NAME="Ubuntu"
VERSION="14.04.3 LTS, Trusty Tahr"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 14.04.3 LTS"
VERSION_ID="14.04"
HOME_URL="http://www.ubuntu.com/"
SUPPORT_URL="http://help.ubuntu.com/"
BUG_REPORT_URL="http://bugs.launchpad.net/ubuntu/"

found compatible host: ubuntu
Provisioning with ubuntu(upstart)...
(dc7600-gm) Calling .GetMachineName
(dc7600-gm) Calling .GetSSHHostname
(dc7600-gm) Calling .GetSSHPort
(dc7600-gm) Calling .GetSSHKeyPath
(dc7600-gm) Calling .GetSSHUsername
Using SSH client type: external
About to run SSH command:
sudo hostname dc7600-gm && echo "dc7600-gm" | sudo tee /etc/hostname
SSH cmd err, output: exit status 1: sudo: no tty present and no askpass program specified

Error creating machine: Error running provisioning: Something went wrong running an SSH command!
command : sudo hostname dc7600-gm && echo "dc7600-gm" | sudo tee /etc/hostname
err     : exit status 1
output  : sudo: no tty present and no askpass program specified



gmacario@ITM-GMACARIO-W7 MINGW64 ~/easy-jenkins (master)
$
```

### TRYING AGAIN (2016-01-14 20:45 CET)

See <http://askubuntu.com/questions/281742/sudo-no-tty-present-and-no-askpass-program-specified>

First of all login to the remote host

```
$ ssh gmacario@dc7600-gm.solarma.it
```

Logged as gmacario@dc7600.gm, edit `/etc/sudoers` so that user may sudo without password

```
$ cat <<__END__ | sudo tee -a /etc/sudoers
#
# User ${USER} may gain root privileges without password
${USER}  ALL=(ALL) NOPASSWD:ALL
__END__
```

On the client do the following:

```
$ docker-machine rm dc7600-gm
$ ping dc7600-gm.solarma.it
$ eval $(ssh-agent)
$ docker-machine --debug create --driver generic --generic-ip-address 192.168.64.70 --generic-ssh-user gmacario dc7600-gm
```

Result:

```
gmacario@ITM-GMACARIO-W7 ~
$ docker-machine --debug create --driver generic --generic-ip-address 192.168.64.70 --generic-ssh-user gmacario dc7600-gm
Docker Machine Version: 0.5.2 ( 0456b9f )
Found binary path at C:\Program Files\Docker Toolbox\docker-machine-driver-generic.exe
Launching plugin server for driver generic
Plugin server listening at address 127.0.0.1:52852
() Calling .GetVersion
Using API Version 1
() Calling .SetConfigRaw
() Calling .GetMachineName
(flag-lookup) Calling .GetCreateFlags
Making call to close connection to plugin binary
Making call to close driver server
(flag-lookup) Calling .Close
Successfully made call to close driver server
Found binary path at C:\Program Files\Docker Toolbox\docker-machine-driver-generic.exe
Launching plugin server for driver generic
Plugin server listening at address 127.0.0.1:52856
() Calling .GetVersion
Using API Version 1
() Calling .SetConfigRaw
() Calling .GetMachineName
(dc7600-gm) Calling .GetMachineName
(dc7600-gm) Calling .DriverName
(dc7600-gm) Calling .GetCreateFlags
(dc7600-gm) Calling .SetConfigFromFlags
Running pre-create checks...
(dc7600-gm) Calling .PreCreateCheck
(dc7600-gm) Calling .GetConfigRaw
Creating machine...
(dc7600-gm) Calling .Create
(dc7600-gm) Importing SSH key...
(dc7600-gm) Calling .GetConfigRaw
(dc7600-gm) DBG | IP: 192.168.64.70
(dc7600-gm) Calling .DriverName
Waiting for machine to be running, this may take a few minutes...
(dc7600-gm) Calling .GetState
Machine is running, waiting for SSH to be available...
Getting to WaitForSSH function...
(dc7600-gm) Calling .GetSSHHostname
(dc7600-gm) Calling .GetSSHPort
(dc7600-gm) Calling .GetSSHKeyPath
(dc7600-gm) Calling .GetSSHUsername
Using SSH client type: external
About to run SSH command:
exit 0
SSH cmd err, output: <nil>:
Detecting operating system of created instance...
Detecting the provisioner...
(dc7600-gm) Calling .GetSSHHostname
(dc7600-gm) Calling .GetSSHPort
(dc7600-gm) Calling .GetSSHKeyPath
(dc7600-gm) Calling .GetSSHUsername
Using SSH client type: external
About to run SSH command:
cat /etc/os-release
SSH cmd err, output: <nil>: NAME="Ubuntu"
VERSION="14.04.3 LTS, Trusty Tahr"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 14.04.3 LTS"
VERSION_ID="14.04"
HOME_URL="http://www.ubuntu.com/"
SUPPORT_URL="http://help.ubuntu.com/"
BUG_REPORT_URL="http://bugs.launchpad.net/ubuntu/"

found compatible host: ubuntu
Provisioning with ubuntu(upstart)...
(dc7600-gm) Calling .GetMachineName
(dc7600-gm) Calling .GetSSHHostname
(dc7600-gm) Calling .GetSSHPort
(dc7600-gm) Calling .GetSSHKeyPath
(dc7600-gm) Calling .GetSSHUsername
Using SSH client type: external
About to run SSH command:
sudo hostname dc7600-gm && echo "dc7600-gm" | sudo tee /etc/hostname
SSH cmd err, output: <nil>: dc7600-gm

(dc7600-gm) Calling .GetSSHHostname
(dc7600-gm) Calling .GetSSHPort
(dc7600-gm) Calling .GetSSHKeyPath
(dc7600-gm) Calling .GetSSHUsername
Using SSH client type: external
About to run SSH command:
if grep -xq 127.0.1.1.* /etc/hosts; then sudo sed -i 's/^127.0.1.1.*/127.0.1.1 dc7600-gm/g' /etc/hosts; else echo '127.0.1.1 dc7600-gm' | sudo tee -a /etc/hosts; fi
SSH cmd err, output: <nil>:
(dc7600-gm) Calling .GetSSHHostname
(dc7600-gm) Calling .GetSSHPort
(dc7600-gm) Calling .GetSSHKeyPath
(dc7600-gm) Calling .GetSSHUsername
Using SSH client type: external
About to run SSH command:
sudo apt-get update
...
unix  3      [ ]         STREAM     CONNECTED     10386

Checking connection to Docker...
(dc7600-gm) Calling .GetState
(dc7600-gm) Calling .GetURL
Reading CA certificate from C:\Users\gmacario\.docker\machine\certs\ca.pem
Reading server certificate from C:\Users\gmacario\.docker\machine\machines\dc7600-gm\server.pem
Reading server key from C:\Users\gmacario\.docker\machine\machines\dc7600-gm\server-key.pem
Docker is up and running!
Reticulating splines...
(dc7600-gm) Calling .GetConfigRaw
To see how to connect Docker to this machine, run: C:\Program Files\Docker Toolbox\docker-machine.exe env dc7600-gm

gmacario@ITM-GMACARIO-W7 ~
$
```

Test:

```
gmacario@ITM-GMACARIO-W7 ~
$ eval $(docker-machine env dc7600-gm)

gmacario@ITM-GMACARIO-W7 ~
$ docker images
REPOSITORY                          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
jenkins                             latest              eb4159b3ff2f        7 weeks ago         707.8 MB
<none>                              <none>              ee572ce7ce25        7 weeks ago         707.8 MB
irssi                               latest              896a72720572        9 weeks ago         261.1 MB
jess/gparted                        latest              c4a9aa3f5c92        9 weeks ago         212.5 MB
gmacario/build-yocto-fsl-arm-udoo   latest              c6ad85f90179        10 weeks ago        1.359 GB
<none>                              <none>              8f8743d6b660        11 weeks ago        882.7 MB
hello-world                         latest              0a6ba66e537a        3 months ago        960 B
dockerui/dockerui                   latest              08f0ca042adc        4 months ago        5.422 MB
gmacario/build-openwrt              latest              0287c5597848        11 months ago       747.9 MB
gmacario/easy-build                 latest              c554eb7ed770        12 months ago       386.3 MB
ubuntu                              latest              8eaa4ff06b53        12 months ago       188.3 MB

gmacario@ITM-GMACARIO-W7 ~
$
```


<!-- markdown-link-check-enable -->
<!-- EOF -->
