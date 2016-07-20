---
layout: null
---
(function($){

  var autocompleteCache = {};

  $(document).ready(function(){
    // enable search
      $('.site-search')
        .search({
          apiSettings: {
            responseAsync: function(settings, callback) {
              var queryHash = objectHash(settings.urlData.query);
              if (autocompleteCache[queryHash]) {
                var pages = autocompleteCache[queryHash];

                callback({
                  success: pages.length > 0,
                  results: pages
                });
              } else {
                Search.runAutocompleteQuery(settings.urlData.query)
                .then(function(response) {
                  var pages = response.hits.hits.reduce(function(memo, item) {
                    memo.push({
                      title: item.fields.title[0],
                      url: item.fields.url[0],
                    });
                    return memo;
                  }, []);

                  autocompleteCache[queryHash] = pages;

                  callback({
                    success: pages.length > 0,
                    results: pages
                  });
                });
              }
            }
          },
          fields: {
            title   : 'title',
            url     : 'url',
          },
          minCharacters : 3
        });

      $('.site-search').keypress(function() {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        // Check for ENTER key
        if (keycode == '13') {
          this.closest('form').submit();
        }
        event.stopPropagation();
      });
  });
})(jQuery);