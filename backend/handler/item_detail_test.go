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

func TestCreateItemDetail(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	ctx := context.Background()

	mock := mock_domain.NewMockItemDetailRepository(ctrl)
	i := domain.ItemDetailRecord{
		ID:          "sample-uuid-string",
		ItemID:      "test",
		UID:         "test",
		Title:       "test",
		Kind:        "test",
		Memo:        "test",
		Place:       "test",
		URL:         "test",
		MoveMinutes: 0,
		Priority:    0,
	}

	mock.EXPECT().Create(gomock.Any(), gomock.Any(), i).Return(nil)

	h := NewTestHandler(ctx)
	h.App.ItemDetailRepository = mock

	tests := []struct {
		name       string
		request    handler.CreateItemDetailRequest
		statusCode int
	}{
		{
			name: "ok",
			request: handler.CreateItemDetailRequest{
				ItemDetail: handler.CreateItemDetail{
					ItemID:      "test",
					Title:       "test",
					Kind:        "test",
					Memo:        "test",
					Place:       "test",
					URL:         "test",
					MoveMinutes: 0,
					Priority:    0,
				},
			},
			statusCode: http.StatusCreated,
		},
	}

	for _, td := range tests {
		t.Run(td.name, func(t *testing.T) {
			res := Execute(h.CreateItemDetail, NewRequest(JsonEncode(td.request)))
			assert.Equal(t, td.statusCode, res.Code)
		})
	}
}

func TestUpdateItemDetail(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	ctx := context.Background()

	mock := mock_domain.NewMockItemDetailRepository(ctrl)
	i := domain.ItemDetailRecord{
		ID:          "test",
		ItemID:      "test",
		UID:         "test",
		Title:       "test",
		Kind:        "test",
		Memo:        "test",
		URL:         "test",
		Place:       "test",
		MoveMinutes: 0,
		Priority:    0,
	}

	mock.EXPECT().Update(gomock.Any(), gomock.Any(), i).Return(nil)

	h := NewTestHandler(ctx)
	h.App.ItemDetailRepository = mock

	tests := []struct {
		name       string
		request    handler.UpdateItemDetailRequest
		statusCode int
	}{
		{
			name: "ok",
			request: handler.UpdateItemDetailRequest{
				ItemDetail: handler.UpdateItemDetail{
					ID:          "test",
					ItemID:      "test",
					Title:       "test",
					Kind:        "test",
					Memo:        "test",
					URL:         "test",
					Place:       "test",
					MoveMinutes: 0,
					Priority:    0,
				},
			},
			statusCode: http.StatusOK,
		},
	}

	for _, td := range tests {
		t.Run(td.name, func(t *testing.T) {
			res := Execute(h.UpdateItemDetail, NewRequest(JsonEncode(td.request)))
			assert.Equal(t, td.statusCode, res.Code)
		})
	}
}

func TestDeleteItemDetail(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	ctx := context.Background()

	mock := mock_domain.NewMockItemDetailRepository(ctrl)
	i := domain.ItemDetailRecord{
		ID:     "test",
		ItemID: "test",
		UID:    "test",
	}

	mock.EXPECT().Delete(gomock.Any(), gomock.Any(), i).Return(nil)

	h := NewTestHandler(ctx)
	h.App.ItemDetailRepository = mock

	tests := []struct {
		name       string
		request    handler.DeleteItemDetailRequest
		statusCode int
	}{
		{
			name: "ok",
			request: handler.DeleteItemDetailRequest{
				ItemDetail: handler.DeleteItemDetail{
					ID:     "test",
					ItemID: "test",
				},
			},
			statusCode: http.StatusOK,
		},
	}

	for _, td := range tests {
		t.Run(td.name, func(t *testing.T) {
			res := Execute(h.DeleteItemDetail, NewRequest(JsonEncode(td.request)))
			assert.Equal(t, td.statusCode, res.Code)
		})
	}
}
