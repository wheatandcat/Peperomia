# ペペロミア Alexa スキル

## 初期設定

```
$ npm i -g ask-cli
$ ask init
$ cd lambda/custom
$ npm i
```

## デプロイ

```
$ yarn clean
$ yarn pjson
$ yarn build
$ ask deploy
```

一括で実行
```
$ yarn clean && yarn pjson && yarn build && ask deploy
```

## テスト


```
$ ask dialog -l ja-JP

  User  >  ペペロミアを開いて
  Alexa >  作成したい予定を教えて下さい
  User  >  上野駅 の予定を 明後日 に作成
  Alexa >  2019-11-14に渋谷。予定の中身を教えてください。
  User  >  上野駅 と 上野公園 と 上野美術館 を追加
  Alexa >  上野駅に上野公園と上野美術館を追加しました。
```

 or 

```
$ ask simulate -l ja-JP -t "ペペロミアを開いて"
```