---
identifier: rJrhcW2mv
layout: article_with_sidebar
lang: en
title: 'Getting started with eBay Integration (Outdated article)'
categories:
  - Drafts

---

{% include global.html %}

This guide assumes that the eBay Integration module has been {% link "installed and enabled" Syzxin-hQv %} in your store.

To start using the eBay Integration module:

1.  [Join the eBay Developers Program](https://developer.ebay.com/join/default.aspx) or [login](https://developer.ebay.com/DevZone/account/) to your existing account.  

2.  Go to your [My Account](http://developer.ebay.com/DevZone/account/) page and retrieve or generate your application keys. The keys are used to uniquely identify your application (they tell eBay which developer and application is making a call to the API). The keys include the developer ID, certificate ID, and application ID.  
    Note that the keys need to be generated specifically for the environment you are planning to use: for testing you will need Sandbox keys, for Production - Production keys.   

    We recommend you first test your setup in the Sandbox. To get a set of application keys for the Sandbox, click the **Generate Sandbox Keys >>** button:  

    ![]({{site.baseurl}}/attachments/8225590/8356507.png?effects=drop-shadow)  
    (To get Production keys, use the **Generate Production Keys >>** button.)  

    In a few moments, a set of keys will be generated for you:   
    ![]({{site.baseurl}}/attachments/8225590/8356508.png?effects=drop-shadow)  
    Scroll down the page, and you will find the generated keys in the appropriate section - "Sandbox Keys" or "Production Keys" - of the **application keys** box:  
    ![]({{site.baseurl}}/attachments/8225590/8356509.png?effects=drop-shadow)
3.  Generate a user token (also known as "Auth Token). A user token uniquely identifies the eBay member who is using the application. A token can be generated using the eBay [User Token tool](https://developer.ebay.com/DevZone/account/tokens/). You can access the token tool at any time by using the "Get a User Token" link from the tools box on your [My Account](http://developer.ebay.com/DevZone/account/) page:  
    ![]({{site.baseurl}}/attachments/8225590/8356513.png?effects=drop-shadow)  
    Once you have clicked the link to access the token tool, you should see a page to 'Get a User Token':  
    ![]({{site.baseurl}}/attachments/8225590/8356512.png?effects=drop-shadow)  
    To generate a token:
    1.  In the Select Environment section of the page, select the environment you wish to create a token for (Sandbox or Production).   
        ![]({{site.baseurl}}/attachments/8225590/8356515.png?effects=drop-shadow)
    2.  In the Keys section of the page, select the key set you want to use to create the token. Keep in mind that the key set has to match the environment. Sandbox key sets work only in Sandbox and Production key sets work only in Production. When you select a key set, the DevID, AppID, and CertID key fields are populated.  
        ![]({{site.baseurl}}/attachments/8225590/8356516.png?effects=drop-shadow)
    3.  If you are creating a token to test your eBay Integration in the Sandbox, you will need a Sandbox user account. Use the [eBay Sandbox User Registration Tool](https://developer.ebay.com/DevZone/SandBoxUser/) to create one (We recommend you open this tool in a new browser tab or window so you can go back to where you are creating your user token when you're done).  
        ![]({{site.baseurl}}/attachments/8225590/8356519.png?effects=drop-shadow)  
        To create a user with the eBay Sandbox User Registration Tool, complete the user registration form and click the **Create User** button at the bottom of the page.  

        Note that eBay automatically adds "TESTUSER_" as a prefix to your test username. So if you used "tester1" in the Username field, the name of your user would be "TESTUSER_tester1".  

        Once the new test user for the Sandbox has been created, be sure to save their username and password to a place where you can access them as needed. When you're done, go back to the  'Get a User Token' page to continue with the creation of your user token.  

    4.  Click the **Continue to generate token** button at the bottom of the  'Get a User Token' page:  
        ![]({{site.baseurl}}/attachments/8225590/8356521.png?effects=drop-shadow)  
        The 'Sign in - Sign in with your eBay account to link your account to: <appname>' page appears:  
        ![]({{site.baseurl}}/attachments/8225590/8356520.png?effects=drop-shadow)
    5.  Enter the User ID and Password for the eBay account for which you need to generate a token.   
        **Important**: This is different from your eBay developer account.  If you are creating a Sandbox user token, enter the credentials for a [Sandbox User](https://developer.ebay.com/DevZone/sandboxuser/default.aspx). If it is a token for Production, use the credentials for a user that was created on the [Production eBay site](http://www.ebay.com/). Remember that User IDs for Sandbox users begin with "`TESTUSER_`".

    6.  Click the **Sign in** button. The 'Grant application access: <appname>' page appears:

        ![]({{site.baseurl}}/attachments/8225590/8356522.png?effects=drop-shadow)

    7.  Click the **I agree** button. The 'Token Generation - Final Step' page appears providing the user's auth token and token expiration date.

    8.  Click **Save Token **(The token will be lost if you do not save it).  
        ![]({{site.baseurl}}/attachments/8225590/8356523.png?effects=drop-shadow)

    9.  Once the token has been saved, a success message is displayed. Now you have obtained your auth token:   
        ![]({{site.baseurl}}/attachments/8225590/8356524.png?effects=drop-shadow)  

4.  In a new browser tab or window, log in to the Admin interface of your X-Cart store.   

5.  Copy the auth token from the  'Token Generation - Final Step' page and the application keys from the [My Account](http://developer.ebay.com/DevZone/account/) page on the eBay Developers Program website and paste them into the appropriate fields on the "eBay Integration" module settings page in your X-Cart store. By doing so you allow your X-Cart store to make calls to the eBay Trading API.   

    Specify the rest of the eBay Integration module settings on the "eBay Integration" module settings page as required and save the configuration.   

    **Important**: The value of the **Use eBay Sandbox** setting in X-Cart must match the type of your application key set and auth token.   

    For more info on the module configuration settings, see {% link "Configuring the eBay Integration module (Outdated article)" B142cb3XP %}.  

_Related pages:_

*   {% link "eBay Integration" B1h2bhQP %}
*   {% link "eBay Integration module system requirements and installation" eBay-Integration-module-system-requirements-and-installation_8225598.html %}
*   {% link "Configuring the eBay Integration module (Outdated article)" 8225587.html %}

## Attachments:

![](images/icons/bullet_blue.gif) [generate_sandbox_keys_button.png]({{site.baseurl}}/attachments/8225590/8356507.png) (image/png)  
![](images/icons/bullet_blue.gif) [ebay_keys_registered.png]({{site.baseurl}}/attachments/8225590/8356508.png) (image/png)  
![](images/icons/bullet_blue.gif) [ebay_sandbox_keys.png]({{site.baseurl}}/attachments/8225590/8356509.png) (image/png)  
![](images/icons/bullet_blue.gif) [generate_app_keys_buttons.png]({{site.baseurl}}/attachments/8225590/8356511.png) (image/png)  
![](images/icons/bullet_blue.gif) [get_user_token.png]({{site.baseurl}}/attachments/8225590/8356514.png) (image/png)  
![](images/icons/bullet_blue.gif) [get_user_token_link.png]({{site.baseurl}}/attachments/8225590/8356513.png) (image/png)  
![](images/icons/bullet_blue.gif) [get_user_token.png]({{site.baseurl}}/attachments/8225590/8356512.png) (image/png)  
![](images/icons/bullet_blue.gif) [token_select_environment.png]({{site.baseurl}}/attachments/8225590/8356515.png) (image/png)  
![](images/icons/bullet_blue.gif) [token_select_keyset.png]({{site.baseurl}}/attachments/8225590/8356517.png) (image/png)  
![](images/icons/bullet_blue.gif) [token_select_keyset.png]({{site.baseurl}}/attachments/8225590/8356516.png) (image/png)  
![](images/icons/bullet_blue.gif) [sandbox_user_link.png]({{site.baseurl}}/attachments/8225590/8356518.png) (image/png)  
![](images/icons/bullet_blue.gif) [sandbox_user_registration_tool.png]({{site.baseurl}}/attachments/8225590/8356519.png) (image/png)  
![](images/icons/bullet_blue.gif) [ebay_signin.png]({{site.baseurl}}/attachments/8225590/8356520.png) (image/png)  
![](images/icons/bullet_blue.gif) [continue_token.png]({{site.baseurl}}/attachments/8225590/8356521.png) (image/png)  
![](images/icons/bullet_blue.gif) [grant_app_access.png]({{site.baseurl}}/attachments/8225590/8356522.png) (image/png)  
![](images/icons/bullet_blue.gif) [save_token_button.png]({{site.baseurl}}/attachments/8225590/8356523.png) (image/png)  
![](images/icons/bullet_blue.gif) [token_saved.png]({{site.baseurl}}/attachments/8225590/8356524.png) (image/png)