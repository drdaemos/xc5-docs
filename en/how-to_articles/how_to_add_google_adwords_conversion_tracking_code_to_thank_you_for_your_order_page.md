---
title: How to add Google Adwords Conversion Tracking Code to &quot;Thank you for your
  order&quot; page
identifier: ref_g8xO0UNP
updated_at: 2016-05-06 00:00
layout: article_with_sidebar
lang: en
version: X-Cart 5.2.16 and earlier
categories:
- How-To Articles
- Outdated
---

This article describes how to add Google Adwords Conversion Tracking code to X-Car's order confirmation page ("Thank you for your order" page).

## Step-by-step guide

Steps involved:

1.  Create a new custom template file (for example, via FTP):

    _skins/theme_tweaker/default/en/body/js/google_ads_coversion_tracking.tpl_

2.  Add your Google Adwords Conversion Tracking Code to the custom template, for example:

    ```php
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
    ```
    Icon

    Please note, you will need to adjust your original tracking code, in order to pass order total and currency values properly, for example:

    ```php
    var google_conversion_value = {order.getTotal()};
    var google_conversion_currency = {order.currency.getCode()};

    value={order.getTotal()}
    currency_code={order.currency.getCode()}
    ```

3.  Apply the following SQL patch to your X-Cart database:

    ```php
    INSERT INTO xc_theme_tweaker_template (template, date) VALUES ("theme_tweaker/default/en/body/js/google_ads_coversion_tracking.tpl", UNIX_TIMESTAMP());
    ```

4.  Re-generate X-Cart cache.
