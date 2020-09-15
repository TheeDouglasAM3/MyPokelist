import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { store } from 'react-notifications-component'

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
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const limitPokemon = 20

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
    if (favorites.length > 0) {
      favorites.forEach((favorite: number) => {
        if (favorite === number) setIsFavorite(true)
      })
    }
  }, [])

  function callNotification(message: string, type: any, duration = 3000) {
    if (!isNotificationVisible) {
      setIsNotificationVisible(true)
      store.addNotification({
        message,
        type,
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration,
          onScreen: true,
        },
      })
      setTimeout(() => setIsNotificationVisible(false), duration)
    }
  }

  function isFavoritesLimitReached() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}')
    return favorites.length >= limitPokemon
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

    if (isAlreadyFavorited) {
      favorites = favorites.filter((element) => element !== number)
      isAddFavoriteList = false
    } else if (isFavoritesLimitReached()) {
      isAddFavoriteList = false
      callNotification(`Você alcançou o limite de ${limitPokemon} pokémon favoritos`, 'danger')
    } else {
      favorites.push(number)
      isAddFavoriteList = true
      if (favorites.length === limitPokemon / 2) callNotification(`Você favoritou ${limitPokemon / 2} pokémon`, 'warning')
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
