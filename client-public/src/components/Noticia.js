import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Noticia() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/anuncios/${id}`)
      .then(res => setNoticia(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!noticia) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{noticia.titulo}</h1>
      <p><em>{new Date(noticia.data_publicacao).toLocaleString()}</em></p>
      <p><strong>Categoria:</strong> <Link to={`/categoria/${noticia.categoria}`}>{noticia.categoria}</Link></p>
      {noticia.imagem && <img src={noticia.imagem} alt="" style={{ maxWidth: '300px' }} />}
      <div>{noticia.conteudo}</div>
      <br />
      <Link to="/">← Voltar para Home</Link>
    </div>
  );
}

export default Noticia;
