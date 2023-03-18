---
title: Notes on Hiring Data Analysts + Scientists
author: Matt Kaye
date: '2021-12-22'
categories: [data-science, hiring]
tags: [data-science, data-analysis, hiring, interviewing, statistics, machine-learning]
description: ''
toc: true
---

## Introduction

In the past four months, I've been involved in hiring for two new roles at [CollegeVine](https://www.collegevine.com/): a second data scientist, and our first data analyst. I've learned a lot along the way: Things that work, things that don't, and things to ask in order to maximize the amount of signal we're getting from our interviews. This post will sketch out our hiring process (the processes are very similar for our DS and DA roles, with slightly different questions), and I'll add some notes about things I've learned along the way. It's been a long time since I've written anything! I'm excited, so here goes.

## Our Process

Our hiring process only has a few steps. We try to keep things simple and quick:

1.  A phone screen with the hiring manager (30-45 minutes)
2.  A technical interview with two data scientists (60-90 minutes)
3.  A technical interview with two software developers (60 minutes, data science only)
4.  Two cultural / behavioral interviews

Since my portion of the process is the *data science* part, I'll leave the phone screens, behavioral rounds, and system design round out of this post.

## The Data Science / Analysis Interview

I've done a whole bunch of data science interviews from both sides of the table. Some have been better than others. Often, while on the hot seat, I've gotten a smorgasborg of questions that felt like they came from the first page of the first Google result for "Data science interview questions." A handful of examples:

-   What's the difference between supervised and unsupervised learning?
-   What's the difference between linear regression and logistic regression?
-   What's a p-value?
-   How do you know when something is an outlier?

And many, many more. In my view, these questions are *fine*. They ask about a relevant concept to data science and put your skills to the test. But I have two issues with them. First, they're neither challenging nor questions that are easy to build on in terms of difficulty. Second, they're not going to be good questions to figure out someone's ability level.

### Creating Challenging Questions

When I say the questions above aren't challenging, I mean that these are the kinds of questions that someone who's taken a single stats or machine learning class would be able to answer. This is fine if you're trying to figure out if someone has taken one of said classes, but that isn't our goal. We're trying to determine your ability to succeed as a data scientist or analyst. This means that we need to know more than just your academic background: We need to know how you reason about stats and ML, and how you think in general. How do you approach a statistics problem where you haven't seen the solution before? Can you intuit an answer and defend it?

As a result, we've designed our questions to be challenging enough that you wouldn't have seen them in a class you took, and to build off of one another. For example, we often ask the following question:

> Imagine you're looking at a distribution of the heights of men in Spain. How might you find which men are outliers?

Sure, easy question. There are a handful of fine answers here, but we're generally looking for something along the lines of using a [Z-Score](https://en.wikipedia.org/wiki/Standard_score) or the [IQR](https://en.wikipedia.org/wiki/Interquartile_range#:~:text=In%20descriptive%20statistics%2C%20the%20interquartile,25th%20percentiles%20of%20the%20data.). Either of those shows that you've seen some rule of thumb in a statistics class and realize that you can apply it to this problem.

But then, we ask a follow-up:

> Now, let's imagine you're looking at the distribution of *incomes* of men in Spain, instead of their heights. Does your approach change at all?

This is a question that most candidates need to think about for a little bit. At first, it seems simple. But we give you a hint: We explicitly ask if your approach to the problem would change, which is a push to think about *how* it might change. Many candidates struggle with this question, seemingly for a few reasons:

-   They understand the hint, but don't immediately realize why the Z-Score or the IQR approach breaks down, so they feel stuck.
-   They understand why those approaches don't work, but it doesn't jump out at them what they should *do* about it.

These types of responses aren't surprising to us: In statistics classes, you normally work with normally distributed data where nice properties and rules of thumb hold up, but now we have a problem: Everyone knows that incomes are skewed, and so now what do we do? Some candidates stick to their guns and insist the IQR or Z-score would still be fine. Here's how I'd answer the question:

