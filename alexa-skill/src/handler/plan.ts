import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { HandlerInput, getSlotValue, checkStep, setSetep, m } from "./util";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/ja";
dayjs.extend(advancedFormat);

const planIntentHandler: RequestHandler = {
  canHandle(h: HandlerInput) {
    return (
      h.requestEnvelope.request.type === "IntentRequest" &&
      h.requestEnvelope.request.intent.name === "PlanIntent" &&
      checkStep(h, m.STEP_1)
    );
  },
  handle(h: HandlerInput) {
    const r = h.requestEnvelope.request as IntentRequest;

    const planDate = getSlotValue(r, "PlanDate");
    const planCity = getSlotValue(r, "PlanCity");

    setSetep(h, m.STEP_2);
    const attributes = h.attributesManager.getSessionAttributes();

    // 日付と場所の指定がある
    if (planDate && planCity) {
      attributes.planDate = dayjs(planDate).format();
      attributes.planCity = planCity;
      h.attributesManager.setSessionAttributes(attributes);

      const speechText = h.t("PLAN_DATE_MSG", {
        planDate,
        planCity
      });

      return h.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }

    const query = getSlotValue(r, "Query");
    const speechText = h.t("PLAN_QUERY_MSG", { planName: query });

    attributes.planCity = query;
    attributes.planDate = "0001-01-01T00:00:00Z";
    h.attributesManager.setSessionAttributes(attributes);

    return h.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

export default planIntentHandler;
