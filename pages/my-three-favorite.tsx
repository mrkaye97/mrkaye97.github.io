import { TextLink } from "@/src/components/links";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type FavoriteItem = {
  name: string;
  link: string;
};

type Item = {
  title: string;
  items: FavoriteItem[];
};

type FavoriteCategoryProps = {
  title: string;
  items: FavoriteItem[];
  isFlipped: boolean;
  onClick: () => void;
};

function FavoriteCategory({
  title,
  items,
  isFlipped,
  onClick,
}: FavoriteCategoryProps) {
  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <div
        className="flex flex-col bg-opacity-100 border border-gray-500 justify-center shadow-2xl rounded-lg p-6 m-1 hover:cursor-pointer h-48"
        onClick={onClick}
      >
        <strong className="pr-2 text-white text-lg text-center pb-2">
          {title}
        </strong>
      </div>
      <div
        className="flex flex-col bg-opacity-100 border border-gray-500 shadow-2xl justify-center rounded-lg hover:cursor-pointer h-48 divide-y divide-gray-500 m-1"
        onClick={onClick}
      >
        {items
          .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
          )
          .map((item, index) => {
            return (
              <div
                key={index}
                className="p-2 ml-2 mr-2 text-white text-center"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <TextLink
                  key={title + item.name}
                  text={item.name}
                  href={item.link}
                />
              </div>
            );
          })}
      </div>
    </ReactCardFlip>
  );
}

