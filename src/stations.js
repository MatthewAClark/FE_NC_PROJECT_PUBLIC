import React, { Component } from "react";
import NewStation from './newStation';

import fetchUrl from './apiConfig';
import { BrowserRouter, Route, Link } from "react-router-dom";

//const StationManagement = (props) => {
class StationManagement extends Component {

    state = {
        buttonClicked: false
    }

    createStation = (event) => {
        event.preventDefault();


        // fetch new station from transportAPI
        console.log(process.env.NODE_ENV)
        console.log(process.env.REACT_APP_API_URL)
console.log('fetching station', fetchUrl.liveStation)
        fetch(`${fetchUrl.liveStation}/${this.state.station_name}`)
            .then(res => {
                return res.json();
            })
            .then(stationData => {

                // post new station to db
                fetch(fetchUrl.postStation, {
                    headers: new Headers({ "Content-Type": "application/json" }),
                    method: 'POST',
                    body: JSON.stringify({
                        station_name: stationData.member[0].name,
                        station_code: stationData.member[0].station_code
                    })
                })
                    .then(res => {
                        return res.json();
                    })


                    // Add new station to DOM
                    .then(data => {

                        this.props.addToDOMStation(data)

                    })

            })
    }
    handleStationName = (event) => {
        const station_name = event.target.value
        this.setState({
            station_name
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

    render() {
        return (
           
                <div class="card">
                    <h1 class="title is-2">Station Management</h1>
                    <h3 class="title is-3">Stations</h3>
                

                    {this.props.stations.map((station, i) => {
                        return (
                            <div class="tag is-large" key={i}>
                            <div  >
                                <Link to={`/stations/${station.station_id}`}>{station.station_name}</Link>
                                {/* <StationItem/>          */}
                                
                            </div><button onClick = { (event) => {


    

this.props.deleteStation(i)}}>Delete Station</button>
                            </div>)
                            
                    })}
                    <div>
                    <NewStation handleStationName={this.handleStationName} createStation={this.createStation} buttonClicked={this.state.buttonClicked} toggleButton={this.toggleButton} />
</div>
                </div>
           
        )
    }


}





export default StationManagement;