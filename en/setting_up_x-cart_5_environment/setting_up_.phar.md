---
layout: article_with_sidebar
lang: en
title: 'Setting up .phar'
categories: [developer_docs]

---

{% include global.html %}

**.phar** lib is used for creating PHP archives. PHP 5.3 always has this extension built-in, but hosting teams may disable it for some reason.

In order to enable it try the following:

1.  Contact your hosting team and ask them to enable it.
2.  Your server's control panel may have tools for enabling PHP extensions. Check your hosting Knowledge Base for more info.
3.  If you are running your own hosting, you can download the .phar lib here [http://pecl.php.net/package/phar](http://pecl.php.net/package/phar) and install it according to the instructions given