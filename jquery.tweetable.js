/*
 * tweetable 1.6 - jQuery twitter feed generator plugin
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * With modifications from Philipp Robbel (http://www.robbel.com/) and Patrick DW (stackoverflow)
 * for IE compatibility.
 *
 * Revision: $Id: jquery.tweetable.js 2011-01-06 $
 *
 */
(function ($) {
    //define the tweetable plugin
    $.fn.tweetable = function (options) {
        //specify the plugins defauls
        var defaults = {
            limit: 5,                       //number of tweets to show
            username: 'philipbeel',         //@username tweets to display
            time: false,                    //display date
            replies: false,                 //filter out @replys
            position: 'append',             //append position
            onComplete: function($ul) {}
        };
        //overwrite the defaults
        var options = $.extend(defaults, options);
        //loop through each instance
        return this.each(function (options) {
            //assign our initial vars
            var act = $(this);
            var $tweetList = $('<ul class="tweetList">')[defaults.position.toLowerCase() + 'To'](act);
            var tweetMonth = '';
            var shortMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            var api = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=";
            var count = "&count=";
            //do a JSON request to twitters API
            $.getJSON(api + defaults.username + count + defaults.limit + "&callback=?", act, function (data) {
                var ctr = 0;
                //loop through twitters response
                $.each(data, function (i, tweet) {
                    //handle @reply filtering if required
                    if (defaults.replies === false && tweet.in_reply_to_status_id != null)
                        return;
                    
                    i = ctr++;
                    
                    $tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + tweet.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') + '</p></li>');
                    
                    //display the time of tweet if required
                    if (defaults.time == true) {
                        for(var iterate=0; iterate<=12; iterate++) {
                            if(shortMonths[iterate] == tweet.created_at.substr(4, 3)) {
                                tweetMonth = iterate + 1;
                                if(tweetMonth < 10) {
                                    tweetMonth = '0' + tweetMonth;
                                }
                            }
                        }
                        $('.tweet_link_' + i).prepend('<p><small> ' + tweet.created_at.substr(8, 2) + '/' + tweetMonth + '/' + tweet.created_at.substr(26,4) + ', ' + tweet.created_at.substr(11,5) + '</small></p>');
                    }
                });
                //close the unordered list
                defaults.onComplete($tweetList);
            });
        });
    }
})(jQuery);