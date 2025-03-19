export default function Hero() {
    return (
      <section className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center text-center p-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">Bienvenido al Talent Show</h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl">
            Califica a los concursantes y deja tus comentarios sobre el evento.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a href="#calificar" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-center sm:mr-4">Calificar</a>
            <a href="#comentarios" className="border border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-6 rounded-lg text-center">Ver Comentarios</a>
          </div>
        </div>
      </section>
    );
  }