---
title: 'A/B Testing: A Primer'
author: Matt Kaye
date: '2022-03-25'
categories:
  - data-science
  - statistics
tags:
  - ab-testing
lastmod: '2022-03-25T19:21:56-04:00'
toc: true
---

This is the first post in a series I'm planning on writing on A/B testing. In this post, I'll lay out a top-level overview of what A/B testing is and why companies do it. In future posts, I plan on diving into some common pitfalls, bad habits, and anti-patterns I've seen, and the systems we've put in place to mitigate them and allow our team to run statistically rigorous, fast A/B tests to make informed product decisions as quickly as possible.

At work, we generally try to keep documents like this written at a high level: The objective is for them to be understandable and useful for general audience. That will be the case here too, for the most part.

> In these posts, I'll use callout boxes like this (in addition to `Appendix` sections) to walk through technical details. If you're not interested in the weeds, feel free to skip these sections entirely!

## What's an A/B Test?

So, what is an A/B test, anyways? It's probably easiest to explain with an example:

Let's imagine that I had been tracking the click rate on my blog posts over time. It's pretty terrible -- let's say that the rate that someone clicks into any particular post from the main menu page is 5%. This means that of all of the views of my blog's main page, only 5% of those page views actually result in a click on one of my posts. Pretty miserable, right?

But today I'm feeling optimistic. Right now, when a user hovers over a post title, it gets underlined in red. "But wait!" I think. What would happen if I made the underline blue instead?

And now, I have an A/B test. In this test, the "A" group (or the "control") is the current state of the world: The red underline. The "B" group (or the "variant" or "treatment" group) is the proposed change: The blue underline.

The basic idea of an A/B test is to run these two versions of my blog side-by-side, measuring the click rate in each version, and seeing which version ends up performing better. If the blue underline version -- the variant -- ends up increasing the click rate to my blog posts, then the conclusion is that I'd be better off permanently changing the underline to blue.

## Why Test?

In my trivial example above, the color of the underline doesn't seem super consequential (and it's not). But this isn't always the case. For instance, Facebook changed their notification icon color from blue to red once upon a time, and the rest was history. Amazon might A/B test a new model for recommending products to users, or Netflix a new model for recommending shows. A company doing lots of email marketing might A/B test different types of ways of addressing their emails (e.g. "Dear Matt" vs. "Hey Matt"), and so, so much more. Changes like these can have enormous business implications, and, as such, A/B testing makes up the backbone of so much of the tech and products we interface with every day. Companies want to maximize their conversion rates, click rates, revenues, etc. and A/B testing is one tool in their tool box for optimizing all of the metrics they care about.

If there's one takeaway here, it's this: Someone wants to make their product "better" in some sense, and to figure out whether or not a new idea of theirs is actually better than the current state of the world, they test it.

> In statistics world, generally A/B tests boil down to testing "conversion rates" against each other, which usually means that the tests being run are Chi-square tests of independence of the proportions of success across the two groups. If the variant is significantly better than the control, we call the test for the variant and roll it out to 100% of users. You might also use a t-test to (e.g.) test if the variant results in significantly more sessions than the control does, or you might use a time series technique like Bayesian structural time series to do pre/post testing to compare user behavior before and after a treatment was applied. For the curious, Google has published an awesome R package called CausalImpact (and an associated talk and some papers, I believe) on this.

## Up Next...

As I mentioned before, the rest of this series of posts will focus, roughly, on the following topics: 1. Okay, so we know what an A/B test is, but how do we actually *run* one? 2. What are the most common anti-patterns, pitfalls, and bad habits that I've seen, and why are they problematic? 3. What are we doing to correct those issues to allow our team to run fast, statistically rigorous A/B tests?
