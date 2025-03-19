"use client";

import Logo from "./Logo";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Talent Show</h1>

        {/* Botón para abrir/cerrar el menú en móviles */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Menú de navegación */}
        <ul
          className={`absolute md:static bg-gray-800 w-full md:w-auto top-16 left-0 p-4 md:p-0 transition-transform duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } md:flex md:space-x-6`}
        >
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Concursantes</a></li>
          <li><a href="#">Calificar</a></li>
          <li><a href="#">Comentarios</a></li>
        </ul>
      </div>
    </nav>
  );
}