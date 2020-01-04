package uuidgen

import "github.com/google/uuid"

// UUIDGenerator UUID生成
type UUIDGenerator interface {
	Get() string
}

// UUID has generating method.
type UUID struct {
}

// Get UUIDを取得する
func (*UUID) Get() string {
	u, _ := uuid.NewRandom()

	return u.String()
}
