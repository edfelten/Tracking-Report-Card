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
 * The Initial Developer of the Original Code is Mozilla Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Anthony Hughes <ahughes@mozilla.com>
 *   Henrik Skupin <hskupin@mozilla.com>
 *   Vlad Maniac <vlad.mozbugs@gmail.com>
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
 * **** END LICENSE BLOCK ***** */

// Include necessary modules
var modalDialog = require("../../../lib/modal-dialog");                       
var prefs = require("../../../lib/prefs");
var tabbedbrowser = require("../../../lib/tabs");
var utils = require("../../../lib/utils");

const gDelay = 0;
const gTimeout = 5000;

const TIMEOUT_MODAL_DIALOG = 30000;

var gPreferences = new Array("security.warn_entering_secure",
                             "security.warn_entering_weak",
                             "security.warn_leaving_secure",
                             "security.warn_submit_insecure",
                             "security.warn_viewing_mixed");

var setupModule = function(module) {
  controller = mozmill.getBrowserController();
  tabbedbrowser.closeAllTabs(controller);
}

var teardownModule = function(module) {
  for each (p in gPreferences)
    prefs.preferences.clearUserPref(p);
}

/**
 * Test warning about viewing an encrypted page
 */
var testEncryptedPageWarning = function() {
  // Enable the 'warn_entering_secure' pref only
  for (var i = 0; i < gPreferences.length; i++)
    prefs.preferences.setPref(gPreferences[i], (i == 0));

  // Create a listener for the warning dialog
  var md = new modalDialog.modalDialog(controller.window .window);
  md.start(handleSecurityWarningDialog);

  // Load an encrypted page and wait for the security alert
  controller.open("https://mail.mozilla.org");
  md.waitForDialog(TIMEOUT_MODAL_DIALOG);
}

/**
 * Helper function to handle interaction with the Security Warning modal dialog
 */
var handleSecurityWarningDialog = function(controller) {
  var enterSecureMessage = utils.getProperty("chrome://pipnss/locale/security.properties",
                                             "EnterSecureMessage");

  // Wait for the content to load
  var infoBody = new elementslib.ID(controller.window.document, "info.body");
  controller.waitForElement(infoBody);

  // Verify the message text
  controller.assertJSProperty(infoBody, "textContent", enterSecureMessage);

  // Verify the "Alert me whenever" checkbox is checked by default
  var checkbox = new elementslib.ID(controller.window.document, "checkbox");
  controller.assertChecked(checkbox);

  // Click the OK button
  var okButton = new elementslib.Lookup(controller.window.document,
                                        '/id("commonDialog")' +
                                        '/anon({"anonid":"buttons"})' +
                                        '/{"dlgtype":"accept"}');
  controller.waitThenClick(okButton);
}
