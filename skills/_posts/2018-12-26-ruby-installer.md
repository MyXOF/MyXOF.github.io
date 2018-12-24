---
layout: post
title: Ruby安装方法
description: （更新中...）.
path: skills/_posts/2018-12-26-ruby-installer.md
tags: [reference, skills]
---

* any list
{:toc}

## Centos6/Centos7

### 安装rbenv

{% highlight shell %}
sudo yum install -y git-core zlib zlib-devel gcc-c++ patch readline readline-devel libyaml-devel libffi-devel openssl-devel make bzip2 autoconf automake libtool bison curl sqlite-devel
cd
git clone git://github.com/sstephenson/rbenv.git .rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
exec $SHELL

git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bash_profile
exec $SHELL
{% endhighlight %}

### 安装Ruby

{% highlight shell %}
# 安装指定版本的Ruby
rbenv install -v 2.6.0

# 使用指定版本的Ruby
rbenv global 2.2.1

# 如果用命令行ssh登录，可能需要重新连接一下才能看到版本的变化
ruby -v
{% endhighlight %}

然后安装`bundler gem`来管理依赖

{% highlight shell %}
gem install bundler
{% endhighlight %}


如果不想再`gem install`的时候为每个安装的依赖生成一份文档，可以用下面的命令：

{% highlight shell %}
echo "gem: --no-document" > ~/.gemrc
{% endhighlight %}

### 查看Centos版本的方法

{% highlight shell %}
cat /etc/redhat-release
{% endhighlight %}

## 参考

* https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-centos-7
