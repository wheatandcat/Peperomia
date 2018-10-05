package field

import (
	"github.com/graphql-go/graphql"
)

func Hello() *graphql.Field {
	return &graphql.Field{
		Type: graphql.String,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			return "Hello Worker World!", nil
		},
	}
}
