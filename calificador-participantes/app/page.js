import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";

export default function Home() {
  const concursoId = 1;  // Replace this with the actual concurso_id you want to display

  return (
    <div>
      <NavBar />
      <HeroSection />
      <Carousel concursoId={concursoId} />
      <Footer />
    </div>
  );
}
