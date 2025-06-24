import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UltimasNoticias.css';

function UltimasNoticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/anuncios/recentes')
      .then(res => setNoticias(res.data))
      .catch(err => console.error('Erro ao carregar últimas notícias:', err));
  }, []);

  return (
    <section className="ultimas-noticias">
      <h2 className="titulo-secao">Últimas Notícias</h2>
      <div className="noticias-lista">
        {noticias.map(noticia => (
          <Link to={`/noticia/${noticia.id}`} className="noticia-list-item" key={noticia.id}>
            <div className="noticia-img-box">
              <img src={noticia.imagem} alt={noticia.titulo} />
            </div>
            <div className="noticia-list-content">
              <h3>{noticia.titulo}</h3>
              <p className="leia-mais">Leia mais &rarr;</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default UltimasNoticias;
