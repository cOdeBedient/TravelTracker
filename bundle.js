/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: #f7ff80;\n}\n\n.background-color {\n  background: #fb4166;\n}\n\n.pending {\n  background-color: #f5ff67 !important;\n}\n\n.pending-details {\n  background-color: #f8fead !important;\n}\n\n.past {\n  background-color: #9a9a9a !important;\n}\n\n.past-details {\n  background-color: #b9b9b9 !important;\n}\n\n.upcoming {\n  background-color: #27ffb7 !important;\n}\n\n.upcoming-details {\n  background-color: #9affdd !important;\n}\n\nbutton {\n  cursor: pointer;\n  border: none;\n}\n\nh1 {\n  color: white;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\nheader h1 {\n  font-size: 2.05em;\n  margin-bottom: 5px;\n  margin-left: 22px;\n}\nheader h2 {\n  margin-top: 0px;\n  font-size: 20px;\n  margin-bottom: 40px;\n  margin-left: 20px;\n}\nheader button {\n  height: fit-content;\n  margin-right: 50px;\n  margin-bottom: 40px;\n  background: none;\n  color: white;\n  font-size: 1.2em;\n  font-weight: bold;\n}\n\nspan {\n  font-style: italic;\n}\n\n.trips-container {\n  margin-top: -30px;\n  margin-bottom: 90px;\n  cursor: pointer;\n}\n\n.trips-heading {\n  width: fit-content;\n  transform: rotate(-4.25deg);\n  transform-origin: 0% 100%;\n  margin-bottom: 12px;\n  padding: 3px 7px 3px 7px;\n  margin-left: 20px;\n  background-color: white;\n}\n\n.trips-list h5 {\n  font-size: 1.4em;\n}\n.trips-list .trip-container {\n  transform: rotate(-4.25deg);\n  transform-origin: 0% 100%;\n  margin-left: -30px;\n  margin-right: -30px;\n}\n.trips-list .trip-header {\n  display: flex;\n  align-content: center;\n  width: 100%;\n  height: 45px;\n  margin-top: 8px;\n}\n.trips-list .trip-header:hover {\n  filter: brightness(120%);\n}\n.trips-list .name {\n  margin-right: 15px;\n  margin-left: 55px;\n  align-self: center;\n}\n.trips-list .date {\n  margin-right: 20px;\n  align-self: center;\n  color: black;\n}\n.trips-list .status {\n  margin-right: 20px;\n  font-style: italic;\n  align-self: center;\n  color: black;\n}\n.trips-list .trip-details {\n  width: 100%;\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n  height: 0vh;\n  overflow: hidden;\n}\n.trips-list .trip-details img {\n  height: 90%;\n  align-self: center;\n}\n\n.spent-container {\n  width: 100%;\n  margin-right: 0;\n  margin-top: -82px;\n  margin-bottom: 50px;\n  transform: rotate(-4.25deg);\n  transform-origin: 0% 100%;\n  display: flex;\n  justify-content: flex-end;\n}\n.spent-container h4 {\n  font-size: 1.2em;\n}\n.spent-container div {\n  width: fit-content;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  background-color: white;\n  padding-left: 10px;\n  padding-right: 10px;\n  margin-right: 10px;\n}\n.spent-container p {\n  margin-left: 10px;\n  font-size: 1.2em;\n  font-weight: bold;\n}\n\n.destinations-heading-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #f5ff66;\n  text-align: center;\n  margin-bottom: 5px;\n  margin-top: -30px;\n  position: relative;\n}\n.destinations-heading-container h3 {\n  margin-top: 3px;\n  margin-bottom: 3px;\n}\n.destinations-heading-container button {\n  height: 20px;\n  position: absolute;\n  right: 20px;\n  background-color: white;\n}\n\n.destinations-heading {\n  font-size: 1.5em;\n  padding-top: 3px;\n  padding-bottom: 3px;\n}\n\n.destination-header {\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background-color: #dbdbdb;\n  margin-top: 5px;\n  position: relative;\n  cursor: pointer;\n}\n.destination-header h3 {\n  font-size: 1.2em;\n  align-self: center;\n  margin: 0 10px 0 10px;\n}\n\n.fly {\n  margin-left: auto;\n  transition: margin-left 0.5s ease;\n}\n\n.fly-back {\n  margin-left: 0%;\n  transition: margin-left 0.5s ease;\n}\n\n#plane {\n  height: 50%;\n  align-self: center;\n}\n\nlabel {\n  font-size: 1.05em;\n}\n\n.destination-details {\n  width: 100%;\n  display: flex;\n  justify-content: space-evenly;\n  align-content: center;\n  height: 8vh;\n  background-color: #b9b9b9;\n  overflow: hidden;\n}\n\n.destination-image {\n  height: 90%;\n  align-self: center;\n}\n\n.trip-form {\n  display: flex;\n  align-items: center;\n}\n.trip-form input {\n  height: 25px;\n  margin-left: 5px;\n  margin-right: 10px;\n}\n.trip-form .travelers-field,\n.trip-form .duration-field {\n  width: 50px;\n  border: none;\n}\n.trip-form .departure-date-field {\n  width: 110px;\n  border: none;\n}\n.trip-form button {\n  margin-left: 5px;\n  height: 25px;\n  border: none;\n  background-color: #fcff9d;\n}\n.trip-form button:disabled {\n  background-color: #e2e2e2;\n}\n\n.new-costs {\n  margin-top: 10px;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.new-costs h4, .new-costs p {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.new-costs h4 {\n  font-size: 1em;\n  margin-right: 5px;\n}\n\n.login-title {\n  position: absolute;\n  top: 0;\n  left: 20px;\n}\n.login-title h1 {\n  font-size: 2em;\n  margin-bottom: 0;\n}\n.login-title h2 {\n  margin-top: 10px;\n  font-size: 1.2em;\n}\n\n.login-container {\n  width: 100%;\n  margin-top: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.login-form {\n  width: 600px;\n  height: 600px;\n  background: #fc466b;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: relative;\n}\n.login-form h2 {\n  margin-bottom: 100px;\n}\n.login-form input {\n  margin-left: 3px;\n  border: none;\n}\n\n.username-container,\n.button-container,\n.password-container {\n  background-color: #00ffaa;\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 5px;\n  width: 60%;\n  margin-right: 40vh;\n  transform: rotate(-5deg);\n  transform-origin: 0% 100%;\n}\n\n.password-error {\n  transform: rotate(-5deg);\n  transform-origin: 0% 100%;\n  margin-left: 205px;\n  margin-top: -2%;\n  color: white;\n  font-style: italic;\n  position: absolute;\n  bottom: 40%;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.error-message {\n  margin-top: 25%;\n  text-align: center;\n  font-size: 2em;\n  background-color: #4cfec3;\n}\n\n.collapse {\n  transition: height 0.5s ease;\n  height: 0vh !important;\n  padding: 0;\n}\n\n.expand {\n  transition: height 0.5s ease;\n  height: 10vh !important;\n  padding: 0;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.scss"],"names":[],"mappings":"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","sourcesContent":["body {\n  background-color: rgb(247, 255, 128);\n  // background-image: url('/src/images/sky.jpg');\n  // background-size: cover;\n}\n\n.background-color {\n  background: rgb(251, 65, 102);\n  // background-image: url('/src/images/sky.jpg');\n  // background-size: contain;\n}\n\n.pending {\n  background-color: rgb(245, 255, 103) !important;\n}\n\n.pending-details {\n  background-color: rgb(248, 254, 173) !important;\n}\n\n.past {\n  background-color: rgb(154, 154, 154) !important;\n}\n\n.past-details {\n  background-color: rgb(185, 185, 185) !important;\n}\n\n.upcoming {\n  background-color: rgb(39, 255, 183) !important;\n}\n\n.upcoming-details {\n  background-color: rgb(154, 255, 221) !important;\n}\n\nbutton {\n  cursor: pointer;\n  border: none;\n}\n\nh1 {\n  color: white;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  h1 {\n    font-size: 2.05em;\n    margin-bottom: 5px;\n    margin-left: 22px;\n  }\n  \n  h2 {\n    margin-top: 0px;\n    font-size: 20px;\n    margin-bottom: 40px;\n    margin-left: 20px;\n  }\n\n  button {\n    height: fit-content;\n    margin-right: 50px;\n    margin-bottom: 40px;\n    background: none;\n    color: white;\n    font-size: 1.2em;\n    font-weight: bold;\n  }\n}\n\nspan {\n  font-style: italic;\n}\n\n.trips-container {\n  margin-top: -30px;\n  margin-bottom: 90px;\n  cursor: pointer;\n}\n\n.trips-heading {\n  width: fit-content;\n  transform: rotate(-4.25deg);\n  transform-origin: 0% 100%;\n  margin-bottom: 12px;\n  padding: 3px 7px 3px 7px;\n  margin-left: 20px;\n  background-color: white;\n}\n\n.trips-list {\n\n  h5 {\n    font-size: 1.4em;\n  }\n\n  .trip-container {\n    transform: rotate(-4.25deg);\n    transform-origin: 0% 100%;\n    margin-left: -30px;\n    margin-right: -30px;\n  }\n\n  .trip-header {\n    display: flex;\n    // justify-content: flex-end;\n    align-content: center;\n    width: 100%;\n    height: 45px;\n    margin-top: 8px;\n  }\n\n  .trip-header:hover {\n    filter: brightness(120%);\n    }\n\n\n  .name {\n    margin-right: 15px;\n    margin-left: 55px;\n    align-self: center;\n    \n  }\n  \n  .date {\n    margin-right: 20px;\n    align-self: center;\n    color: black;\n  }\n\n  .status {\n    margin-right: 20px;\n    font-style: italic;\n    align-self: center;\n    color: black;\n  }\n\n  .trip-details {\n    width: 100%;\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    height: 0vh;\n    overflow: hidden;\n\n    img {\n      height: 90%;\n      align-self: center;\n    }\n  }\n}\n\n.spent-container {\n  width: 100%;\n  margin-right: 0;\n  margin-top: -82px;\n  margin-bottom: 50px;\n  transform: rotate(-4.25deg);\n  transform-origin: 0% 100%;\n  display: flex;\n  justify-content: flex-end;\n\n  h4 {\n\n    font-size: 1.2em;\n  }\n\n  div {\n    width: fit-content;\n    height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    background-color: white;\n    padding-left: 10px;\n    padding-right: 10px;\n    margin-right: 10px;\n  }\n\n  p {\n    margin-left: 10px;\n    font-size: 1.2em;\n    font-weight: bold;\n  }\n}\n\n.destinations-heading-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: rgb(245, 255, 102);\n  text-align: center;\n  margin-bottom: 5px;\n  margin-top: -30px;\n  position: relative;\n\n  h3 {\n    margin-top: 3px;\n    margin-bottom: 3px;\n  }\n\n  button {\n    height: 20px;\n    position: absolute;\n    right: 20px;\n    background-color: white;\n  }\n}\n\n.destinations-heading {\n  font-size: 1.5em;\n  padding-top: 3px;\n  padding-bottom: 3px;\n}\n\n.destination-header {\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background-color: rgb(219, 219, 219);\n  margin-top: 5px;\n  position: relative;\n  cursor: pointer;\n\n  h3 {\n    font-size: 1.2em;\n    align-self: center;\n    margin: 0 10px 0 10px;\n  }\n}\n\n// .plane-container {\n//   max-width: 100%;\n//   display: flex;\n//   align-items: center;\n  // justify-content: flex-end;\n// }\n\n// .trip-header {\n//   display: flex;\n//   align-content: center;\n//   width: 100%;\n//   height: 45px;\n//   margin-top: 8px;\n// }\n\n.fly {\n  margin-left: auto;\n  // margin-right: 30px;\n  transition: margin-left .5s ease;\n}\n\n.fly-back {\n  margin-left: 0%;\n  transition: margin-left .5s ease;\n}\n\n#plane {\n  height: 50%;\n  align-self: center;\n  // display: inline-block;\n}\n\n// .fly {\n//   margin-left: 70%;\n//   margin-right: 30px;\n//   transition: margin .5s ease;\n// }\n\n// .fly-back {\n//   margin-left: 0%;\n//   transition: margin .5s ease;\n// }\n\n\n\nlabel {\n  font-size: 1.05em;\n}\n\n.destination-details {\n  width: 100%;\n  display: flex;\n  justify-content: space-evenly;\n  align-content: center;\n  height: 8vh;\n  background-color: rgb(185, 185, 185);\n  overflow: hidden;\n}\n\n.destination-image {\n  height: 90%;\n  align-self: center;\n}\n\n.trip-form {\n  display: flex;\n  align-items: center;\n\n  input {\n    height: 25px;\n    margin-left: 5px;\n    margin-right: 10px;\n  }\n\n  .travelers-field,\n  .duration-field {\n    width: 50px;\n    border: none;\n  }\n\n  .departure-date-field {\n    width: 110px;\n    border: none;\n  }\n\n  button {\n    margin-left: 5px;\n    height: 25px;\n    border: none;\n    background-color: rgb(252, 255, 157);\n  }\n\n  button:disabled {\n      background-color: rgb(226, 226, 226);\n  }\n}\n\n.new-costs {\n  margin-top: 10px;\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  h4, p {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  h4 {\n    font-size: 1em;\n    margin-right: 5px;\n  }\n}\n\n.login-title {\n  position: absolute;\n  top: 0;\n  left: 20px;\n  \n  h1 {\n    font-size: 2em;\n    margin-bottom: 0;\n  }\n\n  h2 {\n    margin-top: 10px;\n    font-size: 1.2em;\n  }\n}\n\n.login-container {\n  width: 100%;\n  margin-top: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.login-form {\n  width:600px;\n  height: 600px;\n  background: rgba(252,70,107,1);\n  display: flex;\n\n  flex-direction: column;\n  justify-content: center;\n  position: relative;\n\n  h2 {\n    margin-bottom: 100px\n  }\n\n  input {\n    margin-left: 3px;\n    border: none;\n  }\n}\n\n.username-container,\n.button-container,\n.password-container {\n  background-color: rgb(0, 255, 170);\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 5px;\n  width: 60%;\n  margin-right: 40vh;\n  transform: rotate(-5deg);\n  transform-origin: 0% 100%;\n}\n\n.password-error {\n  transform: rotate(-5deg);\n  transform-origin: 0% 100%;\n  margin-left: 205px;\n  margin-top: -2%;\n  color: white;\n  font-style: italic;\n  position: absolute;\n  bottom: 40%;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.error-message {\n  margin-top: 25%;\n  text-align: center;\n  font-size: 2em;\n  background-color: rgb(76, 254, 195);\n}\n\n.collapse {\n  transition: height .5s ease;\n  height: 0vh !important;\n  padding: 0;\n}\n\n.expand {\n  transition: height .5s ease;\n  height: 10vh !important;\n  padding: 0;\n}\n\n\n\n\n\n\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/new-plane.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/sky.jpg");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _traveler_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _login_data_user_logins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);





