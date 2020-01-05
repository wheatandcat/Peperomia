package handler_test

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	mock_uuidgen "github.com/wheatandcat/Peperomia/backend/client/uuidgen/mocks"
	handler "github.com/wheatandcat/Peperomia/backend/handler"
	repository "github.com/wheatandcat/Peperomia/backend/repository"
)

func JsonEncode(v interface{}) string {
	b, err := json.Marshal(v)

	if err != nil {
		panic(err)
	}

	return string(b)
}

func NewRequest(body string) *http.Request {
	r, _ := http.NewRequest(http.MethodPost, "/", strings.NewReader(body))
	r.Header.Set("Content-Type", "application/json")
	return r
}

func Execute(hf gin.HandlerFunc, req *http.Request) *httptest.ResponseRecorder {
	res := httptest.NewRecorder()
	c, r := gin.CreateTestContext(res)

	r.Use(func(gc *gin.Context) {
		gc.Set("firebaseUID", "test")
		gc.Next()
	})

	r.POST("/", hf)

	c.Request = req

	r.ServeHTTP(res, c.Request)

	return res
}

func NewTestHandler(ctx context.Context) handler.Handler {
	f, _ := firebase.NewApp(ctx, nil)
	fc, _ := f.Firestore(ctx)

	app := &handler.Application{
		ItemRepository:       repository.NewItemRepository(),
		ItemDetailRepository: repository.NewItemDetailRepository(),
	}

	client := &handler.Client{
		UUID: &mock_uuidgen.UUID{},
	}

	return handler.Handler{
		FirebaseApp:     f,
		FirestoreClient: fc,
		App:             app,
		Client:          client,
	}
}
