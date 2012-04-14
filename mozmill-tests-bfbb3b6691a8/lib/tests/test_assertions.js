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
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Henrik Skupin <mail@hskupin.info> (Original Author)
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

var {assert, expect, Expect} = require("../assertions");


const TEST_DATA = [
  { fun: "pass", params: ["has to pass"], result: true},
  { fun: "fail", params: ["has to fail"], result: false},

  { fun: "ok", params: [true, "true has to pass"], result: true},
  { fun: "ok", params: [false, "false has to fail"], result: false},
  { fun: "ok", params: [0, "0 has to fail"], result: false},
  { fun: "ok", params: [1, "1 has to pass"], result: true},
  { fun: "ok", params: [2, "2 has to pass"], result: true},
  { fun: "ok", params: ["", "empty string has to fail"], result: false},
  { fun: "ok", params: ["test", "non-empty string has to pass"], result: true},
  { fun: "ok", params: [null, "null has to fail"], result: false},
  { fun: "ok", params: [undefined, "undefined has to fail"], result: false},

  { fun: "equal", params: [true, true, "Values are equal"], result: true},
  { fun: "equal", params: [true, false, "Values are not equal"], result: false},
  { fun: "equal", params: [null, undefined, "Types are not equal"], result: false},
  { fun: "equal", params: [undefined, false, "Types are not equal"], result: false},
  { fun: "equal", params: ["str", "str", "Strings are equal"], result: true},

  { fun: "deepEqual", params: [{a: 1, b: ["y", "z"]}, {a: 1, b: ["y", "z"]}, "Objects are equal"], result: true},
  { fun: "deepEqual", params: [[3, 4], [3, 4], "Arrays are equal"], result: true},
  { fun: "deepEqual", params: [[5, 4], [4, 5], "Arrays are not equal"], result: false},
  { fun: "deepEqual", params: ["str", "str", "Strings are equal"], result: true},
  { fun: "deepEqual", params: [undefined, false, "Objects are not equal"], result: false},

  { fun: "notEqual", params: [true, true, "Values are equal"], result: false},
  { fun: "notEqual", params: [true, false, "Values are not equal"], result: true},
  { fun: "notEqual", params: [undefined, null, "Types are not equal"], result: true},

  { fun: "notDeepEqual", params: [{}, {a: 4}, "Objects are not equal"], result: true},
  { fun: "notDeepEqual", params: [{}, {}, "Objects are equal"], result: false},

  { fun: "match", params: ["Mozilla", /Mozilla/, "regex matches string"], result: true},
  { fun: "match", params: ["Mozilla", /mozilla/, "regex does not match string"], result: false},
  { fun: "match", params: ["Mozilla", /mozilla/i, "regex matches string"], result: true},

  { fun: "notMatch", params: ["Mozilla", /firefox/, "regex does not match string"], result: true},
  { fun: "notMatch", params: ["Mozilla", /Mozilla/, "regex matches string"], result: false},
];


/**
 * Soft expect class for assertions which should not add failing and passing frames
 */
function SoftExpect() { }

SoftExpect.prototype = new Expect();
SoftExpect.prototype.constructor = SoftExpect;
SoftExpect.prototype.parent = Expect.prototype;


SoftExpect.prototype._logPass = function SoftExpect__logPass(aResult) {
  // We do not want to add a passing frame but only take care of the
  // return values of the _test method
}

SoftExpect.prototype._logFail = function SoftExpect__logFail(aResult) {
  // We do not want to add a failing frame but only take care of the
  // return values of the _test function
}


function setupModule(module) {
  softExpect = new SoftExpect();
}


function teardownModule(module) {
}


/**
 * Tests for supported expect methods
 */
function testExpect() {
  for each (var test in TEST_DATA) {
    let message = "except." + test.fun + " for [" +
                  test.params.join(", ") + "]";

    let result = softExpect[test.fun].apply(softExpect, test.params);
    expect.equal(result, test.result, message);
  }
}


/**
 * Tests for supported assert methods
 */
function testAssert() {
  for each (var test in TEST_DATA) {
    let message = "assert." + test.fun + " for [" +
                  test.params.join(", ") + "]";
    let result = false;

    try {
      result = assert[test.fun].apply(assert, test.params);
    }
    catch (ex) {
    }

    if (test.result !== result)
      expect.fail(message);
    else
      expect.pass(message);
  }
}
