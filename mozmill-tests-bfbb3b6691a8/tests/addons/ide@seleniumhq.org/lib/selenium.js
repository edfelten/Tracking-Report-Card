/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * @fileoverview Shared module for Selenium IDE
 * @supported Firefox 3.5 and above, Selenium IDE 1.0.10 and above
 */

// Include required modules
var DOMUtils = require("../../../../lib/dom-utils");
var Utils = require("../../../../lib/utils");
var Widgets = require("../../../../lib/widgets");

/**
 * @constructor
 */
function SeleniumManager() {
  this._controller = null;
}

/**
 * @class
 */
SeleniumManager.prototype = {

  /**
   * Get the controller of the Selenium IDE window
   *
   * @returns {MozMillController} Mozmill Controller
   */
  get controller() {
    return this._controller;
  },

  /**
   * Open Selenium IDE
   *
   * @param {MozMillController} browserController Mozmill controller of the browser window
   * @param {String} [aEventType="menu"] Type of event which triggers the action
   *   <dl>
   *     <dt>menu</dt>
   *     <dd>The main menu is used</dd>
   *     <dt>shortcut</dt>
   *     <dd>The keyboard shortcut is used</dd>
   *   </dl>
   */
  open : function SeleniumManager_open(browserController, aEventType) {
    var type = aEventType || "menu";

    switch (type) {
      case "menu":
        browserController.mainMenu.click("#menuToolsSeleniumIDE");
        break;
      case "shortcut":
        browserController.keypress(null, "S", {ctrlKey: true, altKey: true});
        break;
      default:
        throw new Error(arguments.callee.name + ": Unknown event type - " + event.type);
    }

    this._controller = Utils.handleWindow("type", "global:selenium-ide", undefined, false);
  },

  /**
   * Close Selenium IDE
   */
  close : function SeleniumManager_close() {
    this._controller.window.close();
    this.waitForClosed();
  },

  /**
   * Wait for the Selenium IDE window to be closed
   */
  waitForClosed : function SeleniumManager_waitForClosed() {
    mozmill.utils.waitFor(function () {
      return !mozmill.utils.getWindowByType("global:selenium-ide");
    }, "Selenium IDE has been closed.");
    this._controller = null;
  },

  /**
   * Clear the base URL field
   */
  clearBaseURLField : function addonsManager_clearBaseURLField() {
    var baseURL = this.getElement({type: "baseURL"});
    var cmdKey = Utils.getEntity(this.getDtds(), "selectAllCmd.key");
    this._controller.keypress(baseURL, cmdKey, {accelKey: true});
    this._controller.keypress(baseURL, 'VK_DELETE', {});
  },

  /**
   * Set the value of the base URL
   *
   * @param {String} url New base URL value
   */
  set baseURL(url) {
    this.clearBaseURLField();
    var baseURL = this.getElement({type: "baseURL"});
    this._controller.type(baseURL, url);
  },

  /**
   * Add a test command
   *
   * @param {Object} spec Information of the test command to be added
   * @param {String} spec.action Command name
   * @param {String} spec.target Element locator
   * @param {String} spec.value Value
   */
  addCommand : function SeleniumManager_addCommand(spec) {
    var commands = this.getElement({type: "commands"});
    Widgets.clickTreeCell(this._controller, commands, commands.getNode().view.rowCount - 1, 0, {});

    if (spec.action !== undefined) {
      var command = this.getElement({type: "command_action"});
      this._controller.type(command, spec.action);
    }

    if (spec.target !== undefined) {
      var target = this.getElement({type: "command_target"});
      this._controller.type(target, spec.target);
    }

    if (spec.value !== undefined) {
      var value = this.getElement({type: "command_value"});
      this._controller.type(value, spec.value);
    }
  },

  /**
   * Play a test case
   */
  playTest : function SeleniumManager_playTest() {
    var playTest = this.getElement({type: "button_playTest"});
    this._controller.click(playTest);

    //wait until play button is enabled
    this._controller.waitFor(function () {
      return !playTest.getNode().disabled;
    }, "Play test button is enabled");
  },

  /**
   * Check that the suite has passed according to the progress indicator
   *
   * @returns {Boolean} Returns true if the progress indicator has the necessary style
   * to make it appear green
   */
  get isSuiteProgressIndicatorGreen() {
    var suiteProgressIndicator = this.getElement({type: "suiteProgress_indicator"});
    return (suiteProgressIndicator.getNode().className === "success");
  },

  /**
   * Check that the suite has failed according to the progress indicator
   *
   * @returns {Boolean} Returns true if the progress indicator has the necessary style
   * to make it appear red
   */
  get isSuiteProgressIndicatorRed() {
    var suiteProgressIndicator = this.getElement({type: "suiteProgress_indicator"});
    return (suiteProgressIndicator.getNode().className === "failure");
  },

  /**
   * Retrieve the test run count
   *
   * @returns {ElemBase} Element which represents the test run count
   */
  get runCount() {
    return this.getElement({type: "suiteProgress_runCount"});
  },

  /**
   * Retrieve the test failure count
   *
   * @returns {ElemBase} Element which represents the test failure count
   */
  get failureCount() {
    return this.getElement({type: "suiteProgress_failureCount"});
  },

  /**
   * Retrieve the info from the log
   *
   * @returns {ElemBase[]} Log info
   */
  get logInfo() {
    return this.getElements({type: "log_info"});
  },

  /**
   * Retrieve the final info message from the log
   *
   * @returns {String} Log info message
   */
  get finalLogInfoMessage() {
    var logInfo = this.logInfo;
    var finalLogInfoMessage = logInfo[logInfo.length-1].getNode().textContent;
    var re = new RegExp("^\\[info] (.*)");
    return re.exec(finalLogInfoMessage)[1];
  },

  /**
   * Retrieve the errors from the log
   *
   * @returns {ElemBase[]} Log errors
   */
  get logErrors() {
    return this.getElements({type: "log_errors"});
  },

  /**
   * Gets all the needed external DTD urls as an array
   *
   * @returns {String[]} Array of external DTD urls
   */
  getDtds : function searchBar_getDtds() {
    var dtds = ["chrome://browser/locale/browser.dtd"];
    return dtds;
  },

  ///////////////////////////////
  // UI Elements section
  ///////////////////////////////

  /**
   * Retrieve a UI element based on the given specification
   *
   * @param {Object} aSpec Information of the UI elements which should be retrieved
   * @param {String} aSpec.type Identifier of the element
   * @param {String} aSpec.subtype Attribute of the element to filter [optional - default: ""]
   * @param {String} aSpec.value Value of the attribute to filter [optional - default: ""]
   * @param {Object} aSpec.parent Parent of the to find element [optional - default: document]
   *
   * @returns {ElemBase} Element which has been found
   */
  getElement : function SeleniumManager_getElement(aSpec) {
    var elements = this.getElements(aSpec);

    return (elements.length > 0) ? elements[0] : undefined;
  },

  /**
   * Retrieve list of UI elements based on the given specification
   *
   * @param {Object} aSpec Information of the UI elements which should be retrieved
   * @param {String} aSpec.type Identifier of the element
   * @param {String} aSpec.subtype Attribute of the element to filter [optional - default: ""]
   * @param {String} aSpec.value Value of the attribute to filter [optional - default: ""]
   * @param {Object} aSpec.parent Parent of the to find element [optional - default: document]
   *
   * @returns {ElemBase[]} Elements which have been found
   */
  getElements : function SeleniumManager_getElements(aSpec) {
    var spec = aSpec || { };
    var type = spec.type;
    var subtype = spec.subtype;
    var value = spec.value;
    var parent = spec.parent;

    var root = parent ? parent.getNode() : this._controller.window.document;
    var nodeCollector = new DOMUtils.nodeCollector(root);

    switch (type) {
      /**
       * subtype: subtype to match
       * value: value to match
       */
      case "baseURL":
        nodeCollector.queryNodes("#baseURL");
        break;
      case "button_playTest":
        nodeCollector.queryNodes("#play-button");
        break;
      case "commands":
        nodeCollector.queryNodes("#commands");
        break;
      case "command_action":
        nodeCollector.queryNodes("#commandAction");
        break;
      case "command_target":
        nodeCollector.queryNodes("#commandTarget");
        break;
      case "command_value":
        nodeCollector.queryNodes("#commandValue");
        break;
      case "suiteProgress_indicator":
        nodeCollector.queryNodes("#suiteProgressIndicator");
        break;
      case "suiteProgress_runCount":
        nodeCollector.queryNodes("#suiteProgressRuns");
        break;
      case "suiteProgress_failureCount":
        nodeCollector.queryNodes("#suiteProgressFailures");
        break;
      case "log_info":
        nodeCollector.queryNodes("#logView");
        nodeCollector.root = nodeCollector.nodes[0].contentDocument;
        nodeCollector.queryNodes(".info");
        break;
      case "log_errors":
        nodeCollector.queryNodes("#logView");
        nodeCollector.root = nodeCollector.nodes[0].contentDocument;
        nodeCollector.queryNodes(".error");
        break;
      default:
        throw new Error(arguments.callee.name + ": Unknown element type - " + spec.type);
    }

    return nodeCollector.elements;
  }

};

// Export classes
exports.SeleniumManager = SeleniumManager;
