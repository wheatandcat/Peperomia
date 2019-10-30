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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ask_sdk_core_1 = __webpack_require__(/*! ask-sdk-core */ "ask-sdk-core");
const i18next_1 = __importDefault(__webpack_require__(/*! i18next */ "i18next"));
const request_promise_1 = __importDefault(__webpack_require__(/*! request-promise */ "request-promise"));
const languageStrings_1 = __importDefault(__webpack_require__(/*! ./languageStrings */ "./src/languageStrings.ts"));
const launchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "LaunchRequest";
    },
    handle(handlerInput) {
        const speechText = handlerInput.t("WELCOME_MSG");
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const planIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "PlanIntent");
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        console.log(request.intent.slots);
        const planDate = request.intent.slots["PlanDate"].value;
        const planCity = request.intent.slots["PlanCity"].value;
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
        const vlue = request.intent.slots["Query"].value;
        const speechText = handlerInput.t("PLAN_QUERY_MSG", { planName: vlue });
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const helloWorldIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "HelloWorldIntent");
    },
    handle(handlerInput) {
        const speechText = "Hello World!";
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Hello World", speechText)
            .getResponse();
    }
};
const AccountLinkingTestIntent = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type == "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name ==
                "AccountLinkingTestIntent");
    },
    handle(handlerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            let accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
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
                let body = yield request_promise_1.default(url).promise();
                console.log(body);
                let name = JSON.parse(body).name;
                let speechText = name + "さん、こんにちは";
                return handlerInput.responseBuilder
                    .speak(speechText)
                    .reprompt(speechText)
                    .getResponse();
            }
            catch (e) {
                console.log(e);
                return handlerInput.responseBuilder
                    .speak("通信に問題が発生しました。")
                    .getResponse();
            }
        });
    }
};
const helpIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent");
    },
    handle(handlerInput) {
        const speechText = "You can say hello to me!";
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard("Hello World", speechText)
            .getResponse();
    }
};
const cancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            (handlerInput.requestEnvelope.request.intent.name ===
                "AMAZON.CancelIntent" ||
                handlerInput.requestEnvelope.request.intent.name ===
                    "AMAZON.StopIntent"));
    },
    handle(handlerInput) {
        const speechText = "Goodbye!";
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Hello World", speechText)
            .getResponse();
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
            .speak("Sorry, I can't understand the command. Please say again.")
            .reprompt("Sorry, I can't understand the command. Please say again.")
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
    .addRequestHandlers(launchRequestHandler, AccountLinkingTestIntent, planIntentHandler, helloWorldIntentHandler, helpIntentHandler, cancelAndStopIntentHandler, sessionEndedRequestHandler)
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

/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ja: {
        translation: {
            WELCOME_MSG: "作成したい予定を教えて下さい",
            PLAN_DATE_MSG: "{{planDate}}に{{planCity}}の予定を作成しました",
            PLAN_QUERY_MSG: "{{planName}}を追加しました",
            HELP_MSG: "こんにちは、と言ってみてください。どうぞ！",
            GOODBYE_MSG: "さようなら",
            REFLECTOR_MSG: "{{intentName}}がトリガーされました。",
            FALLBACK_MSG: "ごめんなさい。ちょっとよくわかりませんでした。もう一度言ってみてください。",
            ERROR_MSG: "ごめんなさい。なんだかうまく行かないようです。もう一度言ってみてください。"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9sYW5ndWFnZVN0cmluZ3MudHMiLCJ3ZWJwYWNrOi8vaW5kZXgvZXh0ZXJuYWwgXCJhc2stc2RrLWNvcmVcIiIsIndlYnBhY2s6Ly9pbmRleC9leHRlcm5hbCBcImkxOG5leHRcIiIsIndlYnBhY2s6Ly9pbmRleC9leHRlcm5hbCBcInJlcXVlc3QtcHJvbWlzZVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSwrRUFNc0I7QUFFdEIsaUZBQTJCO0FBQzNCLHlHQUFpQztBQUNqQyxvSEFBZ0Q7QUFNaEQsTUFBTSxvQkFBb0IsR0FBbUI7SUFDM0MsU0FBUyxDQUFDLFlBQTBCO1FBQ2xDLE9B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QkFBb0IsRUFDcEIsd0JBQXdCLEVBQ3hCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLDBCQUEwQixFQUMxQiwwQkFBMEIsQ0FDM0I7S0FDQSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7S0FDOUIsc0JBQXNCLENBQUMsOEJBQThCLENBQUM7S0FDdEQsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDdE5aOzs7OztLQUtLOztBQUVMLGtCQUFlO0lBQ2IsRUFBRSxFQUFFO1FBQ0YsV0FBVyxFQUFFO1lBQ1gsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixhQUFhLEVBQUUscUNBQXFDO1lBQ3BELGNBQWMsRUFBRSxxQkFBcUI7WUFDckMsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxXQUFXLEVBQUUsT0FBTztZQUNwQixhQUFhLEVBQUUsMkJBQTJCO1lBQzFDLFlBQVksRUFDVix1Q0FBdUM7WUFDekMsU0FBUyxFQUNQLHVDQUF1QztTQUMxQztLQUNGO0NBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdEJGLHlDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLDRDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgQWxleGEsIHtcbiAgSGFuZGxlcklucHV0IGFzIE1pbkhhbmRsZXJJbnB1dCxcbiAgZ2V0TG9jYWxlLFxuICBSZXF1ZXN0SGFuZGxlcixcbiAgRXJyb3JIYW5kbGVyLFxuICBTa2lsbEJ1aWxkZXJzXG59IGZyb20gXCJhc2stc2RrLWNvcmVcIjtcbmltcG9ydCB7IFNlc3Npb25FbmRlZFJlcXVlc3QsIEludGVudFJlcXVlc3QgfSBmcm9tIFwiYXNrLXNkay1tb2RlbFwiO1xuaW1wb3J0IGkxOG4gZnJvbSBcImkxOG5leHRcIjtcbmltcG9ydCBycCBmcm9tIFwicmVxdWVzdC1wcm9taXNlXCI7XG5pbXBvcnQgbGFuZ3VhZ2VTdHJpbmdzIGZyb20gXCIuL2xhbmd1YWdlU3RyaW5nc1wiO1xuXG50eXBlIEhhbmRsZXJJbnB1dCA9IE1pbkhhbmRsZXJJbnB1dCAmIHtcbiAgdDogKC4uLmFyZ3M6IGFueVtdKSA9PiBzdHJpbmc7XG59O1xuXG5jb25zdCBsYXVuY2hSZXF1ZXN0SGFuZGxlcjogUmVxdWVzdEhhbmRsZXIgPSB7XG4gIGNhbkhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gXCJMYXVuY2hSZXF1ZXN0XCI7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHNwZWVjaFRleHQgPSBoYW5kbGVySW5wdXQudChcIldFTENPTUVfTVNHXCIpO1xuXG4gICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcbiAgICAgIC5zcGVhayhzcGVlY2hUZXh0KVxuICAgICAgLnJlcHJvbXB0KHNwZWVjaFRleHQpXG4gICAgICAuZ2V0UmVzcG9uc2UoKTtcbiAgfVxufTtcblxuY29uc3QgcGxhbkludGVudEhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09IFwiSW50ZW50UmVxdWVzdFwiICYmXG4gICAgICBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09IFwiUGxhbkludGVudFwiXG4gICAgKTtcbiAgfSxcbiAgaGFuZGxlKGhhbmRsZXJJbnB1dDogSGFuZGxlcklucHV0KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdDtcbiAgICBjb25zb2xlLmxvZygocmVxdWVzdCBhcyBJbnRlbnRSZXF1ZXN0KS5pbnRlbnQuc2xvdHMpO1xuXG4gICAgY29uc3QgcGxhbkRhdGUgPSAocmVxdWVzdCBhcyBJbnRlbnRSZXF1ZXN0KS5pbnRlbnQuc2xvdHNbXCJQbGFuRGF0ZVwiXS52YWx1ZTtcbiAgICBjb25zdCBwbGFuQ2l0eSA9IChyZXF1ZXN0IGFzIEludGVudFJlcXVlc3QpLmludGVudC5zbG90c1tcIlBsYW5DaXR5XCJdLnZhbHVlO1xuXG4gICAgaWYgKHBsYW5EYXRlICYmIHBsYW5DaXR5KSB7XG4gICAgICBjb25zdCBzcGVlY2hUZXh0ID0gaGFuZGxlcklucHV0LnQoXCJQTEFOX0RBVEVfTVNHXCIsIHtcbiAgICAgICAgcGxhbkRhdGUsXG4gICAgICAgIHBsYW5DaXR5XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcbiAgICAgICAgLnNwZWFrKHNwZWVjaFRleHQpXG4gICAgICAgIC5yZXByb21wdChzcGVlY2hUZXh0KVxuICAgICAgICAuZ2V0UmVzcG9uc2UoKTtcbiAgICB9XG5cbiAgICBjb25zdCB2bHVlID0gKHJlcXVlc3QgYXMgSW50ZW50UmVxdWVzdCkuaW50ZW50LnNsb3RzW1wiUXVlcnlcIl0udmFsdWU7XG4gICAgY29uc3Qgc3BlZWNoVGV4dCA9IGhhbmRsZXJJbnB1dC50KFwiUExBTl9RVUVSWV9NU0dcIiwgeyBwbGFuTmFtZTogdmx1ZSB9KTtcblxuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXG4gICAgICAuc3BlYWsoc3BlZWNoVGV4dClcbiAgICAgIC5yZXByb21wdChzcGVlY2hUZXh0KVxuICAgICAgLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmNvbnN0IGhlbGxvV29ybGRJbnRlbnRIYW5kbGVyOiBSZXF1ZXN0SGFuZGxlciA9IHtcbiAgY2FuSGFuZGxlKGhhbmRsZXJJbnB1dDogSGFuZGxlcklucHV0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC50eXBlID09PSBcIkludGVudFJlcXVlc3RcIiAmJlxuICAgICAgaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PSBcIkhlbGxvV29ybGRJbnRlbnRcIlxuICAgICk7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHNwZWVjaFRleHQgPSBcIkhlbGxvIFdvcmxkIVwiO1xuXG4gICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcbiAgICAgIC5zcGVhayhzcGVlY2hUZXh0KVxuICAgICAgLndpdGhTaW1wbGVDYXJkKFwiSGVsbG8gV29ybGRcIiwgc3BlZWNoVGV4dClcbiAgICAgIC5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5jb25zdCBBY2NvdW50TGlua2luZ1Rlc3RJbnRlbnQgPSB7XG4gIGNhbkhhbmRsZShoYW5kbGVySW5wdXQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT0gXCJJbnRlbnRSZXF1ZXN0XCIgJiZcbiAgICAgIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC5pbnRlbnQubmFtZSA9PVxuICAgICAgICBcIkFjY291bnRMaW5raW5nVGVzdEludGVudFwiXG4gICAgKTtcbiAgfSxcbiAgYXN5bmMgaGFuZGxlKGhhbmRsZXJJbnB1dCkge1xuICAgIGxldCBhY2Nlc3NUb2tlbiA9XG4gICAgICBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLmNvbnRleHQuU3lzdGVtLnVzZXIuYWNjZXNzVG9rZW47XG4gICAgaWYgKGFjY2Vzc1Rva2VuID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIOODiOODvOOCr+ODs+OBjOacquWumue+qeOBruWgtOWQiOOBr+ODpuODvOOCtuODvOOBq+ioseWPr+OCkuS/g+OBmVxuICAgICAgbGV0IG1lc3NhZ2UgPSBcIuOCueOCreODq+OCkuWIqeeUqOOBmeOCi+OBn+OCgeOBq+ODreOCsOOCpOODs+OCkuioseWPr+OBl+OBpuOBj+OBoOOBleOBhFwiO1xuICAgICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcbiAgICAgICAgLnNwZWFrKG1lc3NhZ2UpXG4gICAgICAgIC53aXRoTGlua0FjY291bnRDYXJkKClcbiAgICAgICAgLmdldFJlc3BvbnNlKCk7XG4gICAgfVxuXG4gICAgbGV0IHVybCA9IFwiaHR0cHM6Ly9hcGkuYW1hem9uLmNvbS91c2VyL3Byb2ZpbGU/YWNjZXNzX3Rva2VuPVwiICsgYWNjZXNzVG9rZW47XG4gICAgdHJ5IHtcbiAgICAgIGxldCBib2R5ID0gYXdhaXQgcnAodXJsKS5wcm9taXNlKCk7XG4gICAgICBjb25zb2xlLmxvZyhib2R5KTtcbiAgICAgIGxldCBuYW1lID0gSlNPTi5wYXJzZShib2R5KS5uYW1lO1xuICAgICAgbGV0IHNwZWVjaFRleHQgPSBuYW1lICsgXCLjgZXjgpPjgIHjgZPjgpPjgavjgaHjga9cIjtcbiAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXG4gICAgICAgIC5zcGVhayhzcGVlY2hUZXh0KVxuICAgICAgICAucmVwcm9tcHQoc3BlZWNoVGV4dClcbiAgICAgICAgLmdldFJlc3BvbnNlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxuICAgICAgICAuc3BlYWsoXCLpgJrkv6HjgavllY/poYzjgYznmbrnlJ/jgZfjgb7jgZfjgZ/jgIJcIilcbiAgICAgICAgLmdldFJlc3BvbnNlKCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBoZWxwSW50ZW50SGFuZGxlcjogUmVxdWVzdEhhbmRsZXIgPSB7XG4gIGNhbkhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIHJldHVybiAoXG4gICAgICBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gXCJJbnRlbnRSZXF1ZXN0XCIgJiZcbiAgICAgIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC5pbnRlbnQubmFtZSA9PT0gXCJBTUFaT04uSGVscEludGVudFwiXG4gICAgKTtcbiAgfSxcbiAgaGFuZGxlKGhhbmRsZXJJbnB1dDogSGFuZGxlcklucHV0KSB7XG4gICAgY29uc3Qgc3BlZWNoVGV4dCA9IFwiWW91IGNhbiBzYXkgaGVsbG8gdG8gbWUhXCI7XG5cbiAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxuICAgICAgLnNwZWFrKHNwZWVjaFRleHQpXG4gICAgICAucmVwcm9tcHQoc3BlZWNoVGV4dClcbiAgICAgIC53aXRoU2ltcGxlQ2FyZChcIkhlbGxvIFdvcmxkXCIsIHNwZWVjaFRleHQpXG4gICAgICAuZ2V0UmVzcG9uc2UoKTtcbiAgfVxufTtcblxuY29uc3QgY2FuY2VsQW5kU3RvcEludGVudEhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09IFwiSW50ZW50UmVxdWVzdFwiICYmXG4gICAgICAoaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PVxuICAgICAgICBcIkFNQVpPTi5DYW5jZWxJbnRlbnRcIiB8fFxuICAgICAgICBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09XG4gICAgICAgICAgXCJBTUFaT04uU3RvcEludGVudFwiKVxuICAgICk7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHNwZWVjaFRleHQgPSBcIkdvb2RieWUhXCI7XG5cbiAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxuICAgICAgLnNwZWFrKHNwZWVjaFRleHQpXG4gICAgICAud2l0aFNpbXBsZUNhcmQoXCJIZWxsbyBXb3JsZFwiLCBzcGVlY2hUZXh0KVxuICAgICAgLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmNvbnN0IHNlc3Npb25FbmRlZFJlcXVlc3RIYW5kbGVyOiBSZXF1ZXN0SGFuZGxlciA9IHtcbiAgY2FuSGFuZGxlKGhhbmRsZXJJbnB1dDogSGFuZGxlcklucHV0KSB7XG4gICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC50eXBlID09PSBcIlNlc3Npb25FbmRlZFJlcXVlc3RcIjtcbiAgfSxcbiAgaGFuZGxlKGhhbmRsZXJJbnB1dDogSGFuZGxlcklucHV0KSB7XG4gICAgY29uc3QgeyByZWFzb24gfSA9IGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGVcbiAgICAgIC5yZXF1ZXN0IGFzIFNlc3Npb25FbmRlZFJlcXVlc3Q7XG4gICAgY29uc29sZS5sb2coYFNlc3Npb24gZW5kZWQgd2l0aCByZWFzb246ICR7cmVhc29ufWApO1xuXG4gICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXIuZ2V0UmVzcG9uc2UoKTtcbiAgfVxufTtcblxuY29uc3QgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIgPSB7XG4gIGNhbkhhbmRsZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgaGFuZGxlKGhhbmRsZXJJbnB1dDogSGFuZGxlcklucHV0LCBlcnJvcjogRXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgaGFuZGxlZDogJHtlcnJvci5tZXNzYWdlfWApO1xuXG4gICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcbiAgICAgIC5zcGVhayhcIlNvcnJ5LCBJIGNhbid0IHVuZGVyc3RhbmQgdGhlIGNvbW1hbmQuIFBsZWFzZSBzYXkgYWdhaW4uXCIpXG4gICAgICAucmVwcm9tcHQoXCJTb3JyeSwgSSBjYW4ndCB1bmRlcnN0YW5kIHRoZSBjb21tYW5kLiBQbGVhc2Ugc2F5IGFnYWluLlwiKVxuICAgICAgLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmNvbnN0IExvY2FsaXNhdGlvblJlcXVlc3RJbnRlcmNlcHRvciA9IHtcbiAgcHJvY2VzcyhoYW5kbGVySW5wdXQpIHtcbiAgICBpMThuXG4gICAgICAuaW5pdCh7XG4gICAgICAgIGxuZzogZ2V0TG9jYWxlKGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUpLFxuICAgICAgICByZXNvdXJjZXM6IGxhbmd1YWdlU3RyaW5nc1xuICAgICAgfSlcbiAgICAgIC50aGVuKCh0OiAoLi4uYXJnczogYW55W10pID0+IHN0cmluZykgPT4ge1xuICAgICAgICBoYW5kbGVySW5wdXQudCA9ICguLi5hcmdzOiBhbnlbXSkgPT4gdCguLi5hcmdzKTtcbiAgICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCBza2lsbEJ1aWxkZXIgPSBTa2lsbEJ1aWxkZXJzLmN1c3RvbSgpO1xuXG5leHBvcnRzLmhhbmRsZXIgPSBza2lsbEJ1aWxkZXJcbiAgLmFkZFJlcXVlc3RIYW5kbGVycyhcbiAgICBsYXVuY2hSZXF1ZXN0SGFuZGxlcixcbiAgICBBY2NvdW50TGlua2luZ1Rlc3RJbnRlbnQsXG4gICAgcGxhbkludGVudEhhbmRsZXIsXG4gICAgaGVsbG9Xb3JsZEludGVudEhhbmRsZXIsXG4gICAgaGVscEludGVudEhhbmRsZXIsXG4gICAgY2FuY2VsQW5kU3RvcEludGVudEhhbmRsZXIsXG4gICAgc2Vzc2lvbkVuZGVkUmVxdWVzdEhhbmRsZXJcbiAgKVxuICAuYWRkRXJyb3JIYW5kbGVycyhlcnJvckhhbmRsZXIpXG4gIC5hZGRSZXF1ZXN0SW50ZXJjZXB0b3JzKExvY2FsaXNhdGlvblJlcXVlc3RJbnRlcmNlcHRvcilcbiAgLmxhbWJkYSgpO1xuIiwiLyogKlxuICogV2UgY3JlYXRlIGEgbGFuZ3VhZ2Ugc3RyaW5ncyBvYmplY3QgY29udGFpbmluZyBhbGwgb2Ygb3VyIHN0cmluZ3MuXG4gKiBUaGUga2V5cyBmb3IgZWFjaCBzdHJpbmcgd2lsbCB0aGVuIGJlIHJlZmVyZW5jZWQgaW4gb3VyIGNvZGUsIGUuZy4gaGFuZGxlcklucHV0LnQoJ1dFTENPTUVfTVNHJykuXG4gKiBUaGUgbG9jYWxpc2F0aW9uIGludGVyY2VwdG9yIGluIGluZGV4LmpzIHdpbGwgYXV0b21hdGljYWxseSBjaG9vc2UgdGhlIHN0cmluZ3NcbiAqIHRoYXQgbWF0Y2ggdGhlIHJlcXVlc3QncyBsb2NhbGUuXG4gKiAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGphOiB7XG4gICAgdHJhbnNsYXRpb246IHtcbiAgICAgIFdFTENPTUVfTVNHOiBcIuS9nOaIkOOBl+OBn+OBhOS6iOWumuOCkuaVmeOBiOOBpuS4i+OBleOBhFwiLFxuICAgICAgUExBTl9EQVRFX01TRzogXCJ7e3BsYW5EYXRlfX3jgat7e3BsYW5DaXR5fX3jga7kuojlrprjgpLkvZzmiJDjgZfjgb7jgZfjgZ9cIixcbiAgICAgIFBMQU5fUVVFUllfTVNHOiBcInt7cGxhbk5hbWV9feOCkui/veWKoOOBl+OBvuOBl+OBn1wiLFxuICAgICAgSEVMUF9NU0c6IFwi44GT44KT44Gr44Gh44Gv44CB44Go6KiA44Gj44Gm44G/44Gm44GP44Gg44GV44GE44CC44Gp44GG44Ge77yBXCIsXG4gICAgICBHT09EQllFX01TRzogXCLjgZXjgojjgYbjgarjgolcIixcbiAgICAgIFJFRkxFQ1RPUl9NU0c6IFwie3tpbnRlbnROYW1lfX3jgYzjg4jjg6rjgqzjg7zjgZXjgozjgb7jgZfjgZ/jgIJcIixcbiAgICAgIEZBTExCQUNLX01TRzpcbiAgICAgICAgXCLjgZTjgoHjgpPjgarjgZXjgYTjgILjgaHjgofjgaPjgajjgojjgY/jgo/jgYvjgorjgb7jgZvjgpPjgafjgZfjgZ/jgILjgoLjgYbkuIDluqboqIDjgaPjgabjgb/jgabjgY/jgaDjgZXjgYTjgIJcIixcbiAgICAgIEVSUk9SX01TRzpcbiAgICAgICAgXCLjgZTjgoHjgpPjgarjgZXjgYTjgILjgarjgpPjgaDjgYvjgYbjgb7jgY/ooYzjgYvjgarjgYTjgojjgYbjgafjgZnjgILjgoLjgYbkuIDluqboqIDjgaPjgabjgb/jgabjgY/jgaDjgZXjgYTjgIJcIlxuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzay1zZGstY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpMThuZXh0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlcXVlc3QtcHJvbWlzZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9