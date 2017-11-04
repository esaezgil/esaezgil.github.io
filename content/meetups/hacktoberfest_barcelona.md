+++
title = "Organizing Hacktoberfest Barcelona - Oct'17"
bigimg = ""
subtitle = ""
date = "2017-11-04T10:24:12+01:00"
keywords = "Hacktoberfest, Barcelona, meetups, open source"
description = "Organizing Hacktoberfest, Barcelona October'17"
+++

[Hacktoberfest](https://Hacktoberfest.digitalocean) is an event sponsored by GitHub and Digital Ocean
to promote new contributions to open source. After talking with [Joan](twitter.com/joanvila), a fellow engineer at [Skyscanner](https://skyscanner.net) we decided to host such an event at Skyscanner's premises: [Hacktoberfest Barcelona](https://hacktoberfestbarcelona.com).
<!--more-->

After spamming people around the office up to 10 engineers joined us to setup the event along our coworkers from the talent team. I did not expect such a big response but I am very glad that it was like that.

We created a [Trello](https://trello.com) board with some tentative projects that people could contribute to.

Thanks to the people from [Hacktoberfest Poznan](hacktoberfest.pl) that created a super cool website and released it under an MIT license, we could easily setup our own website for the event by hosting it in GitHub pages. Check it out at: [hacktoberfestbarcelona.com](https://hacktoberfestbarcelona.com)

<center>
<figure>
<img src="/img/hacktoberfest_barcelona_screenshot.png" height="30%" width="30%"/>
<figcaption>
Screenshot of the Hacktoberfest Barcelona mobile website<br>
</figcaption>
</figure>
</center>

A static website offers many advantages like instant hosting through Github pages as they are based on an amazon s3 bucket serving static content.

Using [Cloudflare](https://Cloudflare.com) we enforced https and by configuring the appropriate DNS redirections in our domain registrar the website was ready to go public.

Along the way I learnt about [SaaS](http://sass-lang.com/) for CSS styling, [Gulp](https://gulpjs.com/) for asset management, minification and a [Travis](https://travis-ci.org/) workflow allowing to push generated content into the main git branch from where the static content is served.

Recently, [Cloudflare](https://Cloudflare.com) added [apps](https://www.cloudflare.com/apps/) that are small customizable scripts. I found it to be very convenient for adding small functionalities like a cookie disclaimer.<br>
Obviously, all of this can be achieved by adding the appropriate javascript and html code but for small and quick additions this worked pretty well and was less time consuming than doing it myself from the ground up.

Making use of [Cloudflare apps](https://www.cloudflare.com/apps/) we added a cookie notice, a before you go popup for newsletter subscriptions through [MailChimp](https://MailChimp.com) and sections for the sponsors, the organizers and for our newsletter.

After setting up the website and the tickets in [EventBrite](https://www.eventbrite.com/e/hacktoberfest-barcelona-tickets-38664528646#) we reached out to different developer communities in Barcelona and waited wondering whether anyone would bother to sign up.<br> To our surprise, the event was sold out in less than 3 hours (we could only host up to 40 people comfortably).

<center>
<figure>
<img src="/img/hacktoberfest_barcelona_traffic.png"/>
<figcaption>
Traffic distribution for Hacktoberfest Barcelona event<br>
</figcaption>
</figure>
</center>

Moreover, people kept signing up for the waiting list and eventually there were more people in the waiting list than in the event itself.

In order to track interest I also set up google analytics and added a newsletter to collect people's emails interested in future events.

We split the different organizational tasks in the following way:

- setting up the website for the event: myself
- reaching out to people in the Barcelona software community: [Jordi](https://twitter.com/jordixou)
- initial talk: [Justyna](https://twitter.com/jmkaluzka)
- logistic support (talent team)
- support for attendees: [Joan](twitter.com/joanvila)

Quickly the event was sold out and we decided to increase the number of tickets.

During the event we shared pizza and drinks and later started working on issues with the hacktoberfest label in Github. the contributions ranged from projects that we use internally such as [aiohttp](https://github.com/aio-libs/aiohttp) to deep learning, algorithm books, opengl projects and others.

We gave away Skyscanner Tshirts to those participants that made at least a pull request and briefly shared what we were working on during the event.

Finally, as a word of warning I will encourage organizers of free events to allow over booking of the event as a lot of people that sign up for these kind of events do not show up oblivious to the work and effort behind them.

Special thanks to the [organizers](https://hacktoberfestbarcelona.com/#organizers), talent team, [Skyscanner](https://skyscanner.net) for sponsoring the event and fellow [Skyscanner engineers](https://medium.com/@SkyscannerEng) not mentioned here that helped before, during and after the event.
