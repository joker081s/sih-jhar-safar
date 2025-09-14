import Image from "next/image";
import React from "react";
import CarouselDestination from "./CarouselDestination";

export default function Destinations() {
  return (
    <div className="bg-amber-50 relative w-screen h-[110vh]">
      <Image
        src="/JharkhandMap.jpeg"
        alt="JharkhandMap"
        fill
        className="object-cover brightness-110 saturate-125 contrast-110"
        priority
      />
      <div className="absolute w-full h-full px-10 py-15 backdrop-blur-xs inset-0 bg-gradient-to-b from-green-600/40 via-green-300/20 to-transparent">
        <div className="w-full h-full">
          <div className="p-8 text-center h-2/12">
            <h1 className="text-5xl text-green-950/75 font-bold">
              Explore Jharkhand
            </h1>
          </div>
          <div className="w-full h-10/12 px-10 py-5">
            <CarouselDestination />
          </div>
        </div>
      </div>
    </div>
  );
}
