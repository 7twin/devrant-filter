// ==UserScript==
// @name         Devrant Filter
// @namespace    https://devrant.com/
// @version      0.1
// @description  a filter for devrant comments and rants
// @author       7twin
// @match        https://devrant.com/rants/*
// @match        https://devrant.com/feed/
// @match        https://devrant.com/notifs/
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(window).load(function(){
    var filter_arr = [""]; // Add blacklisted (case-sensitive) nicknames here
    var compiled_regex = new RegExp('<div class="rant-username">('+ filter_arr.join("|") +')<\/div>', 'g');

    if(window.location.href == "https://devrant.com/feed/"){
        // filter rants on frontpage
        $(".rantlist-title").each(function(){
            var rant = $(this);
            $.get("https://devrant.com"+$(this).attr("href"),function(data){
                if(compiled_regex.test(data)){
                    rant.closest(".rant-comment-row-widget").remove();
                }
            });
        });
    }else if(window.location.href.indexOf("https://devrant.com/rants/") > -1){
        // filter comments in rants
        $.map(filter_arr,function(n){
            // remove comments
            $('li[data-username="'+n+'"]').remove();

            // remove all messages mentioning them
            $(".rantlist-title:contains('@"+n+"')").closest(".reply-row").remove();
        });
    }else if(window.location.href == "https://devrant.com/notifs/"){
        // filter notifications
        setInterval(function(){
            $.map(filter_arr,function(n){
                $(":contains('"+n+"')").closest("li").remove();
                $("a[href*='"+n+"']").closest("li").remove();
            });
        },10);
    }
});
