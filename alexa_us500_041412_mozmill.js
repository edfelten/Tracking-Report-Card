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

var test25 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bankofamerica.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test26 = function(){
	cyclePrivateBrowsing();
	controller.open("http://apple.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test27 = function(){
	cyclePrivateBrowsing();
	controller.open("http://weather.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test28 = function(){
	cyclePrivateBrowsing();
	controller.open("http://imdb.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test29 = function(){
	cyclePrivateBrowsing();
	controller.open("http://zedo.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test30 = function(){
	cyclePrivateBrowsing();
	controller.open("http://chase.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test31 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nytimes.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test32 = function(){
	cyclePrivateBrowsing();
	controller.open("http://imgur.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test33 = function(){
	cyclePrivateBrowsing();
	controller.open("http://googleusercontent.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test34 = function(){
	cyclePrivateBrowsing();
	controller.open("http://microsoft.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test35 = function(){
	cyclePrivateBrowsing();
	controller.open("http://about.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test36 = function(){
	cyclePrivateBrowsing();
	controller.open("http://flickr.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test37 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ask.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test38 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wellsfargo.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test39 = function(){
	cyclePrivateBrowsing();
	controller.open("http://foxnews.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test40 = function(){
	cyclePrivateBrowsing();
	controller.open("http://comcast.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test41 = function(){
	cyclePrivateBrowsing();
	controller.open("http://yelp.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test42 = function(){
	cyclePrivateBrowsing();
	controller.open("http://secureserver.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test43 = function(){
	cyclePrivateBrowsing();
	controller.open("http://godaddy.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test44 = function(){
	cyclePrivateBrowsing();
	controller.open("http://walmart.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test45 = function(){
	cyclePrivateBrowsing();
	controller.open("http://optmd.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test46 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hulu.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test47 = function(){
	cyclePrivateBrowsing();
	controller.open("http://blogger.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test48 = function(){
	cyclePrivateBrowsing();
	controller.open("http://etsy.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test49 = function(){
	cyclePrivateBrowsing();
	controller.open("http://xhamster.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test50 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pornhub.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test51 = function(){
	cyclePrivateBrowsing();
	controller.open("http://reddit.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test52 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ehow.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test53 = function(){
	cyclePrivateBrowsing();
	controller.open("http://avg.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test54 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cnet.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test55 = function(){
	cyclePrivateBrowsing();
	controller.open("http://target.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test56 = function(){
	cyclePrivateBrowsing();
	controller.open("http://livejasmin.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test57 = function(){
	cyclePrivateBrowsing();
	controller.open("http://outbrain.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test58 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ups.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test59 = function(){
	cyclePrivateBrowsing();
	controller.open("http://groupon.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test60 = function(){
	cyclePrivateBrowsing();
	controller.open("http://adobe.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test61 = function(){
	cyclePrivateBrowsing();
	controller.open("http://aweber.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test62 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pandora.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test63 = function(){
	cyclePrivateBrowsing();
	controller.open("http://xvideos.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test64 = function(){
	cyclePrivateBrowsing();
	controller.open("http://reference.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test65 = function(){
	cyclePrivateBrowsing();
	controller.open("http://usps.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test66 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mywebsearch.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test67 = function(){
	cyclePrivateBrowsing();
	controller.open("http://att.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test68 = function(){
	cyclePrivateBrowsing();
	controller.open("http://washingtonpost.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test69 = function(){
	cyclePrivateBrowsing();
	controller.open("http://match.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test70 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wordpress.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test71 = function(){
	cyclePrivateBrowsing();
	controller.open("http://constantcontact.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test72 = function(){
	cyclePrivateBrowsing();
	controller.open("http://answers.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test73 = function(){
	cyclePrivateBrowsing();
	controller.open("http://warriorforum.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test74 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bestbuy.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test75 = function(){
	cyclePrivateBrowsing();
	controller.open("http://rr.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test76 = function(){
	cyclePrivateBrowsing();
	controller.open("http://intuit.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test77 = function(){
	cyclePrivateBrowsing();
	controller.open("http://salesforce.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test78 = function(){
	cyclePrivateBrowsing();
	controller.open("http://indeed.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test79 = function(){
	cyclePrivateBrowsing();
	controller.open("http://drudgereport.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test80 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wsj.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test81 = function(){
	cyclePrivateBrowsing();
	controller.open("http://photobucket.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test82 = function(){
	cyclePrivateBrowsing();
	controller.open("http://thepiratebay.se");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test83 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bbc.co.uk");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test84 = function(){
	cyclePrivateBrowsing();
	controller.open("http://usatoday.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test85 = function(){
	cyclePrivateBrowsing();
	controller.open("http://vimeo.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test86 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cbssports.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test87 = function(){
	cyclePrivateBrowsing();
	controller.open("http://americanexpress.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test88 = function(){
	cyclePrivateBrowsing();
	controller.open("http://fedex.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test89 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pch.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test90 = function(){
	cyclePrivateBrowsing();
	controller.open("http://verizonwireless.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test91 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pof.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test92 = function(){
	cyclePrivateBrowsing();
	controller.open("http://amazonaws.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test93 = function(){
	cyclePrivateBrowsing();
	controller.open("http://latimes.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test94 = function(){
	cyclePrivateBrowsing();
	controller.open("http://youporn.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test95 = function(){
	cyclePrivateBrowsing();
	controller.open("http://dailymail.co.uk");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test96 = function(){
	cyclePrivateBrowsing();
	controller.open("http://swagbucks.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test97 = function(){
	cyclePrivateBrowsing();
	controller.open("http://stumbleupon.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test98 = function(){
	cyclePrivateBrowsing();
	controller.open("http://capitalone.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test99 = function(){
	cyclePrivateBrowsing();
	controller.open("http://zillow.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test100 = function(){
	cyclePrivateBrowsing();
	controller.open("http://expedia.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test101 = function(){
	cyclePrivateBrowsing();
	controller.open("http://fiverr.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test102 = function(){
	cyclePrivateBrowsing();
	controller.open("http://myspace.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test103 = function(){
	cyclePrivateBrowsing();
	controller.open("http://homedepot.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test104 = function(){
	cyclePrivateBrowsing();
	controller.open("http://newegg.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test105 = function(){
	cyclePrivateBrowsing();
	controller.open("http://abcnews.go.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test106 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wikia.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test107 = function(){
	cyclePrivateBrowsing();
	controller.open("http://babylon.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test108 = function(){
	cyclePrivateBrowsing();
	controller.open("http://fbcdn.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test109 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cj.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test110 = function(){
	cyclePrivateBrowsing();
	controller.open("http://coupons.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test111 = function(){
	cyclePrivateBrowsing();
	controller.open("http://foxsports.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test112 = function(){
	cyclePrivateBrowsing();
	controller.open("http://deviantart.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test113 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mlb.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test114 = function(){
	cyclePrivateBrowsing();
	controller.open("http://tripadvisor.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test115 = function(){
	cyclePrivateBrowsing();
	controller.open("http://redtube.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test116 = function(){
	cyclePrivateBrowsing();
	controller.open("http://tmz.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test117 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hootsuite.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test118 = function(){
	cyclePrivateBrowsing();
	controller.open("http://irs.gov");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test119 = function(){
	cyclePrivateBrowsing();
	controller.open("http://addthis.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test120 = function(){
	cyclePrivateBrowsing();
	controller.open("http://forbes.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test121 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cbsnews.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test122 = function(){
	cyclePrivateBrowsing();
	controller.open("http://livingsocial.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test123 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bp.blogspot.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test124 = function(){
	cyclePrivateBrowsing();
	controller.open("http://xnxx.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test125 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mapquest.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test126 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cbsnews.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test127 = function(){
	cyclePrivateBrowsing();
	controller.open("http://allrecipes.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test128 = function(){
	cyclePrivateBrowsing();
	controller.open("http://stackoverflow.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test129 = function(){
	cyclePrivateBrowsing();
	controller.open("http://shopathome.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test130 = function(){
	cyclePrivateBrowsing();
	controller.open("http://slickdeals.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test131 = function(){
	cyclePrivateBrowsing();
	controller.open("http://statcounter.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test132 = function(){
	cyclePrivateBrowsing();
	controller.open("http://instagr.am");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test133 = function(){
	cyclePrivateBrowsing();
	controller.open("http://verizon.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test134 = function(){
	cyclePrivateBrowsing();
	controller.open("http://monster.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test135 = function(){
	cyclePrivateBrowsing();
	controller.open("http://southwest.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test136 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nba.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test137 = function(){
	cyclePrivateBrowsing();
	controller.open("http://squidoo.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test138 = function(){
	cyclePrivateBrowsing();
	controller.open("http://tube8.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test139 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pogo.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test140 = function(){
	cyclePrivateBrowsing();
	controller.open("http://typepad.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test141 = function(){
	cyclePrivateBrowsing();
	controller.open("http://sears.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test142 = function(){
	cyclePrivateBrowsing();
	controller.open("http://usbank.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test143 = function(){
	cyclePrivateBrowsing();
	controller.open("http://people.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test144 = function(){
	cyclePrivateBrowsing();
	controller.open("http://lowes.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test145 = function(){
	cyclePrivateBrowsing();
	controller.open("http://macys.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test146 = function(){
	cyclePrivateBrowsing();
	controller.open("http://kohls.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test147 = function(){
	cyclePrivateBrowsing();
	controller.open("http://careerbuilder.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test148 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mashable.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test149 = function(){
	cyclePrivateBrowsing();
	controller.open("http://priceline.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test150 = function(){
	cyclePrivateBrowsing();
	controller.open("http://trulia.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test151 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ancestry.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test152 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mediafire.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test153 = function(){
	cyclePrivateBrowsing();
	controller.open("http://woot.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test154 = function(){
	cyclePrivateBrowsing();
	controller.open("http://reuters.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test155 = function(){
	cyclePrivateBrowsing();
	controller.open("http://dropbox.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test156 = function(){
	cyclePrivateBrowsing();
	controller.open("http://clickbank.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test157 = function(){
	cyclePrivateBrowsing();
	controller.open("http://gap.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test158 = function(){
	cyclePrivateBrowsing();
	controller.open("http://webmd.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test159 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hostgator.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test160 = function(){
	cyclePrivateBrowsing();
	controller.open("http://meetup.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test161 = function(){
	cyclePrivateBrowsing();
	controller.open("http://realtor.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test162 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ca.gov");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test163 = function(){
	cyclePrivateBrowsing();
	controller.open("http://backpage.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test164 = function(){
	cyclePrivateBrowsing();
	controller.open("http://search-results.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test165 = function(){
	cyclePrivateBrowsing();
	controller.open("http://disney.go.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test166 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cbslocal.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test167 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mgid.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test168 = function(){
	cyclePrivateBrowsing();
	controller.open("http://quickmeme.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test169 = function(){
	cyclePrivateBrowsing();
	controller.open("http://barnesandnoble.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test170 = function(){
	cyclePrivateBrowsing();
	controller.open("http://manta.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test171 = function(){
	cyclePrivateBrowsing();
	controller.open("http://yellowpages.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test172 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wunderground.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test173 = function(){
	cyclePrivateBrowsing();
	controller.open("http://whitepages.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test174 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nih.gov");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test175 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mozilla.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test176 = function(){
	cyclePrivateBrowsing();
	controller.open("http://digg.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test177 = function(){
	cyclePrivateBrowsing();
	controller.open("http://download.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test178 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nydailynews.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test179 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bleacherreport.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test180 = function(){
	cyclePrivateBrowsing();
	controller.open("http://overstock.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test181 = function(){
	cyclePrivateBrowsing();
	controller.open("http://retailmenot.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test182 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ign.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test183 = function(){
	cyclePrivateBrowsing();
	controller.open("http://files.wordpress.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test184 = function(){
	cyclePrivateBrowsing();
	controller.open("http://zappos.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test185 = function(){
	cyclePrivateBrowsing();
	controller.open("http://okcupid.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test186 = function(){
	cyclePrivateBrowsing();
	controller.open("http://xdating.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test187 = function(){
	cyclePrivateBrowsing();
	controller.open("http://foodnetwork.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test188 = function(){
	cyclePrivateBrowsing();
	controller.open("http://dailymotion.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test189 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hubpages.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test190 = function(){
	cyclePrivateBrowsing();
	controller.open("http://surveymonkey.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test191 = function(){
	cyclePrivateBrowsing();
	controller.open("http://kayak.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test192 = function(){
	cyclePrivateBrowsing();
	controller.open("http://sfgate.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test193 = function(){
	cyclePrivateBrowsing();
	controller.open("http://earthlink.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test194 = function(){
	cyclePrivateBrowsing();
	controller.open("http://youjizz.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test195 = function(){
	cyclePrivateBrowsing();
	controller.open("http://accountonline.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test196 = function(){
	cyclePrivateBrowsing();
	controller.open("http://marketwatch.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test197 = function(){
	cyclePrivateBrowsing();
	controller.open("http://accuweather.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test198 = function(){
	cyclePrivateBrowsing();
	controller.open("http://citibank.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test199 = function(){
	cyclePrivateBrowsing();
	controller.open("http://costco.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test200 = function(){
	cyclePrivateBrowsing();
	controller.open("http://jcpenney.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test201 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bloomberg.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test202 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hp.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test203 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cltrda.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test204 = function(){
	cyclePrivateBrowsing();
	controller.open("http://doubleclick.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test205 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ticketmaster.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test206 = function(){
	cyclePrivateBrowsing();
	controller.open("http://staples.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test207 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pornhublive.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test208 = function(){
	cyclePrivateBrowsing();
	controller.open("http://gotomeeting.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test209 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wikimedia.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test210 = function(){
	cyclePrivateBrowsing();
	controller.open("http://weather.gov");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test211 = function(){
	cyclePrivateBrowsing();
	controller.open("http://taleo.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test212 = function(){
	cyclePrivateBrowsing();
	controller.open("http://patch.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test213 = function(){
	cyclePrivateBrowsing();
	controller.open("http://legacy.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test214 = function(){
	cyclePrivateBrowsing();
	controller.open("http://dell.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test215 = function(){
	cyclePrivateBrowsing();
	controller.open("http://istockphoto.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test216 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cox.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test217 = function(){
	cyclePrivateBrowsing();
	controller.open("http://baidu.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test218 = function(){
	cyclePrivateBrowsing();
	controller.open("http://techcrunch.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test219 = function(){
	cyclePrivateBrowsing();
	controller.open("http://goodreads.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test220 = function(){
	cyclePrivateBrowsing();
	controller.open("http://united.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test221 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ning.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test222 = function(){
	cyclePrivateBrowsing();
	controller.open("http://fidelity.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test223 = function(){
	cyclePrivateBrowsing();
	controller.open("http://archive.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test224 = function(){
	cyclePrivateBrowsing();
	controller.open("http://sparkstudios.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test225 = function(){
	cyclePrivateBrowsing();
	controller.open("http://infusionsoft.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test226 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cnbc.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test227 = function(){
	cyclePrivateBrowsing();
	controller.open("http://linksynergy.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test228 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nfl.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test229 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nypost.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test230 = function(){
	cyclePrivateBrowsing();
	controller.open("http://boston.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test231 = function(){
	cyclePrivateBrowsing();
	controller.open("http://guardian.co.uk");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test232 = function(){
	cyclePrivateBrowsing();
	controller.open("http://delta.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test233 = function(){
	cyclePrivateBrowsing();
	controller.open("http://searchnu.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test234 = function(){
	cyclePrivateBrowsing();
	controller.open("http://shareasale.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test235 = function(){
	cyclePrivateBrowsing();
	controller.open("http://businessinsider.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test236 = function(){
	cyclePrivateBrowsing();
	controller.open("http://npr.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test237 = function(){
	cyclePrivateBrowsing();
	controller.open("http://megamillions.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test238 = function(){
	cyclePrivateBrowsing();
	controller.open("http://w3schools.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test239 = function(){
	cyclePrivateBrowsing();
	controller.open("http://sitesell.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test240 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nordstrom.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test241 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bluehost.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test242 = function(){
	cyclePrivateBrowsing();
	controller.open("http://vistaprint.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test243 = function(){
	cyclePrivateBrowsing();
	controller.open("http://force.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test244 = function(){
	cyclePrivateBrowsing();
	controller.open("http://alibaba.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test245 = function(){
	cyclePrivateBrowsing();
	controller.open("http://livejournal.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test246 = function(){
	cyclePrivateBrowsing();
	controller.open("http://warriorplus.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test247 = function(){
	cyclePrivateBrowsing();
	controller.open("http://quibids.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test248 = function(){
	cyclePrivateBrowsing();
	controller.open("http://fandango.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test249 = function(){
	cyclePrivateBrowsing();
	controller.open("http://media.tumblr.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test250 = function(){
	cyclePrivateBrowsing();
	controller.open("http://examiner.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test251 = function(){
	cyclePrivateBrowsing();
	controller.open("http://fandango.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test252 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mailchimp.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test253 = function(){
	cyclePrivateBrowsing();
	controller.open("http://adultfriendfinder.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test254 = function(){
	cyclePrivateBrowsing();
	controller.open("http://travelocity.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test255 = function(){
	cyclePrivateBrowsing();
	controller.open("http://sprint.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test256 = function(){
	cyclePrivateBrowsing();
	controller.open("http://kat.ph");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test257 = function(){
	cyclePrivateBrowsing();
	controller.open("http://qvc.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test258 = function(){
	cyclePrivateBrowsing();
	controller.open("http://livestrong.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test259 = function(){
	cyclePrivateBrowsing();
	controller.open("http://skype.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test260 = function(){
	cyclePrivateBrowsing();
	controller.open("http://buzzfeed.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test261 = function(){
	cyclePrivateBrowsing();
	controller.open("http://walgreens.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test262 = function(){
	cyclePrivateBrowsing();
	controller.open("http://usaa.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test263 = function(){
	cyclePrivateBrowsing();
	controller.open("http://time.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test264 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cbs.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test265 = function(){
	cyclePrivateBrowsing();
	controller.open("http://chicagotribune.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test266 = function(){
	cyclePrivateBrowsing();
	controller.open("http://themeforest.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test267 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cafemom.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test268 = function(){
	cyclePrivateBrowsing();
	controller.open("http://xhamstercams.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test269 = function(){
	cyclePrivateBrowsing();
	controller.open("http://comcast.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test270 = function(){
	cyclePrivateBrowsing();
	controller.open("http://demonoid.me");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test271 = function(){
	cyclePrivateBrowsing();
	controller.open("http://telegraph.co.uk");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test272 = function(){
	cyclePrivateBrowsing();
	controller.open("http://orbitz.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test273 = function(){
	cyclePrivateBrowsing();
	controller.open("http://domaintools.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test274 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nhl.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test275 = function(){
	cyclePrivateBrowsing();
	controller.open("http://theblaze.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test276 = function(){
	cyclePrivateBrowsing();
	controller.open("http://soundcloud.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test277 = function(){
	cyclePrivateBrowsing();
	controller.open("http://abc.go.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test278 = function(){
	cyclePrivateBrowsing();
	controller.open("http://autotrader.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test279 = function(){
	cyclePrivateBrowsing();
	controller.open("http://sourceforge.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test280 = function(){
	cyclePrivateBrowsing();
	controller.open("http://benaughty.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test281 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ksl.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test282 = function(){
	cyclePrivateBrowsing();
	controller.open("http://toysrus.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test283 = function(){
	cyclePrivateBrowsing();
	controller.open("http://worldstarhiphop.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test284 = function(){
	cyclePrivateBrowsing();
	controller.open("http://politico.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test285 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nextag.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test286 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wigetmedia.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test287 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cracked.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test288 = function(){
	cyclePrivateBrowsing();
	controller.open("http://businessweek.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test289 = function(){
	cyclePrivateBrowsing();
	controller.open("http://tagged.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test290 = function(){
	cyclePrivateBrowsing();
	controller.open("http://filestube.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test291 = function(){
	cyclePrivateBrowsing();
	controller.open("http://t-mobile.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test292 = function(){
	cyclePrivateBrowsing();
	controller.open("http://att.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test293 = function(){
	cyclePrivateBrowsing();
	controller.open("http://empowernetwork.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test294 = function(){
	cyclePrivateBrowsing();
	controller.open("http://inbox.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test295 = function(){
	cyclePrivateBrowsing();
	controller.open("http://yieldmanager.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test296 = function(){
	cyclePrivateBrowsing();
	controller.open("http://netteller.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test297 = function(){
	cyclePrivateBrowsing();
	controller.open("http://xvideoslive.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test298 = function(){
	cyclePrivateBrowsing();
	controller.open("http://icontact.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test299 = function(){
	cyclePrivateBrowsing();
	controller.open("http://discovercard.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test300 = function(){
	cyclePrivateBrowsing();
	controller.open("http://aa.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test301 = function(){
	cyclePrivateBrowsing();
	controller.open("http://buy.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test302 = function(){
	cyclePrivateBrowsing();
	controller.open("http://babycenter.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test303 = function(){
	cyclePrivateBrowsing();
	controller.open("http://tigerdirect.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test304 = function(){
	cyclePrivateBrowsing();
	controller.open("http://city-data.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test305 = function(){
	cyclePrivateBrowsing();
	controller.open("http://gizmodo.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test306 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cox.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test307 = function(){
	cyclePrivateBrowsing();
	controller.open("http://spankwire.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test308 = function(){
	cyclePrivateBrowsing();
	controller.open("http://td.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test309 = function(){
	cyclePrivateBrowsing();
	controller.open("http://basecamphq.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test310 = function(){
	cyclePrivateBrowsing();
	controller.open("http://eventbrite.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test311 = function(){
	cyclePrivateBrowsing();
	controller.open("http://zeekrewards.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test312 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ezinearticles.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test313 = function(){
	cyclePrivateBrowsing();
	controller.open("http://realclearpolitics.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test314 = function(){
	cyclePrivateBrowsing();
	controller.open("http://citrixonline.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test315 = function(){
	cyclePrivateBrowsing();
	controller.open("http://newsmax.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test316 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pnc.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test317 = function(){
	cyclePrivateBrowsing();
	controller.open("http://zimbio.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test318 = function(){
	cyclePrivateBrowsing();
	controller.open("http://seomoz.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test319 = function(){
	cyclePrivateBrowsing();
	controller.open("http://thedailybeast.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test320 = function(){
	cyclePrivateBrowsing();
	controller.open("http://rottentomatoes.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test321 = function(){
	cyclePrivateBrowsing();
	controller.open("http://custhelp.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test322 = function(){
	cyclePrivateBrowsing();
	controller.open("http://m-w.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test323 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nbcsports.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test324 = function(){
	cyclePrivateBrowsing();
	controller.open("http://microsoftonline.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test325 = function(){
	cyclePrivateBrowsing();
	controller.open("http://networksolutions.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test326 = function(){
	cyclePrivateBrowsing();
	controller.open("http://tribalfusion.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test327 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hubspot.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test328 = function(){
	cyclePrivateBrowsing();
	controller.open("http://putlocker.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test329 = function(){
	cyclePrivateBrowsing();
	controller.open("http://zazzle.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test330 = function(){
	cyclePrivateBrowsing();
	controller.open("http://biblegateway.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test331 = function(){
	cyclePrivateBrowsing();
	controller.open("http://1and1.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test332 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wired.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test333 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ingdirect.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test334 = function(){
	cyclePrivateBrowsing();
	controller.open("http://tvguide.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test335 = function(){
	cyclePrivateBrowsing();
	controller.open("http://list-manage.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test336 = function(){
	cyclePrivateBrowsing();
	controller.open("http://myfreecams.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test337 = function(){
	cyclePrivateBrowsing();
	controller.open("http://breitbart.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test338 = function(){
	cyclePrivateBrowsing();
	controller.open("http://authorize.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test339 = function(){
	cyclePrivateBrowsing();
	controller.open("http://optimum.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test340 = function(){
	cyclePrivateBrowsing();
	controller.open("http://torrentz.eu");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test341 = function(){
	cyclePrivateBrowsing();
	controller.open("http://weebly.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test342 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ew.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test343 = function(){
	cyclePrivateBrowsing();
	controller.open("http://shutterstock.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test344 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bodybuilding.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test345 = function(){
	cyclePrivateBrowsing();
	controller.open("http://lifehacker.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test346 = function(){
	cyclePrivateBrowsing();
	controller.open("http://citysearch.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test347 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nbc.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test348 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mcssl.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test349 = function(){
	cyclePrivateBrowsing();
	controller.open("http://akamaihd.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test350 = function(){
	cyclePrivateBrowsing();
	controller.open("http://howstuffworks.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test351 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mcssl.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test352 = function(){
	cyclePrivateBrowsing();
	controller.open("http://shutterstock.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test353 = function(){
	cyclePrivateBrowsing();
	controller.open("http://adf.ly");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test354 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hotels.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test355 = function(){
	cyclePrivateBrowsing();
	controller.open("http://usmagazine.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test356 = function(){
	cyclePrivateBrowsing();
	controller.open("http://shoplocal.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test357 = function(){
	cyclePrivateBrowsing();
	controller.open("http://zap2it.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test358 = function(){
	cyclePrivateBrowsing();
	controller.open("http://thechive.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test359 = function(){
	cyclePrivateBrowsing();
	controller.open("http://twitpic.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test360 = function(){
	cyclePrivateBrowsing();
	controller.open("http://zulily.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test361 = function(){
	cyclePrivateBrowsing();
	controller.open("http://webs.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test362 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ikea.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test363 = function(){
	cyclePrivateBrowsing();
	controller.open("http://battle.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test364 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wikihow.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test365 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bhphotovideo.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test366 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bitly.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test367 = function(){
	cyclePrivateBrowsing();
	controller.open("http://noaa.gov");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test368 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nick.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test369 = function(){
	cyclePrivateBrowsing();
	controller.open("http://victoriassecret.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test370 = function(){
	cyclePrivateBrowsing();
	controller.open("http://slideshare.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test371 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bbb.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test372 = function(){
	cyclePrivateBrowsing();
	controller.open("http://marriott.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test373 = function(){
	cyclePrivateBrowsing();
	controller.open("http://4shared.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test374 = function(){
	cyclePrivateBrowsing();
	controller.open("http://slate.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test375 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mtv.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test376 = function(){
	cyclePrivateBrowsing();
	controller.open("http://4shared.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test377 = function(){
	cyclePrivateBrowsing();
	controller.open("http://marriott.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test378 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bhphotovideo.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test379 = function(){
	cyclePrivateBrowsing();
	controller.open("http://linkwithin.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test380 = function(){
	cyclePrivateBrowsing();
	controller.open("http://rivals.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test381 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ed.gov");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test382 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hilton.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test383 = function(){
	cyclePrivateBrowsing();
	controller.open("http://xtube.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test384 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ny.gov");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test385 = function(){
	cyclePrivateBrowsing();
	controller.open("http://imageshack.us");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test386 = function(){
	cyclePrivateBrowsing();
	controller.open("http://gamefaqs.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test387 = function(){
	cyclePrivateBrowsing();
	controller.open("http://charter.net");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test388 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hotwire.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test389 = function(){
	cyclePrivateBrowsing();
	controller.open("http://dailycaller.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test390 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cvs.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test391 = function(){
	cyclePrivateBrowsing();
	controller.open("http://eharmony.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test392 = function(){
	cyclePrivateBrowsing();
	controller.open("http://scout.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test393 = function(){
	cyclePrivateBrowsing();
	controller.open("http://simplyhired.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test394 = function(){
	cyclePrivateBrowsing();
	controller.open("http://logmein.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test395 = function(){
	cyclePrivateBrowsing();
	controller.open("http://chacha.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test396 = function(){
	cyclePrivateBrowsing();
	controller.open("http://modelmayhem.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test397 = function(){
	cyclePrivateBrowsing();
	controller.open("http://merchantcircle.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test398 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mayoclinic.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test399 = function(){
	cyclePrivateBrowsing();
	controller.open("http://engadget.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test400 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cafepress.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test401 = function(){
	cyclePrivateBrowsing();
	controller.open("http://fatwallet.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test402 = function(){
	cyclePrivateBrowsing();
	controller.open("http://seekingalpha.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test403 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mediatakeout.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test404 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bankrate.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test405 = function(){
	cyclePrivateBrowsing();
	controller.open("http://kbb.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test406 = function(){
	cyclePrivateBrowsing();
	controller.open("http://calottery.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test407 = function(){
	cyclePrivateBrowsing();
	controller.open("http://local.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test408 = function(){
	cyclePrivateBrowsing();
	controller.open("http://redbox.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test409 = function(){
	cyclePrivateBrowsing();
	controller.open("http://shutterfly.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test410 = function(){
	cyclePrivateBrowsing();
	controller.open("http://eonline.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test411 = function(){
	cyclePrivateBrowsing();
	controller.open("http://klout.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test412 = function(){
	cyclePrivateBrowsing();
	controller.open("http://myyearbook.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test413 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pcmag.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test414 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wnd.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test415 = function(){
	cyclePrivateBrowsing();
	controller.open("http://break.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test416 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bizrate.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test417 = function(){
	cyclePrivateBrowsing();
	controller.open("http://scottrade.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test418 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hornymatches.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test419 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wimp.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test420 = function(){
	cyclePrivateBrowsing();
	controller.open("http://eversave.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test421 = function(){
	cyclePrivateBrowsing();
	controller.open("http://redfin.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test422 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mint.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test423 = function(){
	cyclePrivateBrowsing();
	controller.open("http://odesk.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test424 = function(){
	cyclePrivateBrowsing();
	controller.open("http://mylife.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test425 = function(){
	cyclePrivateBrowsing();
	controller.open("http://edmunds.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test426 = function(){
	cyclePrivateBrowsing();
	controller.open("http://samsclub.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test427 = function(){
	cyclePrivateBrowsing();
	controller.open("http://qq.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test428 = function(){
	cyclePrivateBrowsing();
	controller.open("http://urbandictionary.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test429 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bedbathandbeyond.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test430 = function(){
	cyclePrivateBrowsing();
	controller.open("http://scribd.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test431 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bigfishgames.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test432 = function(){
	cyclePrivateBrowsing();
	controller.open("http://perezhilton.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test433 = function(){
	cyclePrivateBrowsing();
	controller.open("http://1saleaday.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test434 = function(){
	cyclePrivateBrowsing();
	controller.open("http://elance.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test435 = function(){
	cyclePrivateBrowsing();
	controller.open("http://thepostgame.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test436 = function(){
	cyclePrivateBrowsing();
	controller.open("http://directv.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test437 = function(){
	cyclePrivateBrowsing();
	controller.open("http://1channel.ch");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test438 = function(){
	cyclePrivateBrowsing();
	controller.open("http://suntrust.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test439 = function(){
	cyclePrivateBrowsing();
	controller.open("http://discovery.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test440 = function(){
	cyclePrivateBrowsing();
	controller.open("http://xxxmatch.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test441 = function(){
	cyclePrivateBrowsing();
	controller.open("http://sina.com.cn");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test442 = function(){
	cyclePrivateBrowsing();
	controller.open("http://centurylink.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test443 = function(){
	cyclePrivateBrowsing();
	controller.open("http://compete.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test444 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pcworld.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test445 = function(){
	cyclePrivateBrowsing();
	controller.open("http://getresponse.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test446 = function(){
	cyclePrivateBrowsing();
	controller.open("http://schwab.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test447 = function(){
	cyclePrivateBrowsing();
	controller.open("http://twimg.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test448 = function(){
	cyclePrivateBrowsing();
	controller.open("http://food.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test449 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nationalgeographic.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test450 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cars.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test451 = function(){
	cyclePrivateBrowsing();
	controller.open("http://citi.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test452 = function(){
	cyclePrivateBrowsing();
	controller.open("http://jetblue.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test453 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hardsextube.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test454 = function(){
	cyclePrivateBrowsing();
	controller.open("http://pbskids.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test455 = function(){
	cyclePrivateBrowsing();
	controller.open("http://blackhatworld.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test456 = function(){
	cyclePrivateBrowsing();
	controller.open("http://amazon.co.uk");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test457 = function(){
	cyclePrivateBrowsing();
	controller.open("http://6pm.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test458 = function(){
	cyclePrivateBrowsing();
	controller.open("http://justanswer.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test459 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hsn.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test460 = function(){
	cyclePrivateBrowsing();
	controller.open("http://superpages.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test461 = function(){
	cyclePrivateBrowsing();
	controller.open("http://fool.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test462 = function(){
	cyclePrivateBrowsing();
	controller.open("http://twimg.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test463 = function(){
	cyclePrivateBrowsing();
	controller.open("http://redtubelive.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test464 = function(){
	cyclePrivateBrowsing();
	controller.open("http://drtuber.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test465 = function(){
	cyclePrivateBrowsing();
	controller.open("http://topix.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test466 = function(){
	cyclePrivateBrowsing();
	controller.open("http://timeanddate.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test467 = function(){
	cyclePrivateBrowsing();
	controller.open("http://adam4adam.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test468 = function(){
	cyclePrivateBrowsing();
	controller.open("http://keezmovies.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test469 = function(){
	cyclePrivateBrowsing();
	controller.open("http://egotastic.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test470 = function(){
	cyclePrivateBrowsing();
	controller.open("http://gamestop.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test471 = function(){
	cyclePrivateBrowsing();
	controller.open("http://wix.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test472 = function(){
	cyclePrivateBrowsing();
	controller.open("http://urbanspoon.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test473 = function(){
	cyclePrivateBrowsing();
	controller.open("http://officedepot.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test474 = function(){
	cyclePrivateBrowsing();
	controller.open("http://stubhub.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test475 = function(){
	cyclePrivateBrowsing();
	controller.open("http://myfitnesspal.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test476 = function(){
	cyclePrivateBrowsing();
	controller.open("http://timeanddate.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test477 = function(){
	cyclePrivateBrowsing();
	controller.open("http://github.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test478 = function(){
	cyclePrivateBrowsing();
	controller.open("http://officedepot.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test479 = function(){
	cyclePrivateBrowsing();
	controller.open("http://hsbccreditcard.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test480 = function(){
	cyclePrivateBrowsing();
	controller.open("http://adp.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test481 = function(){
	cyclePrivateBrowsing();
	controller.open("http://evite.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test482 = function(){
	cyclePrivateBrowsing();
	controller.open("http://picnik.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test483 = function(){
	cyclePrivateBrowsing();
	controller.open("http://kmart.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test484 = function(){
	cyclePrivateBrowsing();
	controller.open("http://csmonitor.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test485 = function(){
	cyclePrivateBrowsing();
	controller.open("http://gilt.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test486 = function(){
	cyclePrivateBrowsing();
	controller.open("http://quora.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test487 = function(){
	cyclePrivateBrowsing();
	controller.open("http://website-unavailable.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test488 = function(){
	cyclePrivateBrowsing();
	controller.open("http://bizjournals.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test489 = function(){
	cyclePrivateBrowsing();
	controller.open("http://textsrv.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test490 = function(){
	cyclePrivateBrowsing();
	controller.open("http://e-rewards.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test491 = function(){
	cyclePrivateBrowsing();
	controller.open("http://drugstore.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test492 = function(){
	cyclePrivateBrowsing();
	controller.open("http://state.tx.us");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test493 = function(){
	cyclePrivateBrowsing();
	controller.open("http://opentable.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test494 = function(){
	cyclePrivateBrowsing();
	controller.open("http://xbox.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test495 = function(){
	cyclePrivateBrowsing();
	controller.open("http://ibanking-services.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test496 = function(){
	cyclePrivateBrowsing();
	controller.open("http://4chan.org");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test497 = function(){
	cyclePrivateBrowsing();
	controller.open("http://feedburner.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test498 = function(){
	cyclePrivateBrowsing();
	controller.open("http://nickjr.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var test499 = function(){
	cyclePrivateBrowsing();
	controller.open("http://cam4.com");
	controller.waitForPageLoad(PAGE_LOAD_TIMEOUT);
	controller.sleep(PAGE_WAIT);
}

var teardownModule = function(module) {
	privateBrowsing.stop();
}
