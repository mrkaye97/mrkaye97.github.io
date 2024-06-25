import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "./layout";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Head from "next/head";
import { usePathname } from "next/navigation";

config.autoAddCss = false;

function createPathAddendum(path: string) {
  switch (path) {
    case "/":
      return "Home";
    case "/my-three-favorite":
      return "My Three Favorite";
    case "/code":
      return "Code";
    case "/blog":
      return "Blog";
    case "/travel":
      return "Travel";
    default:
      return "";
  }
}

function pathToTitle(path: string) {
  const addendum = createPathAddendum(path);
  const base = "Matt Kaye";

  if (!addendum) {
    return base;
  } else {
    return `${base} | ${addendum}`;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const path = usePathname();
  const title = pathToTitle(path);

  return (
    path && (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <GoogleAnalytics trackPageViews gaMeasurementId="G-6KV13R4B6Y" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  );
}
