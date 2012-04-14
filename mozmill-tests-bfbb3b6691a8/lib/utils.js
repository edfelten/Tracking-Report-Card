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
 * The Initial Developer of the Original Code is the Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Henrik Skupin <hskupin@mozilla.com>
 *   Anthony Hughes <ahughes@mozilla.com>
 *   M.-A. Darche <mozdev@cynode.org>
 *   Vlad Maniac <vlad.maniac@softvisioninc.eu>
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

/**
 * @fileoverview
 * The UtilsAPI offers various helper functions for any other API which is
 * not already covered by another shared module.
 *
 * @version 1.0.3
 */

// Include required modules
var {assert} = require("assertions");
var prefs = require("prefs");

const gTimeout = 5000;

/**
 * Get application specific informations
 * @see http://mxr.mozilla.org/mozilla-central/source/xpcom/system/nsIXULAppInfo.idl
 */
var appInfo = {
  _service: null,

  /**
   * Get the application info service
   * @returns XUL runtime object
   * @type nsiXULRuntime
   */
  get appInfo() {
    if (!this._appInfo) {
      this._service = Cc["@mozilla.org/xre/app-info;1"]
                        .getService(Ci.nsIXULAppInfo)
                        .QueryInterface(Ci.nsIXULRuntime);
    }
    return this._service;
  },

  /**
   * Get the build id
   * @returns Build id
   * @type string
   */
  get buildID() this.appInfo.appBuildID,

  /**
   * Get the application id
   * @returns Application id
   * @type string
   */
  get ID() this.appInfo.ID,

  /**
   * Get the application name
   * @returns Application name
   * @type string
   */
  get name() this.appInfo.name,

  /**
   * Get the operation system
   * @returns Operation system name
   * @type string
   */
  get os() this.appInfo.OS,

  /**
   * Get the product vendor
   * @returns Vendor name
   * @type string
   */
  get vendor() this.appInfo.vendor,

  /**
   * Get the application version
   * @returns Application version
   * @type string
   */
  get version() this.appInfo.version,

  /**
   * Get the build id of the Gecko platform
   * @returns Platform build id
   * @type string
   */
  get platformBuildID() this.appInfo.platformBuildID,

  /**
   * Get the version of the Gecko platform
   * @returns Platform version
   * @type string
   */
  get platformVersion() this.appInfo.platformVersion,

  /**
   * Get the currently used locale
   * @returns Current locale
   * @type string
   */
  get locale() {
    var registry = Cc["@mozilla.org/chrome/chrome-registry;1"]
                     .getService(Ci.nsIXULChromeRegistry);
    return registry.getSelectedLocale("global");
  },

  /**
   * Get the user agent string
   * @returns User agent
   * @type string
   */
  get userAgent() {
    var window = mozmill.wm.getMostRecentWindow("navigator:browser");
    if (window)
      return window.navigator.userAgent;
    return "";
  },

  /**
   * Get the ABI of the platform
   *
   * @returns {String} ABI version
   */
  get XPCOMABI() this.appInfo.XPCOMABI
};

/**
 * Checks the visibility of an element.
 * XXX: Mozmill doesn't check if an element is visible and also operates on
 * elements which are invisible. (Bug 490548)
 *
 * @param {MozmillController} controller
 *        MozMillController of the window to operate on
 * @param {ElemBase} elem
 *        Element to check its visibility
 * @param {boolean} expectedVisibility
 *        Expected visibility state of the element
 */
function assertElementVisible(controller, elem, expectedVisibility) {
  var element = elem.getNode();
  var visible;

  switch (element.nodeName) {
    case 'panel':
      visible = (element.state == 'open');
      break;
    default:
      var style = controller.window.getComputedStyle(element, '');
      var state = style.getPropertyValue('visibility');
      visible = (state == 'visible');
  }

  assert.equal(visible, expectedVisibility, "Element has expected visibility");
}

/**
 * Assert if the current URL is identical to the target URL.
 * With this function also redirects can be tested.
 *
 * @param {MozmillController} controller
 *        MozMillController of the window to operate on
 * @param {string} targetURL
 *        URL to check
 */
