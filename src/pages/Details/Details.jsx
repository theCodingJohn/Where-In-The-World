import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import axios from 'axios'

const Details = () => {
  // Fetch Borders Data
  const [borders, setBorders] = useState([]);
  // Get the data in local storage
  const data = JSON.parse(localStorage.getItem("data"));
  // Get the page /name
  let { country } = useParams();

  // Find the country to be used in this page 
  const countryData = data.find(el => el.name === country);

  const borderLinks = borders.map(el => <Link key={el.name} to={`${el.name}`}>{el.name}</Link>)

  useEffect(() => {
    const fetchData = async () => {
      let borderList = "";
      countryData.borders.forEach(el => borderList += `${el};`);
      try {
        const res = await axios.get(`https://restcountries.eu/rest/v2/alpha?codes=${borderList}`);
        setBorders(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData()
  }, [])

  return (
    <main className="container">
      <Link>
      </Link>
      <div className="details">
        <div className="flag" style={{ background: `${countryData.flag} no-repeat center`, backgroundSize: "cover" }}></div>
        <div className="desc">
          <h2>{countryData.name}</h2>
          <p>Native Name: {countryData.nativeName}</p>
          <p>Population: {new Intl.NumberFormat().format(countryData.population)}</p>
          <p>Region: {countryData.region}</p>
          <p>Sub Region: {countryData.subregion}</p>
          <p>Capital: {countryData.subregion}</p>
          <p>Top Level Domain: {countryData.topLevelDomain}</p>
          <p>Currencies: {countryData.currencies[0].name}</p>
          <p>Languages: {countryData.languages[0].name}</p>
          {countryData.borders.length > 0 && <p>Border Countries: {borderLinks}</p>}
        </div>
      </div>
    </main>
  )
}

export default Details
