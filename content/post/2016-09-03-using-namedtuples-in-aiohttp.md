+++
date = "2016-09-03T14:34:00+01:00"
title = "Contributing to aiohttp"
subtitle = ""
bigimg = ""
keywords = "python, aiohttp, open source, contributing"
description = "Lessons learnt from contributing to an open source project, aiohttp"
+++

Recently I had the opportunity to contribute to the [**aiohttp** library](https://github.com/KeepSafe/aiohttp/). This is one of the libraries that we, the [Hotels](https://www.skyscanner.net/hotels) backend team at [Skyscanner](https://www.skyscanner.net), make use of on a daily basis to create a new backend service. <!--more-->
In this post I will briefly explain the main learnings from this contribution.

The pull request can be found here:
[https://github.com/KeepSafe/aiohttp/pull/1020/files](https://github.com/KeepSafe/aiohttp/pull/1020/files)

Key learnings:

  1. Living on the edge:

    Working in the _master_ branch of a project means that sometimes it may be unhealthy.
    It is always good advice to check whether _master_ is healthy or not when you submit your MR to the CI system ([Travis CI](https://travis-ci.org/KeepSafe/aiohttp) in this case) before pulling your hair searching for a non existing bug in your code.

  2. Namedtuples can be used to define a class through inheritance and by implementing the __bool__ method,

    ``` python
    class WebSocketReady(namedtuple('WebSocketReady', 'ok protocol')):
        def __bool__(self):
            return self.ok
    ```

    it is really easy to check for a condition:

    ``` python
    if WebSocketReady:
    ...
    ```

  3. Write Unit Tests:
This might be obvious, but the point is not just to write them but to write them for every piece of code created.
In this case I had written tests that checked the actual functionality on a high level like:

    ``` python
    def test_websocket_not_ready():
        websocket_ready = WebSocketReady(False, None)
        assert websocket_ready.ok is False
        assert websocket_ready.protocol is None
    ```

    But not the tests that checked the low level functionality like:

    ``` python
    def test_bool_websocket_not_ready():
        websocket_ready = WebSocketReady(False, None)
        assert bool(websocket_ready) is False
    ```

Always good to bear in mind.
