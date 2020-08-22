import React from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import homeImg from '../../assets/images/home.png'
import './styles.css'

function Home() {
  return (
    <div id="page-home">
      <div className="container" id="page-home-content">
        <div className="logo-container">
          <img src={logoImg} alt="MyPokélist" />
          <h2>Favorite seus Pokémon e compartilhe com os seus amigos!</h2>
        </div>

        <img
          src={homeImg}
          alt="Home"
          className="home-image"
        />

        <div className="buttons-container">
          <Link to="/" className="list-pokemon">
            Lista
          </Link>
          <Link to="/" className="fav-pokemon">
            Favoritos
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home
