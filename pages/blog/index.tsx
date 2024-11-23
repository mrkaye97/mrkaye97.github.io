import { getSortedPostsData, PostData } from "@/src/common/posts";
import Link from "next/link";

function PostCard({ postData }: { postData: PostData }) {
  return (
    <Link href={`/blog/${postData.id}`} className="h-full">
      <div className="h-full bg-opacity-100 shadow-2xl rounded-lg p-6 transition-transform transform-gpu hover:scale-95 hover:bg-opacity-90 flex flex-col justify-between bg-blue-500">
        <div>
          <h2 className="text-3xl font-bold text-white mt-4 mx-4">
            {postData.title}
          </h2>
          <p className="text-xl text-gray-300 mx-4 my-2">{postData.preview}</p>
        </div>
        <h3 className="text-xl font-bold text-white mx-4 my-2">
          {postData.date}
        </h3>
      </div>
    </Link>
  );
}

export default function BlogPosts({ allPosts }: { allPosts: PostData[] }) {
  const _tags = allPosts.map((p) => p.categories).flat();
  const tags = _tags.filter(function (item, pos) {
    return _tags.indexOf(item) == pos;
  });

  console.log(tags);

  return (
    <div className="py-8 px-4 md:px-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-sea">
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
