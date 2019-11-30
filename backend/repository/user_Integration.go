package repository

import (
	"context"

	"cloud.google.com/go/firestore"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
)

// UserIntegrationRepository is repository for user integration
type UserIntegrationRepository struct {
}

// UserIntegrationRecode is user integrationdate
type UserIntegrationRecode struct {
	UID          string `json:"uid" firestore:"uid"`
	AmazonUserID string `json:"amazonUserID" firestore:"amazonUserID"`
}

// NewUserIntegrationRepository is Create new UserIntegrationRepository
func NewUserIntegrationRepository() *UserIntegrationRepository {
	return &UserIntegrationRepository{}
}

// Create ユーザー連携情報を作成する
func (re *UserIntegrationRepository) Create(ctx context.Context, f *firestore.Client, uir UserIntegrationRecode) error {
	_, err := f.Collection("userIntegrations").Doc(uir.UID).Set(ctx, uir)

	return err
}

// Update ユーザー連携情報を作成する
func (re *UserIntegrationRepository) Update(ctx context.Context, f *firestore.Client, uir UserIntegrationRecode) error {
	v := map[string]interface{}{
		"uid":          uir.UID,
		"amazonUserID": uir.AmazonUserID,
	}

	_, err := f.Collection("userIntegrations").Doc(uir.UID).Set(ctx, v, firestore.MergeAll)

	return err
}

// FindByUID ユーザーIDから取得する
func (re *UserIntegrationRepository) FindByUID(ctx context.Context, f *firestore.Client, uid string) (UserIntegrationRecode, error) {
	var uir UserIntegrationRecode
	dsnap, err := f.Collection("userIntegrations").Doc(uid).Get(ctx)
	if err != nil {
		return uir, err
	}

	dsnap.DataTo(&uir)
	return uir, nil
}

// ExistsByUID ユーザーIDが存在するか判定
func (re *UserIntegrationRepository) ExistsByUID(ctx context.Context, f *firestore.Client, uid string) (bool, error) {
	dsnap, err := f.Collection("userIntegrations").Doc(uid).Get(ctx)

	if err != nil {
		if grpc.Code(err) == codes.NotFound {
			return false, nil
		}
		return false, err
	}

	return dsnap.Exists(), nil
}
