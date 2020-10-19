/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init App
5. Init Scrolling
6. Init Article Slider
7. Init Single Article Slider
8. Init Parallax


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
	initScrolling();
	initArticleSlider();
	initSingleSlider();
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

	5. Init Scrolling

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

	6. Init Services Slider

	*/

	function initArticleSlider()
	{
		if($('.article_slider').length)
		{
			var articleSlider = $('.article_slider');
			articleSlider.owlCarousel(
			{
				items:3,
				loop:true,
				autoplay:true,
				dots:false,
				nav:false,
				smartSpeed:1200,
				margin:30,
				responsive:
				{
					0:{items:1},
					768:{items:2},
					1200:{items:3}
				}
			});
		}
	}

	/* 

	7. Init Popular Posts Slider

	*/

	function initSingleSlider()
	{
		if($('.single_slider').length)
		{
			var singleSlider = $('.single_slider');
			singleSlider.owlCarousel(
			{
				items:1,
				loop:true,
				autoplay:true,
				autoplayTimeout:8000,
				autoplayHoverPause:true,
				nav:false,
				dots:false,
				smartSpeed:1200
			});
		}
	}

	/* 

	8. Init Parallax

	*/

	function initParallax()
	{
		if($('.parallax_background').length)
		{
			$('.parallax_background').parallax({});
		}
	}

});