import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.jsx",
});

module.exports = {
  ...withNextra({
    reactStrictMode: true,
    output: "export",
    images: {
      unoptimized: true,
    },
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"], // Include MDX files
  }),
  images: {
    unoptimized: true,
  },
};
