---
title: Highlights From rstudio::global
author: Matt Kaye
date: '2021-02-11'
slug: []
categories:
  - data science
tags:
  - data science
  - R
lastmod: '2021-02-11T16:37:34-07:00'
toc: true
---

`rstudio::global`, this year's iteration of the annual RStudio conference, was a few weeks ago. Here were some highlights:

## Talks

There were a few talks I really loved:

-   [Using R to Up Your Experimentation Game](https://rstudio.com/resources/rstudioglobal-2021/using-r-to-up-your-experimentation-game/), by Shirbi Ish-Shalom. On experimentation, sequential testing, taking big swings, and being statistically rigorous
-   [Maintaining the House the Tidyverse Built](https://rstudio.com/resources/rstudioglobal-2021/maintaining-the-house-the-tidyverse-built/), by Hadley Wickham. On building and maintaining the Tidyverse, and what package maintenance in the real world is like when you have millions of downloads.
-   [oRganization: How to Make Internal R Packages Part of Your Team](https://rstudio.com/resources/rstudioglobal-2021/organization-how-to-make-internal-r-packages-part-of-your-team/), by Emily Riederer. On how using internal packages (like `collegeviner` at CollegeVine!) can improve your R workflow and make teamwork in R dramatically easier, smoother, and more efficient.
-   [Fairness and Data Science: Failures, Factors, and Futures](https://rstudio.com/resources/rstudioglobal-2021/fairness-and-data-science-failures-factors-and-futures/), by Grant Fleming. On model fairness, bias, and evaluation techniques, and why they're important to get right.

## Cool New Things

-   `finetune`, Max Kuhn's new `tune`-adjacent package, is live (albeit a little buggy)! It has some cool new model tuning algorithms, including racing methods with `tune_race_anova()` and `tune_race_win_loss()`, in addition to my personal favorite: `tune_sim_anneal()` for Simulated Annealing! [Link to the talk](https://rstudio.com/resources/rstudioglobal-2021/whats-new-in-tidymodels/)
-   Major improvements to `shiny`, including some serious caching upgrades that'll improve performance dramatically! [Link to the talk](https://rstudio.com/resources/rstudioglobal-2021/making-shiny-apps-faster-with-caching/)

## Other Highlights

-   Meeting a bunch of people in the breakout sessions! This year, there were virtual "tables" where you could drag your avatar to "sit down", and once you were close enough to a table you could hear all of its conversation.
