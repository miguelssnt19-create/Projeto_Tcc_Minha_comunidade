import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { mensagemErro } from "../../services/api";
import "./index.css";

export default function Entrar() {
  const [formulario, setFormulario] = useState({ email: "", senha: "" });
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);
  const navegar = useNavigate();
  const alterar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });
  async function enviar(e) {
    e.preventDefault(); setAviso(""); setEnviando(true);
    try {
      const resposta = await api.post("/auth/login", formulario);
      localStorage.setItem("minhaComunidadeToken", resposta.data.token);
      localStorage.setItem("minhaComunidadeUsuario", JSON.stringify(resposta.data.usuario));
      navegar("/");
    } catch (erro) { setAviso(mensagemErro(erro)); }
    finally { setEnviando(false); }
  }
  return <div className="site_ent"><div className="login">
    <h1>Entrar</h1>
    <form onSubmit={enviar}>
      <label htmlFor="email">E-mail</label><input id="email" name="email" type="email" placeholder="Digite seu e-mail" value={formulario.email} onChange={alterar} required />
      <label htmlFor="senha">Senha</label><input id="senha" name="senha" type="password" placeholder="Digite sua senha" value={formulario.senha} onChange={alterar} required />
      <button type="submit" disabled={enviando}>{enviando ? "Entrando..." : "Entrar"}</button>
    </form>
    {aviso && <p role="alert" style={{ color: "#b42318", marginTop: "12px" }}>{aviso}</p>}
    <p>Não tem uma conta? <Link to="/cadastrar">Criar conta</Link></p>
  </div></div>;
}
