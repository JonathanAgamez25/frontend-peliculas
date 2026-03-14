import React, { useEffect, useState } from "react";

const textoCompleto =
  "Bienvenido a la plataforma de películas de IU Digital de Antioquia";

function Home() {
  const [texto, setTexto] = useState("");
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (indice < textoCompleto.length) {
      const timeout = setTimeout(() => {
        setTexto((prev) => prev + textoCompleto[indice]);
        setIndice((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [indice]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-6"
      style={{
        background: "linear-gradient(135deg, #141414 0%, #8B0000 100%)",
      }}
    >
      <div className="mb-8 text-8xl">🎬</div>
      <h1
        className="text-5xl font-bold mb-4 min-h-20"
        style={{
          color: "#60a5fa",
          fontFamily: "Georgia, serif",
          textShadow: "0 0 20px rgba(96,165,250,0.5)",
        }}
      >
        {texto}
        <span className="animate-pulse">|</span>
      </h1>
      <p style={{ color: "#9ca3af" }} className="text-xl mt-6">
        Gestiona géneros, directores, productoras y películas desde un solo
        lugar.
      </p>
      <div className="flex gap-6 mt-10">
        <div
          className="text-center p-4 rounded-lg"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div className="text-3xl mb-2">🎭</div>
          <p style={{ color: "#60a5fa" }}>Géneros</p>
        </div>
        <div
          className="text-center p-4 rounded-lg"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div className="text-3xl mb-2">🎥</div>
          <p style={{ color: "#60a5fa" }}>Directores</p>
        </div>
        <div
          className="text-center p-4 rounded-lg"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div className="text-3xl mb-2">🏢</div>
          <p style={{ color: "#60a5fa" }}>Productoras</p>
        </div>
        <div
          className="text-center p-4 rounded-lg"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <div className="text-3xl mb-2">🎬</div>
          <p style={{ color: "#60a5fa" }}>Películas</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
