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

## テスト


```
$ ask dialog -l ja-JP

  User  >  ペペロミアを開いて
  Alexa >  作成したい予定を教えて下さい
  User  >  明日 に 渋谷 の予定を作成
  Alexa >  2019-10-27に渋谷の予定を作成しました
  User  >
```

 or 

```
$ ask simulate -l ja-JP -t "ペペロミアを開いて"
```