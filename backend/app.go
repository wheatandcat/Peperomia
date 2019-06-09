package main

import (
	"context"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/wheatandcat/Peperomia/backend/handler"
	"github.com/wheatandcat/Peperomia/backend/middleware"
	"github.com/wheatandcat/Peperomia/backend/repository"
)

func main() {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"https://foo.com"},
		AllowMethods: []string{
			http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions,
		},
		AllowHeaders: []string{
			"Authorization",
			"Content-Type",
			"Cache-Control",
		},
		AllowCredentials: true,
		MaxAge:           86400,
	}))

	ctx := context.Background()
	f, err := repository.FirebaseApp(ctx)
	if err != nil {
		panic(err)
	}

	m := middleware.NewMiddleware(f)

	r.Use(m.FirebaseAuthMiddleWare)

	h, err := handler.NewHandler(ctx, f)
	if err != nil {
		panic(err)
	}

	r.POST("/CreateUser", h.CreateUser)
	r.Run()
}
