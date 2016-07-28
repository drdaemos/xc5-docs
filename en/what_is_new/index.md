---
lang: en
layout: article  
updated_at: '2016-07-27 12:44 +0400'
identifier: ref_MJEGoA0S
order: 20
published: true
title: What is new in 5.3
version: X-Cart 5.3.x
---

## “Crisp White” Skin

Our new skin now uses [12-column Bootstrap grid](http://www.w3schools.com/bootstrap/bootstrap_grid_system.asp "What is new in 5.3"). It has 40px gutter (gap between columns) and 20px vertical rhythm (all elements heights are 20px, 40px or X times 20px). For instance, see example below:
- margin between the main banner and the title is 3 rhythms (60px);
- margin between the title and the description is 2 rhythms (40px).

![Example of vertical rhythms]({{site.baseurl}}/attachments/vertical-rhythm.png)

The grid makes pages easier to perceive and here is when you want to use it:
- When you create a design concept, take our template as a starting point. You will find all main pages with already defined grid there.
- When you want tweak existing design and move some elements. For that, download [Baseliner](https://chrome.google.com/webstore/detail/baseliner/agoopbiflnjadjfbhimhlmcbgmdgldld "What is new in 5.3") plugin for Google Chrome, define vertical rhythm as 20px (second parameter) and you will always be sure to place elements according to a grid.

Sure, it is up to you what size of margins to use, but if you use grid, your design will look more professional.

## PHP 5.4 as minimum version, PHP7 and MySQL 5.7
The minimal required PHP version is 5.4. Do not forget the “new” features of this version: [http://php.net/manual/en/migration54.new-features.php](http://php.net/manual/en/migration54.new-features.php "What is new in 5.3")

However, we recommend to use PHP 5.6 and especially PHP 7 for better performance.

Also, X-Cart supports MySQL 5.7.x by default. If you use an older version and want to run X-Cart on MySQL 5.7.x, you need to disable `ONLY_FULL_GROUP_BY` option. 

## New decorator and new developer mode
X-Cart 5.3 allows to apply changes to PHP code in `<X-Cart>/classes/` and see immediate changes on next page load. Yes, you will not have to rebuild the cache of classes to see the change. You can add, remove, change decoration classes, @LC_dependencies annotations, etc. Moreover, if you add a breakpoint to file in `<X-Cart>/classes/`, it will be triggered too.

You will have to rebuild a cache if you apply changes to DB structure though.

To enable such behavior, you need to switch to developer mode by going into etc/config.php and setting developer_mode variable to On:

{% raw %}```
[performance]
developer_mode = On
```{% endraw %}

Of course, live store must not be in developer mode, because it slows down the performance.

## Backward compatibility
In new core decorating and decorated classes are not [MappedSuperclass](http://doctrine-orm.readthedocs.io/projects/doctrine-orm/en/latest/reference/inheritance-mapping.html#mapped-superclasses "What is new in 5.3")'es by default as it was in previous branches. Doctrine's documentation does not explicitly tell, but Doctrine takes into account metadata only of private properties of MappedSuperclasses. This change means that metadata of private properties of decorating and decorated classes will be disregarded in 5.3, because those classes are not MappedSuperclasses any more. For example, if we have a private property with one-to-many association, the code will fail with the error.

In X-Cart 5.2, you did not worry about these moments, but you could come to a pitfall described in [Doctrine documentation](http://doctrine-orm.readthedocs.io/projects/doctrine-orm/en/latest/reference/inheritance-mapping.html#mapped-superclasses "What is new in 5.3"):

> A mapped superclass cannot be an entity, it is not query-able and persistent relationships defined by a mapped superclass must be unidirectional (with an owning side only). This means that One-To-Many associations are not possible on a mapped superclass at all. Furthermore Many-To-Many associations are only possible if the mapped superclass is only used in exactly one entity at the moment. For further support of inheritance, the single or joined table inheritance features have to be used.

New approach works around this problem and it is faster, because it does not walk through parent classes and you could not make a class non-MappedSuperclass earlier. Also, in old core you could not make a class non-MappedSuperclass, which makes new system more flexible. However, you have to be cautious about metadata. Properties with metadata must be defined as protected, not private. Or you need to explicitly define a class as MappedSuperclass by adding `@MappedSuperclass` directive, for example if you want to add indexes to decorator as {% raw %}`@Table(@Index)`{% endraw %}. 

- Metadata is parsed now by `Doctrine/Annotations` and thus parsing results may differ from previous ones. Syntax of the following annotation is incorrect according to this library:
{% raw %}`LC_Dependencies(“a”, “b”)`{% endraw %}
and the right one is:
{% raw %}`LC_Dependencies({“a”, “b”})`{% endraw %}

- For backward compatibility old-style annotations will still work, but this syntax is deprecated and your code must be changed according to new syntax.
- Topological sort is implemented by [https://github.com/marcj/topsort.php](https://github.com/marcj/topsort.php "What is new in 5.3")
- If you defined wrong FQCN repository in metadata in old code, it would be still work. New code will no longer accept it and fire an error.

## New annotations to decorate classes
Instead of @LC_Dependencies you should use the following annotations:
- @Decorator\Depend, which is the same as @LC_Dependencies;
- @Decorator\After defines decorator after decorators of the described modules, if these modules are enabled. If the these modules are disabled this annotation will be ignored;
- @Decorator\Before defines decorator before decorators of the described modules, if these modules are enabled. If the these modules are disabled this annotation will be ignored.

Examples:
* @Decorator\Depend("XC\ProductVariants")
* @Decorator\After ("XC\MultiVendor")
* @Decorator\Before("XC\ProductVariants")

## Replace Flexy with Twig
Finally, we upgraded our template-engine to [Twig](http://twig.sensiolabs.org/ "What is new in 5.3"). We thoroughly reviewed Smarty 3 and Twig and decided to use the latter, since it is more powerful and flexible. Although it already has huge community, it continues growing very fast. Twig is very similar to Smarty in syntax and developers who are familiar with Smarty will be able to switch to Twig in a couple of hours. If you are a developer, you can see it for yourself in [Twig’s documentation](http://twig.sensiolabs.org/documentation "What is new in 5.3").

By using the following resources you will find how to convert your custom flexy code to twig:
[http://xcart.github.io/flexy-to-twig/](http://xcart.github.io/flexy-to-twig/ "What is new in 5.3")

If you just used **ThemeTweaker** or **CustomSkin** to modify the templates you are able to convert flexy modified templates to twig by using the default convertor on the “Look & Feel” > “Webmaster mode” page after upgrading your store to 5.3.x.

## Native Twig’s syntax was extended
- form / endform tags are parsed together, so you will never forget to close the form;
- {% raw %}`{{ widget }}`{% endraw %} function is the same as Flexy's {% raw %}`<widget />`{% endraw %}, but most of their calls were converted to simple {% raw %}`{% include %}`{% endraw %}, which is faster;
- {% raw %}`{{ widget_list }}`{% endraw %} function is the same as Flexy's tag {% raw %}`<list />`{% endraw %};
- {% raw %}`{{ t }}`{% endraw %} function is the same as {% raw %}`Translation::translate()`{% endraw %};
- {% raw %}`{{ url }}`{% endraw %} function is the same as {% raw %}`AView::buildURL()`{% endraw %};
- {% raw %}`{{ asset }}`{% endraw %} function allows paths from skin's root and it returns URL of the file depending on the skin. Earlier the same routine was called implcitly for _src_ and _background_ attributes and for paths started with _images/_;
- {% raw %}`{{ widget }}`{% endraw %} function supports 2 ways to call it:
    - with named arguments:
    {% raw %}`{{ widget('\\XLite\\View\\Abc', fieldName='currency_id', fieldId='currency-id', fieldOnly='1') }}`{% endraw %}
    - with hash argument:
    {% raw %}`{{ widget('\\XLite\\View\\Abc', {'data-filter': '1', fieldName: 'currency_id', fieldId: 'currency-id', fieldOnly: '1'}) }}`{% endraw %}

A call with hash argument is used when a name of an argument is not alphanumeric, e.g. contains hyphen. Named arguments must be alphanumeric in Twig. {% raw %}`{{ widget_list }}`{% endraw %} supports the same two ways of call.
- {% raw %}`AView::getSafeValue()`{% endraw %} wraps a string into a special object, which will be output without escaping. This way, you can add HTML code into template and output it without a filter.


## Improved widget-cache
Improved widget cache allowed huge boost in load speed. Key changes that allowed that:
- Dynamic widgets (Hole punching)
- Key based expiration (per entity type and per-entity)
- More extensive widget caching

Here is a comparison table:
![Performance comparison]({{site.baseurl}}/attachments/performance.png)

- [X-Cart 5.2 benchmark details](http://glorious-voyage.surge.sh/loadsimulation52-1459780419152/index.html "What is new in 5.3");
- [X-Cart 5.3 behchmark details](http://glorious-voyage.surge.sh/loadsimulation53-1459781135239/index.html "What is new in 5.3").

- {% raw %}`AView::executeCached()`{% endraw %} method caches a value returned by a function, name of which is passed as an argument. It is used when you need to cache a value in addition to a body of the widget. Most often, you need it to cache some data for {% raw %}`isVisible()`{% endraw %} method, e.g. number of elements in the list. Caching rules are the same as caching rules the widget: cache on/off and TTL.

More comprehensive and robust approach is to make complicated logic of {% raw %}`isVisible()`{% endraw %} being cached alongside widget's body.

- PageQueryCountTest test was added to Performance's suite. It simulates number of requests to home, category, product pages on warm-up cache (guest user, empty cart). Simulation is done from random IPs in order to see how cache is shared between users.

- PHP-DI container was added using abstraction [https://github.com/container-interop/container-interop](https://github.com/container-interop/container-interop "What is new in 5.3")

- `symfony/event-dispatcher` libarary was added and is used for tracking start and finish of widget rendering events in Debug Bar. You can use it for other event as well.

- Changes to mechanic of widget buffering. Caching widget is being buffered in order to make the output cached. We cache content as well as meta tags and assets. There are two stages:
-- rendering widget, when we render a widget into DTO (data-transfer object);
-- displaying rendered widget, when we output rendered DTO (taken from cache) with assets.

- Dynamic widgets. Widgets implementing `XLite\Core\View\DynamicWidgetInterface` interface are not cached as well as their parent widgets. Instead we serialize their parameters and when parent widget is taken from cache, dynamic widgets are materialized. It expands area of effect of cached value, but they still remain dynamic. For instance, such approach is used for "added to cart" checkbox. Additionally, dynamic widget can use different caching rules from parent widget's ones.

- Product lists are cached with no correlation to cart's content. Each individual product is cached independently from product list. Logged in customers use the same cache of product list (if they have the same membership and shipping zone) except dynamic widgets (e.g. product rating widget).

## Little improvements for better support PHP Storm
By using PHP Storm you will get additional hint for  Database::getRepo(‘…’) with more details by typing FQCN inside getRepo

## Database migrations improved
When you install a module that adds new tables or edit existing ones, the store will not be locked until 12th step during building the class cache. When you disable such module, a store will not be locked, since tables and fields will remain in DB. If you delete disabled module and it only added new tables (did not alter existing ones), the store will not be locked either, because locked tables are no longer used. Only if you delete enabled module, the store will be locked.

## PHP dependency management
You can use [composer](https://getcomposer.org/ "What is new in 5.3") if you get X-Cart from github. Anyway, X-Cart 5 was added to github with already necessary pre-installed components. 

## Dependency injection and IoC container
X-Cart now supports [PHP-DI](http://php-di.org/ "What is new in 5.3") container, which is used by the following structure: [https://github.com/container-interop/container-interop](https://github.com/container-interop/container-interop "What is new in 5.3")

We recommend to use it for more transparent dependencies, clearer code and cheaper maintenance. Singleton pattern is deprecated in 53x.

## New FormFields and Bulk Edit

### New FormFields
X-Cart 5.3's forms use DTO instead of Entity, and the system control data transferring from Entity to DTO and vice versa. Entity gets data only if it is validated by DTO. Form fields now are described and generated by SimfonyForm. Dependencies are defined by [vueJS](https://vuejs.org/ "What is new in 5.3").

### Bulk edit
Each field is described in a separate class, which can be compound in various order. This way scenarios of their editing are just a list of fields. Bulk editing of other entities is easy too: you need to describe fields (schemes of display and data handling) and then wrap them into scenarios.

More info is here: {% link 'http://devs.x-cart.com/en/basics/bulk-editing.html' ref_HnaTNuQc %}

## New templates structure

X-Cart 5.3 has the new structure of the templates. “default” directory was renamed to “customer”, “en” directory is removed, all mail templates moved to “mail” directory:

- skins/default/en/ -> skins/customer/ 
- skins/admin/en/ -> skins/admin/
- skins/admin/ru/ -> skins/admin_ru/
- skins/mail/en/ -> skins/mail/common/
- skins/admin/en/mail -> skins/mail/admin/
- skins/default/en/mail/ -> skins/mail/customer/
- skins/crisp_white/customer/en -> skins/crisp_white/customer

Also, there are the following minor changes in the _skins/customer_ folder:

- _authentication_ folder was renamed to _authorization_, because its templates are handled by Authorization class and we wanted name consistency.
- _checkout_ folder
    - JS files were moved to _checkout/js sub-folder_;
    - CSS files were moved to _checkout/css_;
    - _checkout/check_cc.js_ file was removed;
- _header_ folder were renamed to _meta_;
- _layout_ folder now contains more templates, which were moved from _skins/default/en_. Also all templates inside are distributed between three sub-folders: _header_, _content_ and _footer_ except _sidebar.tpl_ template which is still in the root of _layout_ directory;
- _recover_password_ directory. All templates were moved into _recover_password/parts_ directory;
- _access_denied.js_ file was moved to _js_ folder;
- _account.tpl_ template was removed;
- _authentication.tpl_ was renamed to _authorization.tpl_ and moved to _authorization_ directory;
- _authentication_popup.tpl_ was renamed to _authorization_popup.tpl_ moved to _authorization_ directory;
- _category_description.tpl_ was moved to _layout/content_;
- _center.tpl_ was moved to _layout/content_;
- _center_top.tpl_ was moved to _layout/content_;
- _delete_profile.tpl_ was _removed_;
- _footer_menu.tpl_ was moved to _layout/footer_;
- _form_field.tpl_ was moved to _form_field_;
- _location.tpl_ was moved to _location_;
- _news.tpl_ was removed;
- _pages_links.tpl_ was removed;
- _powered_by.css_ was moved to _css_;
- _powered_by.tpl_ was moved to _layout/footer_;
- _recover_password.tpl_ was moved to recover_password_;
- _register_success.tpl_ was removed;
- _shipping_list.tpl_ was moved to _form_field_, because this is a selector which is used in different places;
- _tooltip.tpl_ was moved to _common_;
- _top_continue_shopping.css_ was moved to _css_;
- _top_continue_shopping.tpl_ was moved to _shopping_cart_;

## ItemsList improvements and new features
In X-Cart 5.0 you had to create around 20 files in order to properly create ItemsList, now 2 files are enough.
