## Status

[![Build Status](https://travis-ci.org/MyXOF/MyXOF.github.io.svg?branch=master)](https://travis-ci.org/MyXOF/MyXOF.github.io)
[![security](https://hakiri.io/github/MyXOF/MyXOF.github.io/master.svg)](https://hakiri.io/github/MyXOF/MyXOF.github.io/master)
[![CodeFactor](https://www.codefactor.io/repository/github/myxof/myxof.github.io/badge)](https://www.codefactor.io/repository/github/myxof/myxof.github.io)
[![Maintainability](https://api.codeclimate.com/v1/badges/c9e520cfb0c097df9b6a/maintainability)](https://codeclimate.com/github/MyXOF/MyXOF.github.io/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c9e520cfb0c097df9b6a/test_coverage)](https://codeclimate.com/github/MyXOF/MyXOF.github.io/test_coverage)

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

* https://www.jekyll.com.cn/docs/home/
* https://github.com/github/teach.github.com/tree/content-overflow-fix
