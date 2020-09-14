import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import pokeballImg from '../../assets/images/pokeball.png'

const PokemonShare = (): ReactElement => {
  const params = new URLSearchParams(window.location.search)
  const [userName, setUserName] = useState('')
  const [pokemonNumbers, setPokemonNumbers] = useState<string[]>([])
  useEffect(() => {
    // http://localhost:3000/pokemon-share?name=Douglas%20Thee&p=1&p=2&p=3
    const paramsURL = params.toString().split('&p=')
    const name = paramsURL[0].replace('name=', '').replace('+', ' ')
    const pokemon = paramsURL.slice(1)
    setUserName(name)
    setPokemonNumbers(pokemon)
  }, [])
  return (
    <>
      {/* <ul>
        <li>{userName}</li>
        {pokemonNumbers.map((element: string) => (
          <li key={element}>{element}</li>
        ))}
      </ul> */}
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

            <div className="favorite-box">
              <img
                className="image-pokemon-pixels"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
                alt="pokemon"
              />

              <div className="pokemon-details">
                <p>Pikachu</p>
                <p>Number: 25</p>
                <p>Type: eletric</p>
              </div>

              <img
                className="image-pokemon-art"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="pokemon"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default PokemonShare
