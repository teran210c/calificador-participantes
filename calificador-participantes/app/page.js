'use client';

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import ConcursoDropdown from '../components/ConcursoDropdown';
import { useState, useEffect } from "react";
import AddConcursanteButton from "@/components/AddConcursanteButton";


export default function Home() {
  const [concursoId, setConcursoId] = useState('');

  const handleConcursoSelect = (id) => {
    setConcursoId(id);
  };
  const handleAddConcursante = (newConcursante) => {
    console.log('New concursante added:', newConcursante);
    // You can update your state or perform any other logic you need
  };
 

  return (
    <div>
      <NavBar />
      <HeroSection />
      <div>
      <ConcursoDropdown onConcursoSelect={handleConcursoSelect} />
      {concursoId && <Carousel concursoId={concursoId} />}
      </div>
      <Footer />
    </div>
  );
}
