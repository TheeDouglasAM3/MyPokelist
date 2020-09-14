import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

import pokeballImg from '../../assets/images/pokeball.png'
import PokemonShareDisplay, { PokemonShareDisplayProps } from '../../components/PokemonShareDisplay'

const PokemonShare = (): ReactElement => {
  const params = new URLSearchParams(window.location.search)
  const [userName, setUserName] = useState('')
  const [pokemons, setPokemons] = useState<PokemonShareDisplayProps[]>([])

  async function callPromisesToRenderPokemon(promisesPokemonDetails: any[]) {
    await Promise.all([...promisesPokemonDetails])
      .then((elements: any) => {
        let pokemonAux: PokemonShareDisplayProps[] = []
        elements.forEach((element: any) => {
          pokemonAux = [...pokemonAux, {
            name: element.data.name,
            number: element.data.id,
            imagePixel: element.data.sprites.front_default,
            imageArt: element.data.sprites.other['official-artwork'].front_default || '',
            poketypes: element.data.types[0].type.name,
          }]
        })
        setPokemons([...pokemonAux])
        return pokemonAux
      })
  }

  async function searchFavoritesPokemon(pokemonNums: string[]) {
    const promisesPokemonDetails: any = []
    if (pokemonNums.length > 0) {
      pokemonNums.forEach((numberPokemon: string) => {
        promisesPokemonDetails.push(api.get(`https://pokeapi.co/api/v2/pokemon/${numberPokemon}/`))
      })
    }
    await callPromisesToRenderPokemon(promisesPokemonDetails)
  }

  async function getInitialData() {
    const paramsURL = params.toString().split('&p=')
    const name = paramsURL[0].replace('name=', '').replace('+', ' ')
    const pokemon = paramsURL.slice(1)
    setUserName(name)
    return pokemon
  }

  useEffect(() => {
    async function renderFavoritesPokemon() {
      const pokemonNums = await getInitialData()

      await searchFavoritesPokemon(pokemonNums)
    }

    renderFavoritesPokemon()
  }, [])
  return (

    <div id="page-pokemon-share">
      <div className="user-card-top">
        <div className="user-area-name">
          <img src={pokeballImg} alt="Pokeball" />
          <p>{userName}</p>
        </div>
        <Link to="/pokemon-list" id="link-list-pokemon">
          Criar minha lista
        </Link>
      </div>
      <hr />
      <div className="user-card-body">
        <p className="title">Pokemon Favoritos</p>

        <div className="user-pokemon-favorites-area">

          {pokemons.map((pokemon: PokemonShareDisplayProps) => (
            <PokemonShareDisplay
              key={pokemon.number}
              name={pokemon.name}
              number={pokemon.number}
              imagePixel={pokemon.imagePixel}
              imageArt={pokemon.imageArt}
              poketypes={pokemon.poketypes}
            />
          ))}

        </div>
      </div>
    </div>

  )
}

export default PokemonShare
