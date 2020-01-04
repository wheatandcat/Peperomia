package repository

import (
	"context"

	"cloud.google.com/go/firestore"

	"github.com/wheatandcat/Peperomia/backend/domain"
)

// ItemRepository is repository for item
type ItemRepository struct {
}

// NewItemRepository is Create new ItemRepository
func NewItemRepository() domain.ItemRepository {
	return &ItemRepository{}
}

func getItemDocID(uID string, itemID string) string {
	doc := uID + "_" + itemID

	return doc
}

// Create アイテムを作成する
func (re *ItemRepository) Create(ctx context.Context, f *firestore.Client, i domain.ItemRecord) error {
	iDoc := getItemDocID(i.UID, i.ID)

	_, err := f.Collection("items").Doc(iDoc).Set(ctx, i)

	return err
}

// Update アイテムを更新する
func (re *ItemRepository) Update(ctx context.Context, f *firestore.Client, i domain.ItemRecord) error {
	iDoc := getItemDocID(i.UID, i.ID)

	_, err := f.Collection("items").Doc(iDoc).Set(ctx, i)

	return err
}

// Delete アイテムを削除する
func (re *ItemRepository) Delete(ctx context.Context, f *firestore.Client, i domain.ItemRecord) error {
	iDoc := getItemDocID(i.UID, i.ID)

	_, err := f.Collection("items").Doc(iDoc).Delete(ctx)

	return err
}

// FindByUID ユーザーIDから取得する
func (re *ItemRepository) FindByUID(ctx context.Context, f *firestore.Client, uid string) ([]domain.ItemRecord, error) {
	var items []domain.ItemRecord
	matchItem := f.Collection("items").Where("uid", "==", uid).Documents(ctx)
	docs, err := matchItem.GetAll()
	if err != nil {
		return items, err
	}

	for _, doc := range docs {
		var item domain.ItemRecord
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
