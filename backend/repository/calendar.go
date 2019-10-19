package repository

import (
	"context"
	"strconv"
	"time"

	"cloud.google.com/go/firestore"
)

// CalendarRepository is repository for calendars
type CalendarRepository struct {
}

// CalendarRecord is Calendar data
type CalendarRecord struct {
	ID     int32      `json:"id" firestore:"id" binding:"required"`
	UID    string     `json:"uid" firestore:"uid"`
	ItemID int32      `json:"itemId" firestore:"itemId" binding:"required"`
	Date   *time.Time `json:"date" firestore:"date" binding:"required"`
}

// NewCalendarRepository is Create new CalendarRepository
func NewCalendarRepository() *CalendarRepository {
	return &CalendarRepository{}
}

func getCalendarDocID(uID string, itemID int32, calendarID int32) string {
	id := strconv.Itoa(int(calendarID))
	did := strconv.Itoa(int(itemID))
	doc := uID + "_" + id + "_" + did
	return doc
}

// CreateCalendar アイテム詳細を作成する
func (re *CalendarRepository) CreateCalendar(ctx context.Context, f *firestore.Client, i CalendarRecord) error {
	idDoc := getCalendarDocID(i.UID, i.ItemID, i.ID)

	_, err := f.Collection("calendars").Doc(idDoc).Set(ctx, i)

	return err
}

// DeleteByUID ユーザーIDから削除する
func (re *CalendarRepository) DeleteByUID(ctx context.Context, f *firestore.Client, uid string) error {
	matchItem := f.Collection("calendars").Where("uid", "==", uid).Documents(ctx)
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
