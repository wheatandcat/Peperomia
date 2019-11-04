package client

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

// AmazonClient is amazon client
type AmazonClient struct {
	Token string
}

// LoginWithAmazonUserProfile is LoginWithAmazonUserProfile レスポンス
type LoginWithAmazonUserProfile struct {
	UserID string `json:"user_id" binding:"required"`
}

// NewAmazonClient is Create new NewAmazonClient
func NewAmazonClient(token string) *AmazonClient {
	return &AmazonClient{
		Token: token,
	}
}

// GetUserID AmazonアカウントのユーザーIDを取得する
func (c *AmazonClient) GetUserID() (string, error) {
	url := "https://api.amazon.com/user/profile?access_token=" + c.Token

	r, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}

	client := new(http.Client)
	resp, err := client.Do(r)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()
	resBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	res := LoginWithAmazonUserProfile{}

	if err = json.Unmarshal(resBody, &res); err != nil {
		return "", err
	}

	return res.UserID, nil
}
