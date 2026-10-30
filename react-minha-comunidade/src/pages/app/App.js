
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <header>
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
            <a href="#sobre">Sobre</a>
        </nav>

        <div className="acoes">
            <i className="fa-solid fa-magnifying-glass"></i>
            <a className='Entrar' href='/entrar'>entrar</a>
            <a className='Cadastrar' href='/cadastrar'>cadastrar</a>
            
        </div>
    </header>


    
    <section className="hero" id="inicio">

        <div className="hero-conteudo">

            <h1>Minha Comunidade</h1>

            <h2>Juntos podemos melhorar nosso bairro</h2>

                

            <div className="botoes">
                <Link to="/problemas">
                    <button className="botao-principal">
                        <i className="fa-solid fa-bullhorn"></i>
                        Reportar um problema
                    </button>
                </Link>

                <Link to="/sugestoes">
                    <button className="botao-secundario">
                        <i className="fa-regular fa-lightbulb"></i>
                        Dar uma sugestão
                    </button>
                </Link>
            </div>

        </div>

    </section>


    
    <section className="servicos">

        <div className="card-servico problema" id="problemas">
            <div className="icone">
                <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <h3>Reportar Problemas</h3>

        
        </div>


        <div className="card-servico sugestao" id="sugestoes">
            <div className="icone">
                <i className="fa-regular fa-lightbulb"></i>
            </div>

            <h3>Sugerir Melhorias</h3>

        </div>


        <div className="card-servico eventos" id="eventos">
            <div className="icone">
                <i className="fa-regular fa-calendar"></i>
            </div>

            <h3>Eventos na Comunidade</h3>

        
        </div>


        <div className="card-servico mapa">
            <div className="icone">
                <i className="fa-solid fa-location-dot"></i>
            </div>

            <h3>Mapa da Comunidade</h3>

        </div>


    

    </section>


    
    <section className="conteudo">

        
        <div className="destaque">

            <div>
                <h2>Um bairro melhor<br/>começa com você!</h2>

                <p>
                    Pequenas atitudes fazem
                    grandes diferenças.
                </p>

                

                <a href="#sobre" className="botao-sobre">
                Saiba mais
    <i className="fa-solid fa-arrow-right"></i>
                </a>

            </div>

        </div>


        
        <div className="mapa-box" id="mapa">

                
            <div className="titulo-box">
                <i className="fa-regular fa-map"></i>
                <h2>Mapa da Comunidade</h2>
            </div>

            <div className="mapa-fake">
                <div className="marcador vermelho">!</div>
                <div className="marcador verde">●</div>
                <div className="marcador azul">●</div>
                <div className="marcador vermelho m2">!</div>
                <div className="marcador verde m2">●</div>
                <div className="arvore">
                    🌳
                </div>

            </div>

            

            <Link className="mapa-botao" to="/mapa">
                <i className="fa-regular fa-map"></i>
                Ver mapa completo
                <i className="fa-solid fa-arrow-right"></i>
            </Link>
        </div>


        
        <div className="relatos">

            <h2>Últimos relatos da comunidade</h2>

            <div className="relato">
                <span className="relato-icone vermelho-bg">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                </span>

                <div>
                    <strong>Buraco na Rua das Flores</strong>
                    <small>Centro</small>
                </div>

                <span className="tempo">2 horas atrás</span>
            </div>


            <div className="relato">
                <span className="relato-icone verde-bg">
                    <i className="fa-solid fa-lightbulb"></i>
                </span>

                <div>
                    <strong>Sugestão de mais árvores</strong>
                    <small>Jardim das Acácias</small>
                </div>

                <span class="tempo">5 horas atrás</span>
            </div>


            <div className="relato">
                <span className="relato-icone azul-bg">
                    <i className="fa-regular fa-calendar"></i>
                </span>

                <div>
                    <strong>Mutirão de limpeza</strong>
                    <small>Praça Central</small>
                </div>

                <span className="tempo">1 dia atrás</span>
            </div>


            <div className="relato">
                <span className="relato-icone vermelho-bg">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                </span>

                <div>
                    <strong>Lâmpada queimada</strong>
                    <small>Vila Nova</small>
                </div>

                <span className="tempo">2 dias atrás</span>
            </div>

            <a href='/problemas'>Ver todos os relatos →</a>

        </div>

    </section>


    
    <section className="sobre" id="sobre">

        <h2>Sobre o Minha Comunidade</h2>

     <p>Podemos melhorar seu bairo conte sempre conosco </p>

    </section>


    
    <footer>

        <strong>Minha Comunidade</strong>

        <span>|</span>

        <span>Juntos por um bairro melhor!</span>

        <div className="redes">

            <a href="https://www.facebook.com/?locale=pt_BR" className="face">
            <i className="fa-brands fa-facebook"></i>
</a>


            <a href="https://www.instagram.com/" className="inst">
            <i className="fa-brands fa-instagram"></i>
            </a>


            
            <a href="https://www.youtube.com/" className="you">
            <i className="fa-brands fa-youtube"></i>
            </a>
        </div>

    </footer>
    </div>
  );
}

export default App;
