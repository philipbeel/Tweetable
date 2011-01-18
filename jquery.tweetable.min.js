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
(function(a){a.fn.tweetable=function(b){var c={limit:5,username:"philipbeel",time:false,replies:false,position:"append"};var b=a.extend(c,b);return this.each(function(e){var d=a(this);var j;var i="";var f=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var g="http://api.twitter.com/1/statuses/user_timeline.json?screen_name=";var h="&count=";a.getJSON(g+c.username+h+c.limit+"&callback=?",d,function(k){a.each(k,function(m,n){if(m==0){j=a('<ul class="tweetList">')[c.position.toLowerCase()+"To"](d)}if(c.replies===false){if(n.in_reply_to_status_id===null){j.append('<li class="tweet_content_'+m+'"><p class="tweet_link_'+m+'">'+n.text.replace(/#(.*?)(\s|$)/g,'<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,'<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g,'<a href="http://twitter.com/$1">@$1 </a>$2')+"</p></li>")}}else{j.append('<li class="tweet_content_'+m+'"><p class="tweet_link_'+m+'">'+n.text.replace(/#(.*?)(\s|$)/g,'<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,'<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g,'<a href="http://twitter.com/$1">@$1 </a>$2')+"</p></li>")}if(c.time==true){for(var l=0;l<=12;l++){if(f[l]==n.created_at.substr(4,3)){i=l+1;if(i<10){i="0"+i}}}a(".tweet_link_"+m).append("<small> "+n.created_at.substr(8,2)+"/"+i+"/"+n.created_at.substr(26,4)+" "+n.created_at.substr(11,8)+"</small>")}})})})}})(jQuery);
