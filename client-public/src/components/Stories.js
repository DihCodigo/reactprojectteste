import React, { useEffect, useState } from "react";
import axios from "axios";
import GalleryModal from "./GalleryModal";
import "./Stories.css";

function Stories() {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  // Duplicar para efeito infinito
  const duplicatedStories = [...stories, ...stories];

  useEffect(() => {
    axios.get("http://localhost:3001/api/anuncios/recentes")
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setStories(data);
      })
      .catch(err => console.error("Erro ao carregar stories:", err));
  }, []);

  if (!stories.length) return null;

  return (
    <section className="stories-container">
      <h2>Destaques Recentes</h2>
      <div className="stories-scroll" tabIndex={0}>
        <div className="stories-scroll-inner">
          {duplicatedStories.map((noticia, idx) => (
            <div
              key={`${noticia.id}-${idx}`}
              className="story-card"
              onClick={() => setSelectedStory(noticia)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedStory(noticia)}
              aria-label={`Abrir story: ${noticia.titulo}`}
              role="button"
            >
              <div className="story-card-inner">
                <div className="story-card-front">
                  <img
                    src={noticia.imagem || "https://via.placeholder.com/160x120?text=Story"}
                    alt={noticia.titulo}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div
                  className="story-card-back"
                  style={{
                    backgroundImage: `url(${noticia.imagem || "https://via.placeholder.com/160x120?text=Story"})`
                  }}
                >
                  <div className="story-card-content">
                    <h3>{noticia.titulo}</h3>
                    <p className="story-resumo">{noticia.resumo || 'Sem resumo disponível.'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedStory && (
        <GalleryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </section>
  );
}

export default Stories;
