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
 * The Original Code is MozMill Test code.
 *
 * The Initial Developer of the Original Code is
 * Tobias Markus <tobbi.bugs@googlemail.com>.
 *
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Anthony Hughes <ahughes@mozilla.com>
 *   Henrik Skupin <hskupin@mozilla.com>
 *   Geo Mealer <gmealer@mozilla.com>
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

// Include required modules
var prefs = require("../../../lib/prefs");
var tabs = require("../../../lib/tabs");
var utils = require("../../../lib/utils");

const TIMEOUT = 5000;

const LOCAL_TEST_FOLDER = collector.addHttpResource('../../../data/');
const LOCAL_TEST_PAGE = LOCAL_TEST_FOLDER + "tabbedbrowsing/openinnewtab.html";

const TAB_ORDER = [
  {index: 1, linkid: 2},
  {index: 2, linkid: 3},
  {index: 3, linkid: 1}
];

var setupModule = function(module) {
  controller = mozmill.getBrowserController();

  tabBrowser = new tabs.tabBrowser(controller);
  tabBrowser.closeAllTabs();
}

var teardownModule = function() {
  prefs.preferences.clearUserPref("browser.tabs.loadInBackground");
  utils.closeContentAreaContextMenu(controller);
  tabBrowser.closeAllTabs();
}

var testOpenInBackgroundTab = function() {
  prefs.openPreferencesDialog(controller, prefDialogCallback);

  // Open the HTML testcase:
  controller.open(LOCAL_TEST_PAGE);
  controller.waitForPageLoad();

  for (var i = 0; i < TAB_ORDER.length; i++) {
    // Reference to the current link in the testcase:
    var currentLink = new elementslib.Name(controller.tabs.activeTab, "link_" + (i + 1));
    
    if (i == 2) {
      // Open another tab by middle-clicking on the link
      tabBrowser.openInNewTab(currentLink);
    } else {
      // Open the first link via context menu in a new tab:
      tabBrowser.openInNewTab(currentLink, "contextMenu");
    }

    // Check that i+1 tabs are open and the first tab is selected
    controller.waitFor(function () {
      return tabBrowser.length === (i + 2);
    }, i + 2 + " tabs have been opened");

    controller.waitFor(function () {
      return tabBrowser.selectedIndex === 0;
    }, "First tab has been selected");
    
    if(i == 0) {
      // Switch to the newly opened tab and back to the first tab
      tabBrowser.selectedIndex = 1;
      tabBrowser.selectedIndex = 0;
    }
  }

  // Verify that the order of tabs is correct
  for each(var tab in TAB_ORDER) {
    var linkId = new elementslib.ID(controller.tabs.getTab(tab.index), "id");
    controller.waitForElement(linkId);
    controller.assertText(linkId, tab.linkid);
  }

  // Click the close button of the last tab
  tabBrowser.selectedIndex = 3;
  tabBrowser.closeTab("closeButton");

  // Verify that the last tab is selected:
  controller.waitFor(function () {
    return tabBrowser.length === 3;
  }, "A tab has been closed via the close button");

  controller.waitFor(function () {
    return tabBrowser.selectedIndex === 2;
  }, "The last tab has been selected");
}

var prefDialogCallback = function(controller) {
  var prefDialog = new prefs.preferencesDialog(controller);
  prefDialog.paneId = 'paneTabs';

  //Ensure that 'Switch to tabs immediately' is unchecked:
  var switchToTabsPref = new elementslib.ID(controller.window.document, "switchToNewTabs");
  controller.waitForElement(switchToTabsPref, TIMEOUT);
  controller.check(switchToTabsPref, false);

  prefDialog.close(true);
}

/**
 * Map test functions to litmus tests
 */
// testOpenInBackgroundTab.meta = {litmusids : [8087]};
