---
identifier: ref_lggB8kuK
layout: article_with_sidebar
lang: en
title: 'Moving X-Cart to another location'
categories:
  - Migration guides

---


# Introduction

Imagine the situation that you have your X-Cart installed at [http://localhost/xcart/,](http://localhost/xcart/,) but you want it be available at [http://localhost/xcart5/](http://localhost/xcart/,).

This guide will help you achieve this task.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Instruction](#instruction)

# Instruction

1.  Make a backup of your files and database. You do need this step in case something goes wrong. Do not neglect this step, because it can cost you hours of work contacting host and asking them to recover your store from backup.
2.  Transfer X-Cart files from origin folder to destination one.  
    In case of transferring from [http://localhost/xcart/](http://localhost/xcart/,) to [http://localhost/xcart5/](http://localhost/xcart/,), I am just renaming the folder by running this command on Linux/Mac: 

    {% highlight php %}{% raw %}
    cd ~/www/;
    mv xcart xcart5;
    {% endraw %}{% endhighlight %}
3.  **[optional]** if you transfer your X-Cart between servers or create a dev copy of your store, you need to create a new database on destination server from the MySQL backup created at step 1.
4.  **[optional]** if you create a new database, then define the database **host**, **name**, **user** and **password** parameters in the `<X-Cart>/etc/config.php` file at your destination installation. Such details are specified in the `[database_details]` section in `<X-Cart>/etc/config.php` file, which looks similar to follows: 

    {% highlight php %}{% raw %}
    [database_details]
    hostspec = "localhost"
    socket   = ""
    port     = ""
    database = "database"
    username = "username"
    password = "password"
    table_prefix = "xc_"
    {% endraw %}{% endhighlight %}
5.  Edit the `<X-Cart>/etc/config.php` file and define new path to X-Cart installation in the `[host_details]` section: 

    {% highlight php %}{% raw %}
    [host_details]
    http_host = "localhost"
    https_host = "localhost"
    web_dir = "/xcart"
    {% endraw %}{% endhighlight %}

    - You need to specify HTTP and HTTPS hosts. If you transfer X-Cart within the bounds of one server, keep these values as they are.  
    - Define new `web_dir` parameter. If I move X-Cart from [http://localhost/xcart/](http://localhost/xcart/,) to [http://localhost/xcart5/](http://localhost/xcart/,), I will change its value from **/xcart** to **/xcart5**. If I transferred X-Cart [http://localhost/xcart/](http://localhost/xcart/,) to [http://localhost/](http://localhost/xcart/,), then I would change this value from **/xcart** to **/**.

6.  Edit the `<X-Cart>/.htaccess` file and change the `RewriteBase` parameter there.  
    - If I move X-Cart from [http://localhost/xcart/](http://localhost/xcart/,) to [http://localhost/xcart5/](http://localhost/xcart/,), I will replace the following string in the `<X-Cart>/.htaccess` file 

    {% highlight php %}{% raw %}
    RewriteBase /xcart
    {% endraw %}{% endhighlight %}

    with the following one: 

    {% highlight php %}{% raw %}
    RewriteBase /xcart5
    {% endraw %}{% endhighlight %}

    - If I moved X-Cart from [http://localhost/xcart/](http://localhost/xcart/,) to [http://localhost/](http://localhost/xcart/,), I would replace the following string in the `<X-Cart>/.htaccess` file: 

    {% highlight php %}{% raw %}
    RewriteBase /xcart
    {% endraw %}{% endhighlight %}

    with the following one: 

    {% highlight php %}{% raw %}
    RewriteBase /
    {% endraw %}{% endhighlight %}
7.  Remove the `<X-Cart>/var/datacache/` folder.

That is it. Now your store should be working properly at your destination location.