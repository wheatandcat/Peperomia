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
	Kind      string `json:"kind" firestore:"kind" binding:"required"`
	Image     string `json:"image" firestore:"image"`
	ImagePath string `json:"imagePath" firestore:"imagePath"`
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

// Create アイテムを作成する
func (re *ItemRepository) Create(ctx context.Context, f *firestore.Client, i ItemRecord) error {
	iDoc := getItemDocID(i.UID, i.ID)

	_, err := f.Collection("items").Doc(iDoc).Set(ctx, i)

	return err
}

// FindByUID ユーザーIDから取得する
func (re *ItemRepository) FindByUID(ctx context.Context, f *firestore.Client, uid string) ([]ItemRecord, error) {
	var items []ItemRecord
	matchItem := f.Collection("items").Where("uid", "==", uid).Documents(ctx)
	docs, err := matchItem.GetAll()
	if err != nil {
		return items, err
	}

	for _, doc := range docs {
		var item ItemRecord
		doc.DataTo(&item)
		items = append(items, item)
	}

	return items, nil
}

// DeleteByUID ユーザーIDから削除する
func (re *ItemRepository) DeleteByUID(ctx context.Context, f *firestore.Client, uid string) error {
	matchItem := f.Collection("items").Where("uid", "==", uid).Documents(ctx)
	docs, err := matchItem.GetAll()
	if err != nil {
		return err
	}

	for _, doc := range docs {
		if _, err := doc.Ref.Delete(ctx); err != nil {
			return err
		}
	}

	return nil
}
