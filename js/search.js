---
layout: null
---
(function($){

  var autocompleteCache = {};

  $(document).ready(function(){
    // enable search
      $('.site-search')
        .search({
          type: 'category',
          apiSettings: {
            responseAsync: function(settings, callback) {
              var queryHash = objectHash(settings.urlData.query);
              if (autocompleteCache[queryHash]) {
                var pages = autocompleteCache[queryHash];

                callback({
                  success: pages !== null,
                  results: pages
                });
              } else {
                Search.runAutocompleteQuery(settings.urlData.query)
                .then(function(response) {
                  var pages = response.hits.hits.reduce(function(memo, item) {
                    memo.push({
                      title: _.isArray(item.fields.title) ? item.fields.title[0] : '',
                      url: _.isArray(item.fields.url) ? item.fields.url[0] : '',
                      description: _.isArray(item.fields.parent) ? item.fields.parent[0] : '',
                      index: item._index
                    });
                    return memo;
                  }, []);

                  var preferredIndex = '{{ site.elasticsearch.index }}';

                  if (pages.length > 0) {
                    var kb_category = {
                      name: 'found in Knowledge base',
                      results: pages.filter(function(item) {
                        return item.index == 'usermanual'
                      })
                    };
                    
                    var devs_category = {
                      name: 'found in Developer docs',
                      results: pages.filter(function(item) {
                        return item.index == 'knowledgebase'
                      })
                    };

                    if (preferredIndex == 'usermanual') {
                      var categories = {
                        category1: kb_category,
                        category2: devs_category
                      }
                    } else {
                      var categories = {
                        category1: devs_category,
                        category2: kb_category
                      }
                    }      
                  } else {
                    var categories = null;
                  }

                  autocompleteCache[queryHash] = categories;

                  callback({
                    success: categories !== null,
                    results: categories
                  });
                });
              }
            }
          },
          fields: {
            title   : 'title',
            url     : 'url',
            description: 'description'
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