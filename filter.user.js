// ==UserScript==
// @name         Devrant Filter
// @namespace    
// @version      0.1
// @description  a filter for devrant comments and rants
// @author       7twin
// @match        
// @match        
// @match        
// @grant        none
// @require      
// ==/UserScript==

$(window).load(function(){
    var filter_arr = [""]; // Add blacklisted (case-sensitive) nicknames here
    var compiled_regex = new RegExp('<div class="rant-username">('+ filter_arr.join("|") +')<\/div>', 'g');

    if(window.location.href == ""){
        // filter rants on frontpage
        $(".rantlist-title").each(function(){
            var rant = $(this);
            $.get("{
                if(compiled_regex.test(data)){
                    rant.closest(".rant-comment-row-widget").remove();
                }
            });
        });
    }else if(window.location.href.indexOf("") > -1){
        // filter comments in rants
        $.map(filter_arr,function(n){
            // remove comments
            $('li[data-username="'+n+'"]').remove();

            // remove all messages mentioning them
            $(".").closest(".reply-row").remove();
        });
    }else if(window.location.href == ""){
        // filter notifications
        setInterval(function(){
            $.map(filter_arr,function(n){
                $(":contains('"+n+"')").closest("li").remove();
            });
        },10);
    }
});
