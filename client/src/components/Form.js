import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    titulo: '',
    resumo: '',
    conteudo: '',
    categoria: '',
    imagem: ''
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:3001/api/anuncios/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const request = isEdit
      ? axios.put(`http://localhost:3001/api/anuncios/${id}`, form)
      : axios.post('http://localhost:3001/api/anuncios', form);

    request
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>{isEdit ? 'Editar Anúncio' : 'Novo Anúncio'}</h1>
      <form onSubmit={handleSubmit}>
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required /><br />
        <textarea name="resumo" placeholder="Resumo" value={form.resumo} onChange={handleChange} /><br />
        <textarea name="conteudo" placeholder="Conteúdo" value={form.conteudo} onChange={handleChange} /><br />
        <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} /><br />
        <input name="imagem" placeholder="URL da Imagem" value={form.imagem} onChange={handleChange} /><br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default Form;
