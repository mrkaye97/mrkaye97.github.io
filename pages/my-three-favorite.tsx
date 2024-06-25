import { TextLink } from "@/src/components/links";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type FavoriteItem = {
  name: string;
  link?: string | null | undefined;
};

type FavoriteCategoryProps = {
  title: string;
  items: FavoriteItem[];
};

function FavoriteCategory({ title, items }: FavoriteCategoryProps) {
  return (
    <div className="flex flex-col bg-opacity-100 border border-gray-500 shadow-2xl rounded-lg p-6 m-1">
      <strong className="pr-2 text-white text-center pb-2">{title}</strong>
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index} className="list-disc ml-2 pl-1 text-gray-300">
              {item.link ? (
                <TextLink
                  key={title + item.name}
                  text={item.name}
                  href={item.link}
                />
              ) : (
                <p className="text-gray-300">{item.name}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const favorites: FavoriteCategoryProps[] = [
  {
    title: "Artists (Musical, According to Spotify)",
    items: [
      { name: "Bad Bunny" },
      { name: "Imagine Dragons" },
      { name: "Taylor Swift" },
    ],
  },
  {
    title: "Authors",
    items: [
      { name: "Cal Newport" },
      { name: "Khaled Hosseini" },
      { name: "Sally Rooney" },
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
      { name: "Bozeman" },
      { name: "Cambridge" },
      { name: "New York City" },
    ],
  },
  {
    title: "Cities (European)",
    items: [{ name: "Barcelona" }, { name: "Budapest" }, { name: "Stockholm" }],
  },
  {
    title: "Cities (Other)",
    items: [{ name: "Melbourne" }, { name: "Oaxaca" }, { name: "Vancouver" }],
  },
  {
    title: "College Courses",
    items: [
      { name: "Advanced Algorithms" },
      { name: "Mathematical Structures" },
      { name: "Price Theory" },
    ],
  },
  {
    title: "Condiments",
    items: [
      { name: "Calabrian Chiles" },
      { name: "Preserved Lemons" },
      { name: "Secret Aardvark Hot Sauce" },
    ],
  },
  {
    title: "Cuisines (Couldn't pick three)",
    items: [
      { name: "Italian" },
      { name: "Japanese" },
      { name: "Lebanese" },
      { name: "Mexican" },
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
    title: "Economic Subfields",
    items: [
      { name: "Labor Economics" },
      { name: "Monetary Theory" },
      { name: "Urban Economics" },
    ],
  },
  {
    title: "Fictional Characters",
    items: [
      { name: "Elaine Benes" },
      { name: "Oberyn Martell" },
      { name: "Samwise Gamgee" },
    ],
  },
  {
    title: "Foods",
    items: [
      { name: "Bananas" },
      { name: "Maitake Mushrooms" },
      { name: "Peanut Butter" },
    ],
  },
  {
    title: "Kitchen Utensils",
    items: [
      { name: '7" Santoku Knife' },
      { name: "Tasting Spoon" },
      { name: "Tongs" },
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
      { name: "Acadia National Park" },
      { name: "Baseball Hall of Fame" },
      { name: "Little Cottonwood Canyon" },
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
      { name: "3-Quart Saute Pan" },
      { name: "Cast Iron Skillet" },
      { name: "Dutch Oven" },
    ],
  },
  {
    title: "SeriousEats Recipes",
    items: [
      {
        name: "Halal Cart Chicken",
        link: "https://www.seriouseats.com/recipes/2011/12/serious-eats-halal-cart-style-chicken-and-rice-white-sauce-recipe.html",
      },
      {
        name: "Pozole Verde with Chicken",
        link: "https://www.seriouseats.com/recipes/2017/01/pozole-verde-de-pollo-green-mexican-hominy-and-chicken-soup-recipe.html",
      },
      {
        name: "Red Wine-Braised Short Ribs",
        link: "https://www.seriouseats.com/recipes/2019/12/red-wine-braised-beef-short-ribs-recipe.html",
      },
    ],
  },
  {
    title: "Ski Mountains",
    items: [{ name: "Alta" }, { name: "Big Sky" }, { name: "Jackson Hole" }],
  },
  {
    title: "Spirits",
    items: [{ name: "Fernet" }, { name: "Islay Scotch" }, { name: "Mezcal" }],
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
            couldn&apos;t decide, but the goal is to help you get to know a
            little bit about me!
          </p>
        </div>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
        >
          <Masonry>
            {favorites.map((category) => {
              return (
                <FavoriteCategory
                  key={category.title}
                  title={category.title}
                  items={category.items}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}
