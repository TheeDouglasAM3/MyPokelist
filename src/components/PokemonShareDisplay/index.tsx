import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export interface PokemonShareDisplayProps {
  name: string
  number: number
  imagePixel: string
  imageArt: string
  poketypes: string
}

const PokemonShareDisplay: React.FC<PokemonShareDisplayProps> = ({
  name, number, imagePixel, imageArt, poketypes,
}) => (
  <div className="favorite-box">
    <img
      className="image-pokemon-pixels"
      src={imagePixel}
      alt="pokemon"
    />

    <div className="pokemon-details">
      <p>{name}</p>
      <p>{`Number ${number}`}</p>
      <p>{`Type ${poketypes}`}</p>
    </div>

    <img
      className="image-pokemon-art"
      src={imageArt}
      alt="pokemon"
    />
  </div>
)

PokemonShareDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  imagePixel: PropTypes.string.isRequired,
  imageArt: PropTypes.string.isRequired,
  poketypes: PropTypes.string.isRequired,
}

export default PokemonShareDisplay
