import AddConcursanteButton from "@/components/AddConcursanteButton";

const AddConcursanteSlide = ({ onAdd, concursoId }) => {
  return (
    <div className="w-full flex-shrink-0 flex justify-center items-center">
      <div className="w-80 md:w-96 h-48 md:h-56 bg-green-500 rounded-lg shadow-md flex flex-col justify-center items-center p-4">
        <div className="pointer-events-auto z-10 relative" onClick={(e) => e.stopPropagation()}>
        <AddConcursanteButton onAddConcursante={onAdd} concursoId={concursoId} />
      </div>
        <p className="text-white mt-2 text-lg">Agregar Concursante</p>
      </div>
    </div>
  );
};

export default AddConcursanteSlide;
