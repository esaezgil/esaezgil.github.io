+++
title = "AngelHack - May'17"
bigimg = ""
subtitle = ""
date = "2017-05-25T18:34:25+02:00"

+++

[AngelHack](https://angelhack.com/) organized a hackathon in Barcelona last weekend with different challenges and prizes. Having attended over the last year two other hackathons as a sponsor I thought it would be nice to get back to the hacker side and put together a project over the weekend.
<!--more-->

I came along with another engineer from [Skyscanner](https://skyscanner.net). Neither of us had a previous idea we wanted to develop over the weekend so we were eager to listen to other people's ideas and join them to make it a reality over the weekend.

<blockquote class="twitter-tweet tw-align-center">{{< tweet 865858581043740675 >}}</blockquote>

We both ended up joining the *Infobecas* team which pitched their idea about a two-sided platform for institutions and scholarship seekers that automatically matches individuals with scholarships.<br>
The reason for joining the *Infobecas* team boiled down to the clear scope of the project, the social vision behind it and the feasibility of implementing a minimum viable product over the short time span of the hackathon.

Initially, we discussed the different possibilities available for parallelizing the work between the two developers of the team taking into account:

- the strict time constraint
- our own technical abilities and current expertise
- making a mobile first product, available from the beginning to the highest number of users

We reached to the conclusion that going for a backend/frontend architecture implemented between two people over the next 24 hours would severely haphazard the possibility of having something usable for the demos. Therefore, we wanted to abstract from the frontend part as much as possible and focus on the backend where both of us had most experience.

The solution we agreed on would make use of the [Telegram](https://telegram.com) API to connect people through a chat based interaction with our backend in charge of matching institutions offering scholarships with individuals based on the inputs collected through a bot-based conversation.

We chose the [telepot](https://github.com/nickoala/telepot) python SDK to create a Telegram-based chat bot. However, after some initial fiddling and finding some shortcomings of the SDK regarding custom keyboards we opted in for migrating to the [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot).

We made use of [Docker](http://docker.com) to deploy our application to the [AWS](https://aws.amazon.com) cloud. Our dockerized environment consisted of 3 containers:

  - [redis](https://redis.io/): for data persistence, storing the user profiles collected through the chat
  - a python app for the bot interacting with scholarship seekers
  - a python app for institutions after matching their scholarship criteria with the scholarship seeker's profile

After ~24 hours we had a working prototype that was able to interact with the users through a series of predefined questions. Since there were only 2 minutes per team for pitching each project to the judging panel we rehearsed the interaction we would be showing and tweaked the user flow through the chat to make it more visually appealing.

<blockquote class="twitter-tweet tw-align-center">{{< tweet 866247908185845760 >}}</blockquote>

Right before the demos we deployed our service to an EC2 machine. The code is available in GitHub: https://github.com/micetti/Infobecas

After coding for most of the day/night we were awarded with the [ESADE](http://esade.edu) [EWorks](http://www.esade.edu/research-webs/eng/eei/eworks) prize.
<blockquote class="twitter-tweet tw-align-center">{{< tweet 866300966630559744 >}}</blockquote>

The hackathon was really well organized, both the venue and the food was great.
However, I missed more interaction between different teams and overall a higher number participants would have made the event more enjoyable.

Finally, the best part of hackathons is the possibility to attend talks from other people introducing new technologies that you can later hack with in your project. I guess that the short time span of the hackathon did not allow for this but it would be definetely a nice addition.

<blockquote class="twitter-tweet tw-align-center">{{< tweet 866302184475942913 >}}</blockquote>

This is the third hackathon over the last 2 years in which I win a prize (out of 3 attending as a participant), not bad :).
Reflecting back on the 3 projects that I participated in, they all shared the following:

- A clearly defined scope for the project before starting the actual coding
- An attainable goal from the technical side taking into account the time constraints
- A mobile first approach
- A working prototype even though it implies mocking some of the data
- A solution for an actual problem that is scalable and extendable

P.S. Take a look at the blog for the previous hackathon: https://esaezgil.com/events/thackmallorca16/
