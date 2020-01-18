package domain

import (
	"context"
	"time"

	"cloud.google.com/go/firestore"
)

// CalendarRecord is Calendar data
type CalendarRecord struct {
	ID     string     `json:"id" firestore:"id" binding:"required"`
	UID    string     `json:"uid" firestore:"uid"`
	ItemID string     `json:"itemId" firestore:"itemId" binding:"required"`
	Date   *time.Time `json:"date" firestore:"date" binding:"required"`
}

// CalendarRepository is repository interface
type CalendarRepository interface {
	Create(ctx context.Context, f *firestore.Client, i CalendarRecord) error
	Update(ctx context.Context, f *firestore.Client, i CalendarRecord) error
	Delete(ctx context.Context, f *firestore.Client, i CalendarRecord) error
	DeleteByUID(ctx context.Context, f *firestore.Client, uid string) error
	DeleteByItemID(ctx context.Context, f *firestore.Client, itemID string) error
}
