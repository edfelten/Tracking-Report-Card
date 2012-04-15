



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
	var firstCardArray = {};
	var thirdCardArray = [];
	var gradedDomains = [];
	var grade = 0;
	var profiles = [];
	var computeParam = {};
	
	
	
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
	
   
   function getCardForFirstParty( host_ ) {

   		var cardObj = firstCardArray[host_];//filter(function (x) {return x.domain == host});
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
   
   function getPageCard( domain) {
   		var filteredProfile = profiles.filter(function (x) {return x.domain == domain});
		if (filteredProfile.length == 1) return filteredProfile[0];
		
		return null;	
   }
   
   function getPageProfile( host ) {
   	 	if (host == this.oldHost) return null;
   		this.oldHost = host;	
		clearGrade();
	
		var domainArray = host.split(".");
		var domain = domainArray.slice((domainArray.length)-2).join(".");  
		var filteredProfile = profiles.filter(function (x) {return x.domain == domain});
		if ( filteredProfile.length == 1 ) {
			var card = filteredProfile[0];
			displayGrade(filteredProfile[0]);
			return filteredProfile[0];
		}
	
  
		

		
		
		hostProfile = {};
		hostProfile.domain = domain;
		hostProfile.score = 0;
		hostProfile.grade = "C";
		hostProfile.thirdparties = [];
		
		
		var card = getCardForFirstParty(domain);
		
		if( card != null) {
			hostProfile= card;
			displayGrade(hostProfile);
		}
		profiles.push(hostProfile);
		
		return hostProfile;
   }
   
    function updatePageProfile( thirdparty, host  ) {
		var firstPartyCard = getCardForFirstParty(host);
		
		var card = getCardForThirdParty(thirdparty);
		if (card == null) return;

		var filteredProfile = profiles.filter(function (x) {return x.domain.indexOf(host)>=0});
		if ( filteredProfile.length == 1 ) {			
			if (!filteredProfile[0].thirdparties.some(function(x){
				return x.domain == thirdparty
			})) {
				filteredProfile[0].thirdparties.push(card);
				if (!filteredProfile[0]) {
					filteredProfile[0] = {};	
				}
				if (!firstPartyCard) {
					filteredProfile[0].score = 0
					filteredProfile[0].thirdparties.forEach(function(x){
						filteredProfile[0].score += x.score
					})
					var correctedScore = (filteredProfile[0].score/filteredProfile[0].thirdparties.length) - Math.sqrt(filteredProfile[0].thirdparties.length) +  computeParam.correction; 
					var gradeArray = computeParam.grading.filter(function(x) { return( x[0]<correctedScore)});
					
					filteredProfile[0].score = correctedScore;
					filteredProfile[0].grade = (gradeArray.length==0) ? "F" : gradeArray[0][1];
					displayGrade(filteredProfile[0])
				}
			}
		} else {
			
			return;
		}	

   }
   
   function displayGrade ( hostProfile ) {
   	    var grade = hostProfile.grade;
        var statusMsg = "TRC: "+ hostProfile.score ;    
		
        var statusLabel= window.document.getElementById("trc-label");
        if (statusLabel != null && statusLabel.value == "TRC: None") statusLabel.value =  statusMsg; 
		
		var statusIcon= window.document.getElementById("trc-icon");
        if (statusIcon != null) statusIcon.setAttribute('src',"chrome://TRC/skin/trc"+ grade +".png");
		
		TRC.core._refreshFrame();

    }
	
	function clearGrade  (  ) {
		gradedDomains = [];
        var statusMsg = "TRC: None";   	 
        var statusLabel= window.document.getElementById("trc-label");
        if (statusLabel != null) statusLabel.value =  statusMsg; 
		
		var statusIcon= window.document.getElementById("trc-icon");
        if (statusIcon != null) statusIcon.setAttribute('src',"chrome://TRC/skin/images/trcC.png");
    }
    
	   

   
   function getDomainFromChannel(oHttp) {
        var url = oHttp.originalURI.host;
		var urlArray = url.split('.');
        var urlDomain = urlArray.slice((urlArray.length)-2).join(".");

        return urlDomain;
    }
	

     
	 
	 function fetchJSON( url ) {
	 	var oReq = new XMLHttpRequest();
	 	  oReq.open("GET", url, false);
		  oReq.send(null);
		  return oReq.responseText;
	 }


	return {
		
		_refreshFrame : function () {
			var win_ = TRC.utils._getRunningWindow();
			var trc_frame =  window.document.getElementById("trc-frame");
			if (!trc_frame) return;

			var host = window.content.document.location.host;
			var domainArray = host.split(".");
			var domain = domainArray.slice((domainArray.length)-2).join(".");  
			var profile = getCardForFirstParty(domain);
			var fullCard = getPageCard(domain);	
			if (profile != null) {								
				if (fullCard) profile.thirdparties = fullCard.thirdparties;
			} else {
				if (fullCard) profile = fullCard;
			}
			var card = {};
			card[domain] = profile;
			var strJson = JSON.stringify(card);
			trc_frame.setAttribute("src","chrome://TRC/skin/displayPanel.html?json="+strJson);			
		},
		
		_loadFrame : function () {
			var win_ = TRC.utils._getRunningWindow();
			var trc_frame =  window.document.getElementById("trc-frame");
			if (!trc_frame) {
				trc_frame = document.createElement("iframe"); // iframe or browser
		        trc_frame.setAttribute("id", "trc-frame");
		        trc_frame.setAttribute("name", "sample-frame");
		        trc_frame.setAttribute("type", "content");	
				trc_frame.setAttribute("collapsed",false);
				trc_frame.setAttribute("resizable",true);
				trc_frame.setAttribute("scrollable",true);
				trc_frame.setAttribute("height","200px");
				var host = window.content.document.location.host;
				var domainArray = host.split(".");
				var domain = domainArray.slice((domainArray.length)-2).join(".");  
				var profile = getCardForFirstParty(domain);
				var fullCard = getPageCard(domain);
				if (profile != null) {		
					if (fullCard) profile.thirdparties = fullCard.thirdparties;
				} else {
					if (fullCard) profile = fullCard;
				}
				var card = {};
				card[domain] = profile;			
				var strJson = JSON.stringify(card);
				trc_frame.setAttribute("src","chrome://TRC/skin/displayPanel.html?json="+strJson);	
				document.getElementById("main-window").appendChild(trc_frame);	
				
			/*	trc_frame.setAttribute("json",strJson);	
				var element = document.createElement("frame-parameter");
				element.setAttribute("json", strJson);
				trc_frame.appendChild(element);
				
				var evt = document.createEvent("Events");
				evt.initEvent("TRCEvent", true, false);
				element.dispatchEvent(evt);*/
				
			} 	else {
				document.getElementById("main-window").removeChild(trc_frame)
			
			}
		
		},
		
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
		
		

		//_cout(firstCardArray.length)
		var computeJSON = fetchJSON('https://raw.github.com/ewfelten/Tracking-Report-Card/master/reportcard/gradingPolicy.json');
		computeParam = JSON.parse(computeJSON);
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

