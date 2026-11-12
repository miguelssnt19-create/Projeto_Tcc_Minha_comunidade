import db from './connection.js';

const usuariosRepository = {
  async buscarPorEmail(email) {
    const [dados] = await db.query(
      'SELECT id, nome, email, senha_hash, papel FROM usuarios WHERE email = ?', [email]);
    return dados[0];
  },
  async criar({ nome, email, senhaHash }) {
    const [resultado] = await db.query(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)', [nome, email, senhaHash]);
    return resultado.insertId;
  }
};
export default usuariosRepository;
