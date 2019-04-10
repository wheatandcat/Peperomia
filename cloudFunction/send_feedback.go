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

	if _, _, err := api.PostMessage("app-feedback", slack.MsgOptionText("以下のフィードバックをもらいました", false), slack.MsgOptionAttachments(attachment)); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Write([]byte("OK"))
}
