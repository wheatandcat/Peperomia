sh createDevelopmentAppjson.sh
cp -r .env.development .env
cd android
cp -r google-services.development.json google-services.json
cd ../ios
cp -r GoogleService-Info.development.plist GoogleService-Info.plist