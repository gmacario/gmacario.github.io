---
title: "Remote sessions with Visual Studio Code and Claude Code"
pubDatetime: 2026-09-11T00:00:00+02:00
tags:
  - claude-code
  - devcontainers
  - tmux
  - remote-work
description: "A HOWTO for launching Claude Code inside a VS Code Dev Container on a remote Linux server, keeping the session alive in tmux, and picking it up later from claude.ai/code or the mobile app via Remote Control."
---

I regularly start coding sessions on a beefy remote Linux box instead of my
laptop, and I wanted a way to walk away from a session mid-task and pick it back
up later — from a different terminal, from the browser, or from my phone —
without losing any context. Claude Code's **Remote Control** feature, combined
with a VS Code Dev Container and a `tmux` session on the remote host, does
exactly that. Here's the setup, step by step.

This HOWTO is generic, in the following sections you should replace the following placeholders:

- `REMOTE_HOST`: hostname or IP address of the remote Linux server, reachable over SSH
- `REMOTE_USER`: my own SSH user on that host
- `REPOSITORY_URL`: the git repository containing the project's Dev Container
- `LOCAL_WORKDIR`: where that repository is cloned on `REMOTE_HOST`

The command were tested on several `REMOTE_HOST`s running different Linux-based Operating systems, such as [Ubuntu 24.x server](https://ubuntu.com/server) or [Omarchy Quattro](https://omarchy.org/).

## Login to the remote host

Login to the remote server via SSH:

```bash
ssh $REMOTE_USER@$REMOTE_HOST
```

Identify the OS running on the remote server:

```bash
cat /etc/os-release
```

(Optional) Update the OS on `REMOTE_HOST` and reboot if required. For Ubuntu:

```bash
sudo apt update && sudo apt -y dist-upgrade && sudo apt -y autoremove --purge
sudo reboot
```

Wait until the server comes back online, then log in via SSH again and verify
that the host OS is now up to date.

## Clone the git workspace

Use the tool you prefer (Visual Studio Code, the command line, etc.) to clone
the git repository at `REPOSITORY_URL` into `LOCAL_WORKDIR`. From the command
line:

```bash
mkdir -p LOCAL_WORKDIR
cd LOCAL_WORKDIR
git clone REPOSITORY_URL
```

## Install the Dev Container CLI

Check whether the `devcontainer` CLI is already installed:

```bash
devcontainer --version
```

If the command isn't found, install it via `npm` (requires Node.js):

```bash
npm install -g @devcontainers/cli
```

## Enter the Dev Container

Make sure the Dev Container is up and running, then list its properties:

```bash
cd LOCAL_WORKDIR
devcontainer --version
devcontainer up | jq
```

Log into the Dev Container:

```bash
devcontainer exec bash
```

## Run `tmux` in the Dev Container

Logged into the Dev Container, make sure `tmux` is installed:

```bash
# REMOTE_HOST running Ubuntu
which tmux || (sudo apt-get update && sudo apt-get -y install tmux)

# REMOTE_HOST running Omarchy
which tmux || sudo pacman -S --noconfirm tmux
```

Attach to a running `tmux` session, or create a new one:

```bash
tmux
```

<!-- SCREENSHOT 1: terminal after running `tmux` inside the Dev Container -->

## Configure Claude Code

Make sure Claude Code is installed in the Dev Container:

```bash
which claude || curl -fsSL https://claude.ai/install.sh | bash
```

<!-- SCREENSHOT 2: result of the `which claude` / install check -->

The first time you launch the `claude` command, a setup wizard runs:

1. Select your preferred text style.

   <!-- SCREENSHOT 3: wizard - select text style -->

2. Select a login method and follow the instructions.

   <!-- SCREENSHOT 4: wizard - select login method -->

3. If everything is OK, you should get a confirmation message.

   <!-- SCREENSHOT 5: wizard - success message -->

4. Press **Enter** to continue and read the security notes.

   <!-- SCREENSHOT 6: wizard - press Enter to continue -->
   <!-- SCREENSHOT 7: wizard - security notes -->

5. Read and select **Yes, I trust this folder** to continue.

   <!-- SCREENSHOT 8: wizard - trust this folder prompt -->

6. Type `Ctrl-C` twice to exit Claude Code and return to the command prompt.

   <!-- SCREENSHOT 9: back at the bash prompt after Ctrl-C twice -->

## Enable Claude Code Remote Control

Back at the bash prompt inside the Dev Container, type `claude remote`:

```
$ claude remote

Take this session with you and pick up right where you left off on any device.
Open the Code tab in the Claude mobile app, or visit claude.ai/code in a browser.

The session keeps running on this machine. Use your other devices as a remote
control. Press Ctrl+C to stop.

Enable Remote Control? (y/n)
```

Type **y** to enable Remote Control:

```
Enable Remote Control? (y/n) y

Remote Control is launching in spawn mode, which lets you start new sessions in this project from claude.ai/code or the Claude mobile app. Learn more: https://code.claude.com/docs/en/remote-control

Spawn mode for this project:
  [1] same-dir — sessions share the current directory (default)
  [2] worktree — each session gets an isolated git worktree

This can be changed later or explicitly set with --spawn=same-dir or --spawn=worktree.

Choose [1/2] (default: 1):
```

Choose the option you prefer — I selected **2** (`worktree`) so that each
session gets an isolated git worktree.

<!-- SCREENSHOT 10: spawn mode selection -->

As suggested, you may type **space** to show a QR code:

<!-- SCREENSHOT 11: QR code -->

You can either scan the QR code or open the URL displayed in the terminal to
continue coding from another device.

You may be asked to sign in again to verify your device:

<!-- SCREENSHOT 12: device verification sign-in -->

The session will stay open until the `claude remote` command is terminated:

<!-- SCREENSHOT 13: session stays open -->

**Note:** because `claude remote` was launched from inside a `tmux` window, the
remote session stays open even if the SSH connection to `REMOTE_HOST`
terminates or the client reboots.

From here, you can pick the very same session back up from the Code tab in the
Claude mobile app, from `claude.ai/code` in a browser, or from another
terminal — the work in progress, and Claude's context, are all still there.
