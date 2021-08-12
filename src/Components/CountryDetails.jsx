import { prettyDOM } from '@testing-library/react'
import CountriesJSON from "../countries.json";
import {Link } from "react-router-dom";
import React, { Component } from 'react'
import axios from "axios";

export class CountryDetails extends Component{
    constructor(props){
        super(props);
        this.id = props.match.params.id;
        this.state={country:null,countries:null}
    }
    
    
  componentDidMount(){
    axios.get(`https://restcountries.eu/rest/v2/alpha/${this.id}`)
      .then((response)=>{
        this.setState({country:response.data,});
            axios.get("https://restcountries.eu/rest/v2/all")
            .then((response)=>{
            this.setState({countries:response.data,})
            })
            .catch((error)=>{console.log(error)})
      })
      .catch((error)=>{console.log(error)})
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (prevProps.match.params.id !== this.props.match.params.id) {
    console.log("Iam called")
      axios
        .get(
          `https://restcountries.eu/rest/v2/alpha/${this.props.match.params.id}`
        )
        .then((response) => {
          this.setState({
            country:response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render(){
    if(this.state.country===null ||this.state.countries===null) return <h2>Loading...</h2>
    return (
        
        <div className="col-7">
            <h1>{this.state.country.name}</h1>
            <table className="table">
              <thead></thead>
              <tbody>
                <tr>
                  <td style={{width:"30%"}}>Capital</td>
                  <td>{this.state.country.capital[0]? this.state.country.capital[0] : "No Capital"}</td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td>
                  {this.state.country.area} km
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>Borders</td>
                  <td>
                    <ul className="borderList">
                      {
                          (this.state.country===null) ? <span>No borders, it is an island</span> : this.state.country.borders.map((border)=>{
                                 return <li key={border}><Link to={"/"+border}>{this.state.countries.find((country)=>{return country.alpha3Code===border}).name}</Link></li>;
                         })
                          }
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    )
  }



    
}

export default CountryDetails