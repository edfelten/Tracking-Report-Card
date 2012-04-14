



if (!TRC) var TRC = {};


TRC.core = function() {
	var p_dbug = true;
    var ci = null;
    var cc = null;
    var tsvc = null;
    var hsvc = null;
    var p_categories = null;
    var p_profiling_url = null;
    var p_profile_searches = true; 
    var p_start_time = 0;
    var p_openedURL = "";
    var p_url_array = new Array();
    var bookmarksArray = {bookmarks:[]}
	var tagsArray = {tags:[]}
	var max_f = 1;
	var profileArray = [];
	
	
	
	function _cout(msg) {
    	TRC.utils._cout(msg);
	} 
	
	
	  function	resetTree (id,_window) {
		var tree = _window.document.getElementById(id);
	  	var removeList = _window.document.getElementsByTagName("treechildren");
	  	while(  removeList.length!= 0) {
	  		removeList = _window.document.getElementsByTagName("treechildren"); 	
	  		for (var i=0; i< removeList.length; i++)
				  tree.removeChild(removeList[i]);
		} 
	} 


	
	  function treeLoad (treeName,_window,type) {
	  	var win =  getRunningWindow();
	  	var tree = _window.document.getElementById(treeName);
	  	if ( !tree ) {
        cout('Can not find tree');
        return;
       }
      resetTree(treeName,_window);
	  	var root = _window.document.createElement("treechildren");
	  	createCellElement(root, rss_obj, 0, _window,  true,type );
  		tree.appendChild(root);
	}
	
	function openAProfileFile () {
		// get profile directory  
		var file = TRC.utils._getProfileDir();
		file.append("TRC");
		
		
		profileArray = [];
		var entries = file.directoryEntries;  
		while(entries.hasMoreElements()) {  
		  var entry = entries.getNext();  
		  entry.QueryInterface(Components.interfaces.nsIFile);  
		  if (entry.isFile() && entry.leafName.indexOf("TRC_user")==0)  
		  	profileArray.push(entry);  
		}  
		window.openDialog("chrome://TRC/content/select_profile.xul", "Test", "chrome, dialog, resizable=yes");	
	}
    
	
	function dumpObject( obj ) {
		var result = ""
		for (i in obj) {
			if( typeof obj[i] === "object") result+= " " + dumpObject(obj[i]);
			else result+= " " + obj[i];
		}
		return result;
		
	}
	
	function updateTagInArray( tag ) {
		for  ( var i in tagsArray.tags) {
			if ( tagsArray.tags[i].id == tag.id ) {
				tagsArray.tags[i].value++;
				max_f = Math.max(max_f,tagsArray.tags[i].value);
				return;
			}			
		}
		tag.value = 1;
		tagsArray.tags.push(tag);
		return;	
	}
	
	
	function updateBookmarkInArray( bookmark ) {
		_cout(bookmark.length)
		
		var url = bookmark.shift();
		var keywords = bookmark.map(stemmer);
		var tags = keywords.map(function (x) {return {name: x, id:TRC.delicious._getTagIndex(x)} }).filter(function(x) {return (x.id!=-1)});
		tags.forEach(function(x) { _cout( dumpObject(x) ) } );
		tags.forEach(updateTagInArray);
			  _cout(bookmarksArray.bookmarks.length); 
		for ( var i in bookmarksArray.bookmarks) {
			if (bookmarksArray.bookmarks[i].url == url) {
				bookmarksArray.bookmarks[i].tags = bookmarksArray.bookmarks[i].tags.concat(tags);
				return;
			}		
		}		
		
		var entry = {};
		entry.url = url;
		entry.tags = tags.map(function(x){
			return {
				name: x.name,
				id: x.id
			}
		});
		
		bookmarksArray.bookmarks.push(entry);
	}


	function exportTags(profile_name) {
		//First we normalize the tags
		tagsArray.tags.forEach(function(x) {x.value = (x.value/max_f)});
		
		var str = JSON.stringify(tagsArray);
		
		
		var file = TRC.init._getConfigFile().clone();
  		var filename = profile_name.replace(".txt",".tags.json").replace("TRC_","");
  		file.append(filename);
		foStream = TRC.utils._getFoStream();
  		foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);	
  		foStream.write(str, str.length,'','iso-8859-1');
  		foStream.close();	
		
	}


	function exportBookmarks(profile_name) {
		var str = JSON.stringify(bookmarksArray);
		
		var file = TRC.init._getConfigFile().clone();
		var filename = profile_name.replace(".txt",".bookmarks.json").replace("TRC_","");
  		file.append(filename);
		foStream = TRC.utils._getFoStream();
  		foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);	
  		foStream.write(str, str.length,'','iso-8859-1');
  		foStream.close();	
		
	}


   function _saveProfile() {
     	var file = TRC.init._getConfigFile().clone();
  		file.append("Profile.xml");
  		foStream = TRC.utils._getFoStream();
  		foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);	
  	 	var xmlString = new XMLSerializer().serializeToString(p_docLog);
  		foStream.write(xmlString, xmlString.length,'','iso-8859-1');
  		foStream.close();	
   }
   
   function getPageProfile( url ) {
   	
   	
	
   }
     
	 
   
   function promptPageProfile( url ) {
   	
   	
	
   }
     


	return {
		
	_getProfiles: function() {
		return profileArray;		
	},
	
    _clickedURL: function( profile_name ) {
		var file = TRC.utils._getProfileDir();
		file.append("TRC");
		file.append(profile_name);
		
		var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].  
              createInstance(Components.interfaces.nsIFileInputStream);  
		istream.init(file, 0x01, 0444, 0);  
		istream.QueryInterface(Components.interfaces.nsILineInputStream);  
  		max_f = 1;
		// read lines into array  
		var line = {}, lines = [], hasmore;  
		do {  
		  hasmore = istream.readLine(line);  
		  var entry = line.value.split(/\t/);
		  var entry_url = entry[0];
		  var entry_tags = entry[1].split(",");
		  entry_tags.unshift(entry_url) ;
		  updateBookmarkInArray(entry_tags);
		  _cout(entry)  
		} while(hasmore);  
		  
		istream.close()	;
		
		bookmarksArray.bookmarks.forEach(function(x){ return _cout(dumpObject(x))})
		
		
		exportBookmarks(profile_name);
		exportTags(profile_name);	
	},
	
	_processProfile: function( profile_name ) {
		var file = TRC.utils._getProfileDir();
		file.append("TRC");
		file.append(profile_name);
		
		var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].  
              createInstance(Components.interfaces.nsIFileInputStream);  
		istream.init(file, 0x01, 0444, 0);  
		istream.QueryInterface(Components.interfaces.nsILineInputStream);  
  		max_f = 1;
		// read lines into array  
		var line = {}, lines = [], hasmore;  
		do {  
		  hasmore = istream.readLine(line);  
		  var entry = line.value.split(/\t/);
		  var entry_url = entry[0];
		  var entry_tags = entry[1].split(",");
		  entry_tags.unshift(entry_url) ;
		  updateBookmarkInArray(entry_tags);
		  _cout(entry)  
		} while(hasmore);  
		  
		istream.close()	;
		
		bookmarksArray.bookmarks.forEach(function(x){ return _cout(dumpObject(x))})
		
		
		exportBookmarks(profile_name);
		exportTags(profile_name);	
	},
	
	_onSelectProfileClick: function () {
		var win_ = window.TRC.utils._getRunningWindow();
		profileArray = win_.TRC.demo._getProfiles() ;
		var items = window.document.getElementById('profile-popup').children;
		

		
		for (var i=0; i< items.length; i++ ) {
			var item = items[i];
			if( item.getAttribute("selected") ){
				win_.TRC.demo._processProfile(item.getAttribute("label") )
			}						
		}	
		window.close();	
		return;
	},
	
	_onSelectProfileLoad: function () {
		var win_ = window.TRC.utils._getRunningWindow();
		profileArray = win_.TRC.demo._getProfiles() ;
		var popup = window.document.getElementById('profile-popup');
		

		for (var i=0; i< profileArray.length; i++ ) {
			var item = document.createElement("menuitem");
			item.setAttribute("label",profileArray[i].leafName);
			item.setAttribute("id",profileArray[i].leafName);
			//item.addEventListener("onselect",window.close(),false);
			popup.appendChild(item);
		}		
		return;
	},
	
	_openAProfile : function() {
		openAProfileFile();	
	},
	
	_loadAProfile: function() {
		var win_ = window.TRC.utils._getRunningWindow();
		win_.TRC.demo._openAProfile();	
	},
	
	
	_processClick: function(e) {
		  var url = e.currentTarget.contentDocument.location.href;
		  alert(url);		
	},
	
	
	_load: function() {      
       cc = Components.classes;
       ci = Components.interfaces;
       if ( !TRC.init._isInit() ) TRC.init.onLoad();
	   
	  
	   

	  	   
	  /* var testEntry1 = ["http://www.test.fr","test","blog","writting"];
	   var testEntry2 = ["http://www.test2.fr","soccer","sports","automotion","description"];
	   var testEntry3 = ["http://www.test3.com","soccer","sports","tennis","volleyball"];


		updateBookmarkInArray(testEntry1);
	   	updateBookmarkInArray(testEntry2);
	    updateBookmarkInArray(testEntry3);*/
		

		return;
/*
       prefs = TRC.utils._getPrefs();
       p_docLog = TRC.profiler._getDocLog();
       p_profile_searches = prefs.getBoolPref("profilesearches");
       tsvc = cc["@mozilla.org/browser/tagging-service;1"]
                           .getService(ci.nsITaggingService);
       hsvc = cc["@mozilla.org/browser/nav-history-service;1"]
			                               .getService(ci.nsINavHistoryService) ;
	   _initIFrame();           
*/              
	},		
				

        	/******************************************************************************************************************
		** _computeProfileFromHistory
        ** Compute a profile from the 10 most frequent url in user's hitory
		** days : the number of day we are considering
		******************************************************************************************************************/
    
    
     _computeProfileFromHistory : function( days ) {    
	    if ( !days ) days = 30;
	    

		var options = hsvc.getNewQueryOptions();
		options.sortingMode = hsvc.SORT_BY_VISITCOUNT_DESCENDING
		options.maxResults = 30
			
		var query = hsvc.getNewQuery();
		query.beginTimeReference = query.TIME_RELATIVE_NOW;
		query.beginTime = - days * 24 * 60 * 60 * 1000000; // 24 hours ago in microseconds
		query.endTimeReference = query.TIME_RELATIVE_NOW;
		query.endTime = 0; // now

		var result = hsvc.executeQueries( [query], 1, options);
		var cont = result.root;
		cont.containerOpen = true;
		for (var i = 0; i < cont.childCount; i ++) {
  			var node = cont.getChild(i);
	  		var url = 'http://' + node.uri.split('/')[2]
	  		p_url_array.push(url.slice())
 			setTimeout(function (){
	 			var frame = document.getElementById("TRC-frame");
	  		frame.contentDocument.location.href = p_url_array.pop();
	  		if( p_url_array.length == 0) alert(" TRC profile is generateded")
  			}, 1000 * i);
		}

	},
	
     
     	

	 _debug : function() {
	   return p_dbug;
     },
	    
    
	}
		
}();

