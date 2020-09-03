import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import api from '../../services/api'

import PokemonDisplay, { PokemonDisplayProps } from '../../components/PokemonDisplay'

import './styles.css'

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<PokemonDisplayProps[]>([])
  const [offsetPoke, setOffsetPoke] = useState(0)
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(40)
  const [listAllPokemon, setListAllPokemon] = useState<any[]>([])
  const [inputSearch, setInputSearch] = useState('')

  async function callPromisesToRenderPokemon(promisesPokemonDetails: any[], filter = false) {
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

        if (!filter) setPokemons([...pokemons, ...pokemonAux])
        else {
          setPokemons([...pokemonAux])
          setOffsetPoke(0)
        }
        return pokemonAux
      })
  }

  async function searchPokemons(offset: number, filter = false) {
    const promisesPokemonDetails: any = []
    await api.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response: AxiosResponse) => {
        response.data.results.forEach((element: any) => {
          promisesPokemonDetails.push(api.get(element.url))
        })
      })

    await callPromisesToRenderPokemon(promisesPokemonDetails, filter)
  }

  const handleScroll = () => {
    console.log(`${pokemons.length} ${offsetPoke}`)
    if (pokemons.length === offsetPoke + 40 && offsetPoke <= 807) {
      console.log('oi')
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
      await api.get('https://pokeapi.co/api/v2/pokemon?limit=807&offset=0')
        .then((response: AxiosResponse) => {
          setListAllPokemon(response.data.results)
        })
    }
    renderFirstPokemons()
  }, [])

  useEffect(() => {
    const loadPokemon = async () => {
      setLoading(true)
      await searchPokemons(offsetPoke)
      setLoading(false)
    }
    if (offsetPoke < 807 && inputSearch.length === 0) loadPokemon()
  }, [offsetPoke])

  async function searchPokemonByName(event: React.FormEvent<HTMLInputElement>) {
    setInputSearch(event.currentTarget.value)
    if (event.currentTarget.value.length >= 2) {
      const filterPokemon = listAllPokemon
        .filter((element: any) => element.name.includes(event.currentTarget.value))
        .map((element: any) => api.get(element.url))
      await callPromisesToRenderPokemon(filterPokemon, true)
    } else if (event.currentTarget.value.length === 0) {
      await searchPokemons(0, true)
    }
  }

  return (
    <div id="page-pokemon-list">
      <div className="navbar">
        <input
          id="input-find-pokemon"
          type="text"
          placeholder="Pesquise"
          value={inputSearch}
          onInput={(event: React.FormEvent<HTMLInputElement>) => searchPokemonByName(event)}
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
