---
identifier: ref_GuFOdboA
updated_at: 2014-02-05 00:00
layout: article_with_sidebar
lang: en
title: 'Setting up openSSL'
categories:
  - Developer docs

---


# Introduction

[openSSL](http://www.php.net/manual/en/book.openssl.php) is PHP encryption extension and its purpose to encrypt sensitive data, so malicious users would not be able to access it. If openSSL is not configured properly, your store will not be able to communicate with marketplace and install modules out of there.

If your web-server does not have openSSL configured properly, contact your hosting team and ask them to [compile PHP with openSSL enabled](http://www.php.net/manual/en/openssl.installation.php).

If you face this problem on your local machine, check tips below. Solution will depend on your operation system and type of web-server.

# Table of contents

*   [Introduction](#introduction)
*   [Table of contents](#table-of-contents)
*   [Configuring openSSL](#configuring-openssl)
    *   [Windows + XAMPP](#windows-+-xampp)

# Configuring openSSL

## Windows + XAMPP

1.  Edit the **C:\Program Files\xampp\apache\conf\httpd.conf **file and replace there the following piece of code:

    {% raw %}```php
    #LoadModule ssl_module modules/mod_ssl.so
    ```{% endraw %}

    with the next one:

    {% raw %}```php
    LoadModule ssl_module modules/mod_ssl.so
    ```{% endraw %}

2.  Edit the **C:\Program Files\xampp\php\php.ini** file and replace there the following piece of code:

    {% raw %}```php
    ;extension=php_openssl.dll
    ```{% endraw %}

    with the next one:

    {% raw %}```php
    extension=php_openssl.dll
    ```{% endraw %}

3.  Restart Apache.