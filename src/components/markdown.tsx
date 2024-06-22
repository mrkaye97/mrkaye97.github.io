import Markdown from "markdown-to-jsx";

export default function RenderedMarkdown({ content }: { content: string }) {
  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            props: {
              className: "text-4xl font-bold text-blue-500 m-4",
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
          pre: {
            component: "pre",
            props: {
              className:
                "p-4 bg-gray-800 text-white rounded-lg overflow-x-auto m-4",
            },
          },
          blockquote: {
            component: "blockquote",
            props: {
              className:
                "border-l-4 border-dark-blue p-2 text-lg text-gray-700 italic my-4 mx-4",
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
  );
}
