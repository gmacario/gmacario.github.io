---
title: "Upgrading a 2008 workstation from Proxmox VE 8 to 9, with no remote console"
pubDatetime: 2026-11-15T00:00:00+01:00
tags:
  - proxmox
  - homelab
  - debian
  - solar
  - claude-code
description: "How I took gmpowerhorse, the single Proxmox node that runs the monitoring of a small photovoltaic plant, from Proxmox VE 8 to 9.2: why it had to happen, the one thing that could leave it stranded, and the few surprises along the way."
---

`gmpowerhorse` is an HP xw8600 workstation from 2008, with 8 GB of DDR2 RAM and
a single 500 GB SATA disk. It sits at the site of a small photovoltaic plant
and is the only node of a tiny Proxmox VE datacenter. Its three LXC containers
run Home Assistant (for monitoring the PV plant), an n8n instance for
automation, and a small utility container.

It was installed with Proxmox VE 8.1 in early 2024 and had stayed on the 8.x
line since. Today it runs **Proxmox VE 9.2.27** on Debian 13 "Trixie". Here is
how it got there.

## Why upgrade at all

Proxmox VE 8 reached end-of-life on **2026-08-31**, according to
[endoflife.date](https://endoflife.date/proxmox-ve). After that date there are
no more security fixes for the 8.x line, and a box that sits on the internet
behind consumer routers is not something I want to leave unpatched. The
decision was made on the day of the EOL. The upgrade itself took a while
longer, for one reason.

## The real risk: no remote console

The machine has **no IPMI, no iKVM, nothing out-of-band**. I reach it over
Tailscale, and Tailscale only works if the network comes up after a reboot.
So every "the box didn't come back" scenario means someone has to go to the site.

The scenario that worried me most was a **NIC rename**. A new kernel can give
network interfaces different predictable names (`enp15s0` becoming something
else). The Linux bridge `vmbr0` that carries the host's address and the
containers' traffic would then point at an interface that no longer exists.
The host would boot fine, with no network at all.

The
[official upgrade guide](https://pve.proxmox.com/wiki/Upgrade_from_8_to_9)
suggests pinning interface names before upgrading. Its
`pve-network-interface-pinning` tool is not packaged on 8.4, so I pinned the
names by MAC address with two systemd `.link` files:

```ini
# /etc/systemd/network/10-nic0.link
[Match]
MACAddress=00:00:5e:00:53:a0
Type=ether

[Link]
Name=nic0
```

The MAC address above is a documentation example, not the real one. I then
pointed `/etc/network/interfaces` at `nic0`/`nic1` and rebuilt the
initramfs. A copy of the original `interfaces` file was kept as a rollback.

The catch is that pinning only proves itself at the next reboot, and I staged
it in early October, remotely. From then until today the host carried a latent
risk: an unplanned reboot (a power cut, a kernel panic) would apply the rename
and a new kernel at once, with nobody on site. That alone was a good reason not
to let the visit slip much longer.

## Groundwork, done remotely

Everything that did not need someone on site was done remotely, over the following weeks:

1. Bring 8.1 up to the latest **8.4** (`apt dist-upgrade`, then a reboot that
   happened to be safe).
2. Back up the three containers with `vzdump` and copy the archives off-host.
   Over a slow uplink this took about two days for roughly 12 GB, which is a
   good argument for also carrying a USB copy on site.
3. Run the built-in checker `pve8to9 --full` and work through its findings:
   remove a stray `systemd-boot` package (the box boots in legacy BIOS mode),
   check that nothing relies on `/tmp` surviving a reboot (Trixie turns it into
   a `tmpfs`), confirm there is enough free space.
4. Stage the NIC pinning described above.

All of this went into a plan file in my infrastructure repository. As with
every device I prepare, the plan turns into the install log as I go: each
checkbox gets ticked and the real command output pasted under it.

## On site, morning: reboot #1, still on 8.4

The first on-site step was the riskiest one, and the least exciting to watch:
apply the last pending 8.4 updates, disable LVM autoactivation for the guest
volumes (it is the PVE 9 default, and `pve8to9` suggests it), and reboot,
**still on Proxmox VE 8.4**.

Doing this reboot separately meant that, if the network did not come back, I
would be debugging only the NIC pinning on a known system, and not a NIC rename
on top of a half-upgraded distribution. It came back cleanly: `nic0` up,
`vmbr0` with its usual address, Tailscale connected, the three containers
running.

Then I pointed APT at Trixie. Rather than `sed`-ing `bookworm` into `trixie`, I
rewrote `/etc/apt/sources.list`. It had a duplicate mirror and an old-style
security line, and I added `non-free-firmware` while I was at it. The Proxmox
repository went into the new deb822 format:

```text
Types: deb
URIs: http://download.proxmox.com/debian/pve
Suites: trixie
Components: pve-no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
```

The Ceph repository went away entirely, because nothing on this host uses Ceph.
`apt update` then reported 603 packages to upgrade.

## Afternoon: the upgrade and reboot #2

With the containers shut down, `apt dist-upgrade` ran from 17:40 to 19:21, so
**about 1 hour and 40 minutes**. That is well above the wiki's estimate, but
not surprising on 2008 hardware.

Two surprises turned up before the reboot.

- **`intel-microcode` became a hard failure.** On 8.4, `pve8to9` only *warned*
  that the CPU microcode package was missing. Run again after the upgrade, the
  same check reported **FAIL**. Since `non-free-firmware` was already in the
  sources, `apt install intel-microcode` fixed it.
- **`chrony` died mid-upgrade** with
  `Fatal error : Could not send notification to $NOTIFY_SOCKET`, leaving the
  host without time synchronisation. It happened while the old systemd was
  still PID 1 and the new chrony was already installed. I left it for the
  reboot, and it came back by itself.

Then reboot #2. The new
`7.0.14-29-pve` kernel booted, the pinned `nic0` came up, `vmbr0` got its
address, Tailscale reconnected, and the three containers started on their own.
The web UI greeted me with "Virtual Environment 9.2.27". Home Assistant and n8n
answered as if nothing had happened.

`journalctl -b -p err` did print a handful of errors, but none of them matter:
ACPI table bugs in a BIOS from 2008 that newer kernels now report, an HP BIOS
configuration driver that doesn't support this machine, `nouveau` complaining
about the unused graphics card, and a one-off lock clash while `pve-firewall`
was starting.

## Lessons

- **Pin NIC names, then reboot once on the old version.** It turns the riskiest
  part of the upgrade into a separate, reversible step on a known system.
- **Re-run `pve8to9` after `dist-upgrade` and before rebooting.** Some of its
  checks only run, or only become failures, once the new packages are in.
- **Budget time generously on old hardware.** The upgrade alone took over an hour and a half.
- **Keep a local copy of the backups.** A remote copy behind a slow uplink is
  a backup, but restoring from it would take days.
- **Keep the old kernels until the new one has proven itself.** I'll run
  `apt autoremove` in a few weeks, not today.

One last note on process. I did the work on site, while a
[Claude Code](https://claude.ai/code) session running in the cloud, without
any access to the host, prepared each batch of commands and turned the output I
pasted back into the install log. It also opened the pull requests that keep
the log in my repository. I have written before about
[working this way with coding agents](/posts/2026-10-15-hackturin-2026-poopvolt-backstage/),
and an OS upgrade turned out to be a good fit for it: the agent never touched
the machine, but nothing that happened today went unrecorded.
