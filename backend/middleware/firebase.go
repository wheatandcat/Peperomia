package middleware

import (
	"context"
	"net/http"
	"os"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
)

func FirebaseAuthMiddleWare(gc *gin.Context) {
	ctx := context.Background()
	creds, err := google.CredentialsFromJSON(ctx, []byte(os.Getenv("FIREBASE_SERVICE_ACCOUNT_JSON")))
	if err != nil {
		gc.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	opt := option.WithCredentials(creds)
	app, err := firebase.NewApp(context.Background(), nil, opt)
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
	_, err = auth.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		gc.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	gc.Next()
}
