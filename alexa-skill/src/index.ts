import {
  HandlerInput as MinHandlerInput,
  getLocale,
  RequestHandler,
  ErrorHandler,
  SkillBuilders
} from "ask-sdk-core";
import { SessionEndedRequest } from "ask-sdk-model";
import i18n from "i18next";
import languageStrings from "./languageStrings";
import { launch, plan, planDetail } from "./handler";

type HandlerInput = MinHandlerInput & {
  t: (...args: any[]) => string;
};

const cancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput: HandlerInput) {
    const speechText = "さようなら";

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
};

const sessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput: HandlerInput) {
    const { reason } = handlerInput.requestEnvelope
      .request as SessionEndedRequest;
    console.log(`Session ended with reason: ${reason}`);

    return handlerInput.responseBuilder.getResponse();
  }
};

const errorHandler: ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("ごめんなさい。もう一度お願いします")
      .reprompt("ごめんなさい。もう一度お願いします")
      .getResponse();
  }
};

const LocalisationRequestInterceptor = {
  process(handlerInput: HandlerInput) {
    i18n
      .init({
        lng: getLocale(handlerInput.requestEnvelope),
        resources: languageStrings
      })
      .then((t: (...args: any[]) => string) => {
        handlerInput.t = (...args: any[]) => t(...args);
      });
  }
};

const skillBuilder = SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    launch,
    plan,
    planDetail,
    cancelAndStopIntentHandler,
    sessionEndedRequestHandler
  )
  .addErrorHandlers(errorHandler)
  .addRequestInterceptors(LocalisationRequestInterceptor)
  .lambda();
