import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import endpoints from './routes.js';
import { tratarErro } from './util/tratarErro.js';
import { testarConexao } from './repository/connection.js';

const api = express();
api.use(cors({ origin: true }));
api.use(express.json());

api.get('/api/saude', async (_req, res, next) => {
  try {
    await testarConexao();
    res.json({ ok: true, mensagem: 'API e banco conectados.' });
  } catch (erro) {
    next(erro);
  }
});

api.use('/api', endpoints);
api.use((_req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));
api.use(tratarErro);

const porta = Number(process.env.PORT) || 5000;
api.listen(porta, () => console.log(`Minha Comunidade API rodando em http://localhost:${porta}`));
