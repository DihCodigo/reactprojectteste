import React from 'react';
import './layout.css';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          Café <span className="logo-highlight">Absurdo(!)</span>
        </div>

        <div className="footer-links">
          <div>
            <h4>Categorias</h4>
            <a href="/categoria/esportes">Esportes</a>
            <a href="/categoria/rotinas">Rotinas</a>
            <a href="/categoria/politica">Política</a>
            <a href="/categoria/cultura">Cultura</a>
            <a href="/categoria/tecnologia">Tecnologia</a>
          </div>          
        </div>
      </div>

      <div className="copyright">
        &copy; {new Date().getFullYear()} Viraliza!NEWS Absurdo. Todos os direitos reservados.
      </div>
    </footer>

  );
}

export default Footer;
