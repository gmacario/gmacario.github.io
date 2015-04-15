---
title: Using Jekyill with GitHub Pages
layout: post
---

## Summary

<!-- 2015-04-12 11:35 CEST -->

This post explains how I managed to install [Jekyll](http://jekyllrb.com/) to serve my GitHub pages locally on my laptop.

This can be really useful for testing your website before it goes public, or to access your blog post, wiki while not online, etc.

## Installing Jekyll on itm-gmacario-w7

Installing on my laptop (OS: MS Windows 7 64-bit)

Reference: <https://help.github.com/articles/using-jekyll-with-pages/>

### Install Ruby

I have already installed [Cygwin](https://www.cygwin.com/) in my laptop, and Ruby is already available:

```
gmacario@ITM-GMACARIO-W7 ~
$ ruby --version
ruby 2.0.0p598 (2014-11-13) [x86_64-cygwin]

gmacario@ITM-GMACARIO-W7 ~
$
```

### Install Bundler

Invoke command `gem install bundler`:

```
gmacario@ITM-GMACARIO-W7 ~
$ gem install bundler
Fetching: bundler-1.9.2.gem (100%)
Successfully installed bundler-1.9.2
Parsing documentation for bundler-1.9.2
Installing ri documentation for bundler-1.9.2
Done installing documentation for bundler after 8 seconds
1 gem installed

gmacario@ITM-GMACARIO-W7 ~
$
```

### Install Jekyll

In the root of your site repository, create a file with the following contents:

```
source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
```
and save it as `Gemfile`

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gmacario.github.io
$ bundle config build.nokogiri --use-system-libraries

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gmacario.github.io
$
```

Then invoke `bundle install`:

```
gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gmacario.github.io
$ bundle install
Fetching gem metadata from https://rubygems.org/..........
Fetching version metadata from https://rubygems.org/..
Resolving dependencies...
Using RedCloth 4.2.9
Using i18n 0.7.0
Using json 1.8.2
Using minitest 5.5.1
Using thread_safe 0.3.5
Using tzinfo 1.2.2
Using activesupport 4.2.1
Using blankslate 2.1.2.4
Using hitimes 1.2.2
Using timers 4.0.1
Using celluloid 0.16.0
Using fast-stemmer 1.0.2
Using classifier-reborn 2.0.3
Using coffee-script-source 1.9.1
Using execjs 2.5.2
Using coffee-script 2.4.1
Using colorator 0.1
Using ffi 1.9.8
Using gemoji 2.1.0
Using net-dns 0.8.0
Using public_suffix 1.5.1
Using github-pages-health-check 0.2.2
Using jekyll-coffeescript 1.0.1
Using jekyll-gist 1.2.1
Using jekyll-paginate 1.1.0
Using sass 3.4.13
Using jekyll-sass-converter 1.2.0
Using rb-fsevent 0.9.4
Using rb-inotify 0.9.5
Using listen 2.10.0
Using jekyll-watch 1.2.1
Using kramdown 1.5.0
Using liquid 2.6.1
Using mercenary 0.3.5
Using posix-spawn 0.3.11
Using yajl-ruby 1.2.1
Using pygments.rb 0.6.1
Using redcarpet 3.1.2
Using safe_yaml 1.0.4
Using parslet 1.5.0
Using toml 0.1.2
Using jekyll 2.4.0
Using mini_portile 0.6.2
Installing nokogiri 1.6.6.2
Installing html-pipeline 1.9.0
Installing jekyll-mentions 0.2.1
Installing jekyll-redirect-from 0.6.2
Installing jekyll-sitemap 0.6.3
Installing jemoji 0.4.0
Installing maruku 0.7.0
Installing rdiscount 2.1.7
Installing terminal-table 1.4.5
Installing github-pages 33
Using bundler 1.9.2
Bundle complete! 1 Gemfile dependency, 54 gems now installed.
Use `bundle show [gemname]` to see where a bundled gem is installed.
Post-install message from html-pipeline:
-------------------------------------------------
Thank you for installing html-pipeline!
You must bundle Filter gem dependencies.
See html-pipeline README.md for more details.
https://github.com/jch/html-pipeline#dependencies
-------------------------------------------------

gmacario@ITM-GMACARIO-W7 /cygdrive/e/data/MYGIT/gmacario.github.io
$
```

If the previous command fails, run Cygwin `setup-x86_64.exe` and make sure the following packages are installed:

* ruby
* gcc-core
* libcrypt-devel
* make
* ruby-pkg-config
* libffi6
* libffi-devel
* zlib-devel
* libiconv-devel
* libxml2-devel
* libxslt-devel

## Configure Jekyll

Fix Jekyll under MS Windows

    $ echo "export COMSPEC=/cygdrive/c/Windows/System32/cmd.exe" >> ~/.bashrc

See more at <https://necurity.co.uk/linux/2014/07/06/2014-07-06-Cygwin_and_Jekyll.md.html>

You can now start the built-in http server

    $ bundle exec jekyll serve

Now browse <http://localhost:4000/> to see the pages rendered by Jekyll.

<!-- EOF -->
