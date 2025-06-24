// server/index.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const anunciosRoutes = require("./routes/anuncios");

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "site_anuncios"
});

connection.connect(err => {
  if (err) {
    console.error("Erro ao conectar no banco:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

app.use("/api/anuncios", (req, res, next) => {
  req.connection = connection;
  next();
}, anunciosRoutes);

app.listen(3001, () => {
  console.log("API rodando em http://localhost:3001");
});
