---
layout: article_with_sidebar
lang: en
title: 'Migration from Litecommerce 3 to X-Cart 5'
categories: [migration_guides]
---

# Introduction

This document describes the process of upgrade Litecommerce 3 to X-Cart 5.

*   [Introduction](#MigrationfromLitecommerce3toX-Cart5-Introduction)
*   [Step 1\. Install the module Migrate2XCN.](#MigrationfromLitecommerce3toX-Cart5-Step1.InstallthemoduleMigrate2XCN.)
*   [Step 2\. Open the Migrate2XCN module settings page and enter your X-Cart 5 license key.](#MigrationfromLitecommerce3toX-Cart5-Step2.OpentheMigrate2XCNmodulesettingspageandenteryourX-Cart5licensekey.)
*   [Step 3\. Change the marketplace URL in the file config.php.](#MigrationfromLitecommerce3toX-Cart5-Step3.ChangethemarketplaceURLinthefileconfig.php.)
*   [Step 4\. Clear the marketplace cache.](#MigrationfromLitecommerce3toX-Cart5-Step4.Clearthemarketplacecache.)
*   [Step 5\. Upgrade your store.](#MigrationfromLitecommerce3toX-Cart5-Step5.Upgradeyourstore.)
*   [Step 6\. Activate the license key.](#MigrationfromLitecommerce3toX-Cart5-Step6.Activatethelicensekey.)
*   [Step 7\. Update your etc/config.php file.](#MigrationfromLitecommerce3toX-Cart5-Step7.Updateyouretc/config.phpfile.)
*   [FAQ](#MigrationfromLitecommerce3toX-Cart5-FAQ)
    *   [Error: maximum execution time of 30 seconds exceeded during cache regeneration or upgrade operation.](#MigrationfromLitecommerce3toX-Cart5-Error:maximumexecutiontimeof30secondsexceededduringcacheregenerationorupgradeoperation.)
    *   [Problem: X-Cart 5 displays only text without design during the upgrade.](#MigrationfromLitecommerce3toX-Cart5-Problem:X-Cart5displaysonlytextwithoutdesignduringtheupgrade.)
    *   [Problem: You are seeing inconsistency in design after upgrade.](#MigrationfromLitecommerce3toX-Cart5-Problem:Youareseeinginconsistencyindesignafterupgrade.)

# Step 1\. Install the module Migrate2XCN.

1.  Download the module **Migrate2XCN** here: [http://www.litecommerce.com/download/migrate](http://www.litecommerce.com/download/migrate)
2.  Open the page 'Manage add-ons' in you admin area (admin.php?target=addons_list_installed)
3.  Click the 'Upload add-on' button and follow the instructions

**** ![]({{ site.baseurl }}/attachments/3309570/7602238.png?effects=drop-shadow)****

# Step 2\. Open the Migrate2XCN module settings page and enter your X-Cart 5 license key.

Once you have installed the Migrate2XCN module, go to its settings:

**** ![]({{ site.baseurl }}/attachments/3309570/7602239.png?effects=drop-shadow)****

and insert your X-Cart 5 license key there (you should have received this license key by email from X-Cart team)****  
 ![]({{ site.baseurl }}/attachments/3309570/7602240.png?effects=drop-shadow)****

# Step 3\. Change the marketplace URL in the file config.php.

1.  Open the file <litecommerce-dir>/etc/config.php in a text editor

2.  Find out these lines there:

    [marketplace]

    url = "[http://www.litecommerce.com/?q=api/](http://www.litecommerce.com/?q=api/)"

3.  Replace the url option as shown below:

    [marketplace]

    url = "[https://my.x-cart.com/index.php?q=api](https://my.x-cart.com/index.php?q=api)"

# Step 4\. Clear the marketplace cache.

Open the page admin.php?target=addons_list_marketplace&action=clear_cache

**** ![]({{ site.baseurl }}/attachments/3309570/7602241.png?effects=drop-shadow)****

# Step 5\. Upgrade your store.

After that you will see one of the links ('Updates available' or 'Upgrade available') in the header of the Admin area.

![]({{ site.baseurl }}/attachments/3309570/7602242.png?effects=drop-shadow)

Click this link and upgrade your Litecommerce 3 store.

![]({{ site.baseurl }}/attachments/3309570/7602243.png?effects=drop-shadow)

![]({{ site.baseurl }}/attachments/3309570/7602244.png?effects=drop-shadow)

After that you will see the following message:

![]({{ site.baseurl }}/attachments/3309570/7602245.png?effects=drop-shadow)

Stock Chart and Wishlist modules are just for example here. You may see other modules during this step as it depends on which modules have been installed in your Litecommerce 3\. At least, the module Migrate2XCN will be displayed there. Do not worry, this is correct behaviour. Click the **Continue** button and follow further upgrade steps.

# Step 6\. Activate the license key.

![]({{ site.baseurl }}/attachments/3309570/7602246.png?effects=drop-shadow)

![]({{ site.baseurl }}/attachments/3309570/7602247.png?effects=drop-shadow)

# Step 7\. Update your etc/config.php file.

It is recommended to adjust the config.php file after upgrade.

1.  Create a backup of the <litecommerce-dir>/etc/config.php file (e.g. copy this to file config.bak.php)
2.  Copy the file <litecommerce-dir>/etc/config.default.php to config.php
3.  Open both the files <litecommerce-dir>/etc/config.php and config.bak.php in a text editor.
4.  Copy the contents of the following sections from config.bak.php to <litecommerce-dir>/etc/config.php file:  
    [database_details]  
    [host_details]  
    [installer_details]
5.  If any other sections in your config.php file have been changed, e.g. [clean_urls], [skin_details], etc, transfer them to the new config.php as well.

# FAQ

## Error: maximum execution time of 30 seconds exceeded during cache regeneration or upgrade operation.

This problem might be caused by a large quantity of installed modules. Try to reload the page or adjust the max_execution_time PHP variable.

## Problem: X-Cart 5 displays only text without design during the upgrade.

Try to reload the pages, it usually happens if there are many installed modules in your LiteCommerce. 

## Problem: You are seeing inconsistency in design after upgrade.

Try to clear the browser's cache.

## Attachments:

![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step1.png]({{ site.baseurl }}/attachments/3309570/7602238.png) (image/png)  
![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step2.png]({{ site.baseurl }}/attachments/3309570/7602239.png) (image/png)  
![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step3.png]({{ site.baseurl }}/attachments/3309570/7602240.png) (image/png)  
![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step4.png]({{ site.baseurl }}/attachments/3309570/7602241.png) (image/png)  
![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step5.png]({{ site.baseurl }}/attachments/3309570/7602242.png) (image/png)  
![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step6.png]({{ site.baseurl }}/attachments/3309570/7602243.png) (image/png)  
![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step7.png]({{ site.baseurl }}/attachments/3309570/7602244.png) (image/png)  
![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step8.png]({{ site.baseurl }}/attachments/3309570/7602245.png) (image/png)  
![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step9.png]({{ site.baseurl }}/attachments/3309570/7602246.png) (image/png)  
![](images/icons/bullet_blue.gif) [migration-lc3-xc5-step10.png]({{ site.baseurl }}/attachments/3309570/7602247.png) (image/png)