import { promises as fs } from "fs";
import path from "path";
import React from "react";
import Image from "next/image";
import { imageRoot } from "@/src/common/images";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function TravelPhotos({ imageFilenames }) {
  return (
    <div className="m-2">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {imageFilenames.map((el) => (
            <div key={el} className="p-1">
              <Image
                width={800}
                height={600}
                alt={"alt"}
                src={imageRoot + `travel/${el}`}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export async function getStaticProps() {
  const imageDirectory = path.join(process.cwd(), "/public/travel/");
  const imageFilenames = await fs.readdir(imageDirectory);

  return {
    props: {
      imageFilenames,
    },
  };
}
