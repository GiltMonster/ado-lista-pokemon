import { useState } from 'react'
import './cadastro.css'
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const newUser = {
            nome: data.nome,
            email: data.email.toLowerCase(),
            senha: data.senha,
            pokemons: []
        };

        setUser(newUser);

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao cadastrar');
        }).then(data => {
            console.log(data);
            navigate('/login');
        }).catch(error => {
            console.log(error);
            event.preventDefault();
            event.target.reset();
        });
    }

    return (
        <section className='container'>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <div className='form-group'>
                    <label htmlFor='nome'>Nome</label>
                    <input type='text' id='nome' name='nome' className='form-control' required />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' name='email' className='form-control' required />
                </div>
                <div className='form-group'>
                    <label htmlFor='senha'>Senha</label>
                    <input type='password' id='senha' name='senha' className='form-control' required />
                </div>
                <button type='submit' className='btn btn-primary'>Cadastrar</button>
            </form>
        </section>
    )
}
