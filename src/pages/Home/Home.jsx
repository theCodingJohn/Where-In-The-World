import React, { useEffect, useContext, useRef, useState } from 'react'
import axios from "axios"
import Card from '../../components/Card/Card'

import {DataContext} from "../../context/DataContext"

const Home = () => {
  const { data, setData } = useContext(DataContext);
  const [region, setRegion] = useState("all");
  const cardRef = useRef(null);

  // Search Feature
  const search = (e) => {
    let value = e.target.value.toLowerCase();
    const arrayCards = cardRef.current.childNodes;
    arrayCards.forEach(card => {
      if (card.childNodes[1].firstChild.textContent.toLowerCase().indexOf(value) !== -1) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    })
  }

  // Filter Feature
  const filter = (e) => {
    let value = e.target.value;
    setRegion(value);
  }

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://restcountries.eu/rest/v2/${region === "all" ? "all" : `region/${region}`}`); 
        localStorage.setItem("data", JSON.stringify(res.data));
        setData(res.data);
      } catch (e) {
        console.log(e)
      }
    }
    fetchData();
  }, [region])

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('data')) || [];
    setData(localData);
  }, [])

  const cardItems = data.map((el) => <Card key={el.name} card={{title: `${el.name}`, population: `${el.population}`, region: `${el.region}`, capital: `${el.capital}`, flag: `${el.flag}`}}/>)
  return (
    <main className="container">
      <form className="input-container">
        <input onChange={search} className="searchBar input" type="text" placeholder="Search for a country..." />
        <select className="filterBar input" onChange={filter}>
          <option value="all">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </form>
      <div ref={cardRef} className="container card-container">
        {cardItems}
      </div>
    </main>
  )
}

export default Home
