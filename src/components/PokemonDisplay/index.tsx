import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export interface PokemonDisplayProps {
  name: string
  number: number
  image: string
  poketypes: string
  isFavorite: boolean
}

const PokemonDisplay: React.FC<PokemonDisplayProps> = ({
  name, number, image, poketypes, isFavorite,
}) => (
  <div className={isFavorite ? 'pokemon-area' : 'pokemon-area pokemon-favorited'}>
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

PokemonDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  poketypes: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
}

export default PokemonDisplay
