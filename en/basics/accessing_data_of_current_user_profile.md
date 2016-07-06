---
layout: article_with_sidebar
lang: en
title: 'Accessing data of current user profile'
---
# Introduction

This article shows approaches of how to access data of current user in X-Cart. For instance, you are logged in as **John Doe**, how can X-Cart know what is your name? This article will show you how to pull this info.

For the sake of example, we will create a new page that will be accessible via `cart.php?target=profile_demo` URL and it will display message '**anonymous customer**', if customer is a guest or it will display '**customer name (customer@email.com)**' message, if customer is logged in.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module pack](#module-pack)

# Implementation

Before we get started, we [create an empty module]({{ baseurl_lang }}/getting_started/step_1_-_creating_simplest_module.html) with developer ID **Tony** and module ID **ProfileDemo**. Also, we [create a new page]({{ baseurl_lang }}/basics/creating_new_page.html#Creatingnewpage-Creatingpageincustomerarea) that will be accessible via `cart.php?target=profile_demo` URL.

Once it is done, we go to the `<X-Cart>/classes/XLite/Module/Tony/ProfileDemo/Controller/Customer/ProfileDemo.php` file and add the following method there:

{% highlight php %}{% raw %}
	public function isAnonymous()
	{
		$profile = \XLite\Core\Auth::getInstance()->getProfile();
		return $profile ? $profile->getAnonymous() : true;
	}
{% endraw %}{% endhighlight %}

This method will be used in the template of our page in order to determine whether the current user is logged in. The implementation of this method shows you how you can access data of the current profile in the PHP code. You simply call this construction: 

{% highlight php %}{% raw %}
$profile = \XLite\Core\Auth::getInstance()->getProfile();
{% endraw %}{% endhighlight %}

and the info about current account will be pulled into `$profile` variable that is an instance of `\XLite\Model\Profile` class (see [more info about classnames]({{ baseurl_lang }}/misc/x-cart_classes_structure_and_namespaces.html) in X-Cart).

Now it is time to edit this page's template and we go to the `<X-Cart>/skins/default/en/modules/Tony/ProfileDemo/page/profile_demo/body.tpl` and define its content as follows: 

{% highlight php %}{% raw %}
{if:isAnonymous()}
	This is a guest account
{else:}
	This is user: {profile.getName()} ({profile.getLogin()})
{end:}
{% endraw %}{% endhighlight %}

In `if` condition we use the method we defined in the controller class, if it is `true`, then we output plain text as **This is a guest account.** Otherwise, we pull info about current profile by calling `{profile.getName}` and `{profile.getLogin}` constructions. These constructions are equal to calling `getProfile()->getName()` and `getProfile()->getLogin()` out of our controller class.

As you may have noticed, we did not really need the `isAnonymous()` method in our controller class at all as we could have performed the same check by calling `{profile.isAnonymous}` in the template. You are right, but I wanted to show you how to get profile data in PHP code.

After we save the template, we are done with this mod. Now we need to re-deploy the store and check the results in customer area by opening `cart.php?target=profile_demo` URL. It will return the following result:

![]({{ site.baseurl }}/attachments/8225230/8356123.png)

# Module pack

You can download this module from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-ProfileDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-ProfileDemo-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [account-info-on-custom-page.png]({{ site.baseurl }}/attachments/8225230/8356123.png) (image/png)