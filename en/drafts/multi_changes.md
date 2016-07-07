---
layout: article_with_sidebar
lang: en
title: 'Multi changes'
categories: [drafts]

---

{% include global.html %}

1.  [Multi-vendor: Admin experience]({{ baseurl_lang }}/user_manual/modules/multi-vendor/multi-vendor_admin_experience.html)  
    <s>#6 access to classes and attributes:</s>  
    <s>can create product classes for vendors to use;</s>  
    <s>can edit product classes created by vendors;</s>  
    <s>can create attributes and attribute values for vendors to use (including attributes created at the level of specific products, product classes and the global level);</s>  
    <s>can edit attributes and attribute values created by vendors.</s>  

    #7 <s>determines multivendor mode + sets address for warehouse mode + configures shipping methods</s>  

    #8 - <s>who updates order statuses? - check. also check who sends tracking info.</s>  

    #10 - add info: page Users > Vendor statistics (different from Orders > Statistics) + Transactions history  

    #? - <s>sets commission rates, enables adaptive payments</s>  

    # <s>? - c&d: The store administrator can see the coupons and discounts created by vendors, and can edit these coupons and discounts. However, if there are more than one vendor, the administrator cannot tell, which discount or coupon is owned by which vendor.</s>  
    <s>Admin can create coupons and discounts, but only for themselves.</s>  
    <s>Admin can edit c&d of vendors</s>  
    <s>c&d of admin are not visible to vendors</s>  

    #? - <s>can recognize products & product classes as created by vendors. For admin, product classes and attributes created by vendors appear marked with "Vendor: Vendor name [(vendor_email@example.com)](http://localhost/x-cart-5.2.8-en/admin.php?target=profile&profile_id=11)". Product list has a column "Vendor" showing vendor email address. Can admin see other items as created by vendors - maybe discounts</s> (No, admin sees, but does not know who they belong to)  

2.  [Vendor access to orders and statistics]({{ baseurl_lang }}/user_manual/modules/multi-vendor/multi-vendor_vendor_experience/vendor_access_to_orders_and_statistics.html)  
    Tracking - vendors must have different capabilities in warehouse-non-warehouse modes - check  
    Do vendors see the selected shipping method in warehouse mode?  

3.  [Multi-vendor: Customer experience]({{ baseurl_lang }}/user_manual/modules/multi-vendor/multi-vendor_customer_experience.html)  
    During checkout the list of shipping methods available for the order is formed from the shipping methods enabled by the vendors whose products are contained in the order. Note that the customer can see as selectable only the shipping methods that are enabled by all the participating vendors <- This probably only applies to warehouse   
    The order confirmation message and the order invoice do not split the order by vendor. All the items in the order are displayed in one list, and the shipping cost for the order is also displayed as a single amount: <- What about different modes?  

4.  New article: Adaptive payments (configuring - link to Admin experience)  

5.  Add links to new articles  

6.  <s>New article: Adding coupons and discounts for vendor products (Vendors can create coupons and discounts that are applied only to their own products.)</s>  
    <s>Admin can create coupons and discounts, but only for themselves.</s>  
    <s>Admin can edit c&d of vendors</s>  
    <s>vendors can see only their own c&d (c&d of admin and other vendors are not visible to them). </s>  

7.  <s>[Configuring the Multi-vendor module]({{ baseurl_lang }}/user_manual/modules/multi-vendor/configuring_the_multi-vendor_module.html)</s>  
    <s>new scrn - settings</s>  

8.  <s>[Vendor registration]({{ baseurl_lang }}/user_manual/modules/multi-vendor/vendor_registration.html)</s>  
    <s>"Access level" Vendor = "Access level" Admin + "Roles" Vendor</s>  

9.  <s>New article: </s>  
    <s>[Specifying vendor ship-from address]({{ baseurl_lang }}/user_manual/modules/multi-vendor/multi-vendor_vendor_experience/specifying_vendor_ship-from_address.html)</s>  

10.  <s>[Vendor login and first steps]({{ baseurl_lang }}/user_manual/modules/multi-vendor/multi-vendor_vendor_experience/vendor_login_and_first_steps.html)</s>  
    <s>Financial info</s>  
    <s>Store setup > Store address</s>  
    <s>vendor shipping methods - select (Vendors as separate shops) or no access to selection (Warehouse mode)?</s>  

11.  <s>[Managing vendor profile information]({{ baseurl_lang }}/user_manual/modules/multi-vendor/multi-vendor_vendor_experience/managing_vendor_profile_information.html)</s>  
    <s>Financial info</s>  
    <s>Store setup > Store address</s>  

12.  <s>[Managing vendor shipping methods]({{ baseurl_lang }}/user_manual/modules/multi-vendor/multi-vendor_vendor_experience/managing_vendor_shipping_methods.html)</s>  
    <s>Vrendors only need to  set up shipping methods if mode not= warehouse?</s>  

13.  <s>[Vendor access to product classes and attributes]({{ baseurl_lang }}/user_manual/modules/multi-vendor/multi-vendor_vendor_experience/vendor_access_to_product_classes_and_attributes.html)</s>  
    <s>"Vendor access to global attributes" -> "Use existing values only" or "Use existing and add new values":</s>  

    <s>Both modes:</s>  
    <s>can define product-specific attributes and attr values for their own products</s>  
    <s>can create their own product classes and add attributes for them (such classes and attributes are visible to/editable by admin and visible to, but not editable by other vendors). For admin, classes and attributes created by vendors appear marked with "Vendor: Vendor name [(vendor_email@example.com)](http://localhost/x-cart-5.2.8-en/admin.php?target=profile&profile_id=11)"; vendors see no difference.</s>  
    <s>cannot add attributes (attribute names)  at the global level</s>  
    <s>cannot add their own attributes (attribute names)  for somebody else's product classes</s>  
    <s>can see classes, attributes and attr values created by admin at global level and by admin or other vendors at class level + can assign them to their own products (but cannot tell, whether a specific class or attr belongs to admin or to another vendor); cannot edit the classes, attributes or attr values defined by admin or other vendors  </s>  

    <s>"Use existing values only" enabled:</s>  
    <s>cannot add their own attribute values for attributtes of classes created by  admin or other vendors or at the global level</s>  
    <s>  
    "Use existing and add new values":</s>  
    <s>can add new values for attributes defined by admin or other vendors (at both global and class levels)</s>  

The module Multi-vendor has recently been updated. This article does not yet reflect the changes. We are working to fix this article as soon as possible.

The article is being updated to reflect the recent changes in the Multi-vendor module. At the moment, not all the information on this page is correct.