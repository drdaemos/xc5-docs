---
layout: article_with_sidebar
lang: en
title: 'Adding custom JavaScript code to the page'
categories: [developer_docs]
---

{% include global.html %}

If you want to add some custom JavaScript code or load additional scripts to store pages, there are several ways of doing that.

The easiest way is by using the **ThemeTweaker** addon module:

1.  Make sure the **ThemeTweaker** module is enabled:  
    ![]({{ site.baseurl }}/attachments/8750664/8719407.png?effects=drop-shadow)
2.  Open the page **Look & Feel -> Custom JS **of your store's Admin back end and enable the **Use custom js** option by putting a check mark in the respective check box:  
    ![]({{ site.baseurl }}/attachments/8750664/8719408.png?effects=drop-shadow)
3.  Write the code in the following textarea (don't use the `<script>` tag, it will be added automatically). This code will be loaded before the </body> closing tag at the end of any storefront page.  

However, if you need to load your code in the <head> tag or want to limit its usage to a certain page (for example, the **orders list**), or customize your store's back end, you should use the **Custom Skin** add-on module. 

If you choose to put your code in the <body> tag, you should enable the **Custom Skin** module, then copy the default template "`skins/admin/en/body.tpl`" to "`skins/custom_skin/admin/en/body.tpl`", and add your code using the following <script> element:  

{% highlight php %}<script IF="getTarget()=#order_list#">
<!– PLACE YOUR CODE BELOW THIS LINE –>
</script>{% endhighlight %}

For the head template, it can be implemented as follows: you can copy the default template "skins/admin/en/header/body.tpl" to "skins/custom_skin/admin/en/header/body.tpl", then add your custom code using the following bit of code:  

{% highlight php %}<script IF="getTarget()=#order_list#">
<!– PLACE YOUR CODE BELOW THIS LINE –>
</script>{% endhighlight %}

This example code will be executed only on the **order_list** page in the Admin back end. You can see the result here: **<u>http://<store domain>/admin.php?target=order_list</u>**.

_See also:_

*   [Basic guide to theme creation: Using Custom Skin module]({{ baseurl_lang }}/developer_docs/design_changes/basic_guide_to_theme_creation.html#Basicguidetothemecreation-UsingCustomSkinmodule)

## Attachments:

![](images/icons/bullet_blue.gif) [X Cart online store builder Installed Modules.png]({{ site.baseurl }}/attachments/8750664/8719407.png) (image/png)  
![](images/icons/bullet_blue.gif) [X Cart online store builder Look Feel.png]({{ site.baseurl }}/attachments/8750664/8719408.png) (image/png)