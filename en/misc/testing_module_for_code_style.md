---
layout: article_with_sidebar
lang: en
title: 'Testing module for code style'
---
Before submitting a module to X-Cart 5 marketplace, you need to verify its code style. Your code must comply [PSR-2 standard](http://www.php-fig.org/psr/psr-2/).

You can verify the module's code by running the following command in your command line:

{% highlight php %}{% raw %}
phpcs --standard=PSR2 path/to/your/files
{% endraw %}{% endhighlight %}

Of course, [PHP codesniffer](https://github.com/squizlabs/PHP_CodeSniffer) must be installed in your system in order to successfully run this command.