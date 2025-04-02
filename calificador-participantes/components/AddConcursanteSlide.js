import AddConcursanteButton from "@/components/AddConcursanteButton";

const AddConcursanteSlide = ({ onAdd, concursoId }) => {
  return (
    <div className="w-full flex-shrink-0 p-4 bg-green-500 rounded-lg shadow-md h-auto sm:h-96 md:h-128 lg:h-128 flex flex-col justify-center items-center">
      <div className="pointer-events-auto z-10 relative" onClick={(e) => e.stopPropagation()}>
        <AddConcursanteButton onAddConcursante={onAdd} concursoId={concursoId} />
      </div>
      <p className="text-white mt-2 text-lg">Agregar Concursante</p>
    </div>
  );
};

export default AddConcursanteSlide;
