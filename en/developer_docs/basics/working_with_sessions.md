---
layout: article_with_sidebar
lang: en
title: 'Working with sessions'
categories: [developer_docs]
---

{% include global.html %}

# Introduction

This guide will give an example how to work with sessions in X-Cart. X-Cart identifies a session data by a value stored in **xid** cookie – unless changed by [decoration]({{ baseurl_lang }}/developer_docs/getting_started/step_3_-_applying_logic_changes.html) of `\XLite\Core\Session` class.

For the sake of example, we will create a module with a page `cart.php?target=session_demo` and this page can be called with the `session_value` parameter. For the very first time this page will display the **Session value has not been specified yet** message and it will remain the same until the **session_value** parameter is passed. Once it is passed, the page will display the **Session value is: {session_value}** message. Even if you open this page without **session_value** parameter after that, the message **Session value is: {session_value}** message will be displayed with the latest **session_value** submitted.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module example](#module-example)

# Implementation

We start with [creating an empty module]({{ baseurl_lang }}/developer_docs/getting_started/step_1_-_creating_simplest_module.html) with developer ID **Tony** and module ID **SessionDemo**. Then we [create a page]({{ baseurl_lang }}/developer_docs/basics/creating_new_page.html) `cart.php?target=session_demo` in our module. For that we create:

*   an empty controller class `\XLite\Module\Tony\SessionDemo\Controller\Customer\SessionDemo`;
*   a page viewer class `\XLite\Module\Tony\SessionDemo\View\Page\Customer\SessionDemo` with the following content: 

    {% highlight php %}<?php
    // vim: set ts=4 sw=4 sts=4 et:

    namespace XLite\Module\Tony\SessionDemo\View\Page\Customer;

    /**
     * Session demo page view
     *
     * @ListChild (list="center")
     */
    class SessionDemo extends \XLite\View\AView
    {
        /**
         * Return list of allowed targets
         *
         * @return array
         */
        public static function getAllowedTargets()
        {
            return array_merge(parent::getAllowedTargets(), array('session_demo'));
        }

        /**
         * Return widget default template
         *
         * @return string
         */
        protected function getDefaultTemplate()
        {
            return 'modules/Tony/SessionDemo/page/session_demo/body.tpl';
        }
    }{% endhighlight %}
*   an empty page template `<X-Cart>/skins/default/en/``modules/Tony/SessionDemo/page/session_demo/body.tpl`.

Now we need to check each [request]({{ baseurl_lang }}/developer_docs/basics/retrieving_data_from_the_request.html) to `cart.php?target=session_demo` page and if there is **session_value** parameter, then we need to save it to the session variable. To achieve that we are going to implement custom `handleRequest()` method in our [controller class]({{ baseurl_lang }}/developer_docs/basics/controller_class.html) `\XLite\Module\Tony\SessionDemo\Controller\Customer\SessionDemo`: 

{% highlight php %}    public function handleRequest()
    {
        $sessionValue = \XLite\Core\Request::getInstance()->session_value;

        if (!empty($sessionValue)) {
            \XLite\Core\Session::getInstance()->s_value = $sessionValue;
        }

        parent::handleRequest();
    }{% endhighlight %}

The code that saves the `session_value` param into a session is `\XLite\Core\Session::getInstance()->s_value = $sessionValue;`. As you can see, saving variable into a session is as simple as assigning a value.

Now, we need to add a method to our controller that will fetch a value of this session variable. It will be as follows: 

{% highlight php %}    public function getSessionValue() 
    {
        $return = '';

        if (!empty(\XLite\Core\Session::getInstance()->s_value)) {
            $return = \XLite\Core\Session::getInstance()->s_value;
        }

        return $return;
    }{% endhighlight %}

By default it returns an **empty string**, but if there is any value stored in the **s_value** session variable, then it will return this value.

The final version of `\XLite\Module\Tony\SessionDemo\Controller\Customer\SessionDemo` class will be as follows: 

{% highlight php %}<?php
// vim: set ts=4 sw=4 sts=4 et:

namespace XLite\Module\Tony\SessionDemo\Controller\Customer;

/**
 * Session demo controller
 */
class SessionDemo extends \XLite\Controller\Customer\ACustomer
{
    public function handleRequest()
    {
        $sessionValue = \XLite\Core\Request::getInstance()->session_value;

        if (!empty($sessionValue)) {
            \XLite\Core\Session::getInstance()->s_value = $sessionValue;
        }

        parent::handleRequest();
    }

    public function getSessionValue() 
    {
        $return = '';

        if (!empty(\XLite\Core\Session::getInstance()->s_value)) {
            $return = \XLite\Core\Session::getInstance()->s_value;
        }

        return $return;
    }
}{% endhighlight %}

Now we need to define dynamically generated content of our page and mod will be done. We go to the `<X-Cart>/skins/default/en/``modules/Tony/SessionDemo/page/session_demo/body.tpl` template and define its content as follows: 

{% highlight php %}{if:getSessionValue()}
Session value is: {getSessionValue()}
{else:}
Session value has not been specified yet
{end:}{% endhighlight %}

If `getSessionValue()` returns non-empty value – empty string is considered as an empty value – then we display the **Session value has not been specified yet** message, otherwise we display the message **Session value is: session_value**.

That is it. Now we need to re-deploy the store and check the results. Go to your `cart.php?target=session_demo` page and you will see the following result:![]({{ site.baseurl }}/attachments/8225420/8356194.png)

Then, try to open this page as `cart.php?target=session_demo&session_value=foo` and you will see the following result:![]({{ site.baseurl }}/attachments/8225420/8356195.png)

If you try to open the same page as `cart.php?target=session_demo`, you will still see the result as follows: ![]({{ site.baseurl }}/attachments/8225420/8356195.png)

and in order to see the initial message, you will have to clean up your cookies.

# Module example

This module pack can be downloaded from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-SessionDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-SessionDemo-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [no-session-value.png]({{ site.baseurl }}/attachments/8225420/8356194.png) (image/png)  
![](images/icons/bullet_blue.gif) [session-value-foo.png]({{ site.baseurl }}/attachments/8225420/8356195.png) (image/png)