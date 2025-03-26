import { useState } from "react";

const VoteButton = ({ concursanteId, concursoId }) => {
  const [loading, setLoading] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  const [error, setError] = useState(null);

  const handleVote = async (calificacion) => {
    setLoading(true);
    setError(null);
    setSelectedVote(calificacion);

    const voteData = {
      concursante_id: concursanteId,
      concurso_id: concursoId,
      calificacion,
    };

    console.log("📤 Sending vote payload:", voteData);

    try {
      const response = await fetch("http://localhost:3010/api/votar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar la calificación");
      }

      console.log("✅ Vote successful:", data);
    } catch (error) {
      console.error("❌ Error al votar:", error);
      setError("Error al votar. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2 z-10">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          className={`py-1 px-3 rounded-lg transition-all ${
            selectedVote === num
              ? "bg-green-500 text-white"
              : "bg-blue-500 text-white hover:bg-blue-700"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            handleVote(num);
          }}
        >
          {loading && selectedVote === num ? "..." : num}
        </button>
      ))}
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default VoteButton;
