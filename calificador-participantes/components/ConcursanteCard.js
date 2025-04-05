import VoteButtons from "./VoteButtons";

const ConcursanteCard = ({ concursante, onVote, onDelete, fetchConcursantes, concursoId }) => {
  
  return (
    <div className="w-full flex-shrink-0 p-4 bg-white rounded-lg shadow-md h-auto flex flex-col items-center">
      <h2 className="text-xl text-center font-bold mb-2">{concursante.nombre}</h2>
      <img 
        src="/default.jpg" 
        alt={`Concursante ${concursante.nombre}`} 
        className="w-full h-full object-cover rounded-md" 
      />
      <p className="text-lg font-semibold text-gray-600">
        ⭐ Current Rating: {concursante.calificacion ?? "Not Rated"}
      </p>

      <VoteButtons
        onVote={(calificacion) => {
          console.log("📌 Sending vote:", {
            calificacion,
            concursante_id: concursante.concursante_id,
            concurso_id: concursoId, // ✅ Use concursoId instead of concursante.concurso_id
          });

    onVote(calificacion, concursante.concursante_id, concursoId);
  }}
  fetchData={fetchConcursantes}
/>


      {/* ✅ Add Delete Button */}
      <button
        onClick={() => onDelete(concursante.concursante_id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Eliminar
      </button>
    </div>
  );
};

export default ConcursanteCard;
