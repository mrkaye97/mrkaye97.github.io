import { getSortedPostsData, PostData } from "@/src/common/posts";
import Link from "next/link";

function PostCard({ postData }: { postData: PostData }) {
  return (
    <Link href={`/blog/${postData.id}`}>
      <div className="bg-white shadow-lg rounded-lg p-6 prose lg:prose-xl m-2">
        <h3 className="text-xl font-bold text-dark-blue mx-4 my-2">
          {postData.date}
        </h3>
        <h2 className="text-3xl font-bold text-dark-blue mt-4 mx-4">
          {postData.title}
        </h2>
        <p className="text-xl text-dark-blue mx-4 my-2">{postData.preview}</p>
      </div>
    </Link>
  );
}

export default function BlogPosts({ allPosts }: { allPosts: PostData[] }) {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {allPosts.map((postData) => (
        <PostCard key={postData.id} postData={postData} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPosts: allPostsData,
    },
  };
}
