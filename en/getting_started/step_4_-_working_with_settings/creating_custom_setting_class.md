---
identifier: r1-U4VMSv
layout: article_with_sidebar
lang: en
title: 'Creating custom setting class'
categories:
  - Developer docs

---


# Introduction

This article describes how developer can create a {% link "complex setting class" H1Z6SNGSw %} in X-Cart instead of using predefined ones from the `<X-Cart>/classes/XLite/View/FormField/` folder. For the sake of example, we will create a new page in admin area where we will display our own select-box with custom values.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)
*   [Result](#result)
*   [Module pack](#module-pack)

# Implementation

We start with {% link "creating a module" H1ar4zrP %} with developer ID **Tony** and module ID **FormFieldDemo**. Then, we {% link "create a page" rJlvE4frP %} **target=form_field** in admin area. During this process, we create:

*   empty controller class `\XLite\Module\Tony\FormFieldDemo\Controller\Admin\FormField`;
*   viewer class `\XLite\Module\Tony\FormFieldDemo\View\Page\Admin\FormField` with the following content:

    {% highlight php %}{% raw %}
    <?php
    // vim: set ts=4 sw=4 sts=4 et:

    namespace XLite\Module\Tony\FormFieldDemo\View\Page\Admin;

    /**
     * Form field page view
     *
     * @ListChild (list="admin.center", zone="admin")
     */
    class FormField extends \XLite\View\AView
    {
        /**
         * Return list of allowed targets
         *
         * @return array
         */
        public static function getAllowedTargets()
        {
            return array_merge(parent::getAllowedTargets(), array('form_field'));
        }

        /**
         * Return widget default template
         *
         * @return string
         */
        protected function getDefaultTemplate()
        {
            return 'modules/Tony/FormFieldDemo/page/form_field/body.tpl';
        }
    }
    {% endraw %}{% endhighlight %}
*   empty template `<X-Cart>/skins/admin/en/modules/Tony/FormField/page/form_field/body.tpl`.

Next step is to create a select-box class. We create the `<X-Cart>/classes/XLite/Module/Tony/FormField/View/FormField/Select/CustomSelect.php` file with the following content: 

{% highlight php %}{% raw %}
<?php

namespace XLite\Module\Tony\FormFieldDemo\View\FormField\Select;

class CustomSelect extends \XLite\View\FormField\Select\Regular
{
    protected function getDefaultOptions()
    {
        return array(
            'First value'  => static::t('First value'),
            'Second value' => static::t('Second value'),
            'Third value'  => static::t('Third value'),
        );
    }
}
{% endraw %}{% endhighlight %}

This is an implementation of simple select-box class. We just define options of this select-box in the `getDefaultOptions()` method. Our select-box will have three options: **First value**, **Second value** and **Third value**.

In order to display this setting widget on our page, we go to the `<X-Cart>/skins/admin/en/modules/Tony/FormField/page/form_field/body.tpl` template and add the following code there: 

{% highlight php %}{% raw %}
<widget class="\XLite\Module\Tony\FormFieldDemo\View\FormField\Select\CustomSelect" />
{% endraw %}{% endhighlight %}

If we leave the code like this, X-Cart will display this setting with missed label:   
![]({{site.baseurl}}/attachments/1048617/8356169.png)

Instead, we can either define this setting to be displayed without label: 

{% highlight php %}{% raw %}
<widget class="\XLite\Module\Tony\FormFieldDemo\View\FormField\Select\CustomSelect" fieldOnly="true" />
{% endraw %}{% endhighlight %}

or define some label for it: 

{% highlight php %}{% raw %}
<widget class="\XLite\Module\Tony\FormFieldDemo\View\FormField\Select\CustomSelect" label="Some label" />
{% endraw %}{% endhighlight %}

Our module pack will contain both variants.

# Result

Now we re-deploy the store and once it is finished we go to `admin.php?target=form_field` page in order to check the result. You should something like this: ![]({{site.baseurl}}/attachments/1048617/8356170.png)

# Module pack

You can download an example of this module from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-FormFieldDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-FormFieldDemo-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [1.png]({{site.baseurl}}/attachments/1048617/1572866.png) (image/png)  
![](images/icons/bullet_blue.gif) [1.png]({{site.baseurl}}/attachments/1048617/1572870.png) (image/png)  
![](images/icons/bullet_blue.gif) [2.png]({{site.baseurl}}/attachments/1048617/1572867.png) (image/png)  
![](images/icons/bullet_blue.gif) [3.png]({{site.baseurl}}/attachments/1048617/1572868.png) (image/png)  
![](images/icons/bullet_blue.gif) [4.png]({{site.baseurl}}/attachments/1048617/1572869.png) (image/png)  
![](images/icons/bullet_blue.gif) [1.png]({{site.baseurl}}/attachments/1048617/1572865.png) (image/png)  
![](images/icons/bullet_blue.gif) [5.png]({{site.baseurl}}/attachments/1048617/1572871.png) (image/png)  
![](images/icons/bullet_blue.gif) [6.png]({{site.baseurl}}/attachments/1048617/1572872.png) (image/png)  
![](images/icons/bullet_blue.gif) [7.png]({{site.baseurl}}/attachments/1048617/1572873.png) (image/png)  
![](images/icons/bullet_blue.gif) [setting-with-missed-label.png]({{site.baseurl}}/attachments/1048617/8356169.png) (image/png)  
![](images/icons/bullet_blue.gif) [custom-setting.png]({{site.baseurl}}/attachments/1048617/8356170.png) (image/png)