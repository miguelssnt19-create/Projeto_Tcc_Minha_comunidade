import { Router } from 'express';
import service from '../service/usuariosService.js';
import { executar } from '../util/tratarErro.js';

const router = Router();
router.post('/cadastro', executar(async (req, res) => res.status(201).json(await service.cadastrar(req.body || {}))));
router.post('/login', executar(async (req, res) => res.json(await service.entrar(req.body || {}))));
export default router;
