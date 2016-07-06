---
layout: article_with_sidebar
lang: en
title: 'Configuring the eBay Integration module (Outdated article)'
categories: [drafts]
---

{% include global.html %}

After the module has been installed and enabled, it needs to be configured.

To configure the module:

1.  In the Installed Modules section of your X-Cart store’s Admin area (**Extensions** >** Installed modules**), locate the entry for the eBay Integration module and click the **Settings **link below it:  
    ![]({{ site.baseurl }}/attachments/8225587/8356505.png?effects=drop-shadow)  
    The "eBay Integration" module settings page opens:  
    ![]({{ site.baseurl }}/attachments/8225587/8356506.png?effects=drop-shadow)  

2.  Use the settings on the "eBay Integration” module settings page to adjust the module configuration.
    *   **Dev ID**,**App ID** and **Cert ID**:Copy and paste the application keys generated in your eBay Developers Program account.
    *   **Auth Token**: Copy and paste the auth token generated for the application user.

        Note

        Icon

        Instructions for getting your application keys and auth token are available in the [Getting started with eBay Integration (Outdated article)]({{ baseurl_lang }}/drafts/getting_started_with_ebay_integration_(outdated_article).html) section of this manual.

    *   **Site ID**: Enter an identifier of the eBay website with which your products and orders should be synchronized. 

        For example:

*   *   [www.ebay.fr](http://www.ebay.fr),
    *   [www.ebay.de](http://www.ebay.de)[,](http://www.ebay.fr)
    *   [www.ebay.com](http://www.ebay.com), etc.

1.  *   **Main eBay category** and **Default eBay category**: Use these two settings to specify the default eBay category to which products from your store should be exported. Since eBay has a very large number of categories (about 15000), setting the default category is a two-step process: first, you select a first level category in the "Main eBay category" field; then, after your selection is saved, the module loads a list of nested categories in the "Default eBay category" field, from which you select the default category you require.
    *   **PayPal email address**: Enter a valid PayPal email address for the PayPal account that you will use to accept payments from customers. This address needs to be entered if you offer PayPal as a payment method for your eBay listings. eBay uses this to identify the correct PayPal account when the buyer pays via PayPal during the checkout process. **Important**: When testing your eBay Integration, be sure to use your Sandbox PayPal accounts, not your Production accounts.
    *   **eBay Listing Duration Code**: Specify the duration of your store's eBay listings by entering an appropriate duration code. Duration codes can be found in the "Value" column of the Enumeration Values table on [this page](http://developer.ebay.com/Devzone/xml/docs/Reference/eBay/types/ListingDurationCodeType.html).  
    *   **eBay Return Policy ID/Name**: Enter the ID/Name of the Return Policy for your eBay listings. See eBay's help on [Business policy management](http://pages.ebay.com/help/sell/business-policies.html) for more info.
    *   **eBay Payment Policy ID/Name**: Enter the ID/Name of the Payment Policy for your eBay listings. See eBay's help on [Business policy management](http://pages.ebay.com/help/sell/business-policies.html) for more info.
    *   **eBay Shipping Policy ID/Name**: Enter the ID/Name of the Shipping Policy for your eBay listings. See eBay's help on [Business policy management](http://pages.ebay.com/help/sell/business-policies.html) for more info.
    *   **Use eBay sandbox**: Choose the mode in which you will be using your eBay Integration (Enable this option to test the integration using eBay's sandbox environment; disable the option to switch to Production mode). Please note that your application keys and auth token need to match the selected mode.
    *   **Show eBay warning messages**: When exporting products to eBay or importing orders from eBay, you may get eBay warnings. Unlike errors, warnings are conditions that are not fatal to the module operation, but they alert you to some minor problems that you may want to fix. Any warnings your store gets from eBay are written to log files in your X-Cart store. If, in addition to that, you also wish to have eBay warning messages displayed in your store's Admin area, enable the "Show eBay warning messages" option.   

2.  Click **Submit** to save the changes.

Once the module configuration is saved, your X-Cart store connects to eBay to validate the auth token that was entered. If the token is valid, the "eBay Integration" module settings page displays essential information about your auth token, including the **Token Status**, **Token Expiration Time** and**Token Revocation Time**:

![]({{ site.baseurl }}/attachments/8225587/8356527.png?effects=drop-shadow)

This allows you to know whether your token is valid and re-generage your token when necessary.

_Related pages:_

*   [Getting started with eBay Integration (Outdated article)](8225590.html)

## Attachments:

![](images/icons/bullet_blue.gif) [ebay_settings_link.png]({{ site.baseurl }}/attachments/8225587/8356505.png) (image/png)  
![](images/icons/bullet_blue.gif) [ebay_confsettings.png]({{ site.baseurl }}/attachments/8225587/8356506.png) (image/png)  
![](images/icons/bullet_blue.gif) [token_attr.png]({{ site.baseurl }}/attachments/8225587/8356527.png) (image/png)