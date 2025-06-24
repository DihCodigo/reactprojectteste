import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/anuncios')
      .then(res => setNoticias(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Últimas Notícias</h1>
      {noticias.map(noticia => (
        <div key={noticia.id}>
          <h2><Link to={`/noticia/${noticia.id}`}>{noticia.titulo}</Link></h2>
          <p>{noticia.resumo}</p>
          <Link to={`/categoria/${noticia.categoria}`}>Ver mais de {noticia.categoria}</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
