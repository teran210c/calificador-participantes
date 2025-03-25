"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";


const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleClick = () => {
    const currentSlide = slides[currentIndex];
    if (currentSlide.path) {
      router.push(currentSlide.path);
    } else {
      console.error("No hay ruta definida para este slide.");
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="overflow-hidden relative h-80">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform transform ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={handleClick}
          >
            <div className="w-full h-full bg-white p-6 rounded-lg shadow-lg cursor-pointer">
              <h2 className="text-2xl font-bold mb-4">{slide.title}</h2>
              <p className="text-gray-600 mb-4">{slide.subtitle}</p>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

{pathname === "/concurso1" && (
                <div className="mt-4 flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Botón ${num} presionado en ${slide.title}`);
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>


      {/* Botones de navegación */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={prevSlide}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={nextSlide}
      >
        Next
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
