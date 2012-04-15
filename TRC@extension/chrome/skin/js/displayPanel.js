/*

We will be sent an object like this:
  { "nytimes.com": {
        "grade": "F",
        "domain": "nytimes.com",
        "score": -0.5126406414924147,
        "thirdparties": [
            "doubleclick.net",
            "felten.com",
            "feedstarvingafricanorphans.org"
        ]
  }};

Which we will put into the dislayPanel.html file
*/

; var displayData = ( function() {

    var init = function() {

    };
    
    var showData = function(args) {
        // no reason to be fancy about it...

        // we should have only one entry
        for( domain in args) {
            
            $('#domainName').html(domain);
            var image = './images/grade_' + args[domain].grade + '.png';
            $('#gradeImg').attr({'src': image});
        
            var cookieMsg;

            if (args[domain].thirdparties.length == 0) {
                cookieMsg = 'Third Party Cookies: N';
            } else {
                cookieMsg = 'Third Party Cookies: Y';

                var ul = $('<ul>').attr({'id' : 'cookieList'});
                for(i in args[domain].thirdparties) {
                    //$('<li>').html(args[domain].thirdparties[tp])
                    //// add a click handler too
                    //.appendTo(ul);
                    
                    var tp = args[domain].thirdparties[i];

                    var li = $('<li>').html(tp.domain)
                    // add a click handler too
                    //.on('click', function(tp) {
                    //    var htmlStr = '<h3>Company: '+tp.company+'</h3><br/>' 
                    //              + 'Domain: '+tp.domain +'<br/>'
                    //              + 'Grade: '+tp.grade+'<br/>';
                    //    $('#trcSubPanel3').empty().html(htmlStr);  
                    //})
                    .appendTo(ul);
                    //addClickHandler(li, tp.company, tp.domain, tp.grade);
                    addClickHandler(li, tp);
                }
                $('#cookieMsg').html(cookieMsg);
                $('#trcSubPanel2').empty().append(ul);
            }
            
        };
    };

    /*
    var addClickHandler = function(container, company, domain, grade){
        $(container).on('click', function() {
                        var htmlStr = '<br/><br/><B>'+company+'</b><br/>' 
                                  + 'Domain: '+domain +'<br/>'
                                  + 'Grade: '+grade+'<br/>';
                        $('#trcSubPanel3').empty().html(htmlStr);  

        });*/
     var addClickHandler = function(container, t){
        $(container).on('click', function() {
                        var usesTrackingCookieOnOptOut = t.usesTrackingCookieOnOptOut ? 'Yes' : 'No';
                        var usesTrackingCookie = t.usesTrackingCookie ?  'Yes' : 'No';
                        var htmlStr = '<br/><br/><B>'+t.company+'</b><br/>' 
                                  + 'Domain: '+t.domain +'<br/>'
                                  + 'Grade: '+t.grade+'<br/>'
                                  + 'Score: '+t.score+'<br/><br/>'
                                  + 'Uses Cookies when opting out?: '
                                  + usesTrackingCookieOnOptOut  +'<br/>'
                                  + 'Uses tracking cookies?: '
                                  + usesTrackingCookie  +'<br/>'
                        ; 
                        $('#trcSubPanel3').empty().html(htmlStr);  

        });
    };

    return {
        showData : showData, 
    };


})();

