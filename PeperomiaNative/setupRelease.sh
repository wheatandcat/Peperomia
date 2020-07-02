sh createProdutAppjson.sh
cp -r .env.product .env
cd android
cp -r google-services.product.json google-services.json
cd ../ios
cp -r GoogleService-Info.product.plist GoogleService-Info.plist