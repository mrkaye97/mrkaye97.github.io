import { Badge } from "@/components/ui/badge";
import { getSortedPostsData, PostData } from "@/src/common/posts";
import Link from "next/link";

function PostCard({ postData }: { postData: PostData }) {
  return (
    <Link href={`/blog/${postData.id}`} className="h-full">
      <div className="h-full bg-opacity-100 shadow-2xl rounded-lg p-6 transition-transform transform-gpu hover:scale-95 hover:bg-opacity-90 flex flex-col justify-between bg-blue-500 gap-y-4 min-h-64">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl font-bold text-white">{postData.title}</h2>
          <p className="text-xl text-gray-300">{postData.description}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-2">
          <p className="text-md font-semibold text-white">{postData.date}</p>
          <div className="flex flex-row items-center gap-x-1">
            {postData.tag.map((c) => (
              <Badge
                className="bg-light-seafoam text-black hover:bg-bg-light-seafoam"
                key={c}
              >
                {c.toLowerCase()}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPosts({ allPosts }: { allPosts: PostData[] }) {
  return (
    <div className="py-8 px-4 md:px-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
