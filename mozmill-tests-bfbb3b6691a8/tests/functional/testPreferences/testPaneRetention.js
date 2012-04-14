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
 *   Henrik Skupin <hskupin@mozilla.com>
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
var prefs = require("../../../lib/prefs");
var utils = require("../../../lib/utils");

function setupModule(module) {
  controller = mozmill.getBrowserController();
}

function teardownModule(module) {
  prefs.openPreferencesDialog(controller, prefPaneResetCallback);
}

/**
 * Test the Preferences dialog retains state
 */
function testPreferencesDialogRetention() {
  // Choose the Privacy pane
  prefs.openPreferencesDialog(controller, prefPaneSetCallback);

  // And check if the Privacy pane is still selected
  prefs.openPreferencesDialog(controller, prefPaneCheckCallback);
}

/**
 * Select the Advanced and the Privacy pane
 *
 * @param {MozMillController} controller
 *        MozMillController of the window to operate on
 */
function prefPaneSetCallback(controller) {
  var prefDialog = new prefs.preferencesDialog(controller);

  prefDialog.paneId = 'paneAdvanced';
  prefDialog.paneId = 'panePrivacy';
  prefDialog.close();
}

/**
 * The Privacy pane should still be selected
 *
 * @param {MozMillController} controller
 *        MozMillController of the window to operate on
 */
function prefPaneCheckCallback(controller) {
  var prefDialog = new prefs.preferencesDialog(controller);

  controller.assertJS("subject.paneId == 'panePrivacy'",
                      {paneId: prefDialog.paneId});
  prefDialog.close();
}

/**
 * Reset the current pane to the main options
 *
 * @param {MozMillController} controller
 *        MozMillController of the window to operate on
 */
function prefPaneResetCallback(controller) {
  var prefDialog = new prefs.preferencesDialog(controller);

  prefDialog.paneId = 'paneMain';
  prefDialog.close();
}

