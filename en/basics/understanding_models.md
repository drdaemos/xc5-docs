---
layout: article_with_sidebar
lang: en
title: 'Understanding Models'
---
# Introduction

X-Cart primarily works with **Model** objects. For instance, product, category, order, image, user are all Model objects. This article gives an introduction to what is Model classes and how to work with them. 

For the sake of example, we will create a **TestEntity** class which will have two fields: **id** and **text**. Then, we will see how it is possible to create a new TestEntity object, define some text for it and then save it to the database.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module pack](#module-pack)

# Implementation

We start with [creating an empty module]({{ baseurl_lang }}/getting_started/step_1_-_creating_simplest_module.html) with developer ID **Tony** and module ID **RepoDemo**.

Once it is created, we create our **Model** class. For that, we create `<X-Cart>/classes/XLite/Module/Tony/RepoDemo/Model/TestEntity.php` file with the following content: 

{% highlight php %}{% raw %}
<?php

namespace XLite\Module\Tony\RepoDemo\Model;

/**
 * @Entity
 * @Table (name="test_entities")
 */

class TestEntity extends \XLite\Model\AEntity
{
    /**
     * @Id
     * @GeneratedValue (strategy="AUTO")
     * @Column         (type="integer")
     */
    protected $id;

    /**
     * @Column (type="text")
     */
    protected $text;
}
{% endraw %}{% endhighlight %}

Let us have a closer look at what we are doing here:

1.  We start with defining [namespace]({{ baseurl_lang }}/misc/x-cart_classes_structure_and_namespaces.html): 

    {% highlight php %}{% raw %}
    namespace XLite\Module\Tony\RepoDemo\Model;
    {% endraw %}{% endhighlight %}
2.  Then in [DocBlocks](http://www.phpdoc.org/docs/latest/guides/docblocks.html) comments we define that this class is a new entity: 

    {% highlight php %}{% raw %}
    @Entity
    {% endraw %}{% endhighlight %}

    and it must be stored in the `xc_**test_entities**` table (assuming you have not changed table prefix in `<X-Cart/etc/config.php`): 

    {% highlight php %}{% raw %}
    @Table (name="test_entities")
    {% endraw %}{% endhighlight %}
3.  Our class is the basic one that is why it extends `\XLite\Model\AEntity` class: 

    {% highlight php %}{% raw %}
    class TestEntity extends \XLite\Model\AEntity
    {% endraw %}{% endhighlight %}
4.  Our **TestEntity** has two properties. First is `$id` that is unique identifier of TestEntity in the database: 

    {% highlight php %}{% raw %}
        /**
         * @Id
         * @GeneratedValue (strategy="AUTO")
         * @Column         (type="integer")
         */
    	protected $id; 
    {% endraw %}{% endhighlight %}

    That is why we mark this property with `@Id` tag. We also specify that it has in an **integer** type and its value must be **automatically** **generated** upon creating a new object.

5.  The second property is `$text` that must have **TEXT** MySQL type: 

    {% highlight php %}{% raw %}
        /**
         * @Column (type="text")
         */
        protected $text;
    {% endraw %}{% endhighlight %}

We are done with creating an entity class.

When we re-deploy the store X-Cart will create `xc_test_entities` table with needed columns itself, we do not have to worry about it. Also, as you may have noticed TestEntity's properties are declared as **protected**, so they are not visible outside of an object, however X-Cart will create **getter** and **setter** methods for them automatically. In `<X-Cart>/var/run/classes/` folder, our class will be append with `getId()`, `getText()` and `setText()` methods. `setId()` method will not be created, because X-Cart knows that this field is an ID and cannot be altered at all.

Now, we create the `test.php` script in X-Cart's root and start experimenting with our **TestEntity** class. Here is a content of the `test.php` file: 

{% highlight php %}{% raw %}
<?php

//X-Cart initializtion
require_once 'top.inc.php';

// pulling all TestEntity objects from database
$result = \XLite\Core\Database::getRepo('\XLite\Module\Tony\RepoDemo\Model\TestEntity')->findAll();

// it should be empty
echo 'there should be no records ' . var_dump($result) . '<br />';

// create new TestEntity
$entity = new \XLite\Module\Tony\RepoDemo\Model\TestEntity();

// let Entity Manager "know" about this entity
\XLite\Core\Database::getEM()->persist($entity);

// set text of for our TestEntity
$entity->setText('test value');

// save results to DB
\XLite\Core\Database::getEM()->flush();

// destroy object in PHP
unset($entity);

// pulling info about saved TestEntities
$result = \XLite\Core\Database::getRepo('\XLite\Module\Tony\RepoDemo\Model\TestEntity')->findAll();

// displaying text of TestEntities
foreach ($result as $entity) {
	echo 'entity text: ' . $entity->getText() . '<br />';
}
{% endraw %}{% endhighlight %}

After running this script you should get the following results: 

{% highlight php %}{% raw %}
there should be no records array ( )
entity text: test value
{% endraw %}{% endhighlight %}

If you run the script the second time, you will see that first pulling of **NewEntities** will actually get you some results and the output will be a bit different as there are two TestEntities in the database now: 

{% highlight php %}{% raw %}
there should be no records array ( 0 => XLite\Module\Tony\RepoDemo\Model\TestEntity::__set_state(array( 'id' => 1, 'text' => 'test value', )), )
entity text: test value
entity text: test value
{% endraw %}{% endhighlight %}

# Module pack

You can download this module's example from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-RepoDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-RepoDemo-v5_1_0.tar)