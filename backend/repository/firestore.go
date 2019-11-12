package repository

import (
	"context"

	"cloud.google.com/go/firestore"
)

// FirestoreClient Firestore Client
func FirestoreClient(ctx context.Context) (*firestore.Client, error) {
	app, err := FirebaseApp(ctx)
	if err != nil {
		return nil, err
	}

	return app.Firestore(ctx)
}
