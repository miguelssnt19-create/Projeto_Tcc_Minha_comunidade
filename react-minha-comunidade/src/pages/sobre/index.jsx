import './index.css'
import Cabecalho from '../../component/cabecalho';


export default function Sobre(){

    return(
        <div className='Pag-sobre'>
            
            <Cabecalho />


            <section className='imagem-texto'>
    <h1>Sobre Nós</h1>
    <p>Conheça mais sobre o Minha Comunidade, nosso propósito e quem faz parte deste projeto!</p>
    </section>


        <div className='MAE'>
    
            <div className='quadrado1'>
    <i className="fa-solid fa-tree"></i>

    <h3>Conheça o Minha Comunidade</h3>

    <p>
        O Minha Comunidade é uma plataforma criada para aproximar os moradores de seus bairros, permitindo que denunciem problemas, enviem sugestões, acompanhem eventos e contribuam para uma comunidade melhor.
    </p>
</div>
    
            <div className='quadrado2'>
                            
                        <div className='Nume1'>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <h4 className='titulos'>Denuncie problemas</h4>
                        <p>Ajude a resolver os problemas do seu bairro.</p>
                        </div>
                        
                        <br />

                        <div className='Nume2'>
                        <i className="fa-solid fa-lightbulb"></i>
                        <h4 className='titulos'>Envie sugestões</h4>
                        <p>Compartilhe ideias para melhorar sua comunidade.</p>
                        </div>

                        <br />

                        <div className='Nume3'>
                        <i className="fa-solid fa-calendar-days"></i>
                        <h4 className='titulos'>Acompanhe eventos</h4>
                        <p>Fique por dentro do que acontece no seu bairro.</p>
                        </div>

                        <br />

                        <div className='Nume4'>
                        <i className="fa-solid fa-map-location-dot"></i>
                        <h4 className='titulos'>Veja no mapa</h4>
                        <p>Encontre seu bairro e conheça a região.</p>
                        </div>

            </div>
    
        </div>



<div className='Titulo'>
    <h2 className='titulos'>Nossa Equipe</h2>
    <p>Conheça os criadores por trás do Minha Comunidade:</p>
</div>


<section className='Membros'>

    <div className='Miguel'>
        <img src="" alt="" />
        <h4>Miguel Souza</h4>
        <span>Desenvolvedor back-end</span>
        <p>Responsável pelo funcionamento da API.</p>
    </div>

    <div className='Samuel'>
        <img src="./assets/images/Samuel.webp" alt="samuel" />
        <h4>Samuel Nogueira</h4>
        <span>Desenvolvedor back-end</span>
        <p>Auxiliar de desenvolvimento da API.</p>
    </div>

    <div className='Murillo'>
        <img className='imagem_muri' src="./assets/images/murillo_terno.webp" alt="murillo" />
        <h4>Murillo Monteiro</h4>
        <span>Desenvolvedor front-end</span>
        <p>Responsável pelo front-end.</p>
    </div>

    <div className='arthur'>
        <img src="./assets/images/arthur_terno.png" alt="arthur" />
        <h4>Arthur Reimberg</h4>
        <span>Desenvolvedor front-end</span>
        <p>Auxiliar de desenvolvimento do front-end.</p>
    </div>

    <div className='Eduardo'>
        <img src="./assets/images/eduardo_terno.png" alt="eduardo" />
        <h4>Eduardo Costa</h4>
        <span>Banco de dados</span>
        <p>Responsável pelo banco de dados.</p>
    </div>

    <div className='Pietro'>
        <img src="./assets/images/pietro_terno.png" alt="pietro" />
        <h4>Pietro Moraes</h4>
        <span>Banco de dados</span>
        <p>Auxiliar de banco de dados.</p>
    </div>

</section>


<section className='Suporte'>
        <div className='sup1'>
        <i class="fa-solid fa-headphones"></i>
        </div>

        <div className='sup2'>
        <h2>Precisa de ajuda?</h2>
        <p>Encontrou algum problema ao utilizar nossa plataforma?</p>
        <p>Entre em contato com nossa equipe de suporte. Estamos aqui para ajudar!</p>
        </div>

            <div className='sup3'>
            <a className='Link' href="mailto:miguelssnt19@gmail.com"> <i className='fa-solid fa-envelope'></i>
            Falar com o suporte
            </a>
            </div>
</section>


<footer>
    <strong>Minha Comunidade</strong>
    <span>|</span>
    <span>Juntos por um bairro melhor!</span>

    <div className="redes">
                  <a href="https://www.facebook.com/?locale=pt_BR" className="face"><i className="fa-brands fa-facebook"></i></a>


            <a href="https://www.instagram.com/" className="inst"><i className="fa-brands fa-instagram"></i></a>


            
            <a href="https://www.youtube.com/" className="you"><i className="fa-brands fa-youtube"></i></a>
    </div>
</footer>  

        </div>
    )

}