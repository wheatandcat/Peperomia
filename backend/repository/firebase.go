package repository

import (
	"context"
	"os"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

// FirebaseApp Firebase App
func FirebaseApp(ctx context.Context) (*firebase.App, error) {
	opt := option.WithCredentialsFile("serviceAccount.json")
	config := &firebase.Config{ProjectID: os.Getenv("FIREBASE_PROJECT_ID")}

	return firebase.NewApp(ctx, config, opt)
}
