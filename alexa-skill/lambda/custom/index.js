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
const accountLinkingIntent = {
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
exports.default = accountLinkingIntent;


/***/ }),

/***/ "./src/handler/plan.ts":
/*!*****************************!*\
  !*** ./src/handler/plan.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(/*! ./util */ "./src/handler/util.ts");
const dayjs_1 = __importDefault(__webpack_require__(/*! dayjs */ "dayjs"));
const advancedFormat_1 = __importDefault(__webpack_require__(/*! dayjs/plugin/advancedFormat */ "dayjs/plugin/advancedFormat"));
__webpack_require__(/*! dayjs/locale/ja */ "dayjs/locale/ja");
dayjs_1.default.extend(advancedFormat_1.default);
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
            attributes.planDate = dayjs_1.default(planDate).format();
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
        attributes.planDate = "0001-01-01T00:00:00Z";
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(/*! ./util */ "./src/handler/util.ts");
const request_promise_1 = __importDefault(__webpack_require__(/*! request-promise */ "request-promise"));
const planDetailIntentHandler = {
    canHandle(h) {
        return (h.requestEnvelope.request.type === "IntentRequest" &&
            h.requestEnvelope.request.intent.name === "PlanDetailIntent" &&
            util_1.checkStep(h, util_1.m.STEP_2));
    },
    async handle(h) {
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
                itemDetails: planCities.map(city => ({
                    title: city
                }))
            };
            console.log(request);
            const option = util_1.postOption("RegisterItem", request, attributes.accessToken);
            await request_promise_1.default(option).promise();
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
            itemDetails: [
                {
                    title: vlue
                }
            ]
        };
        console.log(request);
        const option = util_1.postOption("RegisterItem", request, attributes.accessToken);
        await request_promise_1.default(option).promise();
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
exports.postOption = (url, request, accessToken) => {
    return {
        method: "POST",
        uri: `https://peperomia-196da.appspot.com/amazon/${url}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: request,
        json: true
    };
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

/***/ "dayjs":
/*!************************!*\
  !*** external "dayjs" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dayjs");

/***/ }),

/***/ "dayjs/locale/ja":
/*!**********************************!*\
  !*** external "dayjs/locale/ja" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dayjs/locale/ja");

/***/ }),

/***/ "dayjs/plugin/advancedFormat":
/*!**********************************************!*\
  !*** external "dayjs/plugin/advancedFormat" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dayjs/plugin/advancedFormat");

/***/ }),

/***/ "i18next":
/*!**************************!*\
  !*** external "i18next" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("i18next");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9oYW5kbGVyL2luZGV4LnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2hhbmRsZXIvbGF1bmNoLnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2hhbmRsZXIvcGxhbi50cyIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9oYW5kbGVyL3BsYW5EZXRhaWwudHMiLCJ3ZWJwYWNrOi8vaW5kZXgvLi9zcmMvaGFuZGxlci91dGlsLnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2luZGV4Ly4vc3JjL2xhbmd1YWdlU3RyaW5ncy50cyIsIndlYnBhY2s6Ly9pbmRleC9leHRlcm5hbCBcImFzay1zZGstY29yZVwiIiwid2VicGFjazovL2luZGV4L2V4dGVybmFsIFwiZGF5anNcIiIsIndlYnBhY2s6Ly9pbmRleC9leHRlcm5hbCBcImRheWpzL2xvY2FsZS9qYVwiIiwid2VicGFjazovL2luZGV4L2V4dGVybmFsIFwiZGF5anMvcGx1Z2luL2FkdmFuY2VkRm9ybWF0XCIiLCJ3ZWJwYWNrOi8vaW5kZXgvZXh0ZXJuYWwgXCJpMThuZXh0XCIiLCJ3ZWJwYWNrOi8vaW5kZXgvZXh0ZXJuYWwgXCJyZXF1ZXN0LXByb21pc2VcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FB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TixjQUFJLEVBQ0osb0JBQVUsRUFDViwwQkFBMEIsRUFDMUIsMEJBQTBCLENBQzNCO0tBQ0EsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0tBQzlCLHNCQUFzQixDQUFDLDhCQUE4QixDQUFDO0tBQ3RELE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNyRlosa0JBQWU7SUFDYixFQUFFLEVBQUU7UUFDRixXQUFXLEVBQUU7WUFDWCxXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLGFBQWEsRUFBRSwwQ0FBMEM7WUFDekQsY0FBYyxFQUFFLGdDQUFnQztZQUNoRCxlQUFlLEVBQUUscUNBQXFDO1NBQ3ZEO0tBQ0Y7Q0FDRixDQUFDOzs7Ozs7Ozs7Ozs7QUNURix5Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw0Qzs7Ozs7Ozs7Ozs7QUNBQSx3RDs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSw0QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBsYXVuY2ggfSBmcm9tIFwiLi9sYXVuY2hcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGxhbiB9IGZyb20gXCIuL3BsYW5cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGxhbkRldGFpbCB9IGZyb20gXCIuL3BsYW5EZXRhaWxcIjtcbiIsImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImFzay1zZGstY29yZVwiO1xuaW1wb3J0IHsgSGFuZGxlcklucHV0LCBzZXRTZXRlcCwgbSB9IGZyb20gXCIuL3V0aWxcIjtcblxuY29uc3QgYWNjb3VudExpbmtpbmdJbnRlbnQ6IFJlcXVlc3RIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoaDogSGFuZGxlcklucHV0KSB7XG4gICAgcmV0dXJuIGgucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PSBcIkxhdW5jaFJlcXVlc3RcIjtcbiAgfSxcbiAgYXN5bmMgaGFuZGxlKGg6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gaC5yZXF1ZXN0RW52ZWxvcGUuY29udGV4dC5TeXN0ZW0udXNlci5hY2Nlc3NUb2tlbjtcbiAgICBpZiAoYWNjZXNzVG9rZW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8g44OI44O844Kv44Oz44GM5pyq5a6a576p44Gu5aC05ZCI44Gv44Om44O844K244O844Gr6Kix5Y+v44KS5L+D44GZXG4gICAgICBsZXQgbWVzc2FnZSA9XG4gICAgICAgIFwi44K544Kt44Or44KS5Yip55So44GZ44KL44Gr44Gv44CB44Oa44Oa44Ot44Of44Ki44Gu44Ki44OX44Oq44GL44KJ44Ot44Kw44Kk44Oz44KS6Kix5Y+v44GX44Gm44GP44Gg44GV44GEXCI7XG4gICAgICByZXR1cm4gaC5yZXNwb25zZUJ1aWxkZXJcbiAgICAgICAgLnNwZWFrKG1lc3NhZ2UpXG4gICAgICAgIC53aXRoTGlua0FjY291bnRDYXJkKClcbiAgICAgICAgLmdldFJlc3BvbnNlKCk7XG4gICAgfVxuXG4gICAgc2V0U2V0ZXAoaCwgbS5TVEVQXzEpO1xuXG4gICAgLy8g44Ki44Kv44K744K544OI44O844Kv44Oz44KS44K744OD44K344On44Oz44Gr5L+d5a2Y44GZ44KLXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGguYXR0cmlidXRlc01hbmFnZXIuZ2V0U2Vzc2lvbkF0dHJpYnV0ZXMoKTtcbiAgICBhdHRyaWJ1dGVzLmFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XG4gICAgaC5hdHRyaWJ1dGVzTWFuYWdlci5zZXRTZXNzaW9uQXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcblxuICAgIGNvbnN0IHNwZWVjaFRleHQgPSBoLnQoXCJXRUxDT01FX01TR1wiKTtcblxuICAgIHJldHVybiBoLnJlc3BvbnNlQnVpbGRlclxuICAgICAgLnNwZWFrKHNwZWVjaFRleHQpXG4gICAgICAucmVwcm9tcHQoc3BlZWNoVGV4dClcbiAgICAgIC5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhY2NvdW50TGlua2luZ0ludGVudDtcbiIsImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImFzay1zZGstY29yZVwiO1xuaW1wb3J0IHsgSW50ZW50UmVxdWVzdCB9IGZyb20gXCJhc2stc2RrLW1vZGVsXCI7XG5pbXBvcnQgeyBIYW5kbGVySW5wdXQsIGdldFNsb3RWYWx1ZSwgY2hlY2tTdGVwLCBzZXRTZXRlcCwgbSB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCBhZHZhbmNlZEZvcm1hdCBmcm9tIFwiZGF5anMvcGx1Z2luL2FkdmFuY2VkRm9ybWF0XCI7XG5pbXBvcnQgXCJkYXlqcy9sb2NhbGUvamFcIjtcbmRheWpzLmV4dGVuZChhZHZhbmNlZEZvcm1hdCk7XG5cbmNvbnN0IHBsYW5JbnRlbnRIYW5kbGVyOiBSZXF1ZXN0SGFuZGxlciA9IHtcbiAgY2FuSGFuZGxlKGg6IEhhbmRsZXJJbnB1dCkge1xuICAgIHJldHVybiAoXG4gICAgICBoLnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09IFwiSW50ZW50UmVxdWVzdFwiICYmXG4gICAgICBoLnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PSBcIlBsYW5JbnRlbnRcIiAmJlxuICAgICAgY2hlY2tTdGVwKGgsIG0uU1RFUF8xKVxuICAgICk7XG4gIH0sXG4gIGhhbmRsZShoOiBIYW5kbGVySW5wdXQpIHtcbiAgICBjb25zdCByID0gaC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdCBhcyBJbnRlbnRSZXF1ZXN0O1xuXG4gICAgY29uc3QgcGxhbkRhdGUgPSBnZXRTbG90VmFsdWUociwgXCJQbGFuRGF0ZVwiKTtcbiAgICBjb25zdCBwbGFuQ2l0eSA9IGdldFNsb3RWYWx1ZShyLCBcIlBsYW5DaXR5XCIpO1xuXG4gICAgc2V0U2V0ZXAoaCwgbS5TVEVQXzIpO1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBoLmF0dHJpYnV0ZXNNYW5hZ2VyLmdldFNlc3Npb25BdHRyaWJ1dGVzKCk7XG5cbiAgICAvLyDml6Xku5jjgajloLTmiYDjga7mjIflrprjgYzjgYLjgotcbiAgICBpZiAocGxhbkRhdGUgJiYgcGxhbkNpdHkpIHtcbiAgICAgIGF0dHJpYnV0ZXMucGxhbkRhdGUgPSBkYXlqcyhwbGFuRGF0ZSkuZm9ybWF0KCk7XG4gICAgICBhdHRyaWJ1dGVzLnBsYW5DaXR5ID0gcGxhbkNpdHk7XG4gICAgICBoLmF0dHJpYnV0ZXNNYW5hZ2VyLnNldFNlc3Npb25BdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpO1xuXG4gICAgICBjb25zdCBzcGVlY2hUZXh0ID0gaC50KFwiUExBTl9EQVRFX01TR1wiLCB7XG4gICAgICAgIHBsYW5EYXRlLFxuICAgICAgICBwbGFuQ2l0eVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBoLnJlc3BvbnNlQnVpbGRlclxuICAgICAgICAuc3BlYWsoc3BlZWNoVGV4dClcbiAgICAgICAgLnJlcHJvbXB0KHNwZWVjaFRleHQpXG4gICAgICAgIC5nZXRSZXNwb25zZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXJ5ID0gZ2V0U2xvdFZhbHVlKHIsIFwiUXVlcnlcIik7XG4gICAgY29uc3Qgc3BlZWNoVGV4dCA9IGgudChcIlBMQU5fUVVFUllfTVNHXCIsIHsgcGxhbk5hbWU6IHF1ZXJ5IH0pO1xuXG4gICAgYXR0cmlidXRlcy5wbGFuQ2l0eSA9IHF1ZXJ5O1xuICAgIGF0dHJpYnV0ZXMucGxhbkRhdGUgPSBcIjAwMDEtMDEtMDFUMDA6MDA6MDBaXCI7XG4gICAgaC5hdHRyaWJ1dGVzTWFuYWdlci5zZXRTZXNzaW9uQXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcblxuICAgIHJldHVybiBoLnJlc3BvbnNlQnVpbGRlclxuICAgICAgLnNwZWFrKHNwZWVjaFRleHQpXG4gICAgICAucmVwcm9tcHQoc3BlZWNoVGV4dClcbiAgICAgIC5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFuSW50ZW50SGFuZGxlcjtcbiIsImltcG9ydCB7IFJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcImFzay1zZGstY29yZVwiO1xuaW1wb3J0IHsgSW50ZW50UmVxdWVzdCB9IGZyb20gXCJhc2stc2RrLW1vZGVsXCI7XG5pbXBvcnQgeyBIYW5kbGVySW5wdXQsIGdldFNsb3RWYWx1ZSwgY2hlY2tTdGVwLCBtLCBwb3N0T3B0aW9uIH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHJwIGZyb20gXCJyZXF1ZXN0LXByb21pc2VcIjtcblxuY29uc3QgcGxhbkRldGFpbEludGVudEhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoaDogSGFuZGxlcklucHV0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGgucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gXCJJbnRlbnRSZXF1ZXN0XCIgJiZcbiAgICAgIGgucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09IFwiUGxhbkRldGFpbEludGVudFwiICYmXG4gICAgICBjaGVja1N0ZXAoaCwgbS5TVEVQXzIpXG4gICAgKTtcbiAgfSxcbiAgYXN5bmMgaGFuZGxlKGg6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHIgPSBoLnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0IGFzIEludGVudFJlcXVlc3Q7XG5cbiAgICBjb25zdCBwbGFuQ2l0eTEgPSBnZXRTbG90VmFsdWUociwgXCJQbGFuQ2l0eV9PbmVcIik7XG4gICAgY29uc3QgcGxhbkNpdHkyID0gZ2V0U2xvdFZhbHVlKHIsIFwiUGxhbkNpdHlfVHdvXCIpO1xuICAgIGNvbnN0IHBsYW5DaXR5MyA9IGdldFNsb3RWYWx1ZShyLCBcIlBsYW5DaXR5X1RocmVlXCIpO1xuICAgIGNvbnN0IHBsYW5DaXR5NCA9IGdldFNsb3RWYWx1ZShyLCBcIlBsYW5DaXR5X0ZvdXJcIik7XG4gICAgY29uc3QgcGxhbkNpdHk1ID0gZ2V0U2xvdFZhbHVlKHIsIFwiUGxhbkNpdHlfRml2ZVwiKTtcblxuICAgIGNvbnN0IHBsYW5DaXRpZXMgPSBbXG4gICAgICBwbGFuQ2l0eTEsXG4gICAgICBwbGFuQ2l0eTIsXG4gICAgICBwbGFuQ2l0eTMsXG4gICAgICBwbGFuQ2l0eTQsXG4gICAgICBwbGFuQ2l0eTVcbiAgICBdLmZpbHRlcih2ID0+IEJvb2xlYW4odikpO1xuXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IGguYXR0cmlidXRlc01hbmFnZXIuZ2V0U2Vzc2lvbkF0dHJpYnV0ZXMoKTtcblxuICAgIGlmIChwbGFuQ2l0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICAgIGl0ZW06IHtcbiAgICAgICAgICB0aXRsZTogYXR0cmlidXRlcy5wbGFuQ2l0eSxcbiAgICAgICAgICBkYXRlOiBhdHRyaWJ1dGVzLnBsYW5EYXRlXG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1EZXRhaWxzOiBwbGFuQ2l0aWVzLm1hcChjaXR5ID0+ICh7XG4gICAgICAgICAgdGl0bGU6IGNpdHlcbiAgICAgICAgfSkpXG4gICAgICB9O1xuICAgICAgY29uc29sZS5sb2cocmVxdWVzdCk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbiA9IHBvc3RPcHRpb24oXG4gICAgICAgIFwiUmVnaXN0ZXJJdGVtXCIsXG4gICAgICAgIHJlcXVlc3QsXG4gICAgICAgIGF0dHJpYnV0ZXMuYWNjZXNzVG9rZW5cbiAgICAgICk7XG4gICAgICBhd2FpdCBycChvcHRpb24pLnByb21pc2UoKTtcblxuICAgICAgY29uc3Qgc3BlZWNoVGV4dCA9IGgudChcIlBMQU5fREVUQUlMX01TR1wiLCB7XG4gICAgICAgIHBsYW5DaXR5OiByZXF1ZXN0Lml0ZW0udGl0bGUsXG4gICAgICAgIHBsYW5EZXRhaWw6IHBsYW5DaXRpZXMuam9pbihcIuOBqFwiKVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBoLnJlc3BvbnNlQnVpbGRlci5zcGVhayhzcGVlY2hUZXh0KS5nZXRSZXNwb25zZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHZsdWUgPSBnZXRTbG90VmFsdWUociwgXCJRdWVyeVwiKTtcblxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICBpdGVtOiB7XG4gICAgICAgIHRpdGxlOiBhdHRyaWJ1dGVzLnBsYW5DaXR5LFxuICAgICAgICBkYXRlOiBhdHRyaWJ1dGVzLnBsYW5EYXRlXG4gICAgICB9LFxuICAgICAgaXRlbURldGFpbHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiB2bHVlXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKHJlcXVlc3QpO1xuXG4gICAgY29uc3Qgb3B0aW9uID0gcG9zdE9wdGlvbihcIlJlZ2lzdGVySXRlbVwiLCByZXF1ZXN0LCBhdHRyaWJ1dGVzLmFjY2Vzc1Rva2VuKTtcbiAgICBhd2FpdCBycChvcHRpb24pLnByb21pc2UoKTtcblxuICAgIGNvbnN0IHNwZWVjaFRleHQgPSBoLnQoXCJQTEFOX0RFVEFJTF9NU0dcIiwge1xuICAgICAgcGxhbkNpdHk6IHJlcXVlc3QuaXRlbS50aXRsZSxcbiAgICAgIHBsYW5EZXRhaWw6IHZsdWVcbiAgICB9KTtcblxuICAgIHJldHVybiBoLnJlc3BvbnNlQnVpbGRlci5zcGVhayhzcGVlY2hUZXh0KS5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFuRGV0YWlsSW50ZW50SGFuZGxlcjtcbiIsImltcG9ydCB7IEhhbmRsZXJJbnB1dCBhcyBNaW5IYW5kbGVySW5wdXQgfSBmcm9tIFwiYXNrLXNkay1jb3JlXCI7XG5pbXBvcnQgeyBJbnRlbnRSZXF1ZXN0IH0gZnJvbSBcImFzay1zZGstbW9kZWxcIjtcblxuZXhwb3J0IHR5cGUgSGFuZGxlcklucHV0ID0gTWluSGFuZGxlcklucHV0ICYge1xuICB0OiAoLi4uYXJnczogYW55W10pID0+IHN0cmluZztcbn07XG5cbmNvbnN0IFNURVBfMSA9IDE7XG5jb25zdCBTVEVQXzIgPSAyO1xuXG5leHBvcnQgY29uc3QgbSA9IHtcbiAgU1RFUF8xLFxuICBTVEVQXzJcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTbG90VmFsdWUgPSAocmVxdWVzdDogSW50ZW50UmVxdWVzdCwga2V5OiBzdHJpbmcpID0+IHtcbiAgaWYgKCFyZXF1ZXN0LmludGVudC5zbG90cykge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgcmV0dXJuIHJlcXVlc3QuaW50ZW50LnNsb3RzW2tleV0udmFsdWU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0U2V0ZXAgPSAoaDogSGFuZGxlcklucHV0LCBzdGVwOiBudW1iZXIpID0+IHtcbiAgY29uc3QgYXR0cmlidXRlcyA9IGguYXR0cmlidXRlc01hbmFnZXIuZ2V0U2Vzc2lvbkF0dHJpYnV0ZXMoKTtcbiAgYXR0cmlidXRlcy5zdGVwID0gc3RlcDtcbiAgaC5hdHRyaWJ1dGVzTWFuYWdlci5zZXRTZXNzaW9uQXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja1N0ZXAgPSAoaDogSGFuZGxlcklucHV0LCBzdGVwOiBudW1iZXIpID0+IHtcbiAgY29uc3QgYXR0ciA9IGguYXR0cmlidXRlc01hbmFnZXIuZ2V0U2Vzc2lvbkF0dHJpYnV0ZXMoKTtcbiAgcmV0dXJuIGF0dHIuc3RlcCA9PSBzdGVwO1xufTtcblxuZXhwb3J0IGNvbnN0IHBvc3RPcHRpb24gPSAoXG4gIHVybDogc3RyaW5nLFxuICByZXF1ZXN0OiBPYmplY3QsXG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmdcbikgPT4ge1xuICByZXR1cm4ge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgdXJpOiBgaHR0cHM6Ly9wZXBlcm9taWEtMTk2ZGEuYXBwc3BvdC5jb20vYW1hem9uLyR7dXJsfWAsXG4gICAgaGVhZGVyczoge1xuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YFxuICAgIH0sXG4gICAgYm9keTogcmVxdWVzdCxcbiAgICBqc29uOiB0cnVlIC8vIEF1dG9tYXRpY2FsbHkgc3RyaW5naWZpZXMgdGhlIGJvZHkgdG8gSlNPTlxuICB9O1xufTtcbiIsImltcG9ydCB7XG4gIEhhbmRsZXJJbnB1dCBhcyBNaW5IYW5kbGVySW5wdXQsXG4gIGdldExvY2FsZSxcbiAgUmVxdWVzdEhhbmRsZXIsXG4gIEVycm9ySGFuZGxlcixcbiAgU2tpbGxCdWlsZGVyc1xufSBmcm9tIFwiYXNrLXNkay1jb3JlXCI7XG5pbXBvcnQgeyBTZXNzaW9uRW5kZWRSZXF1ZXN0IH0gZnJvbSBcImFzay1zZGstbW9kZWxcIjtcbmltcG9ydCBpMThuIGZyb20gXCJpMThuZXh0XCI7XG5pbXBvcnQgbGFuZ3VhZ2VTdHJpbmdzIGZyb20gXCIuL2xhbmd1YWdlU3RyaW5nc1wiO1xuaW1wb3J0IHsgbGF1bmNoLCBwbGFuLCBwbGFuRGV0YWlsIH0gZnJvbSBcIi4vaGFuZGxlclwiO1xuXG50eXBlIEhhbmRsZXJJbnB1dCA9IE1pbkhhbmRsZXJJbnB1dCAmIHtcbiAgdDogKC4uLmFyZ3M6IGFueVtdKSA9PiBzdHJpbmc7XG59O1xuXG5jb25zdCBjYW5jZWxBbmRTdG9wSW50ZW50SGFuZGxlcjogUmVxdWVzdEhhbmRsZXIgPSB7XG4gIGNhbkhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIHJldHVybiAoXG4gICAgICBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gXCJJbnRlbnRSZXF1ZXN0XCIgJiZcbiAgICAgIChoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09XG4gICAgICAgIFwiQU1BWk9OLkNhbmNlbEludGVudFwiIHx8XG4gICAgICAgIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC5pbnRlbnQubmFtZSA9PT1cbiAgICAgICAgICBcIkFNQVpPTi5TdG9wSW50ZW50XCIpXG4gICAgKTtcbiAgfSxcbiAgaGFuZGxlKGhhbmRsZXJJbnB1dDogSGFuZGxlcklucHV0KSB7XG4gICAgY29uc3Qgc3BlZWNoVGV4dCA9IFwi44GV44KI44GG44Gq44KJXCI7XG5cbiAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlci5zcGVhayhzcGVlY2hUZXh0KS5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5jb25zdCBzZXNzaW9uRW5kZWRSZXF1ZXN0SGFuZGxlcjogUmVxdWVzdEhhbmRsZXIgPSB7XG4gIGNhbkhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gXCJTZXNzaW9uRW5kZWRSZXF1ZXN0XCI7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHsgcmVhc29uIH0gPSBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlXG4gICAgICAucmVxdWVzdCBhcyBTZXNzaW9uRW5kZWRSZXF1ZXN0O1xuICAgIGNvbnNvbGUubG9nKGBTZXNzaW9uIGVuZGVkIHdpdGggcmVhc29uOiAke3JlYXNvbn1gKTtcblxuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmNvbnN0IGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCwgZXJyb3I6IEVycm9yKSB7XG4gICAgY29uc29sZS5sb2coYEVycm9yIGhhbmRsZWQ6ICR7ZXJyb3IubWVzc2FnZX1gKTtcblxuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXG4gICAgICAuc3BlYWsoXCLjgZTjgoHjgpPjgarjgZXjgYTjgILjgoLjgYbkuIDluqbjgYrpoZjjgYTjgZfjgb7jgZlcIilcbiAgICAgIC5yZXByb21wdChcIuOBlOOCgeOCk+OBquOBleOBhOOAguOCguOBhuS4gOW6puOBiumhmOOBhOOBl+OBvuOBmVwiKVxuICAgICAgLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmNvbnN0IExvY2FsaXNhdGlvblJlcXVlc3RJbnRlcmNlcHRvciA9IHtcbiAgcHJvY2VzcyhoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIGkxOG5cbiAgICAgIC5pbml0KHtcbiAgICAgICAgbG5nOiBnZXRMb2NhbGUoaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZSksXG4gICAgICAgIHJlc291cmNlczogbGFuZ3VhZ2VTdHJpbmdzXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHQ6ICguLi5hcmdzOiBhbnlbXSkgPT4gc3RyaW5nKSA9PiB7XG4gICAgICAgIGhhbmRsZXJJbnB1dC50ID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB0KC4uLmFyZ3MpO1xuICAgICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHNraWxsQnVpbGRlciA9IFNraWxsQnVpbGRlcnMuY3VzdG9tKCk7XG5cbmV4cG9ydHMuaGFuZGxlciA9IHNraWxsQnVpbGRlclxuICAuYWRkUmVxdWVzdEhhbmRsZXJzKFxuICAgIGxhdW5jaCxcbiAgICBwbGFuLFxuICAgIHBsYW5EZXRhaWwsXG4gICAgY2FuY2VsQW5kU3RvcEludGVudEhhbmRsZXIsXG4gICAgc2Vzc2lvbkVuZGVkUmVxdWVzdEhhbmRsZXJcbiAgKVxuICAuYWRkRXJyb3JIYW5kbGVycyhlcnJvckhhbmRsZXIpXG4gIC5hZGRSZXF1ZXN0SW50ZXJjZXB0b3JzKExvY2FsaXNhdGlvblJlcXVlc3RJbnRlcmNlcHRvcilcbiAgLmxhbWJkYSgpO1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBqYToge1xuICAgIHRyYW5zbGF0aW9uOiB7XG4gICAgICBXRUxDT01FX01TRzogXCLkvZzmiJDjgZfjgZ/jgYTkuojlrprjgpLmlZnjgYjjgabkuIvjgZXjgYRcIixcbiAgICAgIFBMQU5fREFURV9NU0c6IFwie3twbGFuRGF0ZX1944Gre3twbGFuQ2l0eX1944CC5LqI5a6a44Gu5Lit6Lqr44KS5pWZ44GI44Gm44GP44Gg44GV44GE44CCXCIsXG4gICAgICBQTEFOX1FVRVJZX01TRzogXCJ7e3BsYW5OYW1lfX3jgafjgZnjga3jgILkuojlrprjga7kuK3ouqvjgpLmlZnjgYjjgabjgY/jgaDjgZXjgYTjgIJcIixcbiAgICAgIFBMQU5fREVUQUlMX01TRzogXCJ7e3BsYW5DaXR5fX3jgat7e3BsYW5EZXRhaWx9feOCkui/veWKoOOBl+OBvuOBl+OBn+OAglwiXG4gICAgfVxuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXNrLXNkay1jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRheWpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRheWpzL2xvY2FsZS9qYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkYXlqcy9wbHVnaW4vYWR2YW5jZWRGb3JtYXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaTE4bmV4dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZXF1ZXN0LXByb21pc2VcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==