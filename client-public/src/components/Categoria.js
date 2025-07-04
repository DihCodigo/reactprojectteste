import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./categoria.css";

function Categoria() {
  const { categoria } = useParams();
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/anuncios/categoria/${categoria}`)
      .then((res) => setAnuncios(res.data))
      .catch((err) => console.error(err));
  }, [categoria]);

  return (
    <main className="categoria-container">
      <h1 className="categoria-titulo">Categoria: <span>{categoria}</span></h1>

      {anuncios.length === 0 ? (
        <p className="sem-resultados">Nenhum conteúdo disponível nesta categoria.</p>
      ) : (
        <div className="categoria-grid">
          {anuncios.map((item) => (
            <div key={item.id} className="categoria-card">
              <img src={item.imagem} alt={item.titulo} className="categoria-imagem" />
              <div className="categoria-info">
                <h2>{item.titulo}</h2>
                <p>{item.resumo}</p>
                <Link to={`/noticia/${item.id}`} className="btn-lermais">
                  Ler mais →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Categoria;
