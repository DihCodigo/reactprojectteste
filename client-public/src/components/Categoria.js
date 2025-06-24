import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Categoria() {
  const { categoria } = useParams();
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/anuncios')
      .then(res => {
        const filtradas = res.data.filter(n => n.categoria === categoria);
        setNoticias(filtradas);
      })
      .catch(err => console.error(err));
  }, [categoria]);

  return (
    <div>
      <h1>Categoria: {categoria}</h1>
      {noticias.map(noticia => (
        <div key={noticia.id}>
          <h2><Link to={`/noticia/${noticia.id}`}>{noticia.titulo}</Link></h2>
          <p>{noticia.resumo}</p>
        </div>
      ))}
    </div>
  );
}

export default Categoria;
