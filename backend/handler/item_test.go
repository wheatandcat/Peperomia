package handler_test

import (
	"context"
	"net/http/httptest"
	"testing"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	mock_uuidgen "github.com/wheatandcat/Peperomia/backend/client/uuidgen/mocks"
	"github.com/wheatandcat/Peperomia/backend/domain"
	mock_domain "github.com/wheatandcat/Peperomia/backend/domain/mocks"
	handler "github.com/wheatandcat/Peperomia/backend/handler"
)

func TestCreate(t *testing.T) {
	res := httptest.NewRecorder()
	gin.SetMode(gin.TestMode)
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	ctx := context.Background()
	f, _ := firebase.NewApp(ctx, nil)

	mock := mock_domain.NewMockItemRepository(ctrl)
	i := domain.ItemRecord{
		ID:    "sample-uuid-string",
		UID:   "test",
		Title: "test",
		Kind:  "test",
	}

	mock.EXPECT().Create(gomock.Any(), gomock.Any(), i).Return(nil).AnyTimes()

	//a := handler.NewApplication(mock)
	//h, _ := handler.NewHandler(ctx, f, a)
	app := &handler.Application{
		ItemRepository: mock,
	}

	fc, _ := f.Firestore(ctx)

	client := &handler.Client{
		UUID: &mock_uuidgen.UUID{},
	}

	h := handler.Handler{
		FirebaseApp:     f,
		FirestoreClient: fc,
		App:             app,
		Client:          client,
	}

	c, r := gin.CreateTestContext(res)

	ci := handler.CreateItem{
		Title: "test",
		Kind:  "test",
	}

	r.Use(func(gc *gin.Context) {
		gc.Set("firebaseUID", "test")
		gc.Next()
	})
	req := handler.CreateItemRequest{
		Item: ci,
	}
	r.POST("/", h.CreateItem)

	c.Request = NewRequest(JsonEncode(req))

	r.ServeHTTP(res, c.Request)

}
