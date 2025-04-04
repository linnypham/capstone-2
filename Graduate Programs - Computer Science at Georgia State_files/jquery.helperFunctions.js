(function ($) {
	/*
	 * get equal heights for all elements in a container
	 * usage - $('container').equalHeights();
	 *
	 */
	$.fn.equalHeightsSiblings = function() {
			var currentTallest = 0;
			$( this ).children().each( function (){
				if ( $( this ).height() > currentTallest ) {
					currentTallest = $( this ).height();
				}
			});
			$( this ).children().css( {'min-height': currentTallest} );
		return this;
	};
	/*
	 * Makes all targeted elements in the dom the same height
	 * be careful
	 */
	$.fn.equalHeights = function() {
		var heights = [];
		$( this ).each( function() {
			$( this ).css( {'min-height': 'initial'} );
			heights.push( $( this ).height() );
			//alert(heights);
		});
		var maxHeight = Math.max.apply( null, heights );
			//alert( maxHeight );
		$( this ).css( {'min-height': maxHeight} );
	};
	/*
	 * Places menus into columns based on menu item Column Assignment option
	 *
	 * @param {string} el: target of the menu or sub-menu container
	 *		ex: '#page-top #utility-bar #header-menu .faculty-staff-header-menu .local-header-menus'
	 */
	headerMenuColumns = function( el ) {

		var current_menu_li = $( el );
		columnNames = [ 'first', 'second', 'third', 'fourth', 'fifth' ];
		columnAssignment = [ 'one', 'two', 'three', 'four' ];
		for( i = 0; i < 5; i++ ) {
			current_menu_li.find( '.menu' ).append( '<li class="column ' + columnNames[i] + '-column"><ul></ul></li>' );
		}
		for( i = 0; i < 4; i++ ) {
			current_menu_li.find( '.menu > li.column-' + columnAssignment[i]).each( function() {
				var column_item = $( this ).detach();
				current_menu_li.find( '.' + columnNames[i] + '-column > ul' ).append( column_item );
			});
		}
		var extras = current_menu_li.find( 'li.extras' ).detach();
		current_menu_li.find( '.fifth-column > ul' ).append( extras );
		current_menu_li.find( '.menu > .menu-item').each( function() {
			var column_item = $( this ).detach();
			current_menu_li.find( '.first-column > ul' ).append( column_item );
		});
	}
	searchForm = function(){
		$( '#page-top #utility-bar .wrap > ul > li.search .util-icon-search' ).click( function() {
			$( this ).toggleClass( 'close' );
			$('#page-top #utility-bar .wrap > ul > li.search .input-medium, #page-top #utility-bar .wrap > ul > li.search .btn' ).toggle();
			$( '#page-top #utility-bar .wrap > ul > li.search' ).toggleClass( 'hover' );
			$( '#page-top #utility-bar .wrap > ul > li.search .dropdown.search-dropdown' ).toggle();
			$( '#page-top #utility-bar .wrap > ul > li.campus-map, #page-top #utility-bar .wrap > ul > li.calendar' ).toggle();
		});
		$( '#page-top #mobile-utility-bar .wrap > ul > li.search .util-icon-search' ).click( function() {
			$( this ).toggleClass('close');
			$('#page-top #mobile-utility-bar .wrap > ul > li.search .input-medium, #page-top #mobile-utility-bar .wrap > ul > li.search .btn' ).toggle();
			$( '#page-top #mobile-utility-bar .wrap > ul > li.search' ).toggleClass( 'hover' );
			$( '#page-top #mobile-utility-bar .wrap > ul > li.search .dropdown.search-dropdown' ).toggle();
			$( '#page-top #mobile-utility-bar .wrap > ul > li.campus-map, #page-top #mobile-utility-bar .wrap > ul > li.calendar' ).toggle();
		});
		$( '.searchform' ).submit( function () {
			if ( $( 'input[name="site"]:checked', this ).val() == 'site-search' ) {
        $( this ).attr( "action", $( 'input[name="site"]:checked', this ).data( 'url' ) );
      }

			if ( $( 'input[name="site"]:checked', this ).val() == 'directory' ) {
        $( this ).attr("action", "https://campusdirectory.gsu.edu/eguide.cfm" );
        var searchterm = $( "input#q", this ).val()
        $( '#sn', this ).val( searchterm );
        if ( searchterm.split(' ')[1] ) {
          $( '#sn', this ).val( searchterm.split(' ')[1] );
          $( '#givenname', this ).val( searchterm.split(' ')[0] );
        }
      }
    });
	}
	/*
   * controls the click events to make the header menus appear
   */
  headerMenu = function (){
    if ( $.fn.ellipsis ) {
      $( '.header-event .header-event-title' ).ellipsis( {live: true} );
      $( '.header-event .header-event-content' ).ellipsis( {live: true} );
      $( '.twitterfeed .tweet p' ).ellipsis( {live: true} );
    }
    var staffButton = $( "#page-top #fixed-util-bar .wrap .header-links.staff-header-links.menu-btn" ),
    studentButton = $( "#page-top #fixed-util-bar .wrap .header-links.student-header-links.menu-btn" ),

		staffNotificationButton = $( "#utility-bar .breadcrumb.header-menu-tab.staff.widget-notification" ),
		staffNotification = $( "#page-top #fixed-util-bar .wrap .header-links.staff-header-links.widget-notification, .staff-header-links > .staff-notification" ),

    studentNotificationButton = $( "#utility-bar .breadcrumb.header-menu-tab.student.widget-notification" ),
    studentNotification = $( "#page-top #fixed-util-bar .wrap .header-links.student-header-links.widget-notification, .student-header-links > .student-notification" ),
    headerMenu = $( "#page-top #fixed-util-bar #header-menu" ),
    logo = $( "#page-top #fixed-util-bar .breadcrumb.logo" ),
    studentHeaderMenu = $( "#page-top #fixed-util-bar #header-menu .student-header-menu" ),
    studentHeaderWidget = $( "#page-top #fixed-util-bar #header-menu .student-header-widget" ),
    studentClose = $( "#page-top #fixed-util-bar #header-menu .student-header-menu .student-close" ),
    staffHeaderMenu =  $( "#page-top #fixed-util-bar #header-menu .faculty-staff-header-menu" ),
    staffHeaderWidget =  $( "#page-top #fixed-util-bar #header-menu .staff-header-widget" ),
    staffClose = $( "#page-top #fixed-util-bar #header-menu .faculty-staff-header-menu .staff-close" ),
		breadcrumbSitemenu = $( '#page-top #utility-bar .wrap > ul > li.breadcrumb.off-site-menu' ),
		studentTabs = $( '#page-top #utility-bar .wrap > ul > li.breadcrumb.student' ),
		staffTabs = $( '#page-top #utility-bar .wrap > ul > li.breadcrumb.staff' ),
		studentTabLocal = $( '#page-top #utility-bar .wrap > ul > li.breadcrumb.student.local' ),
		studentTabNetwork = $( '#page-top #utility-bar .wrap > ul > li.breadcrumb.student.network' ),
		staffTabLocal = $( '#page-top #utility-bar .wrap > ul > li.breadcrumb.staff.local' ),
		staffTabNetwork = $( '#page-top #utility-bar .wrap > ul > li.breadcrumb.staff.network' ),
		studentNotificationCounter = $( '.breadcrumb.header-menu-tab.widget-notification .student-notification-counter' ),
		studentNotificationTracker = $( '.breadcrumb.header-menu-tab.widget-notification .student-notification-tracker' ),
		staffNotificationCounter = $( '.breadcrumb.header-menu-tab.widget-notification .staff-notification-counter' ),
		staffNotificationTracker = $( '.breadcrumb.header-menu-tab.widget-notification .staff-notification-tracker' ),
		utilEllipsis = $( '#utility-bar .vert-ellipsis' ),
		navEllipsis = $( '.primary-nav-ellipsis .fa-ellipsis-v' ),
    studentState = -1,
    staffState = -1;


    //displays STUDENT header menu for click of "Student" link
    studentButton.click( function(){
      studentButton.toggleClass( 'blue' );
			studentNotification.toggle();
      studentState = studentState * -1;
			//if STAFF menu visible
      if (staffState > 0) {
        studentHeaderMenu.toggle();
				staffNotification.toggle();
				studentTabs.toggle();
        staffButton.toggleClass( 'blue' );
        staffHeaderMenu.toggle();
				staffTabs.toggle();
        staffState = staffState * -1;
				$( window ).resize();
      }
      else {
				breadcrumbSitemenu.toggle();
				studentTabs.toggle();
        studentHeaderMenu.toggle();
				headerMenu.toggle( 200, function() { $( window ).resize() });
				logo.toggle();
      }
    });
    //displays STAFF header menu for click of "Faculty & Staff" link
    staffButton.click( function(){
      staffButton.toggleClass( 'blue' );
			staffNotification.toggle();
      staffState = staffState * -1;
			//if STUDENT menu visible
      if ( studentState > 0 ) {
				staffHeaderMenu.toggle();
				studentNotification.toggle();
				staffTabs.toggle();
        studentButton.toggleClass( 'blue' );
        studentHeaderMenu.toggle();
				studentTabs.toggle();
        studentState = studentState * -1;
				$( window ).resize();
      }
      else {
				breadcrumbSitemenu.toggle();
				staffTabs.toggle();
        staffHeaderMenu.toggle();
				headerMenu.toggle( 200, function() { $( window ).resize() } );
				logo.toggle();
      }
    });
    studentClose.click( function(){
      studentButton.toggleClass( 'blue' );
			studentNotification.toggle();
      studentState = studentState * -1;
			studentTabs.toggle();
			breadcrumbSitemenu.toggle();
			studentHeaderMenu.toggle();
			headerMenu.toggle( 200, function() { $( window ).resize() } );
			logo.toggle();
    });
    staffClose.click( function(){
      staffButton.toggleClass( 'blue' );
			staffNotification.toggle();
      staffState = staffState * -1;
			staffTabs.toggle();
			breadcrumbSitemenu.toggle();
			staffHeaderMenu.toggle();
			headerMenu.toggle( 200, function() { $( window ).resize() } );
			logo.toggle();
    });
		//initializes the slick slider
		studentButton.one( 'click', function() {
			studentHeaderMenu.slick({
				arrows: true,
				dots: true,
				prevArrow: '<button type="button" data-role="none" class="slick-arrow-left slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-arrow-right fa fa-angle-right slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
				draggable: false,
			});


		});
		staffButton.one( 'click', function() {
			staffHeaderMenu.slick({
				arrows: true,
				dots: true,
				prevArrow: '<button type="button" data-role="none" class="slick-arrow-left slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-arrow-right fa fa-angle-right slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
				draggable: false,
			});
		});
		//have to refresh with clicks or display gets screwed up after 4th click back amd forth between buttons
		studentButton.click( function(){
			studentHeaderMenu[0].slick.refresh();
		});
		staffButton.click( function(){
			staffHeaderMenu[0].slick.refresh();
		});
		//turn the associated util bar into tabs for the slider
		if( studentTabLocal.length ) {
			studentTabLocal.click( function(){
				studentHeaderMenu.slick( 'slickGoTo', 0 );
			});
			studentTabNetwork.click( function(){
				studentHeaderMenu.slick( 'slickGoTo', 1 );
			});
			studentNotificationButton.click( function(){
				studentHeaderMenu.slick( 'slickGoTo', 2 );
			});
			studentHeaderMenu.on( 'beforeChange', function( event, slick, currentSlide, nextSlide ){
				if( nextSlide === 0 ) {
					studentTabLocal.addClass( 'active' );
					studentTabNetwork.removeClass( 'active' );
					studentNotificationButton.removeClass( 'active' );
					studentNotificationCounter.hide();
				}
				else if( nextSlide === 1 ) {
					studentTabNetwork.addClass( 'active' );
					studentTabLocal.removeClass( 'active' );
					studentNotificationButton.removeClass( 'active' );
					studentNotificationCounter.hide();
				}
				else {
					studentNotificationButton.addClass( 'active' );
					studentTabLocal.removeClass( 'active' );
					studentTabNetwork.removeClass( 'active' );
					studentNotificationCounter.show();
					studentNotificationTracker.html( '(' + (nextSlide-1).toString() );
				}
			});
		}
		else {
			studentTabNetwork.click( function(){
				studentHeaderMenu.slick( 'slickGoTo', 0 );
			});
			studentNotificationButton.click( function(){
				studentHeaderMenu.slick( 'slickGoTo', 1 );
			});
			studentHeaderMenu.on( 'beforeChange', function( event, slick, currentSlide, nextSlide ){
			if( nextSlide === 0 ) {
				studentTabNetwork.addClass( 'active' );
				studentTabLocal.removeClass( 'active' );
				studentNotificationButton.removeClass( 'active' );
				studentNotificationCounter.hide();
			}
			else {
				studentNotificationButton.addClass( 'active' );
				studentTabLocal.removeClass( 'active' );
				studentTabNetwork.removeClass( 'active' );
				studentNotificationCounter.show();
				studentNotificationTracker.html( '(' + (nextSlide).toString() );
			}
		});
		}
		if( staffTabLocal.length ) {
			staffTabLocal.click( function(){
				staffHeaderMenu.slick( 'slickGoTo', 0 );
			});
			staffTabNetwork.click( function(){
				staffHeaderMenu.slick( 'slickGoTo', 1 );
			});
			staffNotificationButton.click( function(){
				staffHeaderMenu.slick( 'slickGoTo', 2 );
			});
			staffHeaderMenu.on( 'beforeChange', function( event, slick, currentSlide, nextSlide ){
				if( nextSlide === 0 ) {
					staffTabLocal.addClass( 'active' );
					staffTabNetwork.removeClass( 'active' );
					staffNotificationButton.removeClass( 'active' );
					staffNotificationCounter.hide();
				}
				else if( nextSlide === 1 ) {
					staffTabNetwork.addClass( 'active' );
					staffTabLocal.removeClass( 'active' );
					staffNotificationButton.removeClass( 'active' );
					staffNotificationCounter.hide();
				}
				else {
					staffNotificationButton.addClass( 'active' );
					staffTabLocal.removeClass( 'active' );
					staffTabNetwork.removeClass( 'active' );
					staffNotificationCounter.show();
					staffNotificationTracker.html( '(' + (nextSlide-1).toString() );
				}
			});
		}
		else {
			staffTabNetwork.click( function(){
				staffHeaderMenu.slick( 'slickGoTo', 0 );
			});
			staffNotificationButton.click( function(){
				staffHeaderMenu.slick( 'slickGoTo', 1 );
			});
			staffHeaderMenu.on( 'beforeChange', function( event, slick, currentSlide, nextSlide ){
				if( nextSlide === 0 ) {
					staffTabNetwork.addClass( 'active' );
					staffTabLocal.removeClass( 'active' );
					staffNotificationButton.removeClass( 'active' );
					staffNotificationCounter.hide();
				}
				else {
					staffNotificationButton.addClass( 'active' );
					staffTabLocal.removeClass( 'active' );
					staffTabNetwork.removeClass( 'active' );
					staffNotificationCounter.show();
					staffNotificationTracker.html( '(' + (nextSlide).toString() );
				}
			});
		}
		navEllipsis.click( function() {
			$( '#page-top' ).show();
			$( this ).toggleClass('invisible');
			$( window ).resize();
		});
		utilEllipsis.click( function() {
			$( '#page-top' ).css( 'display', '' );
			navEllipsis.toggleClass('invisible');
			$( window ).resize();
		});
  }
	mobileHeaderMenu = function(){
		var utilEllipsis = $('#page-top #mobile-utility-bar .wrap > ul > li.vert-ellipsis'),
		menuEllipsis = $('#page-top #mobile-utility-bar .wrap > ul.mobile-header-links > li.vert-ellipsis'),
		studentMenuButton = $( '#mobile-utility-bar .header-links.student-header-links.mobile-menu-btn' ),
		mobileStudentNtfBtn = $( "#mobile-utility-bar .student.widget-notification" ),
		staffMenuButton = $( '#mobile-utility-bar .header-links.staff-header-links.mobile-menu-btn' ),
		mobileStaffNtfBtn = $( "#mobile-utility-bar .staff.widget-notification" ),
		studentMenu= $( '#mobile-header-menu .student-header-menu' ),
		facultyMenu= $( '#mobile-header-menu .faculty-staff-header-menu' ),
		mobileStudentNotification = $( '#mobile-utility-bar .mobile-student-notification' ),
		mobileStaffNotification = $( '#mobile-utility-bar .mobile-staff-notification' ),
		studentLocalBtn = $( '#mobile-utility-bar .student-local-menu > span' ),
		studentExternalBtn = $( '#mobile-utility-bar .student-external-menu > span' ),
		studentLocalMenu = $( '#mobile-utility-bar .student-local-menu .local-header-menus' ),
		studentExternalMenu = $( '#mobile-utility-bar .student-external-menu .student-staff-quick-links' ),
		staffLocalBtn = $( '#mobile-utility-bar .staff-local-menu > span' ),
		staffExternalBtn = $( '#mobile-utility-bar .staff-external-menu > span' ),
		staffLocalMenu = $( '#mobile-utility-bar .staff-local-menu .local-header-menus' ),
		staffExternalMenu = $( '#mobile-utility-bar .staff-external-menu .student-staff-quick-links' ),
		studentWidgetArea = $( '#mobile-utility-bar .mobile-student-widget-area' ),
		staffWidgetArea = $( '#mobile-utility-bar .mobile-staff-widget-area' ),
		topLvlBtn = $( '#mobile-utility-bar .top-level .top-lvl-btn'),
		menuItem = $( '#mobile-header-menu .menu > li > a' ),
		extrasMobile = $( '#mobile-header-menu .menu > li.extras > span' ),
		backArrow = $( '#mobile-header-menu .back-arrow' ),
		mobileClose = $( '#mobile-header-menu .close' ),

		mobileStudentState = -1, mobileStaffState = -1, studentNtfState = -1, staffNtfState = -1;
		//ellipsis
		utilEllipsis.click( function() {
			$( this ).css('visibility', 'hidden');
			$( '#page-top #mobile-utility-bar .wrap > ul > li.search .input-append .util-icon-search' ).addClass( 'active-header' );
			$( '#page-top #mobile-utility-bar .wrap > ul.mobile-header-links' ).toggle();
			$( window ).resize();
		});
		menuEllipsis.click( function() {
			$('#page-top #mobile-utility-bar .wrap > ul > li.vert-ellipsis').css('visibility', 'visible');
			$('#page-top #mobile-utility-bar .wrap > ul > li.search .input-append .util-icon-search').removeClass( 'active-header' );
			$('#page-top #mobile-utility-bar .wrap > ul.mobile-header-links').toggle( false );
			if( mobileStudentState > 0 ) {
				mobileStudentState = mobileStudentState * -1;
			}
			if( mobileStaffState > 0 ) {
				mobileStaffState = mobileStaffState * -1;
			}
			resetWidgets();
			resetMenuItems();
			resetMenus();
			resetMenuBar();
			$( window ).resize();
		});
		//main header enu staff and student buttons
		studentMenuButton.click( function() {
			resetMenuBar();
			mobileStudentState = mobileStudentState * -1;
			$( this ).toggleClass( 'blue' );
			mobileStudentNotification.toggle();
			studentMenu.toggle().children().toggle();
			mobileStudentNtfBtn.toggle();
			if ( mobileStaffState == 1 ) {
				mobileStaffState = -1;
				staffMenuButton.removeClass( 'blue' );
				facultyMenu.hide().children().hide();
				mobileStaffNotification.show();
				mobileStaffNtfBtn.hide();
			}
			resetMenus();
			resetMenuItems();
			resetWidgets();
			$( window ).resize();
		});
		staffMenuButton.click( function() {
			resetMenuBar();
			mobileStaffState = mobileStaffState * -1;
			$( this ).toggleClass( 'blue' );
			mobileStaffNotification.toggle();
			facultyMenu.toggle().children().toggle();
			mobileStaffNtfBtn.toggle();
			if ( mobileStudentState == 1 ) {
				mobileStudentState = -1;
				studentMenuButton.removeClass( 'blue' );
				studentMenu.hide().children().hide();
				mobileStudentNotification.show();
				mobileStudentNtfBtn.hide();
			}
			resetMenus();
			resetMenuItems();
			resetWidgets();
			$( window ).resize();
		});
		//network/local stident/staff menu buttons
		studentLocalBtn.click( function() {
			$( this ).toggleClass( 'gray' );
			studentLocalMenu.slideToggle( 300, function() {
				studentExternalBtn.removeClass( 'gray' );
				$( window ).resize();
			});
			studentExternalMenu.hide();
			resetMenuItems();
		});
		studentExternalBtn.click( function() {
			$( this ).toggleClass( 'gray' );
			studentExternalMenu.slideToggle( 300, function() {
				studentLocalBtn.removeClass( 'gray' );
				$( window ).resize();
			});
			studentLocalMenu.hide();
			resetMenuItems();
		});
		staffLocalBtn.click( function() {
			$( this ).toggleClass( 'gray' );
			staffLocalMenu.slideToggle( 300, function() {
				staffExternalBtn.removeClass( 'gray' );
				$( window ).resize();
			});
			staffExternalMenu.hide();
			resetMenuItems();
		});
		staffExternalBtn.click( function() {
			$( this ).toggleClass( 'gray' );
			staffExternalMenu.slideToggle( 300, function() {
				staffLocalBtn.removeClass( 'gray' );
				$( window ).resize();
			});
			staffLocalMenu.hide();
			resetMenuItems();
		});
		//menu tiems
		menuItem.click( function( e ) {
			e.preventDefault();
			$( this ).toggleClass( 'gray' );
			$( this ).parent().children( '.sub-menu' ).toggle();
			$( this ).parent().siblings( 'li' ).toggle();
			if( $( this ).prev( '.back-arrow' ).length ) {
				$( this ).prev( '.back-arrow' ).remove();
				$( this ).prev( '.close' ).remove();
			}
			else {
			$( this ).before( '<i class="close">&times;</i><i class="back-arrow"></i>' );
			}
			topLvlBtn.toggle();
			extrasMobile.removeClass( 'gray' );
			extrasMobile.parent().toggle().children( '.sub-menu' ).hide();
			$( window ).resize();
		});
		extrasMobile.click( function() {
			$( this ).toggleClass( 'gray' );
			$( this ).parent().children( '.sub-menu' ).toggle();
			if( $( this ).prev( '.back-arrow' ).length ) {
				$( this ).prev( '.back-arrow' ).remove();
				$( this ).prev( '.close' ).remove();
			}
			else {
			$( this ).before( '<i class="close">&times;</i><i class="back-arrow"></i>' );
			}
			topLvlBtn.toggle();
			menuItem.parent().toggle().children( '.sub-menu' ).hide();
			$( window ).resize();
		});
		//menuItems
		menuItem.parent().on( 'click', '.close', function() {
			resetMenus();
			resetMenuItems();
			$( window ).resize();
		});
		menuItem.parent().on( 'click', '.back-arrow', function() {
			resetMenuItems();
			$( window ).resize();
		});
		//extras
		extrasMobile.parent().on( 'click', '.close', function() {
			resetMenus();
			resetMenuItems();
			$( window ).resize();
		});
		extrasMobile.parent().on( 'click', '.back-arrow', function() {
			resetMenuItems();
			$( window ).resize();
		});
		//notification slider init
		mobileStudentNtfBtn.one( 'click', function() {
			studentWidgetArea.slick({
				arrows: true,
				dots: true,
				prevArrow: '<button type="button" data-role="none" class="slick-arrow-left slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-arrow-right fa fa-angle-right slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
				draggable: false,
			});
		});
		mobileStaffNtfBtn.one( 'click', function() {
			staffWidgetArea.slick({
				arrows: true,
				dots: true,
				prevArrow: '<button type="button" data-role="none" class="slick-arrow-left slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-arrow-right fa fa-angle-right slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
				draggable: false,
			});
		});
		//notifications
		mobileStudentNtfBtn.click( function(){
			if ( studentNtfState > 0 ) {
				resetWidgets();
				resetMenuItems();
				resetMenus();
				resetMenuBar();
				studentMenuButton.click();
			}
			else {
				resetMenuItems();
				resetMenus();
				topLvlBtn.hide();
				studentWidgetArea.show();
				studentWidgetArea[0].slick.refresh();
				$('.mobile-student-widget-area .textwidget').readmore({
					collapsedHeight: 100,
					speed: 75,
					lessLink: '<a href="javascript:void(0);">Read less</a>',
					newHeight: 400,
					afterToggle: function() {
						$( this ).css('overflow-y','auto');
						$( window ).resize(); },
				});
				studentNtfState = 1;
			}
			$( window ).resize();
		});
		mobileStaffNtfBtn.click( function() {
			if ( staffNtfState > 0 ) {
				resetWidgets();
				resetMenuItems();
				resetMenus();
				resetMenuBar();
				staffMenuButton.click();
			}
			else {
				resetMenuItems();
				resetMenus();
				topLvlBtn.hide();
				staffWidgetArea.show();
				staffWidgetArea[0].slick.refresh();
				$('.mobile-staff-widget-area .textwidget').readmore({
					collapsedHeight: 100,
					newHeight: 400,
					speed: 75,
					lessLink: '<a href="javascript:void(0);">Read less</a>',
					afterToggle: function() {
						$( window ).resize(); },
				});
				staffNtfState = 1;
			}
			$( window ).resize();
		});
		//resets
		function resetMenuBar() {
			studentMenu.hide().children().hide();
			facultyMenu.hide().children().hide();
			studentMenuButton.removeClass( 'blue' );
			staffMenuButton.removeClass( 'blue' );
			mobileStaffNotification.show();
			mobileStudentNotification.show();
			mobileStaffNtfBtn.hide();
			mobileStudentNtfBtn.hide();
			mobileStudentState = -1;
			mobileStaffState = -1;
		}
		function resetMenus() {
			studentLocalMenu.hide();
			studentExternalMenu.hide();
			studentLocalBtn.removeClass( 'gray' );
			studentExternalBtn.removeClass( 'gray' );
			staffLocalMenu.hide();
			staffExternalMenu.hide();
			staffLocalBtn.removeClass( 'gray' );
			staffExternalBtn.removeClass( 'gray' );
		}
		function resetMenuItems() {
			menuItem.parent().show().children( '.sub-menu' ).hide();
			menuItem.removeClass( 'gray' );
			extrasMobile.removeClass( 'gray' );
			extrasMobile.parent().show().children( '.sub-menu' ).hide();
			topLvlBtn.show();
			$( '#mobile-header-menu .back-arrow, #mobile-header-menu .close' ).remove();
		}
		function resetWidgets() {
			$('.mobile-student-widget-area .textwidget').readmore( 'destroy' );
			$('.mobile-staff-widget-area .textwidget').readmore( 'destroy' );
			studentWidgetArea.hide();
			staffWidgetArea.hide();
			studentNtfState = -1;
			staffNtfState = -1;
		}
	}
	mobilePrimaryNav = function(){
		var navicon = $( '#mobile-utility-bar li.navicon ' ),
		mobilePrimaryNav = $( '.mobile-nav-primary' );
		mobilePrimaryNavItem = $( '.mobile-nav-primary .mobile-menu > li > a' );
		navicon.click( function() {
			$(this).toggleClass('close');
			mobilePrimaryNav.toggle();
			resetMobileNavItems();
		});
		mobilePrimaryNavItem.click( function( e ) {
			if( $( this ).siblings( '.sub-menu' ).length ) {
				e.preventDefault();
				$( this ).toggleClass( 'gray' );
				$( this ).parent().children( '.sub-menu' ).toggle();
				$( this ).parent().siblings( 'li' ).toggle();
				if( $( this ).prev( '.back-arrow' ).length ) {
					$( this ).prev( '.back-arrow' ).remove();
				}
				else {
				$( this ).before( '<i class="back-arrow"></i>' );
				}
				$( window ).resize();
			}
		});
		mobilePrimaryNavItem.parent().on( 'click', '.back-arrow', function() {
			resetMobileNavItems();
		});
		function resetMobileNavItems() {
			mobilePrimaryNavItem.parent().show().children( '.sub-menu' ).hide();
			mobilePrimaryNavItem.removeClass( 'gray' );
			mobilePrimaryNavItem.prev( '.back-arrow' ).remove();
			$( window ).resize();
		}
	}
})(jQuery);