-   First, I'd make a point that incomes are [right-skewed](https://en.wikipedia.org/wiki/Skewness). Everyone probably has this image in their head already, but it's important.
-   Next, I'd note that the IQR / Z-score approach would break down, since the rules of thumb we use about 95% of the data (e.g.) lying within 2 standard deviations of the mean only works on a normal distribution, which incomes do not follow. This means we can't just arbitrarly say "Oh, this person is more than 2 standard deviations from the mean, so he's an outlier!" anymore.
-   Finally, I'd think about other approaches. One might be something fancy like an [isolation forest](https://en.wikipedia.org/wiki/Isolation_forest), but I think there's a simpler approach that'd work: Since incomes are severely right skewed, we could try taking the log of the incomes to see if the logged income looks roughly normally distributed. If it does, we can fall back on our IQR or Z-score approach.

The point here is to ask the candidate a question that makes them think intuitively about having to solve a real-world problem (in this case, one we face all the time) that they probably haven't seen before, which gives us a lot of signal about their statistical foundations and intuitions.

We follow up this follow-up with another:

> Now, let's imagine we're looking for outliers in the heights of men again, but this time they're from Sweden *and* Spain. Does your approach change?

Similar question here, with no real clear, immediate answer that jumps out at most candidates. A reasonable response would be to just separate the distributions into Swedish and Spanish (since we know that Swedes are taller than Spaniards, on average), and then fall back on the Z-score or IQR approach again. Again, not a particularly challenging, in the weeds, or niche technical question by any stretch, but definitely one that lets us really get a sense for your intuitive ability.

> **TL;DR: We build questions that aren't tricky (in the trick question sense), but should't have an immediately obvious canned answer. These types of questions should give us a window into how you reason intuitvely about statistics and machine learning concepts at all levels of complexity.**

### Layering Questions

This point is a nice segue into the second issue I noted above: It's important to build questions that have multiple layers of difficulty to them, so that if someone immediately answers your question, you don't completely shift gears and move to a different topic. Instead, we want to keep digging, so that we can figure out just how much you know. The question I laid out above is a good example of a simple, relatively straightforward question with multiple layers.

Here's another example:

> Imagine you're asking people their symptoms and trying to figure out if they have COVID or not. Sometimes you'll say someone has COVID when they don't, and sometimes you'll say they don't when they do. What are these two types of mistakes called? And which one do you think is worse? Why?

