import { TextLink } from "@/src/components/links";
import React from "react";

function CodeCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-opacity-100 border border-gray-500 shadow-2xl rounded-lg p-6 m-4">
      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      {children}
    </div>
  );
}

export default function Code() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <CodeCard title={"Introduction"}>
        <p className="text-lg text-white mb-4">
          I like writing code for fun, to explore interesting questions and
          problems, to learn, and to improve the tools I use.
        </p>

        <p className="text-lg text-white mb-4">
          I usually have at least one or two things I&apos;m toying around with
          at any given time, whether it&apos;s{" "}
          <TextLink
            text="an API wrapper for working with my Fitbit data"
            href="https://github.com/mrkaye97/fitbitr"
          />
          , attempting{" "}
          <TextLink
            text="Euler"
            href="https://github.com/mrkaye97/Haskell-Euler"
          />{" "}
          or{" "}
          <TextLink
            text="Advent of Code"
            href="https://github.com/mrkaye97/advent-of-code"
          />{" "}
          problems, working on{" "}
          <TextLink
            text="this website"
            href="https://github.com/mrkaye97/mrkaye97.github.io"
          />
          , or building{" "}
          <TextLink
            text="better job searching tools"
            href="https://zensearch.jobs"
          />
          .
        </p>
      </CodeCard>
      <CodeCard title="ZenSearch">
        <p className="text-lg text-white mb-4">
          <TextLink text="ZenSearch" href="https://zensearch.jobs" /> is a
          NextJS / FastAPI app I&apos;ve been building to make your job hunt
          more sane. I started working on it when I realized that I didn&apos;t
          know of a good way to be notified when a company that I was interested
          in posts a new job to their board that matches my criteria{" "}
          <em>without needing to check their job board every day.</em>
        </p>

        <p className="text-lg text-white mb-4">
          It&apos;s come a long way since then - our small team now is
          supporting thousands of job seekers looking for jobs at almost ten
          thousand companies, and we&apos;re adding new features all the time.{" "}
          <TextLink
            text="You can read more about Zen on my blog "
            href="/blog/introducing-zensearch"
          />
          and{" "}
          <TextLink text="try it out for free" href="https://zensearch.jobs" />.
        </p>
      </CodeCard>
      <CodeCard title="Open-Source">
        <div className="mb-8">
          <p className="text-lg text-white mb-4">
            I&apos;m a big believer in open-source, and like to contribute to
            projects - aside from my own - that I use and love when I get a
            chance. Some contributions I&apos;m proud of include:
          </p>
          <ul className="list-disc pl-6">
            <li className="text-lg text-white mb-2">
              <TextLink
                text="Adding JSON schema validation to MLFlow"
                href="https://github.com/mlflow/mlflow/pull/5458"
              />
            </li>
            <li className="text-lg text-white mb-2">
              <TextLink
                text="Adding a MAP@K implementation to `recmetrics`"
                href="https://github.com/statisticianinstilettos/recmetrics/pull/50"
              />
            </li>
          </ul>
        </div>
      </CodeCard>
    </div>
  );
}
