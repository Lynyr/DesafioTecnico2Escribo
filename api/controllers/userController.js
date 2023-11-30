const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const { nome, email, senha, telefones } = req.body;

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criação do usuário
    const user = await User.create({
      nome,
      email,
      senha: hashedPassword,
      telefones,
    });

    // Geração do token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });

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

    // Busca do usuário pelo email
    const user = await User.findOne({ where: { email } });

    // Verificação da senha
    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      return res.status(401).json({ error: 'Usuário e/ou senha inválidos' });
    }

    // Geração do token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });

    // Atualização da última data de login
    user.update({ ultimo_login: new Date() });

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
    const user = await User.findByPk(req.userId);

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
