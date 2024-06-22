import { TextLink } from "@/src/components/links";
import React from "react";

export default function Code() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <p className="text-lg text-seafoam-green mb-4">
        I like writing code for fun, to explore interesting questions and
        problems, to learn, and to improve the tools I use.
      </p>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-seafoam-green mb-2">
          ZenSearch
        </h2>
        <p className="text-lg text-seafoam-green mb-4">
          <TextLink text="ZenSearch" href="https://zensearch.jobs" /> is a
          NextJS / FastAPI app I&apos;ve been building to make your job hunt
          more sane.{" "}
          <TextLink
            text="You can read about it on my blog"
            href="https://matthewrkaye.com/posts/2023-11-10-jobcrawler/jobcrawler.html"
          />
          .
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-seafoam-green mb-2">
          Open-Source Contributions
        </h2>
        <ul className="list-disc pl-6">
          <li className="text-lg text-seafoam-green mb-2">
            <TextLink
              text="Adding JSON schema validation to MLFlow"
              href="https://github.com/mlflow/mlflow/pull/5458"
            />
          </li>
          <li className="text-lg text-seafoam-green mb-2">
            <TextLink
              text="Adding a MAP@K implementation to `recmetrics`"
              href="https://github.com/statisticianinstilettos/recmetrics/pull/50"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
