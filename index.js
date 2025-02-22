const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const sequelize = require('./bd/database');
const fs = require('fs')
const path = require('path');
const DB_Table= require('./bd/tabels')
const bcrypt = require('bcryptjs');
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear o corpo das requisições em JSON
app.use('/uploads', express.static('uploads'));


// Configuração do armazenamento das imagens no servidor
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = './uploads/';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      cb(null, dir); // Diretório de armazenamento
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Defina o nome do arquivo com timestamp
    }
  });

  const upload = multer({ storage: storage });
  
// // Teste de conexão com o banco de dados
// sequelize.authenticate()
//   .then(() => {
//     console.log('Conectado ao banco de dados MySQL');
//   })
//   .catch((err) => {
//     console.error('Erro ao conectar ao banco de dados:', err);
//   });


// fazer as req para login
app.post("/register", async (req, res) => {
  
  try {
    const { nome, email, contacto, password, tipo } = req.body;

    // Verifica se o e-mail já está cadastrado
    const existingUser = await DB_Table.User.findOne({ where: { email:email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado!" });
    }
    
    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário
    const newUser = await DB_Table.User.create({
      nome,
      email,
      contacto,
      password: hashedPassword,
      tipo,
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário!" });
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Buscar usuário pelo e-mail
      const usuario = await DB_Table.User.findOne({ where: { email } });

      if (!usuario) {
          return res.status(400).json({ estado: 'falhou', erro: 'Usuário não encontrado' });
      }

      // Comparar a senha fornecida com o hash armazenado no banco de dados
      const senhaValida = await bcrypt.compare(password, usuario.password);

      if (!senhaValida) {
          return res.status(400).json({ estado: 'falhou', erro: 'Senha incorreta' });
      }

      // Retornar os dados do usuário
      res.json({
          estado: 'sucesso',
          id: usuario.id,
          tipo: usuario.tipo
      });

  } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ estado: 'falhou', erro: 'Erro interno no servidor' });
  }
});

/* sequelize.sync({ force: false }) // Isso força a recriação das tabelas
  .then(() => console.log("Tabelas criadas com sucesso2"))
  .catch(err => console.log("Erro ao criar as tabelas", err));
 */

// Configuração do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
