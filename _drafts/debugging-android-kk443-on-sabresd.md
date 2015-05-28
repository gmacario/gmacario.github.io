TODO

(2015-05-26 16:49)

SD-Card created with kk443 images built from sources on 2015-05-26, 10:06 CEST:

```
gmacario@mv-linux-powerhorse:~/easy-build/build-android-kk443-sabresd⟫ ls -la shared/myandroid/build_sabresd_6dq_android.log
-rw-rw-r-- 1 massimoviolante massimoviolante 71988 May 26 10:06 shared/myandroid/build_sabresd_6dq_android.log
gmacario@mv-linux-powerhorse:~/easy-build/build-android-kk443-sabresd⟫
```

Command used for writing the SD-Card

```
TODO
```

Booting SABRE SD from SD-Card inserted in slot SD3 (J507)

Start PuTTY: COM13:115200,8,n,1

PuTTY Reconfiguration: Logging All session output to file `E:\20150526-1654-android-sabresd.txt`.

Press "ENTER" when U-Boot starts to get the U-Boot prompt:

```
U-Boot 2014.04-08637-gaffa032 (May 24 2015 - 18:06:57)

CPU:   Freescale i.MX6Q rev1.2 at 792 MHz
CPU:   Temperature 38 C, calibration data: 0x5984fb7d
Reset cause: POR
Board: MX6-SabreSD
I2C:   ready
DRAM:  1 GiB
MMC:   FSL_SDHC: 0, FSL_SDHC: 1, FSL_SDHC: 2
*** Warning - bad CRC, using default environment

No panel detected: default to Hannstar-XGA
Display: Hannstar-XGA (1024x768)
In:    serial
Out:   serial
Err:   serial
Found PFUZE100 deviceid=10,revid=11
check_and_clean: reg 0, flag_set 0
Fastboot: Normal
flash target is MMC:1
Net:   FEC [PRIME]
Normal Boot
Hit any key to stop autoboot:  0
=>
```

Print U-Boot environment variables

```
=> printenv
baudrate=115200
bootcmd=booti mmc1
bootdelay=1
ethact=FEC
ethaddr=00:04:9f:02:b0:36
ethprime=FEC
fastboot_dev=mmc1
fdt_high=0xffffffff
initrd_high=0xffffffff
loadaddr=0x12000000
splashpos=m,m

Environment size: 215/8188 bytes
=>
```

Manually boot Android kk4.4.3:

```
=> boot
booti mmc1
kernel   @ 14008000 (6723128)
ramdisk  @ 15000000 (500534)
fdt      @ 14f00000 (50782)
kernel cmdline:
	use boot.img command line:
	console=ttymxc0,115200 init=/init video=mxcfb0:dev=ldb,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
switch to ldo_bypass mode!
   Using Device Tree in place at 14f00000, end 14f0f65d

Starting kernel ...
```

Save log as `E:\20150526-1709-android-sabresd.txt`.

Configure kernel cmdline using U-Boot `bootargs` environment variable

* TODO: Double check which FDT has been written to the SD-Card!!!
* TODO:
* TODO:
* FIXME: Replace kernel cmdline using U-Boot `bootargs` envvar
* FIXME: Change bootargs option: `video=mxcfb0:dev=ldb,bpp=32` ==> `video=mxcfb0:dev=hdmi,1920x1080M@60,bpp=32`

