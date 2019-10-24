import React, { Component } from 'react';
import './App.css';
import SignInSide from "./components/Login.js"
import Acceuil from "./components/Acceuil.js"
import {Route,Switch} from "react-router-dom"
import {ProtectedRoute} from "./components/Protectedroute.js";


class App extends Component {


  render() {
    return (
      <div>
      <Switch>
      <Route exact path='/' component={SignInSide}></Route>
      <ProtectedRoute exact path="/home" component={Acceuil}></ProtectedRoute>
      <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
      </div>
    );
  }
}

export default App;
