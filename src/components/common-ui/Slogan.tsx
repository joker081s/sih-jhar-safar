import React from "react";

export default function Slogan({
  first,
  second,
}: {
  first: string;
  second?: string;
}) {
  return (
    <h1 className="my-10 py-10 scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance">
      &quot;{first}
      {second && (
        <>
          <br />
          {second}
        </>
      )}
      &quot;
    </h1>
  );
}
