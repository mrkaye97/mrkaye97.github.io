import Markdown from "markdown-to-jsx";
import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";

export default function RenderedMarkdown({ content }: { content: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootRef?.current?.querySelectorAll("pre code").forEach((block) => {
      if (block instanceof HTMLElement) {
        hljs.highlightElement(block);
      }
    });
  }, [content]);

  return (
    <div ref={rootRef}>
      <Markdown
        options={{
          overrides: {
            h1: {
              props: {
                className: "text-3xl font-bold text-dark-blue m-4",
              },
            },
            h2: {
              props: {
                className: "text-3xl font-bold text-dark-blue m-4",
              },
            },
            h3: {
              props: {
                className: "text-2xl font-bold text-dark-blue m-4",
              },
            },
            h4: {
              props: {
                className: "text-xl font-bold text-dark-blue m-4",
              },
            },
            p: {
              props: {
                className: "text-lg text-gray-700 leading-relaxed m-4",
              },
            },
            a: {
              props: {
                className: "text-dark-seafoam hover:underline",
              },
            },
            li: {
              component: "li",
              props: {
                className: "list-disc pl-0 ml-8 text-lg text-gray-700 mb-2",
              },
            },
            blockquote: {
              component: "blockquote",
              props: {
                className:
                  "border-l-4 border-dark-blue text-lg text-gray-700 italic my-4 mx-4",
              },
            },
            table: {
              component: "table",
              props: {
                className: "table-auto w-full my-8",
              },
            },
            thead: {
              component: "thead",
              props: {
                className: "bg-dark-blue text-white",
              },
            },
            tbody: {
              component: "tbody",
              props: {
                className: "text-gray-700",
              },
            },
            tr: {
              component: "tr",
              props: {
                className: "border-b",
              },
            },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
