package handler

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	client "github.com/wheatandcat/Peperomia/backend/client"
	repository "github.com/wheatandcat/Peperomia/backend/repository"
)

// LoginWithAmazonRequest is LoginWithAmazonRequest request
type LoginWithAmazonRequest struct {
	AccessToken string `json:"accessToken" binding:"required"`
}

// LoginWithAmazon is LoginWithAmazon handler
func (h *Handler) LoginWithAmazon(gc *gin.Context) {
	ctx := context.Background()
	req := &LoginWithAmazonRequest{}
	if err := gc.Bind(req); err != nil {
		gc.JSON(http.StatusInternalServerError, err)
		return
	}

	uid, err := GetSelfUID(gc)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	ac := client.NewAmazonClient(req.AccessToken)

	aUID, err := ac.GetUserID()
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	uir := repository.NewUserIntegrationRepository()
	exist, err := uir.ExistsByUID(ctx, h.FirestoreClient, uid)
	if err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	ui := repository.UserIntegrationRecode{
		UID:          uid,
		AmazonUserID: aUID,
	}

	if exist {
		if err := uir.Update(ctx, h.FirestoreClient, ui); err != nil {
			NewErrorResponse(err).Render(gc)
			return
		}

		gc.JSON(http.StatusOK, nil)
		return
	}

	if err := uir.Create(ctx, h.FirestoreClient, ui); err != nil {
		NewErrorResponse(err).Render(gc)
		return
	}

	gc.JSON(http.StatusCreated, nil)
}
