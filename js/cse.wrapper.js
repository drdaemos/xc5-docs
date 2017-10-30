---
layout: 
---

// Version 0.5
;(function() {

  function Search() {
    if (Search.instance) {
      return Search.instance;
    }

    this.PAGE_LENGTH = 10;
    this.query = this.getQueryParams(document.location.search);

    Search.instance = this
  }

  getInstance = function() {
    return new Search();
  }

  Search.prototype.connection = {
    host: '{{ site.cse.host }}',
    path: '{{ site.cse.path }}',
    port: (window.location.protocol === 'https:' ? 7443 : 7000),
    protocol: (window.location.protocol === 'https:' ? 'https' : 'http'),
  }

  Search.prototype.elements = {
    formContainer: $('.search-panel'),
    resultsContainer: $('.search-results'),
    queryMessage: $('.search-query'),
    queryInput: $('.search-input')
  }

  Search.prototype.devsSections = {
    getting_started: { en: "Getting started" },
    changing_store_logic: { en: "Changing store logic"},
    customization_examples: { en: "Customization examples"},
    changelog: { en: "Changelog"},
    basics: { en: "Architecture basics"},
    migration_guides: { en: "Migration guides"},
    webinars_and_video_tutorials: { en: "Webinars and video tutorials"},
    design_changes: { en: "Design changes"},
    "how-to_articles": { en: "How-To Articles"},
    misc: { en: "Misc"},
  }

  Search.prototype.kbSections = {
    "general_setup": { en:"General setup"},
    "products": { en:"Products"},
    "shipping": { en:"Shipping"},
    "seo_and_promotion": { en:"SEO and promotion"},
    "product_classes_and_attributes": { en:"Product classes and attributes"},
    "webinars_and_video_tutorials": { en:"Webinars and video tutorials"},
    "sectting_up_x-cart_5_environment": { en:"Setting up X&#8209;Cart 5 environment"},
    "payments": { en:"Payments"},
    "countries__states_and_zones": { en:"Countries, states and zones"},
    "addons": { en:"Addons"},
    "integrating_your_store_with_other_web-sites": { en:"Integrating your store with other web-sites"},
    "look_and_feel": { en:"Look and feel"},
    "orders": { en:"Orders"},
    "taxes": { en:"Taxes"},
    "users": { en:"Users"},
    "import-export": { en:"Import-Export"}
  }

  Search.prototype.getCategoryByItem = function (item) {
    var registry = (item.displayLink === 'kb.x-cart.com') ? this.kbSections : this.devsSections;

    var regex = /\/\/.+?\/(.+?)\/(.+?)\//;
    var matches = item.link.match(regex);

    if (matches) {
      var lng = matches[1];
      var key = matches[2];
      var section = registry[key];
      if ('undefined' !== typeof(section)) {
        return 'undefined' !== typeof(section[lng])
          ? section[lng]
          : section[Object.getOwnPropertyNames(section)[0]];
      }
    }

    return '';
  }

  Search.prototype.sendRequest = function (params) {
    var url = this.connection.protocol + '://' + this.connection.host + ':' + this.connection.port + '/' + this.connection.path;
    return $.get(url, params, null, 'json');
  }

  Search.prototype.runAutocompleteQuery = function (query) {
    var params = {
      q: query,
      num: 10
    };
    return this.sendRequest(params).then(_.bind(this.onAutocompleteSuccess, this), _.bind(this.onAutocompleteFail, this));
  }

  Search.prototype.onAutocompleteSuccess = function (response) {
    var self = this;
    var pages = response.items.reduce(function(memo, item) {
      memo.push({
        title: _.unescape(item.htmlTitle),
        url: item.link,
        description: self.getCategoryByItem(item),
        site: item.displayLink
      });
      return memo;
    }, []);

    var preferredSite = '{{ site.search.preferred }}';

    if (pages.length > 0) {
      var kb_category = {
        name: 'Knowledge base',
        results: pages.filter(function(item) {
          return item.site == 'kb.x-cart.com'
        })
      };
      
      var devs_category = {
        name: 'Developer docs',
        results: pages.filter(function(item) {
          return item.site == 'devs.x-cart.com'
        })
      };

      if (prefix_length == 'kb.x-cart.com') {
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

    return categories;
  }

  Search.prototype.onAutocompleteFail = function() {
    return null;
  }

  Search.prototype.runQuery = function() {
    var self = this;
    // write message
    this.startAnimation();
    this.elements.queryMessage.text("Results for search query: \"" + this.query.q +"\"");
    this.elements.queryInput.val(this.query.q);

    var params = {
      q: this.query.q,
      num: this.PAGE_LENGTH,
    };

    if (this.query.page && this.query.page > 0) {
      params['start'] = (this.query.page - 1) * this.PAGE_LENGTH + 1;
    }

    return this.sendRequest(params).then(_.bind(this.onSuccess, this), _.bind(this.onFail,this));
  }

  Search.prototype.onSuccess = function (response) {
    try {
      var self = this;
      var pages = response.items.reduce(function(memo, item) {
        memo.push({
          title: _.unescape(item.htmlTitle),
          url: item.link,
          parent: self.getCategoryByItem(item),
          index: item.displayLink,
          date: "",
          highlight: _.unescape(item.htmlSnippet)
        });
        return memo;
      }, []);

      // show result
      this.renderResult(pages);
    } catch (e) {
      console.error(e.message);
    }
    this.endAnimation();

    return pages;
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

  Search.prototype.renderRow = function(page) {
    var date = moment(page.date);
    var index = page.index === 'usermanual' ? 'Knowledge base' : 'Developer docs';
    var date_string = date.isValid() ? '<div class="extra">' + date.format('D MMMM Y') + '</div>' : '';
    var meta = page.parent ? '<div class="meta">' + index + ' / ' + page.parent + '</div>' : '';
    return '<div class="item search-result-item">' +
      '<div class="content">' +
        '<a class="header" href="' + page.url + '">' + page.title + '</a>' +
        meta +
        '<div class="description">' + page.highlight + '</div>' +
        date_string +
      '</div>' +
    '</div>';
  }

  Search.prototype.renderError = function () {
    this.elements.resultsContainer.empty();
    this.elements.resultsContainer.append("Search system error.");
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

  window.Search = getInstance();

})();