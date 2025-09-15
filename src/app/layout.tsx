import Footer from "@/components/common-ui/Footer";
import "./globals.css";
import MenuBar from "@/components/common-ui/MenuBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jhar-Safar | Explore Jharkhand",
  description: "Discover the beauty of Jharkhand - from ancient temples to stunning waterfalls, wildlife sanctuaries to hill stations. Plan your perfect trip to the soul of nature.",
  keywords: "Jharkhand tourism, travel, temples, waterfalls, national parks, hill stations, India travel",
  authors: [{ name: "Jhar-Safar Team" }],
  openGraph: {
    title: "Jhar-Safar | Explore Jharkhand",
    description: "Discover the beauty of Jharkhand - from ancient temples to stunning waterfalls",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased overflow-x-hidden bg-background text-foreground">
        <div className="min-h-screen flex flex-col">
          <MenuBar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
