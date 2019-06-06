package repository

import (
	"context"
	"os"

	firebase "firebase.google.com/go"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
)

func FirebaseApp(ctx context.Context) (*firebase.App, error) {
	creds, err := google.CredentialsFromJSON(ctx, []byte(os.Getenv("FIREBASE_SERVICE_ACCOUNT_JSON")))
	if err != nil {
		return nil, err
	}

	opt := option.WithCredentials(creds)
	return firebase.NewApp(context.Background(), nil, opt)
}
