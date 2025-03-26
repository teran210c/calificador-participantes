'use client';

import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import ConcursoDropdown from '../components/ConcursoDropdown';
import { useState, useEffect } from "react";

export default function Home() {
  const [concursoId, setConcursoId] = useState('');

  const handleConcursoSelect = (id) => {
    setConcursoId(id);
  };

  return (
    <div>
      <NavBar />
      <HeroSection />
      <ConcursoDropdown onConcursoSelect={handleConcursoSelect} />
      <Carousel concursoId={concursoId} />
      <Footer />
    </div>
  );
}
