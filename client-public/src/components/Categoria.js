import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './layout.css';

function Categoria() {
  const { categoria } = useParams();
  const [noticias, setNoticias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [generoSelecionado, setGeneroSelecionado] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/anuncios')
      .then(res => {
        const filtradas = res.data.filter(n => n.categoria === categoria);
        setNoticias(filtradas);

        // Extraindo gêneros únicos das notícias (ex: campo `genero`)
        const unicos = [...new Set(filtradas.map(n => n.genero).filter(Boolean))];
        setGeneros(unicos);
      })
      .catch(err => console.error(err));
  }, [categoria]);

  const noticiasFiltradas = generoSelecionado
    ? noticias.filter(n => n.genero === generoSelecionado)
    : noticias;

  return (
    <main className="categoria-pagina">
      <h1 className="categoria-titulo">Categoria: {categoria}</h1>

      {generos.length > 0 && (
        <div className="genero-filtros">
          <button
            onClick={() => setGeneroSelecionado(null)}
            className={!generoSelecionado ? 'ativo' : ''}
          >
            Todos
          </button>
          {generos.map((g, i) => (
            <button
              key={i}
              onClick={() => setGeneroSelecionado(g)}
              className={generoSelecionado === g ? 'ativo' : ''}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      <div className="categoria-card-grid">
        {noticiasFiltradas.map(n => (
          <div className="categoria-card" key={n.id}>
            <Link to={`/noticia/${n.id}`}>
              <img src={n.imagem} alt="" />
              <div className="categoria-card-info">
                <h2>{n.titulo}</h2>
                <p>{n.resumo}</p>
                <span className="genero">{n.genero}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Categoria;
