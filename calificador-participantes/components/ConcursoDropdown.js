import { useState, useEffect } from 'react';

const ConcursoDropdown = ({ onConcursoSelect }) => {
  const [concursos, setConcursos] = useState([]);
  const [selectedConcurso, setSelectedConcurso] = useState('');

  useEffect(() => {
    // Fetch the available concursos from the backend
    const fetchConcursos = async () => {
      try {
        const response = await fetch('http://localhost:3010/api/concursos');
        if (!response.ok) {
          throw new Error("Failed to fetch concursos");
        }
        const data = await response.json();
        setConcursos(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchConcursos();
  }, []); // Runs only once when the component is mounted

  const handleSelect = (event) => {
    const concursoId = event.target.value;
    setSelectedConcurso(concursoId);
    onConcursoSelect(concursoId); // Call the callback to notify parent
  };

  return (
    <div>
      <label htmlFor="concurso">Select Concurso: </label>
      <select id="concurso" value={selectedConcurso} onChange={handleSelect}>
        <option value="">-- Select Concurso --</option>
        {concursos.map((concurso) => (
          <option key={concurso.concurso_id} value={concurso.concurso_id}>
            Concurso {concurso.concurso_id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConcursoDropdown;