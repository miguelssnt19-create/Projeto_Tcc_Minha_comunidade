import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import repository from '../repository/usuariosRepository.js';
import { criarErro } from '../util/tratarErro.js';

function token(usuario) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 16) {
    throw Object.assign(new Error('Configure JWT_SECRET no arquivo .env (mínimo 16 caracteres).'), { status: 500 });
  }
  return jwt.sign({ id: usuario.id, nome: usuario.nome, papel: usuario.papel },
    process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRA_EM || '7d' });
}
const usuariosService = {
  async cadastrar(body) {
    const nome = String(body.nome ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const senha = String(body.senha ?? '');
    if (nome.length < 2 || nome.length > 100) throw criarErro('Nome deve ter entre 2 e 100 caracteres.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) throw criarErro('E-mail inválido.');
    if (senha.length < 8 || senha.length > 72) throw criarErro('A senha deve ter entre 8 e 72 caracteres.');
    if (body.confirmarSenha !== undefined && body.confirmarSenha !== senha) throw criarErro('As senhas não conferem.');
    if (await repository.buscarPorEmail(email)) throw criarErro('Este e-mail já está cadastrado.', 409);
    const senhaHash = await bcrypt.hash(senha, 10);
    const id = await repository.criar({ nome, email, senhaHash });
    const usuario = { id, nome, email, papel: 'morador' };
    return { usuario, token: token(usuario) };
  },
  async entrar(body) {
    const email = String(body.email ?? '').trim().toLowerCase();
    const senha = String(body.senha ?? '');
    const encontrado = await repository.buscarPorEmail(email);
    if (!encontrado || !(await bcrypt.compare(senha, encontrado.senha_hash))) {
      throw criarErro('E-mail ou senha inválidos.', 401);
    }
    const usuario = { id: encontrado.id, nome: encontrado.nome, email: encontrado.email, papel: encontrado.papel };
    return { usuario, token: token(usuario) };
  }
};
export default usuariosService;
