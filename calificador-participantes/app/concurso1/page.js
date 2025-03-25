'use client';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import useConcursantes from "@/app/hooks/useConcursantes";


export default function Concurso1() {
  const { concursantes, loading } = useConcursantes();

  if (loading) return <p>Cargando concursantes...</p>;

    return (
      <>
      <NavBar />
      {concursantes.length > 0 ? (
        <Carousel slides={concursantes} />
      ) : (
        <p>No hay concursantes disponibles.</p>
      )}
      <Footer />
      </>
    )
  }
  