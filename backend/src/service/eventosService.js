import repository from '../repository/eventosRepository.js';
import { criarErro } from '../util/tratarErro.js';
import { geocodificar } from './geocodificar.js';

const eventosService = {
  listar: (opcoes) => repository.listar(opcoes),
  buscar: async (id) => {
    const item = await repository.buscarPorId(Number(id));
    if (!item) throw criarErro('Evento não encontrado.', 404);
    return item;
  },
  async criar(body, usuario) {
    const titulo = String(body.titulo ?? '').trim();
    const local = String(body.local ?? '').trim();
    const descricao = String(body.descricao ?? '').trim() || null;
    const dataInicio = body.data_inicio;
    const dataFim = body.data_fim || null;
    const bairroId = Number(body.bairro_id || 1);
    if (!titulo || titulo.length > 120) throw criarErro('Informe um título de até 120 caracteres.');
    if (!local || local.length > 160) throw criarErro('Informe um local de até 160 caracteres.');
    if (!dataInicio || Number.isNaN(Date.parse(dataInicio))) throw criarErro('data_inicio inválida.');
    if (dataFim && (Number.isNaN(Date.parse(dataFim)) || new Date(dataFim) < new Date(dataInicio))) {
      throw criarErro('data_fim não pode ser anterior à data_inicio.');
    }
    const coordenadas = await geocodificar(local);
    const id = await repository.criar({
      usuario_id: usuario.id, bairro_id: bairroId, titulo, descricao, local,
      data_inicio: dataInicio, data_fim: dataFim,
      latitude: coordenadas.latitude, longitude: coordenadas.longitude
    });
    return { id };
  }
};
export default eventosService;
