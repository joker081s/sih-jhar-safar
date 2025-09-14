import CarouselHome from "@/components/common-ui/CarouselHome";
import Slogan from "@/components/common-ui/Slogan";
import ParagraphDiv from "@/components/common-ui/ParagraphDiv";
import Attractions from "@/components/common-ui/Attractions";
import Destinations from "@/components/common-ui/Destinations";

export default function Home() {
  return (
    <div className="h-full w-full">
      <CarouselHome />
      <Slogan first="Jharkhand – The Soul of Nature" />

      <ParagraphDiv
        src={`/paragraphDiv/image1.jpeg`}
        title="Nature & Serenity Focus"
        content="Jharkhand is blessed with abundant natural beauty, making it a paradise for nature lovers. The state is home to dense forests and diverse wildlife, with attractions like Betla National Park in Palamu, known for its elephants, tigers, and leopards the Hazaribagh Wildlife Sanctuary, rich in flora and fauna and the Dalma Wildlife Sanctuary near Jamshedpur, famous for its elephants and birdwatching opportunities. Jharkhand also boasts some of the most stunning waterfalls in India, including Hundru Falls, Dassam Falls, Jonha Falls, Panchghagh Falls, and the majestic Lodh Falls, the highest in the state. Adding to its charm are its scenic hills and serene landscapes—Netarhat, often called the Queen of Chotanagpur Hills, is renowned for breathtaking sunrise and sunset views Parasnath Hill, the highest peak in Jharkhand, is also a revered Jain pilgrimage site and the Patratu Valley enchants visitors with its lush greenery and winding roads, offering a picturesque escape into nature."
      />
      <Slogan first="Where Nature Whispers," second="Jharkhand listens" />

      <ParagraphDiv
        reverse
        src={`/paragraphDiv/image2.jpeg`}
        title="Pilgrimage & Religious Tourism"
        content="Jharkhand is blessed with abundant natural beauty, making it a paradise for nature lovers. The state is home to dense forests and diverse wildlife, with attractions like Betla National Park in Palamu, known for its elephants, tigers, and leopards the Hazaribagh Wildlife Sanctuary, rich in flora and fauna and the Dalma Wildlife Sanctuary near Jamshedpur, famous for its elephants and birdwatching opportunities. Jharkhand also boasts some of the most stunning waterfalls in India, including Hundru Falls, Dassam Falls, Jonha Falls, Panchghagh Falls, and the majestic Lodh Falls, the highest in the state. Adding to its charm are its scenic hills and serene landscapes—Netarhat, often called the Queen of Chotanagpur Hills, is renowned for breathtaking sunrise and sunset views Parasnath Hill, the highest peak in Jharkhand, is also a revered Jain pilgrimage site and the Patratu Valley enchants visitors with its lush greenery and winding roads, offering a picturesque escape into nature."
      />
      <Attractions />
      <Destinations />
    </div>
  );
}
