import React, { Component } from "react";
//import StationHeader from "./stationHeader" 





class Departures extends Component {

  state = {

    departures: ['test']
  }


  componentDidMount() {

    //Display all stations from db on first load
    let fetchUrl;

    fetchUrl = "http://localhost:3000/api/db/stations/"


    // fetch current time
    new Date().getTime();
    const dateTime = new Date(Date.now())
    const hours = dateTime.getHours()
    const minutes = dateTime.getMinutes()
    //console.log(dateTime)

    // fetch interested departures from db
    console.log(this.props.station_id)
    fetch(`http://localhost:3000/api/db/departures/all/${this.props.station_id}/?departure_time_from=${hours}:${minutes}&departure_time_to=${hours + 2}:${minutes}`)

      .then(res => {
        if (res.status === 404) return []
        return res.json();
      })
      .then(body => {
        console.log(body)
        this.setState({ departures: body })

      })
  }

  // Edit button for stations
  editButton = (event) => {
    this.setState({
      editClicked: !this.state.editClicked
    })
  }


  render() {
    //const station = (props) => {
    return (
      <div className="station">
        <table>
          <tr>
            <td>Departing</td><td>For</td><td>Train Destination</td>
          </tr>
          {this.state.departures.map((departure, i) => {

            return (
              <tr>
                <td>{departure.departure_time}</td><td>{departure.station_name}</td><td>{departure.train_arrival_destination}</td>
              </tr>
            )
    
          }
          )}
      </table>

        {// Header of list


          }<p>{this.props.station_name}</p>

          {/* <StationHeader editButton={this.editButton} editClicked={this.state.editClicked} stationName={this.props.stationName} editHeader={this.props.editHeader} index={this.props.index}/> */}
      </div>
        );
      }
    }
    
    
    
    
export default Departures