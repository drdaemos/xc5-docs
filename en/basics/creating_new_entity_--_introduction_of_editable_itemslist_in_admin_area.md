---
identifier: ryWDjW3Qw
layout: article_with_sidebar
lang: en
title: 'Creating new entity -- Introduction of editable ItemsList in admin area'
categories:
  - Developer docs

---

{% include global.html %}

# Introduction

This article describes how developers can create new entity in X-Cart store. This article's example is how to create quick messages (they are our new entities) that can be created in admin area and then 3 latest active ones will be shown in storefront.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
    *   [Creating Quick Message entity](#creating-quick-message-entity)
    *   [Creating Repository class](#creating-repository-class)
    *   [Creating interface for creating and editing Quick Messages in admin area](#creating-interface-for-creating-and-editing-quick-messages-in-admin-area)
    *   [Checking intermittent results](#checking-intermittent-results)
    *   [Showing quick messages in customer area](#showing-quick-messages-in-customer-area)
    *   [Checking the final results](#checking-the-final-results)
*   [Module pack](#module-pack)

# Implementation

First of all we {% link "create an empty module" H1Qu2b27w %} with developer ID **Tony** and module ID **NewEntityDemo**. In this module, we {% link "create a page" B1zwoW37P %} `target=quick_messages` in admin area. We create:

*   empty controller class `\XLite\Module\Tony\NewEntityDemo\Controller\Admin\QuickMessages`
*   viewer class `\XLite\Module\Tony\NewEntityDemo\View\Page\Admin\QuickMessages` with the following content: 

    {% highlight php %}{% raw %}
    <?php
    // vim: set ts=4 sw=4 sts=4 et:

    namespace XLite\Module\Tony\NewEntityDemo\View\Page\Admin;

    /**
     * Quick messages page view
     *
     * @ListChild (list="admin.center", zone="admin")
     */
    class QuickMessages extends \XLite\View\AView
    {
        /**
         * Return list of allowed targets
         *
         * @return array
         */
        public static function getAllowedTargets()
        {
            return array_merge(parent::getAllowedTargets(), array('quick_messages'));
        }

        /**
         * Return widget default template
         *
         * @return string
         */
        protected function getDefaultTemplate()
        {
            return 'modules/Tony/NewEntityDemo/page/quick_messages/body.tpl';
        }
    }
    {% endraw %}{% endhighlight %}
*   empty template `<X-Cart>/skins/admin/en/modules/Tony/NewEntityDemo/page/quick_messages/body.tpl`

## Creating Quick Message entity

In order to create a new entity in X-Cart, we have to create a new {% link "Model class" S1RinW3Qv %}. We create `<X-Cart>/classes/XLite/Module/Tony/NewEntityDemo/Model/QuickMessage.php` file with the following content: 

{% highlight php %}{% raw %}
<?php

namespace XLite\Module\Tony\NewEntityDemo\Model;

/**
 * @Entity
 * @Table (name="quick_messages")
 */

class QuickMessage extends \XLite\Model\AEntity
{
    /**
     * @Id
     * @GeneratedValue (strategy="AUTO")
     * @Column         (type="integer")
     */
	protected $id;

    /**
     * @Column (type="boolean")
     */
    protected $enabled = true;

    /**
     * @Column (type="text")
     */
    protected $body = '';
}
{% endraw %}{% endhighlight %}

Let us have a close look at this class implementation:

1.  We mark that this class describes a new entity by adding directive: 

    {% highlight php %}{% raw %}
    @Entity
    {% endraw %}{% endhighlight %}
2.  We also specify a table name where records about these entities will be stored: 

    {% highlight php %}{% raw %}
    @Table (name="quick_messages")
    {% endraw %}{% endhighlight %}
3.  Since our entity is the most basic one we use `\XLite\Model\AEntity` class as its template: 

    {% highlight php %}{% raw %}
    class QuickMessage extends \XLite\Model\AEntity
    {% endraw %}{% endhighlight %}
4.  Next, we specify each property of this class. We start with `$id`: 

    {% highlight php %}{% raw %}
        /**
         * @Id
         * @GeneratedValue (strategy="AUTO")
         * @Column         (type="integer")
         */
    	protected $id;
    {% endraw %}{% endhighlight %}

    which is marked as ID: 

    {% highlight php %}{% raw %}
    @Id
    {% endraw %}{% endhighlight %}

    It is also marked as **auto-generated** **integer** value: 

    {% highlight php %}{% raw %}
    * @GeneratedValue (strategy="AUTO")
    * @Column         (type="integer")
    {% endraw %}{% endhighlight %}
5.  Our **QuickMessage** class will also have `$enabled` property, which will define whether quick message is active or not: 

    {% highlight php %}{% raw %}
        /**
         * @Column (type="boolean")
         */
        protected $enabled = true;
    {% endraw %}{% endhighlight %}

    As you can see, type of this property is **boolean**.

6.  Finally, we will have a `$body` property that will define text of quick message: 

    {% highlight php %}{% raw %}
        /**
         * @Column (type="text")
         */
        protected $body = '';
    {% endraw %}{% endhighlight %}

We have created the **Model** class and now we need to create **repository** class for QuickMessage entity.

## Creating Repository class

Repository class is used in order to pull entities' info from the database. We need an implementation of {% link "`search()` method" S1Qh5WhQP %} in it in order to allow proper work with ItemsList.

We create the `<X-Cart>/classes/XLite/Module/Tony/NewEntityDemo/Model/Repo/QuickMessage.php` file with the following content: 

{% highlight php %}{% raw %}
<?php

namespace XLite\Module\Tony\NewEntityDemo\Model\Repo;

class QuickMessage extends \XLite\Model\Repo\ARepo
{  
    protected function getIdField()
    {
        return 'id';
    }
    public function search(\XLite\Core\CommonCell $cnd, $countOnly = false)
    {
        $queryBuilder = $this->createQueryBuilder('a');
        $this->currentSearchCnd = $cnd;

        foreach ($this->currentSearchCnd as $key => $value) {
            $this->callSearchConditionHandler($value, $key, $queryBuilder, $countOnly);
        }

        return $countOnly
            ? $this->searchCount($queryBuilder)
            : $this->searchResult($queryBuilder);
    }

    public function searchCount(\Doctrine\ORM\QueryBuilder $qb)
    {
        $qb->select('COUNT(DISTINCT a.' . $this->getIdField() .  ')');
        return intval($qb->getSingleScalarResult());
    }

    public function searchResult(\Doctrine\ORM\QueryBuilder $qb)
    {
        return $qb->getResult();
    }

    protected function callSearchConditionHandler($value, $key, \Doctrine\ORM\QueryBuilder $queryBuilder, $countOnly)
    {
        if ($this->isSearchParamHasHandler($key)) {
            $this->{'prepareCnd' . ucfirst($key)}($queryBuilder, $value, $countOnly);
        }
    }

    protected function isSearchParamHasHandler($param)
    {
        return in_array($param, $this->getHandlingSearchParams());
    }

    protected function getHandlingSearchParams()
    {
       return array();
    }
}
{% endraw %}{% endhighlight %}

Although, the implementation of repository class looks quite cumbersome, basically we only have to have `search()` method implemented and other 6 additional methods are just for keeping structure of the code atomic.

After creating **Model** and **Repository** classes, we are done with creating entity classes.

## Creating interface for creating and editing Quick Messages in admin area

Now it is time to add a form where you can create, edit or delete quick messages to the `target=quick_messages` page. This step can be divided to sub-steps:

1.  Create **ItemsList** widget;
2.  Create a form widget that will be able to submit **ItemsList** values;
3.  Add **ItemsList** widget and form around it to a template of the `target=quick_messages` page;
4.  Add a method to our controller that will be able to process requests of submitting **ItemsList** form.

Let us start with creating **ItemsList**. ItemsList is a widget that displays info about entities in the structured format. Our widget should produce a result similar to the snapshot below: 

![]({{site.baseurl}}/attachments/8225303/8356165.png)

As you may have noticed, admin area of X-Cart is full of similar **ItemsLists**. Moreover, product and category lists in storefront are ItemsLists too, even though they look a bit differently.

In order to create an ItemsList for quick messages, we create the `<X-Cart>/classes/XLite/Module/Tony/NewEntityDemo/View/ItemsList/Model/QuickMessage.php` file with the following content: 

{% highlight php %}{% raw %}
<?php

namespace XLite\Module\Tony\NewEntityDemo\View\ItemsList\Model;

class QuickMessage extends \XLite\View\ItemsList\Model\Table
{
    protected function defineColumns()
    {
        return array(
            'body' => array(
                static::COLUMN_CLASS => 'XLite\View\FormField\Inline\Input\Text',
                static::COLUMN_NAME => \XLite\Core\Translation::lbl('Quick message text'),
                static::COLUMN_ORDERBY => 100,
            ),
        );
    }

    protected function defineRepositoryName()
    {
        return 'XLite\Module\Tony\NewEntityDemo\Model\QuickMessage';
    }

    protected function isSwitchable()
    {
        return true;
    }

    protected function isRemoved()
    {
        return true;
    } 

    protected function isInlineCreation()
    {
        return static::CREATE_INLINE_BOTTOM;
    }

    protected function getCreateURL()
    {
        return \XLite\Core\Converter::buildUrl('quick_messages');
    }
}
{% endraw %}{% endhighlight %}

1.  Our ItemsList widget is basic that is why we extend the `\XLite\View\ItemsList\Model\Table` class: 

    {% highlight php %}{% raw %}
    class QuickMessage extends \XLite\View\ItemsList\Model\Table
    {% endraw %}{% endhighlight %}

    This class defines the basic look of **ItemsList** similar to other ones in admin area.

2.  We define which entities must be displayed in this ItemList: 

    {% highlight php %}{% raw %}
        protected function defineRepositoryName()
        {
            return 'XLite\Module\Tony\NewEntityDemo\Model\QuickMessage';
        }
    {% endraw %}{% endhighlight %}

    In our case, we should display **quick messages** there.

3.  Then, we define that our ItemsList must display **enable/disable** icon – `isSwitchable()` method – and **remove** icon – `isRemoved()` method: 

    {% highlight php %}{% raw %}
        protected function isSwitchable()
        {
            return true;
        }

        protected function isRemoved()
        {
            return true;
        }
    {% endraw %}{% endhighlight %}

    `isSwitchable()` method searches for `$enabled` property in the model class – `\XLite\Module\Tony\NewEntityDemo\Model\QuickMessage` in our case–  in order to mark it either active or disabled.

4.  Next, we define which model fields must be displayed in the ItemsList. In our case, we need to display only **body** properties there:  

    {% highlight php %}{% raw %}
        protected function defineColumns()
        {
            return array(
                'body' => array(
                    static::COLUMN_CLASS => 'XLite\View\FormField\Inline\Input\Text',
                    static::COLUMN_NAME => \XLite\Core\Translation::lbl('Quick message text'),
                    static::COLUMN_ORDERBY => 100,
                ),
            );
        }
    {% endraw %}{% endhighlight %}

    Value from the `COLUMN_NAME` element will be displayed in the header of ItemsList. Key of the array – **body**, in our case – defines what is a property of an object where the value from the form will be saved to.

5.  Finally, we need to add a button for creating new entities and this button should be placed at the bottom of the ItemsList: 

    {% highlight php %}{% raw %}
        protected function isInlineCreation()
        {
            return static::CREATE_INLINE_BOTTOM;
        }

        protected function getCreateURL()
        {
            return \XLite\Core\Converter::buildUrl('quick_messages');
        }
    {% endraw %}{% endhighlight %}

We are done with **ItemsList** widget. Next step is to create a widget of a form that will wrap up our ItemList widget and will allow submitting its info to X-Cart.

We create the `<X-Cart>/classes/XLite/Module/Tony/NewEntityDemo/View/Form/ItemsList/QuickMessage.php` file with the following content: 

{% highlight php %}{% raw %}
<?php

namespace XLite\Module\Tony\NewEntityDemo\View\Form\ItemsList;

class QuickMessage extends \XLite\View\Form\ItemsList\AItemsList
{
	protected function getDefaultTarget()
    {
        return 'quick_messages';
    }

    protected function getDefaultAction()
    {
        return 'update';
    }
}
{% endraw %}{% endhighlight %}

Although it sounds quite complex – creating a form class – in fact this class contains just two methods:

1.  `getDefaultTarget()` method defines an **action** field of the form. In our case, the request will be submitted to `admin.php?target=quick_messages` page;
2.  `getDefaultAction()` method defines a value of `<input type="hidden" name="action" value="" />` element in this form. This value will be used in order to allow controller run proper routine that will handle data submitted. Of course, we will have to add corresponding method to controller class and we will do it a bit later.

Now we are done with the form widget class and we need to call **ItemsList** and its form widgets in the template.

We go to the `<X-Cart>/skins/admin/en/modules/Tony/NewEntityDemo/page/quick_messages/body.tpl` template – that has been created when we created the **target=quick_messages** page – and specify the following code there: 

{% highlight php %}{% raw %}
<widget class="XLite\Module\Tony\NewEntityDemo\View\Form\ItemsList\QuickMessage" name="list" />
	<widget class="XLite\Module\Tony\NewEntityDemo\View\ItemsList\Model\QuickMessage" />
<widget name="list" end />
{% endraw %}{% endhighlight %}

As you can see, we call the `\XLite\Module\Tony\NewEntityDemo\View\ItemsList\Model\QuickMessage` widget there and wrap it up into form widget –`\XLite\Module\Tony\NewEntityDemo\View\Form\ItemsList\QuickMessage`.

Finally, we need to adjust our controller class and tell it what to do with the data that submitted to `admin.php?target=quick_message` page with **action=update**.

We go to the `<X-Cart>/classes/XLite/Module/Tony/NewEntityDemo/Controller/Admin/QuickMessages.php` file and add the following method into the class: 

{% highlight php %}{% raw %}
	protected function doActionUpdate()
	{
    	$list = new \XLite\Module\Tony\NewEntityDemo\View\ItemsList\Model\QuickMessage;
    	$list->processQuick();
	}
{% endraw %}{% endhighlight %}

This method will be called only when **action=update** param is be passed in the request. Implementation of this method means that we first create an **ItemsList** object based on values from the request: 

{% highlight php %}{% raw %}
$list = new \XLite\Module\Tony\NewEntityDemo\View\ItemsList\Model\QuickMessage;
{% endraw %}{% endhighlight %}

Then, we update, create and remove entities based on the info in this ItemsList. These processes are described in method: 

{% highlight php %}{% raw %}
$list->processQuick();
{% endraw %}{% endhighlight %}

Finally, we open the **target=quick_messages** page with updated data.

## Checking intermittent results

Now we are done with the admin part of this mod and we can create our quick messages in admin area. Re-deploy the store and go to `admin.php?target=quick_messages` page. You should see the following result:![]({{site.baseurl}}/attachments/8225303/8356166.png)

Of course, we do not have any quick messages yet, but if you click **Create** button, you will be able to create some:![]({{site.baseurl}}/attachments/8225303/8356167.png)

Once you add some quick messages, do not forget to save results by clicking **Save changes** button.

## Showing quick messages in customer area

We will show three latest quick messages in {% link "sidebar box" rkf_sbnmP %} in the left-hand side menu in storefront.

First, we create the {% link "viewer class" rkeo2b3XP %}. For that we create the `<X-Cart>/classes/XLite/Module/Tony/NewEntityDemo/View/QuickMessageMenu.php` file with the following content: 

{% highlight php %}{% raw %}
<?php

namespace XLite\Module\Tony\NewEntityDemo\View;

/**
 * @ListChild (list="sidebar.first", zone="customer", weight="10")
 */

class QuickMessageMenu extends \XLite\View\SideBarBox
{
	protected function getHead()
	{
		return 'Store quick messages';
	}

	protected function getDir()
	{
		return 'modules/Tony/NewEntityDemo/quickmessage';
	}

	protected function getMessages()
	{
		$return = \XLite\Core\Database::getRepo('\XLite\Module\Tony\NewEntityDemo\Model\QuickMessage')->findNewest();

		return $return;
	}
}
{% endraw %}{% endhighlight %}

The implementation is very similar to one showed in the basic guide of {% link "creating sidebar menu in storefront" Creating-sidebar-menu-in-customer-area_7505759.html %}, but there is also `getMessages()` method. This method is aimed to pull three latest quick messages from the database. However, `findNewest()` method does not exist in our `\XLite\Module\Tony\NewEntityDemo\Model\Repo\QuickMessage` class yet and we have to create it.

We go to the `<X-Cart>/classes/XLite/Module/Tony/NewEntityDemo/Model/Repo/QuickMessage.php` file and add one more method there: 

{% highlight php %}{% raw %}
    public function findNewest()
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.enabled = 1')
            ->addOrderBy('a.id', 'DESC')
            ->setFirstResult(0)
            ->setMaxResults(3)
            ->getResult();
    }
{% endraw %}{% endhighlight %}

Finally, we have to create the folder that was mentioned in our viewer class – `modules/Tony/NewEntityDemo/quickmessage` – so we create  
`<X-Cart>/skins/default/en/modules/Tony/NewEntityDemo/quickmessage/` folder with the `body.tpl` template inside it. The content of this template is as follows: 

{% highlight php %}{% raw %}
{if:getMessages()}
	<ul class="menu menu-list messages">
		{foreach:getMessages(), message}
			<li>{message.body}</li>
		{end:}
	</ul>
{end:}
{% endraw %}{% endhighlight %}

This code can be read as follows. If there are quick messages – `{if:getMessages()}` – then we create `<ul>` element and walk through each element returned by `getMessages()` method – `{foreach:getMessages(), message}` – displaying text of each quick message inside `<li>` element – `<li>{message.body}</li>`.

## Checking the final results

We are done with this mod and we have to re-deploy the store one more time. If you have any active quick messages in admin area, you will see the following picture in the storefront: ![]({{site.baseurl}}/attachments/8225303/8356168.png)

# Module pack

You can download the code of this module from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-NewEntityDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-NewEntityDemo-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [quick-messages-items-list.png]({{site.baseurl}}/attachments/8225303/8356165.png) (image/png)  
![](images/icons/bullet_blue.gif) [empty-quick-messages-admin.png]({{site.baseurl}}/attachments/8225303/8356166.png) (image/png)  
![](images/icons/bullet_blue.gif) [quick-messages-admin.png]({{site.baseurl}}/attachments/8225303/8356167.png) (image/png)  
![](images/icons/bullet_blue.gif) [quick-messages-customer.png]({{site.baseurl}}/attachments/8225303/8356168.png) (image/png)