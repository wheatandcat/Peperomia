package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) SaveUser(gc *gin.Context) {
	gc.JSON(http.StatusOK, nil)
}
