---
layout: article_with_sidebar
lang: en
title: 'Dealing with X-Cart fatal errors'
categories: [developer_docs]

---

{% include global.html %}

# Introduction

This article helps merchants who faced a fatal error from X-Cart.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [General flow of dealing with fatal errors](#general-flow-of-dealing-with-fatal-errors)
*   [PHP syntax error](#php-syntax-error)
*   [Problem with database connection](#problem-with-database-connection)
*   [Problem with Doctrine entities relationship](#problem-with-doctrine-entities-relationship)

# General flow of dealing with fatal errors

If you received a fatal error while rebuilding cache the first thing to do is to **restore your store from the recent backup**. Ask your hosting team to help you with this task. If your hosting does not create backups on regular basis, probably it is a good idea to [change hosting provider](http://www.x-cart.com/hosting.html) at least for such an important purpose as e-commerce business.

After that you will get back to properly working store and can start working towards fixing the problem.

If you received one of the typical fatal errors below, you can try to fix them yourself.

If it is something that is not described in this article, you can try to fix it yourself if you have enough tech knowledge, ask for free help on [forums](http://forum.x-cart.com/) or contact our support service for [commercial help](http://www.x-cart.com/contact-us.html). Of course, the problem might be a bug in default software and in this case, please report it to [our bug-tracker](http://bt.x-cart.com/).

If you request a help on forums or send us a message, please specify as much info about problem as possible and attach recent log files from `<X-Cart>/var/log/` folder. Likely logs have important information about problem happened and will speed up the problem resolution.

# PHP syntax error

Typical PHP syntax error looks like this:

{% highlight php %}{% raw %}
Parse error: syntax error, unexpected 'typo' (T_STRING), expecting function (T_FUNCTION) in /Applications/MAMP/htdocs/next/src/classes/XLite/Module/CDev/AmazonS3Images/Main.php on line 97
{% endraw %}{% endhighlight %}

In this case you should check the file mentioned in the error message (e.g. `/Applications/MAMP/htdocs/next/src/classes/XLite/Module/CDev/AmazonS3Images/Main.php`) at the line 97 (as mentioned in the error message) and find the code that causes this problem.

This type of problem usually happens in user modules, so you can fix the problem yourself. If it happens in 3rd party modules, please notify developers about it. If it happens with default X-Cart modules, please report the problem to our [bug-tracker](https://bt.x-cart.com).

# Problem with database connection

Check [this guide](http://kb.x-cart.com/pages/viewpage.action?pageId=524295#InstallationGuide-1.Problemswithconnectiontodatabase) in order to find how you can fix this problem.

# Problem with Doctrine entities relationship

Such typical error message looks like this:

{% highlight php %}{% raw %}
A new entity was found through the relationship 'XLite\Model\Attribute#product' that was not configured to cascade persist operations for entity: XLite\Model\Product@0000000043bd29bd000000000dc64c73\. To solve this issue: Either explicitly call EntityManager#persist() on this unknown entity or configure cascade persist this association in the mapping for example @ManyToOne(..,cascade={"persist"}). If you cannot find out which entity causes the problem implement 'XLite\Model\Product#__toString()' to get a clue.
{% endraw %}{% endhighlight %}

This problem is most likely caused by the fact that the store data (products, categories, etc) was migrated to X-Cart incorrectly and some entities are not linked properly. In this particular cases, the database contains some product attributes that linked to a product and this product does not exist. You need to find such attributes and delete them in order to let your store work properly.

You can find problem entities by running the following MySQL query:

{% highlight php %}{% raw %}
SELECT * from xc_attributes LEFT JOIN xc_products ON xc_products.product_id = xc_attributes.product__id WHERE xc_products.product_id IS NULL;
{% endraw %}{% endhighlight %}

If you feel that you do not have enough tech knowledge to solve the problem yourself, please contact developers who migrated your data or our [support service](http://www.x-cart.com/contact-us.html).