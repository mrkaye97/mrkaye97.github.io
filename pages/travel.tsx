import { promises as fs } from "fs";
import path from "path";
import React from "react";
import Image from "next/image";
import { imageRoot } from "@/src/common/images";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type ImageWithAStory = {
  filename: string;
  location: string;
  date: string;
};

const images: ImageWithAStory[] = [
  {
    filename: "alta.jpg",
    location: "East Castle, Alta, Utah",
    date: "February 2022",
  },
  {
    filename: "blomqvist.jpg",
    location: "Mikael Blomqvist's House, Stockholm, Sweden",
    date: "September, 2019",
  },
  {
    filename: "brooklyn-bridge-park-covid.jpg",
    location: "Brooklyn Bridge Park, New York City",
    date: "June 2020",
  },
  {
    filename: "cartagena.jpg",
    location: "Cartagena, Colombia",
    date: "March 2019",
  },
  {
    filename: "chania.jpg",
    location: "Chania, Crete, Greece",
    date: "October 2024",
  },
  {
    filename: "christiania.jpg",
    location: "Freetown Christiania, Copenhagen, Denmark",
    date: "September 2019",
  },
  {
    filename: "copenhagen-bikes.jpg",
    location: "Copenhagen, Denmark",
    date: "September 2019",
  },
  {
    filename: "costa-rica-selva.jpg",
    location: "Arenal Volcano National Park, Costa Rica",
    date: "December 2022",
  },
  {
    filename: "costa-rica-waterfall.jpg",
    location: "Nicoya, Costa Rica",
    date: "December 2022",
  },
  {
    filename: "cows.jpg",
    location: "Roys Peak, Wanaka, New Zealand",
    date: "April 2024",
  },
  {
    filename: "cuba.jpg",
    location: "Havana, Cuba",
    date: "December 2017",
  },
  {
    filename: "denali-flowers.jpg",
    location: "Denali National Park, Alaska",
    date: "July 2023",
  },
  {
    filename: "denali-mud.jpg",
    location: "Denali National Park, Alaska",
    date: "July 2023",
  },
  {
    filename: "dubrovnik-2.jpeg",
    location: "Dubrovnik, Croatia",
    date: "December 2019",
  },
  {
    filename: "dubrovnik.jpg",
    location: "Dubrovnik, Croatia",
    date: "December 2019",
  },
  {
    filename: "dumbo-covid.jpg",
    location: "Dumbo, Brooklyn, New York City",
    date: "June 2020",
  },
  {
    filename: "fishermans-bastion.jpg",
    location: "Fisherman's Bastion, Budapest, Hungary",
    date: "December 2017",
  },
  {
    filename: "galapagos.jpg",
    location: "Galapagos Islands, Ecuador",
    date: "December 2015",
  },
  {
    filename: "gamla-stan.jpeg",
    location: "Gamla Stan, Stockholm, Sweden",
    date: "September 2019",
  },
  {
    filename: "gertrude-saddle.jpg",
    location: "Gertrude Saddle, Fiordland National Park, New Zealand",
    date: "April 2024",
  },
  {
    filename: "guell-1.jpg",
    location: "Park Güell, Barcelona, Spain",
    date: "October 2019",
  },
  {
    filename: "guell-sunrise.jpg",
    location: "Parc Güell, Barcelona, Spain",
    date: "October 2019",
  },
  {
    filename: "guggenheim.jpeg",
    location: "Guggenheim Museum, Bilbao, Spain",
    date: "October 2019",
  },
  {
    filename: "hobbiton.jpg",
    location: "Bag End, Hobbiton, The Shire, Middle-earth",
    date: "April 2024",
  },
  {
    filename: "hungarian-parliament.jpg",
    location: "Hungarian Parliament, Budapest, Hungary",
    date: "December 2017",
  },
  {
    filename: "leiden.jpeg",
    location: "Leiden, Netherlands",
    date: "November 2024",
  },
  {
    filename: "nyhavn.jpg",
    location: "Nyhavn, Copenhagen, Denmark",
    date: "September 2019",
  },
  {
    filename: "opera-house.jpg",
    location: "Sydney Opera House, Sydney, Australia",
    date: "May 2024",
  },
  {
    filename: "parthenon.jpg",
    location: "Athens, Greece",
    date: "October 2024",
  },
  {
    filename: "plitvice.jpg",
    location: "Plitvice Lakes National Park, Croatia",
    date: "December 2019",
  },
  {
    filename: "pompeii.jpeg",
    location: "Pompeii, Italy",
    date: "December 2019",
  },
  {
    filename: "positano.jpg",
    location: "Positano, Italy",
    date: "December 2019",
  },
  {
    filename: "riga.jpeg",
    location: "Riga, Latvia",
    date: "October 2019",
  },
  {
    filename: "rural-croatia.jpg",
    location: "Drežnik Grad, Croatia",
    date: "December 2019",
  },
  {
    filename: "salzburg.jpg",
    location: "Salzburg, Austria",
    date: "December 2017",
  },
  {
    filename: "sarajevo-bobsled.jpg",
    location: "Olympic Boblsed Track, Sarajevo, Bosnia",
    date: "December 2019",
  },
  {
    filename: "sol-32.jpg",
    location: "Sollerovägen, Stockholm, Sweden",
    date: "November 2019",
  },
  {
    filename: "split.jpg",
    location: "Split, Croatia",
    date: "December 2019",
  },
  {
    filename: "st-andrews.jpeg",
    location: "St. Andrews, Scotland",
    date: "October 2019",
  },
  {
    filename: "arbeit-macht-frei.jpg",
    location: "Oświęcim, Poland",
    date: "December 2017",
  },
  {
    filename: "sthlm.jpg",
    location: "Stadshuset, Kungsholmen, Stockholm, Sweden",
    date: "September 2019",
  },
  {
    filename: "tallinn.jpg",
    location: "Tallinn, Estonia",
    date: "October 2019",
  },
  {
    filename: "times-square-covid.jpg",
    location: "Times Square, New York City",
    date: "June 2020",
  },
  {
    filename: "tivoli.jpeg",
    location: "Tivoli, Copenhagen, Denmark",
    date: "September 2019",
  },
  {
    filename: "vines.jpg",
    location: "Queenstown, New Zealand",
    date: "April 2024",
  },
  {
    filename: "visby.jpeg",
    location: "Visby, Gotland, Sweden",
    date: "October 2019",
  },
  {
    filename: "xander.jpg",
    location: "Positano, Italy",
    date: "December 2019",
  },
  {
    filename: "zagreb.jpg",
    location: "Zagreb, Croatia",
    date: "December 2019",
  },
];

export default function TravelPhotos({
  imagesWithStories,
}: {
  imagesWithStories: ImageWithAStory[];
}) {
  return (
    <div className="px-4 md:px-16 py-8 mb-16 md:mb-0">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {imagesWithStories.map((el) => (
            <div key={el.filename} className="p-2 relative group">
              <div className="overflow-hidden rounded-md shadow-md transition-transform transform-gpu group-hover:scale-95">
                <Image
                  className="object-cover"
                  width={800}
                  height={600}
                  src={imageRoot + `travel/${el.filename}`}
                  alt={"alt"}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-white text-center  rounded-md">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{el.location}</h3>
                  <p className="text-sm">{el.date}</p>
                </div>
              </div>
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

  const imagesWithStories = images.filter((i) =>
    imageFilenames.includes(i.filename)
  );

  return {
    props: {
      imagesWithStories,
    },
  };
}
