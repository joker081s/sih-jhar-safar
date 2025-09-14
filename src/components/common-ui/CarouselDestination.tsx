"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../ui/card";

const data = [
  {
    title: "Netarhat Dam",
    value: 1,
    description:
      "A serene reservoir nestled amidst dense forests, offering peaceful sunsets and a tranquil escape in the Queen of Chotanagpur.",
  },
  {
    title: "Hazaribagh National Park",
    value: 2,
    description:
      "A wildlife haven known for its lush greenery, scenic hills, and rich fauna including leopards, sambar deer, and exotic birds.",
  },
  {
    title: "Bhuvaneshwari Temple",
    value: 3,
    description:
      "A hilltop temple dedicated to Goddess Bhuvaneshwari, offering panoramic views of Ranchi city and a peaceful spiritual vibe.",
  },
  {
    title: "Dimna Lake",
    value: 4,
    description:
      "A picturesque artificial lake near Jamshedpur, surrounded by Dalma Hills — perfect for boating, picnics, and nature walks.",
  },
  {
    title: "Dalma Hills",
    value: 5,
    description:
      "Scenic hills near Jamshedpur, home to elephants and rich wildlife — popular for trekking, nature trails, and breathtaking views.",
  },
  {
    title: "Baba Baidyanath Dham",
    value: 6,
    description:
      "One of the 12 Jyotirlingas of Lord Shiva, this ancient temple in Deoghar is a major pilgrimage site with rich spiritual heritage.",
  },
  {
    title: "Naulakha Mandir",
    value: 7,
    description:
      "A historic temple in Deoghar with intricate architecture and spiritual ambience, named after its construction cost of nine lakh rupees.",
  },
];

export default function CarouselDestination() {
  return (
    <div className="h-full w-full">
      <Carousel
        className="h-full w-full relative"
        opts={{ align: "start", loop: true }}
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent className="w-full h-full m-0 p-0">
          {data.map((item) => (
            <CarouselItem
              key={item.value}
              className="relative w-[50vh] h-[70vh] basis-1/3 p-0"
            >
              <Card className="m-0 p-0 w-full h-full px-5 bg-transparent border-0 shadow-none">
                <CardContent className="relative p-0 m-0 h-full w-full rounded-2xl overflow-hidden group bg-black hover:opacity-90 cursor-pointer">
                  <Image
                    src={`/attractions/image${item.value}.jpeg`}
                    alt={`Image ${item.value}`}
                    fill
                    className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    priority={item.value === 1}
                  />
                  <div className="text-white text-2xl opacity-100 group-hover:opacity-0 transition-opacity duration-300 uppercase font-bold text-center absolute bottom-0 p-10  m-0 w-full">
                    {item.title}
                  </div>
                  <div className="text-white bg-black/50 flex justify-center items-center text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase font-medium text-center absolute px-4 py-10 w-full h-full">
                    {item.description}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
