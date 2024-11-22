import React, { useState } from 'react'
import Card from '../../components/card/Card';
import './listaFav.css'

export default function ListaFav() {

    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('logado')));

    function removeFav(id) {
        const newPokemons = usuario.pokemons.filter(pokemon => pokemon.id !== id);
        const newUsuario = {
            ...usuario,
            pokemons: newPokemons
        }
        localStorage.setItem('logado', JSON.stringify(newUsuario));
        setUsuario(newUsuario);

        fetch(`http://localhost:3001/usuarios/${usuario.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUsuario)
        }).then(response => {
            if (response.ok) {
                console.log('Favorito removido com sucesso');
            } else {
                console.log('Erro ao remover favorito');
            }
        })
    }

    return (
        <section className='section-lista-fav'>

            <div className='title-fav'>
                <h1>Seus Pokemon's favoritos:</h1>
                <div>
                    <h3>Total de favoritos:</h3>
                    <p>{usuario.pokemons.length}</p>
                </div>
            </div>

            <div className="list">
                {
                    usuario.pokemons.map(pokemon => {
                        return (
                            <Card
                                key={pokemon.id}
                                id={pokemon.id}
                                name={pokemon.name}
                                type={pokemon.type}
                                ability={pokemon.ability}
                                height={pokemon.height}
                                weight={pokemon.weight}
                                img={pokemon.image}
                            >
                                <button className='btn-remove' onClick={() => { removeFav(pokemon.id) }}>Remover</button>
                            </Card>)
                    })
                }
            </div>
        </section>
    )
}
