import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export interface PokemonDisplayProps {
  name: string
  number: number
  image: string
  poketypes: string
}

const PokemonDisplay: React.FC<PokemonDisplayProps> = ({
  name, number, image, poketypes,
}) => {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
    favorites.forEach((favorite: number) => {
      if (favorite === number) setIsFavorite(true)
    })
  }, [])

  function isFavoritesLimitReached() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
    return favorites.length >= 20
  }

  function updateFavoriteList() {
    let favorites = Object.values(JSON.parse(localStorage.getItem('favorites') || '{}'))
    let isAlreadyFavorited = false
    let isAddFavoriteList = true

    if (favorites.length > 0) {
      favorites.forEach((favorite) => {
        if (favorite === number) isAlreadyFavorited = true
      })
    }

    if (!isAlreadyFavorited && !isFavoritesLimitReached()) {
      favorites.push(number)
      isAddFavoriteList = true
    } else {
      favorites = favorites.filter((element) => element !== number)
      isAddFavoriteList = false
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
    return isAddFavoriteList
  }

  function updateColorPokemonArea(favorite: boolean) {
    setIsFavorite(favorite)
  }

  function handleFavoritePokemon() {
    const favorite = updateFavoriteList()
    updateColorPokemonArea(favorite)
  }

  return (
    <div
      className={isFavorite ? 'pokemon-area pokemon-favorited' : 'pokemon-area'}
      onClick={handleFavoritePokemon}
    >
      <p className="pokemon-name">
        {`#${number} ${name}`}
      </p>
      <div className="pokemon-image-area">
        <img
          className="pokemon-image"
          src={image}
          alt={name}
        />
      </div>
      <div className="pokemon-type">{poketypes}</div>
    </div>
  )
}
PokemonDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  poketypes: PropTypes.string.isRequired,
}

export default PokemonDisplay
