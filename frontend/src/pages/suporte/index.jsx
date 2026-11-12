import { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cabecalho from "../../component/cabecalho";
import "./index.css";


const WHATSAPP_SUPORTE = "5511914157243";

export default function Suporte() {
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    assunto: "Problema no funcionamento do site",
    descricao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mensagem = [
      "Olá! Gostaria de informar um problema no site Minha Comunidade.",
      "",
      `Nome: ${formulario.nome}`,
      `E-mail: ${formulario.email || "Não informado"}`,
      `Assunto: ${formulario.assunto}`,
      "",
      "Descrição do problema:",
      formulario.descricao,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_SUPORTE}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pag-suporte">
      <Cabecalho />

      <main className="pagina-suporte">

        <Link className="suporte-voltar" to="/sobre">
          <i className="fa-solid fa-arrow-left"></i>
          Voltar para Sobre Nós
        </Link>

        <section className="painel-suporte">

          <div className="suporte-icone">
            <i className="fa-brands fa-whatsapp"></i>
          </div>

          <h1>Fale com o Suporte</h1>

          <p className="suporte-intro">
            Encontrou algum erro ou dificuldade ao utilizar o
            Minha Comunidade? Conte para nossa equipe. Sua
            mensagem será encaminhada pelo WhatsApp.
          </p>

          <form
            className="form-suporte"
            onSubmit={handleSubmit}
          >

            <label htmlFor="nome-suporte">
              Seu nome
            </label>

            <input
              id="nome-suporte"
              name="nome"
              type="text"
              placeholder="Digite seu nome"
              maxLength="100"
              value={formulario.nome}
              onChange={handleChange}
              required
            />

            <label htmlFor="email-suporte">
              E-mail (opcional)
            </label>

            <input
              id="email-suporte"
              name="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              maxLength="120"
              value={formulario.email}
              onChange={handleChange}
            />

            <label htmlFor="assunto-suporte">
              Qual é o problema?
            </label>

            <select
              id="assunto-suporte"
              name="assunto"
              value={formulario.assunto}
              onChange={handleChange}
            >
              <option>
                Problema no funcionamento do site
              </option>

              <option>
                Erro ao fazer cadastro ou entrar
              </option>

              <option>
                Problema ao enviar uma denúncia
              </option>

              <option>
                Problema ao enviar uma sugestão
              </option>

              <option>
                Erro no mapa ou nos eventos
              </option>

              <option>
                Outro assunto
              </option>
            </select>

            <label htmlFor="descricao-suporte">
              Descreva o que aconteceu
            </label>

            <textarea
              id="descricao-suporte"
              name="descricao"
              placeholder="Explique o problema e, se possível, diga em qual página ele aconteceu..."
              maxLength="2000"
              value={formulario.descricao}
              onChange={handleChange}
              required
            />

            <button type="submit">
              <i className="fa-brands fa-whatsapp"></i>
              Enviar pelo WhatsApp
            </button>

            <p className="aviso-suporte">
              Ao clicar, o WhatsApp será aberto com sua
              mensagem preenchida. Confira as informações
              e toque em enviar para concluir o contato.
            </p>

          </form>
        </section>
      </main>

      <footer className="rodape-suporte">
        <strong>Minha Comunidade</strong>
        <span>|</span>
        <span>Juntos por um bairro melhor!</span>
      </footer>

    </div>
  );
}