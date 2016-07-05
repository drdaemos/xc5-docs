---
layout: article_with_sidebar
lang: en
title: 'Adding new sort by option to ItemsList'
categories: [developer_docs]
---

{% include global.html %}

# Introduction

This article aims to teach X-Cart developers how they can add a sorting option to their [ItemsLists]({{ baseurl_lang }}/developer_docs/basics/itemslist_introduction_--_showing_products_on_a_page/{{ baseurl_lang }}/index.html).

For the sake of example we will add **Sort by date** option to all product ItemsLists as shown on the snapshot below:

![]({{ site.baseurl }}/attachments/8749095/8716414.png)

Similar option already exists in [Product Advisor](http://www.x-cart.com/extensions/addons/product-advisor.html) module, so you need to disable it in order to get our module working properly.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module pack](#module-pack)

# Implementation

We start with [creating a module]({{ baseurl_lang }}/developer_docs/getting_started/step_1_-_creating_simplest_module.html) with developer ID **Tony** and module ID **SortingByDate**. In this module we are going to [decorate]({{ baseurl_lang }}/developer_docs/getting_started/step_3_-_applying_logic_changes.html) the `\XLite\View\ItemsList\Product\Customer\ACustomer` class, so we create the  
`<X-Cart>/classes/XLite/Module/Tony/SortingByDate/View/ItemsList/Product/Customer/ACustomer.php` file with the following content: 

{% highlight php %}<?php
// vim: set ts=4 sw=4 sts=4 et:

namespace XLite\Module\Tony\SortingByDate\View\ItemsList\Product\Customer;

/**
 * ACustomer
 */
abstract class ACustomer extends \XLite\View\ItemsList\Product\Customer\ACustomer implements \XLite\Base\IDecorator
{
}{% endhighlight %}

Adding of new sorting option is as easy as changing the `__construct()` method in this class:

{% highlight php %}    public function __construct(array $params = array())
    {
        parent::__construct($params);

        $this->sortByModes = array(
            'p.arrivalDate' => 'Sort by date',
        ) + $this->sortByModes;
    }{% endhighlight %}

As you can see, we call parent's constructor and then adding one more record to the `$this->sortByModes` array: 

{% highlight php %}		$this->sortByModes = array(
            'p.arrivalDate' => 'Sort by date',
        ) + $this->sortByModes;{% endhighlight %}

*   This new record's key is a field that will be used by [queryBuilder]({{ baseurl_lang }}/developer_docs/basics/searching_entities_in_repositories/querybuilder.html) object for sorting results. In our case we are going to sort by date and key is `p.arrivalDate`.
*   The value of new record is a name of sorting option, which will be displayed to a customer. In our case it is **Sort by date**.

That is it. Now we can re-deploy the store and check the results in store-front. It will look as follows:![]({{ site.baseurl }}/attachments/8749095/8716415.png)

# Module pack

You can download this module example from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-SortingByDate-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-SortingByDate-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [sorting-options.png]({{ site.baseurl }}/attachments/8749095/8716414.png) (image/png)  
![](images/icons/bullet_blue.gif) [new-sorting-option-result.png]({{ site.baseurl }}/attachments/8749095/8716415.png) (image/png)