````
=> setenv bootargs console=ttymxc0,115200 init=/init video=mxcfb0:dev=hdmi,1920x1080M@60,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M androidboot.serialno=0d1e29d4d81917c9
=> saveenv
=> reset
```

Boot progress:

```
...
type=1404 audit(22222.750:3): enforcing=1 old_enforcing=0 auid=4294967295 ses=4294967295
init (1): /proc/1/oom_adj is deprecated, please use /proc/1/oom_score_adj instead.
init: /dev/hw_random not found
keychord: using input dev gpio-keys.27 for fevent
init: cannot open '/initlogo.rle'
Console: switching to colour dummy device 80x30
fs_mgr: Cannot mount filesystem on /dev/block/mmcblk3p5 at /system
init: fs_mgr_mount_all returned an error
init: /dev/hw_random not found
init: Unable to open persistent property directory /data/property errno: 2
```

It looks like `/system` is loaded from `/dev/block/mmcblk3p5`

Test

```
=> setenv bootargs console=ttymxc0,115200 root=/dev/null debug kdebug
=> boot
```

Unpack `boot-imx66q.img`

```
gmacario@kruk:~/easy-build/build-android-kk443-sabresd/tmp/myandroid-kk443-sabresd$ ../android_bootimg_tools/unpackbootimg -i boot-imx6q.img
BOARD_KERNEL_CMDLINE console=ttymxc0,115200 init=/init video=mxcfb0:dev=ldb,bpp=32 video=mxcfb1:off video=mxcfb2:off video=mxcfb3:off vmalloc=400M androidboot.console=ttymxc0 consoleblank=0 androidboot.hardware=freescale cma=384M
BOARD_KERNEL_BASE 14000000
BOARD_PAGE_SIZE 2048
Press any key to continue...

gmacario@kruk:~/easy-build/build-android-kk443-sabresd/tmp/myandroid-kk443-sabresd$
```

FIXME: In `{boot.img,recovery.img}/ramdisk/fstab.freescale`
Replace "/dev/block/mmcblk3p?" with "/dev/block/mmcblk1p?"

(NOTE: With Android 4.0.x this is hardcoded in `/init.freescale.rc`)


Mounted filesystems with Android 4.0.x on SABRE SD:

```
root@android:/ # mount
rootfs / rootfs ro,relatime 0 0
tmpfs /dev tmpfs rw,nosuid,relatime,mode=755 0 0
devpts /dev/pts devpts rw,relatime,mode=600 0 0
proc /proc proc rw,relatime 0 0
sysfs /sys sysfs rw,relatime 0 0
none /acct cgroup rw,relatime,cpuacct 0 0
tmpfs /mnt/asec tmpfs rw,relatime,mode=755,gid=1000 0 0
tmpfs /mnt/obb tmpfs rw,relatime,mode=755,gid=1000 0 0
tmpfs /mnt/shm tmpfs rw,relatime,size=1024k,mode=775,uid=1000,gid=1003 0 0
none /dev/cpuctl cgroup rw,relatime,cpu 0 0
/dev/block/mmcblk1p5 /system ext4 ro,relatime,user_xattr,barrier=1,data=ordered 0 0
/dev/block/mmcblk1p7 /data ext4 rw,nosuid,nodev,noatime,nodiratime,errors=panic,user_xattr,barrier=1,nomblk_io_submit,data=ordered,noauto_da_alloc,discard 0 0
/dev/block/mmcblk1p6 /cache ext4 rw,nosuid,nodev,relatime,user_xattr,barrier=1,data=ordered 0 0
/dev/block/mmcblk1p8 /device ext4 ro,nosuid,nodev,relatime,user_xattr,barrier=1,data=ordered 0 0
none /sys/kernel/debug debugfs rw,relatime 0 0
/dev/block/vold/179:28 /mnt/sdcard vfat rw,dirsync,nosuid,nodev,noexec,relatime,uid=1000,gid=1015,fmask=0702,dmask=0702,allow_utime=0020,codepage=cp437,iocharset=iso8859-1,shortname=mixed,utf8,errors=remount-ro 0 0
/dev/block/vold/179:28 /mnt/secure/asec vfat rw,dirsync,nosuid,nodev,noexec,relatime,uid=1000,gid=1015,fmask=0702,dmask=0702,allow_utime=0020,codepage=cp437,iocharset=iso8859-1,shortname=mixed,utf8,errors=remount-ro 0 0
tmpfs /mnt/sdcard/.android_secure tmpfs ro,relatime,size=0k,mode=000 0 0
root@android:/ #
```

With myandroid-kk3 SD-Card:

```
=> mmc list
FSL_SDHC: 0
 FSL_SDHC: 1
 FSL_SDHC: 2
