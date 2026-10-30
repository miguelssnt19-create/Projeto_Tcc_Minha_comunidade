import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { mensagemErro } from "../../services/api";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

function formatarData(valor) {
  if (!valor) return "Data não informada";
  const data = new Date(String(valor).replace(" ", "T"));
  if (Number.isNaN(data.getTime())) return String(valor);
  return data.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export default function Evento() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    let ativo = true;
    api.get("/eventos", { params: { bairro_id: 1 } })
      .then((resposta) => { if (ativo) setEventos(resposta.data.dados || []); })
      .catch((erro) => { if (ativo) setAviso(mensagemErro(erro)); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, []);

  return (
    <div className="site_evento">
      <header>
        <div className="logo"><i className="fa-solid fa-tree"></i><div><h2>Minha Comunidade</h2></div></div>
        <nav>
          <Link to="/">Início</Link><Link to="/problemas">Problemas</Link><Link to="/sugestoes">Sugestões</Link><Link to="/evento">Eventos</Link><Link to="/mapa">Mapa</Link><Link to="/#sobre">Sobre</Link>
        </nav>
        <div className="acoes"><Link to="/entrar"><button type="button">Entrar</button></Link><Link to="/cadastrar"><button type="button" className="cadastrar">Cadastrar</button></Link></div>
      </header>
      <main className="pagina-categoria">
        <Link className="voltar" to="/"><i className="fa-solid fa-arrow-left"></i> Voltar para o início</Link>
        <section className="painel-categoria">
          <div className="icone-pagina"><i className="fa-solid fa-calendar"></i></div>
          <h1>Eventos da Comunidade</h1>
          <p>Confira atividades, encontros e iniciativas da nossa comunidade.</p>
          <div className="conteudo-categoria">
            <h2>Próximos eventos</h2>
            {carregando && <p>Carregando eventos...</p>}
            {!carregando && aviso && <p role="alert">{aviso}</p>}
            {!carregando && !aviso && eventos.length === 0 && <p>Nenhum evento futuro cadastrado no banco de dados.</p>}
            {eventos.map((evento) => (
              <article key={evento.id} style={{ background: "#fff", padding: "16px", borderRadius: "10px", marginTop: "14px", border: "1px solid #dce7e2" }}>
                <h3 style={{ color: "#073b4c", marginBottom: "8px" }}>{evento.titulo}</h3>
                <p><strong>Data:</strong> {formatarData(evento.data_inicio)}</p>
                <p><strong>Local:</strong> {evento.local}</p>
                {evento.descricao && <p>{evento.descricao}</p>}
              </article>
            ))}
          </div>
          <Link className="acao-voltar" to="/">Voltar à página inicial</Link>
        </section>
      </main>
      <footer><strong>Minha Comunidade</strong><span>|</span><span>Juntos por um bairro melhor!</span><div className="redes"><a className="face" href="https://www.facebook.com/?locale=pt_BR" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a><a className="inst" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a><a className="you" href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-youtube"></i></a></div></footer>
    </div>
  );
}
