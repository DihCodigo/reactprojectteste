import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Interna() {
  const { id } = useParams();
  const [anuncio, setAnuncio] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/anuncios/${id}`)
      .then(res => setAnuncio(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!anuncio) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{anuncio.titulo}</h1>
      <p><em>{new Date(anuncio.data_publicacao).toLocaleString()}</em></p>
      <p><strong>Categoria:</strong> {anuncio.categoria}</p>
      {anuncio.imagem && <img src={anuncio.imagem} alt="" style={{ maxWidth: '300px' }} />}
      <div>{anuncio.conteudo}</div>
      <br />
      <Link to="/">← Voltar</Link>
    </div>
  );
}

export default Interna;
