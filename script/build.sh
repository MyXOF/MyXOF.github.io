#!/usr/bin/env bash
set -e # 出错时中止代码

jekyll build --config _config_ci.yml
htmlproofer ./_site