function assertLoadedUrlEqual(controller, targetUrl) {
  var locationBar = new elementslib.ID(controller.window.document, "urlbar");
  var currentURL = locationBar.getNode().value;

  // Load the target URL
  controller.open(targetUrl);
  controller.waitForPageLoad();

  // Check the same web page has been opened
  controller.waitFor(function () { 
    return locationBar.getNode().value === currentURL;
  }, "Current URL should be identical to the target URL - got " +
     locationBar.getNode().value + ", expected " + currentURL);
}

/**
 * Close the context menu inside the content area of the currently open tab
 *
 * @param {MozmillController} controller
 *        MozMillController of the window to operate on
 */
function closeContentAreaContextMenu(controller) {
  var contextMenu = new elementslib.ID(controller.window.document, "contentAreaContextMenu");
  controller.keypress(contextMenu, "VK_ESCAPE", {});
}

/**
 * Run tests against a given search form
 *
 * @param {MozMillController} controller
 *        MozMillController of the window to operate on
 * @param {ElemBase} searchField
 *        The HTML input form element to test
 * @param {string} searchTerm
 *        The search term for the test
 * @param {ElemBase} submitButton
 *        (Optional) The forms submit button
 * @param {number} timeout
 *        The timeout value for the single tests
 */
function checkSearchField(controller, searchField,
                                                     searchTerm, submitButton,
                                                     timeout) {
  controller.waitThenClick(searchField, timeout);
  controller.type(searchField, searchTerm);

  if (submitButton != undefined) {
    controller.waitThenClick(submitButton, timeout);
  }
}

/**
 * Create a new URI
 *
 * @param {string} spec
 *        The URI string in UTF-8 encoding.
 * @param {string} originCharset
 *        The charset of the document from which this URI string originated.
 * @param {string} baseURI
 *        If null, spec must specify an absolute URI. Otherwise, spec may be
 *        resolved relative to baseURI, depending on the protocol.
 * @return A URI object
 * @type nsIURI
 */
function createURI(spec, originCharset, baseURI)
{
  let iosvc = Cc["@mozilla.org/network/io-service;1"].
              getService(Ci.nsIIOService);

  return iosvc.newURI(spec, originCharset, baseURI);
}


/**
 * Empty the clipboard by assigning an empty string
 */
function emptyClipboard() {
  var clipboard = Cc["@mozilla.org/widget/clipboardhelper;1"].
                  getService(Ci.nsIClipboardHelper);
  clipboard.copyString("");
}

/**
 * Format a URL by replacing all placeholders
 *
 * @param {String} aURL The URL which contains placeholders to replace
 *
 * @returns {String} The formatted URL
 */
function formatUrl(aURL) {
  var formatter = Cc["@mozilla.org/toolkit/URLFormatterService;1"].
                  getService(Ci.nsIURLFormatter);

  return formatter.formatURL(aURL);
}

/**
 * Format a URL given by a preference and replace all placeholders
 *
 * @param {String} aPrefName The preference name which contains the URL
 *
 * @returns {String} The formatted URL
 */
function formatUrlPref(prefName) {
  var formatter = Cc["@mozilla.org/toolkit/URLFormatterService;1"]
                     .getService(Ci.nsIURLFormatter);

  return formatter.formatURLPref(prefName);
}

/**
 * Returns the default home page
 *
 * @return The URL of the default homepage
 * @type string
 */
function getDefaultHomepage() {
  var preferences = prefs.preferences;

  var prefValue = preferences.getPref("browser.startup.homepage", "",
                                      true, Ci.nsIPrefLocalizedString);
  return prefValue.data;
}

/**
 * Returns the value of an individual entity in a DTD file.
 *
 * @param [string] urls
 *        Array of DTD urls.
 * @param {string} entityId
 *        The ID of the entity to get the value of.
 *
 * @return The value of the requested entity
 * @type string
 */
function getEntity(urls, entityId) {
  // Add xhtml11.dtd to prevent missing entity errors with XHTML files
  urls.push("resource:///res/dtd/xhtml11.dtd");

  // Build a string of external entities
  var extEntities = "";
  for (i = 0; i < urls.length; i++) {
    extEntities += '<!ENTITY % dtd' + i + ' SYSTEM "' +
                   urls[i] + '">%dtd' + i + ';';
  }

  var parser = Cc["@mozilla.org/xmlextras/domparser;1"]
                  .createInstance(Ci.nsIDOMParser);
  var header = '<?xml version="1.0"?><!DOCTYPE elem [' + extEntities + ']>';
  var elem = '<elem id="elementID">&' + entityId + ';</elem>';
  var doc = parser.parseFromString(header + elem, 'text/xml');
  var elemNode = doc.querySelector('elem[id="elementID"]');

  if (elemNode == null)
    throw new Error(arguments.callee.name + ": Unknown entity - " + entityId);

  return elemNode.textContent;
}

