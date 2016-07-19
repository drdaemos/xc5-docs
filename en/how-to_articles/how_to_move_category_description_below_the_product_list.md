---
identifier: ref_k2TqHwih
updated_at: 2016-06-28 00:00
layout: article_with_sidebar
lang: en
title: 'How to move category description below the product list'
categories:
  - How-To Articles

---


This article describes how to move category description below the product list.

To implement the necessary changes, you will need to modify X-Cart templates as described below; you will also need to install and configure the module "[Banner System](http://www.x-cart.com/extensions/addons/banner-system.html)".

## Step-by-step guide

1.  Modification of X-Cart templates

    1.1\. Create a new template; for example:  

    _skins/theme_tweaker/default/en/center/bottom/category_description.tpl_  

    Here is the content of the new template:

    {% highlight php %}{% raw %}
    {**
     * @ListChild (list="center.bottom", weight="300")
     *}
    {if:getTarget()=#category#}
    <div class="category-description">{getDescription():h}</div>
    {end:}
    {% endraw %}{% endhighlight %}

    The new template will be used to display category description in the center bottom part of the page within the "center.bottom" list.  

    1.2\. Run the following SQL query on your X-Cart database:

    {% highlight php %}{% raw %}
    INSERT INTO xc_theme_tweaker_template (template, date) VALUES ("theme_tweaker/default/en/center/bottom/category_description.tpl", UNIX_TIMESTAMP());
    {% endraw %}{% endhighlight %}

    After doing so you will be able to edit the new template directly in the Admin area of your X-Cart store, on the "Look & Feel" page in the "Webmaster mode" section, or while using the "Webmaster mode" tool.  

    1.3\. Re-generate X-Cart cache.  

    1.4\. Modify the code of the template _skins/default/en/category_description.tpl_  using the "Webmaster mode" tool:  

    Comment out the code responsible for the output of category description by placing it inside the special tags {* *}; for example:

    {% highlight php %}{% raw %}
    {*
    <div class="category-description">{getDescription():h}</div>
    *}
    {% endraw %}{% endhighlight %}

    This will remove category description from the center top part of the page.  

2.  Set up a banner for the category.  

    2.1\. Install and activate the module "Banner System".  

    2.2\. Remove the image from the category description, and use the same image to set up a banner that will be displayed in the center top part of the category page.  

    On the screenshots below you can find an example of how to set up such a banner for a category:

    [2016-05-05 15-35-25 - Banner - Apparel category.png](attachments/9307060/9439719.png)

    [2016-05-05 15-34-10 - Banner - Apparel category.png](attachments/9307060/9439718.png)

Icon

Please note that the new template is included into the "center.bottom" list with the weighting factor _weight="300"_. This way, the new template will be displayed after the widget "Category products" (_XLite\View\ItemsList\Product\Customer\Category\Main : default/en/items_list/body.tpl_, for which the weighting factor is specified as _weight="200"_), and before the widget "Bestseller products" (_XLite\Module\CDev\Bestsellers\View\Bestsellers : default/en/items_list/body.tpl_, for which the weighting factor is specified as _weight="400"_):

 _classes/XLite/View/ItemsList/Product/Customer/Category/Main.php_

{% highlight php %}{% raw %}
* @ListChild (list="center.bottom", zone="customer", weight="200")
{% endraw %}{% endhighlight %}

_classes/XLite/Module/CDev/Bestsellers/View/Bestsellers.php_

{% highlight php %}{% raw %}
* @ListChild (list="center.bottom", zone="customer", weight="400")
{% endraw %}{% endhighlight %}

On the screenshots below, it is shown how to use the "Webmaster mode" tool to determine what widgets and templates are used to display data on a category page:

[2016-05-05 14-35-51 - Webmaster mode - Category description.png](attachments/9307060/9439716.png)

[2016-05-05 14-50-29 - Webmaster mode - Category products.png](attachments/9307060/9439717.png)

## Related articles

*   Page:{% link "How to modify "Print Invoice" page" /pages/viewpage.action?pageId=9306925 %}
*   Page:{% link "How to move category description below the product list" /display/XDD/How+to+move+category+description+below+the+product+list %}
*   Page:{% link "How to remove Transaction ID info in order notification emails?" /pages/viewpage.action?pageId=9666581 %}
*   Page:{% link "How to add Google Adwords Conversion Tracking Code to "Thank you for your order" page" /pages/viewpage.action?pageId=9307079 %}
*   Page:{% link "How to add Facebook Pixel Сode to X-Cart pages" /pages/viewpage.action?pageId=9306783 %}

Showing first 5 of 8 results

## Attachments:

![](images/icons/bullet_blue.gif) [2016-05-05 14-35-51 - Webmaster mode - Category description.png]({{site.baseurl}}/attachments/9307060/9439716.png) (image/png)  
![](images/icons/bullet_blue.gif) [2016-05-05 14-50-29 - Webmaster mode - Category products.png]({{site.baseurl}}/attachments/9307060/9439717.png) (image/png)  
![](images/icons/bullet_blue.gif) [2016-05-05 15-34-10 - Banner - Apparel category.png]({{site.baseurl}}/attachments/9307060/9439718.png) (image/png)  
![](images/icons/bullet_blue.gif) [2016-05-05 15-35-25 - Banner - Apparel category.png]({{site.baseurl}}/attachments/9307060/9439719.png) (image/png)