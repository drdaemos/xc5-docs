---
layout: null
---
;(function() {

  function Search() {
    if (Search.instance) {
      return Search.instance;
    }

    this.query = this.getQueryParams(document.location.search);
    this.client = new $.es.Client(this.connection);

    Search.instance = this
  }

  getInstance = function() {
    return new Search();
  }

  Search.prototype.connection = {
    host: {
      host: '{{ site.elasticsearch.js_host }}',
      port: (window.location.protocol === 'https:' ? 8443 : 8000),
      protocol: (window.location.protocol === 'https:' ? 'https' : 'http'),
    },
    log:  'trace',
    apiVersion: '2.0'
  }

  Search.prototype.elements = {
    formContainer: $('.search-panel'),
    resultsContainer: $('.search-results'),
    queryMessage: $('.search-query'),
    queryInput: $('.search-input')
  }

  Search.prototype.elasticParams = {
    index: '{{ site.elasticsearch.index }}',
    type: '{{ site.elasticsearch.type }}'
  }

  Search.prototype.startAnimation = function() {
    if (this.elements.resultsContainer.length) {
      this.inProgress = true;
      this.elements.resultsContainer.addClass('reloading');
    }
  }

  Search.prototype.endAnimation = function() {
    if (this.elements.resultsContainer.length) {
      this.inProgress = false;
      this.elements.resultsContainer.removeClass('reloading');
    }
  }

  Search.prototype.toggleAnimation = function() {
    if (this.inProgress) {
      this.endAnimation();
    } else {
      this.startAnimation();
    }
  }

  Search.prototype.renderRow = function(page) {
    var date = moment(page.date);
    var index = page.index === 'usermanual' ? 'Knowledge base' : 'Developer docs';
    var date_string = date.isValid() ? '<div class="extra"><i class="icon calendar"></i> ' + date.format('D MMMM Y') + '</div>' : '';
    var meta = page.parent ? '<div class="meta">' + index + ' | ' + page.parent + '</div>' : '';
    return '<div class="item search-result-item">' +
      '<div class="content">' +
        '<a class="header" href="' + page.url + '">' + page.title + '</a>' +
        meta +
        '<div class="description">' + page.highlight + '</div>' +
        date_string +
      '</div>' +
    '</div>';
  }

  Search.prototype.runAutocompleteQuery = function(query) {
    var params = {
      index: '_all',
      type:  this.elasticParams.type,
      body: {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: query,
                  type: "phrase_prefix",
                  max_expansions: 50,
                  slop: 2,
                  fields: ["title^4", "keywords^3", "description^2", "content"]
                }
              },
              {
                multi_match: {
                  query: query,
                  type: "best_fields",
                  max_expansions: 50,
                  fields: ["title^4", "keywords^3", "description^2", "content"],
                  fuzziness: 'AUTO',
                  minimum_should_match: "60%",
                  tie_breaker: 0.3
                }
              }
            ]
          }
        },
        fields: ["title", "url", "page_date"],
        fielddata_fields : ["version", "parent"],
        indices_boost: {}
      }
    };

    params.body.indices_boost[this.elasticParams.index] = 5;

    return this.client.search(params);
  }

  Search.prototype.runQuery = function() {
    var self = this;
    // write message
    this.startAnimation();
    this.elements.queryMessage.text("Results for search query: \"" + this.query.q +"\"");
    this.elements.queryInput.val(this.query.q);

    var params = {
      index: '_all',
      type:  this.elasticParams.type,
      body: {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: this.query.q,
                  type: "phrase_prefix",
                  max_expansions: 50,
                  slop: 2,
                  fields: ["title^4", "keywords^3", "description^2", "content"]
                }
              },
              {
                multi_match: {
                  query: this.query.q,
                  type: "best_fields",
                  max_expansions: 50,
                  fields: ["title^4", "keywords^3", "description^2", "content"],
                  fuzziness: 'AUTO',
                  minimum_should_match: "60%",
                  tie_breaker: 0.3
                }
              }
            ]
          }
        },
        fields: ["title", "url", "page_date"],
        fielddata_fields : ["version", "parent"],
        indices_boost: {},
        highlight: {
          fields: {
            content: {
              fragment_size: 300
            }
          }
        },
      }
    };

    params.body.indices_boost[this.elasticParams.index] = 5;

    this.client.search(params).then(this.onSuccess.bind(this), this.onFail.bind(this));

  }

  Search.prototype.onSuccess = function (response) {
    try {
      var pages = [];
      var hits = response.hits.hits;

      for (var i=0; i<hits.length; i++) {
        var title = hits[i].fields.title[0];
        var url = hits[i].fields.url[0];
        var date = hits[i].fields.page_date[0];
        var parent = _.isArray(hits[i].fields.parent) ? hits[i].fields.parent[0] : '';
        var highlight = _.isUndefined(hits[i].highlight) ? '' : hits[i].highlight.content[0];
        var page = {
          title: title,
          index: hits[i]._index,
          url:   url,
          date:  date,
          parent: parent,
          highlight: _.unescape(highlight)
        };
        pages.push(page);
      }
      // show result
      this.renderResult(pages);
    } catch (e) {
      console.error(e.message);
    }
    this.endAnimation();
  }

  Search.prototype.onFail = function (err) {
    console.trace(err.message);
    this.renderError();
    this.endAnimation();
  }

  Search.prototype.getQueryParams = function (qs) {
    qs = qs.split("+").join(" ");
    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])]
        = decodeURIComponent(tokens[2]);
    }
    return params;
  }

  Search.prototype.renderResult = function (pages) {
    if (pages.length == 0) {
      this.elements.resultsContainer.append("<p class='search-no-results'>Oops, no results were found</p>");
    } else {
      var str = "<section class='ui very relaxed items search-results-list'>";
      for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        str += this.renderRow(page);
      }
      str += "</section>";
      this.elements.resultsContainer.append(str);
    }
  }

  Search.prototype.renderError = function () {
    this.elements.resultsContainer.empty();
    this.elements.resultsContainer.append("Search system error.");
  }

  window.Search = getInstance();

})();