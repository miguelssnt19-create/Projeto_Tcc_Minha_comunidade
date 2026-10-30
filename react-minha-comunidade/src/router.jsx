import './index.css';
import App from './pages/app/App.js';
import Cadastro from './pages/cadastrar/index.jsx';
import Entrar from './pages/entrar/index.jsx';
import Evento from './pages/eventos/index.jsx';
import Mapa from './pages/mapa/index.jsx';
import Problemas from './pages/problemas/index.jsx';
import Sugestoes from './pages/sugestoes/index.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


export default function Router() {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path='/cadastrar' element={<Cadastro />} />
            <Route path='/entrar' element={<Entrar />} />
            <Route path='/evento' element={<Evento />} />
            <Route path='/mapa' element={<Mapa />} />
            <Route path='/problemas' element={<Problemas />} />
            <Route path='/sugestoes' element={<Sugestoes />} />
            
        </Routes>  
    </BrowserRouter>
    );
}