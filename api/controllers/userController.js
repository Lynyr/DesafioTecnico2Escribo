const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Simulação de banco de dados
let users = [];

const createUser = async (req, res) => {
  try {
    const { nome, email, senha, telefones } = req.body;

    // Verifica se o email já está em uso
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criação do usuário simulado
    const user = {
      id: users.length + 1,
      nome,
      email,
      senha: hashedPassword,
      telefones,
      createdAt: new Date(),
      updatedAt: new Date(),
      ultimo_login: new Date(),
    };

    // Adiciona o usuário ao array simulado
    users.push(user);

    // Geração do token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Resposta ao cliente
    res.status(201).json({
      id: user.id,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.createdAt, // Primeiro login é igual a data de criação
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca do usuário simulado pelo email
    const user = users.find(user => user.email === email);

    // Verifica se o usuário existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificação da senha
    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Geração do token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Atualização da última data de login
    user.ultimo_login = new Date();

    // Resposta ao cliente
    res.json({
      id: user.id,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.ultimo_login,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = users.find(user => user.id === req.userId);

    // Verifica se o usuário existe
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Resposta ao cliente
    res.json({
      id: user.id,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.ultimo_login,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

module.exports = { createUser, loginUser, getUserInfo };
