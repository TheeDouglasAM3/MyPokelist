import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import PokemonDisplay, { PokemonDisplayProps } from '../../components/PokemonDisplay'

import './styles.css'

const PokemonFav = (): ReactElement => {
  const baseUrl = `http://${window.location.host}`
  const [pokemons, setPokemons] = useState<PokemonDisplayProps[]>([])
  const [userName, setUserName] = useState('')
  const [favPokemonStringLink, setFavPokemonStringLink] = useState('')

  async function callPromisesToRenderPokemon(promisesPokemonDetails: any[]) {
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
        setPokemons([...pokemonAux])
        return pokemonAux
      })
  }

  async function searchFavoritesPokemon() {
    const promisesPokemonDetails: any = []
    const favorites = Object.values(JSON.parse(localStorage.getItem('favorites') || '{}'))
    if (favorites.length > 0) {
      favorites.forEach((numberPokemon: any) => {
        promisesPokemonDetails.push(api.get(`https://pokeapi.co/api/v2/pokemon/${numberPokemon}/`))
      })
    }
    await callPromisesToRenderPokemon(promisesPokemonDetails)
  }

  function favoritesLocalStorageToString() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
      .toString()
      .split(',')
      .join('&p=')

    setFavPokemonStringLink(`&p=${favorites}`)
  }

  function saveNameLocalStorage(name: string) {
    localStorage.setItem('username', name)
  }

  function renderUsername() {
    setUserName(localStorage.getItem('username') || '')
  }

  useEffect(() => {
    async function renderFavoritesPokemon() {
      await searchFavoritesPokemon()
    }
    renderUsername()
    favoritesLocalStorageToString()
    renderFavoritesPokemon()
  }, [])

  return (
    <div id="page-pokemon-fav">
      <div className="navbar">
        <input
          id="input-link"
          type="text"
          value={`${baseUrl}/pokemon-share?name=${userName}${favPokemonStringLink}`}
          placeholder="Link para compartilhar"
          readOnly
        />
        <Link to="/pokemon-list" id="link-list-pokemon" />
      </div>

      <div className="name-area">
        <input
          id="input-name-user"
          type="text"
          placeholder="Digite o seu nome"
          value={userName}
          onChange={(ev: React.FormEvent<HTMLInputElement>) => setUserName(ev.currentTarget.value)}
          onBlur={(ev: React.FormEvent<HTMLInputElement>) => saveNameLocalStorage(ev.currentTarget.value)}
        />
      </div>

      <div id="pokemon-fav-area">
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

export default PokemonFav
