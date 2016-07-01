---
layout: article_with_sidebar
lang: en
title: 'Working with X-Cart externally'
categories: [developer_docs]
---

# Introduction

Imagine the situation that you want to pull some info from X-Cart and then display it in your blog software. In this case, you need to initialize X-Cart and then somehow call one of its functions. This article describes how you can achieve it.

# Table of Contents

*   [Introduction](#WorkingwithX-Cartexternally-Introduction)
*   [Table of Contents](#WorkingwithX-Cartexternally-TableofContents)
*   [Implementation](#WorkingwithX-Cartexternally-Implementation)
*   [Full code](#WorkingwithX-Cartexternally-Fullcode)

# Implementation

We create `test.php` file in X-Cart's root with the following content: 

{% highlight php %}<?php

//X-Cart initializtion
require_once 'top.inc.php';{% endhighlight %}

Now X-Cart is initialized in this file and we can start using its functions here. Add the following line into this file: 

{% highlight php %}echo \XLite\Core\Config::getInstance()->Company->company_name;{% endhighlight %}

and it will display company name from [X-Cart settings](Step-4---working-with-settings_8224795.html).

# Full code

The entire code of our `test.php` file is: 

{% highlight php %}<?php

//X-Cart initializtion
require_once 'top.inc.php';

// displaying company name
echo \XLite\Core\Config::getInstance()->Company->company_name;{% endhighlight %}