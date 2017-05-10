+++
title = "Barcelona AWS Meetup - May'17"
subtitle = ""
date = "2017-05-10T19:55:00+01:00"
bigimg = ""
+++

As part of the [Skyscanner](http://skyscanner.net) ambassador group in Barcelona, we support the local software community by helping organize different events. On May 9th the [Barcelona AWS meetup](https://www.meetup.com/Barcelona-Amazon-Web-Services-Meetup/events/239518577/) was held at the office.
<!--more-->

There were two talks in the meetup, both dealing with serverless computing:

**1st talk**

The first talk by [Serhat Can](https://twitter.com/srhtcn) dealt with serverless architectures on AWS Lambda. During the talk it was presented the experience of [OpsGenie](https://www.opsgenie.com/) with serverless architectures for their alerting and monitoring service.

[OpsGenie](https://www.opsgenie.com/) is an alerting service somehow similar to the one that [VictorOps](http://victorops.com) offers. At Skyscanner we make use of VictorOps for alerting, on-call rotation and 24 hour support.

One of the use cases shown that caught my attention was the [DynamoDB](https://aws.amazon.com/dynamodb/) autoscaling system they have in place. Some of the cool features along it include a configurable DynamoDB table alarm in [Cloudwatch](https://aws.amazon.com/cloudwatch/) that is updated with the increase/decrease of the table capacity.

At Skyscanner hotels we faced similar issues in the past as we make an intensive use of DynamoDB for the service that manages the sorting of hotel partners in the search results in case of price parity. The algorithm behind this computation, that we call [*Partner Sorting Algorithm*](http://codevoyagers.com/2016/02/24/solving-the-problem-of-one-billion-computations/) serves the precomputed positions for each partner from a DynamoDB table.

Another familiar example was the use of Lambdas for replicating data across regions for DynamoDB and ElasticSearch aiming to decouple the replication logic from the application logic. This solution did not work for us due to the large size of our tables and the long time it took to replicate the data between regions.

Finally it was mentioned the challenges that cloud-first services pose such as proper monitoring, high availability, replication, cold start time and blue-green deployment (that we manage through [Slingshot](https://github.com/Skyscanner/slingshot)).

Overall it was really interesting listening to their experience as I can closely relate to many of the problems that surfaced to them while developing our own cloud-native services.

<iframe src="//www.slideshare.net/slideshow/embed_code/key/cHm2JpSQVSHpOL" width="510" height="420" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/cansrht/serverless-architectures-on-aws-lambda" title="Serverless Architectures on AWS Lambda" target="_blank">Serverless Architectures on AWS Lambda</a> </strong> from <strong><a target="_blank" href="//www.slideshare.net/cansrht">Serhat CAN</a></strong> </div>

**2nd talk**

The second talk focused on serverless data processing with Data Pipeline, Docker, Lambda, API Gateway, ECR and SNS by one of my colleagues at Skycanner, Radek Miazio.

Radek talked about the different AWS services that could be used for the processing they needed to do in order to create an index for Skyscanner's internal representation of the world. After discarding many of the AWS services due to their limitations, they settled up with Data Pipeline and explained some of the problems they faced such as:

 - Complex setup due to the massive JSON
 - The long initialization that caused API Gateway to timeout (service cold start again)
 - Long delay in logs (up to 20 minutes)
 - Limits to the *infinite* resources that the cloud provides

<iframe src="//www.slideshare.net/slideshow/embed_code/key/K284LtP7pBU87q" width="510" height="420" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/radekmiazio/serverless-data-processing-with-data-pipeline" title="Serverless data processing with Data Pipeline" target="_blank">Serverless data processing with Data Pipeline</a> </strong> from <strong><a target="_blank" href="//www.slideshare.net/radekmiazio">Radek Miazio</a></strong> </div>

**Final thoughts**

From both talks it could be distilled that when designing a serverless service the solution has to take into account the constraints of the still immature services offered which sometimes are not clearly laid out in the docs.

Finally these experiences also surface that the vast computing resources that the cloud provides outgrow the intricacies of developing ad-hoc services coupled to the available proprietary services.

The meetup was recorded and is available in [Youtube](https://www.youtube.com/watch?v=1u4L4CtVz4c):

{{< youtube 1u4L4CtVz4c >}}
