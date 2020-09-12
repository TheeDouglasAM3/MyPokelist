import React, { ReactElement } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import PokemonList from './pages/PokemonList'
import PokemonFav from './pages/PokemonFav'

function Routes(): ReactElement {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/pokemon-list" component={PokemonList} exact />
      <Route path="/pokemon-fav" component={PokemonFav} exact />
    </BrowserRouter>
  )
}

export default Routes
