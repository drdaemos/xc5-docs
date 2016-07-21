---
identifier: ref_c7RSyvR6
updated_at: 2015-01-13 00:00
layout: article_with_sidebar
lang: en
title: 'ItemsList in admin area'
categories:
  - Developer docs

---


# Introduction

**ItemsList** is a type of X-Cart widget that displays records about entities in structured format. Examples of ItemsList widgets are below:

![]({{site.baseurl}}/attachments/8225372/8356178.png)

![]({{site.baseurl}}/attachments/8225372/8356179.png)

This article will explain how to create such ItemsList. For the sake of example, we will create an ItemsList with products that has price more than $10 and this list can be sorted by price.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module pack](#module-pack)

# Implementation

We start with {% link "creating an empty module" ref_TZnqVJsw %} with developer ID **Tony** and module ID **ItemsListAdminDemo**. Then we {% link "create a new page" ref_OkHzgi1f %} `target=items_list_demo` in admin area. For that we create:

1.  empty controller class `\XLite\Module\Tony\ItemsListAdminDemo\Controller\Admin\ItemsListDemo`;
2.  simple page viewer class `\XLite\Module\Tony\ItemsListAdminDemo\View\Page\Admin\ItemsListDemo` with the following content: 

    {% highlight php %}{% raw %}
    <?php
    // vim: set ts=4 sw=4 sts=4 et:

    namespace XLite\Module\Tony\ItemsListAdminDemo\View\Page\Admin;

    /**
     * Items list demo page view
     *
     * @ListChild (list="admin.center", zone="admin")
     */
    class ItemsListDemo extends \XLite\View\AView
    {
        /**
         * Return list of allowed targets
         *
         * @return array
         */
        public static function getAllowedTargets()
        {
            return array_merge(parent::getAllowedTargets(), array('items_list_demo'));
        }

        /**
         * Return widget default template
         *
         * @return string
         */
        protected function getDefaultTemplate()
        {
            return 'modules/Tony/ItemsListAdminDemo/page/items_list_demo/body.tpl';
        }
    }
    {% endraw %}{% endhighlight %}
3.  empty page template `<X-Cart>/skins/admin/en/modules/Tony/ItemsListAdminDemo/page/items_list_demo/body.tpl`.

Now we start creating our **ItemsList** widget. We create the `<X-Cart>/classes/XLite/Module/Tony/ItemsListAdminDemo/View/ItemsList/ItemsListDemo.php` file with the following content: 

{% highlight php %}{% raw %}
<?php

namespace XLite\Module\Tony\ItemsListAdminDemo\View\ItemsList;

class ItemsListDemo extends \XLite\View\ItemsList\Model\Table
{
    const SORT_BY_MODE_PRICE = 'p.price';

    protected function defineRepositoryName()
    {
        return '\XLite\Model\Product';
    }

    protected function defineColumns()
    {
        return array(
            'sku' => array(
                static::COLUMN_NAME     => 'SKU',
                static::COLUMN_ORDERBY  => 100,
            ),
            'name' => array(
                static::COLUMN_NAME     => 'Name',
                static::COLUMN_ORDERBY  => 200,
                static::COLUMN_MAIN     => true,
                static::COLUMN_LINK     => 'product',
            ),
            'price' => array(
                static::COLUMN_NAME     => 'Price',
                static::COLUMN_SORT     => static::SORT_BY_MODE_PRICE,
                static::COLUMN_ORDERBY  => 300,
            ),
        );
    }

    public function __construct(array $params = array())
    {
        $this->sortByModes += array(
            static::SORT_BY_MODE_PRICE  => 'Price',
        );

        parent::__construct($params);
    }

    protected function getSearchCondition()
    {
        $result = parent::getSearchCondition();

        $result->{\XLite\Model\Repo\Product::P_ORDER_BY} = $this->getOrderBy();
        $result->moreThan10 = true;

        return $result;
    }

    protected function getSortByModeDefault()
    {
        return static::SORT_BY_MODE_PRICE;
    }
}
{% endraw %}{% endhighlight %}

Let us have a look at key parts of this widget implementation:

1.  Every single ItemsList in admin area extends`\XLite\View\ItemsList\Model\Table class`, so do we: 

    {% highlight php %}{% raw %}
    class ItemsListDemo extends \XLite\View\ItemsList\Model\Table
    {% endraw %}{% endhighlight %}
2.  We need to point our **ItemsList** to some {% link "model" ref_yzmkyyfu %}. It will tell a widget what entities it must display. In our case, this entity is a **product**, so we point our ItemsList to `\XLite\Model\Product` model class: 

    {% highlight php %}{% raw %}
        protected function defineRepositoryName()
        {
            return '\XLite\Model\Product';
        }
    {% endraw %}{% endhighlight %}
3.  Next step is to define what columns must be displayed in our ItemsList. We want to display **SKU**, **Product Name** as a link to a product details page and **Price**. Price field must support sorting option. In order to implement this configuration, we define the following `defineColumns()` method: 

    {% highlight php %}{% raw %}
        protected function defineColumns()
        {
            return array(
                'sku' => array(
                    static::COLUMN_NAME     => 'SKU',
                    static::COLUMN_ORDERBY  => 100,
                ),
                'name' => array(
                    static::COLUMN_NAME     => 'Name',
                    static::COLUMN_ORDERBY  => 200,
                    static::COLUMN_MAIN     => true,
                    static::COLUMN_LINK     => 'product',
                ),
                'price' => array(
                    static::COLUMN_NAME     => 'Price',
                    static::COLUMN_SORT     => static::SORT_BY_MODE_PRICE,
                    static::COLUMN_ORDERBY  => 300,
                ),
            );
        }
    {% endraw %}{% endhighlight %}
4.  Key of an array's element must be one of Model properties, so that X-Cart could pick up value automatically. The value must be an **array()** that describes the column. SKU column is very simple, we just define its column name as **SKU** and its orderby as **100**.
5.  Name column is a bit more complex. It also has `COLUMN_NAME` and `COLUMN_ORDERBY`, but it additionally has `COLUMN_MAIN = true` param, which defines that this column must be widest across ones in the ItemsList. It also has `COLUMN_LINK` parameter that defines a link where you can see product details. As you can, see we just define target parameter as **product** and X-Cart will build a proper URL for a particular product itself, so it would become `admin.php?target=product&product_id=ID`.
6.  Price column is a bit more complex also. Although, it has the same `COLUMN_NAME` and `COLUMN_ORDERBY` parameters, it supports sorting as defined by the `COLUMN_SORT` param. Aside from specifying this param in column, we must also create constant called `SORT_BY_MODE_PRICE` as it refers to it:

    {% highlight php %}{% raw %}
    const SORT_BY_MODE_PRICE = 'p.price';
    {% endraw %}{% endhighlight %}

    The value of this constant will be passed into `getOrderBy()` method of ItemsList class (see implementation of `\XLite\View\ItemsList\AItemsList` class) and then it will be used in `getSearchCondition()` method (we will have a look at it a bit later in this article).  
    Also, we must add this sorting option to `sortByModes()` method, so we extend `__construct()` method: 

    {% highlight php %}{% raw %}
        public function __construct(array $params = array())
        {
            $this->sortByModes += array(
                static::SORT_BY_MODE_PRICE  => 'Price',
            );
            parent::__construct($params);
        }
    {% endraw %}{% endhighlight %}
7.  Finally, we need to implement the `getSearchCondition()` method in our ItemsList: 

    {% highlight php %}{% raw %}
        protected function getSearchCondition()
        {
            $result = parent::getSearchCondition();

            $result->{\XLite\Model\Repo\Product::P_ORDER_BY} = $this->getOrderBy();
            $result->moreThan10 = true;

            return $result;
        }
    {% endraw %}{% endhighlight %}

    We need to extend it in order to allow {% link "search() method" ref_2k897PfB %} in the `\XLite\Model\Repo\Product` repository class to work properly.

8.  First, we let it know that sorting must be done according to user's selected condition: 

    {% highlight php %}{% raw %}
    $result->{\XLite\Model\Repo\Product::P_ORDER_BY} = $this->getOrderBy();
    {% endraw %}{% endhighlight %}

    Here we use the `getOrderBy()` method mentioned earlier.

9.  Then, we also add our condition of displaying products, which is it must display only product that are more expensive than $10: 

    {% highlight php %}{% raw %}
    $result->moreThan10 = true;
    {% endraw %}{% endhighlight %}
10.  Finally, we need to add the `getSortByModeDefault()` method that will define a sorting option when it has not been chosen yet: 

    {% highlight php %}{% raw %}
        protected function getSortByModeDefault()
        {
            return static::SORT_BY_MODE_PRICE;
        }
    {% endraw %}{% endhighlight %}

Everything is good except `search()` method of `\XLite\Model\Repo\Produc`t class cannot yet handle our **moreThan10** condition. In order to fix this, we need to decorate the `\XLite\Model\Repo\Product` class. We create the `<X-Cart>/classes/XLite/Module/Tony/ItemsListAdminDemo/Model/Repo/Product.php` file with the following content: 

{% highlight php %}{% raw %}
<?php
// vim: set ts=4 sw=4 sts=4 et:

namespace XLite\Module\Tony\ItemsListAdminDemo\Model\Repo;

/**
 * The "product" model repository
 */
abstract class Product extends \XLite\Model\Repo\Product implements \XLite\Base\IDecorator
{
    const P_MORE_THAN_10 = 'moreThan10';

    protected function getHandlingSearchParams()
    {
        $params = parent::getHandlingSearchParams();

        $params[] = self::P_MORE_THAN_10;

        return $params;
    }

    protected function prepareCndMoreThan10(\Doctrine\ORM\QueryBuilder $queryBuilder, $value)
    {
        $result = $queryBuilder;

        if ($value) {
            $result
                ->andWhere('p.price > :price')
                ->setParameter('price', 10.00);
        }

        return $result;
    }
}
{% endraw %}{% endhighlight %}

_Note: if you need more info about `search()` method implementation, please have a look here: {% link "search() method" 8225347.html %}._

Finally, we need to display our ItemsList widget on the page, so we go to the `<X-Cart>/skins/admin/en/modules/``Tony/ItemsListAdminDemo/page/items_list_demo/body.tpl` template and define its content as follows: 

{% highlight php %}{% raw %}
<widget class="XLite\Module\Tony\ItemsListAdminDemo\View\ItemsList\ItemsListDemo" />
{% endraw %}{% endhighlight %}

That is it. Now we need to re-deploy the store and you will see our **ItemsList** that supports sorting by Price on `admin.php?target=items_list_demo` page.![]({{site.baseurl}}/attachments/8225372/8356180.png)

# Module pack

You can download this module's example from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-ItemsListAdminDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-ItemsListAdminDemo-v5_1_0.tar)

## Attachments:

* [items-list-example.png]({{site.baseurl}}/attachments/8225372/8356178.png) (image/png)  
* [items-list-example-1.png]({{site.baseurl}}/attachments/8225372/8356179.png) (image/png)  
* [demo-items-list.png]({{site.baseurl}}/attachments/8225372/8356180.png) (image/png)