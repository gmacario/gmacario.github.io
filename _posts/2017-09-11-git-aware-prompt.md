---
layout: post
title:  "Git Aware Prompt"
date:   2017-09-11 18:00:00 CEST
tags:   git github
---
<!-- markdown-link-check-disable -->

As a developer I use Git everyday for managing source code, documentation, etc.
Unfortunately I sometimes get confused about which branch I am currently on.

One of nice little utility which can make your life easier as a software developer is the "Git Aware Prompt".
This tool allows you to decorate your command prompt with additional information, such as the branch of your checked out git repository.

To install Git Aware Prompt, simply browse <https://github.com/jimeh/git-aware-prompt> and follow the instructions in the `README.md`.

Here is an example which I tested on my Ubuntu 16.04 machine.

First of all, clone the project to a `.bash` folder inside your home directory:

```bash
mkdir -p ~/.bash
cd ~/.bash
git clone https://github.com/jimeh/git-aware-prompt
```

You then need to configure bash by adding the following lines to your `~/.bashrc`:

```
# Configure Git Aware Prompt
# See https://github.com/jimeh/git-aware-prompt
export GITAWAREPROMPT=~/.bash/git-aware-prompt
source "${GITAWAREPROMPT}/main.sh"
export PS1="\${debian_chroot:+(\$debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\] \[$txtcyn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "
```

After logging out and logging in again, Git Aware Prompt is installed.

When you enter a git repository instead of

```
gmacario@ies-genbld01-ub16:~$ cd linux-stable
gmacario@ies-genbld01-ub16:~/linux-stable$
```

you will get the following

```
gmacario@ies-genbld01-ub16:~ $ cd linux-stable
gmacario@ies-genbld01-ub16:~/linux-stable (master)$
```

After checking out a different branch, your bash prompt will change accordingly. Example:

```bash
gmacario@ies-genbld01-ub16:~/linux-stable (master)$ git checkout linux-3.9.y
Checking out files: 100% (58807/58807), done.
Branch linux-3.9.y set up to track remote branch linux-3.9.y from origin.
Switched to a new branch 'linux-3.9.y'
gmacario@ies-genbld01-ub16:~/linux-stable (linux-3.9.y)$
```

<!-- markdown-link-check-enable -->
<!-- EOF -->
