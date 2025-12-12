// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000; // <-- OBRIGATÓRIO NO RENDER

// middlewares
app.use(cors());
app.use(bodyParser.json());

// carrega pets.json
const pets = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'pets.json'), 'utf8')
);

// base de usuários mock
let USERS = [];

// helper token simples
function makeToken(email){
  return Buffer.from(email + '::token').toString('base64');
}

// register
app.post('/auth/register', (req,res) => {
  const { name, email, password } = req.body;
  if(!email || !password)
    return res.status(400).json({ error:"Email e senha required" });

  if(USERS.find(u => u.email === email))
    return res.status(409).json({ error:"Usuário já existe" });

  const user = { id: USERS.length+1, name, email, password };
  USERS.push(user);

  res.json({ token: makeToken(email), user });
});

// login
app.post('/auth/login', (req,res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);

  if(!user)
    return res.status(401).json({ error:"Credenciais inválidas" });

  res.json({ token: makeToken(email), user });
});

// pets
app.get('/pets', (req,res) => {
  res.json(pets);
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
