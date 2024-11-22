import React, { useEffect, useState } from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('logado')));
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, [navigate, user]);

  function deslogar() {
    localStorage.removeItem('logado');
    setUser(null);
  }

  return (
    <div className='container-header'>
      <header>
        <Link to="/">
          <img src="https://img.icons8.com/?size=100&id=63311&format=png&color=000000" alt="React Logo" />
        </Link>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {logado ? (
              <>
                <li><Link to={"/lista-fav"}>Listar os favoritos</Link></li>
                <li><Link to={"/perfil"}>Seu perfil</Link></li>
                <hr />
                <li><Link onClick={() => { deslogar() }} to={'/'}>Logout</Link></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
}
