import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { mensagemErro } from "../../services/api";
import "./index.css";

export default function Cadastro() {
  const [formulario, setFormulario] = useState({ nome: "", email: "", senha: "", confirmarSenha: "" });
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navegar = useNavigate();
  const alterar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });
  async function enviar(e) {
    e.preventDefault(); setAviso("");
    if (formulario.senha !== formulario.confirmarSenha) { setAviso("As senhas não conferem."); return; }
    setEnviando(true);
    try {
      const resposta = await api.post("/auth/cadastro", formulario);
      localStorage.setItem("minhaComunidadeToken", resposta.data.token);
      localStorage.setItem("minhaComunidadeUsuario", JSON.stringify(resposta.data.usuario));
      navegar("/");
    } catch (erro) { setAviso(mensagemErro(erro)); }
    finally { setEnviando(false); }
  }
  return <div className="site_cada"><div className="cadastro">
    <h1>Criar sua conta</h1><p>Preencha seus dados para continuar</p>
    <form onSubmit={enviar}>
      <label htmlFor="nome">Nome</label><input id="nome" name="nome" type="text" placeholder="Digite seu nome" value={formulario.nome} onChange={alterar} required minLength="2" maxLength="100" />
      <label htmlFor="email">E-mail</label><input id="email" name="email" type="email" placeholder="Digite seu e-mail" value={formulario.email} onChange={alterar} required maxLength="160" />
      <label htmlFor="senha">Senha</label><input id="senha" name="senha" type="password" placeholder="Crie uma senha (mínimo 8 caracteres)" value={formulario.senha} onChange={alterar} required minLength="8" maxLength="72" />
      <label htmlFor="confirmarSenha">Confirmar senha</label><input id="confirmarSenha" name="confirmarSenha" type="password" placeholder="Confirme sua senha" value={formulario.confirmarSenha} onChange={alterar} required minLength="8" maxLength="72" />
      <button type="submit" disabled={enviando}>{enviando ? "Cadastrando..." : "Cadastrar"}</button>
    </form>
    {aviso && <p role="alert" style={{ color: "#b42318", marginTop: "12px" }}>{aviso}</p>}
    <p className="final">Já possui uma conta? <Link to="/entrar">Entrar</Link></p>
  </div></div>;
}
