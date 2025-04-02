"use client";  // Add this at the top of the file

import { useState, useEffect } from "react";
import ConcursanteCard from "./ConcursanteCard";
import CarouselControls from "./CarouselControls";
import CarouselIndicators from "./CarouselIndicators";
import AddConcursanteSlide from "./AddConcursanteSlide";

const Carousel = ({ concursoId }) => {
  const [concursantes, setConcursantes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data"); // Replace with your API endpoint
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  const fetchConcursantes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3010/api/concursantes/concurso/${concursoId}`);
      if (!response.ok) throw new Error("Failed to fetch concursantes");
      const data = await response.json();
      setConcursantes(data);
    } catch (error) {
      console.error("Error fetching concursantes:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (concursoId) {
      fetchConcursantes();
    }
  }, [concursoId]);

  const totalSlides = concursantes.length + 1;

  const previousSlide = () => setCurrent(current === 0 ? totalSlides - 1 : current - 1);
  const nextSlide = () => setCurrent(current === totalSlides - 1 ? 0 : current + 1);

  const handleAddConcursante = async () => {
    await fetchConcursantes();
  };

  const handleVote = async (calificacion, concursante_id, concurso_id) => {
    if (!concurso_id) {
      console.error("❌ Error: concurso_id is missing!");
      return;
    }
  
    console.log("🔹 Sending vote:", { calificacion, concursante_id, concurso_id });
  
    try {
      const response = await fetch("http://localhost:3010/api/votar", {  // <-- Cambia el puerto aquí
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calificacion, concursante_id, concurso_id }),
      });
  
      const result = await response.json();
      console.log("✅ Server response:", result);
  
      if (!response.ok) throw new Error(result.error || "Error al votar");
  
      await fetchConcursantes(); // ✅ Refresh concursantes list
    } catch (error) {
      console.error("❌ Error in voting:", error);
    }
  };
  
  

  const handleDeleteConcursante = async (concursanteId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este concursante?")) return;

    try {
      const response = await fetch(`http://localhost:3010/api/concursantes/${concursanteId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("No se pudo eliminar el concursante");

      setConcursantes((prev) => prev.filter((c) => c.concursante_id !== concursanteId));
    } catch (error) {
      console.error("Error eliminando concursante:", error);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Cargando concursantes...</div>;

  return (
    <div className="overflow-hidden relative">
      <div className="flex transition ease-out duration-400" style={{ transform: `translateX(-${current * 100}%)` }}>
      {concursantes.map((concursante, index) => (
        <ConcursanteCard
          key={concursante.id || index}
          concursante={concursante}
          onVote={handleVote}
          onDelete={handleDeleteConcursante}
          fetchConcursantes={fetchConcursantes}
          concursoId={concursoId} // ✅ Pass concursoId explicitly
        />
      ))}

        <AddConcursanteSlide onAdd={handleAddConcursante} concursoId={concursoId} />
      </div>

      <CarouselControls onPrevious={previousSlide} onNext={nextSlide} />
      <CarouselIndicators totalSlides={totalSlides} currentIndex={current} onSelect={setCurrent} />
    </div>
  );
};

export default Carousel;
