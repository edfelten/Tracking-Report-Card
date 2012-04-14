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

// Include required modules
var {expect} = require("../assertions");
var modalDialog = require("../modal-dialog");
var search = require("../search");
var utils = require("../utils");

const gDelay = 0;
const gTimeout = 5000;

var setupModule = function(module)
{
  controller = mozmill.getBrowserController();

  searchBar = new search.searchBar(controller);
  searchBar.clear();
}

var teardownModule = function(module)
{
  searchBar.clear();
  searchBar.restoreDefaultEngines();
}

/**
 * Add a MozSearch Search plugin
 */
var testSearchAPI = function()
{
  // Check if Google is installed and there is no Googl engine present
  expect.ok(searchBar.isEngineInstalled("Google"), "Google search engine is installed");
  expect.ok(!searchBar.isEngineInstalled("Googl"), "Googl search engine is not present");

  // Do some stuff in the Search Engine Manager
  searchBar.openEngineManager(handlerManager);

  // Select another engine and start search
  searchBar.selectedEngine = "Yahoo";
  searchBar.search({text: "Firefox", action: "returnKey"});
}

var handlerManager = function(controller)
{
  var manager = new search.engineManager(controller);
  var engines = manager.engines;

  // Remove the first search engine
  manager.removeEngine(engines[3].name);
  manager.controller.sleep(500);

  // Move engines down / up
  manager.moveDownEngine(engines[0].name);
  manager.moveUpEngine(engines[2].name);
  manager.controller.sleep(500);

  // Add a keyword for the first engine
  manager.editKeyword(engines[0].name, handlerKeyword);
  manager.controller.sleep(500);

  // Restore the defaults
  manager.restoreDefaults();
  manager.controller.sleep(500);

  // Disable suggestions
  manager.suggestionsEnabled = false;
  manager.controller.sleep(500);

  manager.getMoreSearchEngines();

  // Dialog closes automatically
  //manager.close(true);
}

var handlerKeyword = function(controller)
{
  var textbox = new elementslib.ID(controller.window.document, "loginTextbox");
  controller.type(textbox, "g");

  var okButton = new elementslib.Lookup(controller.window.document,
                                        '/id("commonDialog")/anon({"anonid":"buttons"})/{"dlgtype":"accept"}');
  controller.click(okButton);
}
