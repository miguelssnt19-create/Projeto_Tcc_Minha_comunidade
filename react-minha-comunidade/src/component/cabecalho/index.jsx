import './index.scss';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cabecalho(){

    const navegar = useNavigate();

const [usuario, setUsuario] = useState(() => {
    const dados = localStorage.getItem("minhaComunidadeUsuario");

    return dados ? JSON.parse(dados) : null;
});

function sair() {
    localStorage.removeItem("minhaComunidadeToken");
    localStorage.removeItem("minhaComunidadeUsuario");

    setUsuario(null);
    navegar("/entrar");
}


    return(
        <div>
            <header className='header-ca'>
        <div className="logo">
            <i className="fa-solid fa-tree"></i>

            <div>
                <h2>Minha Comunidade</h2>
                
            </div>
        </div>

        <nav>
            <a href="/" class="ativo">Início</a>
            <a href="/problemas">Problemas</a>
            <a href="/sugestoes">Sugestões</a>
            <a href="/evento">Eventos</a>
            <a href="/mapa">Mapa</a>
            <a href="/sobre">Sobre</a>
        </nav>

<div className="acoes">
    <i className="fa-solid fa-magnifying-glass"></i>

    {usuario && (
        <div className="usuario-logado">
            <i className="fa-solid fa-circle-user"></i>
            <span>{usuario.nome}</span>

            <button onClick={sair} className="botao-sair">
                Sair
            </button>
        </div>
    )}

    {!usuario && (
        <>
            <Link className="Entrar" to="/entrar">
                entrar
            </Link>

            <Link className="Cadastrar" to="/cadastrar">
                cadastrar
            </Link>
        </>
    )}
</div>
    </header>
        </div>
    )

}