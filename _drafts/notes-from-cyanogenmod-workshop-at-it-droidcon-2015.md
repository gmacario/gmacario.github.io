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

### Choose your device

Source the `envsetup.sh` script to setup build environment

    $ source build/envsetup.sh

You need to choose your device. CM 12 has 107 targets so far
See <https://github.com/CyanogenMod/hudson/blob/master/cm-build-targets>

* Samsung Galaxy SII (i9100) ==> Only cm11
* Emulated hardware (TBV whether they work with Lollypop, at least they worked with KitKat):
  - Goldfish
  - Standard x86 emulator
  - (???) MIPS emulator
* One working device for CM12 is hammerhead (Nexus 5)

You need to use the `breakfast` command.

The name of the command is a pun at the `lunch` command from AOSP, since
this is more efficient and avoids fetching unneccessary repositories as `lunch` did.

If you invoke the `breakfast` command without options you will get be requested which device to build for:

```
cmbuild@c8226ae3ff79:~/android/cm12$ breakfast
including vendor/cm/vendorsetup.sh

You're building on Linux

Breakfast menu... pick a combo:
 1. full-eng                             55. cm_m8-userdebug
 2. cm_a5-userdebug                      56. cm_mako-userdebug
 3. cm_acclaim-userdebug                 57. cm_manta-userdebug
 4. cm_amami-userdebug                   58. cm_maserati-userdebug
 5. cm_bacon-userdebug                   59. cm_mb886-userdebug
 6. cm_castor-userdebug                  60. cm_memul-userdebug
 7. cm_castor_windy-userdebug            61. cm_mint-userdebug
 8. cm_condor-userdebug                  62. cm_mondrianwifi-userdebug
 9. cm_d800-userdebug                    63. cm_n3-userdebug
 10. cm_d801-userdebug                   64. cm_n5110-userdebug
 11. cm_d802-userdebug                   65. cm_nicki-userdebug
 12. cm_d850-userdebug                   66. cm_obake-userdebug
 13. cm_d851-userdebug                   67. cm_peregrine-userdebug
 14. cm_d852-userdebug                   68. cm_picassowifi-userdebug
 15. cm_d855-userdebug                   69. cm_pollux-userdebug
 16. cm_deb-userdebug                    70. cm_pollux_windy-userdebug
 17. cm_dlx-userdebug                    71. cm_quark-userdebug
 18. cm_e970-userdebug                   72. cm_scorpion-userdebug
 19. cm_e975-userdebug                   73. cm_scorpion_windy-userdebug
 20. cm_e980-userdebug                   74. cm_serrano3gxx-userdebug
 21. cm_evita-userdebug                  75. cm_serranoltexx-userdebug
 22. cm_falcon-userdebug                 76. cm_shamu-userdebug
 23. cm_find5-userdebug                  77. cm_sirius-userdebug
 24. cm_find7-userdebug                  78. cm_spyder-userdebug
 25. cm_find7s-userdebug                 79. cm_superior-userdebug
 26. cm_flo-userdebug                    80. cm_t0lte-userdebug
 27. cm_flounder-userdebug               81. cm_t6-userdebug
 28. cm_ghost-userdebug                  82. cm_t6spr-userdebug
 29. cm_grouper-userdebug                83. cm_t6vzw-userdebug
 30. cm_hammerhead-userdebug             84. cm_taoshan-userdebug
 31. cm_hammerheadcaf-userdebug          85. cm_targa-userdebug
 32. cm_hlte-userdebug                   86. cm_tf300t-userdebug
 33. cm_hltespr-userdebug                87. cm_tilapia-userdebug
 34. cm_hltetmo-userdebug                88. cm_titan-userdebug
 35. cm_honami-userdebug                 89. cm_togari-userdebug
 36. cm_i605-userdebug                   90. cm_togari_gpe-userdebug
 37. cm_i925-userdebug                   91. cm_trltespr-userdebug
 38. cm_jactivelte-userdebug             92. cm_trltetmo-userdebug
 39. cm_jewel-userdebug                  93. cm_trlteusc-userdebug
 40. cm_jflteatt-userdebug               94. cm_trltexx-userdebug
 41. cm_jfltespr-userdebug               95. cm_tsubasa-userdebug
 42. cm_jfltetmo-userdebug               96. cm_umts_spyder-userdebug
 43. cm_jfltevzw-userdebug               97. cm_v500-userdebug
 44. cm_jfltexx-userdebug                98. cm_victara-userdebug
 45. cm_klimtwifi-userdebug              99. cm_ville-userdebug
 46. cm_klte-userdebug                   100. cm_vs985-userdebug
 47. cm_kltespr-userdebug                101. cm_xt897-userdebug
 48. cm_ks01lte-userdebug                102. cm_xt907-userdebug
 49. cm_l900-userdebug                   103. cm_xt925-userdebug
 50. cm_ls970-userdebug                  104. cm_xt925_jbbl-userdebug
 51. cm_ls980-userdebug                  105. cm_xt926-userdebug
 52. cm_m7-userdebug                     106. cm_z3-userdebug
 53. cm_m7spr-userdebug                  107. cm_z3c-userdebug
 54. cm_m7vzw-userdebug
... and don't forget the bacon!

Which would you like? [aosp_arm-eng]
```

