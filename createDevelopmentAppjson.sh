iosGoogleSignInClientId=`jq  '.iosGoogleSignInClientId' config/development.json`
sentryAuthToken=`jq '.sentryAuthToken' config/development.json`
firebaseApiKey=`jq  '.firebaseApiKey' config/development.json`
measurementId=`jq '.measurementId' config/development.json`
bugsnagApiKey=`jq '.bugsnagApiKey' config/development.json`

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