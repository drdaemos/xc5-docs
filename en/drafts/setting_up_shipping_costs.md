---
identifier: HyZP3b27P
layout: article_with_sidebar
lang: en
title: 'Setting up shipping costs'
categories:
  - Drafts

---

{% include global.html %}

This article describes the process of setting up shipping system. First I will explain the general principles of creating shipping rates and then give examples of creating complex cases of shipping systems.

# 1\. Understanding what shipping system you are going to create

Before you get started creating your shipping system, you need to clearly understand how your system is going to work. In order to clarify it to yourselves you should answer several questions and it is probably worth to write down your answers.

1.  How do I want my customers to see my shipping methods? In other words, what wording shall I use? Options can be "Express delivery", "Local pickup", etc.
2.  What areas I am going to ship my products? Would I like to ship them worldwide, to certain countries or to smaller regions? Do I want to set up different shipping rules depending on the destination zone?
3.  What my shipping rates depend on? Do they depend on order total or on total order weight or on how many items are in customer's cart?

Once you decide about all these points, proceed with the setting up your shipping system.

# 2\. Naming your shipping methods

Once you decide how you are going to name your shipping methods, you need to make sure that shipping methods with such names do exist and active. For that:

1.  Go to **Store setup > Shipping** section in your admin area  
    ![]({{site.baseurl}}/attachments/6389855/6586555.png)
2.  By default X-Cart 5 contains three shipping methods: Delivery, Courier and Local Shipping. If you wish, you can rename the existing shipping method or create a new one using the form below. For the sake of example, the snapshot below shows how we can create **Express Delivery** shipping method.  
    ![]({{site.baseurl}}/attachments/6389855/6586556.png)
3.  Make sure that chosen shipping method is active. Active methods have the **Active **checkbox ticked on as shown on the snapshot:  
    ![]({{site.baseurl}}/attachments/6389855/6586557.png)

# 3\. Setting up destination zones

Once you clarify what regions you are going to ship your products to, you need to decide how many destination zones you have and create them according to the {% link "Setting up destination (address) zones" SyxO5W37w %} article.

# 4\. Defining shipping rules

At this point, we have already decided how our shipping methods will be shown to the customers and created destination zones that define what regions we are going to ship our products to. Now, we are going to create rules that will eventually define our shipping system. For the sake of example, we are going to set up the **Delivery** shipping method with following conditions:

If we ship an order to US: orders under $1000 are charged $10 flat, orders that exceed $1000 have free shipping.

If we ship an order to Canada: orders under $1000 are charged $1 per kilo, orders that exceed $1000 have free shipping as well.

Preliminary I created two destination zones that define United States and Canada. I named them **US** and **Canada** accordingly.

In order to create shipping rules, go to the **Rates** sub-section in the **Store setup > Shipping** section in your admin area.

![]({{site.baseurl}}/attachments/6389855/6586558.png)

This section allows us to set up shipping markups for each case of given task:

1.  Creating $10 flat markup for US orders under $1000\. Fill in the fields of the **Add markup** form as shown on the snapshot and click the **Add** button.  

    ![]({{site.baseurl}}/attachments/6389855/6586559.png)  
    As you may have noticed we specified the markup details as:  
    - Shipping method: Delivery (since we want this method to be shown as **Delivery** to the customer)  
    - Destination zone: US (since this markup must be applied when customer is from **US only**)  
    - Subtotal range: 0 - 1000 (since this markup must be applied when order total is below **$1000 only**)  
    - Flat markup: 10 (the value of shipping charge)
2.  Creating free shipping for all orders to US that exceed $1000 order total. Fill in the **Add markup** form as shown on the snapshot and click **Add** button.  
    ![]({{site.baseurl}}/attachments/6389855/6586560.png)  
    This markup is very similar to the previous one - shipping method and destination zone are the same - but there are also differences:  
    - Subtotal range: 1000 - 9999999 (since this markup must be applied to **orders that exceed $1000**)  
    - Flat markup: 0 (since we do not want to charge customers for such type of orders)  

    Now we are done with setting up shipping rules for US and will proceed with setting up markups for Canada.
3.  Creating $1 per kilo shipping markups for all orders from Canadian customers that have order total below $1000\. Fill in the markup form as shown on the snapshot and click **Add** button.  
    ![]({{site.baseurl}}/attachments/6389855/6586561.png)  
    Let's take a closer look at how we defined it:  
    - Shipping method: Delivery (the same as all above)  
    - Destination zone: Canada (because we are setting up rules for **Canadian customers**)  
    - Subtotal range: 0 - 1000 (the same as in the first example)  
    - Markup per weight unit: $1 (it means that we charge $1 per kilo according to **order's total weight**)
4.  Creating free shipping to all orders from Canadian customers that exceed $1000\. It will be very similar to the markup we created for US free shipping with one difference: destination zone must be**Canada**.  
    ![]({{site.baseurl}}/attachments/6389855/6586562.png)
5.  The final configuration of shipping markups will look as shown below:  
    ![]({{site.baseurl}}/attachments/6389855/6586563.png)

## Attachments:

![](images/icons/bullet_blue.gif) [shipping-section (1).png]({{site.baseurl}}/attachments/6389855/6586555.png) (image/png)  
![](images/icons/bullet_blue.gif) [new-shipping-method.png]({{site.baseurl}}/attachments/6389855/6586556.png) (image/png)  
![](images/icons/bullet_blue.gif) [active-shipping-method.png]({{site.baseurl}}/attachments/6389855/6586557.png) (image/png)  
![](images/icons/bullet_blue.gif) [shipping-rates-section.png]({{site.baseurl}}/attachments/6389855/6586558.png) (image/png)  
![](images/icons/bullet_blue.gif) [1-markup.png]({{site.baseurl}}/attachments/6389855/6586559.png) (image/png)  
![](images/icons/bullet_blue.gif) [2-markup.png]({{site.baseurl}}/attachments/6389855/6586560.png) (image/png)  
![](images/icons/bullet_blue.gif) [3-markup.png]({{site.baseurl}}/attachments/6389855/6586561.png) (image/png)  
![](images/icons/bullet_blue.gif) [4-markup.png]({{site.baseurl}}/attachments/6389855/6586562.png) (image/png)  
![](images/icons/bullet_blue.gif) [all-markups.png]({{site.baseurl}}/attachments/6389855/6586563.png) (image/png)  
![](images/icons/bullet_blue.gif) [xc5_shipping_section.png]({{site.baseurl}}/attachments/6389855/9437252.png) (image/png)  
![](images/icons/bullet_blue.gif) [xc5_shipping_section1.png]({{site.baseurl}}/attachments/6389855/9437253.png) (image/png)  
![](images/icons/bullet_blue.gif) [xc5_shipping_new_method.png]({{site.baseurl}}/attachments/6389855/9437254.png) (image/png)  
![](images/icons/bullet_blue.gif) [xc5_shipping_new_method1.png]({{site.baseurl}}/attachments/6389855/9437255.png) (image/png)  
![](images/icons/bullet_blue.gif) [xc5_shipping_new_method_usps.png]({{site.baseurl}}/attachments/6389855/9437256.png) (image/png)