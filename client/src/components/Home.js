import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/anuncios')
      .then(res => setAnuncios(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <h1>Últimos Anúncios</h1>
      <Link to="/novo" className="new-link">➕ Novo Anúncio</Link>

      {anuncios.map(anuncio => (
        <div key={anuncio.id} className="anuncio-card">
          <h2><Link to={`/anuncio/${anuncio.id}`}>{anuncio.titulo}</Link></h2>
          <p>{anuncio.resumo}</p>
          <Link to={`/editar/${anuncio.id}`} className="edit-link">✏️ Editar</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
