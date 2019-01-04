## Status

See http://myxof.github.io/

[![Build Status](https://travis-ci.org/MyXOF/MyXOF.github.io.svg?branch=master)](https://travis-ci.org/MyXOF/MyXOF.github.io)
[![buddy pipeline](https://app.buddy.works/myxof/myxof-github-io/pipelines/pipeline/165076/badge.svg?token=1c753ad5a15252645fce6cf131a6f75aef7e003bca78429bb04e0a893ca9b42f "buddy pipeline")](https://app.buddy.works/myxof/myxof-github-io/pipelines/pipeline/165076)
[![security](https://hakiri.io/github/MyXOF/MyXOF.github.io/master.svg)](https://hakiri.io/github/MyXOF/MyXOF.github.io/master)
[![CodeFactor](https://www.codefactor.io/repository/github/myxof/myxof.github.io/badge)](https://www.codefactor.io/repository/github/myxof/myxof.github.io)
[![Maintainability](https://api.codeclimate.com/v1/badges/c9e520cfb0c097df9b6a/maintainability)](https://codeclimate.com/github/MyXOF/MyXOF.github.io/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c9e520cfb0c097df9b6a/test_coverage)](https://codeclimate.com/github/MyXOF/MyXOF.github.io/test_coverage)
[![codebeat badge](https://codebeat.co/badges/24750fe7-e18b-4584-ad2b-35cba2af5b7e)](https://codebeat.co/projects/github-com-myxof-myxof-github-io-master)

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
