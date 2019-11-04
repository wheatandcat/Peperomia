import {
  HandlerInput as MinHandlerInput,
  getLocale,
  RequestHandler,
  ErrorHandler,
  SkillBuilders
} from "ask-sdk-core";
import { SessionEndedRequest, IntentRequest } from "ask-sdk-model";
import i18n from "i18next";
import rp from "request-promise";
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
    const request = handlerInput.requestEnvelope.request as IntentRequest;

    const planDate = getSlotValue(request, "PlanDate");
    const planCity = getSlotValue(request, "PlanCity");

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

    const vlue = getSlotValue(request, "Query");

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

const AccountLinkingTestIntent = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type == "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ==
        "AccountLinkingTestIntent"
    );
  },
  async handle(handlerInput: HandlerInput) {
    let accessToken =
      handlerInput.requestEnvelope.context.System.user.accessToken;
    if (accessToken === undefined) {
      // トークンが未定義の場合はユーザーに許可を促す
      let message = "スキルを利用するためにログインを許可してください";
      return handlerInput.responseBuilder
        .speak(message)
        .withLinkAccountCard()
        .getResponse();
    }

    let url = "https://api.amazon.com/user/profile?access_token=" + accessToken;
    try {
      let body = await rp(url).promise();
      console.log(body);
      let name = JSON.parse(body).name;
      let speechText = name + "さん、こんにちは";
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    } catch (e) {
      console.log(e);
      return handlerInput.responseBuilder
        .speak("通信に問題が発生しました。")
        .getResponse();
    }
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
    launchRequestHandler,
    AccountLinkingTestIntent,
    planIntentHandler,
    helloWorldIntentHandler,
    helpIntentHandler,
    cancelAndStopIntentHandler,
    sessionEndedRequestHandler
  )
  .addErrorHandlers(errorHandler)
  .addRequestInterceptors(LocalisationRequestInterceptor)
  .lambda();

const getSlotValue = (request: IntentRequest, key: string) => {
  if (!request.intent.slots) {
    return "";
  }

  return request.intent.slots[key].value;
};
