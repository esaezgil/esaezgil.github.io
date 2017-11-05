+++
title = "Contributing to MadBike Android app"
subtitle = ""
date = "2017-10-05T19:35:13+02:00"
bigimg = ""
keywords = "Android, Java, open source, GitHub, Hacktoberfest, mapview, butterknife, fragment, google"
description = "Contributing to MadBike Android app"
+++

[Hacktoberfest](https://hacktoberfest.digitalocean.com) is a month-long celebration of open source in which people are encouraged to contribute to open source projects in GitHub.
<!--more-->

I started this year's contributions by making a [pull request](https://github.com/Mun0n/MADBike/pull/3) to [MadBike](https://play.google.com/store/apps/details?id=org.drunkcode.madbike) an app that helps make use of [Madrid's public bike rental service](https://www.esmadrid.com/en/bike-rental-in-madrid).

In particular, this contribution tackles a reported issue for adding a map type selector using the [Google Maps Android API](https://developers.google.com/The proposed design looked simiandroid/reference/com/google/android/gms/maps/GoogleMap#setMapType(int)). The proposed design hinted to that of Google's default:

<center>
<figure>
<img src="/img/madbike_android_app/map_type_android_1.png" height="50%" width="50%"/>
</figure>
</center>

Therefore, to achieve the proposed design and functionality I made use of a [Spinner](https://developer.android.com/guide/topics/ui/controls/spinner.html) which takes as an input an [ArrayAdapter](https://developer.android.com/reference/android/widget/ArrayAdapter.html) with the translated Strings from the application's resources.

The app makes use of a [fragment](https://developer.android.com/guide/components/fragments.html) that implements the [onMapReady](https://developers.google.com/android/reference/com/google/android/gms/maps/OnMapReadyCallback) callback to draw the different UI elements. I simply added a [private method](https://github.com/Mun0n/MADBike/pull/3/files#diff-e792c8ad115e4fd521f4da87324a769fR318) that adds the spinner whenever the [onMapReady callback](https://developers.google.com/android/reference/com/google/android/gms/maps/OnMapReadyCallback) is triggered. The last thing I did was adding the spinner to the [fragment layout](https://github.com/Mun0n/MADBike/pull/3/files#diff-43f5f1127d690ff77dfca73b8581ca3fR128).

The most time consuming piece of work was related to properly setting up the application itself for development since the [crashlytics](https://try.crashlytics.com/) dependency was not correctly configured.<br>
In order to fix that, I had to do quite a bit of research and find the proper crashlytics version compatible with the code which led me to submit another [Merge Request](https://github.com/Mun0n/MADBike/pull/2/files) that was rejected for the sake of not polluting the maintainer's production statistics.
Furthermore, I had to fight with the [Gradle configuration](https://developer.android.com/studio/build/index.html#properties-files) as well until I was able to successfully build the app.

Overall, this contribution helped me refresh my Android development skills and learn about [Butter Knife](http://jakewharton.github.io/butterknife/), a framework to inject views into Android components that I had never heard about before. As usual [Voguella's website](http://www.vogella.com/tutorials/) has a really [nice tutorial](http://www.vogella.com/tutorials/AndroidButterknife/article.html) for it.

The final result is shown below:

{{< gallery >}}
  {{< figure link="/img/madbike_android_app/madbike_android_map_type_contribution_1.png" >}}
  {{< figure link="/img/madbike_android_app/madbike_android_map_type_contribution_2.png" >}}
  {{< figure link="/img/madbike_android_app/madbike_android_map_type_contribution_3.png" >}}
{{< /gallery >}}

<!-- {{< load-photoswipe >}} -->

The not so happy part of the story is that my contribution has not yet been accepted.  <br>
This is one of the drawbacks of contributing to open source projects as understandably maintainers work on them mostly on their spare time with no other reward than their personal interest on the project itself.

This has been the case as well for another contribution that I did some time ago for the [Jinja](https://github.com/pallets/jinja) project that is still [pending to be merged](https://github.com/pallets/jinja/pull/601).
