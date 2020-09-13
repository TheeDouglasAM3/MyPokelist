import React, { ReactElement, useEffect } from 'react'

import './styles.css'

const PokemonShare = (): ReactElement => {
  const params = new URLSearchParams(window.location.search)
  useEffect(() => {
    // http://localhost:3000/pokemon-share?name=Douglas%20Thee&p=1&p=2&p=3
    const numberFavPokemon = params.toString().split('&p=')
    console.log(numberFavPokemon)
  }, [])
  return (
    <>
      oi
    </>
  )
}

export default PokemonShare
