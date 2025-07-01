import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.css';

function Header() {
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  const fecharMenu = () => {
    setExpanded(false);
    setDropdownOpen(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/buscar/${encodeURIComponent(query.trim())}`);
    setResultados([]);
    setQuery('');
    fecharMenu();
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand logo" onClick={fecharMenu}>
            Viraliza!<span className="logo-highlight">NEWS</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse${expanded ? ' show' : ''}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={fecharMenu}>
                  Home
                </Link>
              </li>

              <li
                className={`nav-item dropdown${dropdownOpen ? ' show' : ''}`}
                onMouseEnter={() => window.innerWidth > 768 && setDropdownOpen(true)}
                onMouseLeave={() => window.innerWidth > 768 && setDropdownOpen(false)}
              >
                <Link
                  to="#"
                  className={`nav-link dropdown-toggle${dropdownOpen ? ' show' : ''}`}
                  role="button"
                  aria-expanded={dropdownOpen}
                  onClick={(e) => {
                    if (window.innerWidth <= 768) {
                      e.preventDefault();
                      setDropdownOpen(!dropdownOpen);
                    } else {
                      fecharMenu();
                    }
                  }}
                >
                  Categorias
                </Link>

                <ul className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}>
                  {/* Interesse geral e curiosidades */}
                  <li>
                    <Link className="dropdown-item" to="/categoria/aconteceu-agora" onClick={fecharMenu}>Aconteceu Agora</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/categoria/absurdos-reais" onClick={fecharMenu}>Absurdos Reais</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/categoria/inacreditavel" onClick={fecharMenu}>Inacreditável</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/categoria/virais" onClick={fecharMenu}>Virais e Trends</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/categoria/misterios" onClick={fecharMenu}>Mistérios e Segredos</Link>
                  </li>

                  {/* Atualidades e impacto social */}
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/categoria/bastidores-do-poder" onClick={fecharMenu}>Bastidores do Poder</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/caos-urbano" onClick={fecharMenu}>Caos Urbano</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/crimes-e-casos" onClick={fecharMenu}>Crimes e Casos</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/planeta-em-alerta" onClick={fecharMenu}>Planeta em Alerta</Link></li>

                  {/* Ciência e tecnologia com estilo */}
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/categoria/futuro-ja-comecou" onClick={fecharMenu}>O Futuro Já Começou</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/inovacoes-malucas" onClick={fecharMenu}>Inovações Malucas</Link></li>

                  {/* Entretenimento e cotidiano */}
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/categoria/celebridades" onClick={fecharMenu}>Celebridades e Fofocas</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/vida-real" onClick={fecharMenu}>Vida Real</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/rotina-insana" onClick={fecharMenu}>Rotina Insana</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/inspira-ou-indigna" onClick={fecharMenu}>Inspira ou Indigna?</Link></li>

                  {/* Esportes com apelo */}
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/categoria/bola-na-rede" onClick={fecharMenu}>Bola na Rede</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/drama-dos-campeoes" onClick={fecharMenu}>Drama dos Campeões</Link></li>

                  {/* Bem-estar e sociedade */}
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/categoria/mente-e-corpo" onClick={fecharMenu}>Mente e Corpo</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/comportamento" onClick={fecharMenu}>Comportamento</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/familia-e-relacoes" onClick={fecharMenu}>Família e Relações</Link></li>

                  {/* Chamadas populares e sensacionalistas */}
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/categoria/bomba-do-dia" onClick={fecharMenu}>Bomba do Dia</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/top10" onClick={fecharMenu}>TOP 10</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/nao-acreditei" onClick={fecharMenu}>Não Acreditei</Link></li>
                  <li><Link className="dropdown-item" to="/categoria/videos-virais" onClick={fecharMenu}>Vídeos Virais</Link></li>
                </ul>
              </li>
            </ul>

            {/* Área de busca */}
            <form
              className="form-search-wrapper"
              onSubmit={e => {
                e.preventDefault();
                handleSearch();
              }}
              role="search"
            >
              <input
                className="form-control"
                type="search"
                placeholder="Pesquisar por..."
                aria-label="Pesquisar"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onEnterPress}
              />
              <button type="submit" aria-label="Pesquisar">
                🔍
              </button>
            </form>
          </div>
        </div>

        {/* Resultados da busca (pode estilizar no seu layout.css) */}
        {resultados.length > 0 && (
          <div className="resultados-busca container mt-2">
            {resultados.map(item => (
              <Link
                key={item.id}
                to={`/noticia/${item.id}`}
                onClick={fecharMenu}
                className="resultado-item d-flex align-items-center mb-2 text-decoration-none"
              >
                <img src={item.imagem} alt={item.titulo} width={60} height={40} className="me-2" />
                <div>
                  <h6 className="mb-0">{item.titulo}</h6>
                  <small>{item.resumo}</small>
                </div>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
