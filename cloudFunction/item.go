package app

type Item struct {
	Status string `json:"status" firestore:"status"`
	Day    string `json:"date" firestore:"day"`
}
