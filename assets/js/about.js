/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init App
5. Init SVG
6. Init Scrolling
7. Init Milestones Slider
8. Init Milestones
9. Init Parallax


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var ctrl = new ScrollMagic.Controller();

	initMenu();
	initApp();
	initSvg();
	initScrolling();
	initMilestonesSlider();
	initMilestones();
	initParallax();

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			var hamburger = $('.hamburger');

			hamburger.on('click', function()
			{
				closeApp();
				menu.toggleClass('active');
				hamburger.toggleClass('active');
			});
		}
	}

	/* 

	4. Init App

	*/

	function initApp()
	{
		if($('.app').length)
		{
			var btn = $('.app_button');
			var close = $('.app_button_close');
			btn.on('click', function()
			{
				if(!$('.menu').hasClass('active'))
				{
					openApp();
				}
			});

			close.on('click', function()
			{
				closeApp();
			});
		}
	}

	function openApp()
	{
		var app = $('.app');
		var content = $('.app_content');
		app.addClass('active');
		content.addClass('active');
	}

	function closeApp(app, content)
	{
		var app = $('.app');
		var content = $('.app_content');
		app.removeClass('active');
		content.removeClass('active');
	}

	/* 

	5. Init SVG

	*/

	function initSvg()
	{
		if($('img.svg').length)
		{
			jQuery('img.svg').each(function()
			{
				var $img = jQuery(this);
				var imgID = $img.attr('id');
				var imgClass = $img.attr('class');
				var imgURL = $img.attr('src');

				jQuery.get(imgURL, function(data)
				{
					// Get the SVG tag, ignore the rest
					var $svg = jQuery(data).find('svg');

					// Add replaced image's ID to the new SVG
					if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
					}
					// Add replaced image's classes to the new SVG
					if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
					}

					// Remove any invalid XML tags as per http://validator.w3.org
					$svg = $svg.removeAttr('xmlns:a');

					// Replace image with new SVG
					$img.replaceWith($svg);
				}, 'xml');
			});
		}	
	}

	/* 

	6. Init Scrolling

	*/

	function initScrolling()
	{
		if($('.scroll_to').length)
		{
			var links = $('.scroll_to');
	    	links.each(function()
	    	{
	    		var ele = $(this);
	    		var target = ele.data('scroll-to');
	    		ele.on('click', function(e)
	    		{
	    			e.preventDefault();
	    			$(window).scrollTo(target, 1500, {offset: -75, easing: 'easeInOutQuart'});
	    		});
	    	});
		}	
	}

	/* 

	7. Init Milestones Slider

	*/

	function initMilestonesSlider()
	{
		if($('.milestones_slider').length)
		{
			var milestonesSlider = $('.milestones_slider');
			var slideBar = $('.slide_bar > div');
			var slideNum = $('.slide_num');

			var itemCount = $('.owl-item').length;
			var currentItem = 1;

			milestonesSlider.on('initialized.owl.carousel', function(event)
			{
				slideBar.css({width: "100%", transition: "width 8000ms"});
			});

			milestonesSlider.owlCarousel(
			{
				items:4,
				loop:true,
				autoplay:true,
				autoplayTimeout:8000,
				dots:false,
				nav:false,
				slideBy:1,
				smartSpeed:400,
				margin:30,
				responsive:
				{
					0:
					{
						items:1,
						margin:0,
						mouseDrag:true
					},
					768:
					{
						items:2,
						margin:30,
						mouseDrag:false
					},
					992:
					{
						items:3,
						margin:30,
						mouseDrag:false
					},
					1200:
					{
						items:4,
						margin:30,
						mouseDrag:false
					}
				}
			});

			milestonesSlider.on('translate.owl.carousel', function(event)
			{
				slideBar.css({width: "0%", transition: "width 0s"});
			});

			milestonesSlider.on('translated.owl.carousel', function(event)
			{
				//subtract smartSpeed value from the autoplayTimeout value
				slideBar.css({width: "100%", transition: "width 7600ms"});
				currentItem++;
				if((currentItem - 1) === itemCount)
				{
					currentItem = 1;
				}
				currentItem = currentItem.toString();
				if(currentItem.length === 1)
				{
					currentItem = "0" + currentItem + ".";
				}
				else
				{
					currentItem = currentItem + ".";
				}
				slideNum.text(currentItem);
			});
		}
	}

	/* 

	8. Init Milestones

	*/

	function initMilestones()
	{
		if($('.milestone_counter').length)
		{
			var milestoneItems = $('.milestone_counter');

	    	milestoneItems.each(function(i)
	    	{
	    		var ele = $(this);
	    		var endValue = ele.data('end-value');
	    		var eleValue = ele.text();

	    		/* Use data-sign-before and data-sign-after to add signs
	    		infront or behind the counter number */
	    		var signBefore = "";
	    		var signAfter = "";

	    		if(ele.attr('data-sign-before'))
	    		{
	    			signBefore = ele.attr('data-sign-before');
	    		}

	    		if(ele.attr('data-sign-after'))
	    		{
	    			signAfter = ele.attr('data-sign-after');
	    		}

	    		var milestoneScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var counter = {value:eleValue};
		    		var counterTween = TweenMax.to(counter, 4,
		    		{
		    			value: endValue,
		    			roundProps:"value", 
						ease: Circ.easeOut, 
						onUpdate:function()
						{
							document.getElementsByClassName('milestone_counter')[i].innerHTML = signBefore + counter.value + signAfter;
						}
		    		});
		    	})
			    .addTo(ctrl);
	    	});
		}
	}

	/* 

	9. Init Parallax

	*/

	function initParallax()
	{
		if($('.parallax_background').length)
		{
			$('.parallax_background').parallax(
			{
				speed:0.8
			});
		}
	}

});