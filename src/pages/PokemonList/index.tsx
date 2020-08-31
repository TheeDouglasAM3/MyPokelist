import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import api from '../../services/api'

import PokemonDisplay, { PokemonDisplayProps } from '../../components/PokemonDiplay'

import './styles.css'

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<PokemonDisplayProps[]>([])
  const [offsetPoke, setOffsetPoke] = useState(0)
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(40)

  async function searchPokemons(offset: number) {
    const promisesPokemonDetails: any = []
    await api.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
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

        setPokemons([...pokemons, ...pokemonAux])
        return pokemonAux
      })
  }

  const handleScroll = () => {
    if (pokemons.length === offsetPoke + 40 && offsetPoke <= 807) {
      if (pokemons.length < 767) {
        setOffsetPoke(offsetPoke + 40)
      } else {
        setLimit(7)
        setOffsetPoke(offsetPoke + 40)
      }
    }
  }

  window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      handleScroll()
    }
  }

  useEffect(() => {
    async function renderFirstPokemons() {
      await searchPokemons(0)
    }

    renderFirstPokemons()
  }, [])

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true)
      await searchPokemons(offsetPoke)
      setLoading(false)
    }
    if (offsetPoke < 807) loadVideos()
  }, [offsetPoke])

  return (
    <div id="page-pokemon-list">
      <div className="navbar">
        <input
          id="input-find-pokemon"
          type="text"
          placeholder="Pesquise"
        />
        <Link to="/" id="link-favorite-pokemon" />
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

      {loading && <div className="loading">Loading ...</div>}
    </div>
  )
}

export default PokemonList
