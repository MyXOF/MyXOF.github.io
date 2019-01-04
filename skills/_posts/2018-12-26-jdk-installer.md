---
layout: post
title: JDK安装方法汇总
description: （更新中...）.
path: skills/_posts/2018-12-26-jdk-installer.md
tags: [skills, java]
---

* any list
{:toc}

## JDK 11

### Ubuntu

{% highlight shell %}
sudo add-apt-repository ppa:linuxuprising/java
sudo apt update
sudo apt install oracle-java11-installer

# 查看Java版本
java -version
{% endhighlight %}

### OSX/Win10

直接去[官网](https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html)下载对应的dmg/exe文件安装即可。

## Java Home设置

### Linux/OS X

去`/etc/profile`设置JAVA_HOME，记得用sudo权限

{% highlight shell %}

# OSX的JAVA安装目录一般在 /Library/Java/JavaVirtualMachines/{jdk版本}/Contents/Home
# Linux的安装目录一般在 /usr/lib/jvm/{jdk版本}
export JAVA_HOME=/{JAVA安装目录}
export CLASSPATH=.:${JAVA_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
{% endhighlight %}

> 如果用了sudo还是提示没有写入权限，可以将profile先拷贝一份出来，修改开拷贝的文件，然后再覆盖/etc下的

修改完之后记得`source /etc/profile`，之后执行`java -version`就可以看到设置成功了。


### Win10

1. 右键`我的电脑`选择`属性`，然后在左边栏点击`高级系统设置`。

2. 点击下方`环境变量`。

3. 现在下方的`系统变量`中新建，变量名为`JAVA_HOME`，然后浏览目录，JAVA的安装路径一般在`C:\Program Files\Java\jdkXXX`的位置

4. 添加完成之后，在上方的用户变量里面找到`Path`，点击`编辑`。

5. 把`%JAVA_HOME%\bin`加入

6. **新启动**一个命令行输入`java -version`查看是否生效。

