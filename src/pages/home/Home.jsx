import './home.css'
import Card from '../../components/card/Card'
import { useState, useEffect } from 'react'

export default function Home() {


  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPokemons(limit);
  }, [limit]);

  function loadMore() {
    setLimit(limit + 20);
    loadPokemons(limit);
  }

  function loadPokemons(limit) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map(element =>
          fetch(element.url)
            .then(response => {
              setLoading(true);
              return response.json();
            })
            .then(data => ({
              id: data.id,
              name: data.name,
              type: data.types[0].type.name,
              ability: data.abilities[0].ability.name,
              height: data.height,
              weight: data.weight,
              image: data.sprites.versions['generation-v']['black-white'].animated.front_default
            })
            )
        );

        Promise.all(promises).then(pokemons => {
          setPokemons(pokemons);
          setLoading(false);
        });
      });
  }

  return (

    <section className='section-home'>
      <h1>Pokemon's:</h1>

      <div className="list">
        {pokemons.map((pokemon, index) => {

          return (
            <Card
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              type={pokemon.type}
              ability={pokemon.ability}
              height={pokemon.height}
              weight={pokemon.weight}
              img={pokemon.image}
            />
          )
        })}
      </div>

      {loading ? <div className="loader"></div> : <button onClick={() => { loadMore() }} className='btn'>Carregar mais.</button>}

    </section>
  )
}
