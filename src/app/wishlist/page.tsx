"use client";

import { useAppStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Heart, ArrowLeft } from "lucide-react";

export default function WishlistPage() {
  const wishlist = useAppStore((s) => s.wishlist);
  const removeFromWishlist = useAppStore((s) => s.removeFromWishlist);

  return (
    <div className="min-h-screen bg-forest-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-forest-500">My Wishlist</h1>
          <Button asChild variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
            <Link href="/explore" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Explore
            </Link>
          </Button>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-forest-100 mx-auto flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-forest-400" />
            </div>
            <p className="text-forest-400 text-lg mb-6">Your wishlist is empty. Start exploring and add your favorites.</p>
            <Button asChild className="bg-forest-400 hover:bg-forest-500">
              <Link href="/explore">Explore Places</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <Card key={item.id} className="bg-forest-50 border-forest-200">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle className="text-forest-500 text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-forest-400">{item.kind.toUpperCase()}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-forest-300 text-forest-500 hover:bg-forest-100"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


