---
identifier: ref_KWWQDEya
updated_at: 2016-04-18 00:00
layout: article_with_sidebar
lang: en
title: 'How to hide left-hand bar for static pages only'
categories:
  - How-To Articles

---


If you would like to hide the left-hand bar for static pages only, but still want it displayed for other pages, just follow the below guide.

## Step-by-step guide

Here are the steps involved:

1.  Install and activate "Custom Skin" module  

2.  Create the following custom script in your X-Cart installation:  

    _classes/XLite/Module/XC/CustomSkin/Core/Layout.php_  

3.  Add the following code to the custom script:

    {% highlight php %}{% raw %}
    <?php
    namespace XLite\Module\XC\CustomSkin\Core;
    class Layout extends \XLite\Core\Layout implements \XLite\Base\IDecorator
    {
         /**
         * @return array
         */
        protected function getSidebarFirstHiddenTargets()
        {
            return array_merge(
                parent::getSidebarFirstHiddenTargets(),
                array('page')
            );
        }
    }
    {% endraw %}{% endhighlight %}
4.  Rebuild the X-Cart cache.

Icon

## Related articles

*   Page:{% link "How to modify "Print Invoice" page" /pages/viewpage.action?pageId=9306925 %}
*   Page:{% link "How to move category description below the product list" /display/XDD/How+to+move+category+description+below+the+product+list %}
*   Page:{% link "How to remove Transaction ID info in order notification emails?" /pages/viewpage.action?pageId=9666581 %}
*   Page:{% link "How to add Google Adwords Conversion Tracking Code to "Thank you for your order" page" /pages/viewpage.action?pageId=9307079 %}
*   Page:{% link "How to add Facebook Pixel Сode to X-Cart pages" /pages/viewpage.action?pageId=9306783 %}

Showing first 5 of 8 results