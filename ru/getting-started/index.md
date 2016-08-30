---
lang: ru
layout: article_with_sidebar
updated_at: '2016-08-30 12:35 +0400'
title: С чего начать
categories:
  - home
order: 1
icon: rocket
description: >-
  Build addons for 35 000+ X-Cart merchants. Get your store up and running fast
  without any hassle нун.
published: true
---

X-Cart is a highly customizable e-commerce platform and content management system that you can use to build online storefronts or web sites for selling merchandise. X-Cart provides common e-commerce features, such as shopping carts and inventory management, and encourages extensive customization to meet your organization’s specific goals.  
TEST 4

The essential principles of X-Cart’s powerful and highly scalable product architecture include: 

## OOP architecture and programming principles

are inherent in X-Cart’s design. Object-Oriented Programming (OOP) design allows for maximum flexibility and extensibility of software components, permitting you to design and implement highly customized web sites. The advantages of OOP principles include incorporation of industry-standard programming design patterns and the strict separation of business logic from presentation. Object inheritance is important, too: In keeping with classic object-oriented programming methodology, the X-Cart platform provides core components with base functionality that can be inherited by custom components for a specific web site or application.

## Strongly layered product architecture

supports the separation of visual presentation from business logic. This compartmentalization simplifies customization of store appearance and behavior. Architectural layers also provide programmers with a high level-model for understanding the optimal placement of features and code in a complex system. X-Cart tweaks the classic Model-View-Controller architectural model, though: Files within modules are typically grouped by functionality rather than file type.

The X-Cart Framework defines the fundamental concepts and rules for how the components of the web site can behave. The X-Cart framework contains libraries that modules access but no business logic components. It accepts HTTP requests and routes them to the appropriate module.

### The X-Cart Framework is integrated with the following software layers:

**Presentation layer** provides both view components (layouts, blocks, templates) and controllers, which process commands to and from the user interface. The presentation layer can also include web API service bindings. (We include these service bindings in this discussion of the presentation layer model because web API calls come in through HTTP just like browser requests, and can be made via AJAX calls from the user interface. Consequently, while web API calls can originate from an external application, they can also originate from the user interface.)

**Service layer**, through the use of service contracts, defines the overall interface for interacting with business logic (for example, creating customers and getting tax rates). Service contracts simplify the process of replacing or modifying (via plugins) services.

**Domain layer** provides core business logic and functionality in base classes, resource models, and data access capabilities that you can extend and customize. Business logic rules, which define how data is retrieved from the database and manipulated, are stored in the Business Logic layer.

## Ease of extensibility

X-Cart uses dependency injection and service contracts to simplify the process of supplying a new implementation of a defined API.

Dependency injection benefits include:

- the client that uses a module or service can remain ignorant of the module’s or service’s implementation details

- you can modify a module without altering the client from anywhere you use the dependency injection framework to wire application logic together.

- Service Contracts provide a new way to access public API endpoints. These PHP interfaces to modules streamline the use of APIs for most modules.

## Modularity

Modules form the basic functional unit of a X-Cart system. X-Cart modules contain the logic to execute required actions and functions. You extend the core feature set of X-Cart by writing and incorporating new modules into your installation. Use X-Cart themes and language packages to create your store’s visual design and language capabilities.

## Highly customizable store branding

Extend and customize the core components of your X-Cart store’s PHP-, HTML5- and CSS3- based default themes and language packages to precisely control your site’s behavior and look-and-feel.

## Strong stack of open-source technologies

The X-Cart tech stack supplies a robust toolset for deploying large, distributed storefronts and for customizing the product for your particular needs. The X-Cart stack includes popular open-source technologies such as the Linux OS, Apache/Nginx server, MySQL, Zend, and Composer.

For a comprehensive description of the X-Cart technology stack, see [X-Cart Technology Stack].
