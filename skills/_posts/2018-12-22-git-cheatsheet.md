---
layout: post
title: Git用法总结
description: （更新中...）.
path: skills/_posts/2018-12-22-git-cheatsheet.md
tags: [reference, skills]
---

* any list
{:toc}

> 总结一下不常用但是却很重要的Git命令 & 操作

## 关联一个远程仓库

在GitHub上有一个仓库，刚好本地有一个文件夹是空的。如果想让这个文件夹里面存放这个仓库的东西，只需要执行下面的几步：

{% highlight shell %}
$ cd 某个文件夹
$ git init
$ git remote add origin git@github.com:MyXOF/MyXOF.github.io.git
$ git pull

// do some changes

$ git add xxx
$ git commit -m "xxx"
$ git push -u origin master
{% endhighlight %}

在第一次推送master分支时，可以加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，以后的推送或者拉取时就可以简化命令。


## Fork别人的项目

### 给别人的项目提交代码

只需照常往自己的分支提交代码，然后在自己的项目里面点击 `create new pull request`，base分支选自己的分支，目标分支选择原来项目的分支即可。

### 让自己的项目代码和原来项目保持一致

{% highlight shell %}
// 这一步没有实际的效果，只是查看下现在自己的仓和哪些远端仓库关联着，默认只会有自己的远端仓库
$ git remote -v
origin  git@github.com:MyXOF/MyXOF.github.io.git (fetch)
origin  git@github.com:MyXOF/MyXOF.github.io.git (push)

$ git remote add upstream Fork的别人仓库Git地址

$ git remote -v
origin  git@github.com:MyXOF/MyXOF.github.io.git (fetch)
origin  git@github.com:MyXOF/MyXOF.github.io.git (push)
upstream  Fork的别人仓库Git地址 (fetch)
upstream  Fork的别人仓库Git地址 (push)

$ git fetch upstream
$ git merge upstream/master
$ git status
$ git push
{% endhighlight %}

## 参考

* https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
