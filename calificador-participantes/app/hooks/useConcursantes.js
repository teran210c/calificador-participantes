import { useState, useEffect } from "react";

const useConcursantes = (concurso_id) => {
  const [concursantes, setConcursantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcursantes = async () => {
      if (!concurso_id) return; // No hacer nada si no hay concurso_id

      try {
        const response = await fetch(`http://localhost:3010/api/concursantes/${concurso_id}`);
        const data = await response.json();
        // Transformamos los datos al formato esperado por el carrusel
        const formattedData = data.map((c) => ({
          title: c.nombre,
          subtitle: c.descripcion,
          image: c.imagen_url, // Asegúrate de que el backend devuelva una URL válida
          path: `/concursante/${c.id}`, // Ruta dinámica para cada concursante
        }));
        setConcursantes(formattedData);
      } catch (error) {
        console.error("Error al obtener concursantes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcursantes();
  }, [concurso_id]); // Dependemos de concurso_id para hacer la solicitud

  return { concursantes, loading };
};

export default useConcursantes;
