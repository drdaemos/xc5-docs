---
lang: en
layout: article_with_sidebar
updated_at: '2016-07-26 16:19 +0400'
identifier: ref_Za60J20N
order: 100
published: false
title: Form sections
---
Form must contains at least one section. By default section with name `default` is defined

##Section definition

Sections must be defined in method `\XLite\View\FormModel\AFormModel::defineSections()`. It must return **key** -> **value** pairs with **key** as section name and **value** as section options. All options are optional, so you can define unlabeled section with empty array as **value**

###Allowed section options
* **label** - Section label
* **help** - Section halp text (showd as tooltip under question sign after section label)
* **description** - Description, showed as small text under section label
* **collapse** - can section be collapsed (*default - **false***)
* **expanded** - is section expanded by default (only with **collapse** equal **true**) (*default - **true***)
* **position** - order position

##Section fields

Section fields must be defined in method `\XLite\View\FormModel\AFormModel::defineFields()`. It must return **key** -> **value** pairs with **key** as section name and **value** as fields definition.
If there are missed fields for the section then this section will be omitted in view.
