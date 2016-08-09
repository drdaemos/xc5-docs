---
identifier: ref_MJ7mlylk
updated_at: 2014-10-28 00:00
layout: article_with_sidebar
lang: en
title: 'Migration from X-Cart 4 to X-Cart 5'
categories:
  - Migration guides

---

# Introduction

This guide describes the process of migration from X-Cart 4 to X-Cart 5\. The migration can be split up into two big steps: **data migration** and **design/custom functionality migration**.

# Table of contents

*   [Introduction](#introduction)
*   [Table of contents](#table-of-contents)
*   [Data migration](#data-migration)
    *   [Step 1\. Decide what data you want to migrate.](#step-1-decide-what-data-you-want-to-migrate)
    *   [Step 2\. Decide who is going to run migration task.](#step-2-decide-who-is-going-to-run-migration-task)
        *   [Step 2a. Migrating data by yourself](#step-2a-migrating-data-by-yourself)
        *   [Step 2b. Migrating data with paid help](#step-2b-migrating-data-with-paid-help)
*   [Migration of your custom functionality and design](#migration-of-your-custom-functionality-and-design)
*   [Summary](#summary)

# Data migration

This step is needed to transfer the information from old store to new X-Cart 5 one. Once you completed this step, your store will look the same as any other default X-Cart 5 and it will behave as usual X-Cart 5 store. However, the store will contain all information you transferred, e.g., users, products, categories, etc. So, let us see how you can migrate data.

## Step 1\. Decide what data you want to migrate.

First of all, you need to decide what data you want to transfer from one store to new X-Cart 5 one. The less data you migrate, the easier/cheaper the process will be. The most common case is migrating product catalog: **products** and **categories**. You may also want to migrate **users** or/and **orders**.

## Step 2\. Decide who is going to run migration task.

Once you decided what data you are going to migrate, you need to decide who will do this task. Basically, there are two options:

*   migrate data by yourself (cheaper, but you must have tech knowledge to do that)
*   get somebody to help you (more expensive, but you do not need any knowledge in this case)

### Step 2a. Migrating data by yourself

In this case, export data from X-Cart 4 and adjust it according to [X-Cart 5 import format](http://kb.x-cart.com/en/import-export/csv_format_by_x-cart_data_type/), then import it into X-Cart 5.

In order to help with this task, we designed a special script that generates product CSV in X-Cart 5 format right from X-Cart 4 database. To use this script, you should

1.  Download the script from X-Cart's github account: [https://github.com/xcart/next-sdk/blob/master/devkit/xcn-export.php](https://github.com/xcart/next-sdk/blob/master/devkit/xcn-export.php)
2.  Put this script into the root of your X-Cart 4 installation.
3.  Define the authorization key in this **xcn-export.php** script. This is a secret key that makes sure that nobody else can access this script. Please change it in the **xcn-export.php** script for security reasons. In order to do that you should find the following piece of code in the **xcn-export.php** script:

    ```php
    // Authorization key
    define('XCN_EXPORT_KEY', 'testsuperkey');
    ```

    and replace **testsuperkey** value with your own one.

4.  Run this script as `http://<your-server>/<x-cart-dir>/xcn-export.php?key=<your-key-defined-in-point-3>` in your browser and get the **products.csv** file for import into X-Cart 5.

5.  Import this file into X-Cart 5.

### Step 2b. Migrating data with paid help

1.  You can order our migration service and our specialists will complete the whole task for you + you will save money for license exchange. More info here: [http://www.x-cart.com/x-cart-migration.html](http://www.x-cart.com/x-cart-migration.html)
2.  You can use **Cart2Cart** service for data migration: [http://www.shopping-cart-migration.com/index.php?option=com_content&view=article&id=17801](http://www.shopping-cart-migration.com/index.php?option=com_content&view=article&id=17801). We are ready to supply you with a discount code for this service that will allow you to migrate up to 5000 products, 2000 users and 5000 orders free of charge. In case you need such coupon, please contact us at [http://www.x-cart.com/contact-us.html](http://www.x-cart.com/contact-us.html)

# Migration of your custom functionality and design

In order to migrate all your preferred features that do not exist in X-Cart 5 as well as migrate the custom layout of your store, you should re-implement such changes to X-Cart 5 from scratch. Our developer documentation will be very helpful for such task.

If you do not know who can perform such task for you, feel free to request a free quote from us here: [http://www.x-cart.com/contact-us.html](http://www.x-cart.com/contact-us.html)

# Summary

Once migration of data and custom functionality/design is finished, you are ready to launch your X-Cart 5 store.