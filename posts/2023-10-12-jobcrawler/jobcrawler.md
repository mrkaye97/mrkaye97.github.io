---
title: Introducing Jobcrawler
author: Matt Kaye
date: '2023-10-12'
categories: [hobby-projects]
toc: true
---

## Introduction

I've been working on [Jobcrawler](https://jobcrawler.matthewrkaye.com) for the past six months or so, and I'm proud of where it's at and thought it might be a good time to share it with all of you (cough, potential beta users). This post will be a brief intro to what the app does, why I built it, a couple things I've learned along the way, and some roadmap items for the future. As a disclaimer: I'm still _not_ an engineer, so please don't read through my largely GPT-generated React code.

## What's Jobcrawler?

Jobcrawler is an app that I started building when I was passively job hunting from about April until June. I had a problem that I didn't know of a good solution to: I had a shortlist of companies I thought I might be interested in working for, and I found myself needing to repeatedly check their job boards very often to see if they posted a new job that matched my interests (mostly data science and ML engineering).

This was a painful, time-consuming, and, largely, easily automatable process. 

My initial thought was to just write a cron job that would scrape each board each day, look for job postings that contained "data science" in the titles, and send me an email with the postings. But then I considered that I could do the same email send using a background job in a web app, and I could also build additional features more easily, such as a UI that lets you test scraping a company's board before adding them to the list of companies, a way to more easily add, delete, and change searches at specific companies, and so on.

The app has evolved pretty significantly since then. Now, the app has a handful of core features:

1. You can [view the companies in its database](https://jobcrawler.matthewrkaye.com/companies) and add new ones that you're interested in.
2. You can [create searches](https://jobcrawler.matthewrkaye.com/searches), which will trigger emails to be sent to you when a company you're searching at posts a job that matches your search query.
3. You can [peruse the job boards of all companies in the database](https://jobcrawler.matthewrkaye.com/job-board) or of [a single company](https://jobcrawler.matthewrkaye.com/job-board/Airbnb) and filter for postings matching your interests.
4. You can [keep track of some statistics](https://jobcrawler.matthewrkaye.com/user-stats) about your usage of the app, including how many postings you've seen, how much time you've saved, etc.
5. And more coming soon, including more advanced analytics, including tracking an individual job search by keeping track of postings you've applied to and what the results were, recommended jobs for you, improved filtering / searching capabilities of companies and postings, and more!

## Why Should I Use It?

Basically for the reason it says on the tin: It's a no-bullshit job searching app. I hate LinkedIn, and I largely built this so I could stay off of LinkedIn and sites like it. There aren't any ads, there's no recruiter spam, there aren't any stale postings that aren't actually open anymore. Jobcrawler just works directly with company job boards and gets rid of the intermediary.

It's also free, and I'm not going to spam you about paying for an account (at least until my hosting costs are higher than the $20 / month that they are now).

And most importantly: I think it'll make your job search easier and more delightful! It did for me.

## Wrapping Up

If there are any VCs reading this who think "Wow, this is an amazing start up idea!" please reach out to me.

But in all seriousness: I hope someone comes across this post and finds something here useful, and I'd love to hear any feedback from anyone who's tried the app!
