import React, { Component } from 'react';
//import ArticlePage from './articlePage'
import HomePage from './home'
import StationManagement from './stations'
import Schedules from './schedules'
import Station from './Station'
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css'

// Load stations state - accessable to all components
class App extends Component {
  state = {
    stations: []
  }


// Fetch all stations from backend DB
  componentDidMount() {
    //Display all stations from db on first load
    let fetchUrl;
    fetchUrl = "http://localhost:3000/api/db/stations/"
    fetch(fetchUrl)
        .then(res => {
            return res.json();
        })
        .then(body => {
            this.setState({ stations: body })
        })
}


// Update state with new station added
  addToDOMStation = (data) => {
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
            <section class="hero is-primary">
            <div class="hero-body">
            <div class="container">
            <h1 class="title">Personal Train App</h1>
            <nav class="navbar">
              <Link class="navbar-item" to="/">Home</Link>
              <Link class="navbar-item" to="/stations">Station Management</Link>
              </nav>
              </div>
              </div>
              </section>
          </header>

{/*Home page which displays departures*/}

          <Route exact path="/" render={(props) => (
          <HomePage {...props} stations={this.state.stations}/> )}/>

          <Route exact path="/stations" render={(props) => (
          <StationManagement {...props} stations={this.state.stations} addToDOMStation={this.addToDOMStation}/> )}/>

          <Route path="/stations/:station_id/schedules/" render={(props) => (<Schedules route_id={this.props.route.route_id} station_code={this.state.station.station_code} dest_station_code={this.props.route.station_code}/>)}/>

          {/* <Route exact path="/stations/:station_id" render={(props) => (
          <Station {...props} stations={this.state.stations}/> )}/> */}

  <Route exact path="/stations/:station_id" render={(props) => (
          <Station {...props} stations={this.state.stations} /> )}/>

        </div>
      </ BrowserRouter>
    );
  }
}

export default App;