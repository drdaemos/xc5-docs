---
layout: article_with_sidebar
lang: en
title: 'ItemsList options in admin area'
categories: [developer_docs]
---

{% include global.html %}

# Introduction

This article explains main options of [ItemsList widget in admin area]({{ baseurl_lang }}/developer_docs/basics/itemslist_in_admin_area/{{ baseurl_lang }}/index.html): how to create **Remove** and **Create** buttons, define look of columns etc.

This guide will have two parts:

*   First is about parameters of **columns** in the ItemsList;
*   Second is about parameters of **ItemsList** itself.

In order to be able to play with settings which will be described below, we recommend you to install a simple [ItemsList module](ItemsList-in-admin-area_8225372.html#ItemsListinadminarea-Modulepack) and try to change it according to options below.

# Table of Contents

*   [Introduction](#introduction)
*   [Table of Contents](#table-of-contents)
*   [Column parameters](#column-parameters)
*   [ItemsList parameters](#itemslist-parameters)

# Column parameters

ItemsList columns are defined by the `defineColumns()` method and there are two mandatory fields that must exist in each column:

*   `static::COLUMN_NAME` – value type: **string** – defines the column name that will be displayed in the table's header;

*   `static::COLUMN_ORDERBY` – value type: **integer** – defines the column position: the bigger the value, the lower it will sit.

You can also define other parameters of a column:

*   `static::COLUMN_MAIN` – value type: **boolean** – defines whether this is a main column. The main column will soak up all unused space of the ItemsList;
*   `static::COLUMN_SORT` – value type: **string** – defines a sorting option for this column. [More info](ItemsList-in-admin-area_8225372.html) about implementing sorting in ItemsLists;
*   `static::COLUMN_TEMPLATE` – value type: **string** – defines a specific template for displaying column cell. Typical value is: `modules/Developer/Module/tempalte.tpl` and it will pick up the  
    `<X-Cart>/skins/admin/en/modules/Developer/Module/tempalte.tpl` template;
*   `static::COLUMN_HEAD_TEMPLATE` – value type: **string** – similar to above, defines a specific template for displaying head cell of a table;
*   `static::COLUMN_CLASS` – value type: **string** – defines a [FormField class]({{ baseurl_lang }}/developer_docs/getting_started/step_4_-_working_with_settings/creating_custom_setting_class.html) that will be used for displaying of editable field. E.g. `\XLite\View\FormField\Inline\Input\Text\Float`. If you need more info about creating editable ItemsList in admin area, please have a look at [Creating new entity -- Introduction of editable ItemsList in admin area]({{ baseurl_lang }}/developer_docs/basics/creating_new_entity_--_introduction_of_editable_itemslist_in_admin_area.html) guide;
*   `static::COLUMN_PARAMS` – value type: **array** – defines parameters for **FormField** class defined in `static::COLUMN_CLASS` param.

# ItemsList parameters

ItemsList parameters are defined as methods and the mandatory methods are:

*   `defineRepositoryName()` method that points an ItemsList to a [Model]({{ baseurl_lang }}/developer_docs/basics/understanding_models.html) class;
*   `defineColumns()` method defines what columns will exist in this ItemsList.

Aside from these two, you can define:

*   `isSwitchable()` method. If it returns **true**, it will add **enable/disable** icon to an ItemsList and this icon will work with `$enabled` property of the model class.  
    ![]({{ site.baseurl }}/attachments/8225369/8356181.png)  
    If you need to change a field that is responsible for this icon, you need to work with `getSwitcherField()` method;
*   `isRemoved()` method. If it returns **true**, it will add remove icon:  
     ![]({{ site.baseurl }}/attachments/8225369/8356182.png)
*   `isInlineCreation()` method defines whether to show a **Create** button in the ItemsList.  
    ![]({{ site.baseurl }}/attachments/8225369/8356183.png)  
    This method can return `static::CREATE_INLINE_NONE` and the button will not be displayed. If it returns `static::CREATE_INLINE_TOP`, then the button will be displayed at the **top** of the table. If it returns `static::CREATE_INLINE_BOTTOM`, then the button will be displayed in the **bottom** of the table. If you want to change the label for create button, then the desired text should be returned by the `getCreateButtonLabel()` method.

*   `getCreateURL()` method is used in conjunction with `isInlineCreation()` method and it defines URL of the page where new record will be created. If it is the same page, where your ItemsList sits on, then a new item will be created right in the table without reloading the page. Otherwise, you will be redirected to the page returned by the `getCreateURL()` method. Typical implementation of this method is:

    {% highlight php %}   protected function getCreateURL()
       {
           return \XLite\Core\Converter::buildUrl('your_target');
       }{% endhighlight %}

    where **your_target** is a target of a page.

## Attachments:

![](images/icons/bullet_blue.gif) [switcher-icon.png]({{ site.baseurl }}/attachments/8225369/8356181.png) (image/png)  
![](images/icons/bullet_blue.gif) [delete-icon.png]({{ site.baseurl }}/attachments/8225369/8356182.png) (image/png)  
![](images/icons/bullet_blue.gif) [add-button.png]({{ site.baseurl }}/attachments/8225369/8356183.png) (image/png)