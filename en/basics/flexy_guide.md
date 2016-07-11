---
layout: article_with_sidebar
lang: en
title: 'Flexy Guide'
categories: [developer_docs]

---

{% include global.html %}

# Introduction

This article is a guide to [Flexy](http://pear.php.net/package/HTML_Template_Flexy) template engine used in X-Cart.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Syntax](#syntax)
    *   [Basics](#basics)
    *   [Foreach](#foreach)
    *   [Modifiers](#modifiers)
    *   [Including templates and widgets](#including-templates-and-widgets)
*   [Output filter example](#output-filter-example)
    *   [Implementation](#implementation)
    *   [Module pack](#module-pack)

# Syntax

## Basics

Generally, Flexy template is a file where you specify plain text that will be displayed to a customer. However, some part of this text can be dynamically generated. For instance, if some part should be generated by a function, it will look as follows:

{% highlight php %}{% raw %}
My name is {getMyName()}
{% endraw %}{% endhighlight %}

`{getMyName()}` is a call of function `getMyName()` function [defined]({{ baseurl_lang }}/getting_started/step_2_-_applying_design_changes.html#Step2-applyingdesignchanges-UnderstandingX-Cartlayoutsystem) in the current viewer class or controller class.

If you need to pass some string value to a function, it will look as follows: 

{% highlight php %}{% raw %}
My name is {getMyName(#value#)}
{% endraw %}{% endhighlight %}

If you need to pass an array, it will look as follows: 

{% highlight php %}{% raw %}
{functionName( _ARRAY_(#key1#^#value1#,#key2#^getValue2() ))}
{% endraw %}{% endhighlight %}

If you want to add some condition to the template, then it can look as follows: 

{% highlight php %}{% raw %}
{* straight-forward implementation *}
{if:getCondition()}
<div>block</div>
{else:}
<div>else-clause block</div>
{end:}

{* shorthand construction for better readability *}
{* if getCondition() is true, then this <div> will be shown *
<div IF="{getCondition()}">block</div>

{* shorthand implementation for self-enclosed tags *}
<img IF="{getCondition()}" /> 
{% endraw %}{% endhighlight %}

Flexy also supports comments, as you may have noted: 

{% highlight php %}{% raw %}
{* I am Flexy comment*}
{% endraw %}{% endhighlight %}

## Foreach

Flexy supports walking through an array and generate content in a cycle: 

{% highlight php %}{% raw %}
{* the straight-forward implementation *}
{foreach:getArrayData(),key,value}
	These are values from getArrayData() function. key: {key} and value: {value}
{end:}

{* shorthand implementation for better readability *}
<div FOREACH="getArrayData(),key,value">
	These are values from getArrayData() function. key: {key} and value: {value}
</div>
{* in this case foreach() will produce as many divs as many key-value pairs will be returned by getArrayData() method *}

{* shorthand implementation for self-enclosed tags *}
<img FOREACH="getArrayData(),key,value" id="{key}" src="{value}" /> 
{% endraw %}{% endhighlight %}

If you want to use `foreach()` without key, you can do it as follows: 

{% highlight php %}{% raw %}
{* the straight-forward implementation *}
{foreach:getArrayData(),value}
	<div>value: {value}</div>
{end:}

{* shorthand implementation for better readability *}
<div FOREACH="getArrayData(),value">
	value: {value}
</div>

{* shorthand implementation for self-enclosed tags *}
<img FOREACH="getArrayData(),value" src="{value}" /> 
{% endraw %}{% endhighlight %}

## Modifiers

Flexy outputs text from methods with applied [htmlspecialchars()](http://php.net/htmlspecialchars) conversion. You might want to output text differently and Flexy supports output filters for that purpose. Here is a list of ones exist by default: 

{% highlight php %}{% raw %}
{getOutput():h} {* disable htmlspecialchars() encoding *}

{getOutput():r} {* replace the quote symbol with the &quot; entity. *}

{getOutput():t} {* use htmlentities() encoding. *}

{getOutput():u} {* use urlencode() encoding. *}

{getOutput():nl2br}

{getOutput():ltrim}

{getOutput():rtrim}

{getOutput():trim}
{% endraw %}{% endhighlight %}

You can also create output filter yourself. The mod below will give you an example.

## Including templates and widgets

If you want to include another template into your one, you can do it as follows: 

{% highlight php %}{% raw %}
<widget template="path/to/template.tpl" />

<widget template="path/to/another/template.tpl" foo="bar" />
{* in this case, {foo} variable in the path/to/another/template.tpl template will have value "bar" *}
{% endraw %}{% endhighlight %}

The same way you can include [viewer classes]({{ baseurl_lang }}/basics/working_with_viewer_classes.html) into templates: 

{% highlight php %}{% raw %}
<widget class="\XLite\View\Header" />

<widget class="\XLite\View\Form\Countries\Countries" foo="baz" />
{* the same way, {foo} variable will have "baz" value in this viewer class *}
{% endraw %}{% endhighlight %}

Finally, you can include view lists – [view list is a collection of templates and viewer classes](Step-2---applying-design-changes_8224787.html#Step2-applyingdesignchanges-Hidingtemplatesandwidgets) – into the template as follows: 

{% highlight php %}{% raw %}
<list name="list-name" />
{* "list-name" must be replaced with the actual name of view list *}
{% endraw %}{% endhighlight %}

# Output filter example

This section introduces a module that will show you an example of creating Flexy output filter and then displaying some text with this output filter applied. For the sake of example, our output filter will **remove spaces** in a string given.

## Implementation

We start with [creating an empty module]({{ baseurl_lang }}/getting_started/step_1_-_creating_simplest_module.html) with developer ID **Tony** and module ID **OutputFilterDemo**. Then we [create a `target=output_filter` page]({{ baseurl_lang }}/basics/creating_new_page.html) in customer area in this module. For that we create: 

*   an empty controller class `\XLite\Module\Tony\OutputFilterDemo\Controller\Customer\OutputFilter` ([more about classnames in X-Cart]({{ baseurl_lang }}/misc/x-cart_classes_structure_and_namespaces.html));
*   a page viewer class `\XLite\Module\Tony\OutputFilterDemo\View\Page\Customer\OutputFilter` with the following content: 

    {% highlight php %}{% raw %}
    <?php
    // vim: set ts=4 sw=4 sts=4 et:

    namespace XLite\Module\Tony\OutputFilterDemo\View\Page\Customer;

    /**
     * Output filter page view
     *
     * @ListChild (list="center")
     */
    class OutputFilter extends \XLite\View\AView
    {
        /**
         * Return list of allowed targets
         *
         * @return array
         */
        public static function getAllowedTargets()
        {
            return array_merge(parent::getAllowedTargets(), array('output_filter'));
        }

        /**
         * Return widget default template
         *
         * @return string
         */
        protected function getDefaultTemplate()
        {
            return 'modules/Tony/OutputFilterDemo/page/output_filter/body.tpl';
        }
    }
    {% endraw %}{% endhighlight %}
*   an empty page template `<X-Cart>/skins/default/en/modules/Tony/OutputFilterDemo/page/output_filter/body.tpl`.

Now we need to [decorate]({{ baseurl_lang }}/getting_started/step_3_-_applying_logic_changes.html) the `\XLite\View\AView` class and implement our Flexy output filter. We create the `<X-Cart>/classes/XLite/Module/Tony/OutputFilterDemo/View/AView.php` file with the following content: 

{% highlight php %}{% raw %}
<?php
// vim: set ts=4 sw=4 sts=4 et:

namespace XLite\Module\Tony\OutputFilterDemo\View;

/**
 * Abstract widget
 */
abstract class AView extends \XLite\View\AView implements \XLite\Base\IDecorator
{
    protected function flexyModifierRemoveSpaces($string)
    {
        return str_replace(' ', '', $string);
    }
}
{% endraw %}{% endhighlight %}

The `flexyModifierRemoveSpaces()` function is an implementation of our output filter, which will be called as follows: 

{% highlight php %}{% raw %}
{string():removeSpaces}
{% endraw %}{% endhighlight %}

In other words, in order to implement **removeSpaces** filter, we create the `flexyModifier**RemoveSpaces**()` method, so the modifier name is incapsulated right into the method's name.

Now, it is time to test our output filter in action. We go to our `<X-Cart>/skins/default/en/modules/Tony/OutputFilterDemo/page/output_filter/body.tpl` template and define its content as follows: 

{% highlight php %}{% raw %}
{#I am an example string.#:removeSpaces}
{% endraw %}{% endhighlight %}

**I am an example string** is our test string.

Then, we have to re-deploy the store and once the process is finished, we should go to the `cart.php?target=output_filter` page and we will see the following result: ![]({{ site.baseurl }}/attachments/8225410/8356193.png)

As you can see all spaces have been removed from our test string.

## Module pack

You can download this module example from here: [https://dl.dropboxusercontent.com/u/23858825/Tony-OutputFilterDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-OutputFilterDemo-v5_1_0.tar)

## Attachments:

![](images/icons/bullet_blue.gif) [output-filter.png]({{ site.baseurl }}/attachments/8225410/8356193.png) (image/png)