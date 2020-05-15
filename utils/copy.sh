#!/bin/sh
cd /Users/zhangli/learning_code/node-learning/01/blog-native/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log