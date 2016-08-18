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

The banner is designed to provide space for an image that is more wide than it is high. For this reason, the height of the banner is set to a fixed value via CSS (If necessary, the height can be easily adjusted by providing custom CSS). For the same reason, an image placed inside the top category banner will stretch to fit the width of the area, not to fit the rectangle (If we stretched the image to fit the rectangle, with some image width to height ratios it would mean blank areas appearing at the sides of the image when the image fits the height of the banner box).

If the height of the image you wish to use for a category is more than can fit within the pre-defined default height of the banner box after the image stretches to fit the width, you can adjust the banner height to fit the height of your image (See the Step-by-step guide further down on this page). Note, however, that we do not recommend stretching the top banner height too much, as the banner height needs to be in balance with the rest of the page content: a banner image with a greater height would use more valuable page space, pushing the main content of the category page - the subcategories and products inside the current category - further downward, which may result in higher bounce rate for the site.  

## Step-by-step guide
To increase the height of the top banner on the category page, use one of the methods below.

Method 1:

1. 
Method 2:

1.  Install and activate the module "Custom Skin"

2.  Create the following custom script in your X-Cart installation:

    _classes/XLite/Module/XC/CustomSkin/View/CategoryBanner.php_

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


