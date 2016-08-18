---
lang: en
layout: article_with_sidebar
updated_at: '2016-08-18 17:29 +0400'
identifier: ref_VkhLV8mx
title: How to change the height of the top category banner
order: 100
published: false
keywords:
  - category banner
  - banner height
---
This article provides information about the top category page banner - how it shows in the page layout and how you can adjust its height.

The banner is designed to provide space for an image that is more wide than it is high. For this reason, the height of the banner is set via CSS. The idea of limiting the banner height is to provide balance between the banner and the rest of the page: a banner image with a greater height would use more valuable page space, pushing the main content of the category page - the subcategories and products inside the current category - further downward, which may result in higher bounce rate for the site.  


## Step-by-step guide

Here are the steps involved:

1.  Install and activate the module "Custom Skin"

2.  Create the following custom script in your X-Cart installation:

    _classes/XLite/Module/XC/CustomSkin/Core/Layout.php_

3.  Add the following code to the custom script:

    ```php
    <?php
    namespace XLite\Module\XC\CustomSkin\View;

    class CategoryBanner extends \XLite\View\CategoryBanner implements \XLite\Base\IDecorator
    {
        public function getCSSFiles()
        {
            $list = parent::getCSSFiles();
            $list[] = 'category_banner/style.css';

            return $list;
        }
    }
    ```

4.  Rebuild the X-Cart cache.


