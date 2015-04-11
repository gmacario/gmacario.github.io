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

<!-- EOF -->