// QUERY SELECTORS
const tripsContainer = document.querySelector('.trips-container');
const tripsListContainer = document.querySelector('.trips-list');
const dollarsSpent = document.querySelector('.dollars-spent');
const destinationsListContainer = document.querySelector('.destinations-list');
const loginPage = document.querySelector('.login-form');
const usernameField = document.querySelector('#username');
const passwordField = document.querySelector('#password');
const loginSubmitButton = document.querySelector('.login-submit-button');
const mainPage = document.querySelector('main');
const header = document.querySelector('header');
const errorPage = document.querySelector('.error-message');
const passwordError = document.querySelector('.password-error');
const body = document.querySelector('body');
const myTripsButton = document.querySelector('.my-trips-button');
const spentContainer = document.querySelector('.spent-container');
const destinationsHeading = document.querySelector('.destinations-heading');
const destInfoButton = document.querySelector('.toggle-destinations');


// EVENT LISTENERS
loginSubmitButton.addEventListener('click', function(event) {
    logIn(event);
});

destinationsListContainer.addEventListener('submit', function(event) {
    event.preventDefault();
    handleSubmitClick(event);
});

destinationsListContainer.addEventListener('keyup', function(event) {
    handleFormEntry(event);
});

destinationsListContainer.addEventListener('input', function(event) {
    handleFormEntry(event);
});

