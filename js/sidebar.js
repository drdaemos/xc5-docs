---
layout: null
---
(function($){
  var refresher = function() {
    $('#navigation-menu').sticky('refresh');
  };

  var intervalId = null;

  if ($('article.content').height() > $('#navigation-menu').height()) {
    $('#navigation-menu').addClass('absolute-bound');
  }

  $(document).ready(function(){
    $('#navigation-menu').sticky({
      context: 'article.content',
      offset: 10,
      bottomOffset: 10,
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