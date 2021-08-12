import React from 'react'
import {NavLink} from "react-router-dom";

function CountriesList(props) {

    let countries = props.countries.sort((a,b)=>{
        return a.name.localeCompare(b.name);
    })

    const divStyle = {
        maxHeight: '90vh',
        overflow: 'scroll',
      };
    return (<div className="container">
        <div className="row">
          <div className="col-5" style={divStyle}>
            <div className="list-group">
                {countries.map((country)=>{
                    return <NavLink key={country.alpha3Code} to={`/${country.alpha3Code}`}
                                    className="list-item" 
                                    activeClassName="selected">
                                        <img className="miniFlag" src={`https://www.countryflags.io/${country.alpha2Code}/flat/64.png`} alt="flag"></img>{country.name}</NavLink>
                })}
                              
            </div>
          </div>
        </div>
    </div>
    )
}

export default CountriesList
