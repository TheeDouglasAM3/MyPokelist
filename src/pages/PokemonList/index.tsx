import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

function PokemonList() {
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
        <div className="pokemon-area">
          pokemon
        </div>
      </div>

    </div>
  )
}

export default PokemonList
