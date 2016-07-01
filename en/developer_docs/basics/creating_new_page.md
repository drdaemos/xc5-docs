---
layout: article_with_sidebar
lang: en
title: 'Creating new page'
categories: [developer_docs]
---

# Introduction

This article describes how developers can create a new page in X-Cart. For instance, we want to create a page in admin area (`admin.php?target=tony_custom`) that will show some specific information. This guide explains how to achieve this task.

# Table of Contents

*   [Introduction](#Creatingnewpage-Introduction)
*   [Table of Contents](#Creatingnewpage-TableofContents)
*   [Before get started](#Creatingnewpage-Beforegetstarted)
*   [Creating page in admin area](#Creatingnewpage-Creatingpageinadminarea)
*   [Creating page via macro](#Creatingnewpage-Creatingpageviamacro)
*   [Creating page in customer area](#Creatingnewpage-Creatingpageincustomerarea)
*   [Module pack](#Creatingnewpage-Modulepack)

# Before get started

First thing to do is to [create an empty module](Step-1---creating-simplest-module_524296.html). We are creating a module with developer ID **Tony** and module ID **PageDemo**.

# Creating page in admin area

For the sake of example, our task is to create the page which will be available at `admin.php?target=tony_custom` address and will display **Hello world!** text.

1.  Create new controller class. Since we want our page to be opened at `admin.php?target=tony_custom`, the controller class must be named **TonyCustom**. If you need more info about how controllers work in X-Cart, look [here](Step-3---applying-logic-changes_8224804.html#Step3-applyinglogicchanges-GeneralX-Cartworkflow). 
2.  We create the `<X-Cart>/classes/XLite/Module/Tony/PageDemo/Controller/Admin/TonyCustom.php` file with the following content: 

    {% highlight php %}<?php

    namespace XLite\Module\Tony\PageDemo\Controller\Admin;

    class TonyCustom extends \XLite\Controller\Admin\AAdmin
    {

    }{% endhighlight %}

    As you can see, it is pretty empty, but since no data should be processed from the request, we do not need any extra methods here.

3.  Create new viewer class that will manage the data output. This viewer class must sit in the `<X-Cart>/classes/XLite/Module/Tony/PageDemo/View/Page/Admin/` directory and it must be named the same as its controller class. This way X-Cart can pick it up automatically. We are creating the `<X-Cart>/classes/XLite/Module/Tony/PageDemo/View/Page/Admin/TonyCustom.php` file with the following content: 

    {% highlight php %}<?php

    namespace XLite\Module\Tony\PageDemo\View\Page\Admin;

    /**
     * @ListChild (list="admin.center", zone="admin")
     */

    class TonyCustom extends \XLite\View\AView
    {
    	public static function getAllowedTargets()
        {
            return array_merge(parent::getAllowedTargets(), array('tony_custom'));
        }

        protected function getDefaultTemplate()
        {
            return 'modules/Tony/PageDemo/page/tony_custom/body.tpl';
        }
    }{% endhighlight %}
4.  Let us walk through each line of this code. 

    {% highlight php %}namespace XLite\Module\Tony\PageDemo\View\Page\Admin;{% endhighlight %}

    This is just a namespace definition. 

    {% highlight php %}/**
     * @ListChild (list="admin.center", zone="admin")
     */{% endhighlight %}

    This part is very important. It registers this viewer class to be displayed in the central area of admin area. 

    {% highlight php %}class TonyCustom extends \XLite\View\AView{% endhighlight %}

    Just a class definition. 

    {% highlight php %}	public static function getAllowedTargets()
        {
            return array_merge(parent::getAllowedTargets(), array('tony_custom'));
        }{% endhighlight %}

    The `getAllowedTargets()` method defines which targets will trigger this viewer class. The current implementation means that, if **target=tony_custom**, then this viewer class will display its content in the central area. If there is any other target, than this viewer class will not be even run. 

    {% highlight php %}    protected function getDefaultTemplate()
        {
            return 'modules/Tony/PageDemo/page/tony_custom/body.tpl';
        }{% endhighlight %}

    The `getDefaultTemplate()` method defines what template will be used in order to output the content. The template path can be whatever you prefer.

5.  Now it is time to create the template defined in the `getDefaultTemplate()` method, so it would display **Hello world!** text. We are creating the `<X-Cart>/skins/admin/en/modules/Tony/PageDemo/page/tony_custom/body.tpl` file with the following content: 

    {% highlight php %}Hello world!{% endhighlight %}
6.  We are done with this mod. Now it is time to re-deploy the store and check the results. If you open the following URL in your store: `admin.php?target=tony_custom`, you will see the following result:

![]({{ site.baseurl }}/attachments/8224999/8355981.png)

# Creating page via macro

You can [create a page via macro](X-Cart-SDK_7864338.html#X-CartSDK-Creatingpage), so it will save your time. In this case, all files will be created automatically and you will only have to go to the template file and define its content.

# Creating page in customer area

Imagine, we have a similar task of creating page (`cart.php?target=tony_custom`) with **Hello world!** text, but in customer area. The process would be quite the same as for creating page for admin zone.

1.  We create new controller class: `<X-Cart>/classes/XLite/Module/Tony/PageDemo/Controller/**Customer**/TonyCustom.php` . Notice that we changed the sub-directory from `Controller/**Admin**/TonyCustom.php` to `Controller/**Customer**/TonyCustom.php`, this way X-Cart will understand that this controller for customer zone, not admin. 

2.  The content of the controller class will be as follows: 

    {% highlight php %}<?php

    namespace XLite\Module\Tony\PageDemo\Controller\Customer;

    class TonyCustom extends \XLite\Controller\Customer\ACustomer
    {
    }{% endhighlight %}

    The implementation of the controller class is similar to admin's one, but it has different namespace (`XLite\Module\Tony\PageDemo\Controller\**Customer**`) and it extends different class (`\XLite\Controller\**Customer\ACustomer**`)

3.  We create new viewer class: `<X-Cart>/classes/XLite/Module/Tony/PageDemo/View/Page/**Customer**/TonyCustom.php` (again, notice change from `Page/**Admin**/TonyCustom.php` to `Page/**Customer**/TonyCustom.php` in the path) with the following content: 

    {% highlight php %}<?php

    namespace XLite\Module\Tony\PageDemo\View\Page\Customer;

    /**
     * @ListChild (list="center")
     */
    class TonyCustom extends \XLite\View\AView
    {
        public static function getAllowedTargets()
        {
            return array_merge(parent::getAllowedTargets(), array('tony_custom'));
        }

        protected function getDefaultTemplate()
        {
            return 'modules/Tony/PageDemo/page/tony_custom/body.tpl';
        }
    }{% endhighlight %}
4.  As you can see this implementation has only few differences: 

    {% highlight php %}namespace XLite\Module\Tony\PageDemo\View\Page\Customer;{% endhighlight %}

    namespace is a bit different;

    {% highlight php %}/**
     * @ListChild (list="center")
     */{% endhighlight %}

    We use this `@ListChild` directive in order to insert this viewer class into central area of customer area, instead of admin one;

    {% highlight php %}	protected function getDefaultTemplate()
        {
            return 'modules/Tony/PageDemo/page/tony_custom/body.tpl';
        }{% endhighlight %}

    The template for this viewer sits in other location. Aside from that, the implementation is the same.

5.  Finally, we need to create the template mentioned in the `getDefaultTemplate()` method. We create the `<X-Cart>/skins/**default**/en/modules/Tony/PageDemo/page/tony_custom/body.tpl` template (notice, that we create this template in the `skins/default/` directory, instead of `skins/admin/` one – it is so, because this template will be displayed in customer store-front) with **Hello world!** content.
6.  Re-deploy the store and open the `cart.php?target=tony_custom` page after that. You will see the following result:![]({{ site.baseurl }}/attachments/8224999/8355982.png)

# Module pack

You can download the module described here: [https://dl.dropboxusercontent.com/u/23858825/Tony-PageDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-PageDemo-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [tony_custom-admin-page.png]({{ site.baseurl }}/attachments/8224999/8355981.png) (image/png)  
![](images/icons/bullet_blue.gif) [tony_custom-customer-page.png]({{ site.baseurl }}/attachments/8224999/8355982.png) (image/png)