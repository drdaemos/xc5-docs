---
identifier: ref_H86AxdTJ
updated_at: 2016-05-26 00:00
layout: article_with_sidebar
lang: en
title: 'How to remove Transaction ID info in order notification emails?'
version: X-Cart 5.2.16 and earlier
categories:
  - How-To Articles
  - Outdated

---


## Step-by-step guide

Here are the steps involved:

1.  Install and activate "Custom Skin" module.

2.  Create a new custom template in your X-Cart installation as follows:

    - copy the default template file:
    _skins/mail/en/order/invoice/parts/bottom.methods.payment.tpl_
    - to this custom template file:_
    _skins/theme_tweaker/mail/en/order/invoice/parts/bottom.methods.payment.tpl_
    _
3.  Modify the custom template as you need - for example, remove the code that is used to display Transaction ID info:

    ```php
      {if:order.getPaymentTransactionId()}
        {t(#Transaction ID#)}: {order.getPaymentTransactionId()}
      {end:}
    ```

4.  Re-generate X-Cart cache.
