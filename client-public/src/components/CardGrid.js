import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

function CardGrid({ noticias }) {
  const lista = Array.isArray(noticias) ? noticias : [];

  const [maisVistos, setMaisVistos] = useState([]);
  const [noArAgora, setNoArAgora] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:3001/api/anuncios/aleatorias')
      .then(res => {
        if (!res.ok) throw new Error('Erro na resposta da API');
        return res.json();
      })
      .then(data => {
        setNoArAgora(data.noticias || []);
      })
      .catch(err => console.error('Erro ao carregar No ar agora:', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/anuncios/top')
      .then(res => {
        if (!res.ok) throw new Error('Erro na resposta da API');
        return res.json();
      })
      .then(data => setMaisVistos(data))
      .catch(err => console.error('Erro ao carregar mais vistos:', err));
  }, []);

  return (
    <section className="cards-wrapper">
      <div className="cards">
        <h3>No ar agora</h3>
        <div className="card-grid">
          {noArAgora.slice(0, 6).map((noticia) => (
            <div className="card" key={noticia.id}>
              <img
                src={noticia.imagem && noticia.imagem.trim() !== '' ? noticia.imagem : 'https://via.placeholder.com/180x250?text=Anime'}
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
                  src={noticia.imagem && noticia.imagem.trim() !== '' ? noticia.imagem : 'https://via.placeholder.com/80x80?text=+'}
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
