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
    host: [
      {
        host: '{{ site.elasticsearch.js_host }}',
        auth: 'kbuser:53cr37p4',
        port: (window.location.protocol === 'https:' ? ':8443' : ':8000')
      }
    ],
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

  Search.prototype.renderRow = function(page) {
    return '<div class="item search-result-item">' +
      '<div class="content">' +
        '<a class="header" href="' + page.url + '">' + page.title + '</a>' +
        '<div class="description">' + page.highlight + '</div>' +
      '</div>' +
    '</div>';
  }

  Search.prototype.runAutocompleteQuery = function(query) {
    return this.client.search({
      index: this.elasticParams.index,
      type:  this.elasticParams.type,
      body: {
        query: {
          multi_match: {
            query: query,
            fields: ["title^10", "keywords^5", "description^3", "content"]
          }
        },
        fields: ["title", "url"],
      }
    });
  }

  Search.prototype.runQuery = function() {
    var self = this;
    // write message
    this.elements.queryMessage.text("Results for search query: \"" + this.query.q +"\"");
    this.elements.queryInput.val(this.query.q);

    this.client.search({
      index: this.elasticParams.index,
      type:  this.elasticParams.type,
      body: {
        query: {
          multi_match: {
            query: this.query.q,
            fields: ["title^10", "keywords^5", "description^3", "content"]
          }
        },
        fields: ["title", "url", "page_date"],
        highlight: {
          fields: {
            content: {
              fragment_size: 300
            }
          }
        },
      }
    }).then(this.onSuccess.bind(this), this.onFail.bind(this));

  }

  Search.prototype.onSuccess = function (response) {
    try {
      var pages = [];
      var hits = response.hits.hits;

      for (var i=0; i<hits.length; i++) {
        var title = hits[i].fields.title[0];
        var url = hits[i].fields.url[0];
        var date = hits[i].fields.page_date[0];
        var highlight = _.isUndefined(hits[i].highlight) ? '' : hits[i].highlight.content[0];
        var page = {
          title: title,
          url:   url,
          date:  date,
          highlight: _.unescape(highlight)
        };
        pages.push(page);
      }
      // show result
      this.renderResult(pages);
    } catch (e) {
      console.error(e.message);
    }
  }

  Search.prototype.onFail = function (err) {
    console.trace(err.message);
    this.renderError();
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
      this.elements.resultsContainer.append("No results were found.");
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