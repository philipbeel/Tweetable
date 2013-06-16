Mobilizer - A jQuery plugin for mobile responsive navigation
========================================================

GitHub  : https://github.com/philipbeel/Mobilizer<br/>
Demo    : http://plugins.theodin.co.uk/jquery/mobilizer/demo/index.html<br/>
Website : http://theodin.co.uk<br/>
Email   : contact@theodin.co.uk<br/>
Twitter : [@philipbeel](https://twitter.com/philipbeel)<br/>

### Descrpition
Mobilizer is a responsive navigation jQuery plugin, it uses a combination of CSS3 and Javascript to implement the 'drawer' navigation design pattern. Try out the demo by resizing your demo to less than 600px and watch the navigation.

### Usage
Call in the jQuery framework and jquery.mobilizer.js in your webpage

	<script type="text/javascript" src="jquery.mobilizer.js"></script>

Create the navigation element on your page.

	<nav id="primary-navigation" class="primary-navigation clearfix">
		<ul class="clearfix">
			<li><a href="#">Home</a></li>
			<li><a href="#">About</a></li>
			<li><a href="#">Portfolio</a></li>
			<li><a href="#">Clients</a></li>
			<li><a href="#">Articles</a></li>
			<li><a href="#">Contact</a></li>
		</ul>
	</nav>

Initiate mobilizer on your selected navigation element, pass in the mobilizer responsive width copnstraint.

	$("#primary-navigation").mobilizer({
		width: 600,
		navigationControllerId: "mobile-navigaiton-controller"
	});



### Plugin parameters

	width: {Iteger},            		// Responsive threshold for mobile nav to display
	navigationControllerId: {String}   // The ID for the responsive navigation controller


### Changelog

#### 0.0.1 
* First iteration