tripsListContainer.addEventListener('keydown', function(event) { 
    if(event.key === 'Enter') {
        expandTripDetails(event, 'trip');
    }
});

tripsListContainer.addEventListener('click', function(event) {
    expandTripDetails(event, 'trip');
});

destInfoButton.addEventListener('click', toggleDestinationInfo);

myTripsButton.addEventListener('click', showMyTrips);

destinationsListContainer.addEventListener('click', function(event) {
    expandDestinationDetails(event, 'destination');
});

destinationsListContainer.addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        expandDestinationDetails(event, 'destination');
    }
});


// GLOBAL VARIABLES
let currentTraveler;
let allTrips;
let allDestinations;


// FUNCTIONS
function getAllData(id) {
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_0__.handleFetch)(id)
    .then(([traveler, tripData, destinationData]) => {
        allTrips = tripData.trips;
        allDestinations = destinationData.destinations.sort((a, b) => a.destination.localeCompare(b.destination));
        currentTraveler = (0,_traveler_info__WEBPACK_IMPORTED_MODULE_1__.updateTraveler)(traveler, allTrips, allDestinations);
        renderDom();
    })
    .catch(error => {
        displayError(error.message);
    })
}

function handleSubmitClick(event) {
    event.preventDefault();
    const clickedDestinationContainer = event.target.closest('.destination-container');
    let destinationForm = event.target.closest('form');
    let formButton = destinationForm.querySelector('button');
    let destinationId = destinationForm.id.split('-')[1];
    let newTripData = destinationForm.querySelectorAll('input');
    const [numTravelers, departureDate, duration] = newTripData;
    if(numTravelers.value && departureDate.value && duration.value) {
        const plane = clickedDestinationContainer.querySelector('#plane');
        plane.classList.toggle('fly');
        plane.classList.toggle('fly-back');
        formButton.disabled = true;
        setTimeout(function() {plane.classList.toggle('fly')}, 3000);
        setTimeout(function() {plane.classList.toggle('fly-back')}, 3000);
        handleTripSubmit(event, destinationId, numTravelers, departureDate, duration);
    }
}

