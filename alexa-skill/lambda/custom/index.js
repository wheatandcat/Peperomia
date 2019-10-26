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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ask_sdk_core_1 = __webpack_require__(/*! ask-sdk-core */ "ask-sdk-core");
const i18next_1 = __importDefault(__webpack_require__(/*! i18next */ "i18next"));
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
    .addRequestHandlers(launchRequestHandler, planIntentHandler, helloWorldIntentHandler, helpIntentHandler, cancelAndStopIntentHandler, sessionEndedRequestHandler)
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9pbmRleC8uL3NyYy9sYW5ndWFnZVN0cmluZ3MudHMiLCJ3ZWJwYWNrOi8vaW5kZXgvZXh0ZXJuYWwgXCJhc2stc2RrLWNvcmVcIiIsIndlYnBhY2s6Ly9pbmRleC9leHRlcm5hbCBcImkxOG5leHRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLCtFQU1zQjtBQUV0QixpRkFBMkI7QUFDM0Isb0hBQWdEO0FBTWhELE1BQU0sb0JBQW9CLEdBQW1CO0lBQzNDLFNBQVMsQ0FBQyxZQUEwQjtRQUNsQyxPQUFPLFlBQVksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUM7SUFDdkUsQ0FBQztJQUNE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RUwsa0JBQWU7SUFDYixFQUFFLEVBQUU7UUFDRixXQUFXLEVBQUU7WUFDWCxXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLGFBQWEsRUFBRSxxQ0FBcUM7WUFDcEQsY0FBYyxFQUFFLHFCQUFxQjtZQUNyQyxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLGFBQWEsRUFBRSwyQkFBMkI7WUFDMUMsWUFBWSxFQUNWLHVDQUF1QztZQUN6QyxTQUFTLEVBQ1AsdUNBQXVDO1NBQzFDO0tBQ0Y7Q0FDRixDQUFDOzs7Ozs7Ozs7Ozs7QUN0QkYseUM7Ozs7Ozs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBBbGV4YSwge1xuICBIYW5kbGVySW5wdXQgYXMgTWluSGFuZGxlcklucHV0LFxuICBnZXRMb2NhbGUsXG4gIFJlcXVlc3RIYW5kbGVyLFxuICBFcnJvckhhbmRsZXIsXG4gIFNraWxsQnVpbGRlcnNcbn0gZnJvbSBcImFzay1zZGstY29yZVwiO1xuaW1wb3J0IHsgU2Vzc2lvbkVuZGVkUmVxdWVzdCwgSW50ZW50UmVxdWVzdCB9IGZyb20gXCJhc2stc2RrLW1vZGVsXCI7XG5pbXBvcnQgaTE4biBmcm9tIFwiaTE4bmV4dFwiO1xuaW1wb3J0IGxhbmd1YWdlU3RyaW5ncyBmcm9tIFwiLi9sYW5ndWFnZVN0cmluZ3NcIjtcblxudHlwZSBIYW5kbGVySW5wdXQgPSBNaW5IYW5kbGVySW5wdXQgJiB7XG4gIHQ6ICguLi5hcmdzOiBhbnlbXSkgPT4gc3RyaW5nO1xufTtcblxuY29uc3QgbGF1bmNoUmVxdWVzdEhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09IFwiTGF1bmNoUmVxdWVzdFwiO1xuICB9LFxuICBoYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICBjb25zdCBzcGVlY2hUZXh0ID0gaGFuZGxlcklucHV0LnQoXCJXRUxDT01FX01TR1wiKTtcblxuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXG4gICAgICAuc3BlYWsoc3BlZWNoVGV4dClcbiAgICAgIC5yZXByb21wdChzcGVlY2hUZXh0KVxuICAgICAgLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmNvbnN0IHBsYW5JbnRlbnRIYW5kbGVyOiBSZXF1ZXN0SGFuZGxlciA9IHtcbiAgY2FuSGFuZGxlKGhhbmRsZXJJbnB1dDogSGFuZGxlcklucHV0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC50eXBlID09PSBcIkludGVudFJlcXVlc3RcIiAmJlxuICAgICAgaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PSBcIlBsYW5JbnRlbnRcIlxuICAgICk7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3Q7XG4gICAgY29uc29sZS5sb2coKHJlcXVlc3QgYXMgSW50ZW50UmVxdWVzdCkuaW50ZW50LnNsb3RzKTtcblxuICAgIGNvbnN0IHBsYW5EYXRlID0gKHJlcXVlc3QgYXMgSW50ZW50UmVxdWVzdCkuaW50ZW50LnNsb3RzW1wiUGxhbkRhdGVcIl0udmFsdWU7XG4gICAgY29uc3QgcGxhbkNpdHkgPSAocmVxdWVzdCBhcyBJbnRlbnRSZXF1ZXN0KS5pbnRlbnQuc2xvdHNbXCJQbGFuQ2l0eVwiXS52YWx1ZTtcblxuICAgIGlmIChwbGFuRGF0ZSAmJiBwbGFuQ2l0eSkge1xuICAgICAgY29uc3Qgc3BlZWNoVGV4dCA9IGhhbmRsZXJJbnB1dC50KFwiUExBTl9EQVRFX01TR1wiLCB7XG4gICAgICAgIHBsYW5EYXRlLFxuICAgICAgICBwbGFuQ2l0eVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXG4gICAgICAgIC5zcGVhayhzcGVlY2hUZXh0KVxuICAgICAgICAucmVwcm9tcHQoc3BlZWNoVGV4dClcbiAgICAgICAgLmdldFJlc3BvbnNlKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgdmx1ZSA9IChyZXF1ZXN0IGFzIEludGVudFJlcXVlc3QpLmludGVudC5zbG90c1tcIlF1ZXJ5XCJdLnZhbHVlO1xuICAgIGNvbnN0IHNwZWVjaFRleHQgPSBoYW5kbGVySW5wdXQudChcIlBMQU5fUVVFUllfTVNHXCIsIHsgcGxhbk5hbWU6IHZsdWUgfSk7XG5cbiAgICByZXR1cm4gaGFuZGxlcklucHV0LnJlc3BvbnNlQnVpbGRlclxuICAgICAgLnNwZWFrKHNwZWVjaFRleHQpXG4gICAgICAucmVwcm9tcHQoc3BlZWNoVGV4dClcbiAgICAgIC5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5jb25zdCBoZWxsb1dvcmxkSW50ZW50SGFuZGxlcjogUmVxdWVzdEhhbmRsZXIgPSB7XG4gIGNhbkhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIHJldHVybiAoXG4gICAgICBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gXCJJbnRlbnRSZXF1ZXN0XCIgJiZcbiAgICAgIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC5pbnRlbnQubmFtZSA9PT0gXCJIZWxsb1dvcmxkSW50ZW50XCJcbiAgICApO1xuICB9LFxuICBoYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICBjb25zdCBzcGVlY2hUZXh0ID0gXCJIZWxsbyBXb3JsZCFcIjtcblxuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXG4gICAgICAuc3BlYWsoc3BlZWNoVGV4dClcbiAgICAgIC53aXRoU2ltcGxlQ2FyZChcIkhlbGxvIFdvcmxkXCIsIHNwZWVjaFRleHQpXG4gICAgICAuZ2V0UmVzcG9uc2UoKTtcbiAgfVxufTtcblxuY29uc3QgaGVscEludGVudEhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LnR5cGUgPT09IFwiSW50ZW50UmVxdWVzdFwiICYmXG4gICAgICBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QuaW50ZW50Lm5hbWUgPT09IFwiQU1BWk9OLkhlbHBJbnRlbnRcIlxuICAgICk7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHNwZWVjaFRleHQgPSBcIllvdSBjYW4gc2F5IGhlbGxvIHRvIG1lIVwiO1xuXG4gICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcbiAgICAgIC5zcGVhayhzcGVlY2hUZXh0KVxuICAgICAgLnJlcHJvbXB0KHNwZWVjaFRleHQpXG4gICAgICAud2l0aFNpbXBsZUNhcmQoXCJIZWxsbyBXb3JsZFwiLCBzcGVlY2hUZXh0KVxuICAgICAgLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmNvbnN0IGNhbmNlbEFuZFN0b3BJbnRlbnRIYW5kbGVyOiBSZXF1ZXN0SGFuZGxlciA9IHtcbiAgY2FuSGFuZGxlKGhhbmRsZXJJbnB1dDogSGFuZGxlcklucHV0KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC50eXBlID09PSBcIkludGVudFJlcXVlc3RcIiAmJlxuICAgICAgKGhhbmRsZXJJbnB1dC5yZXF1ZXN0RW52ZWxvcGUucmVxdWVzdC5pbnRlbnQubmFtZSA9PT1cbiAgICAgICAgXCJBTUFaT04uQ2FuY2VsSW50ZW50XCIgfHxcbiAgICAgICAgaGFuZGxlcklucHV0LnJlcXVlc3RFbnZlbG9wZS5yZXF1ZXN0LmludGVudC5uYW1lID09PVxuICAgICAgICAgIFwiQU1BWk9OLlN0b3BJbnRlbnRcIilcbiAgICApO1xuICB9LFxuICBoYW5kbGUoaGFuZGxlcklucHV0OiBIYW5kbGVySW5wdXQpIHtcbiAgICBjb25zdCBzcGVlY2hUZXh0ID0gXCJHb29kYnllIVwiO1xuXG4gICAgcmV0dXJuIGhhbmRsZXJJbnB1dC5yZXNwb25zZUJ1aWxkZXJcbiAgICAgIC5zcGVhayhzcGVlY2hUZXh0KVxuICAgICAgLndpdGhTaW1wbGVDYXJkKFwiSGVsbG8gV29ybGRcIiwgc3BlZWNoVGV4dClcbiAgICAgIC5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5jb25zdCBzZXNzaW9uRW5kZWRSZXF1ZXN0SGFuZGxlcjogUmVxdWVzdEhhbmRsZXIgPSB7XG4gIGNhbkhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlLnJlcXVlc3QudHlwZSA9PT0gXCJTZXNzaW9uRW5kZWRSZXF1ZXN0XCI7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCkge1xuICAgIGNvbnN0IHsgcmVhc29uIH0gPSBoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlXG4gICAgICAucmVxdWVzdCBhcyBTZXNzaW9uRW5kZWRSZXF1ZXN0O1xuICAgIGNvbnNvbGUubG9nKGBTZXNzaW9uIGVuZGVkIHdpdGggcmVhc29uOiAke3JlYXNvbn1gKTtcblxuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyLmdldFJlc3BvbnNlKCk7XG4gIH1cbn07XG5cbmNvbnN0IGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyID0ge1xuICBjYW5IYW5kbGUoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGhhbmRsZShoYW5kbGVySW5wdXQ6IEhhbmRsZXJJbnB1dCwgZXJyb3I6IEVycm9yKSB7XG4gICAgY29uc29sZS5sb2coYEVycm9yIGhhbmRsZWQ6ICR7ZXJyb3IubWVzc2FnZX1gKTtcblxuICAgIHJldHVybiBoYW5kbGVySW5wdXQucmVzcG9uc2VCdWlsZGVyXG4gICAgICAuc3BlYWsoXCJTb3JyeSwgSSBjYW4ndCB1bmRlcnN0YW5kIHRoZSBjb21tYW5kLiBQbGVhc2Ugc2F5IGFnYWluLlwiKVxuICAgICAgLnJlcHJvbXB0KFwiU29ycnksIEkgY2FuJ3QgdW5kZXJzdGFuZCB0aGUgY29tbWFuZC4gUGxlYXNlIHNheSBhZ2Fpbi5cIilcbiAgICAgIC5nZXRSZXNwb25zZSgpO1xuICB9XG59O1xuXG5jb25zdCBMb2NhbGlzYXRpb25SZXF1ZXN0SW50ZXJjZXB0b3IgPSB7XG4gIHByb2Nlc3MoaGFuZGxlcklucHV0KSB7XG4gICAgaTE4blxuICAgICAgLmluaXQoe1xuICAgICAgICBsbmc6IGdldExvY2FsZShoYW5kbGVySW5wdXQucmVxdWVzdEVudmVsb3BlKSxcbiAgICAgICAgcmVzb3VyY2VzOiBsYW5ndWFnZVN0cmluZ3NcbiAgICAgIH0pXG4gICAgICAudGhlbigodDogKC4uLmFyZ3M6IGFueVtdKSA9PiBzdHJpbmcpID0+IHtcbiAgICAgICAgaGFuZGxlcklucHV0LnQgPSAoLi4uYXJnczogYW55W10pID0+IHQoLi4uYXJncyk7XG4gICAgICB9KTtcbiAgfVxufTtcblxuY29uc3Qgc2tpbGxCdWlsZGVyID0gU2tpbGxCdWlsZGVycy5jdXN0b20oKTtcblxuZXhwb3J0cy5oYW5kbGVyID0gc2tpbGxCdWlsZGVyXG4gIC5hZGRSZXF1ZXN0SGFuZGxlcnMoXG4gICAgbGF1bmNoUmVxdWVzdEhhbmRsZXIsXG4gICAgcGxhbkludGVudEhhbmRsZXIsXG4gICAgaGVsbG9Xb3JsZEludGVudEhhbmRsZXIsXG4gICAgaGVscEludGVudEhhbmRsZXIsXG4gICAgY2FuY2VsQW5kU3RvcEludGVudEhhbmRsZXIsXG4gICAgc2Vzc2lvbkVuZGVkUmVxdWVzdEhhbmRsZXJcbiAgKVxuICAuYWRkRXJyb3JIYW5kbGVycyhlcnJvckhhbmRsZXIpXG4gIC5hZGRSZXF1ZXN0SW50ZXJjZXB0b3JzKExvY2FsaXNhdGlvblJlcXVlc3RJbnRlcmNlcHRvcilcbiAgLmxhbWJkYSgpO1xuIiwiLyogKlxuICogV2UgY3JlYXRlIGEgbGFuZ3VhZ2Ugc3RyaW5ncyBvYmplY3QgY29udGFpbmluZyBhbGwgb2Ygb3VyIHN0cmluZ3MuXG4gKiBUaGUga2V5cyBmb3IgZWFjaCBzdHJpbmcgd2lsbCB0aGVuIGJlIHJlZmVyZW5jZWQgaW4gb3VyIGNvZGUsIGUuZy4gaGFuZGxlcklucHV0LnQoJ1dFTENPTUVfTVNHJykuXG4gKiBUaGUgbG9jYWxpc2F0aW9uIGludGVyY2VwdG9yIGluIGluZGV4LmpzIHdpbGwgYXV0b21hdGljYWxseSBjaG9vc2UgdGhlIHN0cmluZ3NcbiAqIHRoYXQgbWF0Y2ggdGhlIHJlcXVlc3QncyBsb2NhbGUuXG4gKiAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGphOiB7XG4gICAgdHJhbnNsYXRpb246IHtcbiAgICAgIFdFTENPTUVfTVNHOiBcIuS9nOaIkOOBl+OBn+OBhOS6iOWumuOCkuaVmeOBiOOBpuS4i+OBleOBhFwiLFxuICAgICAgUExBTl9EQVRFX01TRzogXCJ7e3BsYW5EYXRlfX3jgat7e3BsYW5DaXR5fX3jga7kuojlrprjgpLkvZzmiJDjgZfjgb7jgZfjgZ9cIixcbiAgICAgIFBMQU5fUVVFUllfTVNHOiBcInt7cGxhbk5hbWV9feOCkui/veWKoOOBl+OBvuOBl+OBn1wiLFxuICAgICAgSEVMUF9NU0c6IFwi44GT44KT44Gr44Gh44Gv44CB44Go6KiA44Gj44Gm44G/44Gm44GP44Gg44GV44GE44CC44Gp44GG44Ge77yBXCIsXG4gICAgICBHT09EQllFX01TRzogXCLjgZXjgojjgYbjgarjgolcIixcbiAgICAgIFJFRkxFQ1RPUl9NU0c6IFwie3tpbnRlbnROYW1lfX3jgYzjg4jjg6rjgqzjg7zjgZXjgozjgb7jgZfjgZ/jgIJcIixcbiAgICAgIEZBTExCQUNLX01TRzpcbiAgICAgICAgXCLjgZTjgoHjgpPjgarjgZXjgYTjgILjgaHjgofjgaPjgajjgojjgY/jgo/jgYvjgorjgb7jgZvjgpPjgafjgZfjgZ/jgILjgoLjgYbkuIDluqboqIDjgaPjgabjgb/jgabjgY/jgaDjgZXjgYTjgIJcIixcbiAgICAgIEVSUk9SX01TRzpcbiAgICAgICAgXCLjgZTjgoHjgpPjgarjgZXjgYTjgILjgarjgpPjgaDjgYvjgYbjgb7jgY/ooYzjgYvjgarjgYTjgojjgYbjgafjgZnjgILjgoLjgYbkuIDluqboqIDjgaPjgabjgb/jgabjgY/jgaDjgZXjgYTjgIJcIlxuICAgIH1cbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzay1zZGstY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpMThuZXh0XCIpOyJdLCJzb3VyY2VSb290IjoiIn0=