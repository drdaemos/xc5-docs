---
layout: article_with_sidebar
lang: en
title: 'Loading YAML file'
categories: [developer_docs]

---

{% include global.html %}

# Introduction

This guide describes how developers can load updated YAML file of your module without running [X-Cart SDK macro]({{ baseurl_lang }}/getting_started/x-cart_sdk.html#X-CartSDK-LoadingYAMLfile).

Sometimes developers cannot use X-Cart SDK, because for some reason they cannot run console commands. They can still accomplish other tasks that are eased by macros except loading YAML file. This guide shows a way to load YAML file without having to uninstall/reinstall the module.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Implementation](#implementation)

# Implementation

We need to create simple PHP script as follows: 

{% highlight php %}{% raw %}
<?php

require_once 'top.inc.php';

$path = 'path/to/your/yaml/file.yaml';

\XLite\Core\Database::getInstance()->loadFixturesFromYaml($path);
{% endraw %}{% endhighlight %}

and run it through the browser. Of course `$path` variable must contain an actual path to your YAML file.