import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "./layout";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Head from "next/head";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useRouter } from "next/router";

config.autoAddCss = false;

function createPathAddendum(path) {
  switch (path) {
    case "/":
      return "Home";
    case "/my-three-favorite":
      return "My Three Favorite";
    case "/blogroll":
      return "Blog Posts I Like";
    case "/blog":
      return "Blog";
    case "/travel":
      return "Travel";
    default:
      return "";
  }
}

function pathToTitle(path) {
  const addendum = createPathAddendum(path);
  const base = "Matt Kaye";

  if (!addendum) {
    return base;
  } else {
    return `${base} | ${addendum}`;
  }
}

export default function MyApp({ Component, pageProps }) {
  const path = usePathname();
  const title = pathToTitle(path);
  const router = useRouter();

  return (
    path && (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/nord.min.css"
        />
        <Script src="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/highlight.min.js"></Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js" />

        <GoogleAnalytics trackPageViews gaMeasurementId="G-6KV13R4B6Y" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  );
}
