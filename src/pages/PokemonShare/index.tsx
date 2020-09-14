import React, { ReactElement, useEffect, useState } from 'react'

import './styles.css'

const PokemonShare = (): ReactElement => {
  const params = new URLSearchParams(window.location.search)
  const [userName, setUserName] = useState('')
  const [pokemonNumbers, setPokemonNumbers] = useState<string[]>([])
  useEffect(() => {
    // http://localhost:3000/pokemon-share?name=Douglas%20Thee&p=1&p=2&p=3
    const paramsURL = params.toString().split('&p=')
    const name = paramsURL[0].replace('name=', '')
    const pokemon = paramsURL.slice(1)
    setUserName(name)
    setPokemonNumbers(pokemon)
  }, [])
  return (
    <>
      <ul>
        <li>{userName}</li>
        {pokemonNumbers.map((element: string) => (
          <li key={element}>{element}</li>
        ))}
      </ul>
    </>
  )
}

export default PokemonShare
