import { toast, ToastContainer } from 'react-toastify';
import './login.css';
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        fetch('http://localhost:3000/users')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao logar');
            })
            .then(users => {
                data.email = data.email.toLowerCase();
                const user = users.find(user => user.email === data.email && user.senha === data.senha);
                if (user) {
                    localStorage.setItem('logado', JSON.stringify(user));
                    toast('Logado com sucesso', { position: 'bottom-right', type: 'success' });
                    navigate('/');
                } else {
                    toast('E-mail ou senha inválidos', { position: 'bottom-right', type: 'error' });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <section>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' name='email' className='form-control' required />
                </div>
                <div className='form-group'>
                    <label htmlFor='senha'>Senha</label>
                    <input type='password' id='senha' name='senha' className='form-control' required />
                </div>
                <button type='submit' className='btn btn-primary'>Logar</button>
            </form>

            <Link to='/cadastro'>Cadastrar-se</Link>

            <ToastContainer />

        </section>
    )
}