function handleFormEntry(event) {
    let checkHeader = event.target.closest('.destination-header')
    if((event.target.tagName != "BUTTON") && !checkHeader) {
        let destinationForm = event.target.closest('form');
        let formButton = destinationForm.querySelector('button');
        let destinationId = destinationForm.id.split('-')[1];
        let newTripData = destinationForm.querySelectorAll('input');
        const [numTravelers, departureDate, duration] = newTripData; 
        if(numTravelers.value && departureDate.value && duration.value) {
            formButton.disabled = false;
            const costField = findCostField(event);
            updateTripCost(event, destinationId, numTravelers, departureDate, duration, costField);
        }
    }
}

function expandTripDetails(event) {
    event.preventDefault();
    const clickedTrip = event.target.closest('.trip-container');
    if(clickedTrip) {
        const clickedTripHeader = clickedTrip.querySelector('.trip-header');
        const clickedTripDetails = clickedTrip.querySelector('.trip-details');
        clickedTripDetails.classList.toggle('collapse')
        clickedTripDetails.classList.toggle('expand');
        const plane = clickedTripHeader.querySelector('img');
        plane.classList.toggle('fly');
        plane.classList.toggle('fly-back');
        const isExpanded = clickedTrip.getAttribute('aria-expanded') === 'true';
        if(isExpanded) {
            clickedTrip.setAttribute("aria-expanded", false);
        } else {
            clickedTrip.setAttribute("aria-expanded", true);
        }
    }
}

