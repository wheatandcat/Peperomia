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

	app := r.Group("")
	{
		app.Use(m.FirebaseAuthMiddleWare)

		h, err := handler.NewHandler(ctx, f)
		if err != nil {
			panic(err)
		}

		app.POST("/CreateUser", h.CreateUser)
		app.POST("/CreateItem", h.CreateItem)
		app.POST("/UpdateItem", h.UpdateItem)
		app.POST("/DeleteItem", h.DeleteItem)
		app.POST("/CreateItemDetail", h.CreateItemDetail)
		app.POST("/UpdateItemDetail", h.UpdateItemDetail)
		app.POST("/DeleteItemDetail", h.DeleteItemDetail)

		app.POST("/SyncItems", h.SyncItems)
		app.POST("/LoginWithAmazon", h.LoginWithAmazon)
	}

	am := r.Group("/amazon")
	{
		am.Use(m.AmazonAuthMiddleWare)
		h, err := handler.NewHandler(ctx, f)
		if err != nil {
			panic(err)
		}

		am.POST("/RegisterItem", h.AmazonRegisterItem)
	}

	r.Run()
}
