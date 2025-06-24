import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Subhome() {
  const { categoria } = useParams();
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/anuncios')
      .then(res => {
        const filtrados = res.data.filter(a => a.categoria === categoria);
        setAnuncios(filtrados);
      })
      .catch(err => console.error(err));
  }, [categoria]);

  return (
    <div>
      <h1>Categoria: {categoria}</h1>
      {anuncios.map(anuncio => (
        <div key={anuncio.id}>
          <h2><Link to={`/anuncio/${anuncio.id}`}>{anuncio.titulo}</Link></h2>
          <p>{anuncio.resumo}</p>
        </div>
      ))}
    </div>
  );
}

export default Subhome;
