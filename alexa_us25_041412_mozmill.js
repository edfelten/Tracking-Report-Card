/*
A MozMill script for running a web crawl that:
-disables opening new tabs and popups
-disables most modal dialogs
-cycles private browsing with each page load
*/ 

// Point to a local copy of the latest mozmill-test repository
// See https://developer.mozilla.org/en/Mozmill_Tests/Shared_Modules
// On Windows, format path like file://C:/...
var MOZMILL_TEST_ROOT = "mozmill-tests-bfbb3b6691a8/";

var PrivateBrowsingAPI = require(MOZMILL_TEST_ROOT + "lib/private-browsing");
var privateBrowsing;

var PAGE_LOAD_TIMEOUT = 10000;
var PAGE_WAIT = 10000;

var setupModule = function(module) {
	module.controller = mozmill.getBrowserController();
	
	// Setup private browsing control
	privateBrowsing = new PrivateBrowsingAPI.privateBrowsing(module.controller);
	privateBrowsing.showPrompt = false;
	privateBrowsing.waitForTransitionComplete = privateBrowsing.waitForTransistionComplete;
	module.cyclePrivateBrowsing = function() {
		privateBrowsing.stop();
		privateBrowsing.waitForTransitionComplete(false);
		privateBrowsing.start();
		privateBrowsing.waitForTransitionComplete(true);
	};
}

var test0 = function(){
	cyclePrivateBrowsing();
	controller.open("http://google.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test1 = function(){
	cyclePrivateBrowsing();
	controller.open("http://facebook.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test2 = function(){
	cyclePrivateBrowsing();
	controller.open("http://youtube.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test3 = function(){
	cyclePrivateBrowsing();
	controller.open("http://yahoo.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test4 = function(){
	cyclePrivateBrowsing();
	controller.open("http://amazon.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test5 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wikipedia.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test6 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ebay.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test7 = function(){
	cyclePrivateBrowsing();
	controller.open("http://twitter.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test8 = function(){
	cyclePrivateBrowsing();
	controller.open("http://craigslist.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test9 = function(){
	cyclePrivateBrowsing();
	controller.open("http://linkedin.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test10 = function(){
	cyclePrivateBrowsing();
	controller.open("http://blogspot.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test11 = function(){
	cyclePrivateBrowsing();
	controller.open("http://live.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test12 = function(){
	cyclePrivateBrowsing();
	controller.open("http://msn.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test13 = function(){
	cyclePrivateBrowsing();
	controller.open("http://go.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test14 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bing.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test15 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pinterest.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test16 = function(){
	cyclePrivateBrowsing();
	controller.open("http://paypal.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test17 = function(){
	cyclePrivateBrowsing();
	controller.open("http://espn.go.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test18 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cnn.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test19 = function(){
	cyclePrivateBrowsing();
	controller.open("http://aol.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test20 = function(){
	cyclePrivateBrowsing();
	controller.open("http://tumblr.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test21 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wordpress.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test22 = function(){
	cyclePrivateBrowsing();
	controller.open("http://t.co");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test23 = function(){
	cyclePrivateBrowsing();
	controller.open("http://netflix.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test24 = function(){
	cyclePrivateBrowsing();
	controller.open("http://huffingtonpost.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var teardownModule = function(module) {
	privateBrowsing.stop();
}
