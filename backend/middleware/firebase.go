package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// FirebaseAuthMiddleWare Firebase Auth Middleware
func (m *Middleware) FirebaseAuthMiddleWare(gc *gin.Context) {
	auth, err := m.FirebaseApp.Auth(context.Background())
	if err != nil {
		gc.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	idToken := strings.Replace(gc.GetHeader("Authorization"), "Bearer ", "", 1)
	token, err := auth.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		gc.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	gc.Set("firebaseUID", token.UID)

	gc.Next()
}
