import { Router } from 'express';
import service from '../service/sugestoesService.js';
import { executar } from '../util/tratarErro.js';
import { usuarioOpcional } from '../middleware/autenticacao.js';

const router = Router();
router.get('/', executar(async (req, res) => {
  const dados = await service.listar({
    bairroId: Number(req.query.bairro_id || 1),
    todas: req.query.todas === '1'
  });
  res.json({ dados });
}));
router.get('/:id', executar(async (req, res) => res.json(await service.buscar(req.params.id))));
router.post('/', usuarioOpcional, executar(async (req, res) => {
  const resultado = await service.criar(req.body || {}, req.usuario);
  res.status(201).json(resultado);
}));
export default router;
