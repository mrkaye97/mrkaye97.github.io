import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "_posts");

export type PostData = {
  id: string;
  title: string;
  author: string;
  date: string;
  categories: string;
  content: string;
  preview: string;
};

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    const data: PostData = {
      id,
      title: matterResult.data.title,
      author: matterResult.data.author,
      date: matterResult.data.date,
      categories: matterResult.data.categories,
      content: matterResult.content,
      preview: matterResult.data.preview,
    };

    return data;
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
