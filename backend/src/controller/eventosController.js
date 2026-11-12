import { Router } from 'express';
import service from '../service/eventosService.js';
import { executar } from '../util/tratarErro.js';
import { usuarioObrigatorio } from '../middleware/autenticacao.js';

const router = Router();
router.get('/', executar(async (req, res) => {
  const dados = await service.listar({
    bairroId: Number(req.query.bairro_id || 1),
    todos: req.query.todos === '1'
  });
  res.json({ dados });
}));
router.get('/:id', executar(async (req, res) => res.json(await service.buscar(req.params.id))));
router.post('/', usuarioObrigatorio, executar(async (req, res) => {
  res.status(201).json(await service.criar(req.body || {}, req.usuario));
}));
export default router;
