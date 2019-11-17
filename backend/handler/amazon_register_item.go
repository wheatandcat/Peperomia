package handler

import (
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	repository "github.com/wheatandcat/Peperomia/backend/repository"
)

// AmazonRegisterItemRequest is AmazonRegisterItem request
type AmazonRegisterItemRequest struct {
	Item        repository.PreResisterItemRecord         `json:"item" binding:"required"`
	ItemDetails []repository.PreResisterItemDetailRecord `json:"itemDetails" binding:"required"`
}

// AmazonRegisterItem Alexa経由で予定を登録する
func (h *Handler) AmazonRegisterItem(gc *gin.Context) {
	ctx := context.Background()
	req := &AmazonRegisterItemRequest{}
	if err := gc.Bind(req); err != nil {
		gc.JSON(http.StatusInternalServerError, err)
		return
	}

	uid, err := GetSelfAmazonUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}
	pri := repository.NewPreResisterItemRepository()

	i := repository.PreResisterRecord{
		ID:          strconv.Itoa(int(time.Now().Unix())),
		AmazonUID:   uid,
		Item:        req.Item,
		ItemDetails: req.ItemDetails,
		Registered:  false,
	}

	if err := pri.Create(ctx, h.FirestoreClient, i); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	gc.JSON(http.StatusCreated, nil)
}
