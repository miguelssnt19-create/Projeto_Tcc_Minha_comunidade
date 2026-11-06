import './index.css'
import Cabecalho from '../../component/cabecalho';


export default function Sobre(){

    return(
        <div className='Pag-sobre'>
            
            <Cabecalho />


            <header className='imagem-texto'>
            <h1>Sobre Nós</h1>
            <p>Conheça mais sobre o Minha Comunidade, nosso propósito e quem faz parte deste projeto!</p>
            </header>


        <div className='MAE'>
    
            <div className='quadrado1'>
                    <h3>Conheça o Minha Comunidade</h3>

                    <p>O Minha Comunidade é uma plataforma criada para aproximar os moradores de seus bairros, permitindo que denunciem problemas, enviem sugestões, acompanhem eventos e contribuam para uma comunidade melhor.</p>

            </div>
    
            <div className='quadrado2'>
                            
                        <div className='Nume1'>
                        <h4>Denuncie problemas</h4>
                        <p>Ajude a resolver os problemas do seu bairro.</p>
                        </div>
                        
                        <br />

                        <div className='Nume2'>
                        <h4>Envie sugestões</h4>
                        <p>Compartilhe ideias para melhorar sua comunidade.</p>
                        </div>

                        <br />

                        <div className='Nume3'>
                        <h4>Acompanhe eventos</h4>
                        <p>Fique por dentro do que acontece no seu bairro.</p>
                        </div>

                        <br />

                        <div className='Nume4'>
                        <h4>Veja no mapa</h4>
                        <p>Encontre seu bairro e conheça a região.</p>
                        </div>

            </div>
    
        </div>


        <div className='titulo'>
        <h2>Nossa Equipe</h2>
        <p>Conheça os criadores por trás do Minha Comunidade:</p>
        </div>

        <header className='Membros'>

        <div className='Miguel'>
            <h4>Miguel souza</h4>
            <img src="" alt="" />
            <span>Desenvolvedor back end</span>
            <p>responsavel pelo funcionamento da api</p>
        </div>

        <div className='Samuel'>
            <h4>Samuel Silva</h4>
            <img src="" alt="" />
            <span>Desenvolvedor back end</span>
            <p>auxiliar de desenvolvimento da api</p>
        </div>

        <div className='Murillo'>
            <h4>Murillo Oliveira</h4>
            <span>desenvolvedor front end</span>
            <p>responsavel pela frontend</p>
        </div>

        <div className='arthur'>
            <h4>Arthur Mendes</h4>
            <span>Desenvolvedor frontend</span>
            <p>auxiliar de desenvolvimento da frontend</p>
        </div>


        <div className='Eduardo'>
            <h4>Eduardo Costa</h4>
            <span>Banco de dados</span>
            <p>responsavel pelo banco de dados</p>
        </div>

        <div className='Pietro'>
            <h4>Pietro Santos</h4>
            <span>Banco de dados</span>
            <p>auxiliar de banco de dados</p>
        </div>

        </header>




        </div>
    )

}