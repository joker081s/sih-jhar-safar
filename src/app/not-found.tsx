import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex h-full w-full justify-center items-center border-2 border-blue-100 mt-10">
      <div className="text-2xl text-center">
        Page not found : 404
        <br />
        <Button
          asChild
          variant="link"
          className="text-2xl font-semibold"
          size="icon"
        >
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
