package domain

import (
	"context"
	"time"

	"cloud.google.com/go/firestore"
)

// ItemRecord is item data
type ItemRecord struct {
	ID        string    `json:"id" firestore:"id" binding:"required"`
	UID       string    `json:"uid" firestore:"uid"`
	Title     string    `json:"title" firestore:"title" binding:"required"`
	Kind      string    `json:"kind" firestore:"kind" binding:"required"`
	CreatedAt time.Time `json:"-" firestore:"createdAt"`
	UpdatedAt time.Time `json:"-" firestore:"updatedAt"`
}

// ItemRepository is repository interface
type ItemRepository interface {
	Create(ctx context.Context, f *firestore.Client, i ItemRecord) error
	Update(ctx context.Context, f *firestore.Client, i ItemRecord) error
	Delete(ctx context.Context, f *firestore.Client, i ItemRecord) error
	FindByUID(ctx context.Context, f *firestore.Client, uid string) ([]ItemRecord, error)
	DeleteByUID(ctx context.Context, f *firestore.Client, uid string) error
}
