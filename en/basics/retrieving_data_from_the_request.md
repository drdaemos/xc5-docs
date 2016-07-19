---
identifier: ref_HgL8OQ5w
updated_at: 2014-11-25 00:00
layout: article_with_sidebar
lang: en
title: 'Retrieving data from the request'
categories:
  - Developer docs

---


# Introduction

This article teaches X-Cart developers how to retrive data from request to end-points. For the sake of example, we will create a mod that will work as follows:

1.  There will be a page that can be accessed as `cart.php?target=tony`. Please, check the {% link "previous guide" ref_OkHzgi1f %} in order to learn how to approach such tasks.
2.  You can call this page as `cart.php?target=tony&**param**=foo&**param2**=bar` and this page will display values of these parameters as shown below:![]({{site.baseurl}}/attachments/524294/8355983.png)

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Module pack](#module-pack)

# Implementation

1.  We {% link "create a module" ref_TZnqVJsw %} with developer ID **Tony** and module ID **RequesDemo**.
2.  We {% link "create a page" Creating-new-page_8224999.html %} with **target=tony** customer area. Eventually, we will have three files in the module:  
    - `<X-Cart>/classes/XLite/Module/Tony/RequestDemo/Controller/Customer/Tony.php  
    `- `<X-Cart>/classes/XLite/Module/Tony/RequestDemo/View/Page/Customer/Tony.php`  
    - `<X-Cart>/skins/default/en/modules/Tony/RequestDemo/page/tony/body.tpl`
3.  We define the template's content as follows: 

    {% highlight php %}{% raw %}
    <div>
    Param: {getParamValue()} <br />
    Param2: {getParam2Value()}
    </div>
    {% endraw %}{% endhighlight %}
4.  Now we need to define these two methods: `getParamValue()` and `getParam2Value()` in the viewer class (`<X-Cart>/classes/XLite/Module/Tony/RequestDemo/View/Page/Customer/Tony.php`), so that the template could use them.
5.  We edit the `<X-Cart>/classes/XLite/Module/Tony/RequestDemo/View/Page/Customer/Tony.php` file and define a new `getParamValue()` method there as follows: 

    {% highlight php %}{% raw %}
        public function getParamValue()
        {
            return \XLite\Core\Request::getInstance()->param;
        }
    {% endraw %}{% endhighlight %}

    This is how easy you can pull the parameter's value from the HTTP request.

6.  We define the `getParam2Value()` method in the same file as follows: 

    {% highlight php %}{% raw %}
        public function getParam2Value()
        {
            $return = 'none';
            if (isset($_GET['param2'])) {
                $return = $_GET['param2'];
            }
            return $return;
        }
    {% endraw %}{% endhighlight %}

    As you can see, X-Cart allows to `$_GET` array directly, but in this case you need to handle errors manually.

7.  Save the results and re-deploy the store. After that, call the `cart.php?target=tony&param=foo&param2=bar` script and you will see the following result:![]({{site.baseurl}}/attachments/524294/8355983.png)

# Module pack

You can download this module sample from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-RequestDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-RequestDemo-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [data-in-request.png]({{site.baseurl}}/attachments/524294/8355983.png) (image/png)