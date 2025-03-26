import { useState, useEffect } from 'react';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

const Carousel = ({ concursoId }) => {
  const [concursantes, setConcursantes] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (concursoId) {
      const fetchConcursantes = async () => {
        try {
          const response = await fetch(`http://localhost:3010/api/concursantes/concurso/${concursoId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch concursantes");
          }
          const data = await response.json();
          setConcursantes(data);
        } catch (error) {
          console.error("Error fetching concursantes:", error.message);
        }
      };
      fetchConcursantes();
    }
  }, [concursoId]); // Fetch concursantes when the concursoId changes

  const previousSlide = () => {
    setCurrent(current === 0 ? concursantes.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === concursantes.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div className={`flex transition ease-out duration-40`} style={{ transform: `translateX(-${current * 100}%)` }}>
        {concursantes.map((concursante, index) => (
          <div
            key={concursante.concursante_id || `concursante-${index}`}
            className="w-full flex-shrink-0 p-4 bg-white rounded-lg shadow-md h-auto sm:h-96 md:h-128 lg:h-128"
          >
            <h2 className="text-xl text-center font-bold mb-2">{concursante.nombre}</h2>
            <img
              src="/images/default.jpg"
              alt={`Concursante ${concursante.nombre}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>

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
};

export default Carousel;
