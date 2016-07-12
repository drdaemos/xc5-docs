---
layout: article_with_sidebar
lang: en
title: 'Customizing the Admin and Vendor Signup pages'
categories: [developer_docs]

---



To change the logo and the logo link for the Admin and Vendor Signup pages, use the **Custom skin** module and create a custom version of the default template:

*   `skins/admin/en/main_center/page_container_parts/header_parts/logo.tpl`

So, the custom template will be:

*   `skins/custom_skin/admin/en/main_center/page_container_parts/header_parts/logo.tpl`

Then, you will be able to change the code of your custom template and change the logo and the link.

If you also need to change the Admin Signup Page footer link "Official Website" and the bottom text "Powered by X-Cart...", use the **Custom skin** module to create custom versions of the following templates:

*   for the "Official website" footer link:

`skins/admin/en/footer/right/site.tpl`

`skins/custom_skin/admin/en/footer/right/site.tpl`

*   for the "Powered by X-Cart..." bottom text:

`skins/admin/en/powered_by.tpl`

`skins/custom_skin/admin/en/powered_by.tpl`

_See also:_

*   [Using Custom Skin module]({{ baseurl_lang }}/design_changes/basic_guide_to_theme_creation.html#Basicguidetothemecreation-UsingCustomSkinmodule)