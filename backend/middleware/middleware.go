package middleware

import firebase "firebase.google.com/go"

// Middleware Middleware Type
type Middleware struct {
	FirebaseApp *firebase.App
}

// NewMiddleware Middlewareを作成する
func NewMiddleware(f *firebase.App) *Middleware {
	return &Middleware{
		FirebaseApp: f,
	}
}
