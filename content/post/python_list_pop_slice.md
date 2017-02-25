+++
title = "Python lists: pop() or slice?"
subtitle = ""
date = "2017-02-22T15:16:33+01:00"
bigimg = ""
+++

Recently I had a comment in a merge request in which I was suggested to copy the `Nth-1` last elements of a list, `a[1:]`, instead of popping its first element, `pop(0)`.

I was curious about its performance implications and decided to do some simple tests: <!--more-->

``` python
t1 = timeit.Timer('a=50*[\'a\'];a.pop(0)')
t2 = timeit.Timer('b=50*[\'b\'];b[1:]')
t1.timeit(10000)/10000
6.973965995712205e-07
t2.timeit(10000)/10000
8.281046990305186e-07
```

As shown in the results above, the difference is insignificant at least for small lists.

Checking for bigger lists:

``` python
t1 = timeit.Timer('a=5000*[\'a\'];a.pop(0)')
t2 = timeit.Timer('b=5000*[\'b\'];b[1:]')
t1.timeit(10000)/10000
2.4743527399550657e-05
t2.timeit(10000)/10000
4.327827289962443e-05
```

shows that there's a ~53% performance penalty of slicing versus popping.

Checking even bigger lists:

``` python
t1 = timeit.Timer('a=50000*[\'a\'];a.pop(0)')
t2 = timeit.Timer('b=50000*[\'b\'];b[1:]')
t1.timeit(10000)/10000
0.0002497872758001904
t2.timeit(10000)/10000
0.00044558706480020194
```

shows that slicing the list carries a performance penalty of ~50% compared to just doing a pop of the first element. This penalty seems to plateau after a certain list size.

Some resources to check:
========================

 * [Time complexity in the Python wiki](https://wiki.python.org/moin/TimeComplexity)
 * [Python list implementation explained](http://www.laurentluce.com/posts/python-list-implementation/)
 * [CPython internals: A ten-hour codewalk through the Python interpreter source code by Philip Guo](http://pgbovine.net/cpython-internals.htm)
