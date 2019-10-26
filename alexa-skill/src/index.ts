import Alexa, {
  HandlerInput as MinHandlerInput,
  getLocale,
  RequestHandler,
  ErrorHandler,
  SkillBuilders
} from "ask-sdk-core";
import { SessionEndedRequest, IntentRequest } from "ask-sdk-model";
import i18n from "i18next";
import languageStrings from "./languageStrings";

type HandlerInput = MinHandlerInput & {
  t: (...args: any[]) => string;
};

const launchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput: HandlerInput) {
    const speechText = handlerInput.t("WELCOME_MSG");

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const planIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "PlanIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log((request as IntentRequest).intent.slots);

    const planDate = (request as IntentRequest).intent.slots["PlanDate"].value;
    const planCity = (request as IntentRequest).intent.slots["PlanCity"].value;

    if (planDate && planCity) {
      const speechText = handlerInput.t("PLAN_DATE_MSG", {
        planDate,
        planCity
      });

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }

    const vlue = (request as IntentRequest).intent.slots["Query"].value;
    const speechText = handlerInput.t("PLAN_QUERY_MSG", { planName: vlue });

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const helloWorldIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "HelloWorldIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    const speechText = "Hello World!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};

const helpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput: HandlerInput) {
    const speechText = "You can say hello to me!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
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
    const speechText = "Goodbye!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
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
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  }
};

const LocalisationRequestInterceptor = {
  process(handlerInput) {
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
    launchRequestHandler,
    planIntentHandler,
    helloWorldIntentHandler,
    helpIntentHandler,
    cancelAndStopIntentHandler,
    sessionEndedRequestHandler
  )
  .addErrorHandlers(errorHandler)
  .addRequestInterceptors(LocalisationRequestInterceptor)
  .lambda();
