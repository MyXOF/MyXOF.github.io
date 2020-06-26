#!/bin/bash

comment_msg="部署脚本更新"

bundle install --without test

cd ../
mkdir myxof-publish
cd myxof-publish
cp -r ../MyXOF.github.io/_site/ ./
git init
git remote add origin git@github.com:MyXOF/MyXOF.github.io.git
git add -A
git commit -m "${comment_msg}"
git push -f origin master

cd ../
rm -rf myxof-publish