function handleTripSubmit(event, destinationId, numTravelers, departureDate, duration) {
    event.preventDefault();
    const newTrip = retrieveInputs(event, destinationId, numTravelers, departureDate, duration);
    allTrips.push(newTrip);
    clearDestinationData(event, numTravelers, departureDate, duration);
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_0__.handleTripPost)(newTrip, 'https://up-and-away-api-f76be7fbb42b.herokuapp.com/api/v1/trips')
    .then(returnedTrip => {
        if(returnedTrip.ok) {
            currentTraveler = (0,_traveler_info__WEBPACK_IMPORTED_MODULE_1__.updateTraveler)(currentTraveler, allTrips, allDestinations);
            renderDom()
        } else {
            let code = returnedTrip.status;
            let message = returnedTrip.statusText;
            throw new Error(`Oh no! Failed to Post: ${code} - ${message}.`);
        }
    })
    .catch(error => {
        displayError(error.message);
    })
}

function toggleDestinationInfo() {
    const details = destinationsListContainer.querySelectorAll('.destination-details');
    if(destInfoButton.innerText === 'show all details') {
        details.forEach((detail) => {
            detail.classList.remove('hidden');
        })
        destInfoButton.innerHTML = 'hide all details';
    } else {
        details.forEach((detail) => {
            detail.classList.add('hidden');
        })
        destInfoButton.innerHTML = 'show all details';
    }
}

function expandDestinationDetails(event) {
    // event.preventDefault();
    const clickedDestination = event.target.closest('.destination-container');
    if(clickedDestination){
        const clickedDestinationHeader = event.target.closest('.destination-header');
        const clickedDestinationDetails = clickedDestination.querySelector('.destination-details');
        if(!event.target.closest('.destination-details')) {
            clickedDestinationDetails.classList.toggle("hidden");
            const isExpanded = clickedDestinationHeader.getAttribute('aria-expanded') === 'true';
            if(isExpanded) {
                clickedDestinationHeader.setAttribute("aria-expanded", false);
            } else {
                clickedDestinationHeader.setAttribute("aria-expanded", true);
            }
        }
    }
}

function clearDestinationData(event, numTravelers, departureDate, duration) {
    event.preventDefault();
    const costField = findCostField(event);
    costField.innerText = ''
    numTravelers.value = '';
    departureDate.value = '';
    duration.value = '';
}

function findCostField(event) {
    event.preventDefault();
    const destinationDetails = event.target.closest('.destination-details');
    return destinationDetails.querySelector('p');
}

function renderDom() {
    renderMyTrips();
    renderDestinations();
    dollarsSpent.innerText = `$${currentTraveler.spentLastYear.group}`;
    destinationsHeading.innerHTML = `Plan your next adventure, &nbsp<span>${currentTraveler.name}</span>!`;
}

