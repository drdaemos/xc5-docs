---
layout: article_with_sidebar
lang: en
title: 'Specifying sales tax for your products'
categories: [drafts]

---

{% include global.html %}

[Sales tax](http://en.wikipedia.org/wiki/Value_added_tax#With_a_sales_tax) is a type of VAT that is added over the total of what customer pays for a product. In other words, its value will be calculated based on the price consumer  will finally pay, not on the seller margin/profit only, as [it works in VAT]({{ baseurl_lang }}/user_manual/taxes/defining_vat_for_your_products.html).

This article describes the process of creating sales tax system in your X-Cart 5 store and contains 3 parts:

1.  Understanding what is tax class, whether you need it and how to create it.
2.  Enabling sales tax in your store.
3.  Creating sales tax rates.

Before you get started you need to make sure that the **Sales tax** module is enabled and activated in your store. If not, you should install it according to [instruction in our Knowledge base]({{ baseurl_lang }}/user_manual/general_setup/installing_and_activating_modules.html).

![]({{ site.baseurl }}/attachments/6389865/6586583.png)

Finally, the process of creating sales tax system relies on understanding of what [destination zones]({{ baseurl_lang }}/user_manual/countries,_states_and_zones/setting_up_destination_(address)_zones.html) and user memberships are. If you are not sure about these terms, learn corresponding articles in our Knowledge base.

# Understanding what is tax class, whether you need it and how to create it

The description of what is tax class and how to define them in case you need custom ones is explained in the [Setting up tax classes]({{ baseurl_lang }}/user_manual/taxes/setting_up_tax_classes.html) article. Check it for more information.

# Enabling sales tax in your store

To enable sales tax in your store:

1.  Go to the **Store setup > Taxes** section in your admin area.  
    ![]({{ site.baseurl }}/attachments/6389865/6586584.png)
2.  Go to the **Sales tax** sub-section there.  

    ![]({{ site.baseurl }}/attachments/6389865/6586585.png)
3.  Choose the name for your sales tax - in other words how your customers will see it - and make sure to have the sales tax system enabled.  
    ![]({{ site.baseurl }}/attachments/6389865/6586586.png)
4.  Click the **Save changes** button at the bottom.  

    ![]({{ site.baseurl }}/attachments/6389865/6586587.png)

# Creating sales tax rates

![]({{ site.baseurl }}/attachments/6389865/6586588.png)

1.  Click the **New rate** button in the **Sales tax** section in your admin area.
2.  Specify the **tax rate** for chosen **tax class**,** membership** and **destination zone**. The example below show how to set up sales tax that a customer from UK with no membership will pay 10% sales tax for Alcohol products.  
    ![]({{ site.baseurl }}/attachments/6389865/6586589.png)
3.  Add more tax rates in order to complete your sales tax system. E.g.  
    ![]({{ site.baseurl }}/attachments/6389865/6586590.png)
4.  Save the results by clicking **Save changes** button.  

    ![]({{ site.baseurl }}/attachments/6389865/6586591.png)

## Attachments:

![](images/icons/bullet_blue.gif) [sales-tax-module.png]({{ site.baseurl }}/attachments/6389865/6586583.png) (image/png)  
![](images/icons/bullet_blue.gif) [taxes-section-admin (1).png]({{ site.baseurl }}/attachments/6389865/6586584.png) (image/png)  
![](images/icons/bullet_blue.gif) [sales-tax-section-admin.png]({{ site.baseurl }}/attachments/6389865/6586585.png) (image/png)  
![](images/icons/bullet_blue.gif) [sales-tax-settings.png]({{ site.baseurl }}/attachments/6389865/6586586.png) (image/png)  
![](images/icons/bullet_blue.gif) [sales-tax-save-changes.png]({{ site.baseurl }}/attachments/6389865/6586587.png) (image/png)  
![](images/icons/bullet_blue.gif) [sales-tax-new-rate-button.png]({{ site.baseurl }}/attachments/6389865/6586588.png) (image/png)  
![](images/icons/bullet_blue.gif) [sales-tax-rate-1.png]({{ site.baseurl }}/attachments/6389865/6586589.png) (image/png)  
![](images/icons/bullet_blue.gif) [sales-tax-completed-rates.png]({{ site.baseurl }}/attachments/6389865/6586590.png) (image/png)  
![](images/icons/bullet_blue.gif) [sales-tax-completed-rates-save-changes.png]({{ site.baseurl }}/attachments/6389865/6586591.png) (image/png)