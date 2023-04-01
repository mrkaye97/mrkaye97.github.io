---
title: Calling A/B Tests
author: Matt Kaye
date: '2022-04-10'
categories: [data science, statistics, a/b testing]
toc: true
---

In the last post, I gave a bird's eye level overview of the mechanics of running an A/B test. But at the end, we reached a problem: We had two conversion rates -- 20% and 25% -- but we didn't know if the difference between those was really big enough to make a strong claim that the blue underlines were actually performing better than the red ones in some real world sense. If you're asking yourself whether the five percentage point difference between the two conversion rates is statistically significant, then your head's in the right place.

In this post, we'll discuss how we can determine whether our test results are statistically significant. But since statistical significance is an often confusing and nebulous topic, we'll also explore what statistical significance even is (including what p-values are), when it's important, and when it might not be.

## Statistical Significance

Misunderstandings about statistical significance run rampant. It's not a reach for me to say that the majority of the time I hear someone mention that something is "statistically significant" I end up rolling my eyes. But before we get into common mistakes and misunderstandings, we need to first establish what statistical significance actually is.

Intuitively, if something is **statistically significant**, it's unlikely to have happened due to random chance. Not that scary, after all! How unlikely, though, varies wildly depending on the setting. For instance, if we're running clinical trials to determine if a new drug is capable of curing cancer, then we want it to be *very* unlikely that we make a consequential mistake and claim that the drug works when it actually doesn't.

We use p-values as the indicator of the likelihood of our result being due to random chance. In this instance, we would run our test using the number of page views and the number of conversions for each group, and depending on how we ran our test we might get a p-value of 0.43% back. What this p-value actually means is that the probability of seeing the difference in conversion rates between groups that we do (five percentage points) due to purely random chance is 0.43%. A p-value threshold of 5% is very common, so in this case we'd call the test for the variant (since 0.43% is below 5%), and we'd assert that this difference in conversion rates is *statistically significant*.

## Eye Rolling

Back to my eye rolling: I often roll my eyes when someone claims that something is statistically significant for two reasons.

First and foremost: Something being *statistically significant* does not mean that thing is *significant*. Often we get so hung up on things being statistically significant that we forget that lifting some metric by 0.0001% isn't *practically* significant, since it won't make any difference in the end. If 0.0001% more people read my blog posts, what do I care? That's something like 1 extra person every hundred years (optimistically).

Secondly, I often roll my eyes because of the number of choices and assumptions that need to be made along the way, many of which tend to be difficult to defend. One choice, as previously mentioned, is the p-value threshold (alpha) that you choose. In some instances, we want to be *very* confident that we're not leaning into results that are the result of random chance, and so we might use a lower threshold. In other cases, we might be okay with taking on more risk of a false positive result in order to run our tests faster and mitigate the risk of a false *negative* (saying something does not help when it actually does).

Another thing that will affect the results we see is the type of test we're running: one-tailed or two-tailed. Often, online calculators like [this one](https://www.evanmiller.org/ab-testing/chi-squared.html) will use two-tailed tests by default because they're more conservative. But in my opinion, using a two-tailed test doesn't actually make any sense. Here's why: A two-tailed test checks if the conversion rates of the variant and the control are *not equal*, which means that we can get a statistically significant result if the variant is significantly *worse* than the control, in addition to if it's significantly *better*. But in A/B testing, we're only going to call a test for the variant when it's significantly better, so why do we care about the case where it's worse? We want to test the hypothesis that the variant is significantly better than the control, not that it's not equal, and that's what a one-tailed test does. If you use two-tailed tests, it'll be harder to get significant results without any real benefits.

> Yet another consideration is how the statistical test was actually conducted. For instance, if you use a Chi-square test with Yates's continuity correction (the default in R, although a little controversial among statisticians), you'll end up with higher (more conservative) p-values than if you don't correct, which is why the p-value I just reported is higher than the one you'd get from most online calculators that don't use the correction.

Finally, and most importantly, is that the mechanics of running the test actually affect the chance that you are reporting a false positive result. For example, if you were to run the test described in the past few posts and calculate the p-values every time a new user visited the page and call the test for the variant the first time it were significant, you'd have just blown up the chances of a false positive result.

## A Common Mistake

The most common mistake I see that's made by people running A/B tests is using the "call it when it's significant" heuristic. As I mentioned before, checking in on your test often and calling it for the variant the first time you get a significant p-value is a huge problem because the false positive rate of your test compounds the more you check on it. The reason for this is a statistical concept called [multiple testing](https://en.wikipedia.org/wiki/Multiple_comparisons_problem), and there's [an XKCD comic](https://xkcd.com/882/) about it!

So we want to avoid checking the test all the time, but this raises another problem: If we can't check our test all the time, how do we know when to call it? And this is where test planning comes in. There are a number of online test planners (which generally make shoddy assumptions, like that you're running a two-tailed test when you should be running a one-tailed one instead) like [this one](https://www.evanmiller.org/ab-testing/sample-size.html) that take a few parameters and tell you how long to run your test for. And these planners are great! The idea is that if you can plan your test in advance, given that you know your baseline conversion rate and can specify how big of a lift you're shooting for, then all you have to do is wait until you hit the sample size number that the calculator gives you back. Once you hit it, you check in on your test, run your p-value calculation, and call the test.

So, problem solved, right? Well, not quite. Because while we've solved the multiple testing problem where we blow up our false positive rate by checking the test all the time, now we have a new issue: We have to wait until we hit some (potentially big) sample size before we can call our test, and that's problematic for teams that want to iterate quickly.

The next post in this series is the punch line. It'll discuss sequential testing, which is the methodology that makes up the guts of how we run A/B tests at CollegeVine. Sequential testing solves the problem of needing to wait until you hit a final sample size to call your test without making any sacrifices on the rigor front, which means you can call your tests quickly and reliably.
