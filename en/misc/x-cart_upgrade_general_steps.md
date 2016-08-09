---
identifier: ref_xCPLmTHT
updated_at: 2016-01-08 00:00
layout: article_with_sidebar
lang: en
title: 'X-Cart Upgrade General Steps'
categories:
  - Developer docs

---

To upgrade your store, we recommend the following scenario:

1.  Close your existing X-Cart store frontend for a while.
2.  Create a complete backup (files and database) of your X-Cart store.
3.  Set up a development copy of your X-Cart store using the backups created (in a sub-folder on your website, or under a sub-domain, using a new database).

4.  Install the updates you require on the development copy of your X-Cart store.

Please note that the above upgrade scenario includes extra steps, such as creating X-Cart backups and setting up a development copy of the store. These steps are necessary to ensure that the store upgrade will be completed safely and will not break your existing/live store (for example, if something goes wrong unexpectedly).

After the upgrade has been completed, it is also recommended to check X-Cart log files to see if there have been any errors generated during the upgrade, or if there are any post-upgrade errors affecting the upgraded store.

If the installation of updates has been completed successfully (without errors), you can move the old store to your backup folder, and move the upgraded store to the folder where your old store was originally located.

_Related pages:_

*   {% link "Upgrading X-Cart 5" ref_pQQ1CLe1 %}