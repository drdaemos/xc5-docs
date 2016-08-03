---
layout: null
---
(function($){
  $(document).ready(function(){
    // $('aside.sidebar').sticky({
    //   context: 'article.content'
    // });
    $('#navigation-menu .item.has-sub').accordion({
      selector: {
        trigger: '.opener',
        content: '.content',
        title: '.title'
      },
    });
  });
})(jQuery);