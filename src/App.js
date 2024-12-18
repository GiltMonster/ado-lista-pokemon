import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';

import InfoPage from './pages/infoPage/InfoPage';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import ListaFav from './pages/listaFav/ListaFav';
import Perfil from './pages/perfil/Perfil';


function App() {
  return (
    <>
      <Header />
      <main className='container'>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/pokemon/:id" element={<InfoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/lista-fav" element={<ListaFav />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path='*' element={
            <div style={{ margin: 'auto 35%', display: 'flex', alignItems: 'center' }}>
              <h1>Not Found - 404</h1>
            </div>
          } />
        </Routes>
      </main>
    </>

  );
}

export default App;
