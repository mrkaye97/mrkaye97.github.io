import Link from "next/link";

type BlogPost = {
  url: string;
  title: string;
  author: string;
};

const posts: BlogPost[] = [
  {
    url: "https://www.telkins.dev/blog/do-best-practices-really-matter",
    title: "Do best practices really matter?",
    author: "Trevor Elkins",
  },
  {
    url: "https://medium.com/@matryer/line-of-sight-in-code-186dd7cdea88",
    title: "Code: Align the happy path to the left edge",
    author: "Mat Ryer",
  },
  {
    url: "https://jamie-wong.com/2013/07/12/grep-test/",
    title: "Too DRY - The Grep Test",
    author: "Jamie Wong",
  },
  {
    url: "https://www.depesz.com/2021/10/22/why-is-it-hard-to-automatically-suggest-what-index-to-create/",
    title: "Why is it hard to automatically suggest what index to create?",
    author: "Hubert Lubaczewski",
  },
  {
    url: "https://postgres.ai/blog/20220525-common-db-schema-change-mistakes",
    title: "Common DB schema change mistakes",
    author: "Nikolay Samokhvalov",
  },
  {
    url: "https://johnresig.com/blog/keeping-passwords-in-source-control/",
    title: "Keeping Passwords in Source Control",
    author: "John Resig",
  },
  {
    url: "https://www.kalzumeus.com/2012/01/23/salary-negotiation/",
    title: "Salary Negotiation: Make More Money, Be More Valued",
    author: "Patrick McKenzie",
  },
  {
    url: "https://begriffs.com/posts/2018-03-20-user-defined-order.html",
    title: "User-defined Order in SQL",
    author: "Joe Nelson",
  },
  {
    url: "https://docs.hatchet.run/blog/problems-with-celery",
    title: "The problems with (Python's) Celery",
    author: "Alexander Belanger",
  },
  {
    url: "https://grugbrain.dev/",
    title:
      "The Grug Brained Developer: A layman's guide to thinking like the self-aware smol brained",
    author: "Anonymous",
  },
  {
    url: "https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction",
    title: "The Wrong Abstraction",
    author: "Sandi Metz",
  },
  {
    url: "https://kentcdodds.com/blog/aha-programming",
    title: "AHA Programming",
    author: "Kent C. Dodds",
  },
  {
    url: "https://kentcdodds.com/blog/usememo-and-usecallback",
    title: "When to useMemo and useCallback",
    author: "Kent C. Dodds",
  },
];

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={post.url}>
      <div className="bg-opacity-100 border border-gray-500 shadow-2xl rounded-lg p-6 m-4 max-w-md w-full transition-transform transform-gpu hover:scale-95 hover:bg-opacity-90">
        <h2 className="text-3xl font-bold text-white mt-4">{post.title}</h2>
        <p className="text-xl text-gray-300 mt-2">{post.author}</p>
      </div>
    </Link>
  );
}

export default function BlogPostsILike() {
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.url} post={post} />
      ))}
    </div>
  );
}
