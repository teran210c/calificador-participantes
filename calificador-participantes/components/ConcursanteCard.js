import VoteButtons from "./VoteButtons";

const ConcursanteCard = ({ concursante, onVote, onDelete }) => {
  return (
    <div className="w-full flex-shrink-0 p-4 bg-white rounded-lg shadow-md h-auto flex flex-col items-center">
      <h2 className="text-xl text-center font-bold mb-2">{concursante.nombre}</h2>
      <img 
        src="/images/default.jpg" 
        alt={`Concursante ${concursante.nombre}`} 
        className="w-full h-full object-cover rounded-md" 
      />
      <p className="text-lg font-semibold text-gray-600">
        ⭐ Current Rating: {concursante.calificacion ?? "Not Rated"}
      </p>

      <VoteButtons onVote={(calificacion) => onVote(calificacion, concursante.concursante_id, concursante.concurso_id)} />

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
