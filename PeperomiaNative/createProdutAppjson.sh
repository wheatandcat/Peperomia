iosGoogleSignInClientId=`jq  '.iosGoogleSignInClientId' config/product.json`
sentryAuthToken=`jq '.sentryAuthToken' config/product.json`


# ダブルコーテーションを除外
iosGoogleSignInClientId=${iosGoogleSignInClientId:1}
iosGoogleSignInClientId=${iosGoogleSignInClientId%\"}

sentryAuthToken=${sentryAuthToken:1}
sentryAuthToken=${sentryAuthToken%\"}

#echo ${iosGoogleSignInClientId}
#echo $sentryAuthToken

jq -n --arg iosGoogleSignInClientId $iosGoogleSignInClientId --arg sentryAuthToken $sentryAuthToken -f appBase.jq | tee app.json