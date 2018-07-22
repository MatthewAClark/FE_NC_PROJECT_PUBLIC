import React, { Component } from 'react';
//import ArticlePage from './articlePage'
import HomePage from './home'
import StationManagement from './stations'
import Station from './Station'
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  state = {
    stations: []
  }

  componentDidMount() {

    //Display all stations from db on first load
    let fetchUrl;

    fetchUrl = "http://localhost:3000/api/db/stations/"

    fetch(fetchUrl)

        .then(res => {
            return res.json();
        })
        .then(body => {
          console.log(body)
            this.setState({ stations: body })

        })
   
}


  addToDOMStation = (data) => {
    console.log(data)
    // if (res.status === 201) {
         const newStations = this.state.stations.concat(data)
         this.setState({
             stations: newStations
         })
  }

  // fetchAllStations = () => {
  //   let fetchUrl;

  //   fetchUrl = "http://localhost:3000/api/db/stations/"

  //   fetch(fetchUrl)

  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(body => {
  //       this.setState({ stations: body })
        
  //     })
  // }


  render() {
    return (
      < BrowserRouter>
        <div>
          <header>
            <h1>Personal Train App</h1>
          </header>
{console.log(this.state.stations)}

          <Route exact path="/" render={(props) => (
          <HomePage {...props} stations={this.state.stations}/> )}/>
          <Route exact path="/stations" render={(props) => (
          <StationManagement {...props} stations={this.state.stations} addToDOMStation={this.addToDOMStation}/> )}/>
          {/* <Route exact path="/stations/:station_code" render={(props) => (
          <Station {...props} stations={this.state.stations}/> )}/> */}

<Route exact path="/stations/:station_id" render={(props) => (
          <Station {...props} stations={this.state.stations} /> )}/>

        </div>
      </ BrowserRouter>
    );
  }
}

export default App;