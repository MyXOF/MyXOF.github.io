---
layout: post
title: JDK安装方法
description: （更新中...）.
path: skills/_posts/2018-12-26-jdk-installer.md
tags: [reference, skills]
---

* any list
{:toc}

## JDK 11

### Ubuntu

{% highlight shell %}
sudo add-apt-repository ppa:linuxuprising/java
sudo apt update
sudo apt install oracle-java11-installer
{% endhighlight %}

然后去`/etc/profile`设置JAVA_HOME，记得用sudo权限

{% highlight shell %}
export JAVA_HOME=/usr/lib/jvm/java-11-oracle
export CLASSPATH=.:${JAVA_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
{% endhighlight %}
