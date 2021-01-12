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

  const borderLinks = borders.map(el => <a className="countryWrapper" key={el.name} href={`/${el.name}`}><p>{el.name}</p></a>)

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
      <Link className="backButton-wrapper" to="/">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" class="svg-inline--fa fa-arrow-left fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
        <p className="backButton">Back</p>
      </Link>
      <div className="details">
        <div className="flag" style={{ background: `url(${countryData.flag}) no-repeat center`, backgroundSize: "cover" }}></div>
        <div className="desc">
          <h2>{countryData.name}</h2>
            <p><span className="desc__title">Native Name:</span> {countryData.nativeName}</p>
            <p><span className="desc__title">Population:</span> {new Intl.NumberFormat().format(countryData.population)}</p>
            <p><span className="desc__title">Region:</span> {countryData.region}</p>
            <p><span className="desc__title">Sub Region:</span> {countryData.subregion}</p>
            <p><span className="desc__title">Capital:</span> {countryData.capital}</p>    
            <p><span className="desc__title">Top Level Domain:</span> {countryData.topLevelDomain}</p>
            <p><span className="desc__title">Currencies:</span> {countryData.currencies[0].name}</p>
            <p><span className="desc__title">Languages:</span> {countryData.languages[0].name}</p>
            <p className="borders"><span className="desc__title">Border Countries:</span> {countryData.borders.length > 0 ? borderLinks: "None"}</p>
        </div>
      </div>
    </main>
  )
}

export default Details
