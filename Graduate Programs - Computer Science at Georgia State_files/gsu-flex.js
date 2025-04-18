(function ($) {

  $(document).ready(function () {


		//handle touch events for menu hovering on tablet portrait
		$( document ).on( 'touchstart', function( e ) {
			var link = $( e.target ); //preselect the link
			if ( $( e.target ).is( '.nav-primary .genesis-nav-menu > li > a' ) ) {
				if ( link.hasClass( 'hover' ) ) {
					link.attr( "href", link.data( "href" ) );
				} else {
					link.addClass( 'hover' );
					$( '.nav-primary .genesis-nav-menu > li > a' ).not( $( e.target ) ).removeClass( 'hover' ).css( "cursor","initial" );
					link.data( "href", link.attr( "href" )).removeAttr( "href" ).css( "cursor","pointer" );
				}
			} else if( $( e.target ).is( '.nav-primary .genesis-nav-menu > li > .sub-menu li a' ) ){
					return;
			} else {
				$( '.nav-primary .genesis-nav-menu > li > a' ).removeClass( 'hover' ).css( "cursor","initial" );
					//link.data( "href", link.attr( "href" ) ).removeAttr( "href" ).css( "cursor","pointer" );
			}
    });

	  $('#utility-bar .breadcrumb .menu > li > .sub-menu > li').addClass('dontsplit');
	  $('#utility-bar .breadcrumb .menu > li > a').one('mouseover', function () {
	  	$(this).next('.sub-menu').columnize({columns: 2, lastNeverTallest: true});
	  });

		//subcribe form
		$('.subscribe .subscribe-placeholder img').click( function() {
			$('.subscribe .subscribe-placeholder').hide();
			$('.subscribe .subscribe-gf-form').toggle( "slide" );
		});

		//subcribe button form
		$('.subscribe-button .subscribe-placeholder').click( function() {
			$('.subscribe-button .subscribe-placeholder').hide();
			$('.subscribe-button .subscribe-gf-form').toggle( "slide" );
			$('.subscribe-button').css('width','auto');
		});

    //footer links
		$('#site-map .menu-site-map-container .menu > li').addClass('dontsplit');
		$('#site-map .menu-site-map-container .menu > li').addClass('columnbreak');
		$('#site-map .menu-site-map-container').columnize({columns: 6, lastNeverTallest: true});

	 /* fixed-util-bar on child sites may got to 2 lines in tablet view, causes logo area to be obscured.
		* if so, detect fixed-util-bar height and change #page-top .wrap .row top margin
		*/
    $(window).resize( function() {
      var utilBarHeight = $('#fixed-util-bar').height();
			$('body .site-container .site-header').css('margin-top',utilBarHeight);
    });

		//reorganize primary navigation based on column assignements
		if( $( '.multi-column-menu' ).length ) {
			$( '.nav-primary .genesis-nav-menu > li > .sub-menu' ).each ( function () {
				var current_sub_menu = $( this );
				$( this ).append( '<div class="wrap sub-menu-container"><div class="first-column"></div><div class="second-column"></div><div class="third-column"></div><div class="fourth-column"></div></div>' );
				$( this ).find( '> li.column-two').each( function() {
					var column_item = $( this ).detach();
					current_sub_menu.find( '.second-column' ).append( column_item );
				});
				$( this ).find( '> li.column-three').each( function() {
					var column_item = $( this ).detach();
					current_sub_menu.find( '.third-column' ).append( column_item );
				});
				$( this ).find( '> li.column-four').each( function() {
					var column_item = $( this ).detach();
					current_sub_menu.find( '.fourth-column' ).append( column_item );
				});
				$( this ).find( '> li').each( function() {
					var column_item = $( this ).detach();
					current_sub_menu.find( '.first-column' ).append( column_item );
				});
				$( this ).find('.sub-menu-container').equalHeightsSiblings();
			});
		}
		//reorganize student local header menu
		if( $( '.student-header-menu' ).length ) {
			//function resides in javascript/jquery.helperFunctions.js
			headerMenuColumns( '#page-top #utility-bar #header-menu .student-header-menu .local-header-menus' );
		}
		if( $( '.student-header-menu .student-staff-quick-links' ).length ) {
			//function resides in javascript/jquery.helperFunctions.js
			headerMenuColumns( '#page-top #utility-bar #header-menu .student-header-menu .student-staff-quick-links' );
		}
		//reorganize staff local header menu
		if( $( '.faculty-staff-header-menu' ).length ) {
			//function resides in javascript/jquery.helperFunctions.js
			headerMenuColumns( '#page-top #utility-bar #header-menu .faculty-staff-header-menu .local-header-menus' );
		}
		if( $( '.faculty-staff-header-menu .student-staff-quick-links' ).length ) {
			//function resides in javascript/jquery.helperFunctions.js
			headerMenuColumns( '#page-top #utility-bar #header-menu .faculty-staff-header-menu .student-staff-quick-links' );
		}
		searchForm();
    headerMenu();
		mobileHeaderMenu();
		mobilePrimaryNav();
		$(window).resize();
		//equal heights for contextual related posts titles
		if( $( '.crp .crp_title' ).length )  {
			setTimeout( function() {
				$( '.crp .crp_title' ).equalHeights();
			}, 1);
			$(window).resize( function() {
				$( '.crp .crp_title' ).equalHeights();
			});
		}
		// Directory collapse
		$('.sidebar .directory').bind('show', function (event) {
      $el = $(this);
      $target = $(event.target);
      $target.closest('li').addClass('active').siblings().removeClass('active').find('.accordion-body.collapse.in').collapse('hide');
    });
  });
})(jQuery);
