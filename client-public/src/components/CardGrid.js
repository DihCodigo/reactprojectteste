import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

function CardGrid({ noticias }) {
  const lista = Array.isArray(noticias) ? noticias : [];

  // Ordenar por mais vistos (caso tenha campo `views`)
  const maisVistos = [...lista]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  return (
    <section className="cards-wrapper">
      <div className="cards">
        <h3>No ar agora</h3>
        <div className="card-grid">
          {lista.slice(0, 6).map((noticia) => (
            <div className="card" key={noticia.id}>
              <img
                src={noticia.imagem && noticia.imagem.trim() !== '' ? `${noticia.imagem}` : 'https://via.placeholder.com/180x250?text=Anime'}
                alt={noticia.titulo || 'Imagem'}
              />
              <h4><Link to={`/noticia/${noticia.id}`}>{noticia.titulo}</Link></h4>
              <p>{noticia.categoria}</p>
            </div>
          ))}
        </div>
      </div>

      <aside className="mais-vistos">
        <h3>Mais Vistos</h3>
        <ul className="mais-vistos-lista">
          {maisVistos.map((noticia) => (
            <li key={noticia.id}>
              <Link to={`/noticia/${noticia.id}`}>
                <img
                  src={noticia.imagem && noticia.imagem.trim() !== '' ? `${noticia.imagem}` : 'https://via.placeholder.com/80x80?text=+'}
                  alt={noticia.titulo}
                />
                <div>
                  <h4>{noticia.titulo}</h4>
                  <span>{noticia.visualizacoes || 0} visualizações</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}

export default CardGrid;
