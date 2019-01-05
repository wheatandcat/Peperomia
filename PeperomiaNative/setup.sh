#!/bin/bash -e

# query expo.io to find most recent ipaUrl
IPA_URL=`curl https://expo.io/--/api/v2/versions |  python -c 'import sys, json; print json.load(sys.stdin)["iosUrl"]'`

# download tar.gz
TMP_PATH=/tmp/exponent.tar.gz
wget -O $TMP_PATH $IPA_URL

# recursively make app dir
APP_PATH=bin/Exponent.app
mkdir -p $APP_PATH

# unzip tar.gz into APP_PATH
tar -C $APP_PATH -xzf $TMP_PATH
