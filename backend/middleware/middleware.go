package middleware

import firebase "firebase.google.com/go"

type Middleware struct {
	FirebaseApp *firebase.App
}

func NewMiddleware(f *firebase.App) *Middleware {
	return &Middleware{
		FirebaseApp: f,
	}
}
