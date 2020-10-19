/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init App
5. Init SVG
6. Init Services Slider
7. Init Pricing Slider
8. Init Gallery
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
	initServicesSlider();
	initPricingSlider();
	initGallery();
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

	6. Init Services Slider

	*/

	function initServicesSlider()
	{
		if($('.services_slider').length)
		{
			var servicesSlider = $('.services_slider');
			servicesSlider.owlCarousel(
			{
				items:3,
				loop:true,
				autoplay:true,
				dots:false,
				nav:false,
				smartSpeed:1200,
				margin:35,
				responsive:
				{
					0:{items:1},
					992:{items:2},
					1441:{items:3}
				}
			});
		}
	}

	/* 

	7. Init Pricing Slider

	*/

	function initPricingSlider()
	{
		if($('.pricing_slider').length)
		{
			var pricingSlider = $('.pricing_slider');
			pricingSlider.owlCarousel(
			{
				items:3,
				loop:true,
				autoplay:true,
				dots:false,
				nav:false,
				smartSpeed:1200,
				margin:49,
				responsive:
				{
					0:{items:1, margin:30},
					768:{items:2, margin:30},
					1200:{items:3, margin:49}
				}
			});
		}
	}

	/* 

	8. Init Gallery

	*/

	function initGallery()
	{
		if($('.gallery_slider').length)
		{
			var gallerySlider = $('.gallery_slider');
			gallerySlider.owlCarousel(
			{
				items:5,
				autoplay:true,
				loop:true,
				nav:false,
				dots:false,
				smartSpeed:1200,
				responsive:
				{
					0:
					{
						items:1
					},
					576:
					{
						items:2
					},
					860:
					{
						items:3
					},
					1240:
					{
						items:4
					},
					1600:
					{
						items:5
					}
				}
			});
		}

		if($('.gallery_item').length)
		{
			$('.colorbox').colorbox(
			{
				rel:'colorbox',
				photo: true,
				maxWidth:'95%',
				maxHeight:'95%'
			});
		}

		$(window).on('resize', function()
		{
			gallerySlider.trigger('refresh.owl.carousel');
		});
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