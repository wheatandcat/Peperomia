package handler

import (
	"context"
	"errors"
	"net/http"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
	"github.com/wheatandcat/Peperomia/backend/domain"
	repository "github.com/wheatandcat/Peperomia/backend/repository"
)

type Handler struct {
	FirestoreClient *firestore.Client
}

type ErrorResponse struct {
	StatusCode int    `json:"_"`
	ErrorCode  string `json:"code"`
	Message    string `json:"message"`
	Error      error  `json:"-"`
}

func NewHandler() (*Handler, error) {
	ctx := context.Background()

	f, err := repository.FirestoreClient(ctx)
	if err != nil {
		return nil, err
	}

	return &Handler{
		FirestoreClient: f,
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

func (e *ErrorResponse) Render(gc *gin.Context) {
	gc.JSON(e.StatusCode, e)
}

func getErrorCode() string {
	return domain.ErrorCodeDefault
}

func getStatusCode() int {
	return http.StatusInternalServerError
}
