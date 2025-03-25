( function( $ ) {
	$( document ).ready(function() {
		$('#accordion-menu>ul>li.has-sub>a').after('<span class="holder"></span>');
		$('.holder').on('click', function(){
				//var href = $(this).attr('href');
				//var link_text = $(this).text()
				//$(this).removeAttr('href');
				//alert(href);
				//$(this).children().first().replaceWith('<a href="' + href + '">' + link_text + '</a>');
				var element = $(this).parent('li');
				if (element.hasClass('open')) {
					element.removeClass('open');
					element.find('li').removeClass('open');
					element.find('ul').slideUp();
				}
				else {
					element.addClass('open');
					element.children('ul').slideDown();
					element.siblings('li').children('ul').slideUp();
					element.siblings('li').removeClass('open');
					element.siblings('li').find('li').removeClass('open');
					element.siblings('li').find('ul').slideUp();
				}
			});
	});
} )( jQuery );
