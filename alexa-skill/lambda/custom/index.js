module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/handler/index.ts":
/*!******************************!*\
  !*** ./src/handler/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var launch_1 = __webpack_require__(/*! ./launch */ "./src/handler/launch.ts");
exports.launch = launch_1.default;
var plan_1 = __webpack_require__(/*! ./plan */ "./src/handler/plan.ts");
exports.plan = plan_1.default;
var planDetail_1 = __webpack_require__(/*! ./planDetail */ "./src/handler/planDetail.ts");
exports.planDetail = planDetail_1.default;


/***/ }),

/***/ "./src/handler/launch.ts":
/*!*******************************!*\
  !*** ./src/handler/launch.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(/*! ./util */ "./src/handler/util.ts");
const accountLinkingTestIntent = {
    canHandle(h) {
        return h.requestEnvelope.request.type == "LaunchRequest";
    },
    async handle(h) {
        const accessToken = h.requestEnvelope.context.System.user.accessToken;
        if (accessToken === undefined) {
            let message = "スキルを利用するには、ペペロミアのアプリからログインを許可してください";
            return h.responseBuilder
                .speak(message)
                .withLinkAccountCard()
                .getResponse();
        }
        util_1.setSetep(h, util_1.m.STEP_1);
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
exports.default = accountLinkingTestIntent;


/***/ }),

/***/ "./src/handler/plan.ts":
/*!*****************************!*\
  !*** ./src/handler/plan.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(/*! ./util */ "./src/handler/util.ts");
const planIntentHandler = {
    canHandle(h) {
        return (h.requestEnvelope.request.type === "IntentRequest" &&
            h.requestEnvelope.request.intent.name === "PlanIntent" &&
            util_1.checkStep(h, util_1.m.STEP_1));
    },
    handle(h) {
        const r = h.requestEnvelope.request;
        const planDate = util_1.getSlotValue(r, "PlanDate");
        const planCity = util_1.getSlotValue(r, "PlanCity");
        util_1.setSetep(h, util_1.m.STEP_2);
        const attributes = h.attributesManager.getSessionAttributes();
        if (planDate && planCity) {
            attributes.planDate = planDate;
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
        const query = util_1.getSlotValue(r, "Query");
        const speechText = h.t("PLAN_QUERY_MSG", { planName: query });
        attributes.planCity = query;
        h.attributesManager.setSessionAttributes(attributes);
        return h.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
exports.default = planIntentHandler;


/***/ }),

/***/ "./src/handler/planDetail.ts":
/*!***********************************!*\
  !*** ./src/handler/planDetail.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(/*! ./util */ "./src/handler/util.ts");
const planDetailIntentHandler = {
    canHandle(h) {
        return (h.requestEnvelope.request.type === "IntentRequest" &&
            h.requestEnvelope.request.intent.name === "PlanDetailIntent" &&
            util_1.checkStep(h, util_1.m.STEP_2));
    },
    handle(h) {
        const r = h.requestEnvelope.request;
        const planCity1 = util_1.getSlotValue(r, "PlanCity_One");
        const planCity2 = util_1.getSlotValue(r, "PlanCity_Two");
        const planCity3 = util_1.getSlotValue(r, "PlanCity_Three");
        const planCity4 = util_1.getSlotValue(r, "PlanCity_Four");
        const planCity5 = util_1.getSlotValue(r, "PlanCity_Five");
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
                items: planCities
            };
            const speechText = h.t("PLAN_DETAIL_MSG", {
                planCity: request.item.title,
                planDetail: planCities.join("と")
            });
            return h.responseBuilder.speak(speechText).getResponse();
        }
        const vlue = util_1.getSlotValue(r, "Query");
        const request = {
            item: {
                title: attributes.planCity,
                date: attributes.planDate
            },
            items: [vlue]
        };
        const speechText = h.t("PLAN_DETAIL_MSG", {
            planCity: request.item.title,
            planDetail: vlue
        });
        return h.responseBuilder.speak(speechText).getResponse();
    }
};
exports.default = planDetailIntentHandler;


/***/ }),

