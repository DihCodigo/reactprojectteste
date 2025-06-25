import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [submenuAberto, setSubmenuAberto] = useState(false);
  const [query, setQuery] = useState(''); // estado para a pesquisa

  // Fecha menus quando clicar em link
  const fecharMenu = () => {
    setMenuAberto(false);
    setSubmenuAberto(false);
  };

  // Fecha submenu se clicar fora (útil mobile)
  useEffect(() => {
    function handleClickFora(event) {
      const menuCategoria = document.querySelector('.menu-categoria');
      if (menuCategoria && !menuCategoria.contains(event.target)) {
        setSubmenuAberto(false);
      }
    }
    if (submenuAberto) {
      document.addEventListener('mousedown', handleClickFora);
    } else {
      document.removeEventListener('mousedown', handleClickFora);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, [submenuAberto]);

  // Função disparada ao clicar no botão pesquisar ou apertar Enter
  const handleSearch = () => {
    console.log('Pesquisar por:', query);
    // aqui você pode implementar sua lógica, ex: redirecionar para página de busca
    // ex: window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="site-header">
      <div className="logo">
        Viraliza! <span className="logo-highlight">NEWS</span>
      </div>

      <nav className={`nav-links ${menuAberto ? 'ativo' : ''}`}>
        <Link to="/" onClick={fecharMenu}>Home</Link>

        <div
          className="menu-categoria"
          onMouseEnter={() => window.innerWidth > 768 && setSubmenuAberto(true)}
          onMouseLeave={() => window.innerWidth > 768 && setSubmenuAberto(false)}
        >
          <Link
            to="/categoria"
            onClick={(e) => {
              if (window.innerWidth <= 768) {
                e.preventDefault();
                setSubmenuAberto(!submenuAberto);
              } else {
                fecharMenu();
              }
            }}
          >
            Categorias
          </Link>

          {submenuAberto && (
            <div className="submenu">
              <Link to="/categoria/esportes" onClick={fecharMenu}>Esportes</Link>
              <Link to="/categoria/rotinas" onClick={fecharMenu}>Rotinas</Link>
              <Link to="/categoria/politica" onClick={fecharMenu}>Política</Link>
              <Link to="/categoria/cultura" onClick={fecharMenu}>Cultura</Link>
              <Link to="/categoria/tecnologia" onClick={fecharMenu}>Tecnologia</Link>
            </div>
          )}
        </div>

        <Link to="/categoria/reviews" onClick={fecharMenu}>Reviews</Link>

        {/* Campo de busca dentro do menu */}
        <div className="user-area">
          <input
            type="text"
            placeholder="Pesquisar por..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onEnterPress}
          />
          <button onClick={handleSearch} aria-label="Pesquisar" className="botao-pesquisa">
            🔍
          </button>
        </div>
      </nav>

      <div
        className={`menu-hamburguer ${menuAberto ? 'aberto' : ''}`}
        onClick={() => setMenuAberto(!menuAberto)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}

export default Header;
