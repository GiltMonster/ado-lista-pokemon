import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './perfil.css';

export default function Perfil() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('logado')));
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao cadastrar');
        }
        ).then(data => {
            localStorage.clear();
            navigate('/login');
        }).catch(error => {
            console.log(error);
            event.preventDefault();
            event.target.reset();
        });
    }

    function excluir(id) {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log('Conta excluida com sucesso');
                localStorage.removeItem('logado');
                navigate('/login');
            } else {
                console.log('Erro ao excluir conta');
            }
        })
    }


    return (
        <section className='container'>
            <h1>Perfil</h1>
            <form onSubmit={handleSubmit} method='PUT'>
                <div className='form-group'>
                    <label htmlFor='nome'>Nome</label>
                    <input type='text' id='nome' name='nome' className='form-control' onChange={(e) => setUser({ ...user, nome: e.target.value })} required value={user.nome} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' name='email' className='form-control' onChange={(e) => setUser({ ...user, email: e.target.value })} required value={user.email} />
                </div>
                <div className='form-group'>
                    <label htmlFor='senha'>Senha</label>
                    <input type='password' id='senha' name='senha' className='form-control' onChange={(e) => setUser({ ...user, senha: e.target.value })} required value={user.senha} />
                </div>

                <div className='container-btn-perf'>
                    <button type='submit' className='btn btn-primary'>Atualizar</button>
                    <button className='btn btn-primary' onClick={()=>{excluir(user.id)}}>Excluir conta</button>
                </div>
            </form>
        </section>
    )
}
