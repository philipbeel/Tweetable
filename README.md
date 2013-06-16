Tweetable - A jQuery plugin for displaying twitter feeds
========================================================

GitHub  : https://github.com/philipbeel/Tweetable<br/>
Demo    : http://plugins.theodin.co.uk/jquery/tweetable/tweetable.1.7/demo/index.html<br/>
Website : http://theodin.co.uk<br/>
Email   : contact@theodin.co.uk<br/>
Twitter : [@philipbeel](https://twitter.com/philipbeel)<br/>

### Description
Tweetable is a lightweight jQuery plugin that enables you to display your twitter feed on your site quickly and easily. More than just displaying the feeds you can highlight @replys as well as links being dynamically generated for ease of use.

### Usage
Call in the jQuery framework and jquery.tweetable.js in your webpage

	<script type="text/javascript" src="jquery.tweetable.js"></script>

Create an element on your page that you want to call your twitter feed into.

	<div id="tweets"></div>

Initiate tweetable on your selected element, pass in the twitter username.

	$('#tweets').tweetable({username: 'philipbeel'});

### TimeAgo plugin support
Tweetable also supports [timeago](https://github.com/rmm5t/jquery-timeago). for displaying how long ago a tweet was posted. This can be achieved like so:

	$('#tweets').tweetable({
		html5: true,
		onComplete:function($ul){
			$('time').timeago();
		}
	});


### Plugin parameters

	limit: {Iteger},            // Number of tweets to show
	username: {String},     	// @username tweets to display
	time: {Boolean},            // Display date
	retweets: {Boolean},        // Discount retweets false
	replies: {Boolean},         // Filter out @replies if true
	failed: {String}			// Text to display when API returns no results
	rotate: {Boolean}			// Displays only one tweet at a time
	speed: {Iteger}		     	// Speed in milliseconds to display each tweet if rotating
	append: {String}			// Appended position
	HTML5: {Boolean}			// Confirm if HTML5 is supported (timeago support)
	onComplete: {Object}		// Function callback after event triggered

### Changelog

#### 1.7.1
* Changed endpoint to use getmytweets.co.uk

#### 1.7.0 
* Added Qunit test coverage
* Refactored plugin architecture 
* Added override for plugin defaults object

#### 1.6.0
* Added Qunit test coverage
* Added timeago plugin support
* Optimized variable declarations


