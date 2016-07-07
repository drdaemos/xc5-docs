---
layout: article_with_sidebar
lang: en
title: 'Payment modules'
categories: [drafts]

---

{% include global.html %}

All payment methods in X-Cart 5 are developed via "modules".  Let's name the module **MyPayment** and developer - **John**

Basically the payment module is consist of 3 (three) files:

{% highlight php %}{% raw %}
- classes/XLite/Module/John/MyPayment/Main.php

- classes/XLite/Module/John/MyPayment/Model/Payment/Processor/MyPayment.php

- classes/XLite/Module/John/MyPayment/install.yaml
{% endraw %}{% endhighlight %}

Main.php file is just the basic main module file with no specific instructions.

install.yaml file on contrary contains the registration information for X-Cart 5 core:

**classes/XLite/Module/John/MyPayment/install.yaml**{% highlight php %}{% raw %}
XLite\Model\Payment\Method:
  - service_name: MyOwnJohnPayment
    class: Module\John\MyPayment\Model\Payment\Processor\MyPayment
    type: C
    translations:
      - code: en
        name: 'My payment (John developer)'
    settings:
      - name: login
      - name: prefix
        value: xcn
      - name: password

{% endraw %}{% endhighlight %}