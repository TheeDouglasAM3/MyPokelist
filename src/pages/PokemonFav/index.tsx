import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import PokemonDisplay, { PokemonDisplayProps } from '../../components/PokemonDisplay'

import './styles.css'

const PokemonFav = (): ReactElement => {
  const baseUrl = `http://${window.location.host}`
  const webUrl = 'https://my-pokelist.vercel.app/'
  const [pokemons, setPokemons] = useState<PokemonDisplayProps[]>([])
  const [userName, setUserName] = useState('')
  const [favPokemonStringLink, setFavPokemonStringLink] = useState('')
  const message = 'Veja meus pokémon favoritos em: '
  const completeUrl = `${webUrl}/pokemon-share?name=${userName}${favPokemonStringLink}`.replaceAll('&', '%26')
  
  const shareLinkFacebook = `https://www.facebook.com/sharer/sharer.php?u=${webUrl}&quote=${message}${completeUrl}`
  const shareLinkTwitter = `https://twitter.com/intent/tweet?text=${message}${completeUrl}`
  const shareLinkWhatsapp = `https://api.whatsapp.com/send?text=${message}${completeUrl}`


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
      <div className="navbar-fav">
        <input
          id="input-link-fav"
          type="text"
          value={`${baseUrl}/pokemon-share?name=${userName}${favPokemonStringLink}`}
          placeholder="Link para compartilhar"
          onFocus={(event) => event.currentTarget.select()}
          readOnly
        />
        {/* <div id="share-social-medias">
          <a href={shareLinkFacebook} className="btn-share-sm" id="sr-facebook" target="_blank" rel="noreferrer">f</a>
          <a href={shareLinkTwitter} className="btn-share-sm" id="sr-twitter" target="_blank" rel="noreferrer">t</a>
          <a href={shareLinkWhatsapp} className="btn-share-sm" id="sr-whatsapp" target="_blank" rel="noreferrer">w</a>
        </div> */}
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
