import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./categoria.css"; // pode reutilizar o mesmo CSS dos cards

function Busca() {
  const { query } = useParams();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/anuncios/buscar?q=${query}`)
      .then((res) => setResultados(res.data))
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <main className="categoria-container">
      <h1 className="categoria-titulo">Resultado da busca por: <span>{query}</span></h1>

      {resultados.length === 0 ? (
        <p className="sem-resultados">Nenhum resultado encontrado.</p>
      ) : (
        <div className="categoria-grid">
          {resultados.map((item) => (
            <div key={item.id} className="categoria-card">
              <img src={item.imagem} alt={item.titulo} className="categoria-imagem" />
              <div className="categoria-info">
                <h2>{item.titulo}</h2>
                <p>{item.resumo}</p>
                <Link to={`/noticia/${item.id}`} className="btn-lermais">Ler mais →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Busca;
