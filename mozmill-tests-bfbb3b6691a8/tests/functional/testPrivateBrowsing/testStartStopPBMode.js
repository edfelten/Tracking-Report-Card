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
 * The Initial Developer of the Original Code is Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Henrik Skupin <hskupin@mozilla.com>
 *   Aaron Train <atrain@mozilla.com>
 *   Anthony Hughes <ahughes@mozilla.com>
 *   Alex Lakatos <alex.lakatos@softvision.ro>
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
var privateBrowsing = require("../../../lib/private-browsing");
var tabs = require("../../../lib/tabs");
var utils = require("../../../lib/utils");

const TIMEOUT = 5000;

const LOCAL_TEST_FOLDER = collector.addHttpResource('../../../data/');
const LOCAL_TEST_PAGES = [
  {url: LOCAL_TEST_FOLDER + 'layout/mozilla.html', id: 'community'},
  {url: 'about:', id: 'aboutPageList'}
];

function setupModule() {
  controller = mozmill.getBrowserController();
  modifier = controller.window.document.documentElement.
             getAttribute("titlemodifier_privatebrowsing");

  // Create Private Browsing instance and set handler
  pb = new privateBrowsing.privateBrowsing(controller);
  pb.handler = pbStartHandler;

  tabBrowser = new tabs.tabBrowser(controller);
  tabBrowser.closeAllTabs();
}

function teardownModule() {
  pb.reset();
}

/**
 * Start and Stop Private Browsing Mode
 */
function testStartStopPrivateBrowsingMode() {
  // Make sure we are not in PB mode and show a prompt
  pb.enabled = false;
  pb.showPrompt = true;

  // Open local pages in separate tabs and wait for each to finish loading
  LOCAL_TEST_PAGES.forEach(function(page) {
    controller.open(page.url);
    controller.waitForPageLoad();
    
    var elem = new elementslib.ID(controller.tabs.activeTab, page.id);
    controller.assertNode(elem);
    
    tabBrowser.openTab();
  });

  // Start the Private Browsing mode
  pb.start();

  // Check that only one tab is open
  controller.assertJS("subject.isOnlyOneTab == true", 
                      {isOnlyOneTab: controller.tabs.length == 1});

  // Title modifier should have been set
  controller.assertJS("subject.hasTitleModifier == true",
                      {hasTitleModifier: controller.window.document.
                                         title.indexOf(modifier) != -1});

  // Check descriptions on the about:privatebrowsing page
  var description = utils.getEntity(pb.getDtds(), "privatebrowsingpage.description");
  var learnMore = utils.getEntity(pb.getDtds(), "privatebrowsingpage.learnMore");
  var longDescElem = new elementslib.ID(controller.tabs.activeTab, "errorLongDescText");
  var moreInfoElem = new elementslib.ID(controller.tabs.activeTab, "moreInfoLink");
  controller.waitForElement(longDescElem, TIMEOUT);  
  controller.assertText(longDescElem, description);
  controller.assertText(moreInfoElem, learnMore);

  // Stop Private Browsing mode
  pb.stop();

  // All tabs should be restored
  controller.assertJS("subject.allTabsRestored == true",
                      {allTabsRestored: controller.tabs.length == LOCAL_TEST_PAGES.length + 1});

  for (var i = 0; i < LOCAL_TEST_PAGES.length; i++) {
    controller.waitForPageLoad(controller.tabs.getTab(i));

    // waitForElement is used on exit of PB mode because pages are loaded from bfcache 
    var elem = new elementslib.ID(controller.tabs.getTab(i), LOCAL_TEST_PAGES[i].id);
    controller.waitForElement(elem);
    controller.assertNode(elem);
  }

  // No title modifier should have been set
  controller.assertJS("subject.noTitleModifier == true",
                      {noTitleModifier: controller.window.document.
                                        title.indexOf(modifier) == -1});
}

/**
 * Handle the modal dialog to enter the Private Browsing mode
 *
 * @param {MozMillController} controller
 *        MozMillController of the window to operate on
 */
function pbStartHandler(controller) {
  // Check to not ask anymore for entering Private Browsing mode
  var checkbox = new elementslib.ID(controller.window.document, 'checkbox');
  controller.waitThenClick(checkbox, TIMEOUT);

  var okButton = new elementslib.Lookup(controller.window.document, 
                                        '/id("commonDialog")' +
                                        '/anon({"anonid":"buttons"})' +
                                        '/{"dlgtype":"accept"}');
  controller.click(okButton);
}

