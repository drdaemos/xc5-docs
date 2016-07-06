---
layout: article_with_sidebar
lang: en
title: 'Adding tabs'
categories: [developer_docs]
---

{% include global.html %}

# Introduction

This article describes how you can tabs on a page in admin area. For instance, each order page has two tabs: **General info** and **Invoice**: 

![]({{ site.baseurl }}/attachments/8225436/8356201.png)

For the sake of example, we will create our own tab on product details page.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module pack](#module-pack)

# Implementation

We start with [creating an empty module]({{ baseurl_lang }}/../getting_started/step_1_-_creating_simplest_module.md) with developer ID **Tony** and module ID **ProductTabDemo**.

Tab section of a page is defined by the `getPages()` method of the page's [controller class]({{ baseurl_lang }}/../basics/controller_class.md). Since we want to add our tab to product details page, we are going to [decorate]({{ baseurl_lang }}/../getting_started/step_3_-_applying_logic_changes.md) its controller `\XLite\Controller\Admin\Product` ([more info about classnames in X-Cart]({{ baseurl_lang }}/../misc/x-cart_classes_structure_and_namespaces.md)).  We create the `<X-Cart>/classes/XLite/Module/Tony/ProductTabDemo/Controller/Admin/Product.php` file with the following content: 

{% highlight php %}<?php
// vim: set ts=4 sw=4 sts=4 et:
namespace XLite\Module\Tony\ProductTabDemo\Controller\Admin;

/**
 * Product
 */
abstract class Product extends \XLite\Controller\Admin\Product implements \XLite\Base\IDecorator
{
    public function getPages()
    {
        $list = parent::getPages();

        $list['custom_tab'] = 'My Custom Tab';

        return $list;
    }

    protected function getPageTemplates()
    {
        $list = parent::getPageTemplates();

        $list['custom_tab'] = 'modules/Tony/ProductTabDemo/tab/custom_tab.tpl';

        return $list;
    }
}{% endhighlight %}

First, we add a new element to an array returned by the `getPages()` method. This element has key as **custom_tab **– this means that this tab will be accessed by  
`admin.php?target=product&product_id=5&**page=custom_tab**` URL – and value as **My Custom Tab** – this text will be displayed on the tab.

Next, we need to add a new element to an array returned by the `getPageTemplates()` method. The key of this new element is the same: **custom_tab**, value of this element is a template that defines a look of the tab section. In our case, this template will be `<X-Cart>/skins/admin/en/modules/Tony/ProductTabDemo/tab/custom_tab.tpl`.

Since this template does not exist yet, we need to create it. We create the `<X-Cart>/skins/admin/en/modules/Tony/ProductTabDemo/tab/custom_tab.tpl` file and define its content as **Hello world!**. Of course, you can define this template as containing some form or widget.

That is it with this mod. Now we need to re-deploy the store and check the results on any product details page, e.g. `admin.php?target=product&product_id=5&page=custom_tab`. It should look as follows: ![]({{ site.baseurl }}/attachments/8225436/8356202.png)

# Module pack

You can download this mod from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-ProductTabDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-ProductTabDemo-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [order-tabs.png]({{ site.baseurl }}/attachments/8225436/8356201.png) (image/png)  
![](images/icons/bullet_blue.gif) [product-tab.png]({{ site.baseurl }}/attachments/8225436/8356202.png) (image/png)