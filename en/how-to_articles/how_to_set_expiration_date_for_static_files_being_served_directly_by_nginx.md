---
layout: article_with_sidebar
lang: en
title: 'How to set expiration date for static files being served directly by Nginx'
categories: [how-to_articles]
---

{% include global.html %}

In case all static files are served directly by Nginx on your site, you may want to set expiration date for these static files.

To do it, specify additional directives in your nginx configuration file, within the "http" section, for example:

{% highlight php %}map $sent_http_content_type $expires {
    default    off;

    # Images expires in 2 weeks
    image/png 2w;
    image/gif 2w;
    image/jpg 2w;
    image/jpeg 2w;
    image/ico 2w;
    image/x-icon 2w;
    image/vnd.microsoft.icon 2w;
    image/svg+xml 2w;
    application/x-font-woff 2w;

    # CSS/JS now work with dynamic unique query string. 1 year expires
    text/css 1y;
    text/javascript 1y;
    application/javascript 1y;
}{% endhighlight %}

See also:

*   [http://nginx.org/en/docs/http/ngx_http_headers_module.html](http://nginx.org/en/docs/http/ngx_http_headers_module.html)
*   [http://nginx.org/en/docs/http/ngx_http_map_module.html](http://nginx.org/en/docs/http/ngx_http_map_module.html)

## Related articles

*   Page:[How to remove Transaction ID info in order notification emails?](/pages/viewpage.action?pageId=9666581)
*   Page:[How to modify "Print Invoice" page](/pages/viewpage.action?pageId=9306925)
*   Page:[How to move category description below products list](/display/XDD/How+to+move+category+description+below+products+list)
*   Page:[How to add Google Adwords Conversion Tracking Code to "Thank you for your order" page](/pages/viewpage.action?pageId=9307079)
*   Page:[How to add Facebook Pixel Сode to X-Cart pages](/pages/viewpage.action?pageId=9306783)

Showing first 5 of 8 results