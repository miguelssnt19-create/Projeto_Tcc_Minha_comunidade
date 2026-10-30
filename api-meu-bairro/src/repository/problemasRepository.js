import db from './connection.js';

const colunasPublicas = `id, usuario_id, bairro_id, titulo, localizacao, descricao,
  contato, latitude, longitude, mapa_x, mapa_y, status, criado_em, atualizado_em`;

const problemasRepository = {
  async listar({ bairroId = 1, todos = false } = {}) {
    const condicaoStatus = todos ? '' : " AND status <> 'rejeitado'";
    const [dados] = await db.query(`SELECT ${colunasPublicas} FROM problemas WHERE bairro_id = ?${condicaoStatus} ORDER BY criado_em DESC`, [bairroId]);
    return dados;
  },
  async buscarPorId(id) {
    const [dados] = await db.query(`SELECT ${colunasPublicas} FROM problemas WHERE id = ?`, [id]);
    return dados[0];
  },
  async criar(dados) {
    const [resultado] = await db.query(
      `INSERT INTO problemas (usuario_id, bairro_id, titulo, localizacao, descricao, contato, mapa_x, mapa_y, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dados.usuario_id, dados.bairro_id, dados.titulo, dados.localizacao, dados.descricao, dados.contato,
       dados.mapa_x, dados.mapa_y, dados.latitude, dados.longitude]
    );
    return resultado.insertId;
  }
};
export default problemasRepository;
