+++
title = "LaTeX and moderncv in macOS"
subtitle = ""
date = "2017-02-11T18:25:12+02:00"
bigimg = ""

+++

Confronted with the task of writing a CV for the first time many students resort to Microsoft Word and sloppy templates to be found on the Internet. <!--more-->

Recently, I was helping a family friend proofreading her CV and decided to also teach her about [LaTeX](http://www.latex-project.org/about/) and [moderncv](https://github.com/xdanaux/moderncv) in order to craft a high quality CV for her summer internship applications.

I used LaTeX extensively in the past to write my [Master Thesis](http://projekter.aau.dk/projekter/en/studentthesis/enabling-the-spectral-efficient-coexistence-of-device-to-device-and-device-to-infrastructure-communications-through-opportunistic-interference-cancellation(6171379f-9d84-4eb0-a7fe-b14d830e4a6e).html), multiple essays and student projects during my Master studies. Since I had been using [MiKTeX](https://miktex.org/) in Windows, which takes quite a lot of space in the hard drive, I decided to check if I could make it through with a minimal LaTeX installation in my MacBook. Fortunately, this was the case:

**moderncv and LaTeX minimal requirements for macOS:**

  - [BasicTeX](https://www.tug.org/mactex/morepackages.html): BasicTeX is a subset of TeX Live of size 110 megabytes instead of 2 gigabytes. Perfect for our purposes!

  - [Texmaker](http://www.xm1math.net/texmaker/download.html): Texmaker is my favorite LaTeX editor, it is free and cross-platform.

  - [TeX Live Utility](http://amaxwell.github.io/tlutility/): a graphical interface for [TeX Live Manager](http://www.tug.org/texlive/tlmgr.html), which is a tool provided to update and maintain TeX Live. We will use *TeX Live Utility* to install moderncv and some extra packages required.

  After installing the previous, we need to install moderncv along some extra requirements through TeX Live Utility. As shown in the picture below, it can be done by simply searching for the packages and installing them.

  <center>{{< figure src="/img/TeXLiveUtility.png" title="Installing packages with TeX Live Utility" width="720" height="405" >}}</center>

  The complete list of packages to be installed through TeX Live Utility are:

  - moderncv
  - xpatch
  - fontawesome

  After this relatively short process you should be ready to start writing your shiny new CV.

  Check [Xavier Danaux's GitHub](https://github.com/xdanaux/moderncv) for examples or [LaTeX Templates](http://www.latextemplates.com/template/moderncv-cv-and-cover-letter) to help you get started.

  Finally, bear in mind that moderncv includes a fantastic template for cover letters as well.
