package handler

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	domain "github.com/wheatandcat/Peperomia/backend/domain"
	repository "github.com/wheatandcat/Peperomia/backend/repository"
)

// SyncItemsRequest is SyncItemsRequest request
type SyncItemsRequest struct {
	Items       []domain.ItemRecord       `json:"items" binding:"required"`
	ItemDetails []domain.ItemDetailRecord `json:"itemDetails" binding:"required"`
	Calendars   []domain.CalendarRecord   `json:"calendars"`
}

// CreateItemRequest is CreateItem request
type CreateItemRequest struct {
	Item CreateItem `json:"item" binding:"required"`
}

// CreateItem is CreateItem request
type CreateItem struct {
	Title string `json:"title" binding:"required"`
	Kind  string `json:"kind" binding:"required"`
}

// UpdateItemRequest is UpdateItem request
type UpdateItemRequest struct {
	Item UpdateItem `json:"item" binding:"required"`
}

// UpdateItem is UpdateItem request
type UpdateItem struct {
	ID    string `json:"id" binding:"required"`
	Title string `json:"title" binding:"required"`
	Kind  string `json:"kind" binding:"required"`
}

// DeleteItemRequest is DeleteItem request
type DeleteItemRequest struct {
	Item DeleteItem `json:"item" binding:"required"`
}

// DeleteItem is DeleteItem request
type DeleteItem struct {
	ID string `json:"id" binding:"required"`
}

// CreateItem 予定を作成する
func (h *Handler) CreateItem(gc *gin.Context) {
	ctx := context.Background()
	req := &CreateItemRequest{}
	if err := gc.Bind(req); err != nil {
		gc.JSON(http.StatusInternalServerError, err)
		return
	}

	uid, err := GetSelfUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	item := domain.ItemRecord{
		ID:    h.Client.UUID.Get(),
		Title: req.Item.Title,
		Kind:  req.Item.Kind,
		UID:   uid,
	}

	if err := h.App.ItemRepository.Create(ctx, h.FirestoreClient, item); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	gc.JSON(http.StatusCreated, item)
}

// UpdateItem 予定を更新する
func (h *Handler) UpdateItem(gc *gin.Context) {
	ctx := context.Background()
	req := &UpdateItemRequest{}
	if err := gc.Bind(req); err != nil {
		gc.JSON(http.StatusInternalServerError, err)
		return
	}

	uid, err := GetSelfUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	item := domain.ItemRecord{
		ID:    req.Item.ID,
		Title: req.Item.Title,
		Kind:  req.Item.Kind,
		UID:   uid,
	}

	if err := h.App.ItemRepository.Update(ctx, h.FirestoreClient, item); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	gc.JSON(http.StatusOK, nil)
}

// DeleteItem 予定を削除する
func (h *Handler) DeleteItem(gc *gin.Context) {
	ctx := context.Background()
	req := &DeleteItemRequest{}
	if err := gc.Bind(req); err != nil {
		gc.JSON(http.StatusInternalServerError, err)
		return
	}

	uid, err := GetSelfUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	item := domain.ItemRecord{
		ID:  req.Item.ID,
		UID: uid,
	}

	if err := h.App.ItemRepository.Delete(ctx, h.FirestoreClient, item); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	gc.JSON(http.StatusOK, nil)
}

// SyncItems アイテムを同期させる
func (h *Handler) SyncItems(gc *gin.Context) {
	ctx := context.Background()
	req := &SyncItemsRequest{}
	if err := gc.Bind(req); err != nil {
		gc.JSON(http.StatusInternalServerError, err)
		return
	}

	uid, err := GetSelfUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}
	ir := repository.NewItemRepository()
	idr := repository.NewItemDetailRepository()
	cr := repository.NewCalendarRepository()

	// データ削除
	if err := ir.DeleteByUID(ctx, h.FirestoreClient, uid); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}
	if err := idr.DeleteByUID(ctx, h.FirestoreClient, uid); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}
	if err := cr.DeleteByUID(ctx, h.FirestoreClient, uid); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	// データ同期
	for _, item := range req.Items {
		item.UID = uid
		if err := ir.Create(ctx, h.FirestoreClient, item); err != nil {
			NewErrorResponse(err).Render(gc)
			return
		}
	}

	for _, itemDetail := range req.ItemDetails {
		itemDetail.UID = uid
		if err := idr.Create(ctx, h.FirestoreClient, itemDetail); err != nil {
			NewErrorResponse(err).Render(gc)
			return
		}
	}

	for _, calendar := range req.Calendars {
		calendar.UID = uid
		if err := cr.Create(ctx, h.FirestoreClient, calendar); err != nil {
			NewErrorResponse(err).Render(gc)
			return
		}
	}

	gc.JSON(http.StatusCreated, nil)
}
