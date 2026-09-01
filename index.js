const express = require('express');
const { randomUUID } = require('crypto');

const app = express();
app.use(express.json());

const database = [];

// 1. Listagem Geral (GET /users)
app.get('/users', (req, res) => {
  return res.status(200).json({ success: true, data: database });
});

// 2. Busca por ID (GET /users/:id)
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = database.find((item) => item.id === id);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, error: 'Usuário não encontrado.' });
  }

  return res.status(200).json({ success: true, data: user });
});

// 3. Cadastro com Validação (POST /users)
app.post('/users', (req, res) => {
  const { name, email, role } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res
      .status(400)
      .json({
        success: false,
        error: 'O campo "name" é obrigatório e deve ser um texto válido.',
      });
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    return res
      .status(400)
      .json({
        success: false,
        error: 'O campo "email" é obrigatório e deve ser um texto válido.',
      });
  }

  const newUser = {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role || 'user',
    createdAt: new Date().toISOString(),
  };

  database.push(newUser);
  return res.status(201).json({ success: true, data: newUser });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});