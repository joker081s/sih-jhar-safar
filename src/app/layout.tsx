import Footer from "@/components/common-ui/Footer";
import "./globals.css";
import MenuBar from "@/components/common-ui/MenuBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <MenuBar />
        <div className="w-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
