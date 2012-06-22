/*
 * tweetable 1.6.1 - jQuery twitter feed generator plugin
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * With modifications from Philipp Robbel (http://www.robbel.com/) and Patrick DW (stackoverflow)
 * for IE compatibility.
 *
 * Revision: $Id: jquery.tweetable.js 2012-06-22 $ 
 *
 */
(function ($) {
    //define the tweetable plugin
    jQuery.fn.tweetable = function (options) {
        //specify the plugins defauls
        var defaults = {
            limit: 5,                       // Number of tweets to show
            username: 'philipbeel',         // @username tweets to display
            time: false,                    // Display date
			rotate: false,                  // Rotate tweets
			speed: 5000,                    // Speed of rotation
            replies: false,                 // Filter out @replys
            position: 'append',             // Append position
            onComplete: function($ul) {}
        };
        //overwrite the defaults
        var options = jQuery.extend(defaults, options);
        //loop through each instance
        return this.each(function (options) {

            var act = jQuery(this)
            ,   tweetList = jQuery('<ul class="tweetList">')[defaults.position.toLowerCase() + 'To'](act)
            ,   tweetMonth = ''
            ,   shortMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
            ,   api = "http://api.twitter.com/1/statuses/user_timeline.json?suppress_response_codes&screen_name="
            ,   count = "&count="
            ,   ctr
            ,   iterate
            ,   element;

            //do a JSON request to twitters API
            jQuery.getJSON(api + defaults.username + count + defaults.limit + "&callback=?", act, function (data) {
                ctr = 0;
                //loop through twitters response
                jQuery.each(data, function (i, tweet) {
                    //handle @reply filtering if required
                    if (defaults.replies === false && tweet.in_reply_to_status_id !== null)
                        return;
                    
                    i = ctr++;
                    
                    tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + tweet.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2') + '</p></li>');
                    
                    //display the time of tweet if required
                    if (defaults.time == true) {
                        for(iterate=0; iterate<=12; iterate++) {
                            if(shortMonths[iterate] == tweet.created_at.substr(4, 3)) {
                                tweetMonth = iterate + 1;
                                if(tweetMonth < 10) {
                                    tweetMonth = '0' + tweetMonth;
                                }
                            }
                        }
                        jQuery('.tweet_link_' + i).prepend('<p><small> ' + tweet.created_at.substr(8, 2) + '/' + tweetMonth + '/' + tweet.created_at.substr(26,4) + ', ' + tweet.created_at.substr(11,5) + '</small></p>');
                    }
					
                }).success(function() { 

                });
				
				//rotate tweets if required
				if ( defaults.rotate === true ) {
					element = tweetList.find('li'),
					length = element.length,
					current = 0,
					timeout = defaults.speed;	

					function changeTweets() {
					element.eq(current++).fadeOut(300, function(){
						if(current === length){
							current = 0;
						}
						
						element.eq(current).fadeIn(300);
					});		
					setTimeout(changeTweets, timeout);
					}
					element.slice(1).hide();
					setTimeout(changeTweets, timeout);
				}		
                
				defaults.onComplete(tweetList);
				
            });
        });
    }
})(jQuery);