package app

import (
	"net/http"
	"os"
	"strings"

	"github.com/nlopes/slack"
)

func SendFeedback(w http.ResponseWriter, r *http.Request) {
	message, ok := r.URL.Query()["message"]

	if !ok {
		http.Error(w, "not params", http.StatusInternalServerError)
		return
	}

	api := slack.New(os.Getenv("SLACK_API_TOKEN"))
	attachment := slack.Attachment{
		Color: "#36a64f",
		Text:  strings.Join(message, " "),
	}

	var fup slack.FileUploadParameters

	fup = {
		File
	}

	w.Write([]byte("OK"))
}
