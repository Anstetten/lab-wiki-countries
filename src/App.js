import logo from './logo.svg';
import './App.css';
import NavBar from "./Components/Navbar";
import CountriesList from "./Components/CountriesList";
import CountryDetails from "./Components/CountryDetails";
import CountriesJSON from "./countries.json";
import { Switch, Route, NavLink } from "react-router-dom";
import React, { Component } from 'react'
import axios from "axios";

export class App extends Component {

  state={
    countries: null,
  }

  componentDidMount(){
    axios.get("https://restcountries.eu/rest/v2/all")
      .then((response)=>{
        console.log("dataReceived");
        console.log(response.data);
        this.setState({countries:response.data,})
      })
      .catch((error)=>{console.log(error)})
  }

  render(){

    if(this.state.countries===null) return <h1>Loading...</h1>

    return (
      <div className="App">
        <NavBar></NavBar>
        <div className="mainWrapper">
        <CountriesList countries={this.state.countries}/>
        <Switch>
        <Route exact path="/:id" hahaha="hahaha" component={CountryDetails} />
        </Switch>
        </div>
      </div>
    );
  }
  
}

export default App;
