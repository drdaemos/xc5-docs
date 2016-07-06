---
layout: article_with_sidebar
lang: en
title: 'Resetting the search parameter from &quot;any word&quot; to &quot;all words&quot;'
---
Search via the search form in X-Cart is performed based on the "any word" parameter; it is possible, however, to change the default behavior so the search is performed by "all words". To do so, follow the steps below:

1.  Create the simplest module as described in the section [Step 1 - creating simplest module]({{ baseurl_lang }}/getting_started/step_1_-_creating_simplest_module.html) of this manual.

2.  In this module, add a new class:

    {% highlight php %}{% raw %}
    namespace XLite\Module\<YOUR-DEVELOPER-ID>/<YOUR-MODULE-ID>\View\Form\Product\Search\Customer;
    class SimpleForm extends \XLite\View\Form\Product\Search\Customer\SimpleForm implements \XLite\Base\IDecorator
    {
       protected function getDefaultParams()
       {
           $params = parent::getDefaultParams();
           $params[\XLite\View\ItemsList\Product\Customer\Search::PARAM_INCLUDING] = \XLite\Model\Repo\Product::INCLUDING_ALL;
           return $params;
       }
    }
    {% endraw %}{% endhighlight %}

    The function getDefaultParams, as you might expect from its name, is responsible for the default parameters of this "View". 

    We are assigning to the parameter

    `\XLite\View\ItemsList\Product\Customer\Search::PARAM_INCLUDING`

    the value

    `\XLite\Model\Repo\Product::INCLUDING_ALL`

    Please take special note of the namespace. If the new file is located at

    `<X-Cart>/classes/XLite/Module/<YOUR-DEVELOPER-ID>/<YOUR-MODULE-ID>/View/Form/Product/Search/Customer`

    it has to be the value `namespace XLite\Module\<YOUR-DEVELOPER-ID>/<YOUR-MODULE-ID>\View\Form\Product\Search\Customer;`
3.  Re-generate X-Cart cache.