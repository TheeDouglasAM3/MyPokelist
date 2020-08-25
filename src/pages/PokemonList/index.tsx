import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import PokemonDisplay from '../../components/PokemonDiplay'

import './styles.css'

interface PokemonDisplayProps {
  name: string
  number: number
  image: string
  poketypes: string
}
function PokemonList() {
  const [pokemons, setPokemons] = useState([])

  async function searchDetailsSinglePokemon(url: string) {
    const response = await api.get(url)
    return response.data
  }

  async function searchPokemons() {
    const response = await api.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
  }

  useEffect(() => {
    searchPokemons()
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