=> mmc dev 1
mmc1 is current device
=> mmc part

Partition Map for MMC device 1  --   Partition Type: DOS

Part    Start Sector    Num Sectors     UUID            Type
  1     2048            16384           7710c2a1-01     83
  2     18432           16384           7710c2a1-02     83
  3     34816           2621440         7710c2a1-03     05 Extd
  4     2656256         28047360        7710c2a1-04     83
  5     36864           1048576         7710c2a1-05     83
  6     1087488         1048576         7710c2a1-06     83
  7     2138112         16384           7710c2a1-07     83
  8     2156544         8192            7710c2a1-08     83
=>
```

With stock Android 4.0.x

```
MX6Q SABRESD U-Boot > mmc list
FSL_USDHC: 0
FSL_USDHC: 1
FSL_USDHC: 2
FSL_USDHC: 3
MX6Q SABRESD U-Boot > mmc dev 2
mmc2 is current device
MX6Q SABRESD U-Boot > mmc part

Partition Map for UNKNOWN device 2  --   Partition Type: DOS

Partition     Start Sector     Num Sectors     Type
    1                16384           16384      83
    2                32768           16384      83
    3                49152         5881856       5 Extd
    4              5931008         9568256       b
    5                49153         1048575      83
    6              1097729          524287      83
    7              1622017         4194303      83
    8              5816321           16383      83
    9              5832705           16383      83
MX6Q SABRESD U-Boot >
```


Check U-Boot with stock Android 4.0.x

```
U-Boot 2009.08 (Apr 10 2013 - 18:58:57)

CPU: Freescale i.MX6 family TO1.2 at 792 MHz
Temperature:   28 C, calibration data 0x5984fb7d
mx6q pll1: 792MHz
mx6q pll2: 528MHz
mx6q pll3: 480MHz
mx6q pll8: 50MHz
ipg clock     : 66000000Hz
ipg per clock : 66000000Hz
uart clock    : 80000000Hz
cspi clock    : 60000000Hz
ahb clock     : 132000000Hz
axi clock   : 264000000Hz
emi_slow clock: 29333333Hz
ddr clock     : 528000000Hz
usdhc1 clock  : 198000000Hz
usdhc2 clock  : 198000000Hz
usdhc3 clock  : 198000000Hz
usdhc4 clock  : 198000000Hz
nfc clock     : 24000000Hz
Board: i.MX6Q-SABRESD: unknown-board Board: 0x63012 [POR ]
Boot Device: SD
I2C:   ready
DRAM:   1 GB
MMC:   FSL_USDHC: 0,FSL_USDHC: 1,FSL_USDHC: 2,FSL_USDHC: 3
In:    serial
Out:   serial
Err:   serial
Found PFUZE100! deviceid=10,revid=11
Net:   got MAC address from IIM: 00:04:9f:02:b0:36
FEC0 [PRIME]
Hit any key to stop autoboot:  0
MX6Q SABRESD U-Boot >
```


Check U-Boot with KK443:

```
U-Boot 2014.04-08637-gaffa032 (May 24 2015 - 18:06:57)

CPU:   Freescale i.MX6Q rev1.2 at 792 MHz
CPU:   Temperature 31 C, calibration data: 0x5984fb7d
Reset cause: POR
Board: MX6-SabreSD
I2C:   ready
DRAM:  1 GiB
MMC:   FSL_SDHC: 0, FSL_SDHC: 1, FSL_SDHC: 2
No panel detected: default to Hannstar-XGA
Display: Hannstar-XGA (1024x768)
In:    serial
Out:   serial
Err:   serial
Found PFUZE100 deviceid=10,revid=11
check_and_clean: reg 0, flag_set 0
Fastboot: Normal
flash target is MMC:1
Net:   FEC [PRIME]
Normal Boot
Hit any key to stop autoboot:  0
=>
```

<!-- EOF -->
