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
        debugger;
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
                for(tp in args[domain].thirdparties) {
                    $('<li>').html(args[domain].thirdparties[tp])
                    // add a click handler too
                    .appendTo(ul);
                }
                $('#cookieMsg').html(cookieMsg);
                $('#trcSubPanel2').empty().append(ul);
            }
            
            




                  
        };
    };

    return {
        showData : showData, 
    };


})();

