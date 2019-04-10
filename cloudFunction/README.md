## deploy

```
gcloud functions deploy SaveItem --runtime go111 --trigger-http
```

```
gcloud functions deploy GetItem --runtime go111 --trigger-http
```

```
functions deploy SendFeedback --runtime go111 --trigger-http --env-vars-file .env.yaml
```

