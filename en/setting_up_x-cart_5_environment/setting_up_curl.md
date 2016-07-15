---
identifier: ref_AcqpgorP
layout: article_with_sidebar
lang: en
title: 'Setting up cURL'
categories:
  - Developer docs

---


# Introduction

[cURL](http://www.php.net/manual/en/intro.curl.php) is a PHP extension that is used for creating connections to different types of servers. In particular, we are using cURL to connect to our marketplace and install modules from there. Usually hosting teams compile PHP with cURL enabled and everything works fine. If this is not your case, this article is for you.

There are several possible cases when cURL is not configured properly with your PHP and we will explain how to deal with these situations.

# Table of contents

*   [Introduction](#introduction)
*   [Table of contents](#table-of-contents)
*   [cURL does not work on your web-server](#curl-does-not-work-on-your-web-server)
*   [cURL does not work on your local machine](#curl-does-not-work-on-your-local-machine)
    *   [Windows + XAMPP](#windows-+-xampp)
    *   [Ubuntu/Debian + Apache](#ubuntu/debian-+-apache)

# cURL does not work on your web-server

Usually this case can be solved if you contact your hosting team and ask them to [compile PHP with cURL](http://www.php.net/manual/en/curl.installation.php). Some hosting providers allow to enable cURL via Control Panel, so you may want to check this option before contacting hosting team. If you have dedicated server and manage extensions yourself, learn the section below for more instructions.

# cURL does not work on your local machine

In this case, the solution will be different depending on the type of your web-server and operation system.

## Windows + XAMPP

1.  Find three files on your PC:

    {% highlight php %}{% raw %}
    C:\Program Files\xampp\apache\bin\php.ini
    C:\Program Files\xampp\php\php.ini
    C:\Program Files\xampp\php\php4\php.ini
    {% endraw %}{% endhighlight %}
2.  Edit each of them and replace there the following piece of code:

    {% highlight php %}{% raw %}
    ;extension=php_curl.dll
    {% endraw %}{% endhighlight %}

    with the next one:

    {% highlight php %}{% raw %}
    extension=php_curl.dll
    {% endraw %}{% endhighlight %}
3.  Restart Apache.

## Ubuntu/Debian + Apache

1.  Run the following command in your console

    {% highlight php %}{% raw %}
    sudo apt-get install php5-curl
    {% endraw %}{% endhighlight %}
2.  Restart Apache.