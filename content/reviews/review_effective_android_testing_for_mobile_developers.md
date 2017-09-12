+++
title = "Review: effective Android testing for mobile developers"
bigimg = ""
subtitle = ""
date = "2017-09-05T16:34:25+02:00"
keywords = "android, review, java, testing, course"
description = "Review of the effective Android testing for mobile developers"
+++

This is my review of [effective Android testing for mobile developers](https://www.linkedin.com/learning/effective-android-testing-for-mobile-developers/) by [Chiu-Ki Chan](https://twitter.com/chiuki).

**TLDR;** crystal clear style, incremental refactoring laying out the concepts and best practices as they arise.
<!--more-->

Course review
-------------

I really enjoyed the flow of the course by which as higher test constructions are added, the code for the example application evolves, making it more maintainable and clear.<br>
Furthermore I could see how the testing concepts I apply in Python on a daily basis working in the backend of [Skyscanner Hotels](https://www.skyscanner.net/hotels) have an equivalent in Android.

I particularly enjoyed the refactor of the activity using the MVP pattern to isolate the interaction with the Android libraries and the robot pattern for implementing the separation of concerns.

Recently, I contributed with a feature to the [Skyscanner Android app](https://play.google.com/store/apps/details?id=net.skyscanner.android.main&hl=en) which is as well using the MVP pattern.
After going through the course, it is much clearer for me the reasoning for keeping all the logic in the Presenter. <br>
I had briefly worked with Mockito previously so the concepts were familiar to me and thanks to the MVP pattern I could see that it is straight forward to apply it for the testing of the Presenter in the app.

### Minor points to improve:

There were some castings that were not so clear but nothing that affects the super comprehensive flow of the course, I would say it is rather a reflection of my lack of knowledge.

Although at the end of each chapter, a summary is shown, I would have preferred to have diagrams showing the interactions between the different components both through and at the end of the videos.

###  What I would like to see next:

The course is a starting point for introducing the testing concepts behind Android but I would like to see a more complex app with async interactions with web services, maybe for a future course? Where can I sign up for it? :)

Final words:
------------

I would definitely recommend the course as an introduction to Android testing and best practices around it.

Score: 10/10

P.S. Am i supposed to pay 30$ indefinitely to get access to courses I took at some point on Linkedin Learn? In that case I would rather go for courses on Udemy and other platforms in which after buying the course, you have lifetime access to the material.
