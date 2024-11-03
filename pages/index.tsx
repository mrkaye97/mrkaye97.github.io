import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { imageRoot } from "@/src/common/images";
import { TextLink } from "@/src/components/links";

export default function Home() {
  return (
    <div className="flex grow flex-col items-center justify-center text-white mt-0 h-full">
      <div className="w-full p-3 md:p-8 md:pb-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Image
            src={imageRoot + "headshot.jpg"}
            alt="Headshot"
            width={200}
            height={200}
            className="rounded-full mx-auto shadow-lg mb-8"
          />
          <h1 className="text-white text-4xl mt-4">
            Hi! I&apos;m <strong>Matt</strong>
          </h1>
          <p className="text-white text-2xl mt-2">
            I&apos;m an engineer at{" "}
            <TextLink href="https://www.klaviyo.com" text="Klaviyo" />
          </p>
          <p className="text-white text-2xl mt-2">
            In my free time, I like to ski, read fantasy books, cook, and work
            on <TextLink href="https://zensearch.jobs" text="ZenSearch" />
          </p>
          <div className="flex justify-center space-x-6 py-4">
            <a
              href="https://github.com/mrkaye97"
              className="text-light-seafoam hover:text-seafoam-green transition-colors"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
              <span className="sr-only">Github</span>
            </a>
            <a
              href="mailto:mrkaye97@gmail.com"
              className="text-light-seafoam hover:text-seafoam-green transition-colors"
              target="_blank"
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
