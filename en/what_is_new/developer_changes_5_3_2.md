---
lang: en
layout: blogpost
updated_at: '2016-11-28 00:00 +0400'
identifier: ref_developer532
published: true
order: 997
title: Improvements of event tasks, file integrity checker and other developer features of X-Cart 5.3.2
author: Eugene Dementjev
description: X-Cart 5.3.2 version comes with a bunch of developer-related goodies and API changes, so you'd want to adapt your modules before the release comes for the merchant stores. Among the most significant changes are the event tasks refactoring, allowing you to create step-based tasks with less effort, the file integrity checker (which can discover files, different to the original release version) and the additional selector for layout type of the home page.
---

## Introduction

X-Cart 5.3.2 version comes with a bunch of developer-related goodies and API changes, so you'd want to adapt your modules before the release comes for the merchant stores. Among the most significant changes are the event tasks refactoring, allowing you to create step-based tasks with less effort, the file integrity checker (which can discover files, different to the original release version) and the additional selector for layout type of the home page.

## Event tasks refactoring

Event task progress widget and task processors were completely refactored to reduce the size of excess copy-pasted code. `EventTaskProgress` widget now has integrated progress message, cancel button, note and Bootstrap 3 progress bar styles.

To adapt your progress page should should remove any code, related to message, buttons, and notes, and achieve the similar:

```twig
<div class="event-task-progress-page some-event-box some-event-progress">
  <div class="header clearfix">
    <h2>{{ t('Processing some event...') }}</h2>
  </div>
  <div class="content">
    {% form 'XLite\\View\\Form\\SomeEvent' with {formAction: 'someEventCancel'} %}
    <div class="subcontent clearfix">
      {{ widget('XLite\\View\\EventTaskProgress', event=this.getEventName(), message=this.getProgressMessage() ) }}
    </div>
    {% endform %}
  </div>
</div>
```

Don't forget to add `event-task-progress-page` css class to the container and remove any cancel buttons, time labels and help messages, related to the event task progress. Also, look at the added `message` widget parameter, it will allow you to provide the progress message.

Remove any `changePercent` changing JS handlers like this (because this behaviour is handled by EventTaskProgress controller):

```js
jQuery('.some-event-progress .bar')
 .bind(
  'changePercent',
  function(event, data) {
    if (data && 'undefined' != typeof(data.timeLabel)) {
      jQuery('.some-event-progress .time').html(data.timeLabel);
    }
  }
)
```

The `error` and `complete` handlers should still be present. Remove any unneccessary css styles, the default ones are incorporated inside `EventTaskProgress` widget.

Next comes your progress page PHP class, it should be using the `EventTaskProgressProviderTrait` and provide access to the processor object via `getProcessor()` function. The only required code at the most cases will be looking like this:

```php
<?php

namespace XLite\View\SomeEventProgress;

/**
 * Progress section
 *
 * @ListChild (list="admin.center", zone="admin")
 */
class Progress extends \XLite\View\AView
{
    use \XLite\View\EventTaskProgressProviderTrait; // Don't forget this trait!

    /**
     * Returns processing unit
     * @return mixed
     */
    protected function getProcessor()
    {
        return \XLite::getController()->getSomeEventProcessor(); // And this method, it is required too.
    }

    protected function getDefaultTemplate()
    {
        ... some template file
    }

```

After doing that, your export page will be looking as fancy as this screenshot. Yay!

![]({{site.baseurl}}/attachments/ref_developer532/eventtask.png)

That's it for the neccessary upgrade changes, but you can do an extra mile and provide your event tasks with new additional features.

### Available event task improvements

You can provide custom progress message by implementing this function in the View which uses `EventTaskProgressProviderTrait`:

```php
/**
 * EXAMPLE: Provides status message based on current processor step.
 * 
 * @return string
 */
protected function getTimeLabel()
{
    return \XLite\Core\Translation::formatTimePeriod($this->getProcessor()->getStep()->getTimeRemain());
}
```

Also, you'll need to implement `compileTouchData()` function in the `EventListener` class. Let's look at the `XLite\Core\EventListener\Import` class for the example:

```php
/**
 * Writes some data into $this->record['touchData'] after step/task finish.
 */
protected function compileTouchData()
{
    $this->record['touchData'] = array();

    if (0 < ($this->getItems()->getOptions()->errorsCount + $this->getItems()->getOptions()->warningsCount)) {
        $label = $this->getItems()->getErrorLanguageLabel();

    } else {
        $label = $this->getItems()->getNormalLanguageLabel();
    }

    $this->record['touchData']['message'] = $label;
}
```

In this function you should provide `message` field inside `touchData` array, this field will be used to update progress message label.

To ease the creation of event-based tasks, `XLite\Logic\AGenerator` and `XLite\Logic\ARepoStep` classes were introduced. This class contains the common logic of iterating over entities and performing some actions with them. If you have some existing logic, based on Generator pattern, or want to do a new one, you should extend from these classes. 

## File integrity checker

A new tool is available for the developers and the watchful merchants - it is called "Integrity check". This tool can be run to compare the file checksums of the existing X-Cart core and modules with the version, stored in the X-Cart Marketplace. You have to activate an X-Cart license key to be able to use this tool, otherwise Marketplace won't provide any checksums.

You can find integrity checker at the "Tools" -> "Integrity check" section at the admin zone:

![]({{site.baseurl}}/attachments/ref_developer532/file_integrity_1.png)

After running a check you will see a screen with the list of added\modified\deleted files, grouped by module:

![]({{site.baseurl}}/attachments/ref_developer532/file_integrity_2.png)

You can use this information to determine files that will be overwritten by upgrade, or some suspiciously changed files.

## Home page layout type selector

Starting with 5.3.2, X-Cart store can have different layout type for the homepage and any other page. Right now only **Standard** skin, its **Color Schemes** and the beautiful **Crisp White** skin utilize this ability, but you can easily upgrade your skin with changing its definition class (Main.php) like this:

```php
/**
 * Returns supported layout types
 *
 * @return array
 */
public static function getLayoutTypes()
{
    return [
        \XLite\Core\Layout::LAYOUT_GROUP_DEFAULT => \XLite\Core\Layout::getInstance()->getLayoutTypes(),
        \XLite\Core\Layout::LAYOUT_GROUP_HOME => \XLite\Core\Layout::getInstance()->getLayoutTypes()       // new layout group!
    ];
}
```

Skins, supporting that feature will have an additional selector at the "Look & Feel" -> "Layout" page:

![]({{site.baseurl}}/attachments/ref_developer532/layout_type_selector.png)
