import Image from "next/image";
import React from "react";

interface ParagraphDivProps {
  src: string;
  title: string;
  content: string;
  reverse?: boolean;
}

export default function ParagraphDiv({
  src,
  title,
  content,
  reverse = false,
}: ParagraphDivProps) {
  return (
    <div
      className={`px-10 py-15 flex w-screen h-[90vh] gap-10 bg-green-50 ${
        reverse ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="w-5/10 flex flex-col justify-center items-start h-full gap-5">
        <h1 className=" scroll-m-20 text-5xl font-extrabold tracking-tight text-balance">
          {title}
        </h1>
        <p className="leading-7 text-xl font-bold ">{content}</p>
      </div>
      <div className="w-5/10 h-full relative">
        <Image src={src} fill className="object-cover rounded-xl" alt="Image" />
      </div>
    </div>
  );
}
