import db from './connection.js';

const mapaRepository = {
  async bairros() {
    const [dados] = await db.query('SELECT id, nome, cidade, uf FROM bairros ORDER BY nome');
    return dados;
  },
  async buscarBairro(id) {
    const [dados] = await db.query('SELECT id, nome, cidade, uf FROM bairros WHERE id = ?', [id]);
    return dados[0];
  },
  async locais(bairroId) {
    const [dados] = await db.query(`SELECT id, nome, subtitulo, tipo, mapa_x AS x, mapa_y AS y FROM locais_importantes WHERE bairro_id = ?`, [bairroId]);
    return dados;
  },
  async problemasNoMapa(bairroId) {
    const [dados] = await db.query(`SELECT id, titulo, localizacao, descricao, status, latitude, longitude, criado_em FROM problemas WHERE bairro_id = ? AND latitude IS NOT NULL AND longitude IS NOT NULL AND status NOT IN ('rejeitado','resolvido')`, [bairroId]);
    return dados;
  },
  async sugestoesNoMapa(bairroId) {
    const [dados] = await db.query(`SELECT id, titulo, localizacao, descricao, status, latitude, longitude, criado_em FROM sugestoes WHERE bairro_id = ? AND latitude IS NOT NULL AND longitude IS NOT NULL AND status <> 'rejeitada'`, [bairroId]);
    return dados;
  },
  async eventosNoMapa(bairroId) {
    const [dados] = await db.query(`SELECT id, titulo, local, descricao, data_inicio, latitude, longitude FROM eventos WHERE bairro_id = ? AND latitude IS NOT NULL AND longitude IS NOT NULL AND COALESCE(data_fim, data_inicio) >= NOW()`, [bairroId]);
    return dados;
  },
  async ultimosRelatos(bairroId, limite) {
    const [dados] = await db.query(`
      SELECT * FROM (
        SELECT 'problema' AS tipo, id, titulo, localizacao AS local, criado_em FROM problemas WHERE bairro_id = ? AND status <> 'rejeitado'
        UNION ALL
        SELECT 'sugestao' AS tipo, id, titulo, localizacao AS local, criado_em FROM sugestoes WHERE bairro_id = ? AND status <> 'rejeitada'
        UNION ALL
        SELECT 'evento' AS tipo, id, titulo, local, criado_em FROM eventos WHERE bairro_id = ?
      ) AS relatos ORDER BY criado_em DESC LIMIT ?`, [bairroId, bairroId, bairroId, limite]);
    return dados;
  }
};
export default mapaRepository;
