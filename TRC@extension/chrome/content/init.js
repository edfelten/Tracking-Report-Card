
                          
if (!TRC) var TRC = {};


TRC.init= function() {
	
	var cc = null;
	var ci = null;
	var i_configfile = null;
	var i_is_init = false;
	
	var _urlBarListener = {
		  QueryInterface: function(aIID) {
			   if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
			       aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
			       aIID.equals(Components.interfaces.nsISupports))
			     return this;
			   throw Components.results.NS_NOINTERFACE;
	  	},
		
	  onLocationChange: function(aProgress, aRequest, aURI) {
	    TRC.core._processNewURL(aURI);
	  },
	
	  onStateChange: function(a, b, c, d) {},
	  onProgressChange: function(a, b, c, d, e, f) {},
	  onStatusChange: function(a, b, c, d) {},
	  onSecurityChange: function(a, b, c) {}
	};



	function _isRunning()	{
	  try {
  		if( !TRC.utils._isWindowType("navigator:browser") )
  			return true;
  	} catch (ex) { /*Probably we're reloading the window*/
  	    return false;
    }
		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].
							getService(Components.interfaces.nsIWindowMediator);
		var en = wm.getEnumerator("navigator:browser");
		 while (en.hasMoreElements()) { 
	      var win = en.getNext(); 
	      if (win.TRC.init && win.TRC.init._isInit() ) 
	      	return true;
	    }
	    return false
    }
    
    function _getRunningWindow() {
    		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].
    							getService(Components.interfaces.nsIWindowMediator);
    		var en = wm.getEnumerator("navigator:browser");
    		 while (en.hasMoreElements()) { 
    	      var win = en.getNext(); 
    	      if (win.TRC.init && win.TRC.init._isInit() ) 
    	      	return win;
    	    }
	    return null;
    }  
    
        
     function  addToListener(obj){
          var observerService = Components.classes["@mozilla.org/observer-service;1"].
            getService(Components.interfaces.nsIObserverService);
          observerService.addObserver(obj, "http-on-modify-request", false);
          observerService.addObserver(obj, "http-on-examine-response", false);
    }
        

    function removeFromListener(obj){
       var observerService = Components.classes["@mozilla.org/observer-service;1"].
          getService(Components.interfaces.nsIObserverService);
       observerService.removeObserver(obj, "http-on-modify-request");
       observerService.removeObserver(obj, "http-on-examine-response");
    }
    
    
    function _removeLoadingEventListener(win_) {        
        win_.removeEventListener("click", TRC.core._processClick, true);
        win_.removeEventListener("unload", TRC.init.unLoad, false);
		gBrowser.removeProgressListener(myExt_urlBarListener);
    } 
	

	

	
	return {

	
      observe: function(oHttp, aTopic, aData)
      { 
       	if (  aTopic =='http-on-examine-response') {
             var httpChannel = oHttp.QueryInterface(Components.interfaces.nsIHttpChannel);
            TRC.core._onIncomingResponse(oHttp);
    	 	}
		if (  aTopic =='http-on-modify-request') {
             var httpChannel = oHttp.QueryInterface(Components.interfaces.nsIHttpChannel);
            TRC.core._onOutgoingRequest(oHttp);
    	}	
					
      }, 
      
	    
	        
    onLoad: function() {     
	    if ( _isRunning() ) 
        return;
      var wins = TRC.init._getWindows();
      for (var i = 0;i < wins.length; i++)
            wins[i].TRC.init._addTRCLoadingEventListener();     
	    i_is_init = true;
	    cc = Components.classes;
	    ci = Components.interfaces;
	    i_configfile = TRC.utils._getProfileDir().clone();
	    i_configfile.append("TRC");
	    if( !i_configfile.exists() || !i_configfile.isDirectory() )    // if it doesn't exist, create
	   		i_configfile.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0777);
  	 	TRC.core._load();

	 },
	 

	  _getWindows: function (){
          try {
            var windows =  new Array(); 
            var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].
    							              getService(Components.interfaces.nsIWindowMediator);
    	     	var en = wm.getEnumerator("navigator:browser");
            while (en.hasMoreElements()){ 
              var win = en.getNext(); 
              if (win)windows.push(win);
            }
            return windows;
          } 
          catch(e){  }
    },
	
		_setAddonBar : function() {
	    var windows = TRC.init._getWindows();
	
	      if (window) windows.push(window); 	
	      for (var i = 0;i < windows.length; i++) {
        	var addonBar = windows[i].document.getElementById("addon-bar");
          if (addonBar) {
              if ( !windows[i].document.getElementById("trc-statusbarpanel")) {
                var addonBarCloseButton = windows[i].document.getElementById("addonbar-closebutton")
                addonBar.insertItem("trc-statusbarpanel");
                setToolbarVisibility(addonBar, true);
              }             
            }
         }           
    },
        
	 
    _addTRCLoadingEventListener : function () {
        window.addEventListener("load", function() {TRC.init.onLoad();}, false);
		gBrowser.addProgressListener(_urlBarListener);
        window.addEventListener("unload", TRC.init.unLoad, false);    
		
		var observerService = Components.classes["@mozilla.org/observer-service;1"]
                                .getService(Components.interfaces.nsIObserverService);
		observerService.addObserver(this, "http-on-modify-request", false);
		//window.addEventListener("click", TRC.core._processClick, true);
    },
        
	 
	 _isInit : function() {
		 return i_is_init;
	 },
	 
	 
	 _getConfigFile : function() {
		 return i_configfile;
	 },
       
      
    
    unLoad : function() {
        if (!i_is_init ) return;
        i_is_init = false;
      	var lastGood = -1;
        var wins = TRC.init._getWindows();
        for (var i = 0;i < wins.length; i++)
            if (wins[i]) {
                  lastGood = i;
            }
        if (lastGood > -1 && wins[lastGood])  {
          wins[lastGood].TRC.init.onLoad();
        }           
    },
	



	 

		}
}();





//window.addEventListener("load", TRC.profiler.onLoad, false);
try {
  TRC.init._addTRCLoadingEventListener();  
} catch (ex) {/* Not good type*/}




  
