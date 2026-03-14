import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6">
      <Link to="/generos" className="hover:text-yellow-400">
        Géneros
      </Link>
      <Link to="/directores" className="hover:text-yellow-400">
        Directores
      </Link>
      <Link to="/productoras" className="hover:text-yellow-400">
        Productoras
      </Link>
      <Link to="/tipos" className="hover:text-yellow-400">
        Tipos
      </Link>
      <Link to="/medias" className="hover:text-yellow-400">
        Películas
      </Link>
    </nav>
  );
}

export default Navbar;
