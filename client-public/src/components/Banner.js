import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './layout.css';

function Banner() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/anuncios/getSete')
      .then(res => {
        setAnuncios(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Erro ao carregar os anúncios');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando banner...</div>;
  if (error) return <div>{error}</div>;
  if (anuncios.length < 4) return <div>É necessário ao menos 4 anúncios para esse layout</div>;

  const destaque = anuncios[0];
  const topRight = anuncios[1];
  const bottomRight = anuncios.slice(2, 4);

  return (
    <section className="banner-grid">
      {/* GRANDE CARD PRINCIPAL */}
      <div className="banner-main-card">
        <img src={destaque.imagem} alt={destaque.titulo} />
        <div className="banner-overlay">
          <h2>{destaque.titulo}</h2>
          <p>{destaque.resumo}</p>
          <Link to={`/noticia/${destaque.id}`}>
            <button className="botao-leia-mais">Leia mais!</button>
          </Link>
        </div>
      </div>

      {/* MINI CARD DO TOPO DIREITO */}
      <Link to={`/noticia/${topRight.id}`} className="mini-card-top mini-card">
        <img src={topRight.imagem} alt={topRight.titulo} />
        <div className="mini-overlay">
          <h4>{topRight.titulo}</h4>
        </div>
      </Link>

      {/* MINI CARDS DE BAIXO */}
      <div className="side2-group">
        {bottomRight.map(item => (
          <Link to={`/noticia/${item.id}`} className="mini-card" key={item.id}>
            <img src={item.imagem} alt={item.titulo} />
            <div className="mini-overlay">
              <h4>{item.titulo}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Banner;
