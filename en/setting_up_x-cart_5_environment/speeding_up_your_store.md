---
layout: article_with_sidebar
lang: en
title: 'Speeding up your store'
---
# Introduction

This article aims to provide guidance to X-Cart users who want to improve the performance of their X-Cart installation.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [What is acceptable performance?](#what-is-acceptable-performance?)
*   [How can I speed up my store?](#how-can-i-speed-up-my-store?)
    *   [Step 1\. Enable CSS, JS aggregation and widget caching](#step-1.-enable-css,-js-aggregation-and-widget-caching)
    *   [Step 2\. Disable any unused modules](#step-2.-disable-any-unused-modules)
    *   [Step 3\. Use CDN for your store](#step-3.-use-cdn-for-your-store)
    *   [Step 4\. Use compression](#step-4.-use-compression)
    *   [Step 5\. Use a recent PHP version (5.5+)](#step-5.-use-a-recent-php-version-(5.5+))
    *   [Step 6\. Use Query Cache (MySQL)](#step-6.-use-query-cache-(mysql))

# What is acceptable performance?

With each release we measure X-Cart's performance, and to do it we use the [t2.micro AWS instance](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/t2-instances.html) as a server (1 CPU, 1 PHP Thread, 512Mb RAM). We use an X-Cart installation with 2000 products, 100 categories (10 root categories, each containing 10 sub-categories), 1000 users and 1000 orders. We also use the [jMeter](http://jmeter.apache.org/) application that emulates 3 concurrent users who make 50 requests.

During our tests we measure the _Time to Last Byte_ parameter, the time between when a browser makes a request to a page and the moment the HTML code of this page is fully received. Acceptable page load times for us are:

*   Home page: faster than 1.5 sec;
*   Category page: faster than 1.5 sec;
*   Product page: faster than 2 sec.

# How can I speed up my store?

## Step 1\. Enable CSS, JS aggregation and widget caching

In your store's Admin area, go to the **Look & feel** > **Performance** section and tick on the following checkboxes:

*   **Aggregate CSS files**, 
*   **Aggregate JS files**, 
*   **Use widget cache**

The former two options allow X-Cart to compound most CSS files into a single one, and most JS files into a single one as well. This way a client's browser will only send a few requests to your server (2-5 requests instead of 50~100) in order to get all the CSS styles and JS scripts.

The **Use widget cache** option enables the internal cache of viewer classes, which is a great way to speed up the opening of pages that have static data, like product or category pages. This allows to skip some calculations if no changes have been made to the content.

If you have custom mods, you may consider [making some of their widgets cached]({{ baseurl_lang }}/design_changes/making_your_custom_widget_cached.html) as well.

![]({{ site.baseurl }}/attachments/8224875/9437214.png?effects=drop-shadow)

## Step 2\. Disable any unused modules

Every installed and enabled module increases the time that PHP works, so if you disable all the modules you are not using, it will speed up your store.

## Step 3\. Use CDN for your store

CDN does not reduce the time X-Cart scripts take to work, but it delivers images, CSS and JS files to client's browser more quickly. Overall, your pages will be rendered faster.

Module example: 

*   [http://www.x-cart.com/extensions/addons/xcdn-by-cflsystems.html](http://www.x-cart.com/extensions/addons/xcdn-by-cflsystems.html)

## Step 4\. Use compression

The control panel of your hosting provider may have an option to enable compression of HTML code (for instance, cPanel has the [Optimize website](https://documentation.cpanel.net/display/ALD/Optimize+Website) option). You should enable it.

If you manage your host by yourself, you should enable the [zlib](http://php.net/manual/en/book.zlib.php) compression in PHP. If you are using Apache install [mod_deflate](http://httpd.apache.org/docs/2.0/mod/mod_deflate.html) (Apache 2.0.x) or [mod_gzip](http://sourceforge.net/projects/mod-gzip/) (Apache 1.3.x).

Besides, in case all static files are served directly by Nginx on your site, you can enable gzip compression for static files, by specifying additional directives in your nginx configuration file, for example: 

{% highlight php %}{% raw %}
# enable gzip compression
gzip on;
gzip_min_length  1100;
gzip_buffers  4 32k;
gzip_types    text/plain application/x-javascript application/javascript text/xml text/css;
gzip_vary on;
# end gzip configuration
{% endraw %}{% endhighlight %}

## Step 5\. Use a recent PHP version (5.5+)

We've run lots of tests to see if X-Cart works better on later PHP versions like 5.5 and 5.6, and it really does! Typically you can get a two times speedup simply by installing PHP 5.5+.

PHP 7.0 Warning

Icon

Unfortunately, X-Cart does not support PHP 7.0 yet. The reason for that is that PHP 7.0 was released not long ago, and it brings some critical changes. We are working hard to adapt X-Cart to these changes. Stay tuned!

## Step 6\. Use Query Cache (MySQL)

MySQL provides a convenient feature that can be used to speed up any queries to the database - Query Cache. To get an optimized and speedy response from your MySQL server, you may want to add the following configuration directives to your MySQL server:

{% highlight php %}{% raw %}
SET GLOBAL query_cache_size  = 268435456;
SET GLOBAL query_cache_type  = 1;
SET GLOBAL query_cache_limit = 1048576;
{% endraw %}{% endhighlight %}

Alternatively, you can adjust these settings in the MySQL configuration file. A good article explaining each aspect of Query Cache configuration is available at [http://dev.mysql.com/doc/refman/5.7/en/query-cache-configuration.html](http://dev.mysql.com/doc/refman/5.7/en/query-cache-configuration.html)

## Attachments:

![](images/icons/bullet_blue.gif) [aggregate-css.png]({{ site.baseurl }}/attachments/8224875/8355887.png) (image/png)  
![](images/icons/bullet_blue.gif) [use-view-cache.png]({{ site.baseurl }}/attachments/8224875/8355888.png) (image/png)  
![](images/icons/bullet_blue.gif) [X Cart online store builder Look Feel.png]({{ site.baseurl }}/attachments/8224875/9437214.png) (image/png)