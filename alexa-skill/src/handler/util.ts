import { HandlerInput as MinHandlerInput } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";

export type HandlerInput = MinHandlerInput & {
  t: (...args: any[]) => string;
};

const STEP_1 = 1;
const STEP_2 = 2;

export const m = {
  STEP_1,
  STEP_2
};

export const getSlotValue = (request: IntentRequest, key: string) => {
  if (!request.intent.slots) {
    return "";
  }

  return request.intent.slots[key].value;
};

export const setSetep = (h: HandlerInput, step: number) => {
  const attributes = h.attributesManager.getSessionAttributes();
  attributes.step = step;
  h.attributesManager.setSessionAttributes(attributes);
};

export const checkStep = (h: HandlerInput, step: number) => {
  const attr = h.attributesManager.getSessionAttributes();
  return attr.step == step;
};
