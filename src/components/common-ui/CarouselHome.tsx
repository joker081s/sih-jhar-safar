"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

export default function CarouselHome() {
  return (
    <div className="h-full w-screen">
      <Carousel
        className="h-full w-full relative"
        opts={{ align: "start", loop: true }}
        plugins={[
          Autoplay({
            delay: 3500,
          }),
        ]}
      >
        <CarouselContent className="w-screen h-full m-0 p-0">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <CarouselItem key={num} className="relative w-full h-[100vh]">
              <Image
                src={`/carousel/image${num}.jpeg`}
                alt={`Image ${num}`}
                fill
                className="object-cover"
                priority={num === 1}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[20px] top-[50%] opacity-30" />
        <CarouselNext className="absolute right-[20px] top-[50%] opacity-30" />
      </Carousel>
    </div>
  );
}
