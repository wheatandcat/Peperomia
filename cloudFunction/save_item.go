package app

import (
	"context"
	"encoding/json"
	"net/http"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

type Item struct {
	Status string `json:"status"`
}

// HelloGet is an HTTP Cloud Function.
func SaveItem(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	opt := option.WithCredentialsFile("serviceAccountKey.json")
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, _, err = client.Collection("users").Add(ctx, map[string]interface{}{
		"first": "Ada",
		"last":  "Lovelace",
		"born":  1815,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	i := Item{Status: "OK"}
	res, err := json.Marshal(i)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

// [END functions_helloworld_get]
