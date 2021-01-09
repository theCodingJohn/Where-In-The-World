import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </Router>
  )
}

export default App

