"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function Carousel({ concursoId }) {
  const [concursantes, setConcursantes] = useState([]);
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (concursoId) { 
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3010/api/concursantes/${concursoId}`);
          const data = await response.json();
          console.log("📥 Fetched concursantes:", data); // Debugging
          setConcursantes(data); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [concursoId]);

  let previousSlide = () => {
    setCurrent(current === 0 ? concursantes.length - 1 : current - 1);
  };

  let nextSlide = () => {
    setCurrent(current === concursantes.length - 1 ? 0 : current + 1);
  };

  const navigateToSlide = (path) => {
    router.push(path);
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
      calificacion: calificacion,
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

  return (
    <div className="overflow-hidden relative">
      <div className={`flex transition ease-out duration-40`} style={{ transform: `translateX(-${current * 100}%)` }}>
        {concursantes.map((concursante, index) => (
          <div
            key={concursante.concursante_id || `concursante-${index}`} // Se usa el índice como respaldo
            className="w-full flex-shrink-0 p-4 bg-white rounded-lg shadow-md h-auto sm:h-96 md:h-128 lg:h-128"
            onClick={() => navigateToSlide(`/concurso${concursoId}`)}
          >

            <h2 className="text-xl text-center font-bold mb-2">{concursante.nombre}</h2>
            <img
              src="/images/default.jpg"
              alt={`Concursante ${concursante.id}`}  // Use `concursante.id` for unique alt text
              className="w-full h-full object-cover rounded-md"
            />
            <p className="text-gray-600 text-center mt-2">Concurso ID: {concursoId}</p>
          </div>
        ))}
      </div>

      {concursantes.length > 0 ? (
        <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2 z-10">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                handleVote(num);  // Send the selected rating
              }}            
            >
              {num}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">Cargando concursantes...</p>
      )}

      {/* Navigation buttons */}
      <div className="absolute top-0 h-full w-full justify-between items-center flex text-gray px-10 text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {concursantes.map((_, i) => (
          <div
            onClick={() => setCurrent(i)}
            key={"circle" + i}
            className={`rounded-full w-5 h-5 cursor-pointer ${i === current ? "bg-blue-950" : "bg-gray-500"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
