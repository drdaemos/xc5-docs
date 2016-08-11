---
layout: null
---
(function($){
  var refresher = function() {
    $('#navigation-menu').sticky('refresh');
  };

  var stickyState = false;

  var startSticky = function() {
    if (stickyState === false) {
      $('#navigation-menu').sticky({
        context: 'article.content',
        offset: 10,
        bottomOffset: 10,
      });

      stickyState = true;
    }
  }

  var disableSticky = function () {
    $('#navigation-menu').sticky('destroy');
    $('aside.sidebar').css('height', 'auto')

    stickyState = false;
  }

  var getViewportWidth = function() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  }

  var intervalId = null;

  if ($('article.content').height() > $('#navigation-menu').height()) {
    $('#navigation-menu').addClass('absolute-bound');
  }

  $(document).ready(function(){
    if (getViewportWidth() > 991) {
      startSticky();
    }

    $(window).resize(function() {
      if (getViewportWidth() > 991) {
        startSticky();
      } else {
        disableSticky();
      }
    });

    $('#navigation-menu').accordion({
      selector: {
        trigger: '.opener',
        content: '.content',
        title: '.title'
      },
      onOpening: function() {
        intervalId = window.setInterval(refresher, 20);
      },
      onOpen: function() {
        window.clearInterval(intervalId);
      },
      onClosing: function() {
        intervalId = window.setInterval(refresher, 20);
      },
      onClose: function() {
        window.clearInterval(intervalId);
      }
    });
  });
})(jQuery);