## Status

See http://myxof.github.io/

[![Build Status](http://47.93.242.153:8080/job/myxof-website/badge/icon)](http://47.93.242.153:8080/job/myxof-website/)
[![buddy pipeline](https://app.buddy.works/myxof/myxof-github-io/pipelines/pipeline/165076/badge.svg?token=1c753ad5a15252645fce6cf131a6f75aef7e003bca78429bb04e0a893ca9b42f "buddy pipeline")](https://app.buddy.works/myxof/myxof-github-io/pipelines/pipeline/165076)
[![security](https://hakiri.io/github/MyXOF/MyXOF.github.io/master.svg)](https://hakiri.io/github/MyXOF/MyXOF.github.io/master)
[![CodeFactor](https://www.codefactor.io/repository/github/myxof/myxof.github.io/badge)](https://www.codefactor.io/repository/github/myxof/myxof.github.io)
[![Website](https://img.shields.io/website-up-down-green-red/https/shields.io.svg?label=website)](http://myxof.github.io/)
![](https://img.shields.io/badge/ruby--language-2.5-blue.svg)
![](https://github-size-badge.herokuapp.com/MyXOF/MyXOF.github.io.svg)

## Requirements

* Ruby >= 2.4

当Ruby安装完成之后，还需要安装jekyll

```$xslt
$ gem install jekyll
$ jekyll -version
```

## Usage

```$xslt
$ git clone git@github.com:MyXOF/MyXOF.github.io.git
$ cd MyXOF.github.io
$ bundle install --without test
$ jekyll serve
```

这时候可以去`http://127.0.0.1:4000/`看网站运行的结果。

## 参考

* jekyll教程，https://www.jekyll.com.cn/docs/home/
* 源码学习，https://github.com/github/teach.github.com/tree/content-overflow-fix
