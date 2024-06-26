import { getSortedPostsData, PostData } from "@/src/common/posts";
import Link from "next/link";

function PostCard({ postData }: { postData: PostData }) {
  return (
    <Link href={`/blog/${postData.id}`}>
      <div className="bg-opacity-100 border border-gray-500 shadow-2xl rounded-lg p-6 m-4 transition-transform transform-gpu hover:scale-95 hover:bg-opacity-90">
        <h3 className="text-xl font-bold text-white mx-4 my-2">
          {postData.date}
        </h3>
        <h2 className="text-3xl font-bold text-white mt-4 mx-4">
          {postData.title}
        </h2>
        <p className="text-xl text-gray-300 mx-4 my-2">{postData.preview}</p>
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
