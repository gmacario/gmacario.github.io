# Tests

### Show U-Boot Log

Excerpt from serial console Log

### Show U-Boot version

```
U-Boot> version
```

### Show U-Boot environment variables

```
U-Boot> printenv
```

### Show Kernel Boot Log

TODO

### Show Kernel Version

```
# cat /proc/version
```

### Show Kernel Commandline

```
# cat /proc/cmdline
```

### Inspect disk usage

```
# df
```

### Show mounted filesystems

```
# mount
```

### Show running processes

```
# ps
```

# Test Results

## Android 4.0.2 (stock SD-Card)

### Show U-Boot Log

Excerpt from serial console Log

```
U-Boot 2009.08 (Apr 10 2013 - 18:58:57)

CPU: Freescale i.MX6 family TO1.2 at 792 MHz
Temperature:   34 C, calibration data 0x5984fb7d
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
kernel   @ 10808000 (4093632)
ramdisk  @ 11800000 (167741)
kernel cmdline:
        use uboot command line:
        console=ttymxc0,115200 androidboot.console=ttymxc0 vmalloc=400M init=/init video=mxcfb0:dev=hdmi,1920x1080M@60 video=mxcfb1:off video=mxcfb2:off fbmem=28M

Starting kernel ...
```

### Show U-Boot version

```
MX6Q SABRESD U-Boot > version

U-Boot 2009.08 (Apr 10 2013 - 18:58:57)
MX6Q SABRESD U-Boot >
```

### Show U-Boot environment variables

```
MX6Q SABRESD U-Boot > printenv
bootdelay=3
baudrate=115200
ipaddr=192.168.1.103
serverip=192.168.1.101
netmask=255.255.255.0
loadaddr=0x10800000
rd_loadaddr=0x11000000
netdev=eth0
ethprime=FEC0
fastboot_dev=mmc3
splashimage=0x30000000
splashpos=m,m
lvds_num=1
ethact=FEC0
bootcmd=booti mmc2
bootargs=console=ttymxc0,115200 androidboot.console=ttymxc0 vmalloc=400M init=/init video=mxcfb0:dev=hdmi,1920x1080M@60 video=mxcfb1:off video=mxcfb2:off fbmem=28M
stdin=serial
stdout=serial
stderr=serial

Environment size: 465/8188 bytes
MX6Q SABRESD U-Boot >
```

### Show Kernel Boot Log

TODO

### Show Kernel Version

```
root@android:/ # cat /proc/version
Linux version 3.0.35-05524-g8513494-dirty (enrique@enrique-desktop) (gcc version 4.4.3 (GCC) ) #1 SMP PREEMPT Wed Apr 10 18:32:18 CDT 2013
root@android:/ #
```

### Show Kernel Commandline

```
# cat /proc/cmdline
```

```
root@android:/ # cat /proc/cmdline
console=ttymxc0,115200 androidboot.console=ttymxc0 vmalloc=400M init=/init video=mxcfb0:dev=hdmi,1920x1080M@60 video=mxcfb1:off video=mxcfb2:off fbmem=28M
root@android:/ #
```

### Inspect disk usage

```
# df
```

```
root@android:/ # df
Filesystem             Size   Used   Free   Blksize
/dev                   393M    32K   393M   4096
/mnt/asec              393M     0K   393M   4096
/mnt/obb               393M     0K   393M   4096
/mnt/shm              1024K     4K  1020K   4096
/system                275M   163M   112M   4096
/data                    1G    40M     1G   4096
/cache                 247M     6M   241M   1024
/device                  7M     1M     6M   1024
/mnt/sdcard              4G     1M     4G   32768
/mnt/secure/asec         4G     1M     4G   32768
root@android:/ #
```

### Show mounted filesystems

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

### Show running processes