const favorites: Item[] = [
  {
    title: "Musicians (According to Spotify)",
    items: [
      {
        name: "Bad Bunny",
        link: "https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X",
      },
      {
        name: "Imagine Dragons",
        link: "https://open.spotify.com/artist/53XhwfbYqKCa1cC15pYq2q",
      },
      {
        name: "Taylor Swift",
        link: "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02",
      },
    ],
  },
  {
    title: "Authors",
    items: [
      {
        name: "Cal Newport",
        link: "https://app.thestorygraph.com/authors/0968e7ef-339e-4fbf-8ed3-03bbd52a63bb?page=4",
      },
      {
        name: "Khaled Hosseini",
        link: "https://app.thestorygraph.com/authors/4f3848b7-15fd-41e8-9b11-782db69ddb04",
      },
      {
        name: "Sally Rooney",
        link: "https://app.thestorygraph.com/authors/c376f2e1-78fc-44a2-b0d8-e6430a056b7e",
      },
    ],
  },
  {
    title: "Beers",
    items: [
      {
        name: "Heady Topper",
        link: "https://untappd.com/b/the-alchemist-heady-topper/4691",
      },
      {
        name: "King Sue",
        link: "https://untappd.com/b/toppling-goliath-brewing-co-king-sue/594015",
      },
      {
        name: "Very Green",
        link: "https://untappd.com/b/tree-house-brewing-company-very-green/689944",
      },
    ],
  },
  {
    title: "Books (Fiction)",
    items: [
      {
        name: "The Kite Runner",
        link: "https://app.thestorygraph.com/books/6c6726eb-8580-4be7-ab60-5ccd073d7ae5",
      },
      {
        name: "Neverwhere",
        link: "https://app.thestorygraph.com/books/148a1a01-1f5f-440e-8239-f641afa637e0",
      },
      {
        name: "A Storm of Swords",
        link: "https://app.thestorygraph.com/books/ff263f0f-121e-41d2-b2ba-b261fc974cc3",
      },
    ],
  },
  {
    title: "Books (Non-Fiction)",
    items: [
      {
        name: "Algorithms to Live By",
        link: "https://app.thestorygraph.com/books/b5d084fb-6417-4803-8a47-da827d3d7270",
      },
      {
        name: "The Signal and the Noise",
        link: "https://app.thestorygraph.com/books/b771dbda-1528-4886-8814-b530b3a07431",
      },
      {
        name: "Factfulness",
        link: "https://app.thestorygraph.com/books/dedebd43-d2f7-4f9e-8ee3-b73671df1311",
      },
    ],
  },
  {
    title: "Charitable Organizations",
    items: [
      { name: "The Equal Justice Initiative", link: "https://eji.org" },
      {
        name: "International Refugee Assistance Project",
        link: "https://refugeerights.org",
      },
      { name: "World Central Kitchen", link: "https://wck.org" },
    ],
  },
  {
    title: "Cities (American)",
    items: [
      {
        name: "Bozeman",
        link: "https://en.wikipedia.org/wiki/Bozeman,_Montana",
      },
      {
        name: "Cambridge",
        link: "https://en.wikipedia.org/wiki/Cambridge,_Massachusetts",
      },
      {
        name: "New York City",
        link: "https://en.wikipedia.org/wiki/New_York_City",
      },
    ],
  },
  {
    title: "Cities (European)",
    items: [
      { name: "Barcelona", link: "https://en.wikipedia.org/wiki/Barcelona" },
      { name: "Budapest", link: "https://en.wikipedia.org/wiki/Budapest" },
      { name: "Stockholm", link: "https://en.wikipedia.org/wiki/Stockholm" },
    ],
  },
  {
    title: "Cities (Other)",
    items: [
      { name: "Melbourne", link: "https://en.wikipedia.org/wiki/Melbourne" },
      { name: "Oaxaca", link: "https://en.wikipedia.org/wiki/Oaxaca_City" },
      { name: "Vancouver", link: "https://en.wikipedia.org/wiki/Vancouver" },
    ],
  },
  {
    title: "Condiments",
    items: [
      {
        name: "Calabrian Chiles",
        link: "https://www.seriouseats.com/the-condiments-we-put-on-everything",
      },
      {
        name: "Preserved Lemons",
        link: "https://www.seriouseats.com/how-to-make-preserved-lemons",
      },
      {
        name: "Secret Aardvark Hot Sauce",
        link: "https://secretaardvark.com/",
      },
    ],
  },
  {
    title: "Cuisines",
    items: [
      {
        name: "Italian",
        link: "https://en.wikipedia.org/wiki/Italian_cuisine",
      },
      {
        name: "Japanese",
        link: "https://en.wikipedia.org/wiki/Japanese_cuisine",
      },
      {
        name: "Lebanese",
        link: "https://en.wikipedia.org/wiki/Lebanese_cuisine",
      },
      {
        name: "Mexican",
        link: "https://en.wikipedia.org/wiki/Mexican_cuisine",
      },
    ],
  },
  {
    title: "Data Structures",
    items: [
      {
        name: "Graph",
        link: "https://en.wikipedia.org/wiki/Graph_(abstract_data_type)",
      },
      { name: "Skip List", link: "https://en.wikipedia.org/wiki/Skip_list" },
      { name: "B-Tree", link: "https://en.wikipedia.org/wiki/B-tree" },
    ],
  },
  {
    title: "Fictional Characters",
    items: [
      {
        name: "Elaine Benes",
        link: "https://en.wikipedia.org/wiki/Elaine_Benes",
      },
      {
        name: "Oberyn Martell",
        link: "https://awoiaf.westeros.org/index.php/Oberyn_Martell",
      },
      {
        name: "Samwise Gamgee",
        link: "https://lotr.fandom.com/wiki/Samwise_Gamgee",
      },
    ],
  },
  {
    title: "Foods",
    items: [
      { name: "Bananas", link: "https://en.wikipedia.org/wiki/Banana" },
      {
        name: "Chicken of the Woods Mushrooms",
        link: "https://en.wikipedia.org/wiki/Laetiporus",
      },
      {
        name: "Peanut Butter",
        link: "https://en.wikipedia.org/wiki/Peanut_butter",
      },
    ],
  },
  {
    title: "Kitchen Utensils",
    items: [
      {
        name: '7" Santoku Knife',
        link: "https://madeincookware.com/products/santoku-knife/pomme-red",
      },
      {
        name: "Wooden Spoon",
        link: "https://madeincookware.com/products/the-wooden-spoon/utensil",
      },
      { name: "Tongs", link: "https://www.oxo.com/12-tongs-619.html" },
    ],
  },
  {
    title: "Movies",
    items: [
      {
        name: "Birdman",
        link: "https://www.rottentomatoes.com/m/birdman_2014",
      },
      {
        name: "Inside Out",
        link: "https://www.rottentomatoes.com/m/inside_out_2015",
      },
      {
        name: "Moonrise Kingdom",
        link: "https://www.rottentomatoes.com/m/moonrise_kingdom",
      },
    ],
  },
  {
    title: "Non-City Places",
    items: [
      {
        name: "Acadia National Park",
        link: "https://en.wikipedia.org/wiki/Acadia_National_Park",
      },
      { name: "Baseball Hall of Fame", link: "https://baseballhall.org/" },
      {
        name: "Little Cottonwood Canyon",
        link: "https://www.visitsaltlake.com/listing/little-cottonwood-canyon/55176/",
      },
    ],
  },
  {
    title: "Paradigms",
    items: [
      {
        name: "Bayesian",
        link: "https://en.wikipedia.org/wiki/Bayesian_statistics",
      },
      {
        name: "Behavioral",
        link: "https://en.wikipedia.org/wiki/Behavioral_economics",
      },
      {
        name: "Functional",
        link: "https://en.wikipedia.org/wiki/Functional_programming",
      },
    ],
  },
  {
    title: "Pieces of Cookware",
    items: [
      {
        name: "3-Quart Saute Pan",
        link: "https://www.all-clad.com/copper-core-5-ply-bonded-cookware-saute-pan-with-lid-3-quart.html",
      },
      {
        name: '11" Carbon Steel Frying Pan',
        link: "https://www.vollrathfoodservice.com/products/smallwares/cookware-bakeware/vollrath-cookware/vollrath-fry-pans/58920",
      },
      {
        name: "5.5 Quart Dutch Oven",
        link: "https://www.lecreuset.com/round-dutch-oven/21177US.html",
      },
    ],
  },
  {
    title: "SeriousEats Recipes",
    items: [
      {
        name: "Miso Salmon",
        link: "https://www.seriouseats.com/miso-glazed-salmon-in-the-toaster-oven-recipe",
      },
      {
        name: "Miso Squash Soup with Sesame-Ginger Apples",
        link: "https://www.seriouseats.com/miso-squash-soup-recipe",
      },
      {
        name: "Pozole Verde with Chicken",
        link: "https://www.seriouseats.com/recipes/2017/01/pozole-verde-de-pollo-green-mexican-hominy-and-chicken-soup-recipe.html",
      },
    ],
  },
  {
    title: "Ski Mountains",
    items: [
      { name: "Alta", link: "https://www.alta.com/" },
      { name: "Big Sky", link: "https://bigskyresort.com/" },
      { name: "Jackson Hole", link: "https://www.jacksonhole.com/" },
    ],
  },
  {
    title: "Spirits",
    items: [
      {
        name: "Fernet",
        link: "https://en.wikipedia.org/wiki/Fernet#:~:text=Fernet%20(Italian%3A%20%5Bfer%CB%88n%C9%9Bt%5D,base%20of%20distilled%20grape%20spirits.",
      },
      {
        name: "Islay Scotch",
        link: "https://en.wikipedia.org/wiki/Islay_single_malts",
      },
      { name: "Mezcal", link: "https://en.wikipedia.org/wiki/Mezcal" },
    ],
  },
  {
    title: "Subreddits",
    items: [
      {
        name: "ExperiencedDevs",
        link: "https://www.reddit.com/r/ExperiencedDevs",
      },
      {
        name: "MaleLivingSpace",
        link: "https://www.reddit.com/r/MaleLivingSpace",
      },
      {
        name: "UnexpectedFactorial",
        link: "https://www.reddit.com/r/UnexpectedFactorial",
      },
    ],
  },
  {
    title: "TV Shows",
    items: [
      { name: "Atlanta", link: "https://www.rottentomatoes.com/tv/atlanta" },
      {
        name: "Chef's Table",
        link: "https://www.rottentomatoes.com/tv/chef_s_table",
      },
      { name: "Seinfeld", link: "https://www.rottentomatoes.com/tv/seinfeld" },
    ],
  },
];

export default function MyThreeFavorite() {
  const [flippedCardIndex, setFlippedCardIndex] = useState(-1);

  function handleClick(index: number) {
    if (flippedCardIndex === index) {
      setFlippedCardIndex(-1);
    } else {
      setFlippedCardIndex(index);
    }
  }

  return (
    <div className="xs:px-0 md:px-16 xl:px-64 px-4 py-8">
      <div>
        <div className="flex flex-col bg-opacity-100 border border-gray-500 shadow-2xl rounded-lg p-6 m-1">
          <h2 className="text-3xl font-bold text-white mb-4">
            My Three Favorite
          </h2>
          <p className="text-xl font-bold text-gray-300">
            These are a bunch of things I like to do, eat, drink, read, and
            watch. Sometimes I had to pick more than three because I
            couldn&apos;t decide. Flip a card to get to know a little about me!
          </p>
        </div>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
        >
          <Masonry>
            {favorites
              .sort((a, b) =>
                a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
              )
              .map((category, ix) => {
                return (
                  <FavoriteCategory
                    key={category.title}
                    title={category.title}
                    items={category.items}
                    isFlipped={flippedCardIndex === ix}
                    onClick={() => handleClick(ix)}
                  />
                );
              })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}
