/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Mozmill Test Code.
 *
 * The Initial Developer of the Original Code is Mozilla Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Anthony Hughes <ashughes@mozilla.com>
 *   Henrik Skupin <hskupin@mozilla.com>
 *   Remus Pop <remus.pop@softvision.ro>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * Litmus Test 8579: Display and close Larry
 */

// Include necessary modules
var tabs = require("../../../lib/tabs");
var utils = require("../../../lib/utils");

var gDelay = 0;
var gTimeout = 5000;

const LOCAL_TEST_FOLDER = collector.addHttpResource('../../../data/');
const LOCAL_TEST_PAGES = [
  {url: LOCAL_TEST_FOLDER + 'layout/mozilla.html'},
];

var setupModule = function(module) {
  module.controller = mozmill.getBrowserController();
  tabs.closeAllTabs(controller);
}

/**
 * Test that the identity popup can be opened and closed
 */
var testIdentityPopupOpenClose = function() {
  controller.open(LOCAL_TEST_PAGES[0].url);
  controller.waitForPageLoad();

  // Click the identity box
  var identityBox = new elementslib.ID(controller.window.document, "identity-box");
  controller.click(identityBox);

  // Check the popup state
  var popup = new elementslib.ID(controller.window.document, "identity-popup");
  controller.waitFor(function () {
    return popup.getNode().state === 'open';
  }, "Identity popup has been opened");

  controller.sleep(gDelay);

  // Check the visibility of the more info button
  var button = new elementslib.ID(controller.window.document, "identity-popup-more-info-button");
  utils.assertElementVisible(controller, button, true);

  // Press Escape to close the popup
  controller.keypress(popup, 'VK_ESCAPE', {});

  // Check the popup state again
  controller.waitFor(function () {
    return popup.getNode().state === 'closed';
  }, "Identity popup has been closed");
}

/**
 * Map test functions to litmus tests
 */
// testIdentityPopupOpenClose.meta = {litmusids : [8579]};