```
root@android:/ # ps
USER     PID   PPID  VSIZE  RSS     WCHAN    PC         NAME
root      1     0     352    216   c011101c 000086e8 S /init
root      2     0     0      0     c0095300 00000000 S kthreadd
root      3     2     0      0     c0080750 00000000 S ksoftirqd/0
root      4     2     0      0     c008f200 00000000 S kworker/0:0
root      5     2     0      0     c008f200 00000000 S kworker/u:0
root      6     2     0      0     c00b9d34 00000000 S migration/0
root      7     2     0      0     c00b9d34 00000000 S migration/1
root      9     2     0      0     c0080750 00000000 S ksoftirqd/1
root      10    2     0      0     c00b9d34 00000000 S migration/2
root      11    2     0      0     c008f200 00000000 S kworker/2:0
root      12    2     0      0     c0080750 00000000 S ksoftirqd/2
root      13    2     0      0     c00b9d34 00000000 S migration/3
root      14    2     0      0     c008f200 00000000 S kworker/3:0
root      15    2     0      0     c0080750 00000000 S ksoftirqd/3
root      16    2     0      0     c0090ce8 00000000 S cpuset
root      17    2     0      0     c0090ce8 00000000 S khelper
root      18    2     0      0     c008f200 00000000 S kworker/u:1
root      23    2     0      0     c0090ce8 00000000 S suspend
root      133   2     0      0     c0068974 00000000 S usb_wakeup thre
root      385   2     0      0     c00e158c 00000000 S sync_supers
root      387   2     0      0     c00e2114 00000000 S bdi-default
root      389   2     0      0     c0090ce8 00000000 S kblockd
root      403   2     0      0     c0090ce8 00000000 S imx6q-ecspi.0
root      413   2     0      0     c02fe7d4 00000000 S khubd
root      415   2     0      0     c0090ce8 00000000 S otg_switch
root      430   2     0      0     c00bae14 00000000 S irq/461-pfuze
root      463   2     0      0     c03c1abc 00000000 D ipu1_task
root      464   2     0      0     c03c1abc 00000000 D ipu1_task
root      465   2     0      0     c03c1abc 00000000 D ipu2_task
root      466   2     0      0     c03c1abc 00000000 D ipu2_task
root      493   2     0      0     c0090ce8 00000000 S rpciod
root      494   2     0      0     c008f200 00000000 S kworker/0:1
root      495   2     0      0     c008f200 00000000 S kworker/1:1
root      503   2     0      0     c0068974 00000000 S usb_wakeup thre
root      511   2     0      0     c00db950 00000000 S kswapd0
root      513   2     0      0     c0133f40 00000000 S fsnotify_mark
root      514   2     0      0     c0090ce8 00000000 S nfsiod
root      515   2     0      0     c0090ce8 00000000 S crypto
root      539   2     0      0     c0090ce8 00000000 S mxcfb0-vsync-pr
root      1092  2     0      0     c02906e0 00000000 S kapmd
root      1154  2     0      0     c008f200 00000000 S kworker/2:1
root      1171  2     0      0     c0090ce8 00000000 S f_mtp
root      1176  2     0      0     c032b028 00000000 S file-storage
root      1185  2     0      0     c00bae14 00000000 S irq/346-max1180
root      1221  2     0      0     c00bae14 00000000 S irq/312-MAX8903
root      1222  2     0      0     c00bae14 00000000 S irq/283-MAX8903
root      1223  2     0      0     c00bae14 00000000 S irq/386-MAX8903
root      1224  2     0      0     c00bae14 00000000 S irq/343-MAX8903
root      1241  2     0      0     c0399fa0 00000000 S kinteractiveup
root      1251  2     0      0     c0090ce8 00000000 S vpu_wq
root      1256  2     0      0     c0090ce8 00000000 S galcore workque
root      1257  2     0      0     c03cd6b0 00000000 S Vivante Kernel
root      1258  2     0      0     c009a860 00000000 S Vivante Kernel
root      1259  2     0      0     c009a860 00000000 S galcore daemon
root      1260  2     0      0     c009a860 00000000 S galcore daemon
root      1261  2     0      0     c009a860 00000000 S galcore daemon
root      1276  2     0      0     c0090ce8 00000000 S binder
root      1277  2     0      0     c008f200 00000000 S kworker/3:1
root      1310  2     0      0     c03a8268 00000000 S mmcqd/0
root      1311  2     0      0     c03a8268 00000000 S mmcqd/0boot0
root      1312  2     0      0     c03a8268 00000000 S mmcqd/0boot1
root      1346  2     0      0     c0551ecc 00000000 S krfcommd
root      1349  2     0      0     c03a8268 00000000 S mmcqd/1
root      1366  1     320    4     c011101c 000086e8 S /sbin/ueventd
root      2204  2     0      0     c01af3f8 00000000 S jbd2/mmcblk1p5-
root      2205  2     0      0     c0090ce8 00000000 S ext4-dio-unwrit
root      2206  2     0      0     c0122f14 00000000 S flush-179:24
root      2207  2     0      0     c01af3f8 00000000 S jbd2/mmcblk1p7-
root      2208  2     0      0     c0090ce8 00000000 S ext4-dio-unwrit
root      2209  2     0      0     c01af3f8 00000000 S jbd2/mmcblk1p6-
root      2210  2     0      0     c0090ce8 00000000 S ext4-dio-unwrit
root      2211  2     0      0     c01af3f8 00000000 S jbd2/mmcblk1p8-
root      2212  2     0      0     c0090ce8 00000000 S ext4-dio-unwrit
root      2213  1     776    416   c0048980 40037e74 S /system/bin/sh
system    2214  1     832    232   c03f3580 4001d690 S /system/bin/servicemanager
root      2215  1     4028   564   ffffffff 400f5c94 S /system/bin/vold
root      2216  1     6380   864   ffffffff 40135c94 S /system/bin/netd
root      2217  1     868    252   c011101c 4005b7b4 S /system/bin/dispd
root      2218  1     696    224   c0440120 400cef98 S /system/bin/debuggerd
system    2219  1     288004 10840 ffffffff 40074690 S /system/bin/surfaceflinger
root      2220  1     442292 35480 ffffffff 400e17b4 S zygote
drm       2221  1     7796   2532  ffffffff 400c8690 S /system/bin/drmserver
media     2222  1     31248  6836  ffffffff 40120690 S /system/bin/mediaserver
bluetooth 2223  1     1336   532   c011101c 40082438 S /system/bin/dbus-daemon
root      2224  1     844    252   c04e6fbc 400aa458 S /system/bin/installd
keystore  2225  1     1736   500   c0440120 40069f98 S /system/bin/keystore
root      2226  1     2416   620   ffffffff 4008ac94 S /system/bin/rild
system    2227  1     868    364   c011101c 400c7438 S /system/bin/magd
root      2230  1     7524   924   ffffffff 400a0c24 S /system/etc/gps/ingsvcd
system    2303  2220  738968 41628 ffffffff 400e1690 S system_server
dhcp      2358  1     920    272   c011101c 4004d438 S /system/bin/dhcpcd
root      2373  2     0      0     c008f200 00000000 S kworker/1:2
system    2409  2220  669036 73452 ffffffff 400e23c0 S com.android.systemui
app_12    2456  2220  452992 30572 ffffffff 400e23c0 S android.process.media
app_18    2474  2220  451296 31392 ffffffff 400e23c0 S com.android.inputmethod.latin
radio     2492  2220  465068 31688 ffffffff 400e23c0 S com.android.phone
app_19    2521  2220  669272 42592 ffffffff 400e23c0 S com.android.launcher
system    2535  2220  457260 28984 ffffffff 400e23c0 S com.android.settings
app_0     2571  2220  477004 46020 ffffffff 400e23c0 S android.process.acore
app_24    2587  2220  452676 28600 ffffffff 400e23c0 S com.android.music
root      2599  2     0      0     c008f200 00000000 S kworker/0:3
app_0     2630  2220  457120 32360 ffffffff 400e23c0 S com.android.contacts
app_6     2666  2220  452260 28708 ffffffff 400e23c0 S com.android.providers.calendar
app_11    2681  2220  452028 28424 ffffffff 400e23c0 S com.android.deskclock
app_13    2697  2220  460536 33512 ffffffff 400e23c0 S com.android.email
app_14    2712  2220  456468 28072 ffffffff 400e23c0 S com.android.exchange
system    2731  2220  451716 28680 ffffffff 400e23c0 S fsl.power.service
app_23    2757  2220  453200 28708 ffffffff 400e23c0 S com.android.mms
app_5     2786  2220  457128 28592 ffffffff 400e23c0 S com.android.calendar
app_25    2986  2220  449736 26360 ffffffff 400e23c0 S com.android.musicfx
root      3084  2     0      0     c008f200 00000000 S kworker/1:0
root      3086  2213  956    280   00000000 400d6458 R ps
root@android:/ #
```

## Overrding Android 4.4.3 bootargs (image TODO)

Power up, then press "ENTER" to get the U-Boot prompt

Type the following commands:

```
=> setenv fastboot_dev mmc1
=> setenv bootcmd booti mmc1
=> setenv bootargs console=ttymxc0,115200 androidboot.console=ttymxc0 vmalloc=400M init=/init video=mxcfb0:dev=hdmi,1920x1080M@60 video=mxcfb1:off video=mxcfb2:off fbmem=28M
=> printenv
=> saveenv
```

Result

```
=> printenv
baudrate=115200
bootargs=console=ttymxc0,115200 androidboot.console=ttymxc0 vmalloc=400M init=/init video=mxcfb0:dev=hdmi,1920x1080M@60 video=mxcfb1:off video=mxcfb2:off fbmem=28M
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

Environment size: 381/8188 bytes
=> saveenv
Saving Environment to MMC...
Writing to MMC(1)... done
=>
```

Now boot Android

```
=> boot
```

TODO: A string "A N D R O I D _" is shown on the HDMI display but then get

```
binder: 142:142 transaction failed 29189, size 0-0
```

TODO: Compare ALL the U-Boot environment variables...

TODO
