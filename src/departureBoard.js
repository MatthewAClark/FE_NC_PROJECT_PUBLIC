import React, { Component } from "react";
import DepartureItem from './departureItem'
import fetchUrl from './apiConfig'


//const DepartureBoard = (props) => {
class DepartureBoard extends Component {

    state = {
        routes: []
    }

    componentDidMount() {

        // fetch current time
        new Date().getTime();
        const dateTime = new Date(Date.now())
        const hours = dateTime.getHours()
        const minutes = dateTime.getMinutes()
        // const hours = 13

        // Fetch a window of schedules consisting of 2 hours worth of departures
        let hours_limit = hours + 2

        // so we don't overshoot over 24 hours
        if (hours > 21) hours_limit = 23

        // Display all routes over the next 2 hours from db on first load
         
        fetch(`${fetchUrl.routes}/?from=${hours}:${minutes}&to=${hours_limit}:${minutes}`)
            .then(res => {
                return res.json();
            })
            .then(schedules => {
                
                  fetch(fetchUrl.stations)
                    .then(res => {
                        return res.json();
                    })
                    .then(allStations => {

                // Group schedules by route ID. Get the start and end stations from table so we can display it in the browser
  
                        // Store the start and end station IDs in 2 arrays
                const startIds = []
                const endIds = []
                const routeIds = []
                schedules.forEach(elem => {
              
                    if (routeIds.indexOf(elem.route_id) === -1) {
                        startIds.push(elem.starting_station)
                        endIds.push(elem.finish_station)
                        routeIds.push(elem.route_id)
                    }
                })

                // Find the starting and finish stations from the db fetched earlier and match them to the routes
                const routes = []
                for (let i = 0; i < routeIds.length; i++) {
                    routes.push({
                        starting_station: allStations.find(elem => {
                        return (elem.station_id === startIds[i])}),

                        finish_station: allStations.find(elem => {
                           
                            return (elem.station_id === endIds[i])}),

                            departures: schedules.filter(elem => {
                               
                                return (elem.route_id === routeIds[i])
                            })
                        })
                  
                }
             
                this.setState({ routes: routes })

                    })
            })

    }



    render() {

        if (this.state.routes.length > 0) {


            return (
                <div class="">
                    <h2 class="title is-2">Departures</h2>
                    {this.state.routes.map((route, i) => {

                        return (
                            <div key={i}>

                                <DepartureItem route={route} />
                            </div>
                        )
                    })}

                </div>
            )

        } else
            return (<div>No times have been set</div>)


    }
}




export default DepartureBoard;