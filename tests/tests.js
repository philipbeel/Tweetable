/*
 * Qunit test coverage for Tweetable jQuery plugin
 * covering all core aspects of Tweetables implimentation. 
 *
 */

module("Default plugin defaults");

test( "Tweetable plugin parameters", function(){

	console.log("testing", $.fn.tweetable.options);

	ok($.fn.tweetable.options, "options set up correctly");
	ok($.fn.tweetable.options.username, "username is a valid parameter");
	ok(typeof $.fn.tweetable.options.username === "string", "username is a string");
	equal($.fn.tweetable.options.username, "philipbeel", "username is setup correctly");

});