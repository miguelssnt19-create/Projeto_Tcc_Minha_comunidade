import repository from '../repository/mapaRepository.js';
import { criarErro } from '../util/tratarErro.js';

const mapaService = {
  bairros: () => repository.bairros(),
  async mapa(bairroId = 1) {
    const id = Number(bairroId);
    if (!Number.isInteger(id) || id < 1) throw criarErro('bairro_id inválido.');
    const bairro = await repository.buscarBairro(id);
    if (!bairro) throw criarErro('Bairro não encontrado.', 404);
    const [locais, problemas, sugestoes, eventos] = await Promise.all([
      repository.locais(id), repository.problemasNoMapa(id), repository.sugestoesNoMapa(id), repository.eventosNoMapa(id)
    ]);
    return { bairro, locais, problemas, sugestoes, eventos };
  },
  ultimosRelatos: (bairroId = 1, limite = 10) =>
    repository.ultimosRelatos(Number(bairroId), Math.max(1, Math.min(Number(limite) || 10, 50)))
};
export default mapaService;
