"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Carousel from "@/components/Carousel";

const Concurso1 = () => {
  const router = useRouter();
  const { concurso_id } = router.query; // obtenemos el concurso_id desde la URL

  const { concursantes, loading } = useConcursantes(concurso_id);

  if (!concurso_id) {
    return <div>Por favor, selecciona un concurso.</div>;
  }

  return (
    <div>
      <h1>Concurso {concurso_id}</h1>
      <Carousel slides={concursantes} loading={loading} />
    </div>
  );
};

export default Concurso1;
