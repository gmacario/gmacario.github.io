---
layout: post
title:  "Experiences with the C.H.I.P. 9$ Computer"
date:   2017-03-10 18:00:00 CET
# categories: template android howto development
---

This blog post explains my experiences with [C.H.I.P.](https://getchip.com/pages/chip) - the World's First $9 Computer.

### Reflash CHIP

Browse <http://flash.getchip.com/>

> Your CHIP details:
>
> * Serial #: 162542130082604c
> * NAND:Hynix 8G MLC

* Select image "Headless 4.4"

Downloading file `stable-server-b149-Hynix_8G_MLC.chp` (312 MB)

> * Serial #: 162542130082604c
> * NAND:Hynix 8G MLC
> * MD5 Hash: 165e3a2a2c9353e06b98136beac777eb

### Manually configure Wi-Fi from command line

See <https://docs.getchip.com/chip.html#wifi-connection>

### Install TINC on C.H.I.P.

Based on the instructions at <https://github.com/gmacario/tinc-ninuxto/blob/master/configuring-tinc-ninuxto-on-udoobuntu2.md>

Logged as chip@chip, change default password for user `chip`, then configure hostname (let us choose `chipgm34` in our example)

```
password chip
echo "chipgm32" | sudo tee /etc/hostname
sudo vi /etc/hosts      (Replace occurrences of old hostname with new)
```

Update installed Debian packages, then reboot to activate the changes

```
sudo apt update && sudo apt -y dist-upgrade
sudo reboot
```

As soon as the host is up and running, remote login via SSH as chip@chipgm32, then install TINC and other required pacakges

```
sudo apt -y install git rsync tinc
```

Clone the "gmacario/tinc-ninuxto" repository from GitHub

```
mkdir -p ~/MYGIT &&  cd ~/MYGIT
[ ! -e tinc-ninuxto ] && git clone https://github.com/gmacario/tinc-ninuxto
```

Create the local TINC configuration

```
cd ~/MYGIT/tinc-ninuxto && git pull --all --prune && \
  sudo mkdir -p /etc/tinc/ninuxto/hosts/ && \
  sudo rsync -avz hosts/ /etc/tinc/ninuxto/hosts/
```

Customize TINC configuration files starting from some templates

```
sudo cp ~/MYGIT/tinc-ninuxto/sample-tinc.conf /etc/tinc/ninuxto/tinc.conf
sudo vi /etc/tinc/ninuxto/tinc.conf      (Adjust Name="chipgm32")
```

```
sudo cp ~/MYGIT/tinc-ninuxto/sample-tinc-up /etc/tinc/ninuxto/tinc-up
sudo vi /etc/tinc/ninuxto/tinc-up        (Choose an available IP Address according to the table at README.md)
sudo chmod 755 /etc/tinc/ninuxto/tinc-up
```

```
sudo cp ~/MYGIT/tinc-ninuxto/sample-tinc-down /etc/tinc/ninuxto/tinc-down
sudo vi /etc/tinc/ninuxto/tinc-down      (Everything should be OK, but double check)
sudo chmod 755 /etc/tinc/ninuxto/tinc-down
```

Create a public/private key pair if they do not exist

```
sudo -i sh -c "[ ! -e /etc/tinc/ninuxto/rsa_key.priv ] && /usr/sbin/tincd -n ninuxto -K4096"
```

Accept the suggested paths where to save private and public RSA key.

Submit a Pull Request to https://github.com/gmacario/tinc-ninuxto with the following changes:

* A new line in the table at `README.md` to mark the IP address you chose for your node
* Your **public** key `/etc/tinc/ninuxto/hosts/chipgm32` saved under `hosts/`

After the PR is merged, update the gmacario/tinc-ninuxto repository in all your peer nodes (i.e. tincgw21, rpi3gm23) to make sure the new node is recognized.

##### Test connectivity to tinc-ninuxto

Try connecting to TINC network ninuxto

```
sudo tincd -n ninuxto --no-detach -d7
```

##### Automatically start tinc at boot

Type the following commands to have TINC network `ninuxto` active at boot:

```
echo "ninuxto" | sudo tee -a /etc/tinc/nets.boot
sudo service tinc restart
```

TODO

### See also

* C.H.I.P. Documentation: <https://docs.getchip.com/chip.html>

<!-- EOF -->
