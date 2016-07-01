---
layout: article_with_sidebar
lang: en
title: 'Updating modules from 5.1 to 5.2 branch'
categories: [migration_guides]
---

# Introduction

This article describes the major change each module developer must apply to their modules in order allow their smooth upgrade from 5.1 to 5.2.

# Table of Contents

*   [Introduction](#Updatingmodulesfrom5.1to5.2branch-Introduction)
*   [Table of Contents](#Updatingmodulesfrom5.1to5.2branch-TableofContents)
*   [Checking if your module is a subject to hot-fix](#Updatingmodulesfrom5.1to5.2branch-Checkingifyourmoduleisasubjecttohot-fix)
*   [Applying the solution](#Updatingmodulesfrom5.1to5.2branch-Applyingthesolution)

# Checking if your module is a subject to hot-fix

Your module is a subject to hot-fix change if any of conditions below were triggered during module adaptation from 5.1 to 5.2 version:

1.  You changed any [Model](Understanding-Models_8225323.html) class' properties from `uinteger` to `integer` type.

2.  You used `integer` properties in your Model classes .

The easiest way to check your module is to take its distribution pack and [grep](https://www.gnu.org/software/grep/) its source for **`integer`** keyword. If any of your [Model](Understanding-Models_8225323.html) classes has this directive (or **`uinteger`**), then you need to apply the changes described below.

If you do not update your modules, X-Cart merchants will still come to you and ask you to fix the problem for them even if they come right now. Thus it is more sensible to fix the problem in advance, which will save your time dealing with support requests and allow X-Cart merchants to upgrade smoothly.

# Applying the solution

You need to release the next version of your module that will contain the following changes:

1.  If you changed `uinteger` properties to `integer` ones. Then, you need to specify new `integer` properties as follows: 

    {% highlight php %}    /**
         * @Column         (type="integer", options={ "unsigned": true })
         */
        protected $id;{% endhighlight %}

    not just 

    {% highlight php %}    /**
         * @Column         (type="integer")
         */
        protected $id;{% endhighlight %}
2.  If you used `integer` properties in your Models and these properties **are not** used as **indexes**, then you must replace such properties with the following directive: 

    {% highlight php %}    /**
         * @Column         (type="integer", nullable=true)
         */
        protected $id;{% endhighlight %}

    not just 

    {% highlight php %}    /**
         * @Column         (type="integer")
         */
        protected $id;{% endhighlight %}

    The reason for this change is that previous Doctrine version assumed `nullable=true` even if it was not specified. This change will allow backward compatibility.

Aside from that, your module must [decorate](Step-3---applying-logic-changes_8224804.html) the `postprocessSchema()` method of the  `\XLite\Core\Database` class as follows: 

{% highlight php %}abstract class Database extends \XLite\Core\Database implements \XLite\Base\IDecorator
{
    /**
     * Post process schemas
     *
     * @param array  $schemas Schemas
     * @param string $mode    Schema generation mode OPTIONAL
     *
     * @return array
     */
    protected function postprocessSchema($schemas, $mode = self::SCHEMA_CREATE)
    {
        $result = parent::postprocessSchema($schemas, $mode);

        $tmp1 = array();
        $tmp2 = array();

        foreach ($result as $query) {
            if (false === strpos($query, 'ADD CONSTRAINT')) {
                $tmp1[] = $query;
            } else {
                $tmp2[] = $query;
            }
        }

        return array_merge($tmp1, $tmp2);
    }
}{% endhighlight %}

and your module must include the following [pre-upgrade hook](Upgrading-X-Cart-5_7505469.html): 

{% highlight php %}<?php
// vim: set ts=4 sw=4 sts=4 et:

return function()
{
    $tables = array(
        'cart_reminders',
        'cart_reminder_translations'
    );

    foreach ($tables as $table) {
        $table = \XLite\Core\Database::getInstance()->getTablePrefix() . $table;

        $em = \XLite\Core\Database::getEM();

        $m = array();
        try {
            $create = $em->getConnection()->fetchColumn('SHOW CREATE TABLE `' . $table . '`', array(), 1);
            preg_match_all('/CONSTRAINT `?([^`]+)`? FOREIGN KEY/', $create, $m);
        } catch (\Exception $e) {}

        if (isset($m[1])) {
            foreach ($m[1] as $keyName) {
                $query = 'ALTER TABLE `' . $table . '` DROP FOREIGN KEY `' . $keyName . '`';
                $em->getConnection()->executeQuery($query);
            }
        }
    }
};{% endhighlight %}

where `$tables` variable must contain all tables of your module.

These changes will ensure that your merchants will upgrade seamlessly. You can remove decoration of the `\XLite\Core\Database` class in the next version of your module as well you do not need to add this pre-upgrade hook for future versions of the module.