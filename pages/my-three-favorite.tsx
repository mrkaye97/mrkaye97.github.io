import { TextLink } from "@/src/components/links";
import React from "react";

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
    <li className="text-lg text-seafoam-green mb-4">
      <strong className="pr-2">{title + ":"}</strong>
      {items.map((item, index) => {
        return item.link ? (
          <TextLink
            key={title + item.name}
            text={item.name + (index === items.length - 1 ? "" : ", ")}
            href={item.link}
          />
        ) : (
          item.name + (index === items.length - 1 ? "" : ", ")
        );
      })}
    </li>
  );
}

const favorites: FavoriteCategoryProps[] = [
  {
    title: "ALGORITHMS",
    items: [
      { name: "Bogo Sort", link: "https://en.wikipedia.org/wiki/Bogosort" },
      {
        name: "Logistic Regression",
        link: "https://en.wikipedia.org/wiki/Logistic_regression",
      },
      {
        name: "Metropolis-Hastings",
        link: "https://en.wikipedia.org/wiki/Metropolis%E2%80%93Hastings_algorithm",
      },
    ],
  },
  {
    title: "ARTISTS (Musical, According to Spotify)",
    items: [
      { name: "Bad Bunny" },
      { name: "Imagine Dragons" },
      { name: "Taylor Swift" },
    ],
  },
  {
    title: "AUTHORS",
    items: [
      { name: "Fredrik Backman" },
      { name: "Khaled Hosseini" },
      { name: "Sally Rooney" },
    ],
  },
  {
    title: "BEERS",
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
    title: "BOOKS (Fiction)",
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
    title: "BOOKS (Non-Fiction)",
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
    title: "CITIES (American)",
    items: [
      { name: "Bozeman" },
      { name: "Cambridge" },
      { name: "New York City" },
    ],
  },
  {
    title: "CITIES (European)",
    items: [{ name: "Barcelona" }, { name: "Budapest" }, { name: "Stockholm" }],
  },
  {
    title: "CITIES (Other)",
    items: [{ name: "Melbourne" }, { name: "Oaxaca" }, { name: "Vancouver" }],
  },
  {
    title: "COLLEGE COURSES",
    items: [
      { name: "Advanced Algorithms" },
      { name: "Mathematical Structures" },
      { name: "Price Theory" },
    ],
  },
  {
    title: "CONDIMENTS",
    items: [
      { name: "Calabrian Chiles" },
      { name: "Preserved Lemons" },
      { name: "Secret Aardvark Hot Sauce" },
    ],
  },
  {
    title: "CUISINES (Couldn't pick three)",
    items: [
      { name: "Italian" },
      { name: "Japanese" },
      { name: "Lebanese" },
      { name: "Mexican" },
    ],
  },
  {
    title: "DATA STRUCTURES",
    items: [
      {
        name: "Graph",
        link: "https://en.wikipedia.org/wiki/Graph_(abstract_data_type)",
      },
      { name: "Skip List", link: "https://en.wikipedia.org/wiki/Skip_list" },
      { name: "Tibble", link: "https://tibble.tidyverse.org/" },
    ],
  },
  {
    title: "ECONOMIC SUBFIELDS",
    items: [
      { name: "Labor Economics" },
      { name: "Monetary Theory" },
      { name: "Urban Economics" },
    ],
  },
  {
    title: "FICTIONAL CHARACTERS",
    items: [
      { name: "Elaine Benes" },
      { name: "Oberyn Martell" },
      { name: "Samwise Gamgee" },
    ],
  },
  {
    title: "FOODS",
    items: [
      { name: "Bananas" },
      { name: "Maitake Mushrooms" },
      { name: "Peanut Butter" },
    ],
  },
  {
    title: "KITCHEN UTENSILS",
    items: [
      { name: '7" Santoku Knife' },
      { name: "Tasting Spoon" },
      { name: "Tongs" },
    ],
  },
  {
    title: "MOVIES",
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
    title: "NON-CITY PLACES",
    items: [
      { name: "Acadia National Park" },
      { name: "Baseball Hall of Fame" },
      { name: "Little Cottonwood Canyon" },
    ],
  },
  {
    title: "PARADIGMS",
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
    title: "PIECES OF COOKWARE",
    items: [
      { name: "3-Quart Saute Pan" },
      { name: "Cast Iron Skillet" },
      { name: "Dutch Oven" },
    ],
  },
  {
    title: "SERIOUSEATS RECIPES",
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
    title: "SKI MOUNTAINS",
    items: [{ name: "Alta" }, { name: "Big Sky" }, { name: "Jackson Hole" }],
  },
  {
    title: "SPIRITS",
    items: [{ name: "Fernet" }, { name: "Islay Scotch" }, { name: "Mezcal" }],
  },
  {
    title: "SPORTS TO WATCH",
    items: [
      { name: "Baseball" },
      { name: "College Football" },
      { name: "Soccer" },
    ],
  },
  {
    title: "SUBREDDITS",
    items: [
      {
        name: "AdvancedRunning",
        link: "https://www.reddit.com/r/AdvancedRunning",
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
    title: "TV SHOWS",
    items: [
      { name: "Atlanta", link: "https://www.rottentomatoes.com/tv/atlanta" },
      {
        name: "Chef's Table",
        link: "https://www.rottentomatoes.com/tv/chef_s_table",
      },
      { name: "Seinfeld", link: "https://www.rottentomatoes.com/tv/seinfeld" },
    ],
  },
  {
    title: "WEBSITES",
    items: [
      { name: "Fangraphs", link: "https://www.fangraphs.com/" },
      { name: "FiveThirtyEight", link: "https://fivethirtyeight.com/" },
      { name: "Serious Eats", link: "http://www.seriouseats.com/" },
    ],
  },
];

export default function MyThreeFavorite() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div>
        <h2 className="text-3xl font-bold text-light-seafoam mb-8">
          My Three Favorite, Alphabetically
        </h2>
        <ul className="">
          {favorites.map((category) => {
            return (
              <FavoriteCategory
                key={category.title}
                title={category.title}
                items={category.items}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
