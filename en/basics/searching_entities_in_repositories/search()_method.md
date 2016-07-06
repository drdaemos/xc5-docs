---
layout: article_with_sidebar
lang: en
title: 'search() method'
categories: [developer_docs]
---

{% include global.html %}

# Introduction

This article describes another approach of searching entities in the database and then pulling data. We already know two approaches:

1.  [method find()]({{ baseurl_lang }}/../basics/searching_entities_in_repositories/index.md) for simple queries
2.  [queryBuilder object]({{ baseurl_lang }}/../basics/searching_entities_in_repositories/querybuilder.md) for complex queries

Method **search()** is used primarily in [ItemsLists objects]({{ baseurl_lang }}/../basics/itemslist_introduction_--_showing_products_on_a_page/index.md), because it uses and extends **queryBuilder** object and allows convenient way of adding conditions to a query.

For the sake of example, we will create a mod that will display names of products that have IDs less than 20.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module pack](#module-pack)

# Implementation

We start with [creating an external]({{ baseurl_lang }}/../basics/working_with_x-cart_externally.md) `test.php` script inside X-Cart folder. We put the following code inside this script: 

{% highlight php %}<?php

//X-Cart initializtion
require_once 'top.inc.php';

// defining condition object
$cnd = new \XLite\Core\CommonCell();
$cnd->myCond = true;

$countOnly = false;

// pulling products from the database based on the $cnd condition
$products = \XLite\Core\Database::getRepo('\XLite\Model\Product')->search($cnd, $countOnly);

// displaying product names
foreach ($products as $key => $product) {
    echo $key . ': ' . $product->getName() . '<br />';
}{% endhighlight %}

If we run this code right now, this script will display all products without taking into account IDs condition. It will happen so, because X-Cart does not yet have implementation of **myCond** condition handling. Even though it does not handle such condition, our search does not break and returns results based on other conditions – no in conditions in our case.

We also need some clarifications about `\XLite\Core\CommonCell` object. It is basic transport object that behaves as an array. For instance you can call `foreach()` on it:

{% highlight php %}foreach ($cnd as $key => $value) {
	echo 'key: ' . $key . ' value: ' . $value;
}{% endhighlight %}

However, since it is an object, you can take benefits of it. For instance, add logging to getter and setter classes.

Since `\XLite\Core\CommonCell` object behaves as an array, you can think of `search()` method's first parameter as an array that represents conditions that must be handled. The second parameter of the method is a boolean flag that defines whether objects or number of objects must be returned.

Now it is time to implement handling of our **myCond** condition in the `\XLite\Model\Repo\Product` class. We [create an empty module]({{ baseurl_lang }}/../getting_started/step_1_-_creating_simplest_module.md) with developer ID **Tony** and module ID **SearchRepoDemo**. Inside this module, we [decorate]({{ baseurl_lang }}/../getting_started/step_3_-_applying_logic_changes.md) the `\XLite\Model\Repo\Product` class, so we create the `<X-Cart>/classes/XLite/Module/Tony/SearchRepoDemo/Model/Repo/Product.php` file with the following content: 

{% highlight php %} <?php
// vim: set ts=4 sw=4 sts=4 et:

namespace XLite\Module\Tony\SearchRepoDemo\Model\Repo;

/**
 * The "product" model repository
 */
abstract class Product extends \XLite\Model\Repo\Product implements \XLite\Base\IDecorator
{
    const P_MY_COND = 'myCond';

    protected function getHandlingSearchParams()
    {
        $params = parent::getHandlingSearchParams();
        $params[] = self::P_MY_COND;
        return $params;
    }

    protected function prepareCndMyCond(\Doctrine\ORM\QueryBuilder $queryBuilder, $value)
    {
        $result = $queryBuilder;
        if ($value) {
            $result
                ->andWhere('p.product_id < :product_id')
                ->setParameter('product_id', 20);
        }

        return $result;
    }
}{% endhighlight %}

Implementation of handling a condition consists of two steps:

1.  Adding your condition name into array returned by `getHandlingSearchParams()` method: 

    {% highlight php %}    const P_MY_COND = 'myCond';

        protected function getHandlingSearchParams()
        {
            $params = parent::getHandlingSearchParams();

            $params[] = self::P_MY_COND;

            return $params;
        }{% endhighlight %}
2.  Implementation of `prepareCnd + yourConditionName` method. In our case, our method will be called `prepareCndMyCond()`:

    {% highlight php %}    protected function prepareCndMyCond(\Doctrine\ORM\QueryBuilder $queryBuilder, $value)
        {
            $result = $queryBuilder;

            if ($value) {
                $result
                    ->andWhere('p.product_id < :product_id')
                    ->setParameter('product_id', 20);
            }

            return $result;
        }{% endhighlight %}

    The function name must be in [Camel](http://en.wikipedia.org/wiki/CamelCase) notation, that is why the algorithm for creating the method name is as follows: 

    {% highlight php %}'prepareCnd' . ucfirst($conditionName){% endhighlight %}

    As you can see, implementation of `prepareCndMyCond()` method uses the same queryBuilder object we learned about in [previous guide](QueryBuilder_8225337.html). However, since we use `\XLite\Core\CommonCell` object in order to run this small **prepareCnd** methods, it allows us to add small elements to this object – like oue where condition – based on needed conditions, so we will steadily build a complex query while meeting specific requirements incapsulated in our **prepareCnd** methods.

Let us get back to our `test.php` script. Now if we run this code: 

{% highlight php %}<?php
//X-Cart initializtion
require_once 'top.inc.php';

// defining condition object
$cnd = new \XLite\Core\CommonCell();
$cnd->myCond = true;

$countOnly = false;

// pulling products from the database based on the $cnd condition
$products = \XLite\Core\Database::getRepo('\XLite\Model\Product')->search($cnd, $countOnly);

// displaying product names
foreach ($products as $key => $product) {
    echo $key . ': ' . $product->getName() . '<br />';
}{% endhighlight %}

It will return all products with ID less than 20\. If we comment the `$cnd->myCond = true;` part, then all products will be returned.

Imagine that you have dozen of conditions for pulling products. In this case, this approach will be very helpful for you.

_Note: if you need to create search() method for your own entity, use [this guide]({{ baseurl_lang }}/../basics/creating_new_entity_--_introduction_of_editable_itemslist_in_admin_area.md#Creatingnewentity--IntroductionofeditableItemsListinadminarea-CreatingRepositoryclass)_ _for its general implementation._

# Module pack

You can download this module example from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-SearchRepoDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-SearchRepoDemo-v5_1_0.tar)