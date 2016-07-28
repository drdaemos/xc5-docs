---
lang: en
layout: article_with_sidebar
updated_at: '2016-07-28 18:33 +0400'
identifier: ref_u8kJ3imU
title: Updating modules from 5.2 to 5.3 branch
order: 200
published: true
---
This is a guide that will help you to adapt your module to X-Cart 5.3 version. Please be sure to apply those changes only on dev copy of your store.

## Code changes
- Install [composer](https://getcomposer.org/download/ "Migrating modules to X-Cart 5.3") and call `composer install` in `<X-Cart>/src/` in your console, in order to install all required components.
- If you rely on getters/setters being added automatically by decorator (you did not specify them explicitly), then you need to define these getters and setters in your code. You can use `.dev/scripts/doctrine-generate-entities.php` script in order to do that quickly.
- If your module adds a field with `money` type, then you need to manually add getter and setter for it. See `\XLite\Model\Product` class as an example.
- If your class decorates another one and adds DB table indexes by `@Table(@Index)` directive, then you need to mark your class as `@MappedSuperclass`.
- Decorators of abstract classes must be explicitly defined as abstract.
- Replace `@LC_Dependencies` directive with `@Decorator\Depend`. Note that right syntax is `@Decorator\Depend({‘a’, ‘b’})`, not `@Decorator\Depend(‘a’, ‘b’)`.
- Change widget types in module settings:

-- `\XLite\View\FormField\Inline\Input\Text\Float` => `\XLite\View\FormField\Inline\Input\Text\FloatInput`
-- `\XLite\View\FormField\Input\Base\String` => `\XLite\View\FormField\Input\Base\StringInput`
-- `\XLite\View\FormField\Input\Text\Float` => `\XLite\View\FormField\Input\Text\FloatInput`

## Convert templates to Twig
Use the our [Flexy-to-Twig migration tool](http://xcart.github.io/flexy-to-twig/ "Migrating modules to X-Cart 5.3") to convert your templates in your module.

If you modified templates only by using Webmaster mode or CustomSkin module, follow the steps described below.
Upgrade your store to X-Cart 5.3;
- Go to _Look & Feel_ > _Webmaster mode_ section in your admin area. If there are any templates, then you will be able to convert them;
- Go to `admin.php?target=flexy_to_twig` URL of your store;
- Click _Search Flexy templates_ button;
- You will get a list of the files to convert. The first column will show which files will be converted. The second column will show the new location of the converted twig template. The last column will show the status of the file: whether it is converted or not.
- Press _Convert_ button to convert the files. As soon as the files convert you will see the green sign in the right column.

## Apply changes to the new templates structure
X-Cart 5.3 changed the structure of the templates and you need to make sure that if your module used default templates, that these templates are still in place. Check out [section about changing template names](http://devs.x-cart.com/en/what_is_new/#new-templates-structure "Migrating modules to X-Cart 5.3") in developer blog post.
