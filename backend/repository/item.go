package repository

import (
	"context"
	"strconv"

	"cloud.google.com/go/firestore"
)

// ItemRepository is repository for item
type ItemRepository struct {
}

// ItemRecord is item data
type ItemRecord struct {
	ID        int32  `json:"id" firestore:"id" binding:"required"`
	UID       string `json:"uid" firestore:"uid"`
	Title     string `json:"title" firestore:"title" binding:"required"`
	Kink      string `json:"kind" firestore:"kind" binding:"required"`
	Image     string `json:"image" firestore:"image"`
	ImagePath string `json:"imagePath" firestore:"imagePath"`
}

// ItemDetailRecord is itemDetail data
type ItemDetailRecord struct {
	ID          int32  `json:"id" firestore:"id" binding:"required"`
	UID         string `json:"uid" firestore:"uid"`
	ItemID      int32  `json:"itemId" firestore:"itemId" binding:"required"`
	Title       string `json:"title" firestore:"title" binding:"required"`
	Kink        string `json:"kind" firestore:"kind" binding:"required"`
	MoveMinutes int32  `json:"moveMinutes" firestore:"moveMinutes"`
	Priority    int32  `json:"priority" firestore:"priority"`
}

// NewItemRepository is Create new ItemRepository
func NewItemRepository() *ItemRepository {
	return &ItemRepository{}
}

func getItemDocID(uID string, itemID int32) string {
	id := strconv.Itoa(int(itemID))
	doc := uID + "_" + id

	return doc
}

func getItemDetailDocID(itemID int32, itemDetailID int32) string {
	id := strconv.Itoa(int(itemID))
	did := strconv.Itoa(int(itemDetailID))
	doc := id + "_" + did

	return doc
}

// Create アイテムを作成する
func (re *ItemRepository) Create(ctx context.Context, f *firestore.Client, i ItemRecord) error {
	iDoc := getItemDocID(i.UID, i.ID)

	_, err := f.Collection("items").Doc(iDoc).Set(ctx, i)

	return err
}

// CreateItemDetail アイテム詳細を作成する
func (re *ItemRepository) CreateItemDetail(ctx context.Context, f *firestore.Client, i ItemDetailRecord) error {
	iDoc := getItemDocID(i.UID, i.ItemID)
	idDoc := getItemDetailDocID(i.ItemID, i.ID)

	_, err := f.Collection("items").Doc(iDoc).Collection("itemDetails").Doc(idDoc).Set(ctx, i)

	return err
}
