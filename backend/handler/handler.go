package handler

import (
	"context"
	"errors"
	"net/http"

	"github.com/wheatandcat/Peperomia/backend/client/uuidgen"
	repository "github.com/wheatandcat/Peperomia/backend/repository"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"github.com/wheatandcat/Peperomia/backend/domain"
)

// Application is app interface
type Application struct {
	ItemRepository domain.ItemRepository
}

// Client is Client type
type Client struct {
	UUID uuidgen.UUIDGenerator
}

// Handler is Handler type
type Handler struct {
	FirebaseApp     *firebase.App
	FirestoreClient *firestore.Client
	App             *Application
	Client          *Client
}

// ErrorResponse is Error Response
type ErrorResponse struct {
	StatusCode int    `json:"-"`
	ErrorCode  string `json:"code"`
	Message    string `json:"message"`
	Error      error  `json:"-"`
}

// NewApplication アプリケーションを作成する
func newApplication() *Application {
	return &Application{
		ItemRepository: repository.NewItemRepository(),
	}
}

// NewHandler is Craeate Handler
func NewHandler(ctx context.Context, f *firebase.App) (*Handler, error) {
	fc, err := f.Firestore(ctx)
	if err != nil {
		h := &Handler{}
		return h, nil
	}

	client := &Client{
		UUID: &uuidgen.UUID{},
	}

	app := newApplication()

	return &Handler{
		FirebaseApp:     f,
		FirestoreClient: fc,
		App:             app,
		Client:          client,
	}, nil
}

// GetSelfUID 自身のUIDを取得する
func GetSelfUID(gc *gin.Context) (string, error) {
	fuid, ok := gc.Get("firebaseUID")
	if ok {
		uid, ok := fuid.(string)
		if ok {
			return uid, nil
		}
	}

	return "", errors.New("not uid")
}

// GetSelfAmazonUID 自身のAmazonUIDを取得する
func GetSelfAmazonUID(gc *gin.Context) (string, error) {
	fuid, ok := gc.Get("amazonUID")
	if ok {
		uid, ok := fuid.(string)
		if ok {
			return uid, nil
		}
	}

	return "", errors.New("not uid")
}

// NewErrorResponse エラーレスポンス作成する
func NewErrorResponse(err error) *ErrorResponse {
	e := &ErrorResponse{
		ErrorCode:  getErrorCode(),
		StatusCode: getStatusCode(),
		Error:      err,
	}

	if err != nil {
		e.Message = err.Error()
	}

	return e
}

// Render 書き込み
func (e *ErrorResponse) Render(gc *gin.Context) {
	gc.JSON(e.StatusCode, e)
}

func getErrorCode() string {
	return domain.ErrorCodeDefault
}

func getStatusCode() int {
	return http.StatusInternalServerError
}
