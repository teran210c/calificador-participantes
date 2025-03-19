export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Talent Show. Todos los derechos reservados.</p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="#" className="hover:text-blue-400">Términos y condiciones</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-400">Política de privacidad</a>
          </div>
        </div>
      </footer>
    );
  }