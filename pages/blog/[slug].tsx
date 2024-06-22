import { getSortedPostsData, PostData } from "@/src/common/posts";
import RenderedMarkdown from "@/src/components/markdown";

export default function BlogPost({ postData }: { postData: PostData }) {
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <article className="bg-white shadow-lg rounded-lg p-6 prose lg:prose-xl">
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
