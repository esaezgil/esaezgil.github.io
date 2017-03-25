---
author: thinkreleaseblog
comments: true
date: 2016-09-04 13:24:25+00:00
excerpt: 'Key learnings #python #oss #django '
layout: post
link: https://thinkreleaseblog.wordpress.com/2016/09/04/contributing-to-pretix/
slug: contributing-to-pretix
title: Contributing to Pretix
wordpress_id: 162
categories:
- Python
tags:
- django
- oss
- Python
---

Recently I had the chance to contribute to Pretix ([https://pretix.eu/about/en/](https://pretix.eu/about/en/)) a Django-based event ticketing platform.<!--more-->

I submitted a couple of merge requests that were accepted:
 - [https://github.com/pretix/pretix/pull/202/files](https://github.com/pretix/pretix/pull/202/files) [https://github.com/pretix/pretix/pull/204/files](https://github.com/pretix/pretix/pull/204/files)

I will briefly detail some of the key learnings:


  1. **Django models**: Being absolutely new to Django, I had the opportunity to learn along the way about one of its key features, the Models.
Models are objects that the ORM will store in the database, a quick intro here: 
[http://tutorial.djangogirls.org/en/django_orm/](http://tutorial.djangogirls.org/en/django_orm/)
It was quite surprising as well the ease of the development thanks to the automatic migrations in the database schema.
More detailed info on Models here:
[http://www.djangobook.com/en/2.0/chapter05.html](http://www.djangobook.com/en/2.0/chapter05.html)


  2. **all keyword in Python**:
In order to check whether a condition was True for all the elements of a list I simply iterated over them and checked for the condition:

    ``` python
    for i, op in enumerate(positions):
        cancelable_products.append(op.item.allow_cancel)
    if False in cancelable_products:
        cancelable = False
    ```

    However a much simpler solution making use of list comprehensions and the all() keyword in Python is possible:

    ``` python
    cancelable = all([op.item.allow_cancel for op in positions])
    ```


  3. **Metaclasses in Python**:
Although I had read about Python Metaclasses in this excellent post ([https://jeffknupp.com/blog/2013/12/28/improve-your-python-metaclasses-and-dynamic-classes-with-type/](https://jeffknupp.com/blog/2013/12/28/improve-your-python-metaclasses-and-dynamic-classes-with-type/)), Django Models are a really good practical example of their value and use.
The Metaclasses are used in the Django Models to dynamically create classes.


  4. **Difference between select_related and prefetch_related in Django:**
**prefetch_related**: does a separate lookup for each relationship, and does the ‘joining’ in Python. This allows it to prefetch many-to-many and many-to-one objects.
<br>
  **select_related**: limited to single-valued relationships - foreign key and one-to-one. Creates an SQL join including the fields of the related object in the `SELECT`statement retrieving the related objects in the same (but more complex) database query.
<br>
  By using `select_related` instead of `prefetch_related`, one query to the DB is saved.
 More info on Django QuerySet: [https://docs.djangoproject.com/en/1.10/ref/models/querysets/](https://docs.djangoproject.com/en/1.10/ref/models/querysets/)


Head over to this post for more details on Metaclasses in Django: [http://reinout.vanrees.org/weblog/2013/05/16/advanced-python-metaclasses.html](http://reinout.vanrees.org/weblog/2013/05/16/advanced-python-metaclasses.html)
