import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import api from '../../services/api'

import PokemonDisplay, { PokemonDisplayProps } from '../../components/PokemonDiplay'

import './styles.css'

function PokemonList() {
  const [pokemons, setPokemons] = useState([{
    name: '', number: 0, image: '', poketypes: '',
  }])
  const limit = 40

  async function searchPokemons(offset: number) {
    const promisesPokemonDetails: any = []

    const a = await api.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response: AxiosResponse) => {
        response.data.results.forEach((element: any) => {
          promisesPokemonDetails.push(api.get(element.url))
        })
      })

    await Promise.all([...promisesPokemonDetails])
      .then((elements: any) => {
        let pokemonAux: PokemonDisplayProps[] = []
        elements.forEach((element: any) => {
          pokemonAux = [...pokemonAux, {
            name: element.data.name,
            number: element.data.id,
            image: element.data.sprites.front_default,
            poketypes: element.data.types[0].type.name,
          }]
        })

        setPokemons(pokemonAux)
        console.log(pokemonAux)
        return pokemonAux
      })
      // eslint-disable-next-line no-console
      .catch(console.log)
  }

  useEffect(() => {
    async function renderFirstPokemons() {
      await searchPokemons(0)
      await searchPokemons(40)
    }

    renderFirstPokemons()
  }, [])

  return (
    <div id="page-pokemon-list">
      <div className="navbar">
        <input
          id="input-find-pokemon"
          type="text"
          placeholder="Pesquise"
        />
        <Link to="/" id="link-favorite-pokemon">
          Favoritos
        </Link>
      </div>

      <div id="pokemon-list-area">
        {pokemons.map((pokemon: PokemonDisplayProps) => (
          <PokemonDisplay
            key={pokemon.number}
            name={pokemon.name}
            number={pokemon.number}
            image={pokemon.image}
            poketypes={pokemon.poketypes}
          />
        ))}

      </div>

    </div>
  )
}

export default PokemonList
