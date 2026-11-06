import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api, { mensagemErro } from "../../services/api";
import "./index.css";
import Cabecalho from '../../component/cabecalho';

function ConectarMapa({ mapaRef }) {
  const mapa = useMap();
  useEffect(() => { mapaRef.current = mapa; }, [mapa, mapaRef]);
  return null;
}

const iconeProblema = divIcon({ className: "marcador-personalizado", html: '<div class="pin-mapa pin-problema"><i class="fa-solid fa-triangle-exclamation"></i></div>', iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -32] });
const iconeSugestao = divIcon({ className: "marcador-personalizado", html: '<div class="pin-mapa pin-sugestao"><i class="fa-solid fa-lightbulb"></i></div>', iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -32] });
const iconeEvento = divIcon({ className: "marcador-personalizado", html: '<div class="pin-mapa pin-evento"><i class="fa-regular fa-calendar"></i></div>', iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -32] });
const centro = [-23.5505, -46.6333];

function temCoordenadas(item) {
  return item.latitude !== null && item.latitude !== undefined && item.longitude !== null && item.longitude !== undefined &&
    Number.isFinite(Number(item.latitude)) && Number.isFinite(Number(item.longitude)) &&
    Math.abs(Number(item.latitude)) <= 90 && Math.abs(Number(item.longitude)) <= 180;
}

export default function Mapa() {
  const mapaRef = useRef(null);
  const [dados, setDados] = useState({ problemas: [], sugestoes: [], eventos: [] });
  const [carregando, setCarregando] = useState(true);
  const [aviso, setAviso] = useState("");
  useEffect(() => {
    let ativo = true;
    api.get("/mapa", { params: { bairro_id: 1 } })
      .then((resposta) => { if (ativo) setDados(resposta.data); })
      .catch((erro) => { if (ativo) setAviso(mensagemErro(erro)); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, []);
  const aumentarZoom = () => mapaRef.current?.zoomIn();
  const diminuirZoom = () => mapaRef.current?.zoomOut();
  const centralizarMapa = () => mapaRef.current?.setView(centro, 12);
  const problemas = (dados.problemas || []).filter(temCoordenadas);
  const sugestoes = (dados.sugestoes || []).filter(temCoordenadas);
  const eventos = (dados.eventos || []).filter(temCoordenadas);

  return (
    <div className="pag-map">
      <Cabecalho />

      <main className="pagina-categoria">
        <Link className="voltar" to="/"><i className="fa-solid fa-arrow-left"></i> Voltar para o início</Link>

        <section className="painel-categoria">
          <div className="icone-pagina"><i className="fa-solid fa-map-location-dot"></i></div>

          <h1>Mapa da Comunidade</h1>

          <p>Visualize problemas, sugestões e eventos com endereço reconhecido pelo mapa.</p>

          <div className="conteudo-categoria mapa-interativo">

            <div className="mapa-cabecalho">
              
              <div><h2>Conheça o bairro Vila Esperança</h2><p>Arraste o mapa para explorar. Use os controles para aproximar ou afastar.</p></div>

              <div className="controles-mapa" aria-label="Controles do mapa">
                <button type="button" onClick={aumentarZoom} aria-label="Aumentar zoom">＋</button>

                <button type="button" onClick={diminuirZoom} aria-label="Diminuir zoom">−</button>

                <button type="button" className="botao-centralizar" onClick={centralizarMapa}>Centralizar</button>

              </div>
              
            </div>
            <div className="mapa-legenda" aria-label="Legenda do mapa"><span><i className="legenda-ponto problema-ponto"></i>Problema relatado</span><span><i className="legenda-ponto melhoria-ponto"></i>Sugestão</span><span><i className="legenda-ponto local-ponto"></i>Evento</span></div>
            <div className="mapa-janela"><MapContainer center={centro} zoom={12} minZoom={4} maxZoom={19} scrollWheelZoom={true} className="mapa-real">
              <ConectarMapa mapaRef={mapaRef} />
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {problemas.map((item) => <Marker key={`p-${item.id}`} position={[Number(item.latitude), Number(item.longitude)]} icon={iconeProblema}><Popup><strong>{item.titulo}</strong><br />{item.localizacao}<br />{item.descricao}</Popup></Marker>)}
              {sugestoes.map((item) => <Marker key={`s-${item.id}`} position={[Number(item.latitude), Number(item.longitude)]} icon={iconeSugestao}><Popup><strong>{item.titulo}</strong><br />{item.localizacao || "Local não informado"}<br />{item.descricao}</Popup></Marker>)}
              {eventos.map((item) => <Marker key={`e-${item.id}`} position={[Number(item.latitude), Number(item.longitude)]} icon={iconeEvento}><Popup><strong>{item.titulo}</strong><br />{item.local}<br />{item.descricao}</Popup></Marker>)}
            </MapContainer></div>
            {carregando && <p className="aviso-mapa">Carregando registros da API...</p>}
            {!carregando && aviso && <p className="aviso-mapa" role="alert">{aviso}</p>}
            {!carregando && !aviso && <p className="aviso-mapa">Marcadores carregados da API: {problemas.length} problema(s), {sugestoes.length} sugestão(ões) e {eventos.length} evento(s). Só aparecem registros cujo endereço foi localizado; endereços fictícios ou incompletos podem não gerar marcador.</p>}
          </div>
          <Link className="acao-voltar" to="/">Voltar à página inicial</Link>
        </section>
      </main>
      <footer><strong>Minha Comunidade</strong><span>|</span><span>Juntos por um bairro melhor!</span><div className="redes"><a className="face" href="https://www.facebook.com/?locale=pt_BR" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a><a className="inst" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a><a className="you" href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-youtube"></i></a></div></footer>
    </div>
  );
}
