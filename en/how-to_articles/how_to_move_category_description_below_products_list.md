---
identifier: ref_OPexyqFF
layout: article_with_sidebar
lang: en
title: 'How to move category description below products list'
categories:
  - How-To Articles

---


This article describes how to move category description below products list.

Для реализации требуемых изменений, понадобится сделать описанные ниже модификации темплейтов в Х-Карт, а также установить и настроить модуль "Banner System" ([http://www.x-cart.com/extensions/addons/banner-system.html](http://www.x-cart.com/extensions/addons/banner-system.html)).

## Step-by-step guide

1.  Выполнение модификации темплейтов в Х-Карт

    1.1\. Создайте новый темплейт, например:  

    _skins/theme_tweaker/default/en/center/bottom/category_description.tpl_  

    Содержимое нового темплейта:

    {% highlight php %}{% raw %}
    {**
     * @ListChild (list="center.bottom", weight="300")
     *}
    {if:getTarget()=#category#}
    <div class="category-description">{getDescription():h}</div>
    {end:}
    {% endraw %}{% endhighlight %}

    Новый темплейт будет использоваться для отображения описания категории в нижней центральной части страницы, в составе списка "center.bottom".  

    1.2\. Примените к базе X-Cart следующий SQL запрос:

    {% highlight php %}{% raw %}
    INSERT INTO xc_theme_tweaker_template (template, date) VALUES ("theme_tweaker/default/en/center/bottom/category_description.tpl", UNIX_TIMESTAMP());
    {% endraw %}{% endhighlight %}

    После этого появится возможность редактировать новый темплейт непосредственно в администраторской части X-Cart, на странице "Look & Feel " в разделе "Webmaster mode", или используя инструмент "Webmaster mode".  

    1.3\. Выполните ре-генерацию кэша в X-Cart.  

    1.4\. Модифицируйте код стандартного темплейта при помощи инструмента "Webmaster mode":  

    _skins/default/en/category_description.tpl_  

    Закомментируйте код, который выводит описание категории, заключив его в специальные тэги {* *}, например:

    {% highlight php %}{% raw %}
    {*
    <div class="category-description">{getDescription():h}</div>
    *}
    {% endraw %}{% endhighlight %}

    Это позволит убрать описание категории из верхней центральной части страницы.  

2.  Настройка баннера для категории  

    2.1\. Установите и активируйте модуль "Banner System"  

    2.2\. Удалите картинку из описания категории, и настройте эту же самую картинку как баннер, который будет показываться в верхней центральной части на странице данной категории.  

    На скриншотах ниже приведен пример настройки баннера для категории:

    [2016-05-05 15-35-25 - Banner - Apparel category.png](attachments/9307060/9439719.png)

    [2016-05-05 15-34-10 - Banner - Apparel category.png](attachments/9307060/9439718.png)

Icon

Обратите внимание, что новый темплейт включается в список "center.bottom" с весовым коэффициэнтом weight="300". Таким образом, новый темплейт будет отображаться после виджета "Category products" (_XLite\View\ItemsList\Product\Customer\Category\Main : default/en/items_list/body.tpl_, для которого задан весовой коэффициэнт weight="200"), и перед виджетом "Bestseller products" (_XLite\Module\CDev\Bestsellers\View\Bestsellers : default/en/items_list/body.tpl_, для которого задан весовой коэффициэнт weight="400"):

 _classes/XLite/View/ItemsList/Product/Customer/Category/Main.php_

{% highlight php %}{% raw %}
* @ListChild (list="center.bottom", zone="customer", weight="200")
{% endraw %}{% endhighlight %}

_classes/XLite/Module/CDev/Bestsellers/View/Bestsellers.php_

{% highlight php %}{% raw %}
* @ListChild (list="center.bottom", zone="customer", weight="400")
{% endraw %}{% endhighlight %}

На скриншотах ниже показано, как с помощью инструмента "Webmaster mode" определить, какие виджеты и темплейты используются для отображения данных на странице категории:

[2016-05-05 14-35-51 - Webmaster mode - Category description.png](attachments/9307060/9439716.png)

[2016-05-05 14-50-29 - Webmaster mode - Category products.png](attachments/9307060/9439717.png)

## Related articles

*   Page:{% link "How to remove Transaction ID info in order notification emails?" /pages/viewpage.action?pageId=9666581 %}
*   Page:{% link "How to modify "Print Invoice" page" /pages/viewpage.action?pageId=9306925 %}
*   Page:{% link "How to move category description below products list" /display/XDD/How+to+move+category+description+below+products+list %}
*   Page:{% link "How to add Google Adwords Conversion Tracking Code to "Thank you for your order" page" /pages/viewpage.action?pageId=9307079 %}
*   Page:{% link "How to add Facebook Pixel Сode to X-Cart pages" /pages/viewpage.action?pageId=9306783 %}

Showing first 5 of 8 results

## Attachments:

![](images/icons/bullet_blue.gif) [2016-05-05 14-35-51 - Webmaster mode - Category description.png]({{site.baseurl}}/attachments/9307060/9439716.png) (image/png)  
![](images/icons/bullet_blue.gif) [2016-05-05 14-50-29 - Webmaster mode - Category products.png]({{site.baseurl}}/attachments/9307060/9439717.png) (image/png)  
![](images/icons/bullet_blue.gif) [2016-05-05 15-34-10 - Banner - Apparel category.png]({{site.baseurl}}/attachments/9307060/9439718.png) (image/png)  
![](images/icons/bullet_blue.gif) [2016-05-05 15-35-25 - Banner - Apparel category.png]({{site.baseurl}}/attachments/9307060/9439719.png) (image/png)