function renderMyTrips() {
    tripsListContainer.innerHTML = '';
    currentTraveler.trips.forEach((trip) => {
        const newTripContainer = document.createElement('div');
        newTripContainer.className = 'trip-container';
        newTripContainer.setAttribute("aria-expanded", false);
        const newTrip = document.createElement('div');
        newTrip.tabIndex = 0;
        newTrip.className = 'trip-header';
        newTrip.id = `trip-${trip.id}`;
        newTrip.innerHTML = `
            <h3 class='name'>${trip.destination.destination}</h3>
            <h4 class='date'>${trip.date}</h4>`;
        const newTripDetails = document.createElement('div');
        newTripDetails.className = 'trip-details collapse';
        newTripDetails.id = `trip-${trip.id}-details`;
        newTripDetails.innerHTML = `
            <img class='trip-image' src="${trip.destination.image}" alt=${trip.destination.alt}>
            <h5 class='trip-travelers'>Number of Travelers: ${trip.travelers}</h5>
            <h5 class='trip-duration'>Length of Trip: ${trip.duration}</h5>
            <h5 class='trip-cost-ind'>Group Cost: $${trip.cost.totalGroup}</h5>
            <h5 class='trip-cost-grp'>Cost Per Person: $${trip.cost.totalPerPerson}
            `;
        if(trip.status === 'pending') {
            newTrip.classList.add('pending');
            newTrip.innerHTML += `<h4 class='status'>... pending ...</h4>`;
            newTripDetails.classList.add('pending-details');
        } else if(trip.status === 'past') {
            newTrip.classList.add('past');
            newTrip.innerHTML += `<h4 class='status'>... past ...</h4>`;
            newTripDetails.classList.add('past-details');
        } else {
            newTrip.classList.add('upcoming');
            newTrip.innerHTML += `<h4 class='status'>... upcoming ...</h4>`;
            newTripDetails.classList.add('upcoming-details');
        }
        newTrip.innerHTML += `<img src='./images/new-plane.png' class='fly-back' id='plane' alt='plane icon'>`;
        tripsListContainer.appendChild(newTripContainer);
        newTripContainer.appendChild(newTrip);
        newTripContainer.appendChild(newTripDetails);
    })
}

function renderDestinations() {
    allDestinations.forEach((destination) => {
        const newDestinationContainer = document.createElement('div');
        newDestinationContainer.className = 'destination-container';
        newDestinationContainer.setAttribute("aria-expanded", true);
        const newDestination = document.createElement('div');
        newDestination.className = 'destination-header';
        newDestination.tabIndex = 0;
        newDestination.id = `destination-${destination.id}`;
        newDestination.innerHTML = `<h3 class='destination-name'>${destination.destination}</h3><img src='./images/new-plane.png' class='fly-back' id='plane' alt='plane icon'>`;
        const newDestinationDetails = document.createElement('div');
        newDestinationDetails.className = 'destination-details';
        newDestinationDetails.id = `destination-${destination.id}-details`;
        newDestinationDetails.innerHTML = `
            <img class='destination-image' src="${destination.image}" alt=${destination.alt}>
            <form class='trip-form' id='form-${destination.id}'>
                <div class="form-element">
                    <label for="travelers-${destination.destination}">Number of Travelers:</label>
                </div>
                <input class="travelers-field" id="travelers-${destination.destination}" type="number" min="1" placeholder="#ppl" required>
                <div class="form-element">
                    <label for="departure-${destination.destination}">Departure Date:</label>
                </div>
                <input class="departure-date-field" id="departure-${destination.destination}" type="date" min="2024-03-03" max="2026-03-03" placeholder="MM/DD/YYYY" required>
                <div class="form-element">
                    <label for="duration-${destination.destination}">Trip Length:</label>
                </div>
                <input class="duration-field" id="duration-${destination.destination}" type="number" min="1"  placeholder="#days" required>
                <div class="form-element">
                    <button class="submit-button" type="submit" disabled>Submit Trip!</button>
                </div>
            </form>
                <div class='new-costs'>
                    <h4 class='destination-cost-grp'>Trip Total:</h4>
                    <p></p>
                </div>   
            `;
            destinationsListContainer.appendChild(newDestinationContainer);
            newDestinationContainer.appendChild(newDestination);
            newDestinationContainer.appendChild(newDestinationDetails);
    })
}

function showMyTrips() {
    renderMyTrips()
    tripsContainer.classList.toggle('hidden');
    spentContainer.classList.toggle('hidden');
    if (myTripsButton.innerText === 'my trips') {
        myTripsButton.innerText = 'hide trips';
    } else {
        myTripsButton.innerText = 'my trips';
    }
}

function retrieveInputs(event, destinationId, numTravelers, departureDate, duration) {
    event.preventDefault();
        return {
            id: allTrips.length + 1,
            userID: currentTraveler.id,
            destinationID: parseInt(destinationId),
            travelers: parseInt(numTravelers.value),
            date: departureDate.value.replaceAll('-', '/'),
            duration: parseInt(duration.value),
            status: "pending",
            suggestedActivities: []
        }
}

function logIn(event) {
    event.preventDefault();
    passwordError.innerText = '';
    const username = usernameField.value;
    const password = passwordField.value;
    const foundUser = _login_data_user_logins__WEBPACK_IMPORTED_MODULE_2__.userLogins.find((login) => {
        return login.username === username && login.password === password;
    });
    if(foundUser) {
        const userId = parseInt(usernameField.value.replace('traveler', ''));
        toggleFromLogin();
        clearPasswordFields();
        getAllData(userId);
    } else if (_login_data_user_logins__WEBPACK_IMPORTED_MODULE_2__.userLogins.find (login => login.username === username)) {
        passwordError.innerText = '* invalid password *';
    } else {
        passwordError.innerText = '* username not found *';
    }
}

