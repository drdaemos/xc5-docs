---
lang: en
layout: article_with_sidebar
title: View classes
categories: [architecture]
order: 20
---

# Introduction

This guide describes how developers can display the dynamically generated content in X-Cart using viewer classes.

# Table of Contents



# Understanding what is viewer class

Viewer class is a class that manages the template. It contains methods that can be called from template. This way template can pull data from PHP code. Let us have a look at real life example.

# Implementation

For the sake of example, I will show how to insert Hello world on {the current day of the week} label to the order page in admin area. {the current day of the week} part will be generated dynamically, that is why we need a viewer class.

![](custom-html-via-viewer.png)

[[Create an empty module|Step 1 - creating simplest module]]. I am creating it with developer ID **Tony** and module ID **ViewerDemo**.Create the **View** folder in your module. I am creating `<X_Cart>/classes/XLite/Module/Tony/ViewerDemo/View/` folder.Put a PHP file with a name of your viewer class into this folder. Its name can be whatever you like, but it must with Capital letter. I am creating `classes/XLite/Module/Tony/ViewerDemo/View/MyCode.php `file with the following content: 

```
<?php
namespace XLite\Module\Tony\ViewerDemo\View;
/**
 * @ListChild (list="order.operations", weight="150", zone="admin")
 */
class MyCode extends \XLite\View\AView
{
    protected function getDefaultTemplate()
    {
        return 'modules/Tony/ViewerDemo/mycode.tpl';
    }
    protected function getWeekDay()
    {
        return date('l');
    }
}
```

 

Let's walk through each line in order to understand what this code does:  
`- namespace XLite\Module\Tony\ViewerDemo\View` – definition of namespace, use your own developer and module ID here;  
`- @ListChild (list="order.operations", weight="150", zone="admin")` – definition of view list, where our content must be displayed. Have a look at [[basic designer guide|Step 2 - applying design changes#understanding-x-cart-layout-system]] in order to learn more about view lists and about how you can find the needed view list;  
`- class MyCode extends \XLite\View\AView` – definition of viewer class. It must extend` \XLite\View\AView` class or its child. Name of class must be the same of the filename it contains. E.g. `MyCode.php` file contains definition of MyCode class;  
`-` function `getDefaultTemplate()` defines what template is responsible for display of our custom code;  
`-` function `getWeekDay()` defines the dynamic portion of our HTML code being displayed; this is the method we are going to call from template.PHP part of our mod is over. Now we need to create a template defined in the `getDefaultTemplate()` method. I am creating `skins/admin/en/modules``/Tony/ViewerDemo/mycode.tpl` template with the following content: 

```
<div class="custom-code">Hello world on {getWeekDay()}!</div>
```

As you can see, the code of the template does not contain definition of view list, because it was assigned in the viewer class. Instead, the template contains the plain part as usual text (Hello world) and dynamic part as calls of function (`{getWeekDay()}`).Re-deploy the store and check the results on order page. You will see the results as follows:![](custom-html-code-via-viewer-2.png)Now we need to apply several CSS rules in order to make it look smooth; check [[adding CSS files|Adding CSS and JS files]] article for this task.# Module example

You can download the module pack here: [https://dl.dropboxusercontent.com/u/23858825/Tony-ViewerDemo-v5_1_0.tar](https://dl.dropboxusercontent.com/u/23858825/Tony-ViewerDemo-v5_1_0.tar)

