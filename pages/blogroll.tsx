import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type BlogPost = {
  url: string;
  title: string;
  author: string;
  date: string | undefined;
  tag: string[];
};

const posts: BlogPost[] = [
  {
    url: "https://www.telkins.dev/blog/do-best-practices-really-matter",
    title: "Do best practices really matter?",
    author: "Trevor Elkins",
    date: "2024-04-16",
    tag: ["engineering"],
  },
  {
    url: "https://medium.com/@matryer/line-of-sight-in-code-186dd7cdea88",
    title: "Code: Align the happy path to the left edge",
    author: "Mat Ryer",
    date: "2016-08-25",
    tag: ["engineering"],
  },
  {
    url: "https://jamie-wong.com/2013/07/12/grep-test/",
    title: "Too DRY - The Grep Test",
    author: "Jamie Wong",
    date: "2013-07-12",
    tag: ["engineering"],
  },
  {
    url: "https://www.depesz.com/2021/10/22/why-is-it-hard-to-automatically-suggest-what-index-to-create/",
    title: "Why is it hard to automatically suggest what index to create?",
    author: "Hubert Lubaczewski",
    date: "2021-10-22",
    tag: ["engineering", "databases"],
  },
  {
    url: "https://postgres.ai/blog/20220525-common-db-schema-change-mistakes",
    title: "Common DB schema change mistakes",
    author: "Nikolay Samokhvalov",
    date: "2022-05-25",
    tag: ["engineering", "databases"],
  },
  {
    url: "https://johnresig.com/blog/keeping-passwords-in-source-control/",
    title: "Keeping Passwords in Source Control",
    author: "John Resig",
    date: "2013-02-06",
    tag: ["engineering"],
  },
  {
    url: "https://www.kalzumeus.com/2012/01/23/salary-negotiation/",
    title: "Salary Negotiation: Make More Money, Be More Valued",
    author: "Patrick McKenzie",
    date: "2012-01-23",
    tag: ["career"],
  },
  {
    url: "https://begriffs.com/posts/2018-03-20-user-defined-order.html",
    title: "User-defined Order in SQL",
    author: "Joe Nelson",
    date: "2018-03-20",
    tag: ["engineering", "databases"],
  },
  {
    url: "https://docs.hatchet.run/blog/problems-with-celery",
    title: "The problems with (Python's) Celery",
    author: "Alexander Belanger",
    date: "2024-06-05",
    tag: ["engineering"],
  },
  {
    url: "https://grugbrain.dev/",
    title:
      "The Grug Brained Developer: A layman's guide to thinking like the self-aware smol brained",
    author: "Anonymous",
    date: undefined,
    tag: ["engineering"],
  },
  {
    url: "https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction",
    title: "The Wrong Abstraction",
    author: "Sandi Metz",
    date: "2016-01-20",
    tag: ["engineering"],
  },
  {
    url: "https://kentcdodds.com/blog/aha-programming",
    title: "AHA Programming",
    author: "Kent C. Dodds",
    date: "2020-06-22",
    tag: ["engineering"],
  },
  {
    url: "https://kentcdodds.com/blog/usememo-and-usecallback",
    title: "When to useMemo and useCallback",
    author: "Kent C. Dodds",
    date: "2019-06-04",
    tag: ["engineering", "react"],
  },
  {
    url: "https://www.seangoedecke.com/large-established-codebases/",
    title: "Mistakes engineers make in large established codebases",
    author: "Sean Goedecke",
    date: "2024-01-07",
    tag: ["engineering"],
  },
  {
    url: "https://docs.hatchet.run/blog/postgres-events-table",
    title: "Use Postgres for your events table",
    author: "Alexander Belanger",
    date: "2024-11-20",
    tag: ["engineering"],
  },
  {
    url: "https://timsh.org/tracking-myself-down-through-in-app-ads/",
    title:
      "Everyone knows your location: tracking myself down through in-app ads",
    author: "Tim",
    date: "2025-02-01",
    tag: ["privacy"],
  },
  {
    url: "https://haterade.substack.com/p/i-tasted-hondas-spicy-rodent-repelling",
    title: "I Tasted Honda's Spicy Rodent-Repelling Tape",
    author: "Liz Cook",
    date: "2021-07-30",
    tag: ["misc"],
  },
  {
    url: "https://simone.org/advertising/",
    title: "What if we made advertising illegal?",
    author: "Kōdō Simone",
    date: "2025-04-05",
    tag: ["misc"],
  },
];

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={post.url} target="_blank">
      <div className="h-full bg-opacity-100 shadow-2xl rounded-lg p-6 transition-transform transform-gpu hover:scale-95 hover:bg-opacity-90 flex flex-col justify-between bg-blue-500 gap-y-4 min-h-64">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl font-bold text-white">{post.title}</h2>
          <p className="text-xl text-gray-300">{post.author}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-2">
          <p className="text-md font-semibold text-white">{post.date}</p>
          <div className="flex flex-row items-center gap-x-1">
            {post.tag.map((c) => (
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

export default function BlogPostsILike() {
  return (
    <div className="py-8 px-4 md:px-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 md:mb-0">
      {posts.map((post) => (
        <PostCard key={post.url} post={post} />
      ))}
    </div>
  );
}
