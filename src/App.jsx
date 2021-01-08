import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/Home/Home";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </Router>
  )
}

export default App

