import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";

export default function Home() {
  const slides = [
    {
      title: "Card 1",
      image: "https://w7.pngwing.com/pngs/69/217/png-transparent-number-number-1-miscellaneous-angle-rectangle.png",
      subtitle: "This is the subtitle of Card 1",
      path: "/concurso1"
    },
    {
      title: "Card 2",
      image: "https://pngimg.com/uploads/number2/Number%202%20PNG%20images%20free%20download_PNG14925.png",
      subtitle: "This is the subtitle of Card 2"
    },
    {
      title: "Card 3",
      image: "https://static.vecteezy.com/system/resources/previews/013/760/192/original/number-3-illustration-on-white-background-free-vector.jpg",
      subtitle: "This is the subtitle of Card 3"
    }
  ];
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Carousel slides={slides}/>
      <Footer />
    </div>
  );
}
