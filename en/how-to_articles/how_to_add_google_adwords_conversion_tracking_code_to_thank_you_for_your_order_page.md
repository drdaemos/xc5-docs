---
identifier: ref_5r0oIBzp
updated_at: 2016-05-06 00:00
layout: article_with_sidebar
lang: en
title: 'How to add Google Adwords Conversion Tracking Code to &quot;Thank you for your order&quot; page'
categories:
  - How-To Articles

---


This article describes how to add Google Adwords Conversion Tracking code to X-Car's order confirmation page ("Thank you for your order" page).

## Step-by-step guide

Steps involved:

1.  Create a new custom template file (for example, via FTP):  

    _skins/theme_tweaker/default/en/body/js/google_ads_coversion_tracking.tpl_  

2.  Add your Google Adwords Conversion Tracking Code to the custom template, for example:

    {% highlight php %}{% raw %}
    {* vim: set ts=2 sw=2 sts=2 et: *}
    {**
     * @ListChild (list="body", weight="999100")
     *}
    {if:getTarget()=#checkoutSuccess#}
    <!-- Google Code for Conversion Page -->
    <script type="text/javascript">
    /* <![CDATA[ */
    var google_conversion_id = 999999999;
    var google_conversion_language = "en";
    var google_conversion_format = "3";
    var google_conversion_color = "ffffff";
    var google_conversion_label = "xxxfCKzzz2YQyyyyxxx";
    var google_conversion_value = {order.getTotal()};
    var google_conversion_currency = {order.currency.getCode()};
    var google_remarketing_only = false;
    /* ]]> */
    </script>
    <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
    </script>
    <noscript>
    <div style="display:inline;">
    <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/999999999/?value={order.getTotal()}&amp;currency_code={order.currency.getCode()}&amp;label=xxxfCKzzz2YQyyyyxxx&amp;guid=ON&amp;script=0"/>
    </div>
    </noscript>
    {end:}
    {% endraw %}{% endhighlight %}Icon

    Please note, you will need to adjust your original tracking code, in order to pass order total and currency values properly, for example:

    {% highlight php %}{% raw %}
    var google_conversion_value = {order.getTotal()};
    var google_conversion_currency = {order.currency.getCode()};

    value={order.getTotal()}
    currency_code={order.currency.getCode()}
    {% endraw %}{% endhighlight %}
3.  Apply the following SQL patch to your X-Cart database:

    {% highlight php %}{% raw %}
    INSERT INTO xc_theme_tweaker_template (template, date) VALUES ("theme_tweaker/default/en/body/js/google_ads_coversion_tracking.tpl", UNIX_TIMESTAMP());
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