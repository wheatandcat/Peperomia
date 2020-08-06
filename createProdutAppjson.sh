iosGoogleSignInClientId=`jq  '.iosGoogleSignInClientId' config/product.json`
sentryAuthToken=`jq '.sentryAuthToken' config/product.json`
firebaseApiKey=`jq  '.firebaseApiKey' config/product.json`
measurementId=`jq '.measurementId' config/product.json`
bugsnagApiKey=`jq '.bugsnagApiKey' config/product.json`

# ダブルコーテーションを除外
iosGoogleSignInClientId=${iosGoogleSignInClientId:1}
iosGoogleSignInClientId=${iosGoogleSignInClientId%\"}

sentryAuthToken=${sentryAuthToken:1}
sentryAuthToken=${sentryAuthToken%\"}

firebaseApiKey=${firebaseApiKey:1}
firebaseApiKey=${firebaseApiKey%\"}

measurementId=${measurementId:1}
measurementId=${measurementId%\"}

bugsnagApiKey=${bugsnagApiKey:1}
bugsnagApiKey=${bugsnagApiKey%\"}

jq -n --arg iosGoogleSignInClientId $iosGoogleSignInClientId --arg sentryAuthToken $sentryAuthToken --arg firebaseApiKey $firebaseApiKey --arg measurementId $measurementId --arg bugsnagApiKey $bugsnagApiKey -f appBase.jq | tee app.json