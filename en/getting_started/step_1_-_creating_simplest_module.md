---
layout: article_with_sidebar
lang: en
title: 'Step 1 - creating simplest module'
categories: [developer_docs]
---

{% include global.html %}

# Introduction

This guide describes how one can create a simplest module in X-Cart 5.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Choosing identifiers](#choosing-identifiers)
*   [Manual module creation](#manual-module-creation)
*   [Module creation via SDK](#module-creation-via-sdk)
*   [Packing up your module](#packing-up-your-module)

# Choosing identifiers

Before you get started, you need to choose two identifiers:

*   developer ID 
*   module ID

Your **developer ID** will tell other programmers that the module is written by you. For instance, all X-Cart modules have developer IDs **CDev** or **XC. **Module ID is basically the name of your module in the system, e.g. **AustraliaPost** or **ProductFilter**.

The identifiers must begin with an uppercase letter and may consist of a maximum of 64 alphanumeric characters.

# Manual module creation

1.  Create `<X-Cart>/classes/XLite/Module/<YOUR-DEVELOPER-ID>/<YOUR-MODULE-ID>/` directory inside your installation. Of course, you should use your own developer and module IDs instead of `<YOUR-DEVELOPER-ID>` and `<YOUR-MODULE-ID>` parts of the path.
2.  Create `Main.php` file inside `<X-Cart>/classes/XLite/Module/<YOUR-DEVELOPER-ID>/<YOUR-MODULE-ID>/` folder with the following content: 

    {% highlight php %}<?php
    namespace XLite\Module\<YOUR-DEVELOPER-ID>\<YOUR-MODULE-ID>;

    abstract class Main extends \XLite\Module\AModule
    {
        /**
         * Author name
         *
         * @return string
         */
        public static function getAuthorName()
        {
            return 'Your name';
        }

        /**
         * Module name
         *
         * @return string
         */
        public static function getModuleName()
        {
            return 'Your module name';
        }

        /**
         * Get module major version
         *
         * @return string
         */
        public static function getMajorVersion()
        {
            return '5.2';
        }

        /**
         * Module version
         *
         * @return string
         */
        public static function getMinorVersion()
        {
            return 0;
        }

        /**
         * Module description
         *
         * @return string
         */
        public static function getDescription()
        {
            return 'Your module description';
        }
    }{% endhighlight %}

    Change `namespace` section in this file and replace `<YOUR-DEVELOPER-ID>` and `<YOUR-MODULE-ID>` placeholders with your actual developer and module IDs.

3.  Define the `getDescription()`, `getModuleName()`, `getAuthorName()` methods so they would return your own module description, module name and module author.
4.  Re-deploy your store via the admin area of your X-Cart:  
    ![]({{ site.baseurl }}/attachments/524296/9437239.png?effects=drop-shadow) 
5.  After the re-deployment process is over, your module will show up among the installed modules in your store's admin area.

# Module creation via SDK

1.  [Obtain X-Cart SDK]({{ baseurl_lang }}/../getting_started/x-cart_sdk.md#X-CartSDK-ObtainingX-CartSDK)
2.  Call [create module macro](X-Cart-SDK_7864338.html#X-CartSDK-Creatingmodule) with your developer and module IDs

# Packing up your module

If you want to create the module's distributive pack, you need to

1.  Edit your `<X-Cart>/etc/config.php `file and define the `developer_mode `option as `On` there.
2.  After that you will see the Pack it link near each module in your Extensions > Installed modules section as shown on the snapshot below:  
    ![]({{ site.baseurl }}/attachments/524296/1212420.png?effects=drop-shadow)
3.  Clicking **Pack it** link will generate your module's distribution pack.

## Attachments:

![](images/icons/bullet_blue.gif) [1.png]({{ site.baseurl }}/attachments/524296/1212421.png) (image/png)  
![](images/icons/bullet_blue.gif) [1.png]({{ site.baseurl }}/attachments/524296/1212420.png) (image/png)  
![](images/icons/bullet_blue.gif) [redeploy-the-store.png]({{ site.baseurl }}/attachments/524296/7995397.png) (image/png)  
![](images/icons/bullet_blue.gif) [xc5_cache_redeploy.png]({{ site.baseurl }}/attachments/524296/9437239.png) (image/png)