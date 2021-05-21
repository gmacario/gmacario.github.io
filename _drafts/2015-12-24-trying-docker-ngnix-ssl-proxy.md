---
layout: post
title:  "Trying Docker nginx SSL Proxy"
date:   2015-12-21 18:00:00 CET
categories: howto docker nginx webserver ssl
---
<!-- markdown-link-check-disable -->

### Introduction

See <https://github.com/DanielDent/docker-nginx-ssl-proxy>

### Installing docker-compose on mv-linux-powerhorse

See <https://docs.docker.com/compose/install/>

Logged as gmacario@mv-linux-powerhorse

```
$ curl -L https://github.com/docker/compose/releases/download/1.5.2/docker-compose-`uname -s`-`uname -m` > docker-compose
$ sudo install -m 755 docker-compose /usr/local/bin/
```

### Creating

New issue: apache: Docker image does not build

Following instructions at <https://github.com/fedora-cloud/Fedora-Dockerfiles/tree/master/apache>

```
$ cd Fedora-Dockerfiles/apache
$ docker build --rm -t test/httpd .
```

Result:

```
TODO
```

### Creating docker-compose.yml

Logged as gmacario@mv-linux-powerhorse

```
$ cd ~/maxlab-guests/maxlab-nginx
$ vi docker-compose.yml
```

Contents of `docker-compose.yml`

```
nginx-ssl-proxy:
  image: danieldent/nginx-ssl-proxy
  restart: always
  environment:
    UPSTREAM: 127.0.0.1:8080
    SERVERNAME: test.example.com
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - "/certs"

# EOF
```

### Bring up containers

Logged as gmacario@mv-linux-powerhorse

```
$ cd ~/maxlab-guests/maxlab-nginx
$ docker-compose up
```

Result:

