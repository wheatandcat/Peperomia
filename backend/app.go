package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/wheatandcat/Peperomia/backend/handler"
	"github.com/wheatandcat/Peperomia/backend/middleware"
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

	r.Use(middleware.FirebaseAuthMiddleWare)

	h := handler.NewHandler()

	r.POST("/SaveUser", h.SaveUser)
	r.Run()
}