/**
 * Returns the value of an individual property.
 *
 * @param {string} url
 *        URL of the string bundle.
 * @param {string} prefName
 *        The property to get the value of.
 *
 * @return The value of the requested property
 * @type string
 */
function getProperty(url, prefName) {
  var sbs = Cc["@mozilla.org/intl/stringbundle;1"]
            .getService(Ci.nsIStringBundleService);
  var bundle = sbs.createBundle(url);

  try {
    return bundle.GetStringFromName(prefName);
  } catch (ex) {
    throw new Error(arguments.callee.name + ": Unknown property - " + prefName);
  }
}

/**
 * Function to handle non-modal windows
 *
 * @param {string} type
 *        Specifies how to check for the new window (possible values: type or title)
 * @param {string} text
 *        The window type of title string to search for
 * @param {function} callback (optional)
 *        Callback function to call for window specific tests
 * @param {boolean} close (optional - default: true)
 *        Make sure the window is closed after the return from the callback handler
 * @returns The MozMillController of the window (if the window hasn't been closed)
 */
function handleWindow(type, text, callback, close) {
  var window = null;

  // Set the window opener function to use depending on the type
  var func_ptr = null;
  switch (type) {
    case "type":
      func_ptr = mozmill.utils.getWindowByType;
      break;
    case "title":
      func_ptr = mozmill.utils.getWindowByTitle;
      break;
    default:
      throw new Error(arguments.callee.name + ": Unknown opener type - " + type);
  }

  try {
    // Wait until the window has been opened
    mozmill.utils.waitFor(function () {
      window = func_ptr(text);
      return !!window;
    }, "Window has been found.");

    // Get the controller for the newly opened window
    var controller = new mozmill.controller.MozMillController(window);

    // Call the specified callback method for the window
    if (callback) {
      callback(controller);
    }

    // Check if we have to close the window
    if (close === undefined)
      close = true;

    // Close the window if necessary
    if (close && window) {
      controller.window.close();
      mozmill.utils.waitFor(function () {
        return window.closed;
      }, "Window has been closed.");
      // XXX: Bug 628576 - need to find an event handler for when a window
      //                   is truly closed.
      controller.sleep(0);
      
      window = null;
      controller = null;
    }

    return controller;
  } catch (ex) {
    if (window)
      window.close();

    throw ex;
  }
}

/**
 * Helper function to remove a permission
 *
 * @param {string} aHost
 *        The host whose permission will be removed
 * @param {string} aType
 *        The type of permission to be removed
 */
function removePermission(aHost, aType) {
  var pm = Cc["@mozilla.org/permissionmanager;1"]
              .getService(Ci.nsIPermissionManager);
  
  pm.remove(aHost, aType);
}

/**
 * Returns the value of a CSS Property for a specific Element
 *
 * @param {ElemBase} aElement
 *        Element to get its property
 * @param {String} aProperty
 *        Property name to be retrieved
 *
 * @return {String} Value of the CSS property
 */
function getElementStyle(aElement, aProperty) {
  var element = aElement.getNode();
  
  if (!element) { 
    throw new Error(arguments.callee.name + " Element " + aElement.getInfo() + " is null");
  }   

  var elementStyle = element.ownerDocument.defaultView.getComputedStyle(element);
  return elementStyle.getPropertyValue(aProperty); 
} 

// Export of variables
exports.appInfo = appInfo;

// Export of functions
exports.assertElementVisible = assertElementVisible;
exports.assertLoadedUrlEqual = assertLoadedUrlEqual;
exports.closeContentAreaContextMenu = closeContentAreaContextMenu;
exports.checkSearchField = checkSearchField;
exports.createURI = createURI;
exports.emptyClipboard = emptyClipboard;
exports.formatUrl = formatUrl;
exports.formatUrlPref = formatUrlPref;
exports.getDefaultHomepage = getDefaultHomepage;
exports.getElementStyle = getElementStyle;
exports.getEntity = getEntity;
exports.getProperty = getProperty;
exports.handleWindow = handleWindow;
exports.removePermission = removePermission;