function clearPasswordFields() {
    usernameField.value = '';
    passwordField.value = '';
}

function toggleFromLogin() {
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    header.classList.remove('hidden');
    body.classList.add('background-color');
}

function updateTripCost(event, destinationId, numTravelers, departureDate, duration, costField) {
    const selectedTrip = retrieveInputs(event, destinationId, numTravelers, departureDate, duration);
    const compiledTrip = (0,_traveler_info__WEBPACK_IMPORTED_MODULE_1__.compileTripData)([selectedTrip], allDestinations);
    const tripCostGroup = compiledTrip[0].cost.totalGroup;
    costField.innerText = `$${tripCostGroup}`;
};

function displayError(error) {
    mainPage.classList.add('hidden');
    header.classList.add('hidden');
    loginPage.classList.add('hidden');
    errorPage.classList.remove('hidden');
    errorPage.innerHTML = error;
};

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleFetch: () => (/* binding */ handleFetch),
/* harmony export */   handleTripPost: () => (/* binding */ handleTripPost)
/* harmony export */ });
function getTraveler(id) {
    return fetch(`https://up-and-away-api-f76be7fbb42b.herokuapp.com/api/v1/travelers/${id}`);
}

function getTrips() {
    return fetch("https://up-and-away-api-f76be7fbb42b.herokuapp.com/api/v1/trips");
}

function getDestinations() {
    return fetch("https://up-and-away-api-f76be7fbb42b.herokuapp.com/api/v1/destinations");
}

function postTrip(trip, url) {
    const tripOptions = prepTripOptions(trip);
    return fetch(url, tripOptions);
}

function prepTripOptions(trip) {
    return {
        method: 'POST',
        body: JSON.stringify({
            id: trip.id,
            userID: trip.userID,
            destinationID: trip.destinationID,
            travelers: trip.travelers,
            date: trip.date,
            duration: trip.duration,
            status: trip.status,
            suggestedActivities: trip.suggestedActivities
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    }
}

function handleTripPost(trip, url) {
    return postTrip(trip, url)
}

function getData(id) {
    let allData = [getTraveler(id), getTrips(), getDestinations()];
    return allData;
}

function handleFetch(id) {
    return Promise.all(getData(id))
    .then(response => {
        return Promise.all(response.map((element) => {
            return element.json();
        }))
    })
}



/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendDestinations: () => (/* binding */ appendDestinations),
/* harmony export */   compileTripData: () => (/* binding */ compileTripData),
/* harmony export */   computeAgentFee: () => (/* binding */ computeAgentFee),
/* harmony export */   computeTripCost: () => (/* binding */ computeTripCost),
/* harmony export */   computeYearSpent: () => (/* binding */ computeYearSpent),
/* harmony export */   getDate: () => (/* binding */ getDate),
/* harmony export */   getTraveler: () => (/* binding */ getTraveler),
/* harmony export */   getTrips: () => (/* binding */ getTrips),
/* harmony export */   sortTrips: () => (/* binding */ sortTrips),
/* harmony export */   updateTraveler: () => (/* binding */ updateTraveler)
/* harmony export */ });
function getTraveler(id, travelers) {
    return travelers.find(traveler => id === traveler.id);
}

function getTrips(id, trips) {
    let currentTrips = trips.filter((trip) => {
        return id === trip.userID
    });

    return currentTrips;
}

function appendDestinations(trips, destinations) {
    let updatedTrips = trips.map((trip) => {
        let foundDestination = destinations.find((destination) => {
            return destination.id === trip.destinationID
        });
        return {
          ...trip,
          destination: foundDestination
        }
    })

    return updatedTrips;
}

function computeAgentFee(cost) {
    return Math.round(cost / 10);
}

function computeTripCost(trip) {
    const singleLodgingTotal = trip.destination.estimatedLodgingCostPerDay * trip.duration;
    const singleFlight = trip.destination.estimatedFlightCostPerPerson;
    const netPerPerson = singleLodgingTotal + singleFlight;
    const agentFeePerPerson = computeAgentFee(netPerPerson);
    const totalPerPerson = netPerPerson + agentFeePerPerson;
    const totalGroup = totalPerPerson * trip.travelers;

    return {totalPerPerson: totalPerPerson, totalGroup: totalGroup};
}

function compileTripData(trips, destinations) {
    let appendedTrips = appendDestinations(trips, destinations);
    let compiledTrips = appendedTrips.map((trip) => {
        trip.cost = computeTripCost(trip);
        return {
            ...trip,
            cost: trip.cost
          }
    })

    return compiledTrips;
}

