package repository

import (
	"context"
	"strconv"

	"cloud.google.com/go/firestore"
)

// ItemDetailRepository is repository for itemDetail
type ItemDetailRepository struct {
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

// NewItemDetailRepository is Create new ItemDetailRepository
func NewItemDetailRepository() *ItemDetailRepository {
	return &ItemDetailRepository{}
}

func getItemDetailDocID(uID string, itemID int32, itemDetailID int32) string {
	id := strconv.Itoa(int(itemID))
	did := strconv.Itoa(int(itemDetailID))
	doc := uID + "_" + id + "_" + did

	return doc
}

// CreateItemDetail アイテム詳細を作成する
func (re *ItemDetailRepository) CreateItemDetail(ctx context.Context, f *firestore.Client, i ItemDetailRecord) error {
	idDoc := getItemDetailDocID(i.UID, i.ItemID, i.ID)

	_, err := f.Collection("itemDetails").Doc(idDoc).Set(ctx, i)

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
