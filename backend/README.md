# backend

## 準備

```
$ go mod download
```

or

```
$ go mod tidy
```


## ローカル実行

```
$ dev_appserver.py app.yaml
```

## テスト

```
$ go test ./handler
```


カバレッジ確認

```
$ go test -coverprofile=cover.out ./handler
```

## デプロイ

```
$ gcloud app deploy
```

# ツール

## APIドキュメント

https://app.swaggerhub.com/apis-docs/wheatandcat/peperomia/1.0.0