const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importando o CORS

const app = express();
const port = 3000;

// Adiciona o middleware CORS para permitir requisições de qualquer origem
app.use(cors());

// Middleware para tratar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // seu usuário do MySQL
  password: "", // sua senha do MySQL
  database: "sistema_login",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados: ", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
});

// Rota para cadastro de usuários
app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;

  // Verificar se o e-mail já está cadastrado
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao verificar o e-mail");
    }

    if (results.length > 0) {
      return res.status(400).send("E-mail já cadastrado");
    }

    // Criptografar a senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send("Erro ao criptografar a senha");
      }

      // Inserir o novo usuário no banco de dados
      const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
      db.query(sql, [nome, email, hashedPassword], (err) => {
        if (err) {
          return res.status(500).send("Erro ao cadastrar o usuário");
        }
        return res.status(200).send("Cadastro realizado com sucesso!");
      });
    });
  });
});

// Rota para login de usuários
// Rota de login
app.post("/login", (req, res) => {
  console.log(req.body); // Veja o que está sendo enviado pelo frontend
  const { email, senha } = req.body;
  // Lógica para validação de credenciais



  // Buscar o usuário no banco de dados pelo e-mail
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao verificar o e-mail");
    }

    // Verificar se o usuário existe
    if (results.length === 0) {
      return res.status(401).json({ status: 'error', message: 'E-mail não encontrado.' });
    }

    // Verificar se a senha fornecida corresponde à senha armazenada
    const usuarios = results[0]; // O primeiro resultado (deve ser único)
    
    bcrypt.compare(senha, usuarios.senha, (err, isMatch) => {
      if (err) {
        return res.status(500).send("Erro ao verificar a senha");
      }

      if (isMatch) {
        // Senha correta, login bem-sucedido
        return res.json({ status: 'success', message: 'Login bem-sucedido!' });
      } else {
        // Senha incorreta
        return res.status(401).json({ status: 'error', message: 'Credenciais inválidas.' });
      }
    });
  });
});
 
// Rota para exibir todos os usuários cadastrados
app.get("/usuarios", (req, res) => {
  db.query("SELECT id, nome, email FROM usuarios", (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao recuperar os usuários");
    }

    res.json({ usuarios: results });
  });
});





app.post("/clientes", (req, res) => {
  const { nome, email, telefone, cidade, checkin, pessoas } = req.body;

  // SQL para inserir a reserva na tabela clientes
  const sql = "INSERT INTO clientes (nome, email, telefone, cidade, dia, pessoas) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [nome, email, telefone, cidade, checkin, pessoas], (err, results) => {
    if (err) {
      console.error("Erro ao inserir reserva:", err);
      return res.status(500).json({ status: 'error', message: 'Erro ao salvar a reserva' });
    }
    res.json({ status: 'success', message: 'Reserva realizada com sucesso!' });
  });
});


// Rota para exibir todos os usuários cadastrados
app.get("/reservas", (req, res) => {
  db.query("SELECT id, nome, email, telefone, cidade, dia, pessoas FROM clientes", (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao recuperar os usuários");
    }

    res.json({ clientes: results });
  });
});


  



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
