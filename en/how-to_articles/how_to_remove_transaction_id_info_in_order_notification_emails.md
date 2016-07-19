---
identifier: ref_TQE7Q3sV
updated_at: 2016-05-26 00:00
layout: article_with_sidebar
lang: en
title: 'How to remove Transaction ID info in order notification emails?'
categories:
  - How-To Articles

---


## Step-by-step guide

Here are the steps involved:

1.  Install and activate "Custom Skin" module.  

2.  Create a new custom template in your X-Cart installation as follows:  

    - copy the default template file:  
    _skins/mail/en/order/invoice/parts/bottom.methods.payment.tpl_  
    - to this custom template file:_  
    _skins/custom_skin/mail/en/order/invoice/parts/bottom.methods.payment.tpl_  
    _
3.  Modify the custom template as you need - for example, remove the code that is used to display Transaction ID info:

    {% highlight php %}{% raw %}
      {if:order.getPaymentTransactionId()}
        {t(#Transaction ID#)}: {order.getPaymentTransactionId()}
      {end:}
    {% endraw %}{% endhighlight %}
4.  Re-generate X-Cart cache.

Icon

## Related articles

*   Page:{% link "How to modify "Print Invoice" page" /pages/viewpage.action?pageId=9306925 %}
*   Page:{% link "How to move category description below the product list" /display/XDD/How+to+move+category+description+below+the+product+list %}
*   Page:{% link "How to remove Transaction ID info in order notification emails?" /pages/viewpage.action?pageId=9666581 %}
*   Page:{% link "How to add Google Adwords Conversion Tracking Code to "Thank you for your order" page" /pages/viewpage.action?pageId=9307079 %}
*   Page:{% link "How to add Facebook Pixel Сode to X-Cart pages" /pages/viewpage.action?pageId=9306783 %}

Showing first 5 of 8 results