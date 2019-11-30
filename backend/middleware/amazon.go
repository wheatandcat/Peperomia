package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	client "github.com/wheatandcat/Peperomia/backend/client"
)

// AmazonAuthMiddleWare Amazon Auth Middleware
func (m *Middleware) AmazonAuthMiddleWare(gc *gin.Context) {
	idToken := strings.Replace(gc.GetHeader("Authorization"), "Bearer ", "", 1)

	ac := client.NewAmazonClient(idToken)
	aUID, err := ac.GetUserID()
	if err != nil {
		gc.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	gc.Set("amazonUID", aUID)

	gc.Next()
}
