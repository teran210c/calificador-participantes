import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <h1>Hola mundo</h1>
    </div>
  );
}
