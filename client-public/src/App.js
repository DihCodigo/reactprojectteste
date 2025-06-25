import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Banner from './components/Banner';
import Stories from './components/Stories';
import CardGrid from './components/CardGrid';
import UltimasNoticias from './components/UltimasNoticias';
import Categoria from './components/Categoria';
import Noticia from './components/Noticia';
import axios from 'axios';

function App() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/anuncios/ultimas')
      .then(res => {
        setNoticias(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar notícias:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <Stories />
              {loading ? (
                <p style={{ padding: '20px', textAlign: 'center' }}>Carregando notícias...</p>
              ) : (
                <CardGrid noticias={noticias} />
              )}
              <UltimasNoticias />
            </>
          } />
          <Route path="/categoria" element={<Categoria />} />

          <Route path="/categoria/:categoria" element={<Categoria />} />

          <Route path="/noticia/:id" element={<Noticia />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
