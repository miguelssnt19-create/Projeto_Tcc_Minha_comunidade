import { useState } from "react";
import api, { mensagemErro } from "../../services/api";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

export default  function Sugestoes() {
  const [formulario, setFormulario] = useState({
    titulo: "",
    localizacao: "",
    descricao: "",
    beneficio: "",
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
      await api.post("/sugestoes", {
        titulo: formulario.titulo,
        localizacao: formulario.localizacao || null,
        descricao: formulario.descricao,
        beneficio: formulario.beneficio || null,
        contato: formulario.contato || null,
        bairro_id: 1,
      });
      setAviso("Sugestão enviada com sucesso e salva no banco de dados!");
      setFormulario({ titulo: "", localizacao: "", descricao: "", beneficio: "", contato: "" });
    } catch (erro) {
      setAviso(mensagemErro(erro));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="pag-sugestoes">

      
      <header>
        <div className="logo">
          <i className="fa-solid fa-tree"></i>

          <div>
            <h2>Minha Comunidade</h2>
          </div>
        </div>

        <nav>
          <Link to="/">Início</Link>

          <Link to="/problemas">
            Problemas
          </Link>

          <Link to="/sugestoes">
            Sugestões
          </Link>

          <Link to="/evento">
            Eventos
          </Link>

          <Link to="/mapa">
            Mapa
          </Link>

          <Link to="/#sobre">
            Sobre
          </Link>
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
            <i className="fa-solid fa-lightbulb"></i>
          </div>

          <h1>
            Sugerir Melhorias
          </h1>

          <p>
            Compartilhe ideias para tornar nossa comunidade ainda melhor.
          </p>

          <div className="conteudo-categoria">

            <form
              className="form-categoria"
              onSubmit={handleSubmit}
            >

              
              <label htmlFor="titulo">
                Título da sugestão
              </label>

              <input
                id="titulo"
                name="titulo"
                type="text"
                maxLength="100"
                placeholder="Ex.: Instalar mais lixeiras na praça"
                value={formulario.titulo}
                onChange={handleChange}
                required
              />

              
              <label htmlFor="localizacao">
                Localização (opcional)
              </label>

              <input
                id="localizacao"
                name="localizacao"
                type="text"
                maxLength="160"
                placeholder="Rua, número ou ponto de referência"
                value={formulario.localizacao}
                onChange={handleChange}
              />

              
              <label htmlFor="descricao">
                Descreva sua ideia
              </label>

              <textarea
                id="descricao"
                name="descricao"
                maxLength="2000"
                placeholder="Explique sua proposta e como ela pode ajudar o bairro..."
                value={formulario.descricao}
                onChange={handleChange}
                required
              ></textarea>

              
              <label htmlFor="beneficio">
                Benefício para a comunidade (opcional)
              </label>

              <input
                id="beneficio"
                name="beneficio"
                type="text"
                maxLength="300"
                placeholder="Quem seria beneficiado?"
                value={formulario.beneficio}
                onChange={handleChange}
              />

              
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
                {enviando ? "Enviando..." : "Enviar sugestão"}
              </button>

              
              <p className="nota-demo">
                Sua sugestão será enviada para a API e salva no banco de dados. Se informar o local, ela poderá aparecer no mapa quando o endereço for encontrado.
              </p>

              
              <div
                aria-live="polite"
                className={`aviso-envio ${
                  aviso ? "visivel" : ""
                }`}
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

