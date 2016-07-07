---
layout: article_with_sidebar
lang: en
title: 'Setting up an SSL certificate in your cloud-based store'
categories: [drafts]

---

{% include global.html %}

Installing SSL certificate allows merchants to provide safe environment for their customers. Since the information such as password or email address is quite sensitive, it is a good idea to pass it to the server via encrypted protocol (HTTPS).

All X-Cart 5 stores have SSL certificates for their default domain such as shop-1234.myxcart.com, but when you decide to [assign a custom domain]({{ baseurl_lang }}/user_manual/general_setup/changing_the_domain_name.html) to your shop, this SSL certificate will no longer work and you will need to buy one for your particular domain.

You can order SSL certificate at [http://www.x-cart.com/ssl](http://www.x-cart.com/ssl) and we will perform the whole process for you.

You can also order SSL certificate in any SSL certificate registrar you want. In this case the process will be as follows:

1.  We need to generate the **CSR request** for you. For that please send us an email ([sales@x-cart.com](mailto:sales@x-cart.com)) with **SSL installation **title. In this message, specify the following information about your company:  

    * Country   
    * State   
    * City   
    * Company   
    * Company Division

2.  Once we receive your message, we generate **CSR request** and send it back to you.
3.  You should paste it in the special form in your SSL certificate registrar control panel.
4.  After that your SSL certificate registrar sends a validation message to **[admin@your-custom-domain.com](mailto:admin@your-custom-domain.com)** email. If you switch DNS servers to ours, then this email will be forwarded to the email you registered X-Cart 5 with.
5.  You should go to the link in this validation email and confirm the ownership of the domain.
6.  After that you will be able to download SSL certificate files in the registrar's control panel and send it to us.
7.  Once we receive SSL certificate files, we will install it for your shop within one business day.
8.  We are done with SSL certificate.