import React, { Component } from "react";
import Station from './Station'
import NewStation from "./newStation"
import LiveDepartures from "./liveDepartures"
//import ListHeader from "./listHeader"

class StationTable extends Component {

    // Stations list stored in state
    state = {
        station_name: '',
        editClicked: false
    }

    // load any stations from database on load
    componentDidMount() {

    }
    // functions

    // add Station to db
    createStation = (event) => {
        event.preventDefault();


        // fetch new station from transportAPI
        
        fetch(`http://localhost:3000/api/live/station/${this.state.station_name}`)
            .then(res => {
                return res.json();
            })
            .then(stationData => {

                // post new station to db
                fetch(`http://localhost:3000/api/db/stations/`, {
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
                    //     console.log(data)
                    //    // if (res.status === 201) {
                    //         const newStations = this.props.stations.concat(data)
                    //         this.setState({
                    //             stations: newStations
                    this.props.addToDOMStation(data)
                          // })
                       // }
                    })


            })
        }

        // 
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

        // render code
        render() {

            return ( // a list
                <div className="column is-narrow listItem">

                    {/* {// Header of list
        }
        <ListHeader editButton={this.editButton} editClicked={this.state.editClicked} listName={this.props.listName} editHeader={this.props.editHeader} index={this.props.index} /> */}

                    {// Station items on the list
                    }

                    {/* Display current stations on table */}
                    <div className="stationItem">
                    {console.log(this.props)}
                        {this.props.stations.map((station, i) => {

                            return (
                                <div key={i}>
                            <Station stations={this.props.stations}/>
                           
               
                           {/* <LiveDepartures index={i} station_id={station.station_id} station_code={station.station_code}/> */}
                            </div>
                        )
                        })}


                        {/* Display new station on the list*/}
                        <div>
                            <NewStation handleStationName={this.handleStationName} createStation={this.createStation} buttonClicked={this.state.buttonClicked} toggleButton={this.toggleButton} />

                        </div>






                    </div>
                </div>
            );
        }
    }
    

    export default StationTable;