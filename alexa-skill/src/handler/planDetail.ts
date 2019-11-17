import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { HandlerInput, getSlotValue, checkStep, m, postOption } from "./util";
import rp from "request-promise";

const planDetailIntentHandler: RequestHandler = {
  canHandle(h: HandlerInput) {
    return (
      h.requestEnvelope.request.type === "IntentRequest" &&
      h.requestEnvelope.request.intent.name === "PlanDetailIntent" &&
      checkStep(h, m.STEP_2)
    );
  },
  async handle(h: HandlerInput) {
    const r = h.requestEnvelope.request as IntentRequest;

    const planCity1 = getSlotValue(r, "PlanCity_One");
    const planCity2 = getSlotValue(r, "PlanCity_Two");
    const planCity3 = getSlotValue(r, "PlanCity_Three");
    const planCity4 = getSlotValue(r, "PlanCity_Four");
    const planCity5 = getSlotValue(r, "PlanCity_Five");

    const planCities = [
      planCity1,
      planCity2,
      planCity3,
      planCity4,
      planCity5
    ].filter(v => Boolean(v));

    const attributes = h.attributesManager.getSessionAttributes();

    if (planCities.length > 0) {
      const request = {
        item: {
          title: attributes.planCity,
          date: attributes.planDate
        },
        itemDetails: planCities.map(city => ({
          title: city
        }))
      };
      console.log(request);

      const option = postOption(
        "RegisterItem",
        request,
        attributes.accessToken
      );
      await rp(option).promise();

      const speechText = h.t("PLAN_DETAIL_MSG", {
        planCity: request.item.title,
        planDetail: planCities.join("と")
      });

      return h.responseBuilder.speak(speechText).getResponse();
    }

    const vlue = getSlotValue(r, "Query");

    const request = {
      item: {
        title: attributes.planCity,
        date: attributes.planDate
      },
      itemDetails: [
        {
          title: vlue
        }
      ]
    };
    console.log(request);

    const option = postOption("RegisterItem", request, attributes.accessToken);
    await rp(option).promise();

    const speechText = h.t("PLAN_DETAIL_MSG", {
      planCity: request.item.title,
      planDetail: vlue
    });

    return h.responseBuilder.speak(speechText).getResponse();
  }
};

export default planDetailIntentHandler;
