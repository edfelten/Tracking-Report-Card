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
 *   Aaron Train <atrain@mozilla.com>
 *   Vlad Maniac <vlad.maniac@softvisioninc.eu>
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
var modalDialog = require("../../../lib/modal-dialog");
var prefs = require("../../../lib/prefs");
var toolbars = require("../../../lib/toolbars");
var utils = require("../../../lib/utils");

const TIMEOUT = 5000;

const LOCAL_TEST_FOLDER = collector.addHttpResource('../../../data/');
const LOCAL_TEST_PAGE = LOCAL_TEST_FOLDER + 'password_manager/login_form.html';

function setupModule() {
  controller = mozmill.getBrowserController();
  locationBar = new toolbars.locationBar(controller);

  pm = Cc["@mozilla.org/login-manager;1"].
       getService(Ci.nsILoginManager);
  pm.removeAllLogins();
}

function teardownModule() {
  // Just in case the test fails remove all cookies
  pm.removeAllLogins();
}

/* Test if Password is saved and deleted */
function testSaveAndDeletePassword() {
  // Go to the sample login page and log-in with inputted fields
  controller.open(LOCAL_TEST_PAGE);
  controller.waitForPageLoad();

  var userField = new elementslib.ID(controller.tabs.activeTab, "uname");
  var passField = new elementslib.ID(controller.tabs.activeTab, "Password");

  controller.waitForElement(userField, TIMEOUT);
  controller.type(userField, "bar");
  controller.type(passField, "foo");

  var logInButton = new elementslib.ID(controller.tabs.activeTab, "LogIn");
  controller.click(logInButton);
  controller.waitForPageLoad();

  // After logging in, remember the login information
  var button = locationBar.getNotificationElement(
                 "password-save-notification",
                 '/anon({"anonid":"button"})'
               );
  var notification = locationBar.getNotificationElement(
                       "password-save-notification"
                     );
  controller.waitThenClick(button);
  
  // After clicking the 'Remember Password' button, check notification state
  controller.assert(function() {
    return notification.getNode().parentNode.state == "closed";
  }, "Password notification should be closed");

  // Go back to the login page and verify the password has been saved
  controller.open(LOCAL_TEST_PAGE);
  controller.waitForPageLoad();

  userField = new elementslib.ID(controller.tabs.activeTab, "uname");
  passField = new elementslib.ID(controller.tabs.activeTab, "Password");

  controller.waitForElement(userField, TIMEOUT);
  controller.assertValue(userField, "bar");
  controller.assertValue(passField, "foo");

  // Call preferences dialog and delete the saved password
  prefs.openPreferencesDialog(controller, prefDialogCallback);
}

/**
 * Go to the security pane and open the password manager
 * @param {MozMillController} controller
 *        MozMillController of the window to operate on
 */
function prefDialogCallback(controller) {
  var prefDialog = new prefs.preferencesDialog(controller);
  prefDialog.paneId = 'paneSecurity';

  var showPasswords = new elementslib.ID(controller.window.document, "showPasswords");
  controller.waitThenClick(showPasswords, TIMEOUT);

  utils.handleWindow("type", "Toolkit:PasswordManager", deleteAllPasswords);


  // Close the preferences dialog
  prefDialog.close(true);
}

/**
 * Delete all passwords
 * @param {MozMillController} controller
 *        MozMillController of the window to operate on
 */
function deleteAllPasswords(controller) {
  var signOnsTree = controller.window.document.getElementById("signonsTree");

  // Verify there is at least one saved password
  controller.assertJS("subject.view.rowCount == 1", signOnsTree);

  // Delete all passwords and accept the deletion of the saved passwords
  var md = new modalDialog.modalDialog(controller.window);
  md.start(confirmHandler);

  controller.click(new elementslib.ID(controller.window.document, "removeAllSignons"));
  md.waitForDialog();

  // No passwords should exist anymore
  controller.assertJS("subject.view.rowCount == 0", signOnsTree);

  // Close the password manager
  var dtds = ["chrome://passwordmgr/locale/passwordManager.dtd"];
  var cmdKey = utils.getEntity(dtds, "windowClose.key");
  controller.keypress(null, cmdKey, {accelKey: true});
}

/**
 * Call the confirmation dialog and click ok to go back to the password manager
 * @param {MozMillController} controller
 *        MozMillController of the window to operate on
 */
function confirmHandler(controller) {
  var dialogButton = new elementslib.Lookup(controller.window.document,
                                            '/id("commonDialog")' +
                                            '/anon({"anonid":"buttons"})' +
                                            '/{"dlgtype":"accept"}');
  
  controller.waitThenClick(dialogButton, TIMEOUT);
}


