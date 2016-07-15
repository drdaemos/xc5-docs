---
identifier: ref_8ugTVMAd
layout: article_with_sidebar
lang: en
title: 'Making requests to external services'
categories:
  - Developer docs

---


# Introduction

Sometimes developers need to make a request to some external server and get a response from it. It can be done in order to get shipping rates, for instance. X-Cart has a wrapper around [PEAR2 HTTP REQUEST lib](http://pear2.php.net/PEAR2_HTTP_Request) that eases such task. This article shows an example of how to create requests to external services via X-Cart.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)

# Implementation

In order to show you the facility of making requests, we do not need a new module as we can show it via {% link "external X-Cart script" ref_5xBROryM %}. We create the `<X-Cart>/test.php` script with the following content: 

{% highlight php %}{% raw %}
<?php
//X-Cart initializtion
require_once 'top.inc.php';

// defining what page we are going to request
$url = 'http://www.x-cart.com';

// creating HTTP Request object with a single param: URL
$request = new \XLite\Core\HTTP\Request($url);

/**
Here are main parameters that can be defined for HTTP Request object

Data submitted in the request
$request->body = $someData;

Request headers
$request->setHeader('header_name', 'header_value');

Request method. GET is default
$request->verb = 'POST';

Setting request timeout value
$request->requestTimeout = 30;
 */

// making request and getting HTTP Response object as a result
$response = $request->sendRequest();

// printing result
var_dump($response->body);
{% endraw %}{% endhighlight %}

This script makes a request to [x-cart.com](http://www.x-cart.com) and then prints **HTML code** of its main page as a result.