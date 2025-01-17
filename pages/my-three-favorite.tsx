import { SpeakerLoudIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type FavoriteItem = {
  name: string;
  link: string;
};

type Item = {
  title: string;
  icon: React.ReactNode;
  items: FavoriteItem[];
};

const favorites: Item[] = [
  {
    title: "Musicians (According to Spotify)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Cities (European)",
    items: [
      { name: "Barcelona", link: "https://en.wikipedia.org/wiki/Barcelona" },
      { name: "Budapest", link: "https://en.wikipedia.org/wiki/Budapest" },
      { name: "Stockholm", link: "https://en.wikipedia.org/wiki/Stockholm" },
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Cities (Other)",
    items: [
      { name: "Melbourne", link: "https://en.wikipedia.org/wiki/Melbourne" },
      { name: "Oaxaca", link: "https://en.wikipedia.org/wiki/Oaxaca_City" },
      { name: "Vancouver", link: "https://en.wikipedia.org/wiki/Vancouver" },
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    title: "Serious Eats Recipes",
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
    ),
  },
  {
    title: "Ski Mountains",
    items: [
      { name: "Alta", link: "https://www.alta.com/" },
      { name: "Big Sky", link: "https://bigskyresort.com/" },
      { name: "Jackson Hole", link: "https://www.jacksonhole.com/" },
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
        />
      </svg>
    ),
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>
    ),
  },
  {
    title: "Hikes",
    items: [
      {
        name: "Six Summits",
        link: "https://www.alltrails.com/trail/us/maine/six-summit-trail",
      },
      {
        name: "Gertrude Saddle",
        link: "https://www.alltrails.com/trail/new-zealand/southland/gertrude-saddle-route",
      },
      {
        name: "Mount Healy Overlook",
        link: "https://www.alltrails.com/explore/trail/us/alaska/mount-healy-overlook-trail",
      },
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Moments in Baseball History",
    items: [
      {
        name: "The Catch",
        link: "https://www.youtube.com/watch?v=7bLt2xKaNH0&ab_channel=MLBVault",
      },
      {
        name: "Torii Hunter 2002 All Star Game Catch",
        link: "https://www.youtube.com/watch?v=dcQ5De9ZcZc&ab_channel=MLB",
      },
      {
        name: "Kirk Gibson's Walk-Off Home Run",
        link: "https://www.youtube.com/watch?v=N4nwMDZYXTI",
      },
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    ),
  },
  {
    title: "Wine Grapes",
    items: [
      {
        name: "Tempranillo",
        link: "https://en.wikipedia.org/wiki/Tempranillo",
      },
      { name: "Sangiovese", link: "https://en.wikipedia.org/wiki/Sangiovese" },
      { name: "Syrah", link: "https://en.wikipedia.org/wiki/Syrah" },
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
        />
      </svg>
    ),
  },
];

export function Ticket({ item }: { item: Item }) {
  return (
    <div className="shadow-2xl rounded-lg flex flex-col bg-blue-500 gap-y-2">
      <div className="p-4 gap-y-4 flex flex-col">
        <div className="flex flex-row justify-start items-center gap-x-4">
          {item.icon}
          <p className="text-center text-white font-semibold">{item.title}</p>
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          {item.items.map((i) => {
            return (
              <Link
                key={i.link}
                href={i.link}
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full bg-blue-300 text-white rounded-md p-2 hover:opacity-100 hover:bg-dark-seafoam">
                  <p>{i.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MyThreeFavorite() {
  return (
    <div className="px-4 md:px-16 py-8 mb-16 md:mb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {favorites.map((item) => (
          <Ticket key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
