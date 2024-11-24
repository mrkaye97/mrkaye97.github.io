import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "pages/blog");

export type PostData = {
  id: string;
  title: string;
  author: string;
  date: string;
  tag: string[];
  content: string;
  description: string;
};

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  // Read each file, parse the frontmatter, and return the post data
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Parse markdown content with frontmatter using gray-matter
      const matterResult = matter(fileContents);
      const { data, content } = matterResult;

      // Create the post data object
      const postData: PostData = {
        id: fileName.replace(/\.mdx$/, ""), // Remove .mdx extension to get the post ID
        title: data.title,
        author: data.author,
        date: data.date,
        tag: data.tag || [],
        content, // This will be the raw MDX content
        description: data.description || "", // Using description from frontmatter
      };

      return postData;
    });

  // Sort posts by date (most recent first)
  return allPostsData.sort((a, b) => (a.date > b.date ? -1 : 1));
}
