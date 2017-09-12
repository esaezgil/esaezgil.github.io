+++
title = "Scheduling logrotate in CentOS"
bigimg = ""
date = "2016-12-30T11:54:24+02:00"
subtitle = ""
keywords = "logrotate, CentOS, open source, logs"
description = "Scheduling log rotate in a CentOS system"
+++

Logs are a fundamental piece of the web server architecture for debugging, monitoring
and alerting purposes.
<!--more-->

Some of the infrastructure at [Skyscanner Hotels](https://www.skyscanner.net/hotels)' Backend makes use of [logster](https://github.com/etsy/logster) to send logs to [Graphite](https://graphiteapp.org/) and generate alerts through [Seyren](https://github.com/scobal/seyren) enabling ChatOps through [Slack](https://slack.com/). Although we usually check the different dashboards in [Kibana](https://www.elastic.co/products/kibana), having a well-maintained set of logs is important for quickly looking up and investigating an event.

<center>{{< figure src="/img/alerting_monitoring_infrastructure_subset.png" title="Subset of the monitoring and alerting architecture" width="720" height="405" >}}</center>

[Logrotate](http://www.linuxcommand.org/man_pages/logrotate8.html) is a small utility that allows to *rotate* the logs: archiving the current log, start a fresh one and delete old logs.

Due to different reasons we were having problems with some of our logs and the fix turned out to be to schedule the log rotation at a specific time.

#### In order to schedule the log rotate in our CentOS systems we followed these steps:

1. Understand that logrotate is executed once a day. If we check the logrotate RPM
   `rpm -ql logrotate` we see something like the following:

     ``` bash
    /etc/cron.daily/logrotate
    /etc/logrotate.conf
    /etc/logrotate.d
    /usr/sbin/logrotate
    /usr/share/doc/logrotate-3.8.6
    /usr/share/doc/logrotate-3.8.6/CHANGES
    /usr/share/doc/logrotate-3.8.6/COPYING
    /usr/share/man/man5/logrotate.conf.5.gz
    /usr/share/man/man8/logrotate.8.gz
    /var/lib/logrotate.status
     ```

   * The reason for `logrotate` being executed once a day can be seen in the previous list. The RPM creates a configuration entry in the `/cron.daily/` directory. Consequently, logrotate will be executed daily.

   * We would expect **cron** to be in charge of the scheduling of this task. However, for CentOS systems, **anacron** is the one in charge of the scheduling for daily events (among others). Furthermore, anacron introduces by default a random delay and it only starts running the scheduled tasks during the `START_HOURS_RANGE` as configured in `/etc/anacrontab`.

2. Set the logrotate at a specific time: moving the logrotate configuration out of the `/logrotate.daily/` directory and scheduling its execution through cron.

An example of the aforementioned solution can be achieved through [Ansible](https://www.ansible.com/) as follows (*we make use of Ansible through [TeamCity](https://www.jetbrains.com/teamcity/) for our automated deployment pipeline*):  

  ``` yaml
- name: check logrotate config exists in cron.daily
  stat: path=/etc/cron.daily/logrotate
  register: logrotate_config

- name: move logrotate config if existing
  command: mv /etc/cron.daily/logrotate /opt/home/logrotate.cronjob
  when: logrotate_config.stat.exists

- name: configure daily logrotate cron
  cron: name="schedule logrotate" minute="0" hour="3" job="/opt/home/logrotate.cronjob"
  ```

This way, logrotate will be executed every day at 3 am.

Credits:

I shall thank my colleague Kampde for his detailed walkthrough about the intricacies of cron, anacron and RPMs among others.

References:

[Logrotate](https://support.rackspace.com/how-to/understanding-logrotate-utility/)

[CentOS and logrotate at serverfault](http://serverfault.com/questions/454118/why-does-my-centos-logrotate-run-at-random-times)
