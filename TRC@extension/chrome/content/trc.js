



if (!TRC) var TRC = {};


TRC.core = function() {
	var p_dbug = true;
    var ci = null;
    var cc = null;
    var p_url_array = new Array();
    var bookmarksArray = {bookmarks:[]}
	var tagsArray = {tags:[]}
	var max_f = 1;
	var profileArray = [];
	var oldHost =  null;
	var firstCardArray = [];
	var thirdCardArray = [];
	var gradedDomains = [];
	var grade = 0;
	var profiles = [];
	
	
	
	function _cout(msg) {
    	TRC.utils._cout(msg);
	} 
	
    
	function dumpObject( obj ) {
		var result = ""
		for (i in obj) {
			if( typeof obj[i] === "object") result+= " " + dumpObject(obj[i]);
			else result+= " " + obj[i];
		}
		return result;
		
	}
	
   
   function getCardForFirstParty( host ) {
   		_cout("processing Host " +  host);
   		var cardObj = firstCardArray[host];//filter(function (x) {return x.domain == host});
   		_cout(" test" + cardObj)
		if ( cardObj != null) {
			_cout(cardObj.grade)
			return cardObj;
		}
		return null;
  	 
	
   }
   
    function getCardForThirdParty( host ) {
   		var cardObj = thirdCardArray.filter(function (x) {return x.domain == host});
		if (cardObj != null){
			return cardObj[0];
		}
		return null;
	
   }
   
   function getPageProfile( host ) {
   		if (host == this.oldHost) return;
   		this.oldHost = host;	
		clearGrade();
		
		
		var filteredProfile = profiles.filter(function (x) {return x.name == host});
		if ( filteredProfile.length == 1 ) {
			var card = filteredProfile[0].card;
			displayGrade(filteredProfile[0]);
			return;
		}
		
		
		hostProfile = {};
		hostProfile.name = host;
		hostProfile.score = 0;
		hostProfile.thirdparties = [];
		
		
		var card = getCardForFirstParty(host);
		
		if( card != null) {
			hostProfile.card = card;
			hostProfile.score = card.score;
			displayGrade(hostProfile);
		}
		profiles.push(hostProfile);
   }
   
    function updatePageProfile( thirdparty, host  ) {
		_cout(profiles.length + thirdparty+  host);
		
		var card = getCardForThirdParty(thirdparty);
		if (card == null) return;

		var filteredProfile = profiles.filter(function (x) {return x.name.indexOf(host)>=0});
		if ( filteredProfile.length == 1 ) {			
			if (!filteredProfile[0].thirdparties.some(function(x){
				return x.name == thirdparty
			})) {
				filteredProfile[0].thirdparties.push(card);
				filteredProfile[0].score += card.score;
				if(!filteredProfile[0].grade) filteredProfile[0].card = card
				displayGrade(filteredProfile[0])
			}
		} else {
			
			return;
		}
		

   }
   
   function displayGrade ( hostProfile ) {
   	    var grade = hostProfile.card.grade;
        var statusMsg = "TRC: "+ hostProfile.score ;    
		
        var statusLabel= window.document.getElementById("trc-label");
        if (statusLabel != null && statusLabel.value == "TRC: None") statusLabel.value =  statusMsg; 
		
		var statusIcon= window.document.getElementById("trc-icon");
        if (statusIcon != null) statusIcon.setAttribute('src',"chrome://TRC/skin/trc"+ grade +".png");

    }
	
	function clearGrade  (  ) {
		gradedDomains = [];
        var statusMsg = "TRC: None";   	 
        var statusLabel= window.document.getElementById("trc-label");
        if (statusLabel != null) statusLabel.value =  statusMsg; 
		
		var statusIcon= window.document.getElementById("trc-icon");
        if (statusIcon != null) statusIcon.setAttribute('src',"chrome://TRC/skin/trcC.png");
    }
    
	   
   function promptPageProfile( url ) {
   	
  	
	
   }
   
   function getDomainFromChannel(oHttp) {
        var url = oHttp.originalURI.host;
		var urlArray = url.split('.');
        var urlDomain = urlArray.slice((urlArray.length)-2).join(".");

        return urlDomain;
    }
	
	function computeScore() {
		//Score is sume of score minus sqare root of the number of third parties = corection
		
	}
     
	 
	 function fetchJSON( url ) {
	 	var oReq = new XMLHttpRequest();
	 	  oReq.open("GET", url, false);
		  oReq.send(null);
		  return oReq.responseText;
	 }


	return {
		
		
		_updateCard : function( thirddomain, host) {
			//_cout(thirddomain + " : " + host)
			updatePageProfile(thirddomain, host);
		},
		
        _getWindowFromChannel: function (aChannel) {		
			   var notificationCallbacks =
                aChannel.notificationCallbacks ? aChannel.notificationCallbacks : aChannel.loadGroup.notificationCallbacks;  	 
                if (!notificationCallbacks)
                    return null;
    	 
                var domWin = notificationCallbacks.getInterface(Components.interfaces.nsIDOMWindow);
				return domWin.top;
        },

		
	_onOutgoingRequest: function(oHttp) {          		
            var win_ = this._getWindowFromChannel(oHttp);
            if (win_ != null ) {
                var reqDomain = getDomainFromChannel(oHttp); 
				var hostArray = win_.document.location.host.split('.');     
				var hostname = hostArray.slice((hostArray.length)-2).join(".");
				TRC.core._updateCard(reqDomain,hostname);                               
            }
    
        } ,  

  _processNewURL: function(aURI) {
	    if (aURI.host == this.oldHost)
	      return;
		getPageProfile(aURI.host) ;	
  },


	_processClick: function(e) {
		  var url_ = ""+e.target;
		  try {
		  	if (url_.indexOf("http") == 0) {
				var host_ = url_.split("/")[2];
				getPageProfile(host_) ;	
		  		_cout("Processing click to " + host_);
		  	}
		  	else {
		  		_cout("click on a non url detected");
		  	}
		  } catch (ex) {
		  	_cout(ex);			
		  }		
	},
	
	_loadJSON : function() {
		var firstpartyJSON = fetchJSON('https://raw.github.com/ewfelten/Tracking-Report-Card/master/reportcard/output1p.json');
		var thirdpartyJSON = fetchJSON('https://raw.github.com/ewfelten/Tracking-Report-Card/master/reportcard/output3p.json');
		//var entry = '[{"grade": "F", "domain": "facebook.com", "score": -6, "company": "Facebook", "behavior": {"evil": true}}, {"grade": "F", "domain": "doubleclick.net", "score": 0, "company": "Google", "behavior": {"evil": false}}]'

		firstCardArray= JSON.parse( firstpartyJSON );
		thirdCardArray= JSON.parse( thirdpartyJSON );
	},
	
	
	_load: function() {      
       cc = Components.classes;
       ci = Components.interfaces;
       if ( !TRC.init._isInit() ) TRC.init.onLoad();	   
	   TRC.core._loadJSON();
	   return;
	},		
				
     	
	 _debug : function() {
	   return p_dbug;
     },
	    
    
	}
		
}();

