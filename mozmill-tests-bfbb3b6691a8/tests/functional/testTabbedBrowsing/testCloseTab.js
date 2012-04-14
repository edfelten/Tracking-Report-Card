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
 *  Henrik Skupin <hskupin@mozilla.com>
 *  Geo Mealer <gmealer@mozilla.com>
 *  Remus Pop <remus.pop@softvision.ro>
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
var tabs = require("../../../lib/tabs");

const gDelay = 0;
const gTimeout = 5000;

var setupModule = function(module)
{
  controller = mozmill.getBrowserController();

  tabBrowser = new tabs.tabBrowser(controller);
  tabBrowser.closeAllTabs();
}

var testCloseTab = function()
{
  // Let's have 5 tabs open
  for(var i = 0; i < 4; i++) {
    tabBrowser.openTab();
  }

  controller.waitFor(function () {
    return tabBrowser.length === 5;
  }, "5 tabs have been opened");

  // Close a tab by pressing the keyboard shortcut:
  tabBrowser.closeTab("shortcut");
  controller.waitFor(function () {
    return tabBrowser.length === 4;
  }, "One tab has been closed via keyboard shortcut");

  // Close a tab via File > Close tab:
  tabBrowser.closeTab("menu");
  controller.waitFor(function () {
    return tabBrowser.length === 3;
  }, "One tab has been closed via File menu");

  // Close an inactive tab via middle click
  tabBrowser.closeTab("middleClick", 0);
  controller.waitFor(function () {
    return tabBrowser.length === 2;
  }, "One tab has been closed via middle click");

  // Close a tab via the close button on the tab itself:
  tabBrowser.closeTab("closeButton");
  controller.waitFor(function () {
    return tabBrowser.length === 1;
  }, "One tab has been closed using the close button");
}

/**
 * Map test functions to litmus tests
 */
// testOpenInBackgroundTab.meta = {litmusids : [8094]};
