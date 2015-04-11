# Notes from CyanogenMod Workshop at IT Droidcon 2015

Here are a few notes which I took when attending the
[Cyanogen Workshop](http://it.droidcon.com/2015/sessions/cyanogen-workshop/)
during the [IT Droidcon 2015](http://it.droidcon.com/2015/) which took place in Torino on 2015-04-10.

The workshop was led by [Abhisek Devkota](https://twitter.com/ciwrl), Senior Engineering and Community Manager at Cyanogen Inc., who was extremely good in driving the workshop forward and answered a lot of questions from the audience.

### Preparing the development environment

Due to some issues in the VPS that was provided to the participants
I used one machine which I had available - that had the additional benefit
to make sure I could reproduce all the steps - including provisioning the build environment!

I had a Ubuntu 14.04 64-bit server available via SSH with Docker installed.

After logging in to the server, I cloned the "docker-cyanogenmod" project

    $ git clone https://github.com/gmacario/docker-cyanogenmod.git -b test-droidcon

Note: the "test-droidcon" branch on my fork is used in order to install
exactly the packages which Abhisek had installed in his VPS instances.

Then run the following commands to create a Docker container with all the needed software automagically installed:

    $ cd docker-cyanogenmod
    $ ./run.sh

The first time it will take a few minutes to create the Docker image
and start the container, but subsequent runs will be much faster!

As a result I eventually got a shell inside the container:

```
cmbuild@c8226ae3ff79:~/android$ ls -la
total 8
drwxrwxr-x 2 cmbuild cmbuild 4096 Apr 10 16:53 .
drwxr-xr-x 7 cmbuild cmbuild 4096 Apr 10 17:10 ..
cmbuild@c8226ae3ff79:~/android$ free
             total       used       free     shared    buffers     cached
Mem:      16433600   15763396     670204      13960     966884   12194076
-/+ buffers/cache:    2602436   13831164
Swap:     16775164      78012   16697152
cmbuild@c8226ae3ff79:~/android$ df -h
Filesystem                                              Size  Used Avail Use% Mounted on
rootfs                                                  119G   81G   33G  72% /
none                                                    119G   81G   33G  72% /
shm                                                      64M     0   64M   0% /dev/shm
/dev/disk/by-uuid/b5696056-ded4-483a-be75-d0ac8afac2cb  119G   81G   33G  72% /etc/hosts
/dev/sda1                                               1.8T  922G  820G  53% /srv/ccache
cmbuild@c8226ae3ff79:~/android$
```

Wow, plenty of resources to use! Let's move on...

### Installing Repo

Logged as cmbuild@container:

    $ mkdir -p ~/bin
    $ curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
    $ chmod a+x ~/bin/repo

### Installing the Android SDK

Download the latest version of the Android SDK for Linux (24.1.2 as of 2015-04-10)

    $ mkdir -p ~/sdk
    $ cd ~/sdk
    $ curl -O http://dl.google.com/android/android-sdk_r24.1.2-linux.tgz

If the previous fails for whatever reasons (i.e. you are in a location which blocks access to Google)

    $ curl -O https://dl.dropboxusercontent.com/u/2834459/android-sdk_r24.1.2-linux.tgz

After extracting the file your may remove the install tarball to save space:

    $ tar zxvf android-sdk_r24.1.2-linux.tgz
    $ rm android-sdk_r24.1.2-linux.tgz

Update `~/.bashrc` with the following definitions:

```
$ cat <<END >>~/.bashrc
export ANDROID_HOME="\$HOME/sdk/android-sdk-linux"
export PATH="\$ANDROID_HOME/tools:\$ANDROID_HOME/platform-tools:\$PATH"
END
```

Then logout from the container and launch `./run.sh` again to make sure
the environment variables are set correctly.

### Using the Android SDK

You should have the `android` command in PATH, therefore you may do the following:

Get help

    $ android --help

List remote SDK repository

    $ android list sdk

Update the SDK specified

    $ android update sdk --no-ui --filter 1,2,5

You must read and accept the license by typing "y", then the download will start.


### Git config and repo init

```
$ git config --global user.email "email@example.com"
$ git config --global user.name "First Lastname"
$ git config --global color.ui auto
```

Init repo

In our example we want to configure for CyanogenMod 12.0

```
$ mkdir -p ~/android/cm12/
$ cd ~/android/cm12/
$ repo init -u https://github.com/CyanogenMod/android.git -b cm-12.0
```

You may also repo init AOSP https://android.googlesource.com/...

There is a GitHub mirror (not always up-to-date) of AOSP at
<https://github.com/android>

### Syncing the source code

<!-- Start: 2015-04-10 20:53 CEST -->

    $ repo sync –j16

(and a lot of waiting)

<!-- End: 2015-04-10 22:45 CEST -->

Result:

```
cmbuild@c8226ae3ff79:~/android/cm12$ ls -la
total 116
drwxrwxr-x  28 cmbuild cmbuild 4096 Apr 10 20:41 .
drwxrwxr-x   3 cmbuild cmbuild 4096 Apr 10 18:48 ..
drwxrwxr-x   7 cmbuild cmbuild 4096 Apr 10 20:29 .repo
-r--r--r--   1 cmbuild cmbuild   87 Apr 10 20:29 Makefile
drwxrwxr-x   3 cmbuild cmbuild 4096 Apr 10 20:29 abi
drwxrwxr-x   3 cmbuild cmbuild 4096 Apr 10 20:29 android
drwxrwxr-x  14 cmbuild cmbuild 4096 Apr 10 20:29 art
drwxrwxr-x  10 cmbuild cmbuild 4096 Apr 10 20:29 bionic
drwxrwxr-x   3 cmbuild cmbuild 4096 Apr 10 20:29 bootable
drwxrwxr-x   7 cmbuild cmbuild 4096 Apr 10 20:29 build
drwxrwxr-x  12 cmbuild cmbuild 4096 Apr 10 20:29 cts
drwxrwxr-x  13 cmbuild cmbuild 4096 Apr 10 20:29 dalvik
drwxrwxr-x   6 cmbuild cmbuild 4096 Apr 10 20:29 developers
drwxrwxr-x  20 cmbuild cmbuild 4096 Apr 10 20:29 development
drwxrwxr-x   7 cmbuild cmbuild 4096 Apr 10 20:29 device
drwxrwxr-x   3 cmbuild cmbuild 4096 Apr 10 20:29 docs
drwxrwxr-x 237 cmbuild cmbuild 4096 Apr 10 20:33 external
drwxrwxr-x  18 cmbuild cmbuild 4096 Apr 10 20:34 frameworks
drwxrwxr-x  15 cmbuild cmbuild 4096 Apr 10 20:34 hardware
drwxrwxr-x  16 cmbuild cmbuild 4096 Apr 10 20:34 libcore
drwxrwxr-x   5 cmbuild cmbuild 4096 Apr 10 20:34 libnativehelper
drwxrwxr-x   8 cmbuild cmbuild 4096 Apr 10 20:35 ndk
drwxrwxr-x   9 cmbuild cmbuild 4096 Apr 10 20:36 packages
drwxrwxr-x   6 cmbuild cmbuild 4096 Apr 10 20:36 pdk
drwxrwxr-x  16 cmbuild cmbuild 4096 Apr 10 20:40 prebuilts
drwxrwxr-x  27 cmbuild cmbuild 4096 Apr 10 20:40 sdk
drwxrwxr-x  10 cmbuild cmbuild 4096 Apr 10 20:40 system
drwxrwxr-x   3 cmbuild cmbuild 4096 Apr 10 20:40 tools
drwxrwxr-x   4 cmbuild cmbuild 4096 Apr 10 20:41 vendor
cmbuild@c8226ae3ff79:~/android/cm12$
```

Disk usage:

```
cmbuild@c8226ae3ff79:~/android/cm12$ du -sh
29G     .
cmbuild@c8226ae3ff79:~/android/cm12$
```

<!-- EOF -->
