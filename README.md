Tweetable - A jQuery plugin for displaying twitter feeds
========================================================

GitHub  : https://github.com/philipbeel/Tweetable
Demo    : http://plugins.theodin.co.uk/jquery/tweetable/tweetable.1.6/index.html
Website : http://theodin.co.uk
Email   : contact@theodin.co.uk
Twitter : @philipbeel

### Descrpition
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

>limit: {Iteger},            // Number of tweets to show <br/>
>username: {String},     	 // @username tweets to display <br/>
>time: {Boolean},            // Display date <br/>
>retweets: {Boolean},        // Discount retweets false<br/>
>replies: {Boolean},         // Filter out @replys if true <br/>
>failed: {String}			 // Text to display when API returns no results <br/>
>rotate: {Boolean}			 // Displays only one tweet at a time <br/>
>speed: {Iteger}		     // Speed in milliseconds to display each tweet if rotating <br/>
>append: {String}			 // Appended position <br/>
>HTML5: {Boolean}			 // Confirm if HTML5 is supported (timeago support) <br/>
>onComplete: {Object}		 // Function callback after event triggered <br/>



