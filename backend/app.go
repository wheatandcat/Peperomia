package main

import (
	"net/http"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/wheatandcat/Shiori/backend/field"
	"google.golang.org/appengine"
)

func main() {
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    field.Query,
		Mutation: field.Mutation,
	})

	if err != nil {
		panic(err)
	}

	h := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})

	http.Handle("/graphql", h)
	appengine.Main()
}