function getDate() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const todayDay = today.getDate().toString().padStart(2, '0');

    return `${todayYear}${todayMonth}${todayDay}`
}

function computeYearSpent(trips) {
    const today = getDate();
    let approvedRecentTrips = trips.filter((trip) => {
        return ((trip.status === 'approved' || trip.status === 'past')
            && (trip.date.replaceAll('/', '') < 20200301)
            && (trip.date.replaceAll('/', '') > 20190301))

            // USE THE NEXT TWO LINES FOR TESTING. COMMENT IN ABOVE LINES FOR PAGE FUNCTIONALITY
            // && (trip.date.replaceAll('/', '') < today)
            // && (trip.date.replaceAll('/', '') > today - 10000))

    });
    let totalSpending = approvedRecentTrips.reduce((totals, trip) => {
        totals.individual += trip.cost.totalPerPerson;
        totals.group += trip.cost.totalGroup;

        return totals
    }, {individual: 0, group: 0});

    return totalSpending;
}

function updateTraveler(traveler, trips, destinations) {
    let updatedTraveler = traveler;
    let updatedTravelerTrips = getTrips(traveler.id, trips);
    let sortedTravelerTrips = sortTrips(updatedTravelerTrips);
    let updatedTrips = compileTripData(sortedTravelerTrips, destinations)
    updatedTraveler.trips = updatedTrips;
    traveler.spentLastYear = computeYearSpent(updatedTrips);

    return updatedTraveler;
}

function sortTrips(trips) {
    const chronTrips = trips.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    })
    let pendingTrips = [];
    let upcomingApprovedTrips = [];
    let pastTrips = [];

    chronTrips.forEach((trip) => {
        if(trip.status === 'pending' && (trip.date.replaceAll('/', '') < 20200301)) {
            pendingTrips.push(trip);
        } else if(trip.date.replaceAll('/', '') > 20200301) {
            upcomingApprovedTrips.push(trip);
        } else {
            trip.status = 'past';
            pastTrips.push(trip);
        }
    })

    return pendingTrips.concat(upcomingApprovedTrips, pastTrips)
}



/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   userLogins: () => (/* binding */ userLogins)
/* harmony export */ });
const userLogins = [
    { username: 'traveler1', password: 'travel' },
    { username: 'traveler2', password: 'travel' },
    { username: 'traveler3', password: 'travel' },
    { username: 'traveler4', password: 'travel' },
    { username: 'traveler5', password: 'travel' },
    { username: 'traveler6', password: 'travel' },
    { username: 'traveler7', password: 'travel' },
    { username: 'traveler8', password: 'travel' },
    { username: 'traveler9', password: 'travel' },
    { username: 'traveler10', password: 'travel' },
    { username: 'traveler11', password: 'travel' },
    { username: 'traveler12', password: 'travel' },
    { username: 'traveler13', password: 'travel' },
    { username: 'traveler14', password: 'travel' },
    { username: 'traveler15', password: 'travel' },
    { username: 'traveler16', password: 'travel' },
    { username: 'traveler17', password: 'travel' },
    { username: 'traveler18', password: 'travel' },
    { username: 'traveler19', password: 'travel' },
    { username: 'traveler20', password: 'travel' },
    { username: 'traveler21', password: 'travel' },
    { username: 'traveler22', password: 'travel' },
    { username: 'traveler23', password: 'travel' },
    { username: 'traveler24', password: 'travel' },
    { username: 'traveler25', password: 'travel' },
    { username: 'traveler26', password: 'travel' },
    { username: 'traveler27', password: 'travel' },
    { username: 'traveler28', password: 'travel' },
    { username: 'traveler29', password: 'travel' },
    { username: 'traveler30', password: 'travel' },
    { username: 'traveler31', password: 'travel' },
    { username: 'traveler32', password: 'travel' },
    { username: 'traveler33', password: 'travel' },
    { username: 'traveler34', password: 'travel' },
    { username: 'traveler35', password: 'travel' },
    { username: 'traveler36', password: 'travel' },
    { username: 'traveler37', password: 'travel' },
    { username: 'traveler38', password: 'travel' },
    { username: 'traveler39', password: 'travel' },
    { username: 'traveler40', password: 'travel' },
    { username: 'traveler41', password: 'travel' },
    { username: 'traveler42', password: 'travel' },
    { username: 'traveler43', password: 'travel' },
    { username: 'traveler44', password: 'travel' },
    { username: 'traveler45', password: 'travel' },
    { username: 'traveler46', password: 'travel' },
    { username: 'traveler47', password: 'travel' },
    { username: 'traveler48', password: 'travel' },
    { username: 'traveler49', password: 'travel' },
    { username: 'traveler50', password: 'travel' }
]



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_new_plane_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _images_sky_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _dom_updates_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);








})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map