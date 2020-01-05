package handler

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/wheatandcat/Peperomia/backend/domain"
)

// CreateCalendarRequest is CreateCalendar request
type CreateCalendarRequest struct {
	Calendar CreateCalendar `json:"calendar" binding:"required"`
}

// CreateCalendar is CreateCalendar request
type CreateCalendar struct {
	ItemID string     `json:"itemID" binding:"required"`
	Date   *time.Time `json:"date" binding:"required"`
}

// UpdateCalendarRequest is UpdateCalendar request
type UpdateCalendarRequest struct {
	Calendar UpdateCalendar `json:"calendar" binding:"required"`
}

// UpdateCalendar is UpdateCalendar request
type UpdateCalendar struct {
	ID     string     `json:"id" binding:"required"`
	ItemID string     `json:"itemID" binding:"required"`
	Date   *time.Time `json:"date" binding:"required"`
}

// DeleteCalendarRequest is DeleteCalendar request
type DeleteCalendarRequest struct {
	Calendar DeleteCalendar `json:"calendar" binding:"required"`
}

// DeleteCalendar is DeleteCalendar request
type DeleteCalendar struct {
	ID     string `json:"id" binding:"required"`
	ItemID string `json:"itemID" binding:"required"`
}

// CreateCalendar 予定の詳細を作成する
func (h *Handler) CreateCalendar(gc *gin.Context) {
	ctx := context.Background()
	req := &CreateCalendarRequest{}
	if err := gc.Bind(req); err != nil {
		gc.JSON(http.StatusInternalServerError, err)
		return
	}

	uid, err := GetSelfUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	item := domain.CalendarRecord{
		ID:     h.Client.UUID.Get(),
		ItemID: req.Calendar.ItemID,
		UID:    uid,
		Date:   req.Calendar.Date,
	}

	if err := h.App.CalendarRepository.Create(ctx, h.FirestoreClient, item); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	gc.JSON(http.StatusCreated, item)
}

// UpdateCalendar 予定の詳細を更新する
func (h *Handler) UpdateCalendar(gc *gin.Context) {
	ctx := context.Background()
	req := &UpdateCalendarRequest{}
	if err := gc.Bind(req); err != nil {
		gc.JSON(http.StatusInternalServerError, err)
		return
	}

	uid, err := GetSelfUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	item := domain.CalendarRecord{
		ID:     req.Calendar.ID,
		ItemID: req.Calendar.ItemID,
		Date:   req.Calendar.Date,
		UID:    uid,
	}

	if err := h.App.CalendarRepository.Update(ctx, h.FirestoreClient, item); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	gc.JSON(http.StatusOK, nil)
}

// DeleteCalendar 予定の詳細を削除する
func (h *Handler) DeleteCalendar(gc *gin.Context) {
	ctx := context.Background()
	req := &DeleteCalendarRequest{}
	if err := gc.Bind(req); err != nil {
		gc.JSON(http.StatusInternalServerError, err)
		return
	}

	uid, err := GetSelfUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	item := domain.CalendarRecord{
		ID:     req.Calendar.ID,
		ItemID: req.Calendar.ItemID,
		UID:    uid,
	}

	if err := h.App.CalendarRepository.Delete(ctx, h.FirestoreClient, item); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	gc.JSON(http.StatusOK, nil)
}
