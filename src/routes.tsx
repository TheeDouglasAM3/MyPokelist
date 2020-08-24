import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home'
import PokemonList from './pages/PokemonList'

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/pokemon-list" component={PokemonList} exact />
    </BrowserRouter>
  )
}

export default Routes
