import db from './connection.js';

const eventosRepository = {
  async listar({ bairroId = 1, todos = false } = {}) {
    const condicaoData = todos ? '' : ' AND COALESCE(data_fim, data_inicio) >= NOW()';
    const [dados] = await db.query(
      `SELECT id, usuario_id, bairro_id, titulo, descricao, local, data_inicio, data_fim, latitude, longitude, criado_em
       FROM eventos WHERE bairro_id = ?${condicaoData} ORDER BY data_inicio ASC`, [bairroId]);
    return dados;
  },
  async buscarPorId(id) {
    const [dados] = await db.query('SELECT * FROM eventos WHERE id = ?', [id]);
    return dados[0];
  },
  async criar(dados) {
    const [resultado] = await db.query(
      `INSERT INTO eventos (usuario_id, bairro_id, titulo, descricao, local, data_inicio, data_fim, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dados.usuario_id, dados.bairro_id, dados.titulo, dados.descricao, dados.local,
       dados.data_inicio, dados.data_fim, dados.latitude, dados.longitude]);
    return resultado.insertId;
  }
};
export default eventosRepository;
