const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/relacionadas-por-categoria/:categoria', (req, res) => {
  const categoria = req.params.categoria;

  db.query(
    'SELECT * FROM anuncios WHERE categoria = ? ORDER BY data_publicacao DESC LIMIT 5',
    [categoria],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

router.get('/aleatorias', (req, res) => {
  db.query('SELECT DISTINCT categoria FROM anuncios ORDER BY RAND() LIMIT 3', (err, categorias) => {
    if (err) return res.status(500).send(err);
    const categoriasArray = categorias.map(c => c.categoria);

    if (categoriasArray.length === 0) {
      return res.json([]);
    }
    
    const queries = categoriasArray.map(categoria => {
      return `(SELECT * FROM anuncios WHERE categoria = ${db.escape(categoria)} ORDER BY data_publicacao DESC LIMIT 2)`;
    });

    const finalQuery = queries.join(' UNION ALL ');

    db.query(finalQuery, (err2, noticias) => {
      if (err2) return res.status(500).send(err2);
      res.json({ categorias: categoriasArray, noticias });
    });
  });
});


// GET todos os anúncios (sem limite)
router.get('/', (req, res) => {
  db.query('SELECT * FROM anuncios ORDER BY data_publicacao DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET últimas 6 notícias
router.get('/ultimas', (req, res) => {
  db.query('SELECT * FROM anuncios ORDER BY data_publicacao DESC LIMIT 18', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET Banner 4
router.get('/getSete', (req, res) => {
  const query = 'SELECT * FROM anuncios WHERE data_publicacao >= NOW() - INTERVAL 7 DAY ORDER BY RAND() LIMIT 4';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar os mais visualizados:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
    res.json(results);
  });
});

// relacionados
router.get('/relacionados', (req, res) => {
  const query = '';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar os mais visualizados:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
    res.json(results);
  });
});

// GET top 4 anúncios com mais visualizações
router.get('/top', (req, res) => {
  const query = 'SELECT * FROM anuncios ORDER BY visualizacoes DESC LIMIT 4';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar os mais visualizados:', err);
      return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
    res.json(results);
  });
});

// Rota de stories Destaques
router.get("/recentes", (req, res) => {
  const connection = req.connection;

  connection.query(
    "SELECT * FROM anuncios WHERE destaque = 1 ORDER BY data_publicacao DESC LIMIT 10",
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar stories:", err);
        return res.status(500).json({ erro: "Erro no servidor" });
      }
      res.json(results);
    }
  );
});

router.get("/buscar", (req, res) => {
  const termo = req.query.q;

  if (!termo) {
    return res.status(400).json({ erro: "Termo de busca não fornecido" });
  }

  const sql = `
    SELECT id, titulo, resumo, imagem 
    FROM anuncios 
    WHERE titulo LIKE ? OR resumo LIKE ? 
    ORDER BY data_publicacao DESC 
    LIMIT 20
  `;

  const termoBusca = `%${termo}%`;

  db.query(sql, [termoBusca, termoBusca], (err, results) => {
    if (err) {
      console.error("Erro ao buscar anúncios:", err);
      return res.status(500).json({ erro: "Erro no servidor" });
    }

    res.json(results);
  });
});

// GET anúncios filtrados por categoria
router.get('/categoria/:nome', (req, res) => {
  const categoria = req.params.nome;

  db.query(
    'SELECT * FROM anuncios WHERE categoria = ? ORDER BY data_publicacao DESC',
    [categoria],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// GET por ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM anuncios WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { titulo, resumo, conteudo, categoria, imagem, destaque, data_publicacao } = req.body;

  const visualizacoes = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;

  db.query(
    'INSERT INTO anuncios (titulo, resumo, conteudo, categoria, imagem, destaque, data_publicacao, visualizacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [titulo, resumo, conteudo, categoria, imagem, destaque ? 1 : 0, data_publicacao || new Date(), visualizacoes],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

router.put('/:id', (req, res) => {
  const { titulo, resumo, conteudo, categoria, imagem, destaque, data_publicacao } = req.body;
  db.query(
    'UPDATE anuncios SET titulo=?, resumo=?, conteudo=?, categoria=?, imagem=?, destaque=?, data_publicacao=? WHERE id=?',
    [titulo, resumo, conteudo, categoria, imagem, destaque ? 1 : 0, data_publicacao, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM anuncios WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;
