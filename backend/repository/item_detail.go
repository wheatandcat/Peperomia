package repository

import (
	"context"

	"cloud.google.com/go/firestore"
)

// ItemDetailRepository is repository for itemDetail
type ItemDetailRepository struct {
}

// ItemDetailRecord is itemDetail data
type ItemDetailRecord struct {
	ID          string `json:"id" firestore:"id" binding:"required"`
	UID         string `json:"uid" firestore:"uid"`
	ItemID      string `json:"itemId" firestore:"itemId" binding:"required"`
	Title       string `json:"title" firestore:"title" binding:"required"`
	Kind        string `json:"kind" firestore:"kind" binding:"required"`
	MoveMinutes int32  `json:"moveMinutes" firestore:"moveMinutes"`
	Place       string `json:"place" firestore:"place"`
	URL         string `json:"url" firestore:"url"`
	Memo        string `json:"memo" firestore:"memo"`
	Priority    int32  `json:"priority" firestore:"priority"`
}

// NewItemDetailRepository is Create new ItemDetailRepository
func NewItemDetailRepository() *ItemDetailRepository {
	return &ItemDetailRepository{}
}

func getItemDetailDocID(uID string, itemID string, itemDetailID string) string {
	doc := uID + "_" + itemID + "_" + itemDetailID

	return doc
}

// Create アイテム詳細を作成する
func (re *ItemDetailRepository) Create(ctx context.Context, f *firestore.Client, i ItemDetailRecord) error {
	idDoc := getItemDetailDocID(i.UID, i.ItemID, i.ID)

	_, err := f.Collection("itemDetails").Doc(idDoc).Set(ctx, i)

	return err
}

// Update アイテム詳細を更新する
func (re *ItemDetailRepository) Update(ctx context.Context, f *firestore.Client, i ItemDetailRecord) error {
	idDoc := getItemDetailDocID(i.UID, i.ItemID, i.ID)

	_, err := f.Collection("itemDetails").Doc(idDoc).Set(ctx, i)

	return err
}

// Delete アイテム詳細を削除する
func (re *ItemDetailRepository) Delete(ctx context.Context, f *firestore.Client, i ItemDetailRecord) error {
	idDoc := getItemDetailDocID(i.UID, i.ItemID, i.ID)

	_, err := f.Collection("itemDetails").Doc(idDoc).Delete(ctx)

	return err
}

// DeleteByUID ユーザーIDから削除する
func (re *ItemDetailRepository) DeleteByUID(ctx context.Context, f *firestore.Client, uid string) error {
	matchItem := f.Collection("itemDetails").Where("uid", "==", uid).Documents(ctx)
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
