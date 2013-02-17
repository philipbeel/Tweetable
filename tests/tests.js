/*
 * Qunit test coverage for Tweetable jQuery plugin
 * covering all core aspects of Tweetable implimentation. 
 *
 */

module("Defaults");
test( "Tweetable plugin parameters", function(){

	ok($.fn.tweetable.options, "options set up correctly");

	ok($.fn.tweetable.options.username, "username is a valid parameter");
	ok(typeof $.fn.tweetable.options.username === "string", "username is a string");

	ok($.fn.tweetable.options.limit, "tweet limit is a valid parameter");
	ok(typeof $.fn.tweetable.options.limit === "number", "tweet limit is a number");

	ok(typeof $.fn.tweetable.options.time === "boolean", "time is a boolean parameter type");
	equal($.fn.tweetable.options.time, false, "time is a valid parameter");

	ok(typeof $.fn.tweetable.options.rotate === "boolean", "rotate is a boolean parameter type");
	equal($.fn.tweetable.options.rotate, false, "rotate parameter is a set to false");

	ok(typeof $.fn.tweetable.options.speed, "speed is a valid parameter");
	ok(typeof $.fn.tweetable.options.speed === "number", "speed is a numeric parameter type");
	equal($.fn.tweetable.options.speed, 5000, "speed value is set by default");

	ok(typeof $.fn.tweetable.options.replies === "boolean", "replies is a boolean parameter type");
	equal($.fn.tweetable.options.replies, false, "replies parameter is set to false");

	ok($.fn.tweetable.options.position, "position is a valid parameter");
	ok(typeof $.fn.tweetable.options.position === "string", "position is a string parameter type");

	ok($.fn.tweetable.options.failed, "failed is a valid parameter");
	ok(typeof $.fn.tweetable.options.failed === "string", "failed is a string parameter type");
	equal($.fn.tweetable.options.failed, "No tweets available", "failed parameter wording is a set correctly");

	ok(typeof $.fn.tweetable.options.html5 === "boolean", "html5 is a boolean parameter type");
	equal($.fn.tweetable.options.html5, false, "html5 parameter is set to false");

	ok(typeof $.fn.tweetable.options.retweets === "boolean", "retweets is a boolean parameter type");
	equal($.fn.tweetable.options.retweets, false, "retweets parameter is set to false");

	ok($.fn.tweetable.options.onComplete, "onComplete is a valid parameter");
	ok(typeof $.fn.tweetable.options.onComplete === "function", "onComplete is a function parameter type");

});

module("Overrides");
test( "Tweetable parameter overrides", function(){

	$.fn.tweetable.options.username = "johndoe";
	equal($.fn.tweetable.options.username, "johndoe", "username override successful");

	$.fn.tweetable.options.limit = 10;
	equal($.fn.tweetable.options.limit, 10, "limit override successful");

	$.fn.tweetable.options.time = true;
	equal($.fn.tweetable.options.time, true, "time override successful");

	$.fn.tweetable.options.rotate = true;
	equal($.fn.tweetable.options.rotate, true, "rotate override successful");

	$.fn.tweetable.options.speed = 1000;
	equal($.fn.tweetable.options.speed, 1000, "speed override successful");

	$.fn.tweetable.options.replies = true;
	equal($.fn.tweetable.options.replies, true, "replies override successful");

	$.fn.tweetable.options.position = "appendTo";
	equal($.fn.tweetable.options.position, "appendTo", "position override successful");

	$.fn.tweetable.options.failed = "foobar";
	equal($.fn.tweetable.options.failed, "foobar", "failed override successful");

	$.fn.tweetable.options.html5 = true;
	equal($.fn.tweetable.options.html5, true, "html5 override successful");

	$.fn.tweetable.options.retweets = true;
	equal($.fn.tweetable.options.retweets, true, "retweets override successful");

	$.fn.tweetable.options.onComplete = function(){
		return "foobar";
	};
	ok($.fn.tweetable.options.onComplete, "onComplete override successful");

});


module("API");
asyncTest("API response values", function() {
	jQuery.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?include_entities=false&suppress_response_codes=true&screen_name=" + $.fn.tweetable.options.username + "&callback=?", function(data){
		start();

		ok(data, "API sent response");
		
		ok(data.length, "response objects present");

		ok(data[0].text, "Tweet text available");

		ok(data[0].created_at, "Timestamp was retunred for tweet");
	});
});

module("Rendering");
test("Tweetable rendered to DOM", function() {
	$('#qunit').tweetable({
		username: 'philipbeel', 
		time: true,
		rotate: false,
		speed: 4000, 
		limit: 5,
		replies: false,
		position: 'append',
		failed: "Sorry, twitter is currently unavailable for this user.",
		html5: true
	});
	stop();
	setTimeout(function() {
		ok( $(".tweetList"), "Tweet list was generated");
		
		ok( $(".tweetList").find('li'), "Tweet list items generated");

		ok( $(".tweet_link_0"), "Tweet list links generated");

		ok( $(".timestamp"), "Timestamps were generated");

		start();
	}, 500 );
});