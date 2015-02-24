---
title: Using Jekyill with GitHub Pages
layout: post
---

## Summary

This post explains how I managed to install
[Jekyll](http://jekyllrb.com/) to serve my GitHub pages locally on my laptop.

This can be really useful for testing your website before it goes public,
or to access your blog post, wiki while not online, etc.

## Installing Jekyll on itm-gmacario-w7

Installing on my laptop (OS: MS Windows 7 64-bit)

Reference: https://help.github.com/articles/using-jekyll-with-pages/

### Install Ruby

I have already installed [Cygwin](https://www.cygwin.com/) in my laptop, and Ruby is already available:

```
gmacario@ITM-GMACARIO-W7 ~
$ ruby --version
ruby 2.0.0p598 (2014-11-13) [i386-cygwin]

gmacario@ITM-GMACARIO-W7 ~
$
```

### Install Bundler

Invoke command `gem install bundler`:
```
gmacario@ITM-GMACARIO-W7 ~
$ gem install bundler
Fetching: bundler-1.7.12.gem (100%)
Successfully installed bundler-1.7.12
Parsing documentation for bundler-1.7.12
Installing ri documentation for bundler-1.7.12
Done installing documentation for bundler after 4 seconds
1 gem installed

gmacario@ITM-GMACARIO-W7 ~
$
```

### Install Jekyll

In the root of your site repository, create a file with the following contents:
```
source 'https://rubygems.org'
gem 'github-pages'
```
and save it as `Gemfile`, then invoke `bundle install`:
```
gmacario@ITM-GMACARIO-W7 ~/MYGIT/gmacario.github.io
$ bundle install
Fetching gem metadata from https://rubygems.org/..........
Resolving dependencies...
Installing RedCloth 4.2.9
Installing i18n 0.7.0
Installing json 1.8.2
Installing minitest 5.5.1
Installing thread_safe 0.3.4
Installing tzinfo 1.2.2
Installing activesupport 4.2.0
Using blankslate 2.1.2.4
Using hitimes 1.2.2
Using timers 4.0.1
Using celluloid 0.16.0
Using fast-stemmer 1.0.2
Installing classifier-reborn 2.0.3
Using coffee-script-source 1.8.0
Using execjs 2.2.2
Using coffee-script 2.3.0
Using colorator 0.1
Using ffi 1.9.6
Installing gemoji 2.1.0
Installing net-dns 0.8.0
Installing public_suffix 1.4.6
Installing github-pages-health-check 0.2.1
Using jekyll-coffeescript 1.0.1
Using jekyll-gist 1.1.0
Using jekyll-paginate 1.1.0
Installing sass 3.4.10
Installing jekyll-sass-converter 1.2.0
Using rb-fsevent 0.9.4
Using rb-inotify 0.9.5
Installing listen 2.8.5
Installing jekyll-watch 1.2.0
Installing kramdown 1.3.1
Using liquid 2.6.1
Installing mercenary 0.3.5
Using posix-spawn 0.3.9
Using yajl-ruby 1.1.0
Using pygments.rb 0.6.0
Installing redcarpet 3.1.2
Using safe_yaml 1.0.4
Using parslet 1.5.0
Using toml 0.1.2
Using jekyll 2.4.0
Installing mini_portile 0.6.2
...
```

**FIXME**: Just after printing "Installing mini_portile 0.6.2", command `bundle install` then hangs!

**TIP**: Keep Jekyll up to date with the command `bundle update`.

## Configure Jekyll
TODO

<!-- EOF -->
