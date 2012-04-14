if (!TRC) var TRC = {};

TRC.utils = function() {
	
	return {
	
	   addToListener :  function (obj)  {
       var observerService = Components.classes["@mozilla.org/observer-service;1"].
       getService(Components.interfaces.nsIObserverService);
       observerService.addObserver(obj, "http-on-examine-response", false);
       observerService.addObserver(obj, "http-on-modify-request", false);
    },
    
     removeFromListener : function(obj)  {
          var observerService = Components.classes["@mozilla.org/observer-service;1"].
            getService(Components.interfaces.nsIObserverService);
          observerService.removeObserver(obj, "http-on-modify-request");
          observerService.removeObserver(obj, "http-on-examine-response");
      } ,
		
	  _roll: function(min,max) { return Math.floor(Math.random()*(max+0.9))+min; },
		
	  _cout : function (msg){
		  if (!msg || msg.length<1) return;
		  var consoleService = Components.classes["@mozilla.org/consoleservice;1"]
		    .getService(Components.interfaces.nsIConsoleService);
		  consoleService.logStringMessage(" TRC : " + msg);
		},
		
		_inPrivate : function() {
		    try {
           var pbs = Components.classes["@mozilla.org/privatebrowsing;1"]  
                      .getService(Components.interfaces.nsIPrivateBrowsingService);  
           return  pbs.privateBrowsingEnabled; 
        } catch (ex) { return false; }
    },
		
		_getPrefs: function()  {
	      var prefSvc = Components.classes["@mozilla.org/preferences-service;1"]
	          .getService(Components.interfaces.nsIPrefService);
	      var prefs = prefSvc.getBranch("extensions.TRC.");
	      return prefs;
	  },
		
		_getRunningWindow: function() {
    		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].
    							getService(Components.interfaces.nsIWindowMediator);
    		var en = wm.getEnumerator("navigator:browser");
    		 while (en.hasMoreElements()) { 
    	      var win = en.getNext(); 
    	      if (win.TRC.init && win.TRC.init._isInit() ) 
    	      	return win;
    	    }
	    return null		
    },
		
		
	  _arrayIndex : function(arr, elem)
      {
        for (var i in arr)
        {
          if (arr[i] == null)continue;
          if (elem == arr[i] || (arr[i][0] && elem == arr[i][0])) 
            return i;
        }
        return -1;
      },
      
      _getProfileDir: function() {
		return Components.classes["@mozilla.org/file/directory_service;1"]
	                    .getService(Components.interfaces.nsIProperties)
	                    .get("ProfD",Components.interfaces.nsIFile);
	 },
	 
	  _getDomRequest: function(url, istext) {
			var req = new XMLHttpRequest();
			req.open("GET", url , false); 
			//req.overrideMimeType('text/xml');
			req.send(null);
			if ( !istext )
				return req.responseXML;
			else 
				return req.responseText;
	},

	_getDomRequestFromFile : function(file, istext ) {
		istext = typeof(istext) != 'undefined' ? istext : false;
		var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
		var fileHandler = ios.getProtocolHandler("file").QueryInterface(Components.interfaces.nsIFileProtocolHandler);
		var url = fileHandler.getURLSpecFromFile(file);
		return this._getDomRequest(url, istext);
	},
	
    _getFoStream:  function () {
		return   Components.classes["@mozilla.org/network/file-output-stream;1"].
				createInstance(Components.interfaces.nsIFileOutputStream);
	},
	
	_isWindowType: function( typeName ) {
	    var windows =  new Array(); 
	    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
	           .getService(Components.interfaces.nsIWindowMediator)
	    var en = wm.getEnumerator(typeName); 
	    while (en.hasMoreElements()) { 
	      var win = en.getNext(); 
	      if ( window == win) return true
	    }
	    return false;
	},
		    
}
		
}();