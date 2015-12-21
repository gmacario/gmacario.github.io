---
layout: post
title:  "Trying Docker image for workflow demo"
date:   2015-12-16 09:00:00 CET
categories: howto docker jenkins workflow
---

# Trying Docker image for workflow demo

See <https://github.com/jenkinsci/workflow-plugin/blob/master/demo/README.md>

Start Docker Quickstart Terminal

<!-- 2015-12-16 17:26 CET -->

```
$ docker run -p 8080:8080 -p 8081:8081 -p 9418:9418 -t jenkinsci/workflow-demo:latest
```

Result: FAIL

```
Dec 16, 2015 1:43:59 PM jenkins.util.ErrorLoggingScheduledThreadPoolExecutor afterExecute
WARNING: failure in task not wrapped in SafeTimerTask
hudson.remoting.RequestAbortedException: java.net.SocketException: Socket closed
        at hudson.remoting.Request.abort(Request.java:297)
        at hudson.remoting.Channel.terminate(Channel.java:847)
        at hudson.remoting.SynchronousCommandTransport$ReaderThread.run(SynchronousCommandTransport.java:69)
        at ......remote call to mock-slave-5(Native Method)
        at hudson.remoting.Channel.attachCallSiteStackTrace(Channel.java:1416)
        at hudson.remoting.Request.call(Request.java:172)
        at hudson.remoting.Channel.call(Channel.java:780)
        at hudson.FilePath.act(FilePath.java:980)
        at hudson.FilePath.act(FilePath.java:969)
        at hudson.FilePath.deleteRecursive(FilePath.java:1171)
        at org.jenkinsci.plugins.durabletask.FileMonitoringTask$FileMonitoringController.cleanup(FileMonitoringTask.java:156)
        at org.jenkinsci.plugins.workflow.steps.durable_task.DurableTaskStep$Execution.check(DurableTaskStep.java:201)
        at org.jenkinsci.plugins.workflow.steps.durable_task.DurableTaskStep$Execution.run(DurableTaskStep.java:150)
        at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
        at java.util.concurrent.FutureTask.run(FutureTask.java:266)
        at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$201(ScheduledThreadPoolExecutor.java:180)
        at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:293)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
        at java.lang.Thread.run(Thread.java:745)
Caused by: java.net.SocketException: Socket closed
        at java.net.SocketInputStream.socketRead0(Native Method)
        at java.net.SocketInputStream.socketRead(SocketInputStream.java:116)
        at java.net.SocketInputStream.read(SocketInputStream.java:170)
        at java.net.SocketInputStream.read(SocketInputStream.java:141)
        at java.net.SocketInputStream.read(SocketInputStream.java:223)
        at hudson.remoting.FlightRecorderInputStream.read(FlightRecorderInputStream.java:82)
        at hudson.remoting.ChunkedInputStream.readHeader(ChunkedInputStream.java:72)
        at hudson.remoting.ChunkedInputStream.readUntilBreak(ChunkedInputStream.java:103)
        at hudson.remoting.ChunkedCommandTransport.readBlock(ChunkedCommandTransport.java:39)
        at hudson.remoting.AbstractSynchronousByteArrayCommandTransport.read(AbstractSynchronousByteArrayCommandTransport.java:34)
        at hudson.remoting.SynchronousCommandTransport$ReaderThread.run(SynchronousCommandTransport.java:48)

[7036] Connection from 127.0.0.1:37846
[7036] Extended attributes (16 bytes) exist <host=localhost>
[7036] Request upload-pack for '/repo'
[3957] [7036] Disconnected
[7039] Connection from 127.0.0.1:34965
[7039] Extended attributes (16 bytes) exist <host=localhost>
[7039] Request upload-pack for '/repo'
[3957] [7039] Disconnected
[7045] Connection from 127.0.0.1:34209
[7045] Extended attributes (16 bytes) exist <host=localhost>
[7045] Request upload-pack for '/repo'
[3957] [7045] Disconnected
[7048] Connection from 127.0.0.1:44966
[7048] Extended attributes (16 bytes) exist <host=localhost>
[7048] Request upload-pack for '/repo'
[3957] [7048] Disconnected
```

<!-- 2015-12-16 17:26 CET -->

Read [Workflow Plugin Tutorial](https://github.com/jenkinsci/workflow-plugin/blob/master/TUTORIAL.md)

TODO


# Trying cloudbees Workflow Demo

See <https://hub.docker.com/r/cloudbees/workflow-demo/>

Start Docker Quickstart Terminal

<!-- 2015-12-16 14:55 CET -->

```
$ docker run -p 8080:8080 -p 8081:8081 -p 8022:22 -p 9418:9418 -ti cloudbees/workflow-demo
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

<!-- EOF -->
