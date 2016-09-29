---
lang: en
layout: article_with_sidebar
updated_at: '2016-09-29 20:03 +0400'
identifier: ref_vHI163Zu
title: ''
order: 100
published: false
---
## General structure

The panel consists of three main parts:
- The main button;
- Additional buttons (more actions);
- Custom buttons.

Each of the parts is an array element returned by the method `\XLite\View\StickyPanel\ItemsListForm::defineButtons()`. `Custom buttons` - Each additional button must be a separate element.  

### The main button

(See `\XLite\View\StickyPanel\ItemForm::defineButtons()`, )

### Additional buttons (more actions).

Is in fact a group (http://getbootstrap.com/components/#btn-groups). Each element of the group may be either a regular button or a dropdown list (http://getbootstrap.com/components/#btn-dropdowns). The elements are declared in the method `\XLite\View\StickyPanel\ItemsListForm::defineAdditionalButtons()` as an array, in  which every element is a button within the group. Buttons are объявляются декларативно, то есть не объектами AView, а простыми массивами. For each button, three array elements are processed:

- class - the class whose object the button will be;
- params - widget parameters used for the creation of the widget;
- position - absolute position of the button within the group.

For each element of the group, in the `style` parameter the presence of the `more-action` substring is required among the widget parameters.

#### Dropdown list

To add a dropdown list, it is necessary to create a class inherited from `\XLite\View\Button\Dropdown\ADropdown` and use it as a class for a button within the group. The elements of the list are declared in the method `\XLite\View\Button\Dropdown\ADropdown::defineAdditionalButtons()` following the same principle as in `\XLite\View\StickyPanel\ItemsListForm::defineAdditionalButtons()`. For the list to be expanded upwards, which is the thing you require the most often for the panel, it is necessary to return the string `dropup` from the method `\XLite\View\Button\Dropdown\ADropdown::getDefaultDropDirection()` (or send the widget parameter `\XLite\View\Button\Dropdown\ADropdown::PARAM_DROP_DIRECTION` with that value in the `params` field of the group element).

Для добавления разделителя в список необходимо добавить элемент (с соответствующим значением `position`):

```
[
    'class'    => 'XLite\View\Button\Dropdown\Divider',
    'params'   => [
        'style'      => 'more-action',
    ],
    'position' => 1,
]
```

Для каждого пункта списка обязятельно наличие подстроки `more-action` в параметре `style` среди параметров виджета.


#### Реакция на изменения в списке (выбор строк)

Может быть три реакции:

- Элемент группы активен всегда;
- Элемент неактивен, при выборе строк - активируется;
- Элемент отсутствует, при выборе строк - появляется.

Управление происходит через изменеие парамтра `style` в поле `params` элемента группы. Для того чтобы кнопка была всегда активна, необходимо, что бы в этом параметре присутсвовала подстрока `always-enabled`. Второй вариант считается основным и не требует дополнительных настроек. Для третьего варианта необходимо, чтобы в `style` была подстрока `hide-on-disable hidden`.

Это также справедливо для пунктов раскрывающегося списка.

## Custom buttons

Для добавление дополнительных кнопок их нужно просто добавить в массив, возвращаемый методом `\XLite\View\StickyPanel\ItemsListForm::defineButtons()`. Добавлять нужно объекты, наследники `\XLite\View\Button\AButton`. Впрочем, если нужно отобразить не кнопку, то можно добавить объект любого виджета.

Для того чтобы кнопка была всегда активна, необходимо добавить подстроку `always-enabled` в её виджет параметр `style`.
