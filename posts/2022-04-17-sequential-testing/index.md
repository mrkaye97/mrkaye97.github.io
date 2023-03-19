---
title: Sequential Testing
author: Matt Kaye
date: '2022-04-17'
categories: [data science, statistics]
toc: true
---

## Introduction

The last post proposed a solution to the multiple testing problem that often invalidates A/B test results  test planning. The idea is to calculate the sample sizes you need for your test in advance, and then wait for your control and variant groups to hit those sample sizes in order to call the test. This approach is a significant methodological improvement from the "call it when it's significant" heuristic: It prevents you from compounding the false positive rate of your test by checking on it all the time.

But there's a different issue with planning the test in advance and running it until the end: It's slow. I use "slow" to mean "slower than it needs to be," in the sense that you will likely end up waiting too long to call a test for the variant when you could've made the call earlier. This waiting around is expensive -- the difference between running a test for a day or two and a week or two matters *a lot* for the teams and businesses running the tests. Often, this big of a time difference can have massive effects on metrics, revenue, learnings, etc., so teams benefit from being able to call their tests faster without sacrificing any statistical rigor.

But how do we do that without checking in on the test all the time? Enter sequential testing.

## Sequential Testing

[Sequential testing](https://en.wikipedia.org/wiki/Sequential_analysis) is a method for running experiments that allows us to evaluate the results of the test we're running *along the way* instead of waiting to hit a pre-determined sample size. Intuitively, you might think about sequential testing like this: If early on in my test I see a massive lift in my metric, I should be able to use a lower p-value than the one I set at the start of my test to call it. It's earlier, hence the lower p-value, but the intuitive idea is that the metric lift is so big that the p-value we'd see would be smaller than some yet undetermined p-value threshold, such that we could call the test.

In A/B testing world, this boils down to building checkpoints into our tests. For instance, imagine you have a test that you're expecting to take six days to hit the final sample size that you need. If you build in three checkpoints, then you can check in on your test on day two, day four, and day six (the end of the test). On day two, if the p-value for your test is lower than the pre-determined day two p-value needed, you call the test. If it's not, you move on to day four and repeat. Once you get to day six, if the test is still insignificant you call it for the control and end the test.

This gives us the best of both worlds: We have a setup where we can call the test on day two if the lift is big enough, but we can do so without inflating the false positive rate of our test. In practice, this means often being able to call tests in half, a third, a quarter, etc. of the time it'd otherwise take, which is hugely valuable for the team running the test.

> Statistical note: There are a number of ways to determine what p-value to use at each checkpoint when planning the test. We use the R package `rpact` for planning tests, and we plan our tests using the O'Brien-Fleming method (with alpha spending). This results in p-value thresholds that increase over time and asymptote to a value slightly less than the initial alpha you specified, depending on the number of checkpoints you build into your test. Another popular method is Pocock's approach.

## In practice

So how does this work in practice? We build an internal tool that lets you plan a test given a few inputs: \* The alpha level (we generally use 20%, since we're not particularly afraid of false positives and want to be able to run tests quickly) \* The [power](https://en.wikipedia.org/wiki/Power_of_a_test) (we generally use 95%, since we don't want to take on many false negatives) \* The [minimum detectable effect](https://support.optimizely.com/hc/en-us/articles/4410288881293-Use-minimum-detectable-effect-MDE-when-designing-an-experiment) \* The baseline conversion rate \* The expected number of users entering the funnel per day \* The number of checkpoints to build in \* The split of the test (is it 50/50?) \* The number of variants (is it a true A/B test? Are there multiple variants being tested?)

With those inputs, we generate a test plan which you can save, tie to a JIRA card, and send to Slack. Then all you need to do is turn on your test and wait for it to hit the first checkpoint. Once it does, you evaluate the test to get a p-value, compare it to the p-value threshold that the test plan provided at the first checkpoint, and call the test if it's significant. If it's not, you keep running the test up to the next checkpoint and do the same thing, and so on.

## The Bottom Line

The main takeaway from this post is that sequential testing lets us solve two huge problems in A/B testing simultaneously: It lets us run our tests fast, and it lets us do it without sacrificing any statistical rigor. Too often, I see teams committing atrocities against statistics in the name of moving fast when they don't need to be -- using sequential designs for your A/B tests lets you control the false positive and false negative rates of your A/B tests while also allowing you to make calls on those tests as quickly as possible, which is hugely valuable.

And with that, we've concluded a four-part series on A/B testing! Hopefully you found this interesting and useful, and have taken something away that will be beneficial for your own work. Or, if I'm lucky, maybe you're even considering overhauling how you run A/B tests.
