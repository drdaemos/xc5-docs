---
layout: article_with_sidebar
lang: en
title: 'How to modify &quot;Print Invoice&quot; page'
categories: [how-to_articles]

---

{% include global.html %}

I would like make some minor CSS changes to the print invoice page in the admin section of the store. How do I do that?

## Step-by-step guide

Here are the steps involved:

1.  Install and activate "Custom Skin" module.  

2.  Create the following custom script in your X-Cart installation:  

    _classes/XLite/Module/XC/CustomSkin/View/AView.php_  

3.  Add the following code to the custom script:

    {% highlight php %}{% raw %}
    <?php
    namespace XLite\Module\XC\CustomSkin\View;
    abstract class AView extends \XLite\View\AView implements \XLite\Base\IDecorator
    {
        /**
         * Return theme common files
         *
         * @param boolean $adminZone Admin zone flag OPTIONAL
         *
         * @return array
         */
        protected function getThemeFiles($adminZone = null)
        {
            $list = parent::getThemeFiles($adminZone);
            $list[static::RESOURCE_CSS][] = "modules/XC/CustomSkin/custom_style.css";
            return $list;
        }
    }
    {% endraw %}{% endhighlight %}
4.  Create your custom CSS files:  
    - for admin back-end: _skins/admin/en/modules/XC/CustomSkin/custom_style.css_  
    - for customer front-end: _skins/default/en/modules/XC/CustomSkin/custom_style.css_  

5.  Add your custom code to the CSS files created, for example:

    {% highlight php %}{% raw %}
    .invoice-box .header .address strong{
      font-size: 27px !important;
      margin: 10px 10px 10px 14px;
    }
    {% endraw %}{% endhighlight %}
6.  Re-generate X-Cart cache.  

Icon

You can also view the source code of the print invoice page using a special URL, for example:  

[http://demostore.x-cart.com/admin/admin.php?target=order&order_number=1&mode=invoice](http://demostore.x-cart.com/admin/admin.php?target=order&order_number=1&mode=invoice)  

Where:  

_target=order_  
_order_number=1_  
_mode=invoice_  

are the required parameters to view the print out customer receipt page.

## Related articles

*   Page:[How to remove Transaction ID info in order notification emails?](/pages/viewpage.action?pageId=9666581)
*   Page:[How to modify "Print Invoice" page](/pages/viewpage.action?pageId=9306925)
*   Page:[How to move category description below products list](/display/XDD/How+to+move+category+description+below+products+list)
*   Page:[How to add Google Adwords Conversion Tracking Code to "Thank you for your order" page](/pages/viewpage.action?pageId=9307079)
*   Page:[How to add Facebook Pixel Сode to X-Cart pages](/pages/viewpage.action?pageId=9306783)

Showing first 5 of 8 results