---
title: What's New in slackr 2.1.0
author: Matt Kaye
date: '2021-02-07'
categories: [R]
lastmod: '2021-02-07T13:07:49-07:00'
toc: true
---

## Introduction

`slackr 2.1.0+` is live! There are a whole bunch of exciting changes that we (mostly [Andrie de Vries](https://github.com/andrie) and I) have made to improve the package a bunch.

## Changes

Here are some of the things that are new in `slackr 2.1.0+`. For more info on the package, check out the [Github repo](https://github.com/mrkaye97/slackr) and the [pkgdown site](https://mrkaye97.github.io/slackr/index.html).

### Ease of Use Improvements

-   We've dramatically improved error messaging, so long gone are the days of errors like `No 'id' column found in 'x'`! Now, error messages should be far more helpful, with some hints about what might be going wrong.
-   We've updated the package documentation significantly, so now there's a far more informative [README](https://github.com/mrkaye97/slackr), some vignettes, and a [pkgdown site](https://mrkaye97.github.io/slackr/index.html).
-   We've more clearly described the different use cases for `slackr`, in order to better help users set up `slackr` in a way that makes sense for them.

### New Features

-   We've fixed a bunch of bugs that were preventing things like `icon_emoji` and `username` from working, so those are fixed now!
-   We've brought back some old functions that were removed in `slackr 2.0.0`: `slackr_history()` and `slackr_delete()`. See the docs for descriptions of what these functions can do.

### Back-End Changes

We've made a ton of changes for how `slackr` interacts with the Slack API:

-   We now allow paging, which is especially helpful when you have a workspace of more than 1000 channels.
-   We cache requests to get lists of channels and users so that we don't need to repeat common API calls. This speeds up calls to `slackr_***()` and limits how often you need to actually hit the API.
-   We've gotten rid of a really nasty implementation of channel caching (writing a local cache to the disk) in favor of the method described above.
-   We've factored out API calls into a separate function, which makes the package easier to understand and test.
-   Speaking of testing, we've implemented a whole bunch of unit tests, and will be working on more.

### Deprecations

-   We've deprecated a bunch of camel case functions in favor of their snake case counterparts for simplicity. Don't worry! These are soft-deprecated for now. They won't go away fully until a future version of `slackr`
-   We've deprecated `text_slackr` in favor of `slackr_msg`, since they do basically the same thing.
