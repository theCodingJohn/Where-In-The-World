import React, { useEffect, useContext } from 'react'
import axios from "axios"
import Card from '../../components/Card/Card'

import {DataContext} from "../../context/DataContext"

const Home = () => {
  const {data, setData} = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://restcountries.eu/rest/v2/all"); 
        localStorage.setItem("data", JSON.stringify(res.data));
        setData(res.data);
      } catch (e) {
        console.log(e)
      }
    }
    getData();
  }, [])

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('data')) || [];
    setData(localData);
  }, [])

  const cardItems = data.map((el) => <Card key={el.name} card={{title: `${el.name}`, population: `${el.population}`, region: `${el.region}`, capital: `${el.capital}`, flag: `${el.flag}`}}/>)
  return (
    <main className="container">
      <form className="input-container">
        <input className="searchBar input" type="text" placeholder="Search for a country..." />
        <select className="filterBar input">
          <option>Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </form>
      <div className="container card-container">
        {cardItems}
      </div>
    </main>
  )
}

export default Home
