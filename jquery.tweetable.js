/*
 * tweetable 1.7 - jQuery twitter feed generator plugin
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * With modifications from Philipp Robbel (http://www.robbel.com/) and Patrick DW (stackoverflow)
 * for IE compatibility.
 * 
 * Modifications by Mike Walker (http://incredimike.com) for performance and added functionality:
 *  - Fast string concatination using [array].join('') method
 *  - date links to specific tweet
 *  - added fuzzy date support if jquery.timeago.js plugin is present (http://timeago.yarp.com/)
 * 
 * Revision: $Id: jquery.tweetable.js 2011-04-18 $ 
 *
 */
(function ($) {
    //define the tweetable plugin
    $.fn.tweetable = function (options) {
        //specify the plugins defauls
        var defaults = {
            limit: 5, 					//number of tweets to show
            username: 'philipbeel', 	//@username tweets to display
			retweets: false,			//show retweets
            time: false, 				//display date
            replies: false,				//filter out @replys
            position: 'append'			//append position
        };
        //overwrite the defaults
        var options = $.extend(defaults, options);
		//loop through each instance
        return this.each(function (options) {
			//assign our initial vars
            var act = $(this);
            var $tweetList;
            var api = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=";
            var count = "&count=";
			var rts = "&include_rts=";
            //do a JSON request to twitters API
            $.getJSON(api + defaults.username + count + defaults.limit + rts + defaults.retweets + "&callback=?", act, function (data) {
				//loop through twitters response
                $.each(data, function (i, item) {
					//check for the first loop
                    if (i == 0) {
                    	//create an unordered list to store tweets in
                        $tweetList = $('<ul class="tweetList">')[defaults.position.toLowerCase() + 'To'](act);
                    }
                    //handle @reply filtering if required
                    if (defaults.replies === false) {
                        if (item.in_reply_to_status_id === null) {
                            $tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + item.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2')+'</p></li>');
                        }
                    } else {
                        $tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + item.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') + '</p></li>');
                    }
                    //display the time of tweet, if required
					//using Date() to take advantage of local functions to simplify code and build upon later.
                    if (defaults.time === true) {
						var date = new Date(item.created_at);
						if (jQuery.timeago) { var date_text = jQuery.timeago(date) }
						else { var date_text = [date.getDate(),'/',date.getMonth(),'/',date.getFullYear(),' ',date.toLocaleTimeString()].join(''); }
                    	$('.tweet_link_' + i).append(['<small><a href="http://twitter.com/',item.user.screen_name,'/status/',item.id_str,'">',date_text,'</a></small>'].join('')) // fast concatination is your friend
					}
                });
                //close the unordered list
             });
        });
    }
})(jQuery);
