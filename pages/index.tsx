import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faStrava,
  faUntappd,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { imageRoot } from "@/src/common/images";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-seafoam-green mt-24">
      <div className="w-full p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Image
            src={imageRoot + "headshot.jpg"}
            alt="Headshot"
            width={200}
            height={200}
            className="rounded-full mx-auto shadow-lg my-8"
          />
          <h1 className="text-seafoam-green text-4xl mt-4">
            Hi! I&apos;m <strong>Matt</strong>
          </h1>
          <p className="text-seafoam-green text-2xl mt-2">
            I&apos;m an engineer at{" "}
            <a
              href="https://www.klaviyo.com"
              className="text-light-seafoam hover:text-seafoam-green transition-colors"
              target="_blank"
            >
              Klaviyo
            </a>
          </p>
          <p className="text-seafoam-green text-2xl mt-2">
            In my free time, I like to ski, read fantasy books, cook, and work
            on{" "}
            <a
              href="https://zensearch.jobs"
              className="text-light-seafoam hover:text-seafoam-green transition-colors"
              target="_blank"
            >
              ZenSearch
            </a>
          </p>
          <div className="flex justify-center space-x-6 py-4">
            <a
              href="https://github.com/mrkaye97"
              className="text-seafoam-green hover:text-light-seafoam transition-colors"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
              <span className="sr-only">Github</span>
            </a>
            <a
              href="https://www.strava.com/athletes/16125633"
              className="text-seafoam-green hover:text-light-seafoam transition-colors"
              target="_blank"
            >
              <FontAwesomeIcon icon={faStrava} size="2x" />
              <span className="sr-only">Strava</span>
            </a>
            <a
              href="mailto:mrkaye97@gmail.com"
              className="text-seafoam-green hover:text-light-seafoam transition-colors"
              target="_blank"
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
              <span className="sr-only">Email</span>
            </a>
            <a
              href="https://app.thestorygraph.com/profile/mrkaye97"
              className="text-seafoam-green hover:text-light-seafoam transition-colors"
              target="_blank"
            >
              <FontAwesomeIcon icon={faBook} size="2x" />
              <span className="sr-only">StoryGraph</span>
            </a>
            <a
              href="https://untappd.com/user/mrkaye97"
              className="text-seafoam-green hover:text-light-seafoam transition-colors"
              target="_blank"
            >
              <FontAwesomeIcon icon={faUntappd} size="2x" />
              <span className="sr-only">Untappd</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
