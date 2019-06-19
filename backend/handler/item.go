package handler

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	repository "github.com/wheatandcat/Peperomia/backend/repository"
)

// SyncItemsRequest is SyncItemsRequest request
type SyncItemsRequest struct {
	Items       []repository.ItemRecord       `json:"items" binding:"required"`
	ItemDetails []repository.ItemDetailRecord `json:"itemDetails" binding:"required"`
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

	// データ削除
	if err := ir.DeleteByUID(ctx, h.FirestoreClient, uid); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}
	if err := idr.DeleteByUID(ctx, h.FirestoreClient, uid); err != nil {
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
		if err := idr.CreateItemDetail(ctx, h.FirestoreClient, itemDetail); err != nil {
			NewErrorResponse(err).Render(gc)
			return
		}
	}

	gc.JSON(http.StatusCreated, nil)
}
