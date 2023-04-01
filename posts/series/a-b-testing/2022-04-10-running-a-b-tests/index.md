---
title: Running A/B Tests
author: Matt Kaye
date: '2022-04-09'
categories: [data science, statistics, a/b testing]
toc: true
---

This is the second post in a series on A/B testing. In [the last post](https://mrkaye97.github.io/blog/post/2022-03-25-a-b-testing-a-primer/), I gave a high-level overview of what A/B testing is and why we might do it. This post will go a few steps farther. I'll discuss *how* an A/B test is run, what we're looking for along the way, and what happens when we call it one way or the other. This will set us up for the next post, which will discuss the mechanics of A/B testing.

## How Can I Run An A/B Test?

In the last post, I laid out a hypothetical A/B test where I was considering changing the underline color for links on my blog from red to blue. As a refresher: Blue was the variant (the new proposed color) and red was the control (the current state of the world). We were testing to see if a blue underline would cause significantly more users to click the links to my blog posts. "But," you ask, "how does the test actually *happen*?" That's a great question! But first, a disclaimer: I'm not an engineer, so I can only give a bird's eye view of how we do it at CollegeVine. I'm sure there are many other solutions used by other companies.

At CV, we use a tool called [LaunchDarkly](https://launchdarkly.com/) for running A/B tests. Essentially, LaunchDarkly lets us set up "feature flags" and show the version of the code that's "behind" them to only certain users. For example, you might imagine you were rolling out a risky new change, and wanted to QA it first. One way we've done this kind of thing at CV is to put the risky change behind a feature flag, and then roll it out to our own team. Then, our team can QA and if anything looks off we can either fix the issues or revert the changes before rolling out to external users.

A/B testing with LD works similarly. Instead of only showing a new version of the code to internal users, we use a feature flag that shows each version of the code to a certain proportion of users, at random. The idea is to use the feature flag in LD to randomly sample users of our site into either the control group or the variant group. Then we track metrics over time to see if the variant is outperforming the control group.

## My Experiment Is Running. Now What?

Back to our hypothetical experiment on my blog. Now, half of users are seeing red-underlined links, and half are seeing blue underlines, at random. So now, we need a way to track the conversion rate of those links. In step a whole bunch of business intelligence (BI) tools, and other tools that brand themselves as being tools for all different flavors of analytics. At CV, we use a tool called [Heap](https://heap.io/) for user analytics (including A/B testing).

Let's imagine that my blog were wired up to Heap, and tracking page views on my landing page and clicks of the links on that page to individual posts behind the scenes. In Heap, we could visualize the conversion rate from the landing page to any post in a funnel or in a table, where the conversion rate between the two is the proportion of users who hit the landing page that end up clicking one of the links ("converting") to a post. We could also view these numbers in a table, where we'd have one cell that has the total number of sessions on the landing page and another cell with the number of sessions on the posts, and the conversion rate is the latter divided by the former (roughly).

Since we have our feature flag set up to track which users are being placed in each group, we can also group by that "property" in Heap, which lets us separate our analysis into the control and the variant. This means that we can compare the conversion rates for the red underline and the blue underline, which is exactly what we're trying to do! Generally, we'll set up a Heap dashboard with the funnel we're interested in so we can track out metrics over time.

## Interpreting the Metrics

Now that the funnel is set up, you're watching results stream in. Let's imagine that at some point in time, each group has 1000 users (i.e. 1000 users have seen the variant and another 1000 have seen the control), and 250 users in the variant group converted while only 200 in the control group did. From there, we can calculate our conversion rates as 25% (variant) and 20% (control). And for the purposes of keeping this post simple, let's assume that lift is big enough for us (by some definition of "big enough", which we'll get to in a later post). In that case, we call our test for the variant. In practice, this means we route all traffic to the variant instead of splitting it 50/50, and then we can remove the feature flag from our code and boom! We now have some cool blue underlines for the links on the blog.

But back to the lift being big enough: In practice, is knowing that the variant is performing 25% better than the control enough to call the test for the variant? Making this call in a rigorous, informed way is what the rest of the posts in this series will discuss.
