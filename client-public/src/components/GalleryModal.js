import React from "react";
import "./GalleryModal.css";

function GalleryModal({ story, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-image-wrapper">
          <img src={story.imagem} alt={story.titulo} />
        </div>
        <div className="modal-info">
          <h2>{story.titulo}</h2>
          <p>{story.resumo || "Sem resumo disponível."}</p>
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;
