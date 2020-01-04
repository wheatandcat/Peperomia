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

func TestCreate(t *testing.T) {
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

	app := &handler.Application{
		ItemRepository: mock,
	}

	h := NewTestHandler(ctx, app)

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
