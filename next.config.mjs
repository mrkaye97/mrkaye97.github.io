/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source:
          "/posts/2023-06-29-lessons-learned-from-running-r-in-production/lessons-learned-from-running-r-in-production.html",
        destination: "/blog/lessons-learned-from-running-r-in-production",
        permanent: false,
      },
      {
        source: "/posts/2023-11-10-jobcrawler/jobcrawler.html",
        destination: "/blog/introducing-zensearch",
        permanent: false,
      },
      {
        source:
          "/posts/2023-07-09-unit-testing-dbt-models/unit-testing-dbt-models.html",
        destination: "/blog/unit-testing-dbt-models",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
