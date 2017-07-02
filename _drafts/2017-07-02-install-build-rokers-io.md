# Installing build.rokers.io

### Prerequisites

* Master node: AWS EC2 c4.2xlarge (8 vCPUs, 15 GiB Memory, Instance Storage: 8 GB)
  - Add EBS 100 GB (to be mounted as `/var`)
  - Open incoming ports 22/tcp, 80/tcp, 443/tcp
* Slave nodes: TODO

(2017-06-30 18:00 CEST)

Connect to AWS instance

```
ssh -i ~/.ssh/rokers_genivi_dev.pem ubuntu@build.rokers.io
```

Verify HW/SW configuration of the master node:

* CPU: 8 cores
* RAM: 16 GB 
* Root Volume: 8 GB
* One additional 100 GB EBS volume
* OS: Ubuntu 16.0.4.2 LTS 64-bit

```
cat /proc/cpuinfo
cat /proc/meminfo
df -h
sudo fdisk -l
cat /etc/os-release
```

Logged as ubuntu@build.rokers.io

```
sudo apt update && sudo apt dist-upgrade
```

(Optional but recommended) Install additional useful packages

```
sudo apt install byobu htop mc 
```

Login as root

```
sudo -i
```

Logged as root@build.rokers.io, format the secondary volume and mount it as `/var`

**FIXME**: You may need to stop a few services before being able to rename `/var`

```
fdisk /dev/xvdf
mkfs.ext4 -L var /dev/xvdf1
mv /var /var.OLD
echo 'LABEL=var    /var/lib/docker  ext4    defaults       0 1' >>/etc/fstab
mount -a
cd /var.OLD && cp -av . /var
```

Create Swap Space

```
dd if=/dev/zero of=/var/swapfile.dat bs=1M count=16384
mkswap /var/swapfile.dat
chmod 600 /var/swapfile.dat
echo '/var/swapfile.dat    swap    swap    defaults    0    0' >>/etc/fstab
swapon -a
```

Reboot to make sure all the changes are applied

Logged as ubuntu@build.rokers.io, install Docker

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install -y docker-ce
sudo systemctl status docker
```

Logged as ubuntu@build.rokers.io, allow user `ubuntu` to run docker without sudo

```
sudo usermod -aG docker ${USER}
```

Logout and log to apply the changes

Logged as ubuntu@build.rokers.io, install docker-compose

```
mkdir -p ~/Downloads && cd ~/Downloads
curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` >docker-compose
sudo install -m755 docker-compose /usr/local/bin/
docker-compose --version
```

Logged as ubuntu@build.rokers.io, install and run easy-jenkins

```
mkdir -p ~/github/gmacario && cd ~/github/gmacario
[ ! -e easy-jenkins ] && git clone https://github.com/gmacario/easy-jenkins
cd ~/github/gmacario/easy-jenkins && git pull --all --prune
./runme.sh
```

Result:

```
ubuntu@ip-172-31-26-128:~/github/gmacario/easy-jenkins$ ./runme.sh
WARNING: Cannot find docker-machine - assuming environment variables are already defined
Building myjenkins
Step 1/13 : FROM jenkins:2.60.1
...
Successfully tagged easyjenkins_myjenkins:latest
WARNING: Image for service myjenkins was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating easyjenkins_myjenkins_1 ...
Creating easyjenkins_myjenkins_1 ... done
INFO: Initial administrator password: 74eb700cb15d4ce99cc47a60dd694f2d
ubuntu@ip-172-31-26-128:~/github/gmacario/easy-jenkins$
```

Connect to <http://localhost:29080> (SSH tunnel to <http://build.rokers.io:9080>) and complete the configuration of easy-jenkins:

* Paste the initial admin password (you should find it displayed on the terminal where you launched `./runme.sh`)
* Click **Install suggested plugins**
* Create First Admin User
* Restart Jenkins when requested

Refresh the page and login to Jenkins as user `admin`

* Click on **Build Executor Status**
* Configure node `master`
  - Number of executors: `4` (was 2)
  - Labels: `docker`
  - Click **Save**

(2017-07-01 22:48 CEST)

Try building https://github.com/robotrokers/genivi-dev-platform

* Click **Open Blue Ocean**
* Click **Create a new Pipeline**
* Where do you store the code? **Github**
* Paste your Github access token, then click **Connect**
* Which organization does the repository belong to? **gmacario** (**FIXME**: Cannot select "robotrokers" as I am not a member of the Organization)
* Create a single Pipeline or discover all Pipelines? **New Pipeline**
* Choose a repository: **genivi-dev-platform**, then click **Create Pipeline**

Result: Build SUCCESS (about 1h for a scratch build)

### Configure login with GitHub credentials

(2017-06-02 00:05 CEST)

See <https://github.com/gmacario/easy-jenkins/blob/master/docs/configuring-access-control-via-github.md>

Reference: <https://jenkins.io/solutions/github/>

Jenkins > Manage Jenkins > Configure Global Security > Security Realm

TODO TODO TODO


<!-- EOF -->