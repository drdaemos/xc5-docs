---
layout: article_with_sidebar
lang: en
title: 'YAML files'
categories: [drafts]

---



By default X-Cart 5 core uses [YAML](http://en.wikipedia.org/wiki/YAML) files to store the DB content.

YAML file is a human-readable description of complex "name-value" structures.

The examples of various YAML files:

{% highlight php %}{% raw %}
XLite\Model\Product:
  - { price: 1.99, sku: '00000', weight: 0.32, cleanURL: 'apple', translations: [{ code: en, name: Apple, description: 'Apple description' }], images: [{ path: demo_p15090.jpeg, mime: image/jpeg, width: 500, height: 476, size: 125664, date: 1280314462 }], inventory: { enabled: false, amount: 500 } }

  - { price: 1.15, sku: '00007', weight: 0.31, cleanURL: 'radish', translations: [{ code: en, name: Radish, description: 'The radish (Raphanus sativus) is an edible root vegetable of the Brassicaceae family that was domesticated in Europe in pre-Roman times' }], images: [{ path: demo_p16281.jpeg, mime: image/jpeg, width: 480, height: 449, size: 147088, date: 1280314462 }], inventory: { amount: 350 } }
{% endraw %}{% endhighlight %}

This file contains of two \XLite\Model\Product entities with the associations:

**One product model entity**{% highlight php %}{% raw %}
array(
	price  => 1.99,
	sku    => '00000',
	weight => 0.32, 
	cleanURL => 'apple',
	translations => array(
		array(
			code => en,
			name => Apple,
			description => 'Apple description',
		),
	),
 	images = array(
		array(
			path => demo_p15090.jpeg, 
			mime => image/jpeg, 
			width => 500, 
			height =>  476, 
			size => 125664, 
			date => 1280314462,
		),
	),
 	inventory => array(
 		enabled => false, 
 		amount => 500,
 	),
)
{% endraw %}{% endhighlight %}