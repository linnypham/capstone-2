(function ($) {

  $(document).ready(function () {
    var current_blog = 0;

    // Don't do anything if we are in admin pages.
    if ($('body').hasClass('wp-admin')) {
      return;
    }

    if (typeof rave_alert.display !== 'undefined' && rave_alert.display == 'true') {

      $.ajax({
        url: '/rave-alert',
        cache: false,
        success: function (response) {
          if (response.length) {
            $('body').prepend(response);
          }
        },
        complete: function() {
          var $alert = $('#rave-alert');

          $alert.find('a.close').on('click', function (e) {
            e.preventDefault();
            // Destroy the alert is they close out of it.
            $alert.slideUp(200, function() {
              $alert.remove();
            });
          });

          var $window = $(window);
          $window.on('scroll', function() {
            var position = $window.scrollTop();
            // Bail out if we don't need to do anything.
            if ((position < 5 && $alert.css('display') == 'block') || (position > 5 && $alert.css('display') == 'none')) {
              return;
            }

            if (position > 5 && $alert.css('display') === 'block') {
              $alert.slideUp(200);
            }

            if (position < 5 && $alert.css('display') === 'none') {
              $alert.slideDown(200);
            }

          });
        }
      });
    }

  });

})(jQuery);
