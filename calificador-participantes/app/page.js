import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Carousel from "@/components/carousel";

export default function Home() {
  let slides = [
    "https://thumbs.dreamstime.com/b/madera-del-perro-adolescente-51235138.jpg",
    "https://img.mmc.com.do/cdn-bucket/uploads/2024/02/Dia-internacinal-del-gato-768x548.jpg.webp",
    "https://i.ebayimg.com/images/g/1awAAOSwbg1hLSu6/s-l1600.webp"
  ];
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Carousel slides={slides}/>
      <h1>Hola mundo</h1>
    </div>
  );
}
