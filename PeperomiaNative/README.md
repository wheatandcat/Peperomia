# Peperomia


# ローカルでの実行手順

初期設定

```
cp -r app.json.template app.json
cp -r .env.template .env
cd android
cp -r google-services.json.template google-services.json
```

## Firebaseのアカウントを持っている場合
①. 「.env.template」の下記の値に自身のFirebaseの情報を追記

```
FIRE_BASE_API_KEY=""
FIRE_BASE_AUTH_DOMAIN=""
FIRE_BASE_DATABASE_URL=""
FIRE_BASE_PROJECT_ID=""
FIRE_BASE_STORAGE_BUCKET=""
FIRE_BASE_MESSAGING_SENDER_ID=""
```

②.「.env.template」を「.env」にリネーム
③.「yarn start」で起動させる

## Firebaseのアカウントを持っていない場合
①. 「.env.template」を「.env」にリネーム
②. 「src/lib/firebase.ts」の下記をコメントアウト

```
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
```
③.「yarn start」で起動させる

# start

```
yarn start
```

## android

```
avdmanager create avd -n Nexus -k "system-images;android-28;google_apis;x86" -b x86 -c 100M -d 7 -f --device 'Nexus 5X'
emulator -avd Nexus
```

```
avdmanager create avd -n Pixel -k "system-images;android-28;google_apis;x86" -b x86 -c 100M -d 7 -f --device 'Pixel XL'
emulator -avd Pixel
```



# build

## ios

```
npm run build:ios
```

## android


```
npm run build:android
```


## e2e

```
yarn start
yarn e2e
```

## storybook 

```
yarn storybook 
yarn storybook-server
```


## storybook deploy 

```
yarn storybook:copy
expo-cli publish --config storybook/app.json
```
