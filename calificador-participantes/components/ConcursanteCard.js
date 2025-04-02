import { useState } from "react";
import VoteButtons from "./VoteButtons";

const ConcursanteCard = ({ concursante, onVote }) => {
  const [calificacion, setCalificacion] = useState(concursante.calificacion);

  const handleVote = async (calificacionNueva) => {
    await onVote(calificacionNueva, concursante.concursante_id, concursante.concurso_id);
    setCalificacion(calificacionNueva); // Update UI
  };

  return (
    <div className="w-full flex-shrink-0 p-4 bg-white rounded-lg shadow-md h-auto flex flex-col items-center">
      <h2 className="text-xl text-center font-bold mb-2">{concursante.nombre}</h2>
      <img 
        src="/images/default.jpg" 
        alt={`Concursante ${concursante.nombre}`} 
        className="w-full h-full object-cover rounded-md" 
      />
      <p className="text-lg font-semibold text-gray-600">
        ⭐ Current Rating: {calificacion ?? "Not Rated"}
      </p>
      <VoteButtons onVote={(calificacion) => onVote(calificacion, concursante.concursante_id, concursante.concurso_id)} />

    </div>
  );
};

export default ConcursanteCard;
