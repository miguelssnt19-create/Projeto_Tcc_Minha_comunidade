import { Router } from 'express';
import service from '../service/mapaService.js';
import { executar } from '../util/tratarErro.js';

const router = Router();
router.get('/bairros', executar(async (_req, res) => res.json(await service.bairros())));
router.get('/mapa', executar(async (req, res) => res.json(await service.mapa(req.query.bairro_id || 1))));
router.get('/relatos', executar(async (req, res) => {
  res.json(await service.ultimosRelatos(req.query.bairro_id || 1, req.query.limite || 10));
}));
export default router;
