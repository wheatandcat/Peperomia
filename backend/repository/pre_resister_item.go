package repository

import (
	"context"
	"time"

	"cloud.google.com/go/firestore"
)

// PreResisterItemRepository is repository for pre resister item
type PreResisterItemRepository struct {
}

// PreResisterItemRecord is item data
type PreResisterItemRecord struct {
	Title string     `json:"title" firestore:"title" binding:"required"`
	Date  *time.Time `json:"date" firestore:"date"`
}

// PreResisterItemDetailRecord is item data
type PreResisterItemDetailRecord struct {
	Title string `json:"title" firestore:"title" binding:"required"`
}

// PreResisterRecord is item data
type PreResisterRecord struct {
	ID          string                        `json:"id" firestore:"id"`
	AmazonUID   string                        `json:"amazonUID" firestore:"amazonUID"`
	Item        PreResisterItemRecord         `json:"item" firestore:"item"`
	ItemDetails []PreResisterItemDetailRecord `json:"itemDetails" firestore:"itemDetails"`
	Registered  bool                          `json:"registered" firestore:"registered"`
}

// NewPreResisterItemRepository is Create new PreResisterItemRepository
func NewPreResisterItemRepository() *PreResisterItemRepository {
	return &PreResisterItemRepository{}
}

func (re *PreResisterItemRepository) getDocID(uID string, ID string) string {
	doc := uID + "_" + ID

	return doc
}

// Create アイテムを作成する
func (re *PreResisterItemRepository) Create(ctx context.Context, f *firestore.Client, i PreResisterRecord) error {
	iDoc := re.getDocID(i.AmazonUID, i.ID)

	_, err := f.Collection("preResisterItems").Doc(iDoc).Set(ctx, i)

	return err
}
