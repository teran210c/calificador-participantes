"use client";

import { useState, useEffect } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import AddConcursanteButton from "@/components/AddConcursanteButton";

const Carousel = ({ concursoId }) => {
  const [concursantes, setConcursantes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (concursoId) {
      const fetchConcursantes = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:3010/api/concursantes/concurso/${concursoId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch concursantes");
          }
          const data = await response.json();
          setConcursantes(data);
        } catch (error) {
          console.error("Error fetching concursantes:", error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchConcursantes();
    }
  }, [concursoId]);

  const totalSlides = concursantes.length + 1;

  const previousSlide = (e) => {
    e.stopPropagation();
    setCurrent(current === 0 ? totalSlides - 1 : current - 1);
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrent(current === totalSlides - 1 ? 0 : current + 1);
  };

  const handleAddConcursante = (newConcursante) => {
    setConcursantes((prev) => [...prev, newConcursante]);
    setCurrent(concursantes.length);
  };

  const handleVote = async (calificacion) => {
    const concursante = concursantes[current];
    if (!concursante?.concursante_id) {
      console.error("❌ Error: concursante_id no definido.");
      return;
    }
    

    const voteData = {
      concursante_id: concursante.concursante_id,
      concurso_id: concursoId,
      calificacion,
    };
    

    console.log("📤 Sending vote payload:", voteData);

    try {
      const response = await fetch("http://localhost:3010/api/votar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar la calificación");
      }

      console.log("✅ Vote successful:", data);
    } catch (error) {
      console.error("❌ Error al votar:", error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Cargando concursantes...</div>;
  }

  return (
    <div className="overflow-hidden relative">
      <div className="flex transition ease-out duration-400" style={{ transform: `translateX(-${current * 100}%)` }}>
        {concursantes.map((concursante, index) => (
          <div
          key={concursante.id || `concursante-${index}`}
            className="w-full flex-shrink-0 p-4 bg-white rounded-lg shadow-md h-auto sm:h-96 md:h-128 lg:h-128 flex flex-col items-center"
          >
            <h2 className="text-xl text-center font-bold mb-2">{concursante.nombre}</h2>
            <img
              src="/images/default.jpg"
              alt={`Concursante ${concursante.nombre}`}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="mt-4 flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleVote(num)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="w-full flex-shrink-0 p-4 bg-green-500 rounded-lg shadow-md h-auto sm:h-96 md:h-128 lg:h-128 flex flex-col justify-center items-center">
          <div className="pointer-events-auto z-10 relative" onClick={(e) => e.stopPropagation()}>
            <AddConcursanteButton onAddConcursante={handleAddConcursante} concursoId={concursoId} />
          </div>
          <p className="text-white mt-2 text-lg">Add Concursante</p>
        </div>
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-gray px-3 text-3xl pointer-events-none">
        <button
          onClick={previousSlide}
          className="z-20 pointer-events-auto bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
        >
          <BsFillArrowLeftCircleFill />
        </button>
        <button
          onClick={nextSlide}
          className="z-20 pointer-events-auto bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
        >
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-2 flex justify-center gap-3 w-full z-20 pointer-events-none">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(i);
            }}
            key={`indicator-${i}`}
            className={`rounded-full w-4 h-4 cursor-pointer pointer-events-auto ${
              i === current ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
