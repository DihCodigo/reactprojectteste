import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    titulo: '',
    resumo: '',
    conteudo: '',
    categoria: '',
    imagem: '',
    destaque: false,
    data_publicacao: '',
    visualizacoes: 0
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:3001/api/anuncios/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const visualizacoes = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
    const formData = { ...form, visualizacoes };

    const request = isEdit
      ? axios.put(`http://localhost:3001/api/anuncios/${id}`, formData)
      : axios.post('http://localhost:3001/api/anuncios', formData);

    request
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div className="form-container">
      <h1>{isEdit ? 'Editar Anúncio' : 'Novo Anúncio'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input name="titulo" value={form.titulo} onChange={handleChange} required />

        <label>Resumo</label>
        <textarea name="resumo" value={form.resumo} onChange={handleChange} />

        <label>Conteúdo</label>
        <textarea name="conteudo" value={form.conteudo} onChange={handleChange} />

        <label>Categoria</label>
        <input name="categoria" value={form.categoria} onChange={handleChange} />

        <label>Imagem (URL)</label>
        <input name="imagem" value={form.imagem} onChange={handleChange} />

        <label>
          <input
            type="checkbox"
            name="destaque"
            checked={form.destaque}
            onChange={handleChange}
          /> Destaque
        </label>

        <label>Data de Publicação</label>
        <input
          type="datetime-local"
          name="data_publicacao"
          value={form.data_publicacao}
          onChange={handleChange}
        />

        {isEdit && (
          <>
            <label>Visualizações</label>
            <input name="visualizacoes" value={form.visualizacoes} disabled />
          </>
        )}

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default Form;
