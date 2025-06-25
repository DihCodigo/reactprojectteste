import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Noticia() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [relacionadas, setRelacionadas] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/anuncios/${id}`)
      .then((res) => setNoticia(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (noticia?.categoria) {
      axios
        .get(`http://localhost:3001/api/anuncios?categoria=${noticia.categoria}`)
        .then((res) => {
          const outras = res.data.filter((n) => n.id !== parseInt(id));
          setRelacionadas(outras.slice(0, 5));
        })
        .catch((err) => console.error(err));
    }
  }, [noticia, id]);

  function processarConteudo(htmlString) {
  const paragrafos = htmlString.split(/\n\s*\n/);
  const resultado = [];

  paragrafos.forEach((paragrafo, index) => {
    resultado.push(
      <p key={`p-${index}`}>{paragrafo.trim()}</p>
    );

    if ((index + 1) % 2 === 0 && index < paragrafos.length - 1) {
      resultado.push(
        <div key={`ad-${index}`} className="espaco-paragrafo">
          {/* Aqui você pode colocar um anúncio real 
          <div className="anuncio-placeholder">
            [ Anúncio aqui ]
          </div>
          */}
        </div>
      );
    }
  });

  return resultado;
}


  if (!noticia) return <p className="carregando">Carregando...</p>;

  return (
    <main className="noticia-container">
      <article className="noticia-content">
        <h1 className="noticia-titulo">{noticia.titulo}</h1>

        <div className="noticia-meta">
          <span>{new Date(noticia.data_publicacao).toLocaleString()}</span> |{" "}
          <Link
            to={`/categoria/${noticia.categoria}`}
            className="noticia-categoria"
          >
            {noticia.categoria}
          </Link>
        </div>

        {noticia.imagem && (
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            className="noticia-imagem"
          />
        )}

        <section className="noticia-corpo">{processarConteudo(noticia.conteudo)}</section>

        <Link to="/" className="link-voltar">
          ← Voltar para Home
        </Link>
      </article>

      <aside className="noticia-lateral">
        <h3>Relacionadas</h3>
        <ul className="relacionadas-lista">
          {relacionadas.map((item) => (
            <li key={item.id} className="relacionada-item">
              <Link to={`/noticia/${item.id}`}>
                <img src={item.imagem} alt={item.titulo} />
                <div className="relacionada-info">
                  <h4>{item.titulo}</h4>
                  <time>{new Date(item.data_publicacao).toLocaleDateString()}</time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}

export default Noticia;