```
gmacario@mv-linux-powerhorse:~/maxlab-guests/maxlab-nginx⟫ docker-compose up
Starting maxlabnginx_nginx-ssl-proxy_1
Attaching to maxlabnginx_nginx-ssl-proxy_1
nginx-ssl-proxy_1 | [s6-init] making user provided files available at /var/run/s6/etc...exited 0.
nginx-ssl-proxy_1 | [s6-init] ensuring user provided files have correct perms...exited 0.
nginx-ssl-proxy_1 | [fix-attrs.d] applying ownership & permissions fixes...
nginx-ssl-proxy_1 | [fix-attrs.d] done.
nginx-ssl-proxy_1 | [cont-init.d] executing container initialization scripts...
nginx-ssl-proxy_1 | [cont-init.d] done.
nginx-ssl-proxy_1 | [services.d] starting services
nginx-ssl-proxy_1 | [services.d] done.
nginx-ssl-proxy_1 | Waiting for Nginx to come up...
nginx-ssl-proxy_1 | 2015/12/22 09:58:56 [ DEBUG ] Parsing environment references in '/etc/nginx/conf.d/default.conf'
nginx-ssl-proxy_1 | 2015/12/22 09:58:56 [warn] 127#127: "ssl_stapling" ignored, no OCSP responder URL in the certificate
nginx-ssl-proxy_1 | nginx: [warn] "ssl_stapling" ignored, no OCSP responder URL in the certificate
nginx-ssl-proxy_1 |   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
nginx-ssl-proxy_1 |                                  Dload  Upload   Total   Spent    Left  Speed
100   178  100   178    0     0   196k      0 --:--:-- --:--:-- --:--:--  173k
nginx-ssl-proxy_1 | 127.0.0.1 - - [22/Dec/2015:09:58:56 +0000] "GET / HTTP/1.1" 301 178 "-" "curl/7.38.0" "-"
nginx-ssl-proxy_1 | <html>
nginx-ssl-proxy_1 | <head><title>301 Moved Permanently</title></head>
nginx-ssl-proxy_1 | <body bgcolor="white">
nginx-ssl-proxy_1 | <center><h1>301 Moved Permanently</h1></center>
nginx-ssl-proxy_1 | <hr><center>nginx</center>
nginx-ssl-proxy_1 | </body>
nginx-ssl-proxy_1 | </html>
nginx-ssl-proxy_1 | Nginx has arrived.
nginx-ssl-proxy_1 | 2015-12-22 09:58:57,307:INFO:requests.packages.urllib3.connectionpool:758: Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org
nginx-ssl-proxy_1 | 2015-12-22 09:58:57,713:INFO:requests.packages.urllib3.connectionpool:758: Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org
nginx-ssl-proxy_1 | 2015-12-22 09:58:58,089:INFO:requests.packages.urllib3.connectionpool:758: Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org
nginx-ssl-proxy_1 | 2015-12-22 09:58:58,444:INFO:requests.packages.urllib3.connectionpool:758: Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org
nginx-ssl-proxy_1 | 2015-12-22 09:58:58,956:INFO:requests.packages.urllib3.connectionpool:207: Starting new HTTP connection (1): test.example.com
nginx-ssl-proxy_1 | 2015-12-22 09:58:59,044:ERROR:acme.challenges:267: Unable to reach http://test.example.com/.well-known/acme-challenge/qVg_w25agoHSl2NexQcwK2L7uaLIXCFteTmDeeSnNg0: HTTPConnectionPool(host='test.example.com', port=80): Max retries exceeded with url: /.well-known/acme-challenge/qVg_w25agoHSl2NexQcwK2L7uaLIXCFteTmDeeSnNg0 (Caused by NewConnectionError('<requests.packages.urllib3.connection.HTTPConnection object at 0x7f8d30a1add0>: Failed to establish a new connection: [Errno -2] Name or service not known',))
nginx-ssl-proxy_1 | 2015-12-22 09:58:59,044:WARNING:simp_le:801: test.example.com was not successfully verified by the client. CA is likely to fail as well!
nginx-ssl-proxy_1 | 2015-12-22 09:58:59,065:INFO:requests.packages.urllib3.connectionpool:758: Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org
nginx-ssl-proxy_1 | 2015-12-22 09:58:59,901:INFO:requests.packages.urllib3.connectionpool:758: Starting new HTTPS connection (1): acme-v01.api.letsencrypt.org
nginx-ssl-proxy_1 | Traceback (most recent call last):
nginx-ssl-proxy_1 |   File "/usr/local/sbin/simp_le", line 9, in <module>
nginx-ssl-proxy_1 |     load_entry_point('simp-le', 'console_scripts', 'simp_le')()
nginx-ssl-proxy_1 |   File "/opt/simp_le/simp_le.py", line 874, in main
nginx-ssl-proxy_1 |     raise SystemExit(_main(cli_args))
nginx-ssl-proxy_1 |   File "/opt/simp_le/simp_le.py", line 867, in _main
nginx-ssl-proxy_1 |     _new_data(args)
nginx-ssl-proxy_1 |   File "/opt/simp_le/simp_le.py", line 812, in _new_data
nginx-ssl-proxy_1 |     max_attempts=(10 * len(authorizations)))
nginx-ssl-proxy_1 |   File "/opt/simp_le/venv/local/lib/python2.7/site-packages/acme/client.py", line 383, in poll_and_request_issuance
nginx-ssl-proxy_1 |     raise errors.PollError(waiting, updated)
nginx-ssl-proxy_1 | acme.errors.PollError
```

TODO

# OLD STUFF BELOW

This blog post explains how I did [something](http://www.something.com/) on my laptop running MS Windows 7.

Sample table

<!-- TIP: <http://www.tablesgenerator.com/markdown_tables> -->

| First | Last  | Role | Notes             |
|-------|-------|------|-------------------|
| John  | Doe   | CEO  | The big boss      |
| Mary  | Smith | CFO  | She got the money |

<!-- markdown-link-check-enable -->
<!-- EOF -->
