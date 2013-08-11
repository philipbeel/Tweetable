/*
 * tweetable 2.0 - jQuery twitter feed plugin
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * With modifications from Philipp Robbel (http://www.robbel.com/) & Patrick DW (stackoverflow)
 *
 * Revision: $Id: jquery.tweetable.js 2013-06-16 $ 
 *
 */
(function($){jQuery.fn.tweetable=function(opts){opts=$.extend({},$.fn.tweetable.options,opts);return this.each(function(){var act=jQuery(this),tweetList=jQuery('<ul class="tweetList">')[opts.position.toLowerCase()+"To"](act),shortMonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],api="http://api.getmytweets.co.uk/?screenname=",limitcount="&limit=",callback="&callback=?",twitterError,tweetMonth,tweetMonthInt,iterate,element;tweetList.append('<p id="tweet_loader">'+opts.loading+
"</p>");jQuery.getJSON(api+opts.username+limitcount+opts.limit).done(function(data){jQuery("#tweet_loader").remove();twitterError=data&&data.error||null;if(twitterError){tweetList.append('<li class="tweet_content item"><p class="tweet_link">'+opts.failed+"</p></li>");return}jQuery.each(data.tweets,function(i,tweet){if(i>=opts.limit)return;tweetList.append('<li class="tweet_content_'+i+'"><p class="tweet_link_'+i+'">'+tweet.response.replace(/#(.*?)(\s|$)/g,'<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
'<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g,'<a href="http://twitter.com/$1">@$1 </a>$2').replace(/:">/,' ">').replace(/: <\/a>/,"</a>:")+"</p></li>");if(opts.time===true){for(iterate=0;iterate<=12;iterate++)if(shortMonths[iterate]===tweet.tweet_date.substr(4,3)){tweetMonthInt=iterate+1;tweetMonth=tweetMonthInt<10?"0"+tweetMonthInt:tweetMonthInt}var iso8601=tweet.tweet_date.substr(26,4)+"-"+tweetMonth+"-"+tweet.tweet_date.substr(8,2)+"T"+tweet.tweet_date.substr(11,8)+"Z";jQuery(".tweet_link_"+
i).append('<p class="timestamp"><'+(opts.html5?'time datetime="'+iso8601+'"':"small")+"> "+tweet.tweet_date.substr(8,2)+"/"+tweetMonth+"/"+tweet.tweet_date.substr(26,4)+", "+tweet.tweet_date.substr(11,5)+"</"+(opts.html5?"time":"small")+"></p>")}});if(opts.rotate===true){var listItem=tweetList.find("li"),listLength=listItem.length||null,current=0,timeout=opts.speed;if(!listLength)return;function rotateTweets(){listItem.eq(current++).fadeOut(400,function(){current=current===listLength?0:current;listItem.eq(current).fadeIn(400)})}
listItem.slice(1).hide();setInterval(rotateTweets,timeout)}opts.onComplete(tweetList)}).fail(function(jqxhr,textStatus,error){jQuery("#tweet_loader").remove();tweetList.append('<li class="tweet_content item"><p class="tweet_link">'+opts.failed+"</p></li>");return})})};$.fn.tweetable.options={limit:5,username:"philipbeel",time:false,rotate:false,speed:5E3,replies:false,position:"append",failed:"No tweets available",loading:"Loading tweets...",html5:false,retweets:false,onComplete:function($ul){}}})(jQuery);
jQuery.support.cors=true;