+++
title = "Barcelona Ruby Coding Dojo - February'18"
subtitle = ""
date = "2018-02-07T11:55:00+01:00"
bigimg = ""
keywords = "review, meetup, Coding Dojo, Ruby, 99 bottles, extreme programming"
description = "Review of the Blockchain Meetup, Barcelona June'17"
+++

Yesterday I attended the [Barcelona on Rails Meetup](https://www.meetup.com/Barcelona-on-Rails/). The meetup itself was actually a Dojo and a presentation followed by a discussion around code quality.
<!--more-->

The speaker was [Daniel Carral](https://twitter.com/dcarral) and started the presentation by introducing Extreme Programming practices. He briefly discussed the day to day, moment to moment, work of the XP developers (the innermost section of the diagram).

<img src="/img/extreme_programming/extreme_programming_practices.png" height="60%" width="60%"/>

These practices are mostly part of my daily work and the bit I found most interesting was the discussion on simple design through this diagram:

<img src="/img/extreme_programming/simple_design_diagram.png" height="60%" width="60%"/>


As depicted in the diagram the last priority when developing should be that the tests pass (as this is a taken for granted as otherwise the [Continuous Integration system](https://www.martinfowler.com/articles/continuousIntegration.html) would point it out and the code would not be merged).

However, when working on other team's codebase I think that due to the lack of knowledge of the codebase, specially for old codebases with lots of technical debt, sometimes we put initially the most emphasis on passing the test and later, on revealing intention and doing so through the fewest elements.

I had not seen this diagram before but find it as a useful reminder of what should be our aim when developing software.

<blockquote class="twitter-tweet tw-align-center">{{< tweet 965561247390490624 >}}</blockquote>

Next, we started with the 99 bottles of beer code Kata based on [Sandi Metz's](https://twitter.com/sandimetz) [book](https://www.sandimetz.com/99bottles/) of the same name.

I bought Sandi's book before Christmas this year, after watching during lunch at work one of her talks but it's still unopened. It's actually this Kata what triggered my interest to attend the meetup.
During the Kata we went through the first Chapter of the book

In order to frame the discussion over the quality of the different solutions exposed, Daniel showed us some metrics used in the industry throughout time to measure code quality: from Lines of Code in the 60s to the well-known Cyclomatic complexity, [ABC](https://en.wikipedia.org/wiki/ABC_Software_Metric) (Assignmets, Branches and Conditions) and even the [squint test](https://atom.io/packages/squint-test).

We also discussed a bit over the [SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) and the part that easy testing plays on assuring the quality of the code.

After presenting different groups of people their solution, Daniel showed us 4 extra solutions to be discussed by the attendees.

The discussion itself proved useful and my take-out point was once again the [KISS principle](https://people.apache.org/~fhanik/kiss.html): Keep It Simple Stupid.

He also showed the quality assigned to each of the 4 solutions he presented by a Ruby tool called [flog](https://github.com/seattlerb/flog).

Conclusion
----------

I enjoyed the meeting and the ensued discussion as it was not Ruby-centric but rather about best practices on software development.

Finally, after the meetup I am again looking forward to take up Sandi's book.

Daniel's presentation can be found [here](https://github.com/dcarral/good-code/blob/master/slides/good_code_barcelona_02_2018.pdf)
