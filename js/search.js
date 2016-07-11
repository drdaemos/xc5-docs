---
layout: null
---
(function($){
  $(document).ready(function(){
    // enable search
    $.get('{{ "/pages.xml" | prepend: site.baseurl }}', function(data) {
      var data = $.xml2json(data).page;
      $('.site-search')
        .search({
          source: data,
          fields: {
            title   : 'title',
            url     : 'link',
          },
          searchFields : [
            'title',
            'description',
            'keywords'
          ],
          minCharacters : 3
        })
      ;
    });
  });
})(jQuery);