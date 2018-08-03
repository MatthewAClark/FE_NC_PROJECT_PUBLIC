import React, { Component } from "react";
import Schedules from "./schedules";
import AddRoute from './addRoute';
import { BrowserRouter, Route, Link } from "react-router-dom";



class Station extends Component {

  state = {
    station_id : 0,
    routes: [],
    station: [],
    editClicked: false
  }

  createRoute = (event) => {
    event.preventDefault();

   
    fetch(`http://localhost:3000/api/db/routes/`, {
      headers: new Headers({ "Content-Type": "application/json" }),
      method: 'POST',
      body: JSON.stringify({
          starting_station: this.props.match.params.station_id,
          finish_station: this.state.station_id
      })
  })
  .then(res => {
      return res.json();
  })
  .then(route => {
    const newRoutes = this.state.routes.concat(route)
    this.setState({
        routes: newRoutes
    })
  })
   
    }
handleStationId = (event) => {
    const station_id= event.target.value
    this.setState({
        station_id
    })

}

// editHeader for Station component
editHeader = (text, index) => {
    const { stations } = this.state
    const newStations = [...stations]
    newStations[index].stationName = text
    this.setState({
        lists: newStations
    }, () => {
        console.log('state updated')
    })
}

// Toggle button for stations
toggleButton = (event) => {
    this.setState({
        buttonClicked: !this.state.buttonClicked
    })
}

// Edit button for lists
editButton = (event) => {
    this.setState({
        editClicked: !this.state.editClicked
    })
}


  componentDidMount() {
    fetch(`http://localhost:3000/api/db/stations/${this.props.match.params.station_id}`)
      .then(res => {
        return res.json();
      })
      .then(stationData => {
        this.setState({
          station: stationData
        })
      })
    fetch(`http://localhost:3000/api/db/routes/start/${this.props.match.params.station_id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data)
        this.setState({
          routes: data
        })
      })

  }



  render() {
    console.log(this.state.routes)
    return (
      <div>
        <h1 class="title is-2">{this.state.station.station_name}</h1>
        {/* <table>
          <tbody>
            <tr>
              <td>station Id</td><td>Station Name</td><td>Station code</td><td>station user type</td>
            </tr>
            <tr>
              <td>{this.state.station.station_id}</td><td>{this.state.station.station_name}</td><td>{this.state.station.station_code}</td><td>{this.state.station.user_station_type}</td>
            </tr>
          </tbody>
        </table> */}


 
            {this.state.routes.map((route, i) => {
              return (
                <div key={i}>
               {console.log(route)}
                <h2 class="title is-3">to {route.station_name}</h2><div>
                  {/* <button>Show times</button> */}
                  </div>
            
                  {/* <Link to={`/stations/${this.state.station.station_id}/schedules`}>Fetch New Schedules</Link> */}
            <Schedules route_id={route.route_id} station_code={this.state.station.station_code} dest_station_code={route.station_code}/>
            
            </div>
              )
            })}
            <AddRoute stations={this.props.stations} currentStation={this.state.station.station_id} handleStationId={this.handleStationId} createRoute={this.createRoute} buttonClicked={this.state.buttonClicked} toggleButton={this.toggleButton}/>
         
      </div>
    )
  }

}

export default Station;