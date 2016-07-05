---
layout: article_with_sidebar
lang: en
title: 'X-Cart versions'
categories: [developer_docs]
---

{% include global.html %}

# Introduction

This article explains a rule of building X-Cart core and module versions.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [X-Cart versioning](#x-cart-versioning)

# X-Cart versioning

X-Cart 5 has two numbers that identify the version of a core or a module. Let us take 5.1.10 version for example:

*   **5.1** is a major version;
*   **10** is a minor version.

For a module to be compatible with X-Cart core, the major versions of the core and the module must be the same. For example, **X-Cart 5.1.10** is compatible with Paypal module versions **5.1.0** or **5.1.1**. However **X-Cart** **5.1.10** is _not_ compatible with module versions **5.0.1** or **5.2.1**. The minor version of a module does not have to be the same as the core minor version in order to work properly.

Module version is specified in the [`Main.php` file]({{ baseurl_lang }}/developer_docs/getting_started/step_1_-_creating_simplest_module.html):

*   `getMajorVersion()` method defines the major version of a module, e.g. 5.1;
*   `getMinorVersion()` method defines the minor version of a module, e.g. 10.

The minor version of a module serves developer needs. You usually start with the minor version 0, and if you fix some bug in the module, then you increase the module minor version by 1 and upload the updated module to the marketplace. This way your users will get an invitation to upgrade the module.