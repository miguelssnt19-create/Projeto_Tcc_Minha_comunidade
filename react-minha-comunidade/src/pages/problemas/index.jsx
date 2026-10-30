import { useState } from "react";
import api, { mensagemErro } from "../../services/api";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

export default function Problemas() {
  const [formulario, setFormulario] = useState({
    titulo: "",
    local: "",
    descricao: "",
    contato: "",
  });

  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAviso("");
    setEnviando(true);
    try {
      await api.post("/problemas", {
        titulo: formulario.titulo,
        localizacao: formulario.local,
        descricao: formulario.descricao,
        contato: formulario.contato || null,
        bairro_id: 1,
      });
      setAviso("Problema enviado com sucesso e salvo no banco de dados!");
      setFormulario({ titulo: "", local: "", descricao: "", contato: "" });
    } catch (erro) {
      setAviso(mensagemErro(erro));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="pag-problemas">

      
      <header>
        <div className="logo">
          <i className="fa-solid fa-tree"></i>

          <div>
            <h2>Minha Comunidade</h2>
          </div>
        </div>

        <nav>
          <Link to="/">Início</Link>
          <Link to="/problemas">Problemas</Link>
          <Link to="/sugestoes">Sugestões</Link>
          <Link to="/evento">Eventos</Link>
          <Link to="/mapa">Mapa</Link>
          <Link to="/#sobre">Sobre</Link>
        </nav>

        <div className="acoes">
          <Link to="/entrar">
            <button type="button">
              Entrar
            </button>
          </Link>

          <Link to="/cadastrar">
            <button
              type="button"
              className="cadastrar"
            >
              Cadastrar
            </button>
          </Link>
        </div>
      </header>

      
      <main className="pagina-categoria">

        <Link className="voltar" to="/">
          <i className="fa-solid fa-arrow-left"></i>
          Voltar para o início
        </Link>

        <section className="painel-categoria">

          <div className="icone-pagina">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>

          <h1>Reportar Problema</h1>

          <p>
            Ajude a identificar situações que precisam de atenção no bairro.
          </p>

          <div className="conteudo-categoria">

            <form
              className="form-categoria"
              onSubmit={handleSubmit}
            >

              
              <label htmlFor="titulo">
                Título do problema
              </label>

              <input
                id="titulo"
                name="titulo"
                type="text"
                maxLength="100"
                placeholder="Ex.: Buraco na rua"
                value={formulario.titulo}
                onChange={handleChange}
                required
              />

              
              <label htmlFor="local">
                Localização
              </label>

              <input
                id="local"
                name="local"
                type="text"
                maxLength="160"
                placeholder="Rua, número ou ponto de referência"
                value={formulario.local}
                onChange={handleChange}
                required
              />

              
              <label htmlFor="descricao">
                Descreva o problema
              </label>

              <textarea
                id="descricao"
                name="descricao"
                maxLength="2000"
                placeholder="Conte o que aconteceu e desde quando..."
                value={formulario.descricao}
                onChange={handleChange}
                required
              ></textarea>

              
              <label htmlFor="contato">
                Contato (opcional)
              </label>

              <input
                id="contato"
                name="contato"
                type="text"
                maxLength="120"
                placeholder="E-mail ou telefone"
                value={formulario.contato}
                onChange={handleChange}
              />

              
              <button type="submit" disabled={enviando}>
                <i className="fa-solid fa-paper-plane"></i>
                {enviando ? "Enviando..." : "Enviar problema"}
              </button>

              
              <p className="nota-demo">
                Seu relato será enviado para a API e salvo no banco de dados do projeto.
              </p>

              
              <div
                className={`aviso-envio ${
                  aviso ? "visivel" : ""
                }`}
                aria-live="polite"
                role="status"
              >
                {aviso}
              </div>

            </form>

          </div>

          <Link
            className="acao-voltar"
            to="/"
          >
            Voltar à página inicial
          </Link>

        </section>

      </main>

      
      <footer>

        <strong>
          Minha Comunidade
        </strong>

        <span>|</span>

        <span>
          Juntos por um bairro melhor!
        </span>

        <div className="redes">

          <a
            className="face"
            href="https://www.facebook.com/?locale=pt_BR"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>

          <a
            className="inst"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>

          <a
            className="you"
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>

        </div>

      </footer>

    </div>
  );
}

