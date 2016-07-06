---
layout: article_with_sidebar
lang: en
title: 'Upgrade hooks'
---
In X-Cart 5.2.7 we added the ability to create upgrade hooks that can be run iteratively. This allows time consuming operations on the store's data to be performed without the fear that an operation may not be completed correctly due to exceeding a timeout value set in the web server settings.

If you want to use iterative upgrade hooks, you need to know the following:

1.  The following types of upgrade hooks may be iterative:  

    *   pre_upgrade.php (run before replacing the files with new ones)  

    *   post_rebuild.php (run after the upgrade has been completed and the cache of classes has been generated)
2.  If an iterative hook has not completed its operation and needs to be run again, it must return a number greater than 0 (zero). In this case the execution of the current queue of hooks will be interrupted, and the same hook will be called with a parameter - the number it returned the previous time. The parameter may be used by the hook to get information regarding the point at which the interrupted operation needs to be resumed.  

3.  If you are creating an iterative pre_upgrade hook for a version from the 5.2.x branch, you need to take into account that it was not until version 5.2.7 that the code supporting iterative hooks was implemented in the core. In this case you need to provide both the options in the hook body: you need to implement a check for the current core version, and - if the version is 5.2.7 or later - allow the use of the iterative algorithm, or - otherwise - run the operations on the whole body of data in one go. This is essential for updating the store's data correctly when upgrading from versions 5.2.6 and earlier.

Below is an example of iterative hooks performing the operations of updating products' clean URLs (See the original version in upgrade/5.2/1):

**pre_upgrade.php**{% highlight php %}{% raw %}
return function()
{
    // Initial iteration position
    $pos = 0;

    // Initial value of the result to be returned by hook
    $result = 0;

    // Max rows to process in the iteration
    $chunkSize = 10;

    if (0 < func_num_args()) {
        // Get $pos from function arguments
        $pos = func_get_arg(0);
    }

    // Prepare prefix string to save in yaml file
    $prefix = (0 == $pos ? \Includes\Utils\Operator::getServiceHeader() : '');

    /** @var \XLite\Model\Repo\ARepo $repo */
    $repo = \XLite\Core\Database::getRepo('XLite\Model\Product');

    // Iterate through product entities
    $iterator = $repo->getExportIterator($pos);
    $iterator->rewind();

    // Initial value for internal counter
    $i = 0;
    $items = array();

    while ($iterator->valid()) {
        /** @var \XLite\Model\AEntity $entity */
        $entity = $iterator->current();

        // Get current product entity
        $entity = $entity[0];

        if ($entity->getCleanURL()) {

            // Product has cleanURL - add this to the items array
            $items[$entity->getProductId()] = $entity->getCleanURL();
        }

        // Go to next product entity
        $iterator->next();

        // Increase counter and position values
        $i++;
        $pos++;

        if ($chunkSize <= $i) {
            // Counter has reached the maximum value - prepare redirect to next iteration step
            $result = $pos;
            break;
        }
    }

    if ($items) {
        // Write items to yaml file
        \Includes\Utils\FileManager::write(
            LC_DIR_VAR . 'cleanURL.products' . '.yaml',
            $prefix . \Symfony\Component\Yaml\Yaml::dump($items),
            $prefix ? null : FILE_APPEND
        );
    }

    // Return current iteration position or zero (if end of products list has been reached)
    return $result;
};
{% endraw %}{% endhighlight %}**post_rebuild.php**{% highlight php %}{% raw %}
return function()
{
    // Initial iteration position
    $pos = 0;

    // Initial value of the result to be returned by hook
    $result = 0;

    // Max rows to process in the iteration
    $chunkSize = 10;

    if (0 < func_num_args()) {
        // Get $pos from function arguments
        $pos = func_get_arg(0);
    }

    // Read data from yaml file (prepared in pre_upgrade.php hook)
    $data = \Includes\Utils\Operator::loadServiceYAML(
        LC_DIR_VAR . 'cleanURL.products.yaml'
    );

    if ($data) {

        /** @var \XLite\Model\Repo\ARepo $repo */
        $repo = \XLite\Core\Database::getRepo('XLite\Model\Product');

        // Iterate through product entities
        $iterator = $repo->getExportIterator($pos);
        $iterator->rewind();

        // Initial value for internal counter
        $i = 0;

        while ($iterator->valid()) {
            /** @var \XLite\Model\AEntity $entity */
            $entity = $iterator->current();

            // Get current product entity

            $entity = $entity[0];

            if (!empty($data[$entity->getUniqueIdentifier()])) {

                // If cleanURL defined for this product...
                $cleanURL = $data[$entity->getUniqueIdentifier()];

                // ...set cleanURL for the product
                $entity->setCleanUrl($cleanURL . '.htm', true);
                $entity->setCleanUrl($cleanURL . '.html', true);

                // Increase counter and position values
                $i++;
                $pos++;

                if ($chunkSize <= $i) {
                    // Counter has reached the maximum value - prepare returning value
                    $result = $pos;
                    break;
                }
            }

            // Go to next product entity
            $iterator->next();
        }

        // Flush database changes
        \XLite\Core\Database::getEM()->flush();
        \XLite\Core\Database::getEM()->clear();
    }

    // Return current iteration position or zero (if end of products list has been reached)
    return $result;
};
{% endraw %}{% endhighlight %}