---
lang: en
layout: article_with_sidebar
updated_at: '2016-07-26 17:48 +0400'
identifier: ref_HnaTNuQc
order: 100
published: true
title: Bulk editing
---
Групповое редактирование представляет собой списки полей объеденненые в сценарии редактирования.
Сценарии описаны в `\XLite\Module\XC\BulkEditing\Logic\BulkEdit\Scenario::defineScenario()`
ключи - название сценария, значения - опции сценария

{% raw %}```php
'product_categories'           => [
    'title'     => \XLite\Core\Translation::getInstance()->translate('Categories'),
    'formModel' => 'XLite\Module\XC\BulkEditing\View\FormModel\Product\Categories',
    'view'      => 'XLite\Module\XC\BulkEditing\View\ItemsList\BulkEdit\Product\Category',
    'DTO'       => 'XLite\Module\XC\BulkEditing\Model\DTO\Product\Categories',
    'step'      => 'XLite\Module\XC\BulkEditing\Logic\BulkEdit\Step\Product',
    'fields'    => [
        'default' => [
            'categories' => [
                'class'   => 'XLite\Module\XC\BulkEditing\Logic\BulkEdit\Field\Product\Category',
                'options' => [
                    'position' => 100,
                ],
            ],
        ],
    ],
],
```{% endraw %}

`title` - заголовок сценария
`formModel`, `view`, `DTO` и `step` - технические настройки сценария
`fields` - список полей сценария объединенных в секции (тут нельзя 
использовать горизонтальное объединение полей)
Здесь каждое поле должно содержать класс где оно описано и дополнительные опции (сейчас у нас используется только position)

## Поля

Каждое поле должно быть описано в классе унаследованном от `\XLite\Module\XC\BulkEditing\Logic\BulkEdit\Field\AField`
*   `getSchema()` - возвращает описание схемы поля, причем нужно вренуть как массив с ключем - имя поля и значением - описание этого поля. Это необходимо для того, что бы можно было использовать в рамках одного описания несколько полей формы (`\XLite\Module\XC\BulkEditing\Logic\BulkEdit\Field\Product\Category`)
*   `getData()` - значение поля (полей) по умеолчанию. Это не должно быть какое-то реаьное занчение из моделей, это пустое дефолтное значение которое может зависить от типа поля.
*   `populateData()` - перенос данных в модель (используется в `\XLite\Model\DTO\Base\ADTO::populateTo`)
*   `getViewColumns()` - объявляюется колонка (или несколько) отображения текущих значений поля. По ним формируется таблица с текущими значениями
*   `getViewValue()` - Возвращается текущее значение поля для таблицы выбранных элементов. При этом, если в таблицу поле добавляет несколько колонок, то этот метод быдет вызван для каждой колонки отдельно с передачей в него названия колонки и объекта из которого нужно получить значение.

## Initialisation

### ItemsList

Для перехода на групповое редактирование в панель списка продуктов добавлена кнопка `\XLite\Module\XC\BulkEditing\View\Button\Product` с селектором сценария. Суть в том, что нужно сохранить критерий поиска в текущем списке продуктов и список выбранных продуктов (если они есть) `\XLite\Module\XC\BulkEditing\Controller\Admin\BulkEdit`:

{% raw %}```php
/**
 + Before bulk edit form
 */
protected function doActionStart()
{
    $selected = \XLite\Core\Request::getInstance()->select;
    $selected = $selected ? array_keys($selected) : null;

    $conditionCell = null;
    if (null === $selected) {
        $itemList = \XLite\Core\Request::getInstance()->itemsList;
        if (class_exists($itemList) && method_exists($itemList, 'getConditionCellName')) {
            $conditionCell = $itemList::getConditionCellName();
        }
    }

    $sessionCellName = \XLite\Module\XC\BulkEditing\Logic\BulkEdit\Scenario::$searchCndSessionCell;
    \XLite\Core\Session::getInstance()->{$sessionCellName} = [
        'selected'      => $selected,
        'conditionCell' => $conditionCell,
        'returnURL'     => \XLite\Core\Request::getInstance()->returnURL,
    ];

    $this->setReturnURL($this->buildURL('bulk_edit', '', ['scenario' => $this->scenario]));
}
```

## Добавление проля в сценарий (пример)

*   `\XLite\Module\XC\ProductTags\Logic\BulkEdit\Scenario` - добавляем поле в сценарий (В данном примере еще и изменение лэйбла сценария)

    {% raw %}```php
    /**
     * @return array
     */
    protected static function defineScenario()
    {
        $result = parent::defineScenario();
        $result['product_categories']['title'] = \XLite\Core\Translation::getInstance()->translate('Categories and tags');

        $result['product_categories']['fields']['default']['tags'] = [
            'class'   => 'XLite\Module\XC\ProductTags\Logic\BulkEdit\Field\Product\Tag',
            'options' => [
                'position' => 200,
            ],
        ];

        return $result;
    }
    ```{% endraw %}

*   `\XLite\Module\XC\ProductTags\Logic\BulkEdit\Field\Product\Tag` - объявление самого поля.

    {% raw %}```php
    class Tag extends \XLite\Module\XC\BulkEditing\Logic\BulkEdit\Field\AField
    {
        public static function getSchema($name, $options)
        {
            $position = isset($options['position']) ? $options['position'] : 0;

            return [
                $name                => [
                    'label'    => static::t('Tags'),
                    'type'     => 'XLite\Module\XC\ProductTags\View\FormModel\Type\TagsType',
                    'multiple' => true,
                    'position' => $position,
                ],
                $name . '_edit_mode' => [
                    'type'              => 'Symfony\Component\Form\Extension\Core\Type\ChoiceType',
                    'choices'           => [
                        static::t('Add')       => 'add',
                        static::t('Remove')    => 'remove',
                        static::t('Replace with') => 'replace_with',
                    ],
                    'choices_as_values' => true,
                    'placeholder'       => false,
                    'multiple'          => false,
                    'expanded'          => true,
                    'is_data_field'     => false,
                    'position'          => $position + 1,
                ],
            ];
        }

        public static function getData($name, $object)
        {
            return [
                $name . '_edit_mode' => 'add',
                $name                => [],
            ];
        }

        public static function populateData($name, $object, $data)
        {
            $repo = \XLite\Core\Database::getRepo('XLite\Module\XC\ProductTags\Model\Tag');
            $tags = $repo->getListByIdOrName($data->tags);

            $tagsEditMode = $data->tags_edit_mode;
            if ($tagsEditMode === 'remove') {
                $object->removeTagsByTags($tags);

            } elseif ($tagsEditMode === 'replace_with') {
                $object->replaceTagsByTags($tags);

            } else {
                $object->addTagsByTags($tags);
            }
        }

        /**
         - @param string $name
         - @param array  $options
         *
         - @return array
         */
        public static function getViewColumns($name, $options)
        {
            return [
                $name => [
                    'name'    => static::t('Tags'),
                    'orderBy' => isset($options['position']) ? $options['position'] : 0,
                ],
            ];
        }

        /**
         - @param $name
         - @param $object
         *
         - @return array
         */
        public static function getViewValue($name, $object)
        {
            $result = [];
            /** @var \XLite\Module\XC\ProductTags\Model\Tag $tag */
            foreach ($object->getTags() as $tag) {
                $result[] = $tag->getName();
            }

            return $result ? implode(', ', $result) : static::t('Not set');
        }
    }
    ```{% endraw %}

## Сохраниение данных в базу

Заполнение происходит итеративно, по принципу импорта, таким образом работоспособность не зависит от количества выбранных объектов для редактирование.