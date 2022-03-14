---
layout: post
title:  "ARNEIS project journal - dev-cw10"
date:   2022/03/14
tags: 	arneis b-arol-o opencv spatial-ai-contest
---

<!--
<a href="https://opencv.org/opencv-spatial-ai-contest/#finalists"><img src="https://user-images.githubusercontent.com/75182/146637995-3266f15d-81a4-4470-a337-965404340121.jpg" alt="OpenCV Spatial AI Contest Finalist" width="40%"></a>

Welcome to our weekly status report of the [ARNEIS project](https://github.com/B-AROL-O/ARNEIS)!
-->

As [I announced in a previous post](https://gmacario.github.io/posts/2021-12-18-arneis-spatial-ai-finalist)

> Your team “B-AROL-O Bottling Systems” and project “ARNEIS: Automated Recognizer, Network-Enabled, Items Sorter” have been selected as one of just 50 teams to move on  to Phase 2 of OpenCV Spatial AI Contest.
> Your team name and region are listed on the official webpage at <https://opencv.org/opencv-spatial-ai-contest/​>

Here is the report of our progress in the ARNEIS project after the end of CW10-2022.

## What did we accomplish this week?

In Sprint dev-cw10 we [closed 16 issues or Pull Requests](https://github.com/B-AROL-O/ARNEIS/issues?q=is%3Aclosed+milestone%3Adev-cw10) - not many in quantity, but high in quality!

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/5> -->

Let's now dig into some of the major results we achieved during last week.

### New release of the LEGO&reg; design for ARNEIS

Please look at <https://github.com/B-AROL-O/ARNEIS/tree/main/mocs/project> for details

![arneis-conveyor-20220312.gif](https://github.com/B-AROL-O/ARNEIS/raw/main/mocs/project/arneis-conveyor-20220312.gif)

### Progress in controlling the LEGO&reg; Powered Up devices

Under the `/code` folder of the [ARNEIS repository on GitHub](https://github.com/B-AROL-O/ARNEIS) I have uploaded  `poweredupapp-flash-move`. This folder contains a simple project, complete with the instructions for loading it on the [LEGO&reg; Powered Up](https://play.google.com/store/apps/details?id=com.lego.common.poweredup) app.

![poweredupapp-flash-move](https://github.com/B-AROL-O/ARNEIS/raw/main/code/poweredupapp-flash-move/thumbnail.png)

This project can be used as a starting point for programming a more complex behaviour of the sensors and motors of a MOC.

I have also added more information and resources to the HOWTO guide available at

<https://arneis.readthedocs.io/en/latest/howto/howto-control-rpi-poweredup.html>

### Multi-agent support to the Kubernetes cluster

After some unsuccesful attempts I eventually managed to attach a few additional hosts to act as Agent Nodes on the K3s cluster we created for the ARNEIS project:

```text
root@arneis-vm01:~# kubectl cluster-info
Kubernetes control plane is running at https://127.0.0.1:6443
CoreDNS is running at https://127.0.0.1:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
Metrics-server is running at https://127.0.0.1:6443/api/v1/namespaces/kube-system/services/https:metrics-server:https/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
root@arneis-vm01:~# kubectl get nodes
NAME           STATUS   ROLES                  AGE     VERSION
hw0943         Ready    <none>                 2d19h   v1.22.7+k3s1
arneis-vm02    Ready    <none>                 4d20h   v1.22.7+k3s1
arneis-vm01    Ready    control-plane,master   5d      v1.22.7+k3s1
hw0911         Ready    <none>                 2d20h   v1.22.7+k3s1
gmpowerhorse   Ready    <none>                 47h     v1.22.7+k3s1
root@arneis-vm01:~#
```

You can find the detailed instructions, as well as some troubleshooting tips, in the updated HOWTO published at

<https://arneis.readthedocs.io/en/latest/howto/howto-install-k3s-for-arneis.html>

## Next week plans

Our plan for next week is available on GitHub: <https://github.com/B-AROL-O/ARNEIS/milestone/9>.

<!-- TODO: Add screenshot of <https://github.com/orgs/B-AROL-O/projects/1/views/1> -->

<!-- ## That's all, folks -->

Thanks for reading up to here!

<!-- Thanks for reading up to the end of such long post! -->

If you want to help or just say hello, please get in touch with us through [GitHub](https://github.com/B-AROL-O/ARNEIS) or [Twitter](https://twitter.com/baroloteam).

[Gianpaolo](https://github.com/gmacario) on behalf of the [B-AROL-O Team](https://github.com/b-arol-o).

<!-- EOF -->
