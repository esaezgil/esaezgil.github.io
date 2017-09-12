+++
title = "Test-driven information system services"
subtitle = ""
date = "2017-01-27T13:27:21+01:00"
bigimg = ""
keywords = "python, API, testing, jsonschema"
description = "Testing infrastructure during API design and development"
+++

Working for the backend service at [Skyscanner Hotels](https://www.skyscanner.net/hotels) I take part in the development of new services and its associated APIs quite regularly.
<!--more-->

When it comes to API design and development, breaking API changes might void the work of other teams' work, haphazard the timely product delivery, negatively impact several KPIs and be responsible for not delivering any user value and of course break the service for existing users.

Therefore, a flexible yet strong API contract from the beginning allows for the parallelization of the work, a much faster iteration and an incremental release of functionality.

This post aims to describe a strategy for validating and enforcing an API contract during its iterative development.

# Test-driven APIs

During the development of an information system service, a solid development pipeline requires:

  * a strong test suite
  * an automated test infrastructure
  * a zero-click deployment process

Such a solid pipeline along a well-defined vision for the product plays a central role to the overall success of the project and the ever-increasing value delivery to the user.

Furthermore, a strong test suite implies covering all layers of the service:

  - the most basic behavior through Unit Tests
  - the integration with third-party services through Integration Tests
  - the overall user-facing functionality through Acceptance Tests

<center>
<figure>
<img src="/img/testing_pyramid.png" width="360" height="305"/>
<figcaption>
<b>Figure 1: </b>Testing pyramid showing the decremental amount of tests a system should have for higher abstractions<br>
(original source: [google testing blog]( https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html))
</figcaption>
</figure>
</center>

As shown in Figure 1, a decremental test suite is based on the fact that the width and depth of tests covering the most basic behavior, though Unit Tests, will allow for a less exhaustive coverage of the subsequent testing stages.

Every higher logical abstraction implies a longer testing time:

  - Integration tests: require interaction with third-party services
  - Acceptance tests: require setting up blank production-like environments on the fly and interact with third-party services.

 Moreover, when it comes to acceptance tests for complex yet flexible APIs, the myriad of possible scenarios might quickly lead to a large set of acceptance tests yielding the previously detailed undesired scenario.

If not born in mind, a time-consuming testing pipeline will drag down the team's iteration speed.

# Enforcing the API contract

In order to overcome the aforementioned hurdle in the service we are creating at the moment, we implemented the following strategy:

  - Created [JSON Schemas](http://json-schema.org) for the API endpoints' responses. In order to enforce the API contract, all releases must be validated against them. There are several tools available to automate the validation of the defined schemas for example [*jsonschema*](https://pypi.python.org/pypi/jsonschema) in Python.

  - Development of a new set of Unit Tests for our main endpoint (offering lots of flexibility on its usage), covering the different scenarios by:

    - Mocking the response of third-party services.

    - Creating a set of JSON schemas whose properties are not set to *required*.

    - Validating the returned response from the endpoint against the defined JSON Schemas by dynamically setting the required properties for each test according to the scenario.

  - Development of a new set of Integration Tests with the tightly coupled third-party services that would alert us of any breaking change on the 3rd party's side. This can be achieved by validating that their response abides to the service's contract defined in a JSON Schema.

  - Development of a set of Acceptance Tests that check the different clients' use-cases and validates the endpoint's responses against strict JSON Schemas (JSON Schemas in which all required properties are compulsory).

  Finally, the acceptance tests's schemas can be used as the service's documentation.
