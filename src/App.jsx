import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";

import {DataProvider} from "./context/DataContext"
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <DataProvider>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/:country" children={<Details/>}></Route>
        </DataProvider>
      </Switch>
    </Router>
  )
}

export default App

