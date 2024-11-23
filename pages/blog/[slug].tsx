import { Badge } from "@/components/ui/badge";
import { getSortedPostsData, PostData } from "@/src/common/posts";
import RenderedMarkdown from "@/src/components/markdown";
import { Button } from "@/src/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function BlogPost({ postData }: { postData: PostData }) {
  return (
    <main className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto py-8 px-4">
      <article className="bg-white shadow-lg rounded-lg p-6 prose lg:prose-xl">
        <Link href="/blog">
          <Button className="bg-transparent hover:bg-transparent">
            <ArrowLeftIcon style={{ color: "black" }} />
          </Button>
        </Link>
        <div className="mx-4 text-blue-500 flex flex-col gap-y-2">
          <h1 className="font-bold text-3xl">{postData.title}</h1>
          <h3 className="font-bold text-lg">{postData.date}</h3>
          <div className="flex flex-row gap-x-1 py-2">
            {postData.categories.map((c) => (
              <Badge
                key={c.toLowerCase()}
                className="bg-light-seafoam text-black hover:bg-bg-light-seafoam"
              >
                {c}
              </Badge>
            ))}
          </div>
        </div>
        <RenderedMarkdown content={postData.content} />
      </article>
    </main>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const allPostsData = getSortedPostsData();
  const postData = allPostsData.find((post) => post.id === params.slug);

  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const allPostsData = getSortedPostsData();

  const paths = allPostsData.map((post) => ({
    params: { slug: post.id },
  }));

  return { paths, fallback: false };
}