Alternatively you may specify the combo directly as a parameter:

    $ breakfast hammerhead

This causes breakfast to call
[`roomservice.py`](https://github.com/CyanogenMod/android_build/blob/cm-12.0/tools/roomservice.py) to create `.repo/local_manifests/roomservice.xml`, then will fetch the additional repositories specific for your device.

Result:

```
...
Fetching projects:  50% (1/2)  From https://github.com/CyanogenMod/android_kernel_lge_hammerhead
 * [new branch]      cm-12.0    -> github/cm-12.0
Fetching projects: 100% (2/2), done.
Checking out files: 100% (41864/41864), done.

Looking for dependencies
Dependencies file not found, bailing out.
Looking for dependencies
Dependencies file not found, bailing out.
Done

============================================
PLATFORM_VERSION_CODENAME=REL
PLATFORM_VERSION=5.0.2
CM_VERSION=12-20150410-UNOFFICIAL-hammerhead
TARGET_PRODUCT=cm_hammerhead
TARGET_BUILD_VARIANT=userdebug
TARGET_BUILD_TYPE=release
TARGET_BUILD_APPS=
TARGET_ARCH=arm
TARGET_ARCH_VARIANT=armv7-a-neon
TARGET_CPU_VARIANT=krait
TARGET_2ND_ARCH=
TARGET_2ND_ARCH_VARIANT=
TARGET_2ND_CPU_VARIANT=
HOST_ARCH=x86_64
HOST_OS=linux
HOST_OS_EXTRA=Linux-3.13.0-46-generic-x86_64-with-Ubuntu-14.04-trusty
HOST_BUILD_TYPE=release
BUILD_ID=LRX22G
OUT_DIR=/home/cmbuild/android/cm12/out
============================================

cmbuild@c8226ae3ff79:~/android/cm12$
```

### Get the proprietary stuff

Look inside the device directory

    $ croot
    $ cd device/lge/hammerhead

`extract-files.sh` is a simple script to process the binary blob
copying the xxx - distribution becomes a little bit sketch.

Alternatively you may create a file under `.repo/local_manifests`
to fetch the proprietary stuff from your private repositories:

<!--
We obviously have a problem, guys are working on remote servers
in Amsterdam. So for purely educational purposes a separate organization

See <https://github.com/Themuppets>
Example: proprietary_vendor_htc

Another is <https://github.com/donkeycoyote>

<http://www.replicant.us> is trying to address the problem differently.
They are actually trying to recreate one by one the working binaries
from sources.
-->

### Invoke brunch

<!-- Start: 2015-04-11 00:02 CEST -->

    $ croot
    $ brunch hammerhead

Result:

```
cmbuild@c8226ae3ff79:~/android/cm12$ brunch hammerhead
including vendor/cm/vendorsetup.sh
Looking for dependencies

============================================
PLATFORM_VERSION_CODENAME=REL
PLATFORM_VERSION=5.0.2
CM_VERSION=12-20150410-UNOFFICIAL-hammerhead
TARGET_PRODUCT=cm_hammerhead
TARGET_BUILD_VARIANT=userdebug
TARGET_BUILD_TYPE=release
TARGET_BUILD_APPS=
TARGET_ARCH=arm
TARGET_ARCH_VARIANT=armv7-a-neon
TARGET_CPU_VARIANT=krait
TARGET_2ND_ARCH=
TARGET_2ND_ARCH_VARIANT=
TARGET_2ND_CPU_VARIANT=
HOST_ARCH=x86_64
HOST_OS=linux
HOST_OS_EXTRA=Linux-3.13.0-46-generic-x86_64-with-Ubuntu-14.04-trusty
HOST_BUILD_TYPE=release
BUILD_ID=LRX22G
OUT_DIR=/home/cmbuild/android/cm12/out
============================================

...
loaded device-specific extensions from /tmp/targetfiles-LWkAIq/META/releasetools.py
using prebuilt recovery.img from IMAGES...
using system.img from target-files
Total of 262144 4096-byte output blocks in 1531 input chunks.
Generating digraph...
Finding vertex sequence...
Removing backward edges...
  0/0 dependencies (0.00%) were violated; 0 source blocks removed.
Reticulating splines...
using prebuilt boot.img from IMAGES...
   boot size (8880128) is 38.49% of limit (23068672)
no bootloader.img in target_files; skipping install
no radio.img in target_files; skipping install
  running:  openssl pkcs8 -in build/target/product/security/testkey.pk8 -inform DER -nocrypt
  running:  java -Xmx2048m -jar /home/cmbuild/android/cm12/out/host/linux-x86/framework/signapk.jar -w build/target/product/security/testkey.x509.pem build/target/product/security/testkey.pk8 /tmp/tmp0iiLTP /home/cmbuild/android/cm12/out/target/product/hammerhead/cm_hammerhead-ota-6eade6066f.zip
done.
Package Complete: /home/cmbuild/android/cm12/out/target/product/hammerhead/cm-12-20150410-UNOFFICIAL-hammerhead.zip
cmbuild@c8226ae3ff79:~/android/cm12$
```

<!-- End: TODO -->

### Inspecting build results

Inspecting contents of output directory:

```
cmbuild@c8226ae3ff79:~/android/cm12$ ls -la out/target/product/hammerhead/
total 1069396
drwxrwxr-x 12 cmbuild cmbuild      4096 Apr 11 00:07 .
drwxrwxr-x  3 cmbuild cmbuild      4096 Apr 10 22:01 ..
-rw-rw-r--  1 cmbuild cmbuild        59 Apr 10 22:05 android-info.txt
-rw-r--r--  1 cmbuild cmbuild   8880128 Apr 10 23:36 boot.img
drwxrwxr-x  2 cmbuild cmbuild      4096 Apr 10 23:02 cache
-rw-r--r--  1 cmbuild cmbuild  13668740 Apr 10 23:02 cache.img
-rw-rw-r--  1 cmbuild cmbuild     58712 Apr 10 22:01 clean_steps.mk
-rw-rw-r--  2 cmbuild cmbuild 244214934 Apr 11 00:07 cm-12-20150410-UNOFFICIAL-hammerhead.zip
-rw-rw-r--  1 cmbuild cmbuild       132 Apr 11 00:07 cm-12-20150410-UNOFFICIAL-hammerhead.zip.md5sum
-rw-rw-r--  2 cmbuild cmbuild 244214934 Apr 11 00:07 cm_hammerhead-ota-6eade6066f.zip
drwxrwxr-x  3 cmbuild cmbuild      4096 Apr 10 23:41 data
drwxrwxr-x  2 cmbuild cmbuild      4096 Apr 10 22:56 fake_packages
drwxrwxr-x  4 cmbuild cmbuild      4096 Apr 10 22:04 gen
drwxrwxr-x  3 cmbuild cmbuild      4096 Apr 10 22:44 install
-rw-rw-r--  1 cmbuild cmbuild     78046 Apr 11 00:04 installed-files.txt
-rw-rw-r--  1 cmbuild cmbuild   8080672 Apr 10 22:56 kernel
drwxrwxr-x 20 cmbuild cmbuild      4096 Apr 11 00:04 obj
-rw-rw-r--  1 cmbuild cmbuild         5 Apr 11 00:06 ota_override_device
-rw-rw-r--  1 cmbuild cmbuild        49 Apr 11 00:06 ota_script_path
-rw-rw-r--  1 cmbuild cmbuild       836 Apr 10 22:01 previous_build_config.mk
-rw-rw-r--  1 cmbuild cmbuild   3471363 Apr 10 23:40 ramdisk-recovery.img
-rw-rw-r--  1 cmbuild cmbuild    796064 Apr 10 23:34 ramdisk.img
drwxrwxr-x  3 cmbuild cmbuild      4096 Apr 10 22:03 recovery
-rw-r--r--  1 cmbuild cmbuild  11556864 Apr 10 23:41 recovery.img
drwxrwxr-x  9 cmbuild cmbuild      4096 Apr 10 23:33 root
drwxrwxr-x  7 cmbuild cmbuild      4096 Apr 10 23:40 symbols
drwxrwxr-x 15 cmbuild cmbuild      4096 Apr 10 23:51 system
-rw-r--r--  1 cmbuild cmbuild 419157960 Apr 11 00:04 system.img
-rw-r--r--  1 cmbuild cmbuild 140786596 Apr 10 23:41 userdata.img
cmbuild@c8226ae3ff79:~/android/cm12$
```

Inspecting contents of `cm-12-20150410-UNOFFICIAL-hammerhead.zip`

```
cmbuild@c8226ae3ff79:~/android/cm12$ unzip -v out/target/product/hammerhead/cm-12-20150410-UNOFFICIAL-hammerhead.zip
Archive:  out/target/product/hammerhead/cm-12-20150410-UNOFFICIAL-hammerhead.zip
signed by SignApk
 Length   Method    Size  Cmpr    Date    Time   CRC-32   Name
--------  ------  ------- ---- ---------- ----- --------  ----
       0  Stored        0   0% 2008-02-29 02:33 00000000  system.patch.dat
     149  Defl:N      123  17% 2008-02-29 02:33 a3a91293  META-INF/com/android/metadata
  408960  Defl:N   265489  35% 2008-02-29 02:33 1de5a125  META-INF/com/google/android/update-binary
    1831  Defl:N      590  68% 2008-02-29 02:33 dee0683f  META-INF/com/google/android/updater-script
    2393  Defl:N      888  63% 2008-02-29 02:33 50280357  META-INF/org/cyanogenmod/releasekey
 8880128  Defl:N  7732336  13% 2008-02-29 02:33 d1fe8719  boot.img
   19329  Defl:N     4273  78% 2008-02-29 02:33 480587f1  file_contexts
     757  Defl:N      375  51% 2008-02-29 02:33 7353c0af  install/bin/backuptool.functions
    2187  Defl:N      806  63% 2008-02-29 02:33 99e63141  install/bin/backuptool.sh
     990  Defl:N      505  49% 2008-02-29 02:33 9ee1cdca  install/bin/otasigcheck.sh
420360192  Defl:N 236200233  44% 2008-02-29 02:33 cfe4e5d7  system.new.dat
     212  Defl:N      114  46% 2008-02-29 02:33 ecc0ae87  system.transfer.list
    4357  Defl:N     1747  60% 2008-02-29 02:33 9dc6e7b9  system/build.prop
    1675  Defl:N      943  44% 2008-02-29 02:33 c3fc0954  META-INF/com/android/otacert
    1148  Defl:N      605  47% 2008-02-29 02:33 bb9d55c1  META-INF/MANIFEST.MF
    1327  Defl:N      639  52% 2008-02-29 02:33 3d6de3c8  META-INF/CERT.SF
    1714  Defl:N     1154  33% 2008-02-29 02:33 6dfe7d7a  META-INF/CERT.RSA
--------          -------  ---                            -------
429687349         244210820  43%                            17 files
cmbuild@c8226ae3ff79:~/android/cm12$
```

Unfortunately I do not own a Nexus 5 where to try flashing the images, so I need to stop here.

One of the next days I will give a try building CM11 for my Samsung Galaxy SII.

<!-- EOF -->
