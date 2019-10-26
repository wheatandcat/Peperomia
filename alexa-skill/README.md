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
$ ask deploy
```

## テスト


```
$ ask dialog -l ja-JP

  User  >  ペペロミアを開いて
  Alexa >  ようこそ。追加したい予定を教えて下さい
```

 or 

```
$ ask simulate -l ja-JP -t "ペペロミアを開いて"
```