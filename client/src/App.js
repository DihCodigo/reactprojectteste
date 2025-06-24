import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Subhome from './components/Subhome';
import Interna from './components/Interna';
import Form from './components/Form';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:categoria" element={<Subhome />} />
          <Route path="/anuncio/:id" element={<Interna />} />
          <Route path="/novo" element={<Form />} />
          <Route path="/editar/:id" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
