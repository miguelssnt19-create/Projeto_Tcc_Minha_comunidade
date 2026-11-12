
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { mensagemErro } from "../../services/api";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import Cabecalho from '../../component/cabecalho';


function formatarData(valor) {
  if (!valor) return "Data não informada";

  const data = new Date(String(valor).replace(" ", "T"));

  if (Number.isNaN(data.getTime())) return String(valor);

  return data.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function Evento() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState("");

  const [formulario, setFormulario] = useState({
    titulo: "",
    local: "",
    data_inicio: "",
    data_fim: "",
    descricao: "",
  });

  async function carregarEventos() {
    try {
      const resposta = await api.get("/eventos", {
        params: { bairro_id: 1 },
      });

      setEventos(resposta.data.dados || []);
      setAviso("");
    } catch (erro) {
      setAviso(mensagemErro(erro));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarEventos();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAviso("");
    setEnviando(true);

    try {
      await api.post("/eventos", {
        titulo: formulario.titulo,
        local: formulario.local,
        data_inicio: formulario.data_inicio.replace("T", " "),
        data_fim: formulario.data_fim
          ? formulario.data_fim.replace("T", " ")
          : null,
        descricao: formulario.descricao,
        bairro_id: 1,
      });

      setAviso("Evento cadastrado com sucesso!");

      setFormulario({
        titulo: "",
        local: "",
        data_inicio: "",
        data_fim: "",
        descricao: "",
      });

      await carregarEventos();
    } catch (erro) {
      setAviso(mensagemErro(erro));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="site_evento">
      
      <Cabecalho />

      <main className="pagina-categoria">
        <Link className="voltar" to="/">
          <i className="fa-solid fa-arrow-left"></i> Voltar para o início
        </Link>

        <section className="painel-categoria">
          <div className="icone-pagina">
            <i className="fa-solid fa-calendar"></i>
          </div>

          <h1>Eventos da Comunidade</h1>

          <p>
            Confira atividades, encontros e iniciativas da nossa comunidade.
          </p>

          <div className="conteudo-categoria">
            <h2>Cadastrar novo evento</h2>

            <form className="form-categoria" onSubmit={handleSubmit}>
              <label htmlFor="titulo">Nome do evento</label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                maxLength="120"
                placeholder="Ex.: Festa do Bairro"
                value={formulario.titulo}
                onChange={handleChange}
                required
              />

              <label htmlFor="local">Local do evento</label>
              <input
                id="local"
                name="local"
                type="text"
                maxLength="160"
                placeholder="Rua, número, praça ou endereço completo"
                value={formulario.local}
                onChange={handleChange}
                required
              />

              <label htmlFor="data_inicio">Data e horário de início</label>
              <input
                id="data_inicio"
                name="data_inicio"
                type="datetime-local"
                value={formulario.data_inicio}
                onChange={handleChange}
                required
              />

              <label htmlFor="data_fim">Data e horário de término (opcional)</label>
              <input
                id="data_fim"
                name="data_fim"
                type="datetime-local"
                min={formulario.data_inicio}
                value={formulario.data_fim}
                onChange={handleChange}
              />

              <label htmlFor="descricao">Descrição do evento</label>
              <textarea
                id="descricao"
                name="descricao"
                maxLength="2000"
                placeholder="Conte um pouco sobre o evento..."
                value={formulario.descricao}
                onChange={handleChange}
              />

              <button type="submit" disabled={enviando}>
                <i className="fa-solid fa-calendar-plus"></i>
                {enviando ? "Cadastrando..." : "Cadastrar evento"}
              </button>

              <div
                className="aviso-envio visivel"
                role="status"
                aria-live="polite"
              >
                {aviso}
              </div>

              <p className="nota-demo">
                O evento será enviado para a API e salvo no banco de dados.
              </p>
            </form>
          </div>

          <div className="conteudo-categoria" style={{ marginTop: "25px" }}>
            <h2>Próximos eventos</h2>

            {carregando && <p>Carregando eventos...</p>}

            {!carregando && eventos.length === 0 && (
              <p>Nenhum evento futuro cadastrado no banco de dados.</p>
            )}

            {eventos.map((evento) => (
              <article
                key={evento.id}
                style={{
                  background: "#fff",
                  padding: "16px",
                  borderRadius: "10px",
                  marginTop: "14px",
                  border: "1px solid #dce7e2",
                }}
              >
                <h3 style={{ color: "#073b4c", marginBottom: "8px" }}>
                  {evento.titulo}
                </h3>

                <p><strong>Data:</strong> {formatarData(evento.data_inicio)}</p>
                <p><strong>Local:</strong> {evento.local}</p>

                {evento.descricao && <p>{evento.descricao}</p>}
              </article>
            ))}
          </div>

          <Link className="acao-voltar" to="/">
            Voltar à página inicial
          </Link>
        </section>
      </main>

      <footer>
        <strong>Minha Comunidade</strong>
        <span>|</span>
        <span>Juntos por um bairro melhor!</span>

        <div className="redes">
          <a className="face" href="https://www.facebook.com/?locale=pt_BR" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a className="inst" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a className="you" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}
