/*
 * tweetable 2.1.1 - jQuery twitter feed plugin
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * With modifications from Philipp Robbel (http://www.robbel.com/) & Patrick DW (stackoverflow)
 *
 * Revision: $Id: jquery.tweetable.js 2013-12-10 $
 *
 */
(function($) {

	jQuery.fn.tweetable = function (opts) {
		opts = $.extend({}, $.fn.tweetable.options, opts);

		return this.each(function () {
		
			var act = jQuery(this);
			var tweetList = jQuery('<ul class="tweetList">')[opts.position.toLowerCase() + 'To'](act);
			var shortMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			var api = "http://api.getmytweets.co.uk/?screenname=";
			var limitcount = "&limit=";
			var callback = "&callback=?";
			var tweetMonth;
			var tweetMonthInt;
			var element;
			var latestTweet;

			// Return a boolean with the value of the tweets
			function hasValidCachedTweets ()
			{
				if(window.localStorage)
				{
					var response = JSON.parse(localStorage.getItem("tweetable_"+opts.username));
					if(!response)
					{
						return false;
					}

					var timestampWhenStored = response && response.timestamp || 0;

					return tweetHasExpired(timestampWhenStored, opts.cacheInMilliseconds);
				}
			};

			function getCachedTweets (cacheTimeInMilliseconds)
			{
				if(window.localStorage)
				{
					var response = JSON.parse(localStorage.getItem("tweetable_"+opts.username));

					return response.value;
				}
			};

			function tweetHasExpired (storedTimeInMilliseconds, expiryTimeInMilliseconds)
			{
				var currentTime = new Date().getTime();
				return ((currentTime - expiryTimeInMilliseconds) <= storedTimeInMilliseconds);
			};

			function destroyTweetInLocalStorage (name)
			{
				localStorage.removeItem(name);
			};

			function storeTweetsInLocalCache (response)
			{
				if(window.localStorage)
				{
					var value = {
						value:response,
						timestamp: new Date().getTime()
					};

					localStorage.setItem("tweetable_"+opts.username, JSON.stringify(value));
				}
			};

			function hideLoadingMessage ()
			{
				jQuery("#tweet_loader").remove();
			};

			function showLoadingMessage ()
			{
				tweetList.append('<p id="tweet_loader">'+ opts.loading +'</p>');
			};

			function displayErrorMessage ()
			{
				tweetList.append('<li class="tweet_content item"><p class="tweet_link">'+ opts.failed +'</p></li>');
			};

			function appendTweetToList (i, tweet)
			{
				tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + tweet.response.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1">@$1 </a>$2').replace(/:">/, ' ">').replace(/: <\/a>/, '</a>:') + '</p></li>');
			};

			function encounteredError (data)
			{
				return data && data.error || null;
			}

			function displayTimeOfTweet (i, tweet)
			{
				var iso8601;
				var n;
				for(n=0; n<=12; n++) {
					if(shortMonths[n] === tweet.tweet_date.substr(4, 3)) {
						tweetMonthInt = n+1;
						tweetMonth = (tweetMonthInt <= 9) ? '0' + tweetMonthInt : tweetMonthInt ;
					}
				}

				// Create ISO 8601 formatted date
				iso8601 = tweet.tweet_date.substr(26,4) + '-' + tweetMonth + '-' + tweet.tweet_date.substr(8, 2) + 'T' + tweet.tweet_date.substr(11,8) + 'Z';

				jQuery('.tweet_link_' + i).append('<p class="timestamp"><'
					+ ((opts.html5) ? 'time datetime="' + iso8601 + '"' : 'small')
					+ '> ' + tweet.tweet_date.substr(8, 2) + '/' + tweetMonth + '/' + tweet.tweet_date.substr(26,4) + ', ' + tweet.tweet_date.substr(11,5) + '</'
					+ ((opts.html5) ? 'time' : 'small') +
					'></p>');
			};

			function displayTweetsOnRotation ()
			{
				var listItem = tweetList.find('li')
				var listLength = listItem.length || null;
				var current = 0;
				var timeout = opts.speed;

				if(!listLength)
				{
					return;
				}

				function rotateTweets()
				{
					listItem.eq(current++).fadeOut(400, function ()
						{
							current = (current === listLength) ? 0 : current;
							listItem.eq(current).fadeIn(400);
						});
				}
				//Hide all but the first tweet
				listItem.slice(1).hide();

				//Rotate tweets at specified interval
				setInterval(rotateTweets, timeout);
			};

			function displayTweets(data)
			{
					if(encounteredError(data))
					{
						displayErrorMessage();
						return;
					}
					else
					{
						storeTweetsInLocalCache(data);
					}

					// Loop through twitter API response
					jQuery.each(data, function (i, tweet)
						{
							if(i >= opts.limit)
							{
								return;
							}

							appendTweetToList(i, tweet);

							if (opts.time === true)
							{
								displayTimeOfTweet(i, tweet);
							}
						});

					if ( opts.rotate === true )
					{
						displayTweetsOnRotation();
					}

					opts.onComplete(tweetList);
			};


			if(hasValidCachedTweets())
			{
				var data = getCachedTweets();
				displayTweets(data);
			}
			else
			{
				showLoadingMessage();

				jQuery.getJSON(api + opts.username + limitcount + opts.limit).done(function (data)
					{
						hideLoadingMessage();
						displayTweets(data.tweets);

					}).fail(function ( jqxhr, textStatus, error )
					{
						hideLoadingMessage();

						displayErrorMessage();
						return;
					});
			}
		});
	};

	// Define plugin defaults
	$.fn.tweetable.options = {
		limit: 5,                       // Number of tweets to show
		username: 'philipbeel',         // @username tweets to display
		time: false,                    // Display date
		rotate: false,                  // Rotate tweets
		speed: 5000,                    // Speed of rotation
		replies: false,                 // Filter out @replys
		position: 'append',             // Append position
		failed: "No tweets available",  // Twitter stream unavailable text
		loading: "Loading tweets...",	// Tweets loading message
		html5: false,                   // HTML5 Support
		retweets: false,                // Show retweets
		cacheInMilliseconds: 3600000,   // The time to cache a tweet in milliseconds
		onComplete: function($ul) {}    // On complete callback
	};

})(jQuery);
jQuery.support.cors = true;