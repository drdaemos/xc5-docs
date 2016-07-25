---
identifier: ref_SmN15f4r
updated_at: 2014-12-22 00:00
layout: article_with_sidebar
lang: en
title: 'How to find out what page is currently running'
categories:
  - Developer docs

---


# Introduction

This article teaches X-Cart developers how to determine what page is currently opened. For the sake of example, we will create a simple mod that will show different messages depending on whether **home**, **category** or **checkout** page is opened. If any other page is opened, then no message will be shown.

This article assumes that you know {% link "how to work with viewer classes" ref_6dMJsZ63 %} in X-Cart.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module pack](#module-pack)

# Implementation

To get started we {% link "create an empty module" ref_G2mlgckf %} with developer ID **Tony** and module ID **ControllerDetectionDemo**. Then, we create a new view class inside this module. We create the
`<X-Cart>/classes/XLite/Module/Tony/ControllerDetectionDemo/View/OurWidget.php` class with the following content:

{% raw %}```php
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
```{% endraw %}

Let us have a closer look at this class implementation:

1.  `@ListChild` directive says that our widget will be displayed right after `</head>` tag: 

    {% raw %}```php
    /**
     * @ListChild (list="body", weight="1", zone="customer")
     */
    ```{% endraw %}

2.  `getDefaultTemplate()` method defines that our viewer class will use `<X-Cart>/skins/default/en/modules/Tony/ControllerDetectionDemo/text.tpl` template in order to output the result:

    {% raw %}```php
    	public function getDefaultTemplate() 
    	{
    		return 'modules/Tony/ControllerDetectionDemo/text.tpl';
    	}
    ```{% endraw %}

3.  `getAllowedTargets()` method tells X-Cart that this widget must be displayed on home, category and checkout pages only:

    {% raw %}```php
    	public static function getAllowedTargets() 
    	{
    		$list = parent::getAllowedTargets();

    		$list[] = 'checkout'; // checkout page
    		$list[] = 'main'; // home page
    		$list[] = 'category'; // category page

    		return $list;
    	}
    ```{% endraw %}

4.  `getOurText()` method defines the message that will be shown to a customer: 

    {% raw %}```php
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
    ```{% endraw %}

    As you can see, we analyze the **controller** that is fetched by calling `\XLite::getController()` method.

Now, it is time to create a template defined in the `getDefaultTemplate()` method. We create the `<X-Cart>/skins/default/en/modules/Tony/ControllerDetectionDemo/text.tpl` template with the following content: 

{% raw %}```php
<div>{getOurText()}</div>

```{% endraw %}

We call our `getOurText()` method that will analyze current controller class and define a message for a customer.

_Note: we could have also checked the current page by analyzing **target** parameter of `{% link "\XLite\Core\Request" ref_pvZ8nad3 %}` object._

Now, we need to re-deploy the store and check the results in customer store-front. You should see messages similar to:![]({{site.baseurl}}/attachments/524292/8356147.png)

# Module pack

You can download this module pack from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-ControllerDetectionDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-ControllerDetectionDemo-v5_1_0.tar)

## Attachments:

* [this-is-checkout-page.png]({{site.baseurl}}/attachments/524292/8356147.png) (image/png)