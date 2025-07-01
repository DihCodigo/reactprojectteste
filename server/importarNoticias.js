require('dotenv').config();
const axios = require('axios');
const mysql = require('mysql2/promise');

// Mapeamento das categorias personalizadas
const categorias = {
  'aconteceu-agora': 'general',
  'absurdos-reais': 'general',
  'inacreditavel': 'entertainment',
  'virais': 'entertainment',
  'misterios': 'general',
  'bastidores-do-poder': 'general',
  'caos-urbano': 'general',
  'crimes-e-casos': 'general',
  'planeta-em-alerta': 'science',
  'futuro-ja-comecou': 'technology',
  'inovacoes-malucas': 'technology',
  'celebridades': 'entertainment',
  'vida-real': 'general',
  'rotina-insana': 'general',
  'inspira-ou-indigna': 'general',
  'bola-na-rede': 'sports',
  'drama-dos-campeoes': 'sports',
  'mente-e-corpo': 'health',
  'comportamento': 'general',
  'familia-e-relacoes': 'general',
  'bomba-do-dia': 'general',
  'top10': 'general',
  'nao-acreditei': 'entertainment',
  'videos-virais': 'entertainment'
};

// Função para buscar notícias com base no nome da categoria
async function buscarNoticiasPorTermo(termo) {
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(termo)}&lang=pt&country=br&max=100&expand=content&apikey=${process.env.GNEWS_API_KEY}`;
  const res = await axios.get(url);
  return res.data.articles;
}

// Inserção no banco de dados
async function inserirNoticias(connection, noticias, categoriaSite) {
  for (const noticia of noticias) {
    try {
      const titulo = noticia.title;
      const resumo = noticia.description || '';
      const conteudo = noticia.content || resumo;
      const imagem = noticia.image || null;
      const dataPublicacao = noticia.publishedAt.replace('T', ' ').replace('Z', '');
      const visualizacoes = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;

      await connection.execute(
        `INSERT INTO anuncios 
          (titulo, resumo, conteudo, imagem, categoria, data_publicacao, visualizacoes) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [titulo, resumo, conteudo, imagem, categoriaSite, dataPublicacao, visualizacoes]
      );
    } catch (err) {
      if (!err.message.includes("Duplicate entry")) {
        console.error(`Erro ao inserir notícia: ${noticia.title}`, err.message);
      }
    }
  }
}

// Execução principal
async function main() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'site_anuncios'
  });

  for (const [categoriaSite] of Object.entries(categorias)) {
    console.log(`Importando notícias para categoria: ${categoriaSite}`);
    const noticias = await buscarNoticiasPorTermo(categoriaSite.replace(/-/g, ' '));
    await inserirNoticias(db, noticias, categoriaSite);
  }

  await db.end();
  console.log('Importação finalizada!');
}

main();
