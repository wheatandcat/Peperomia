package handler_test

import (
	"context"
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
	"github.com/wheatandcat/Peperomia/backend/domain"
	mock_domain "github.com/wheatandcat/Peperomia/backend/domain/mocks"
	handler "github.com/wheatandcat/Peperomia/backend/handler"
)

func TestCreateItem(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	ctx := context.Background()

	mock := mock_domain.NewMockItemRepository(ctrl)
	i := domain.ItemRecord{
		ID:    "sample-uuid-string",
		UID:   "test",
		Title: "test",
		Kind:  "test",
	}

	mock.EXPECT().Create(gomock.Any(), gomock.Any(), i).Return(nil)

	h := NewTestHandler(ctx)
	h.App.ItemRepository = mock

	tests := []struct {
		name       string
		request    handler.CreateItemRequest
		statusCode int
	}{
		{
			name: "ok",
			request: handler.CreateItemRequest{
				Item: handler.CreateItem{
					Title: "test",
					Kind:  "test",
				},
			},
			statusCode: http.StatusCreated,
		},
	}

	for _, td := range tests {
		t.Run(td.name, func(t *testing.T) {
			res := Execute(h.CreateItem, NewRequest(JsonEncode(td.request)))
			assert.Equal(t, td.statusCode, res.Code)
		})
	}
}

func TestUpdateItem(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	ctx := context.Background()

	mock := mock_domain.NewMockItemRepository(ctrl)
	i := domain.ItemRecord{
		ID:    "test",
		UID:   "test",
		Title: "test",
		Kind:  "test",
	}

	mock.EXPECT().Update(gomock.Any(), gomock.Any(), i).Return(nil)

	h := NewTestHandler(ctx)
	h.App.ItemRepository = mock

	tests := []struct {
		name       string
		request    handler.UpdateItemRequest
		statusCode int
	}{
		{
			name: "ok",
			request: handler.UpdateItemRequest{
				Item: handler.UpdateItem{
					ID:    "test",
					Title: "test",
					Kind:  "test",
				},
			},
			statusCode: http.StatusOK,
		},
	}

	for _, td := range tests {
		t.Run(td.name, func(t *testing.T) {
			res := Execute(h.UpdateItem, NewRequest(JsonEncode(td.request)))
			assert.Equal(t, td.statusCode, res.Code)
		})
	}
}

func TestDeleteItem(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	ctx := context.Background()

	mock1 := mock_domain.NewMockItemRepository(ctrl)
	i := domain.ItemRecord{
		ID:  "test",
		UID: "test",
	}
	mock2 := mock_domain.NewMockItemDetailRepository(ctrl)
	mock3 := mock_domain.NewMockCalendarRepository(ctrl)

	mock1.EXPECT().Delete(gomock.Any(), gomock.Any(), i).Return(nil)
	mock2.EXPECT().DeleteByItemID(gomock.Any(), gomock.Any(), i.ID).Return(nil)
	mock3.EXPECT().DeleteByItemID(gomock.Any(), gomock.Any(), i.ID).Return(nil)

	h := NewTestHandler(ctx)
	h.App.ItemRepository = mock1
	h.App.ItemDetailRepository = mock2
	h.App.CalendarRepository = mock3

	tests := []struct {
		name       string
		request    handler.DeleteItemRequest
		statusCode int
	}{
		{
			name: "ok",
			request: handler.DeleteItemRequest{
				Item: handler.DeleteItem{
					ID: "test",
				},
			},
			statusCode: http.StatusOK,
		},
	}

	for _, td := range tests {
		t.Run(td.name, func(t *testing.T) {
			res := Execute(h.DeleteItem, NewRequest(JsonEncode(td.request)))
			assert.Equal(t, td.statusCode, res.Code)
		})
	}
}
