package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	repository "github.com/wheatandcat/Peperomia/backend/repository"
)

func FirebaseAuthMiddleWare(gc *gin.Context) {
	ctx := context.Background()
	app, err := repository.FirebaseApp(ctx)
	if err != nil {
		gc.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	auth, err := app.Auth(context.Background())
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
	//log.Printf("uid: %v\n", token.UID)
	gc.Set("firebaseUID", token.UID)

	gc.Next()
}
