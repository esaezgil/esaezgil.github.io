+++
title = "Hackatrips - January'18 Madrid"
bigimg = ""
subtitle = ""
date = "2018-01-25T15:14:05+02:00"
keywords = "hackathon, android, python, docker, AWS, Fitur"
description = "Review of the Hackatrips hackathon, Madrid January'18"
+++

[Fitur](http://www.ifema.es/fitur_06/) is the largest trade show for the tourism industry in the world. It is held in [Ifema](http://www.ifema.es/Institucional_06/), Madrid's trade fair, once a year.

During the last two days of the fair, [minube](https://minube.com) organized [Hackatrips](https://Hackatrips.com/), a hackathon encouraging innovation around the tourism industry. <!--more-->

<img src="/img/hackatrips/hackatrips_logo.png" height="50%" width="50%"/>

Since my day to day job involves creating technology to solve travelers' needs, I thought it would be nice to put together a project over a couple of days, working with new people and find out more about where the industry is heading to.

<blockquote class="twitter-tweet tw-align-center">{{< tweet 954653951009480704 >}}</blockquote>

The team
--------

The organizers created the teams for people who signed up individually and placed me in a team of four:

 - three developers including myself
 - a *tourism expert* which was supposed to give us context on the latest needs and demands of the industry.

I wrote *tourism expert* with italics to remark the fact that this self-appointed expert was actually a vacation rental owner. It turned out that she attended the event to have an idea of hers for automating the paperwork of running her business developed for free by the developers of her future team.

I handled the situation by offering her to work as contractors anytime in the future on an hourly-rate and taking a commission of the future huge revenue her idea would rake in. Obviously we have not heard back from her after the hackathon ...

The project
-----------

The other two members of the team were Android developers. Taking into account our skills, we decided to make an Android app consuming information from a backend that would aggregate and normalize the different APIs we would make use of to create our product.

We had several ideas for travel related products and discussed the feasibility of completing each of them over the short time span of the hackathon.

Finally, we set on to make an app that based on the information provided by the [BBVA API](https://www.bbvaapimarket.com/products) for their customers, such as their income, inferred price sensitivity and other data would recommend upcoming trips, hotels and activities.<br> Having information about the clients' income and upcoming trips would eventually allow the bank to offer tailored loans and other services such as travel insurance.

The hackathon had several sponsors and some of them offered prizes for using their APIs so we aimed at using as many as possible. We ended up using:

 - HotelCombined API for retrieving hotels in a destination along prices and their information like pictures
 - [BBVA API](https://www.bbvaapimarket.com/products): we had to mock it as their testing API, which was the one we had access to, had basically no data and it basically spoiled our initial idea.
 - An adhoc API created by [minube](https://minube.com) for the hackathon with information about POIs and activities in the destination cities.

<img src="/img/hackatrips/hackatrips_sponsors.png" height="50%" width="50%"/>


Developing the project
----------------------

We defined the user flow of the app and the JSON schemas with the required information for each of the views. The two Android developers started working on the app with mocked responses and I started hacking together the endpoints in the backend.

For simplicity, I decided to use Flask for easily prototyping the endpoints. In terms of code quality this is by far one of the worst pieces of code I have ever written.

I wasted some time at the beginning trying to figure out how to make use of Oracle's infrastructure for deploying the flask app without any success and afterwards I was rushing to have the endpoints working for the demo towards the end of the event.

It was also not clear where we would obtain the information to tailor the list of destinations for each customer. Therefore, we opted again to just have an initial list for the demo as a proof of concept. <br>
Working with HotelsCombined API was less enjoyable than expected as their API response takes quite a long to load and has to be polled repeatedly making the user experience for our product quite bad.

I made use of an [AWS](https://aws.amazon.com) EC2 instance to deploy my simple Flask app and minutes before the deadline we managed to connect the Android app to the backend's endpoints.

Here is a video we recorded barely on the deadline (it was a requirement of the competition along making the code repository public):

{{< youtube ncPRdzGYTmI >}}


The other member of the team which was not coding, created a presentation explaining the idea behind the product for the demo at the end of the event. The presentation below might not be the latest version but allows for making an accurate idea of what it was like in the end.

<center><p><iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRFPFK5ysyPk2BysYv6dkLDzZ-ZxwhiRaceN48tVwB5NafVLKVDPk0kA_Yz2H1PmwSYnIphGSBuOxNG/embed?start=false&loop=false&delayms=3000" frameborder="0" width="640" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></p></center>

The outcome
-----------

As reflected by the video of the app and the presentation, our product idea and the execution was quite bad.

On the contrary, the projects created by the other teams were on average quite good and some of them exceptional. The technical level of many of the solutions proposed was quite high and I really liked many of the ideas of the other teams and their execution.

<blockquote class="twitter-tweet tw-align-center">{{< tweet 955160893595242496 >}}</blockquote>

On the positive side I was surprised by the commitment of the other two developers of my team to have at least a working prototype ready for the demo.

The hackathon itself
--------------------

The hackathon was really well organized, both the venue and the food was great and having most of the sponsors providing on-site support was superb as well as the prizes:

<img src="/img/hackatrips/hackatrips_prizes.png" height="50%" width="50%"/>

However, the agenda was a bit tight as the time for developing the project was merely 24 hours.

Summary:
--------

This is my fourth hackathon over the last two and a half years attending as a participant.
Reflecting back on the experience of this last hackathon, I came out with the following take out points:

  - Participating in hackathons requires a big investment in terms of effort, stress and lack of rest over the weekend.
  - Attending a hackathon alone is a double edged sword, specially if the skills and desires of the team you join are not aligned with yours.
  - It's not the best place for meeting other people working in the tech industry as everyone is focused on delivering.


<img src="/img/hackatrips/hackatrips_participants.jpg" height="50%" width="50%"/>

P.S. Take a look at some of my previous blogs about other hackathons I attended:

- [Angelhack Barcelona](https://esaezgil.com/events/thackmallorca16/) as a participant
- [THack Mallorca](https://esaezgil.com/events/thackmallorca16/) as a participant
- [LauzHack Lausanne, Switzerland](https://esaezgil.com/events/lauzhack16/) as a sponsor
- [HackUPC Barcelona](https://esaezgil.com/events/hackupc16/) as a sponsor
