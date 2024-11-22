import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './infoPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InfoPage() {

  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [usuarioLogado, setUsuarioLogado] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setUsuarioLogado(JSON.parse(localStorage.getItem('logado')));
    getPokemon(id);
  }, [id]);

  function backOnePage() {
    navigate('..');
  }

  function getPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => {
        setPokemon({
          id: data.id,
          name: data.name,
          type: data.types[0].type.name,
          ability: data.abilities[0].ability.name,
          height: data.height,
          weight: data.weight,
          image: data.sprites.versions['generation-v']['black-white'].animated.front_default,

        });
      });
  }

  function addFavorito() {
    setUsuarioLogado(JSON.parse(localStorage.getItem('logado')));

    console.log(usuarioLogado);

    if (!usuarioLogado) {
      toast('Você precisa estar logado para adicionar aos favoritos', { position: 'bottom-right', type: 'error' });
      return;
    }

    let favoritos = usuarioLogado.pokemons || [];
    if (favoritos.some(pokemonFavorito => pokemonFavorito.id === pokemon.id)) {
      toast('Este pokemon já está nos favoritos', { position: 'bottom-right' });
      return;
    }

    let pokemonFavorito = {
      id: pokemon.id,
      name: pokemon.name,
      type: pokemon.type,
      ability: pokemon.ability,
      height: pokemon.height,
      weight: pokemon.weight,
      image: pokemon.image
    }

    favoritos.push(pokemonFavorito);

    setUsuarioLogado({
      ...usuarioLogado,
      pokemons: favoritos
    });

    localStorage.setItem('logado', JSON.stringify(usuarioLogado));
    toast('Pokemon adicionado aos favoritos', { position: 'bottom-right' });
  }

  return (
    <section>
      <div className='titulo-voltar'>
        <button onClick={() => { backOnePage() }}>&larr; Voltar</button>
        <h1>{pokemon.name}</h1>
      </div>

      <div className='card-info'>
        <div className='card-info-image'>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <div className='card-info-text'>
          <p><strong>Tipo:</strong> {pokemon.type}</p>
          <p><strong>Habilidade:</strong> {pokemon.ability}</p>
          <p><strong>Altura:</strong> {pokemon.height} m</p>
          <p><strong>Peso:</strong> {pokemon.weight} kg</p>

          <div>
            <button className='btn-fav' onClick={() => { addFavorito() }}>Adicionar aos favoritos</button>
          </div>

        </div>

      </div>

      <ToastContainer />

    </section>
  )
}
