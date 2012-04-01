Tweetable - A jQuery plugin for displaying twitter feeds
========================================================

GitHub  : http://theodin.co.uk/blog/jquery/tweetable-1-6-launched.html
Demo    : http://plugins.theodin.co.uk/jquery/tweetable/tweetable.1.6/index.html

Website : http://theodin.co.uk
Email   : contact@theodin.co.ukk
Twitter : @philipbeel

### Descrpition
Tweetable is a lightweight jQuery plugin which enables you to display your twitter feed on your site quickly and easily. More than just displaying the feeds you can highlight @replys as well as links being dynamically generated for ease of use.

### Usage
Call in the jQuery framework and jquery.tweetable.js in your webpage

> <script type="text/javascript" src="jquery.tweetable.js"></script>

Create an element on your page that you want to call your twitter feed into.

> <div id="tweets"></div>

Initiate tweetable on your selected element, pass in the twitter username.

> $('#tweets').tweetable({username: 'philipbeel'});

### Plugin parameters

> limit: 5,                         //number of tweets to show
> username: 'philipbeel',     //@username tweets to display
> time: false,                     //display date
> replies: false,                //filter out @replys



