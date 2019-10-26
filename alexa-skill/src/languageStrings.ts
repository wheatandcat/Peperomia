/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

export default {
  ja: {
    translation: {
      WELCOME_MSG: "作成したい予定を教えて下さい",
      PLAN_DATE_MSG: "{{planDate}}に{{planCity}}の予定を作成しました",
      PLAN_QUERY_MSG: "{{planName}}を追加しました",
      HELP_MSG: "こんにちは、と言ってみてください。どうぞ！",
      GOODBYE_MSG: "さようなら",
      REFLECTOR_MSG: "{{intentName}}がトリガーされました。",
      FALLBACK_MSG:
        "ごめんなさい。ちょっとよくわかりませんでした。もう一度言ってみてください。",
      ERROR_MSG:
        "ごめんなさい。なんだかうまく行かないようです。もう一度言ってみてください。"
    }
  }
};
