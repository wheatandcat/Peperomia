package repository

import (
	"context"
	"time"

	"cloud.google.com/go/firestore"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
)

// UserRepository is repository for user
type UserRepository struct {
}

// UserRecord is user data
type UserRecord struct {
	UID       string    `json:"uid" firestore:"uid"`
	CreatedAt time.Time `json:"createdAt" firestore:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt" firestore:"updatedAt"`
}

// NewUserRepository is Create new UserRepository
func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

// Create ユーザーを作成する
func (re *UserRepository) Create(ctx context.Context, f *firestore.Client, u UserRecord) error {
	_, err := f.Collection("users").Doc(u.UID).Set(ctx, u)

	return err
}

// FindByUID ユーザーIDから取得する
func (re *UserRepository) FindByUID(ctx context.Context, f *firestore.Client, uid string) (UserRecord, error) {
	var u UserRecord
	dsnap, err := f.Collection("users").Doc(uid).Get(ctx)
	if err != nil {
		return u, err
	}

	dsnap.DataTo(&u)
	return u, nil
}

// ExistsByUID ユーザーIDが存在するか判定
func (re *UserRepository) ExistsByUID(ctx context.Context, f *firestore.Client, uid string) (bool, error) {
	dsnap, err := f.Collection("users").Doc(uid).Get(ctx)

	if err != nil {
		if grpc.Code(err) == codes.NotFound {
			return false, nil
		}
		return false, err
	}

	return dsnap.Exists(), nil
}
