---
layout: post
title:  "Reconfiguring the UDOO Neo kernel with Yocto"
date:   2015-11-26 18:00:00 CET
categories: howto yocto linux kernel udoo udooneo
---

TODO TODO TODO

### References

* [Patch: Configure Renesas kernel for containers support](https://gerrit.automotivelinux.org/gerrit/#/c/4389/1/meta-rcar-gen2/recipes-kernel/linux/linux.inc)

* [Code Review / AGL/meta-renesas.git / meta-rcar-gen2/recipes-kernel/linux/](https://gerrit.automotivelinux.org/gerrit/gitweb?p=AGL/meta-renesas.git;a=tree;f=meta-rcar-gen2/recipes-kernel/linux;hb=616068396063ee1802799905b527a6464f0adf93)
  * [Code Review / AGL/meta-renesas.git / meta-rcar-gen2/recipes-kernel/linux/ linux.inc](https://gerrit.automotivelinux.org/gerrit/gitweb?p=AGL/meta-renesas.git;a=blob;f=meta-rcar-gen2/recipes-kernel/linux/linux.inc;h=aedf3005db7260b6e62278d5871a4fe4626758e9;hb=616068396063ee1802799905b527a6464f0adf93)

From `recipes-kernel/linux/linux-renesas_3.10.bb`:

```
 1 require linux.inc
...
72 S = "${WORKDIR}/git"
73
74 KERNEL_DEFCONFIG = "shmobile_defconfig"
75
76 do_configure_prepend() {
77         install -m 0644 ${S}/arch/${ARCH}/configs/${KERNEL_DEFCONFIG} ${WORKDIR}/defconfig || die "No default configuration for ${MACHINE} / ${KERNEL_DEFCONFIG} available."
78 }
```

From `recipes-kernel/linux/linux.inc`:

```
37 do_configure_prepend() {
38         # Clean .config
39         echo "" > ${S}/.config
40         CONF_SED_SCRIPT=""
...
81         # Newer inits like systemd need cgroup support
82         if [ "${KERNEL_ENABLE_CGROUPS}" = "1" ] ; then
83                 kernel_configure_variable CGROUP_SCHED y
84                 kernel_configure_variable CGROUPS y
85                 kernel_configure_variable CGROUP_NS y
86                 kernel_configure_variable CGROUP_FREEZER y
87                 kernel_configure_variable CGROUP_DEVICE y
88                 kernel_configure_variable CPUSETS y
89                 kernel_configure_variable PROC_PID_CPUSET y
90                 kernel_configure_variable CGROUP_CPUACCT y
91                 kernel_configure_variable RESOURCE_COUNTERS y
92         fi
...
124
125         # Keep this the last line
126         # Remove all modified configs and add the rest to .config
127         sed -e "${CONF_SED_SCRIPT}" < '${WORKDIR}/defconfig' >> '${S}/.config'
128
129         yes '' | oe_runmake oldconfig
130 }
```


* [Building Linux Kernel](https://community.freescale.com/docs/DOC-100847)
  * [Task #5 - Kernel](https://community.freescale.com/docs/DOC-95045)

TODO

<!-- EOF -->
