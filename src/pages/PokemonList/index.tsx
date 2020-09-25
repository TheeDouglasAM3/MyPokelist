import React, { useState, useEffect, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import api from '../../services/api'

import PokemonDisplay, { PokemonDisplayProps } from '../../components/PokemonDisplay'

import './styles.css'

const PokemonList = (): ReactElement => {
  const pokemonPerPage = 80
  const maxNumberPokemon = 807
  const [pokemons, setPokemons] = useState<PokemonDisplayProps[]>([])
  const [offsetPoke, setOffsetPoke] = useState(0)
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(pokemonPerPage)
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

  async function searchPokemonByName(event: React.FormEvent<HTMLInputElement>) {
    setInputSearch(event.currentTarget.value.toLowerCase())
    if (event.currentTarget.value.length >= 2) {
      const filterPokemon = listAllPokemon
        .filter((element: any) => element.name.includes(event.currentTarget.value.toLowerCase()))
        .map((element: any) => api.get(element.url))
      await callPromisesToRenderPokemon(filterPokemon, true)
    } else if (event.currentTarget.value.length === 0) {
      await searchPokemons(0, true)
    }
  }

  function isThereMorePokemonToShow() {
    return pokemons.length === offsetPoke + pokemonPerPage && offsetPoke <= maxNumberPokemon
  }

  function isTheLastPage() {
    return pokemons.length >= maxNumberPokemon - pokemonPerPage
  }

  const handleScroll = () => {
    if (isThereMorePokemonToShow()) {
      if (!isTheLastPage()) {
        setOffsetPoke(offsetPoke + pokemonPerPage)
      } else {
        setLimit(maxNumberPokemon - (offsetPoke + pokemonPerPage))
        setOffsetPoke(offsetPoke + pokemonPerPage)
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
      await api.get(`https://pokeapi.co/api/v2/pokemon?limit=${maxNumberPokemon}&offset=0`)
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
    if (offsetPoke < maxNumberPokemon && inputSearch.length === 0) loadPokemon()
  }, [offsetPoke])

  return (
    <div id="page-pokemon-list">
      <div className="navbar">
        <input
          id="input-find-pokemon"
          type="text"
          placeholder="Pesquise"
          value={inputSearch}
          onChange={(event: React.FormEvent<HTMLInputElement>) => searchPokemonByName(event)}
        />
        <Link to="/pokemon-fav" id="link-favorite-pokemon" />
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
      {!loading && (
      <div className="loading">
        No Loading ... <br />
        Offset = {offsetPoke}<br />
        maxpokemon = {maxNumberPokemon}<br />
        loading = {loading.toString()}<br />
        inputSearch.length = {inputSearch.length}
      </div>
      )}
      {(!loading && isTheLastPage()) && <div className="loading">No Loading and last page</div>}
    </div>
  )
}

export default PokemonList
