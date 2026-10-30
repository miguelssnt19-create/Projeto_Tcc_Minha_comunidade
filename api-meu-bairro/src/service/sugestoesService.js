import repository from '../repository/sugestoesRepository.js';
import { criarErro } from '../util/tratarErro.js';
import { geocodificar } from './geocodificar.js';

function texto(valor, campo, maximo, obrigatorio = false) {
  const resultado = String(valor ?? '').trim();
  if (obrigatorio && !resultado) throw criarErro(`${campo} é obrigatório.`);
  if (resultado.length > maximo) throw criarErro(`${campo} deve ter até ${maximo} caracteres.`);
  return resultado || null;
}
function numeroOpcional(valor, nome, max) {
  if (valor === undefined || valor === null || valor === '') return null;
  const n = Number(valor);
  if (!Number.isFinite(n) || n < 0 || n > max) throw criarErro(`${nome} inválido.`);
  return n;
}
const sugestoesService = {
  listar: (opcoes) => repository.listar(opcoes),
  buscar: async (id) => {
    const item = await repository.buscarPorId(Number(id));
    if (!item) throw criarErro('Sugestão não encontrada.', 404);
    return item;
  },
  async criar(body, usuario) {
    const dados = {
      usuario_id: usuario?.id ?? null,
      bairro_id: Number(body.bairro_id || 1),
      titulo: texto(body.titulo, 'Título', 100, true),
      descricao: texto(body.descricao, 'Descrição', 2000, true),
      localizacao: texto(body.localizacao, 'Localização', 160),
      beneficio: texto(body.beneficio, 'Benefício', 300),
      contato: texto(body.contato, 'Contato', 120),
      mapa_x: numeroOpcional(body.mapa_x, 'mapa_x', 1400),
      mapa_y: numeroOpcional(body.mapa_y, 'mapa_y', 900)
    };
    if (!Number.isInteger(dados.bairro_id) || dados.bairro_id < 1) throw criarErro('bairro_id inválido.');
    const coordenadas = await geocodificar(dados.localizacao);
    dados.latitude = coordenadas.latitude;
    dados.longitude = coordenadas.longitude;
    const id = await repository.criar(dados);
    return { id, status: 'nova' };
  }
};
export default sugestoesService;
