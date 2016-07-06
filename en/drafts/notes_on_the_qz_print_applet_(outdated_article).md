---
layout: article_with_sidebar
lang: en
title: 'Notes on the QZ Print applet (Outdated article)'
categories: [drafts]
---

{% include global.html %}

The module POS system for X-Cart employs a Java based web applet named QZ Print ([https://code.google.com/p/jzebra/](https://code.google.com/p/jzebra/)) to connect with the printers used to print barcodes and receipts. After the module has been installed, the applet files qz-print.jar and qz-print_jnlp.jnlp can be found in the skins\admin\en\modules\XC\PosSystem\common\lib directory on the server where your X-Cart installation is running. Being a Java based applet, QZ Print operates on the client side: from the said directory on the server, the applet is loaded via the web browser onto the computer of the POS system module user where it is employed to discover the printers installed on the system and to send raw commands directly to these printers. The loading of the applet in the client browser happens every time the user opens or refreshes a page that involves connecting to the Barcode or Receipt printers. This includes:

*   ‘“Pos System” module settings’ page (Here the applet is needed to detect all the printers installed in the system and to tie in the **Barcode printer name** and **Receipt printer name** settings with specific printers);

*   Pages where the user acting as POS operator can print out barcodes for specific UPCs (Here the applet is used to find a specific printer in the system by the name associated with the **Barcode** **printer name** field as provided in the module settings and to send print commands to it);

*   Invoice page where the user can print out a receipt (Here the applet is used to find the receipt printer by the name provided in the** Receipt printer name** field in the module settings and to send print commands to it).

The applet download size is rather small (around 100 kB); however, it takes some time to be found, downloaded and run. For most users this means a noticeable lapse (normally, a few seconds) between opening/refreshing a page on which the applet is embedded and being able to perform the action involving communtication with printers on that page. For example, on the ‘“Pos System” module settings’ page, there is no way a user can select a printer for use with the module before the applet is loaded and obtains a list of printer names from which the printer can be selected; this means the user has to wait a couple of seconds for the applet to be found, loaded and do its work. The ‘“Pos System” module settings’ page and pages for printing barcodes keep the user informed on the applet’s progress by displaying its current status at the top of the page. Normally, one can see the following consecutive statuses:

1.  Initial state:

    ![]({{ site.baseurl }}/plugins/servlet/confluence/placeholder/unknown-attachment "qzprint_wait.png")

2.  Applet has been found and is being loaded:

    ![]({{ site.baseurl }}/plugins/servlet/confluence/placeholder/unknown-attachment "qzprint_loading.png")

3.  Applet has been loaded; searching for printers:

    ![]({{ site.baseurl }}/plugins/servlet/confluence/placeholder/unknown-attachment "qzprint_search_printers.png")

4.  One or more printers have been found:

    ![]({{ site.baseurl }}/plugins/servlet/confluence/placeholder/unknown-attachment "qzprint_printers_found.png")

    (The status shown above is used for the ‘“Pos System” module settings’ page; the status displayed on the Barcode page uses the actual name of the barcode printer).

On the Invoice page, the applet loading status is not visible to users; however, the page functions in a similar way, and the **Print receipt** button only becomes available after the applet is fully loaded.

_Related pages:_

*   [Configuring the POS system module](/pages/createpage.action?spaceKey=XDD&title=Configuring+the+POS+system+module&linkCreation=true&fromPageId=7504386)
*   [Getting started with POS system for X-Cart]({{ baseurl_lang }}/user_manual/modules/pos_system_for_x-cart/getting_started_with_pos_system_for_x-cart/{{ baseurl_lang }}/index.html)