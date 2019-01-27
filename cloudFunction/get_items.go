package app

import (
	"context"
	"encoding/json"
	"net/http"
	"time"
)

func GetItem(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	client, err := getFireBaseClient(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	day := time.Now().In(jst).Format("2006-01-02")

	matchItem := client.Collection("results").Where("day", "==", day).Documents(ctx)
	docs, err := matchItem.GetAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := []interface{}{}
	for _, doc := range docs {
		data = append(data, doc.Data())
	}

	w.Header().Set("Content-Type", "application/json")
	res, err := json.Marshal(data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write(res)
}
