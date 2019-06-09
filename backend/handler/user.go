package handler

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	repository "github.com/wheatandcat/Peperomia/backend/repository"
)

// CreateUser ユーザーを作成する
func (h *Handler) CreateUser(gc *gin.Context) {
	ctx := context.Background()
	ur := repository.NewUserRepository()
	uid, err := GetSelfUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	exists, err := ur.ExistsByUID(ctx, h.FirestoreClient, uid)
	if err != nil {
		log.Print(err)

		NewErrorResponse(err).Render(gc)
		return
	}

	if exists {
		// 既に作成済み
		gc.JSON(http.StatusOK, nil)
		return
	}

	u := repository.UserRecord{
		UID:       uid,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	if err := ur.Create(ctx, h.FirestoreClient, u); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	gc.JSON(http.StatusCreated, nil)
}
