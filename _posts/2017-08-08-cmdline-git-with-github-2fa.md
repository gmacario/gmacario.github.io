---
layout: post
title:  "Using command-line git with GitHub 2FA"
date:   2017-08-08 22:00:00 CEST
tags:   git github
---

After enabling [two-factor authentication on my GitHub account](https://help.github.com/articles/securing-your-account-with-two-factor-authentication-2fa/) it seemed I became unable to push my local repositories from command-line git using the https transport.

I was simply wrong, here what I did to fix the issue.

### Create a Personal Access Token

Two-factor authentication in GitHub works by replacing your GitHub password with a Personal Access Token which can be different depending on the application you want to enable.

To create a Personal Access Token, browse <https://github.com/settings/tokens>, then click "Generate new token".

* Provide a Token description, i.e. "git @my-linux-laptop"
* Select scopes. Select "repo" to have full control of private repositories
* Click "Generate token"

Now from the command line perform some actions which require user authentication, for instance clone a private repository

```shell
git clone https://github.com/myuser/my-private-repo
```

Alternatively, clone (via https) a repository you own, then commit a simple change and do `git push`.

In either case git will request your GitHub credentials before proceeding.

When requested for "Username" type your GitHub username (in my case, "gmacario"):

```
vagrant@ch1:~/github/gmacario/my-secret-repo$ git push -u origin master
Username for 'https://github.com': gmacario
Password for 'https://gmacario@github.com':
```

On the other hand, when requested for Password, DO NOT type your GitHub password.
Instead, click the "copy" icon on the GitHub setting page, then paste your newly created Personal access token instead.

### Enable Git credentials cache (recommended)

To avoid providing the same credentials every time, you may enable the Git credentials cache through the following command:

```shell
git config --global credential.helper cache
```

Through this configuration a daemon will be run to cache the provided credentials and avoid the user to be requested again.

The default cache expiry timeout is 900 seconds (15 minutes) and can be changed with the `--timeout` option as follows:

```shell
git config --global credential.helper 'cache --timeout=300'
```

If you want the daemon to exit early, forgetting all cached credentials before their timeout, you can issue an exit action:

```shell
git credential-cache exit
```

### Alternative: Enable Git credentials store

A less secure but more convenient way for saving your credentials is enabling the git-credential-store through the following command

```shell
git config credential.helper store
```

**NOTE**: The credentials will be saved unencrypted on a file inside your home directory, therefore use it with discretion.

### See also

* <https://help.github.com/articles/providing-your-2fa-authentication-code/>
* <https://git-scm.com/docs/git-credential-cache>
* <https://git-scm.com/docs/git-credential-store>

<!-- EOF -->
