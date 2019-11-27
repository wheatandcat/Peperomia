import { RequestHandler } from "ask-sdk-core";
import { HandlerInput, setSetep, m } from "./util";

const accountLinkingIntent: RequestHandler = {
  canHandle(h: HandlerInput) {
    return h.requestEnvelope.request.type == "LaunchRequest";
  },
  async handle(h: HandlerInput) {
    const accessToken = h.requestEnvelope.context.System.user.accessToken;
    if (accessToken === undefined) {
      // トークンが未定義の場合はユーザーに許可を促す
      let message =
        "スキルを利用するには、ペペロミアのアプリからログインを許可してください";
      return h.responseBuilder
        .speak(message)
        .withLinkAccountCard()
        .getResponse();
    }

    setSetep(h, m.STEP_1);

    // アクセストークンをセッションに保存する
    const attributes = h.attributesManager.getSessionAttributes();
    attributes.accessToken = accessToken;
    h.attributesManager.setSessionAttributes(attributes);

    const speechText = h.t("WELCOME_MSG");

    return h.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

export default accountLinkingIntent;
