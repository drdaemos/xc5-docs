---
lang: en
layout: blog
identifier: ref_devblog
order: 10
categories:
    - top
published: true
title: Developers blog
---

<h1 id="blogposts-heading" class="ui section horizontal divider header">
  Developers blog
</h1>

<div id="blogposts" class="ui items">

  <div class="item blogpost">
    <div class="content">
      <a class="ui large header" href="{% ref ref_cachetechniques %}">Applying caching techniques in X-Cart to achieve high performance</a>
      <div class="meta">
        <img class="ui avatar image" src="/images/authors/nikita.jpg">
        <p class="article-meta">
            <span class="author">Nikita Pchelintsev</span><br>
            <span class="date">Aug 30 2016</span>
        </p>
      </div>
      <div class="description" markdown="span">
        In this article I’m going to shed some light on what makes X-Cart 5.3 _significantly faster_ than its predecessor. In the first part I will walk you through the process of analyzing performance bottlenecks and present strategies to make things faster. The second part is more of a tutorial that explains how caching works in general and how it is applied in practice using techniques that are available in X-Cart. Given that I’m going to discuss technical matters, this article is mainly aimed at X-Cart developers and system integrators. That said, it can be useful for anyone interested in web application performance and how things work in X-Cart internally.
      </div>
      <div class="extra" markdown="span">
        {% link 'Read more...' ref_cachetechniques %}
      </div>
    </div>
  </div>

  <div class="item blogpost">
    <div class="content">
      <a class="ui large header" href="{% ref ref_MJEGoA0S %}">What is new in 5.3</a>
      <div class="meta">
        <img class="ui avatar image" src="/images/authors/max.jpg">
        <p class="article-meta">
            <span class="author">Max Vydrin</span><br>
            <span class="date">Jul 27 2016</span>
        </p>
      </div>
      <div class="description" markdown="span">
        X-Cart 5.3 comes with significant performance and usability improvements, such as new built-in Crisp White skin, development mode decorator, improved widget caching and developer DebugBar. It also utilizes the power of PHP 7 while PHP 5.4 becomes minimum version. Finally, it comes upgraded with Twig template engine so you'll need to convert old Flexy templates to new Twig ones. This articles overviews major changes in the software and required adaptations.
      </div>
      <div class="extra" markdown="span">
        {% link 'Read more...' ref_MJEGoA0S %}
      </div>
    </div>
  </div>

</div>