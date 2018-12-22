#!/usr/bin/env bash
set -e # 出错时中止代码


rm -rf _site/
jekyll build --config _config.yml
# htmlproofer ./_site
