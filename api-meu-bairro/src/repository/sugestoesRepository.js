import db from './connection.js';

const colunasPublicas = `id, usuario_id, bairro_id, titulo, descricao, localizacao, beneficio,
  contato, latitude, longitude, mapa_x, mapa_y, status, criado_em, atualizado_em`;

const sugestoesRepository = {
  async listar({ bairroId = 1, todas = false } = {}) {
    const condicaoStatus = todas ? '' : " AND status <> 'rejeitada'";
    const [dados] = await db.query(`SELECT ${colunasPublicas} FROM sugestoes WHERE bairro_id = ?${condicaoStatus} ORDER BY criado_em DESC`, [bairroId]);
    return dados;
  },
  async buscarPorId(id) {
    const [dados] = await db.query(`SELECT ${colunasPublicas} FROM sugestoes WHERE id = ?`, [id]);
    return dados[0];
  },
  async criar(dados) {
    const [resultado] = await db.query(
      `INSERT INTO sugestoes (usuario_id, bairro_id, titulo, descricao, localizacao, beneficio, contato, mapa_x, mapa_y, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dados.usuario_id, dados.bairro_id, dados.titulo, dados.descricao, dados.localizacao, dados.beneficio,
       dados.contato, dados.mapa_x, dados.mapa_y, dados.latitude, dados.longitude]
    );
    return resultado.insertId;
  }
};
export default sugestoesRepository;
