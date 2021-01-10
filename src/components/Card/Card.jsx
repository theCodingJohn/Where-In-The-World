import React from 'react'
import {Link} from 'react-router-dom'

const Card = ({card}) => {
  return (
    <Link className="card">
      <div className="card__img" style={{background: `url(${card.flag}) no-repeat center`, backgroundSize: "cover"}}></div>
      <div className="card__desc">
        <h2 className="card__title">{card.title}</h2>
        <p className="card__item"><span className="card__item--title">Population:</span> {card.population}</p>
        <p className="card__item"><span className="card__item--title">Region:</span> {card.region}</p>          <p className="card__item"><span className="card__item--title">Capital:</span> {card.capital}</p>
      </div>
    </Link>
  )
}

export default Card