/***/ "./src/handler/util.ts":
/*!*****************************!*\
  !*** ./src/handler/util.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const STEP_1 = 1;
const STEP_2 = 2;
exports.m = {
    STEP_1,
    STEP_2
};
exports.getSlotValue = (request, key) => {
    if (!request.intent.slots) {
        return "";
    }
    return request.intent.slots[key].value;
};
exports.setSetep = (h, step) => {
    const attributes = h.attributesManager.getSessionAttributes();
    attributes.step = step;
    h.attributesManager.setSessionAttributes(attributes);
};
exports.checkStep = (h, step) => {
    const attr = h.attributesManager.getSessionAttributes();
    return attr.step == step;
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ask_sdk_core_1 = __webpack_require__(/*! ask-sdk-core */ "ask-sdk-core");
const i18next_1 = __importDefault(__webpack_require__(/*! i18next */ "i18next"));
const languageStrings_1 = __importDefault(__webpack_require__(/*! ./languageStrings */ "./src/languageStrings.ts"));
const handler_1 = __webpack_require__(/*! ./handler */ "./src/handler/index.ts");
const cancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            (handlerInput.requestEnvelope.request.intent.name ===
                "AMAZON.CancelIntent" ||
                handlerInput.requestEnvelope.request.intent.name ===
                    "AMAZON.StopIntent"));
    },
    handle(handlerInput) {
        const speechText = "さようなら";
        return handlerInput.responseBuilder.speak(speechText).getResponse();
    }
};
const sessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
    },
    handle(handlerInput) {
        const { reason } = handlerInput.requestEnvelope
            .request;
        console.log(`Session ended with reason: ${reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};
const errorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak("ごめんなさい。もう一度お願いします")
            .reprompt("ごめんなさい。もう一度お願いします")
            .getResponse();
    }
};
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18next_1.default
            .init({
            lng: ask_sdk_core_1.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings_1.default
        })
            .then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};
const skillBuilder = ask_sdk_core_1.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(handler_1.launch, handler_1.plan, handler_1.planDetail, cancelAndStopIntentHandler, sessionEndedRequestHandler)
    .addErrorHandlers(errorHandler)
    .addRequestInterceptors(LocalisationRequestInterceptor)
    .lambda();


/***/ }),

/***/ "./src/languageStrings.ts":
/*!********************************!*\
  !*** ./src/languageStrings.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ja: {
        translation: {
            WELCOME_MSG: "作成したい予定を教えて下さい",
            PLAN_DATE_MSG: "{{planDate}}に{{planCity}}。予定の中身を教えてください。",
            PLAN_QUERY_MSG: "{{planName}}ですね。予定の中身を教えてください。",
            PLAN_DETAIL_MSG: "{{planCity}}に{{planDetail}}を追加しました。"
        }
    }
};


/***/ }),

/***/ "ask-sdk-core":
/*!*******************************!*\
  !*** external "ask-sdk-core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ask-sdk-core");

/***/ }),

/***/ "i18next":
/*!**************************!*\
  !*** external "i18next" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("i18next");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9oYW5kbGVyL2luZGV4LnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2hhbmRsZXIvbGF1bmNoLnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2hhbmRsZXIvcGxhbi50cyIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9oYW5kbGVyL3BsYW5EZXRhaWwudHMiLCJ3ZWJwYWNrOi8vaW5kZXgvLi9zcmMvaGFuZGxlci91dGlsLnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2xhbmd1YWdlU3RyaW5ncy50cyIsIndlYnBhY2s6Ly9pbmRleC9leHRlcm5hbCBcImFzay1zZGstY29yZVwiIiwid2VicGFjazovL2luZGV4L2V4dGVybmFsIFwiaTE4bmV4dFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0Qs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Q0YsV0FBVyxFQUFFO1lBQ1gsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixhQUFhLEVBQUUsMENBQTBDO1lBQ3pELGNBQWMsRUFBRSxnQ0FBZ0M7WUFDaEQsZUFBZSxFQUFFLHFDQUFxQztTQUN2RDtLQUNGO0NBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7O0FDVEYseUM7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgbGF1bmNoIH0gZnJvbSBcIi4vbGF1bmNoXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBsYW4gfSBmcm9tIFwiLi9wbGFuXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBsYW5EZXRhaWwgfSBmcm9tIFwiLi9wbGFuRGV0YWlsXCI7XG4iLCJpbXBvcnQgeyBSZXF1ZXN0SGFuZGxlciB9IGZyb20gXCJhc2stc2RrLWNvcmVcIjtcbmltcG9ydCB7IEhhbmRsZXJJbnB1dCwgc2V0U2V0ZXAsIG0gfSBmcm9tIFwiLi91dGlsXCI7XG5cbmNvbnN0IGFjY291bnRMaW5raW5nVGVzdEludGVudDogUmVxdWVzdEhhbmRsZXIgPSB7XG4gIGNhbkhhbmRsZShoOiBIYW5kbGVySW5wdXQpIHtcbiAgICByZXR1cm4gaC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC50eXBlID09IFwiTGF1bmNoUmVxdWVzdFwiO1xuICB9LFxuICBhc3luYyBoYW5kbGUoaDogSGFuZGxlcklucHV0KSB7XG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBoLnJlcXVlc3RFbnZlbG9wZS5jb250ZXh0LlN5c3RlbS51c2VyLmFjY2Vzc1Rva2VuO1xuICAgIGlmIChhY2Nlc3NUb2tlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyDjg4jjg7zjgq/jg7PjgYzmnKrlrprnvqnjga7loLTlkIjjga/jg6bjg7zjgrbjg7zjgavoqLHlj6/jgpLkv4PjgZlcbiAgICAgIGxldCBtZXNzYWdlID1cbiAgICAgICAgXCLjgrnjgq3jg6vjgpLliKnnlKjjgZnjgovjgavjga/jgIHjg5rjg5rjg63jg5/jgqLjga7jgqLjg5fjg6rjgYvjgonjg63jgrDjgqTjg7PjgpLoqLHlj6/jgZfjgabjgY/jgaDjgZXjgYRcIjtcbiAgICAgIHJldHVybiBoLnJlc3BvbnNlQnVpbGRlclxuICAgICAgICAuc3BlYWsobWVzc2FnZSlcbiAgICAgICAgLndpdGhMaW5rQWNjb3VudENhcmQoKVxuICAgICAgICAuZ2V0UmVzcG9uc2UoKTtcbiAgICB9XG5cbiAgICBzZXRTZXRlcChoLCBtLlNURVBfMSk7XG5cbiAgICAvLyDjgqLjgq/jgrvjgrnjg4jjg7zjgq/jg7PjgpLjgrvjg4Pjgrfjg6fjg7Pjgavkv53lrZjjgZnjgotcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gaC5hdHRyaWJ1dGVzTWFuYWdlci5nZXRTZXNzaW9uQXR0cmlidXRlcygpO1xuICAgIGF0dHJpYnV0ZXMuYWNjZXNzVG9rZW4gPSBhY2Nlc3NUb2tlbjtcbiAgICBoLmF0dHJpYnV0ZXNNYW5hZ2VyLnNldFNlc3Npb25BdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpO1xuXG4gICAgY29uc3Qgc3BlZWNoVGV4dCA9IGgudChcIldFTENPTUVfTVNHXCIpO1xuXG4gICAgcmV0dXJuIGgucmVzcG9uc2VCdWlsZGVyXG4gICAgICAuc3BlYWsoc3BlZWNoVGV4dClcbiAgICAgIC5yZXByb21wdChzcGVlY2hUZXh0KVxuICAgICAgLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFjY291bnRMaW5raW5nVGVzdEludGVudDtcbiIsImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImFzay1zZGstY29yZVwiO1xuaW1wb3J0IHsgSW50ZW50UmVxdWVzdCB9IGZyb20gXCJhc2stc2RrLW1vZGVsXCI7XG5pbXBvcnQgeyBIYW5kbGVySW5wdXQsIGdldFNsb3RWYWx1ZSwgY2hlY2tTdGVwLCBzZXRTZXRlcCwgbSB9IGZyb20gXCIuL3V0aWxcIjtcblxuY29uc3QgcGxhbkludGVudEhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoaDogSGFuZGxlcklucHV0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGgucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gXCJJbnRlbnRSZXF1ZXN0XCIgJiZcbiAgICAgIGgucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09IFwiUGxhbkludGVudFwiICYmXG4gICAgICBjaGVja1N0ZXAoaCwgbS5TVEVQXzEpXG4gICAgKTtcbiAgfSxcbiAgaGFuZGxlKGg6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHIgPSBoLnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0IGFzIEludGVudFJlcXVlc3Q7XG5cbiAgICBjb25zdCBwbGFuRGF0ZSA9IGdldFNsb3RWYWx1ZShyLCBcIlBsYW5EYXRlXCIpO1xuICAgIGNvbnN0IHBsYW5DaXR5ID0gZ2V0U2xvdFZhbHVlKHIsIFwiUGxhbkNpdHlcIik7XG5cbiAgICBzZXRTZXRlcChoLCBtLlNURVBfMik7XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGguYXR0cmlidXRlc01hbmFnZXIuZ2V0U2Vzc2lvbkF0dHJpYnV0ZXMoKTtcblxuICAgIC8vIOaXpeS7mOOBqOWgtOaJgOOBruaMh+WumuOBjOOBguOCi1xuICAgIGlmIChwbGFuRGF0ZSAmJiBwbGFuQ2l0eSkge1xuICAgICAgYXR0cmlidXRlcy5wbGFuRGF0ZSA9IHBsYW5EYXRlO1xuICAgICAgYXR0cmlidXRlcy5wbGFuQ2l0eSA9IHBsYW5DaXR5O1xuICAgICAgaC5hdHRyaWJ1dGVzTWFuYWdlci5zZXRTZXNzaW9uQXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcblxuICAgICAgY29uc3Qgc3BlZWNoVGV4dCA9IGgudChcIlBMQU5fREFURV9NU0dcIiwge1xuICAgICAgICBwbGFuRGF0ZSxcbiAgICAgICAgcGxhbkNpdHlcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaC5yZXNwb25zZUJ1aWxkZXJcbiAgICAgICAgLnNwZWFrKHNwZWVjaFRleHQpXG4gICAgICAgIC5yZXByb21wdChzcGVlY2hUZXh0KVxuICAgICAgICAuZ2V0UmVzcG9uc2UoKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVyeSA9IGdldFNsb3RWYWx1ZShyLCBcIlF1ZXJ5XCIpO1xuICAgIGNvbnN0IHNwZWVjaFRleHQgPSBoLnQoXCJQTEFOX1FVRVJZX01TR1wiLCB7IHBsYW5OYW1lOiBxdWVyeSB9KTtcblxuICAgIGF0dHJpYnV0ZXMucGxhbkNpdHkgPSBxdWVyeTtcbiAgICBoLmF0dHJpYnV0ZXNNYW5hZ2VyLnNldFNlc3Npb25BdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpO1xuXG4gICAgcmV0dXJuIGgucmVzcG9uc2VCdWlsZGVyXG4gICAgICAuc3BlYWsoc3BlZWNoVGV4dClcbiAgICAgIC5yZXByb21wdChzcGVlY2hUZXh0KVxuICAgICAgLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYW5JbnRlbnRIYW5kbGVyO1xuIiwiaW1wb3J0IHsgUmVxdWVzdEhhbmRsZXIgfSBmcm9tIFwiYXNrLXNkay1jb3JlXCI7XG5pbXBvcnQgeyBJbnRlbnRSZXF1ZXN0IH0gZnJvbSBcImFzay1zZGstbW9kZWxcIjtcbmltcG9ydCB7IEhhbmRsZXJJbnB1dCwgZ2V0U2xvdFZhbHVlLCBjaGVja1N0ZXAsIG0gfSBmcm9tIFwiLi91dGlsXCI7XG5cbmNvbnN0IHBsYW5EZXRhaWxJbnRlbnRIYW5kbGVyOiBSZXF1ZXN0SGFuZGxlciA9IHtcbiAgY2FuSGFuZGxlKGg6IEhhbmRsZXJJbnB1dCkge1xuICAgIHJldHVybiAoXG4gICAgICBoLnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09IFwiSW50ZW50UmVxdWVzdFwiICYmXG4gICAgICBoLnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PSBcIlBsYW5EZXRhaWxJbnRlbnRcIiAmJlxuICAgICAgY2hlY2tTdGVwKGgsIG0uU1RFUF8yKVxuICAgICk7XG4gIH0sXG4gIGhhbmRsZShoOiBIYW5kbGVySW5wdXQpIHtcbiAgICBjb25zdCByID0gaC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdCBhcyBJbnRlbnRSZXF1ZXN0O1xuXG4gICAgY29uc3QgcGxhbkNpdHkxID0gZ2V0U2xvdFZhbHVlKHIsIFwiUGxhbkNpdHlfT25lXCIpO1xuICAgIGNvbnN0IHBsYW5DaXR5MiA9IGdldFNsb3RWYWx1ZShyLCBcIlBsYW5DaXR5X1R3b1wiKTtcbiAgICBjb25zdCBwbGFuQ2l0eTMgPSBnZXRTbG90VmFsdWUociwgXCJQbGFuQ2l0eV9UaHJlZVwiKTtcbiAgICBjb25zdCBwbGFuQ2l0eTQgPSBnZXRTbG90VmFsdWUociwgXCJQbGFuQ2l0eV9Gb3VyXCIpO1xuICAgIGNvbnN0IHBsYW5DaXR5NSA9IGdldFNsb3RWYWx1ZShyLCBcIlBsYW5DaXR5X0ZpdmVcIik7XG5cbiAgICBjb25zdCBwbGFuQ2l0aWVzID0gW1xuICAgICAgcGxhbkNpdHkxLFxuICAgICAgcGxhbkNpdHkyLFxuICAgICAgcGxhbkNpdHkzLFxuICAgICAgcGxhbkNpdHk0LFxuICAgICAgcGxhbkNpdHk1XG4gICAgXS5maWx0ZXIodiA9PiBCb29sZWFuKHYpKTtcblxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBoLmF0dHJpYnV0ZXNNYW5hZ2VyLmdldFNlc3Npb25BdHRyaWJ1dGVzKCk7XG5cbiAgICBpZiAocGxhbkNpdGllcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0ge1xuICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgdGl0bGU6IGF0dHJpYnV0ZXMucGxhbkNpdHksXG4gICAgICAgICAgZGF0ZTogYXR0cmlidXRlcy5wbGFuRGF0ZVxuICAgICAgICB9LFxuICAgICAgICBpdGVtczogcGxhbkNpdGllc1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc3BlZWNoVGV4dCA9IGgudChcIlBMQU5fREVUQUlMX01TR1wiLCB7XG4gICAgICAgIHBsYW5DaXR5OiByZXF1ZXN0Lml0ZW0udGl0bGUsXG4gICAgICAgIHBsYW5EZXRhaWw6IHBsYW5DaXRpZXMuam9pbihcIuOBqFwiKVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBoLnJlc3BvbnNlQnVpbGRlci5zcGVhayhzcGVlY2hUZXh0KS5nZXRSZXNwb25zZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHZsdWUgPSBnZXRTbG90VmFsdWUociwgXCJRdWVyeVwiKTtcblxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICBpdGVtOiB7XG4gICAgICAgIHRpdGxlOiBhdHRyaWJ1dGVzLnBsYW5DaXR5LFxuICAgICAgICBkYXRlOiBhdHRyaWJ1dGVzLnBsYW5EYXRlXG4gICAgICB9LFxuICAgICAgaXRlbXM6IFt2bHVlXVxuICAgIH07XG5cbiAgICBjb25zdCBzcGVlY2hUZXh0ID0gaC50KFwiUExBTl9ERVRBSUxfTVNHXCIsIHtcbiAgICAgIHBsYW5DaXR5OiByZXF1ZXN0Lml0ZW0udGl0bGUsXG4gICAgICBwbGFuRGV0YWlsOiB2bHVlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaC5yZXNwb25zZUJ1aWxkZXIuc3BlYWsoc3BlZWNoVGV4dCkuZ2V0UmVzcG9uc2UoKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhbkRldGFpbEludGVudEhhbmRsZXI7XG4iLCJpbXBvcnQgeyBIYW5kbGVySW5wdXQgYXMgTWluSGFuZGxlcklucHV0IH0gZnJvbSBcImFzay1zZGstY29yZVwiO1xuaW1wb3J0IHsgSW50ZW50UmVxdWVzdCB9IGZyb20gXCJhc2stc2RrLW1vZGVsXCI7XG5cbmV4cG9ydCB0eXBlIEhhbmRsZXJJbnB1dCA9IE1pbkhhbmRsZXJJbnB1dCAmIHtcbiAgdDogKC4uLmFyZ3M6IGFueVtdKSA9PiBzdHJpbmc7XG59O1xuXG5jb25zdCBTVEVQXzEgPSAxO1xuY29uc3QgU1RFUF8yID0gMjtcblxuZXhwb3J0IGNvbnN0IG0gPSB7XG4gIFNURVBfMSxcbiAgU1RFUF8yXG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U2xvdFZhbHVlID0gKHJlcXVlc3Q6IEludGVudFJlcXVlc3QsIGtleTogc3RyaW5nKSA9PiB7XG4gIGlmICghcmVxdWVzdC5pbnRlbnQuc2xvdHMpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0LmludGVudC5zbG90c1trZXldLnZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldFNldGVwID0gKGg6IEhhbmRsZXJJbnB1dCwgc3RlcDogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBoLmF0dHJpYnV0ZXNNYW5hZ2VyLmdldFNlc3Npb25BdHRyaWJ1dGVzKCk7XG4gIGF0dHJpYnV0ZXMuc3RlcCA9IHN0ZXA7XG4gIGguYXR0cmlidXRlc01hbmFnZXIuc2V0U2Vzc2lvbkF0dHJpYnV0ZXMoYXR0cmlidXRlcyk7XG59O1xuXG5leHBvcnQgY29uc3QgY2hlY2tTdGVwID0gKGg6IEhhbmRsZXJJbnB1dCwgc3RlcDogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IGF0dHIgPSBoLmF0dHJpYnV0ZXNNYW5hZ2VyLmdldFNlc3Npb25BdHRyaWJ1dGVzKCk7XG4gIHJldHVybiBhdHRyLnN0ZXAgPT0gc3RlcDtcbn07XG4iLCJpbXBvcnQge1xuICBIYW5kbGVySW5wdXQgYXMgTWluSGFuZGxlcklucHV0LFxuICBnZXRMb2NhbGUsXG4gIFJlcXVlc3RIYW5kbGVyLFxuICBFcnJvckhhbmRsZXIsXG4gIFNraWxsQnVpbGRlcnNcbn0gZnJvbSBcImFzay1zZGstY29yZVwiO1xuaW1wb3J0IHsgU2Vzc2lvbkVuZGVkUmVxdWVzdCB9IGZyb20gXCJhc2stc2RrLW1vZGVsXCI7XG5pbXBvcnQgaTE4biBmcm9tIFwiaTE4bmV4dFwiO1xuaW1wb3J0IGxhbmd1YWdlU3RyaW5ncyBmcm9tIFwiLi9sYW5ndWFnZVN0cmluZ3NcIjtcbmltcG9ydCB7IGxhdW5jaCwgcGxhbiwgcGxhbkRldGFpbCB9IGZyb20gXCIuL2hhbmRsZXJcIjtcblxudHlwZSBIYW5kbGVySW5wdXQgPSBNaW5IYW5kbGVySW5wdXQgJiB7XG4gIHQ6ICguLi5hcmdzOiBhbnlbXSkgPT4gc3RyaW5nO1xufTtcblxuY29uc3QgY2FuY2VsQW5kU3RvcEludGVudEhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09IFwiSW50ZW50UmVxdWVzdFwiICYmXG4gICAgICAoaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PVxuICAgICAgICBcIkFNQVpPTi5DYW5jZWxJbnRlbnRcIiB8fFxuICAgICAgICBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09XG4gICAgICAgICAgXCJBTUFaT04uU3RvcEludGVudFwiKVxuICAgICk7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHNwZWVjaFRleHQgPSBcIuOBleOCiOOBhuOBquOCiVwiO1xuXG4gICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXIuc3BlYWsoc3BlZWNoVGV4dCkuZ2V0UmVzcG9uc2UoKTtcbiAgfVxufTtcblxuY29uc3Qgc2Vzc2lvbkVuZGVkUmVxdWVzdEhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09IFwiU2Vzc2lvbkVuZGVkUmVxdWVzdFwiO1xuICB9LFxuICBoYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICBjb25zdCB7IHJlYXNvbiB9ID0gaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZVxuICAgICAgLnJlcXVlc3QgYXMgU2Vzc2lvbkVuZGVkUmVxdWVzdDtcbiAgICBjb25zb2xlLmxvZyhgU2Vzc2lvbiBlbmRlZCB3aXRoIHJlYXNvbjogJHtyZWFzb259YCk7XG5cbiAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlci5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5jb25zdCBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlciA9IHtcbiAgY2FuSGFuZGxlKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBoYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQsIGVycm9yOiBFcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGBFcnJvciBoYW5kbGVkOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG5cbiAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxuICAgICAgLnNwZWFrKFwi44GU44KB44KT44Gq44GV44GE44CC44KC44GG5LiA5bqm44GK6aGY44GE44GX44G+44GZXCIpXG4gICAgICAucmVwcm9tcHQoXCLjgZTjgoHjgpPjgarjgZXjgYTjgILjgoLjgYbkuIDluqbjgYrpoZjjgYTjgZfjgb7jgZlcIilcbiAgICAgIC5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5jb25zdCBMb2NhbGlzYXRpb25SZXF1ZXN0SW50ZXJjZXB0b3IgPSB7XG4gIHByb2Nlc3MoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICBpMThuXG4gICAgICAuaW5pdCh7XG4gICAgICAgIGxuZzogZ2V0TG9jYWxlKGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUpLFxuICAgICAgICByZXNvdXJjZXM6IGxhbmd1YWdlU3RyaW5nc1xuICAgICAgfSlcbiAgICAgIC50aGVuKCh0OiAoLi4uYXJnczogYW55W10pID0+IHN0cmluZykgPT4ge1xuICAgICAgICBoYW5kbGVySW5wdXQudCA9ICguLi5hcmdzOiBhbnlbXSkgPT4gdCguLi5hcmdzKTtcbiAgICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCBza2lsbEJ1aWxkZXIgPSBTa2lsbEJ1aWxkZXJzLmN1c3RvbSgpO1xuXG5leHBvcnRzLmhhbmRsZXIgPSBza2lsbEJ1aWxkZXJcbiAgLmFkZFJlcXVlc3RIYW5kbGVycyhcbiAgICBsYXVuY2gsXG4gICAgcGxhbixcbiAgICBwbGFuRGV0YWlsLFxuICAgIGNhbmNlbEFuZFN0b3BJbnRlbnRIYW5kbGVyLFxuICAgIHNlc3Npb25FbmRlZFJlcXVlc3RIYW5kbGVyXG4gIClcbiAgLmFkZEVycm9ySGFuZGxlcnMoZXJyb3JIYW5kbGVyKVxuICAuYWRkUmVxdWVzdEludGVyY2VwdG9ycyhMb2NhbGlzYXRpb25SZXF1ZXN0SW50ZXJjZXB0b3IpXG4gIC5sYW1iZGEoKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgamE6IHtcbiAgICB0cmFuc2xhdGlvbjoge1xuICAgICAgV0VMQ09NRV9NU0c6IFwi5L2c5oiQ44GX44Gf44GE5LqI5a6a44KS5pWZ44GI44Gm5LiL44GV44GEXCIsXG4gICAgICBQTEFOX0RBVEVfTVNHOiBcInt7cGxhbkRhdGV9feOBq3t7cGxhbkNpdHl9feOAguS6iOWumuOBruS4rei6q+OCkuaVmeOBiOOBpuOBj+OBoOOBleOBhOOAglwiLFxuICAgICAgUExBTl9RVUVSWV9NU0c6IFwie3twbGFuTmFtZX1944Gn44GZ44Gt44CC5LqI5a6a44Gu5Lit6Lqr44KS5pWZ44GI44Gm44GP44Gg44GV44GE44CCXCIsXG4gICAgICBQTEFOX0RFVEFJTF9NU0c6IFwie3twbGFuQ2l0eX1944Gre3twbGFuRGV0YWlsfX3jgpLov73liqDjgZfjgb7jgZfjgZ/jgIJcIlxuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzay1zZGstY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpMThuZXh0XCIpOyJdLCJzb3VyY2VSb290IjoiIn0=