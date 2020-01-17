package domain

import (
	"context"

	"cloud.google.com/go/firestore"
)

// ItemDetailRecord is itemDetail data
type ItemDetailRecord struct {
	ID          string `json:"id" firestore:"id" binding:"required"`
	UID         string `json:"uid" firestore:"uid"`
	ItemID      string `json:"itemId" firestore:"itemId" binding:"required"`
	Title       string `json:"title" firestore:"title" binding:"required"`
	Kind        string `json:"kind" firestore:"kind" binding:"required"`
	MoveMinutes int    `json:"moveMinutes" firestore:"moveMinutes"`
	Place       string `json:"place" firestore:"place"`
	URL         string `json:"url" firestore:"url"`
	Memo        string `json:"memo" firestore:"memo"`
	Priority    int    `json:"priority" firestore:"priority"`
}

// ItemDetailRepository is repository interface
type ItemDetailRepository interface {
	Create(ctx context.Context, f *firestore.Client, i ItemDetailRecord) error
	Update(ctx context.Context, f *firestore.Client, i ItemDetailRecord) error
	Delete(ctx context.Context, f *firestore.Client, i ItemDetailRecord) error
	DeleteByUID(ctx context.Context, f *firestore.Client, uid string) error
	DeleteByItemID(ctx context.Context, f *firestore.Client, itemID string) error
}
