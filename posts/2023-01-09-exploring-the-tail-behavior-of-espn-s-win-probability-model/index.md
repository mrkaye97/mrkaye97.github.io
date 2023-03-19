---
title: Exploring the Tail Behavior of ESPN's Win Probability Model
author: Matt Kaye
date: '2023-01-09'
categories: [data science, statistics, sports analytics]
toc: true
---

It's College Football Playoff season, which means I've been watching a lot of games lately. And I find myself complaining pretty often about how badly calibrated I think ESPN's win probability model is. In particular, I've noted a bunch of examples -- or at least enough for it to feel like a bunch -- of games where ESPN's model gives a team a win probability that feels way *too* extreme in a situation where they're clearly winning. I'm not talking about giving a team an 80% chance when they should have a 60% chance. The cases I've been curious about are something more like teams getting a 99.7% chance of winning when, at least in my opinion, they should be getting something more like a 98% chance.

## Introduction

> For classification problems like predicting win probabilities, model *calibration* is, at the highest level, the answer to the question "When my model says that Michigan has a 62% chance to win, do they actually end up winning about 62% of the time?" A well-calibrated model will have relatively low error over the long run. As we get more and more data, we'd expect that the amount of error in our calibration numbers would go down, and hopefully the predicted probabilities start to converge to the actual win probabilities as the games play out. For more on calibration, check out [this cool FiveThirtyEight post](https://projects.fivethirtyeight.com/checking-our-work/).

You might be reading this thinking that the difference (both in absolute terms and ratio terms) between 60 and 80 percent is way bigger than the difference between, say, 98 and 99.7. And you'd be right. But I'd encourage you to think about it like this: The team that's the *underdog* in the latter case has either a 2% chance (the first case) or a 0.3% chance (the second case). If you're applying the same ratio of win probabilities back of the napkin math, that increase feels a lot bigger.

> For the statistically inclined folks in the back, the "right" way to do this is just to use odds ratios, which would show that going from 98% to 99.7% is a massive magnitude odds (or log-odds) increase.

So in a nutshell, what I've been curious about is the *tail behavior* of the ESPN model -- I'm trying to answer the question of how ESPN's model does at predicting events we know are unlikely. How often, for instance, does a team that ESPN gives a 0.5% mid-game chance of winning actually end up winning? My suspicion, based on my anecdotal evidence from watching games and complaining over the years, has been that the model is badly calibrated in the tails. I've been on the record arguing that ESPN's model gives win probabilities greater than 99% way too often, and can usually be heard saying things like "Well, they're almost definitely going to win. But 99%? I'm not sure..."

So then, to the question. I looked into a couple of things: 1. How well-calibrated is their model in general? 2. When ESPN gives a team a very high chance of winning (\>98%), how often do they actually win? 3. Does the model perform better or worse for ranked teams?

## **Calibration**

First, how well-calibrated is the model in general? I usually like to look at calibration plots to evaluate models, similar to the ones in the FiveThirtyEight post above.

This first plot is the overall calibration of the model at kickoff time. What we're looking for are the points to roughly lie along the dashed line, which is the line `y = x`.

<p align="center">
![](https://raw.githubusercontent.com/mrkaye97/espn-cfb-win-prob/master/plots/calibration/kickoff/all.svg){width=85%}
</p>

Two main things to notice in that plot: 1. The model, on aggregate, is quite well calibrated. 2. The model looks like it's off by a bit in the lower tail, where it appears to be predicting win probabilities that are too low. That's a sample size issue. For instance, there were 64 games where the model gave the home team a worse than 5% chance to win, and the home team ended up winning 6.25% in those games. But generating a confidence interval for that proportion gives us a range of 1.25%-12%, which is too wide to scold the model for that mistake

We can also look at the same plot, broken down by the teams playing. For instance, the following plot is broken down by whether neither team is ranked, one team is, or both teams are:

<p align="center">
![](https://raw.githubusercontent.com/mrkaye97/espn-cfb-win-prob/master/plots/calibration/kickoff/grouped-by-num-ranked.svg){width=85%}
</p>

In this case, even with relatively wide error bars, we see that the model seems to perform worse for games where both teams are ranked. And it's pretty clearly the best in games where neither team is ranked.

## Edge Cases

Next, I was curious about how often teams given very high chances of winning ended up doing so. Anecdotally, I've found myself complaining the most about games like the [Oregon - Oregon State game from 2022](https://www.espn.com/college-football/game/_/gameId/401404047) where ESPN gives Oregon a 98.3% chance of winning when they're up 18 with 6:53 left in the third. Of course, I'm leaning into confirmation bias. But it's hard to not think to yourself that with more than 20 minutes of football to go, Oregon State only wins that game in a wild comeback less than two in one hundred times. I'm not sure what I'd view as a more "correct" estimate of their win probability, but seventeen in a thousand seems low to me. Maybe even thirty in a thousand (3%) would be better.

One note is that the 3% probability I'd probably lobby for doesn't *feel* that different from the 1.7% that ESPN gave, but that's an odds ratio of 1.79, which is a big difference in practice. For instance, that's a similar odds ratio to what you'd get if you went from a 35% chance to a 50% chance, which is significant. In FiveThirtyEight world, that's the difference between being right in the middle of the "toss-up" category vs. being solidly in the "lean Oregon" category.

So anyways, back to Oregon - Oregon State. I was curious about games like that: Games where, with more than, say, five minutes to go and one team leading by at most three scores (24 points), how often ESPN was right when they gave the leading team a better than 98% chance of winning the game.

As it turns out, ESPN's model is doing pretty well in the tails on the whole. See the table below:

<center>

| Ranked  | Overall Win % | Win % CI Lower Bound | Win % CI Upper Bound | N    |
|---------|---------------|----------------------|----------------------|------|
| Both    | 0.54%         | 0%                   | 1.63%                | 184  |
| One     | 1%            | 0.4%                 | 1.7%                 | 1002 |
| Neither | 1.07%         | 0.7%                 | 1.52%                | 2427 |
| All     | 1.02%         | 0.72%                | 1.36%                | 3613 |

</center>

`Ranked` corresponds to how many of the teams in the game were ranked (i.e. "both" means "both teams were ranked"). "all" is all of the data pooled together.

The main takeaway from the table above is that when ESPN gives a team a \<2% chance of winning a game, that tends to not be a severe underestimate as I was expecting. Across the crosstabs I checked, even the high end of a 95% confidence interval for the proportion of the time that the underdog would go on to win was below the 2% threshold.

## Wrapping Up

All told, I didn't end up confirming my suspicions. At least from a cursory look through the data, ESPN's model seems to be performing quite well in the tails. Or, at the very least, it's not making predictions that are as ridiculous as I had thought they were. I still have my suspicions and will surely continue finding individual cases that don't make sense to me intuitively, but after poking around a little I at least feel less concerned about the model making egregious predictions -- as far as I can tell, it's doing a pretty good job on average.

## Future Work

A couple of other things jump out at me as being worth exploring: 1. How well did the model do vs. my intuitions? In games where I was on the record as thinking the win probabilities given were far too high (or low), how do *I* perform? 2. How does ESPN's model perform by other common ML metric standards? For instance, does its AUC outperform (e.g.) Vegas? (Almost certainly not). Or how negative is the model's Brier Skill Score when using Vegas as a baseline? 3. Does the model perform better or worse for certain teams? Maybe some teams are being consistently overrated or underrated by the model.

## Appendix

You can find the code to reproduce this analysis [on my Github](https://github.com/mrkaye97/espn-cfb-win-prob).