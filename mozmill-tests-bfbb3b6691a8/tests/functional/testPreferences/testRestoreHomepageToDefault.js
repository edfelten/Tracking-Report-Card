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
 * The Initial Developer of the Original Code is Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Aakash Desai <adesai@mozilla.com>
 *   Anthony Hughes <ahughes@mozilla.com>
 *   Henrik Skupin <hskupin@mozilla.com>
 *   Aaron Train <atrain@mozilla.com>
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

// Include the required modules
var prefs = require("../../../lib/prefs");
var tabs = require("../../../lib/tabs");
var utils = require("../../../lib/utils");

const TIMEOUT = 5000;

const LOCAL_TEST_FOLDER = collector.addHttpResource('../../../data/');
const LOCAL_TEST_PAGE = LOCAL_TEST_FOLDER + 'layout/mozilla.html';

var setupModule = function(module) {
  module.controller = mozmill.getBrowserController();

  tabs.closeAllTabs(controller);
}

var teardownModule = function(module) {
  prefs.preferences.clearUserPref("browser.startup.homepage");
}

/**
 * Restore home page to default
 */
var testRestoreHomeToDefault = function() {
  // Open a web page for the temporary home page
  controller.open(LOCAL_TEST_PAGE);
  controller.waitForPageLoad();

  var link = new elementslib.Link(controller.tabs.activeTab, "Organization");
  controller.assertNode(link);

  // Call Preferences dialog and set home page
  prefs.openPreferencesDialog(controller, prefDialogHomePageCallback);

  // Go to the saved home page and verify it's the correct page
  controller.click(new elementslib.ID(controller.window.document, "home-button"));
  controller.waitForPageLoad();

  link = new elementslib.Link(controller.tabs.activeTab, "Organization");
  controller.assertNode(link);

  // Open Preferences dialog and reset home page to default
  prefs.openPreferencesDialog(controller, prefDialogDefHomePageCallback);

  // Check that the current homepage is set to the default homepage - about:home
  var currentHomepage = prefs.preferences.getPref("browser.startup.homepage", "");
  var defaultHomepage = utils.getDefaultHomepage();

  controller.assert(function () {
    return currentHomepage == defaultHomepage;
  }, "Default homepage restored - got " + currentHomepage + ", expected " +
    defaultHomepage);
}

/**
 * Set the current page as home page via the preferences dialog
 *
 * @param {MozMillController} controller
 *        MozMillController of the window to operate on
 */
var prefDialogHomePageCallback = function(controller) {
  var prefDialog = new prefs.preferencesDialog(controller);
  prefDialog.paneId = 'paneMain';

  // Set home page to the current page
  var useCurrent = new elementslib.ID(controller.window.document, "useCurrent");
  controller.waitThenClick(useCurrent);
  controller.sleep(100);

  prefDialog.close(true);
}

var prefDialogDefHomePageCallback = function(controller) {
  var prefDialog = new prefs.preferencesDialog(controller);

  // Reset home page to the default page
  var useDefault = new elementslib.ID(controller.window.document, "restoreDefaultHomePage");
  controller.waitForElement(useDefault, TIMEOUT);
  controller.click(useDefault);

  // Check that the homepage field has the default placeholder text
  var dtds = ["chrome://browser/locale/aboutHome.dtd"];
  var defaultHomepageTitle = utils.getEntity(dtds, "abouthome.pageTitle");
  var browserHomepageField = new elementslib.ID(controller.window.document, "browserHomePage");
  var browserHomepagePlaceholderText = browserHomepageField.getNode().placeholder;

  controller.assert(function () {
    return browserHomepagePlaceholderText == defaultHomepageTitle;
  }, "Default homepage title - got " + browserHomepagePlaceholderText + ", expected " +
    defaultHomepageTitle);

  prefDialog.close(true);
}

/**
 * Map test functions to litmus tests
 */
// testRestoreHomeToDefault.meta = {litmusids : [8327]};