This is a question about [Type I and Type II](https://en.wikipedia.org/wiki/Type_I_and_type_II_errors) error (also known as false positives and false negatives, respectively). Most candidates realize this right away, and then make an argument for why they think a Type II error (the false negative) is a worse mistake. Generally, the argument centers on someone who *is* infected unknowingly spreading COVID. That's a great answer. It shows that they can reason about different types of mistakes and can make an argument for why we might want to minimize one or the other. But this isn't a particularly challenging question.

We ask a follow-up:

> Now, let's imagine you get some COVID test results back from the people whose symptoms you were asking about. What's wrong with this statement: 'If COVID tests have a 10% false negative rate and you got a COVID test and it's negative, that means there's a 10% chance it's wrong and you're actually positive.'?

This question is a little more challenging, and it builds of the types of error we discussed in the previous question. Here, you need to realize what a [false negative](https://en.wikipedia.org/wiki/False_positives_and_false_negatives) is, and it's easy to get the [conditioning](https://en.wikipedia.org/wiki/Conditional_probability) flipped. In this case, the false negative rate of the test being 10% means that the probability that you test negative *given that you have COVID* is 10%. This is *not* the same as saying that the probability that you have COVID *given that you test negative* is 10%. In the second case, the conditioning is flipped around backwards. Most candidates get hung up on this, and rightfully so. It's a tricky question to work out without pen and paper.

For those that get through that question, we have another, more difficult follow-up:

> Okay, so you got a negative test result, but you know the false negative rate of COVID tests is 10%. Imagine you wanted to calculate the actual chance you were *positive* given that you just got your negative result. What other information would you need to do your calculation?

For the Bayesians in the back, this question should be a slam dunk. It's an obvious [Bayes' Rule](https://en.wikipedia.org/wiki/Bayes%27_theorem) question: we're asking you to calculate `p( COVID | negative test )`, so you can use Bayes' Rule to find the answer. It turns out the other information you'd need to do this calculation (in addition to the false negative rate) are a true negative rate and a [prior](https://en.wikipedia.org/wiki/Prior_probability), and you're golden.

Lastly, once a candidate successfully identified Bayes' Rule and (hopefully) discussed priors, we'd ask them how they'd elicit this prior. There's no "right" answer here, but there are a couple options that are better than others:

-   Ask an expert
-   Use something relatively uninformative
-   Take an "empirical" approach and use something like the overall positive test rate

Any of these answers would be totally reasonable, given that there's a whole literature on prior elicitation.

And that's one example of a multi-layer question we might ask in a data science interview. The vast majority of candidates won't get through all the parts, and that's totally fine! Errr, maybe "fine" isn't actually the right word: That's *the goal*. The point is that we're constructing a question that lets us learn *a lot* about you: We learn how much you know about Type I / II error and how you reason about them. We learn about if you understand conditional probability and Bayes' Rule. And we learn how you reason about prior elicitation. We also learn how you argue for decisions you make, and how you communicate complicated statistical concepts (Bayes' Rule and Type I / II error aren't simple). And finally, we learn something about the *depth* of your knowledge. The first part of this question you'd probably know the answer to if you'd taken an introductory statistics or ML class. The second part you'd likely see in a probability course or an inferential statistics course. The third part would also probably come up in one of those two courses, and if not, then certainly in a Bayesian statistics course. And finally, the fourth part you'd likely only see in a very advanced inferential statistics course or a Bayesian course. So not only do we see how you reason about statistics, how much you know, and how you communicate difficult concepts, we also learn something about the types of problems you've seen or worked on in the past, whether they be in classes or in a former job or internship. This is *a lot* of useful information.

## The Take Home

The other piece to our interview process is a take home project. For data science, we have a take-home that you can find in our [CollegeVine DS Hiring Github repo](https://github.com/collegevine/ds-hiring). For data analysts, we ask them to bring in any project they've done in the past: Anything from a homework assignment to another company's take home.

We spend about 25-30 minutes going through the take home project, and we're looking for a few main things. For the most part, candidates are good at describing what they've done, so we're generally trying to dig to figure out *why* they made the decisions they did. Can they defend them? How did they think through the pros and cons of each decision? What's their thought process like? The idea here is that everyone in a data-related role will need to make decisions where there's no clear "right" answer, so we want to see why you chose to make a pie chart instead of a box plot, or chose to use [XGBoost](https://en.wikipedia.org/wiki/XGBoost) instead of logistic regression. Can you talk me through the pros and cons of each option?

In the data science take home we give, there are also some tricks we're trying to test the candidates out on. In an effort to not give away our whole bag of tricks, I invite everyone to give the exercise a shot! I'd even be happy to take a look through your projects to see what you come up with. The short of it is that there are some issues in the data that, if you don't notice them and do something to fix them, will end up ruining the predictions your model produces. We don't expect anyone to catch all of these issues in the short amount of time we ask them to spend on the problem, but we hope that they'll be thoughtful about how they'd solve them once we point them out in the interview.

Finally, there's one elephant in the room here that's important to address: Many people feel negatively about take homes. So do we -- they tend to be long and unnecessarily complicated, and often feel like a waste of the candidate's time. In our view, though, the take home is necessary for one main reason: It lets you familiarize yourself with a data science problem beforehand, so that when you get to the interview we can hit the ground running. In a sense, we're giving you the rules of the game in advance so we can start playing right away. This lets us avoid any confusion or annoying ambiguity with regards to the types of problems were asking about, and to entirely avoid requiring candidates to reason through questions about entirely hypothetical problems that they've never seen before. For these reasons, and also because there's historically been lots of signal that we've gotten from how candidates respond to our questions about the project they bring in, we've decided to stick with the take home. In addition, we don't screen out any candidates on the basis of their take home. We don't ask them to be submitted in advance, so every candidate who does a take home gets an interview.

## Wrapping Up

In a nutshell, that's our whole data scientific technical interview! We discuss a take home you bring in, and then we talk through some miscellaneous statistics and machine learning questions like the ones we discussed above. In general, we're not looking for any specific expertise or knowledge -- we're a start up, after all. Instead, we're testing candidates to see how they reason about problems that are similar to the ones they'll work on at CollegeVine, and how they explain the ins and outs of different possible solutions to those problems. We're looking at their intuitions about statistics and machine learning, their ability to think on their feet when faced with questions they don't immediately know the answer to, and their curiosity and creativity when it comes to solving challenging questions. At the end of the day, it's these traits, not any hyper-specific technical knowledge, that'll make for a great CV data team member.
