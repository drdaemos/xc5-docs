---
layout: article_with_sidebar
lang: en
title: 'How to find out what page is currently running'
categories: [developer_docs]

---

{% include global.html %}

# Introduction

This article teaches X-Cart developers how to determine what page is currently opened. For the sake of example, we will create a simple mod that will show different messages depending on whether **home**, **category** or **checkout** page is opened. If any other page is opened, then no message will be shown.

This article assumes that you know [how to work with viewer classes]({{ baseurl_lang }}/basics/working_with_viewer_classes.html) in X-Cart.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module pack](#module-pack)

# Implementation

To get started we [create an empty module]({{ baseurl_lang }}/getting_started/step_1_-_creating_simplest_module.html) with developer ID **Tony** and module ID **ControllerDetectionDemo**. Then, we create a new view class inside this module. We create the  
`<X-Cart>/classes/XLite/Module/Tony/ControllerDetectionDemo/View/OurWidget.php` class with the following content:

{% highlight php %}{% raw %}
<?php

namespace XLite\Module\Tony\ControllerDetectionDemo\View;

/**
 * @ListChild (list="body", weight="1", zone="customer")
 */

class OurWidget extends \XLite\View\AView
{
	public function getDefaultTemplate() 
	{
		return 'modules/Tony/ControllerDetectionDemo/text.tpl';
	}

	public static function getAllowedTargets() 
	{
		$list = parent::getAllowedTargets();

		$list[] = 'checkout'; // checkout page
		$list[] = 'main'; // home page
		$list[] = 'category'; // category page

		return $list;
	}

	public function getOurText()
	{
		$return = 'no text';

		if (\XLite::getController() instanceof \XLite\Controller\Customer\Checkout) {
			$return = 'This is checkout page';
		} elseif (\XLite::getController() instanceof \XLite\Controller\Customer\Main) {
			$return = 'This is home page';
		} elseif (\XLite::getController() instanceof \XLite\Controller\Customer\Category) {
			$return = 'This is a category page';
		}

		return $return;
	}
}
{% endraw %}{% endhighlight %}

Let us have a closer look at this class implementation:

1.  `@ListChild` directive says that our widget will be displayed right after `</head>` tag: 

    {% highlight php %}{% raw %}
    /**
     * @ListChild (list="body", weight="1", zone="customer")
     */
    {% endraw %}{% endhighlight %}
2.  `getDefaultTemplate()` method defines that our viewer class will use `<X-Cart>/skins/default/en/modules/Tony/ControllerDetectionDemo/text.tpl` template in order to output the result:

    {% highlight php %}{% raw %}
    	public function getDefaultTemplate() 
    	{
    		return 'modules/Tony/ControllerDetectionDemo/text.tpl';
    	}
    {% endraw %}{% endhighlight %}
3.  `getAllowedTargets()` method tells X-Cart that this widget must be displayed on home, category and checkout pages only:

    {% highlight php %}{% raw %}
    	public static function getAllowedTargets() 
    	{
    		$list = parent::getAllowedTargets();

    		$list[] = 'checkout'; // checkout page
    		$list[] = 'main'; // home page
    		$list[] = 'category'; // category page

    		return $list;
    	}
    {% endraw %}{% endhighlight %}
4.  `getOurText()` method defines the message that will be shown to a customer: 

    {% highlight php %}{% raw %}
    	public function getOurText()
    	{
    		$return = 'no text';

    		if (\XLite::getController() instanceof \XLite\Controller\Customer\Checkout) {
    			$return = 'This is checkout page';
    		} elseif (\XLite::getController() instanceof \XLite\Controller\Customer\Main) {
    			$return = 'This is home page';
    		} elseif (\XLite::getController() instanceof \XLite\Controller\Customer\Category) {
    			$return = 'This is a category page';
    		}

    		return $return;
    	}
    {% endraw %}{% endhighlight %}

    As you can see, we analyze the **controller** that is fetched by calling `\XLite::getController()` method.

Now, it is time to create a template defined in the `getDefaultTemplate()` method. We create the `<X-Cart>/skins/default/en/modules/Tony/ControllerDetectionDemo/text.tpl` template with the following content: 

{% highlight php %}{% raw %}
<div>{getOurText()}</div>

{% endraw %}{% endhighlight %}

We call our `getOurText()` method that will analyze current controller class and define a message for a customer.

_Note: we could have also checked the current page by analyzing **target** parameter of `[\XLite\Core\Request]({{ baseurl_lang }}/basics/retrieving_data_from_the_request.html)` object._

Now, we need to re-deploy the store and check the results in customer store-front. You should see messages similar to:![]({{ site.baseurl }}/attachments/524292/8356147.png)

# Module pack

You can download this module pack from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-ControllerDetectionDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-ControllerDetectionDemo-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [this-is-checkout-page.png]({{ site.baseurl }}/attachments/524292/8356147.png) (image/png)