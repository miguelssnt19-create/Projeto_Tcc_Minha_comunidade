import './index.css'
import Cabecalho from '../../component/cabecalho';


export default function Sobre(){

    return(
        <div className='Pag-sobre'>
            
            <Cabecalho />


            <header className='imagem-texto'>

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

                        <div className='Nume2'>
                        <h4>Envie sugestões</h4>
                        <p>Compartilhe ideias para melhorar sua comunidade.</p>
                        </div>

                        <div className='Nume3'>
                        <h4>Acompanhe eventos</h4>
                        <p>Fique por dentro do que acontece no seu bairro.</p>
                        </div>

                        <div className='Nume4'>
                        <h4>Veja no mapa</h4>
                        <p>Encontre seu bairro e conheça a região.</p>
                        </div>

                </div>
    
                </div>



        </div>
    )

}