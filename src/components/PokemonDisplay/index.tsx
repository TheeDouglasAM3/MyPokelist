import React from 'react'
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
}) => (
  <div className="pokemon-area">
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
}

export default PokemonDisplay
