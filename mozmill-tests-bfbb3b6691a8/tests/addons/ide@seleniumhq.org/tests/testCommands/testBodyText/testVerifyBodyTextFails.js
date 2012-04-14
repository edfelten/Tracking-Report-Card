/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var {assert} = require("../../../../../../lib/assertions");
var checks = require("../../../lib/checks");
var selenium = require("../../../lib/selenium");
var tabs = require("../../../../../../lib/tabs");

function setupModule(module) {
  controller = mozmill.getBrowserController();

  sm = new selenium.SeleniumManager();
  sm.open(controller);

  tabs.closeAllTabs(controller);
  controller.open("chrome://selenium-ide/content/tests/functional/aut/search.html");
  controller.waitForPageLoad();
}

function teardownModule(module) {
  sm.close();
}

function testVerifyBodyTextCommandFails() {
  sm.addCommand({action: "verifyBodyText",
                target: "elephants and zebras"});
  sm.addCommand({action: "echo",
                target: "final command"});
  sm.playTest();

  checks.commandFailed(sm, "Actual value 'link with onclick attribute " +
                           "\n Show 10 20 30 items \n \n tab 1 tab 2'" +
                           " did not match 'elephants and zebras'");
  
  //check final command is executed
  assert.equal(sm.finalLogInfoMessage, "echo: final command");
}
