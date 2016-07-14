---
identifier: B1fPEEfSD
layout: article_with_sidebar
lang: en
title: 'Creating self-signed SSL certificate'
categories:
  - Developer docs

---


# Why do I need self-signed SSL certificate?

SSL certificate is used by {% link "openSSL" BkiH4GHP %} in order to encrypt data passed via {% link "cURL" BkY5H4fHD %}. If you are testing X-Cart 5 on local machine and your web-server does not have any SSL certificate, then your store will not be able to connect to marketplace. If this is your case, you need to generate self-signed SSL certificate in order to be able to install modules. The way you can do it will depend on what type of server you are using.

# Creating self-signed SSL certificate

## Windows + XAMPP

1.  Download latest **cacert.pem** file from cURL's web-site [http://curl.haxx.se/docs/caextract.html](http://curl.haxx.se/docs/caextract.html)
2.  Save it as you wish, for instance **C:\Windows\ca-bundle.crt**. Yes, you need to change its extension from **.pem** to **.crt**.
3.  Add the following line to your **xampp\php\php.ini** file under **[PHP]** header

    {% highlight php %}{% raw %}
    curl.cainfo = c:\windows\ca-bundle.crt
    {% endraw %}{% endhighlight %}
4.  Restart Apache and this certificate file should be picked up properly.

## Windows + WAMP

Exactly the same instruction as above, except you need to edit the **wamp\bin\apache\apache2.4.9\bin\php.ini** file instead of **xampp\php\php.ini** one.