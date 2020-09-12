import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

const PokemonFav = (): ReactElement => (
  <div id="page-pokemon-fav">
    <div className="navbar">
      <input
        id="input-link"
        type="text"
        placeholder="Link para compartilhar"
        readOnly
      />
      <Link to="/pokemon-list" id="link-list-pokemon" />
    </div>
  </div>
)

export default PokemonFav
