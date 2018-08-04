import React, { Component } from "react";
import DepartureItem from './departureItem'


//const DepartureBoard = (props) => {
class DepartureBoard extends Component {

    state = {
        routes: []
    }

    componentDidMount() {

        // fetch current time
        new Date().getTime();
        const dateTime = new Date(Date.now())
        //const hours = dateTime.getHours()
        const minutes = dateTime.getMinutes()
         const hours = 13
        let hours_limit = hours + 2
        if (hours > 21) hours_limit = 23
        // Display all stations from db on first load
        let fetchUrl;
        // console.log('compononetDidmoutn within app')
        fetchUrl = `http://localhost:3000/api/db/schedules/time/routes/?from=${hours}:${minutes}&to=${hours_limit}:${minutes}`
        fetch(fetchUrl)
            .then(res => {
                return res.json();
            })
            .then(schedules => {
                let fetchUrl
                  fetchUrl = `http://localhost:3000/api/db/stations/`
                  fetch(fetchUrl)
                    .then(res => {
                        return res.json();
                    })
                    .then(allStations => {

                // Group schedules by route ID
               // const ids = {}
                const startIds = []
                const endIds = []
                const routeIds = []
                schedules.forEach(elem => {
                    if (startIds.indexOf(elem.starting_station) === -1) {
                        startIds.push(elem.starting_station)
                    }
                    if (endIds.indexOf(elem.finish_station) === -1) {
                        endIds.push(elem.finish_station)
                    }
                    if (routeIds.indexOf(elem.route_id) === -1) {
                        routeIds.push(elem.route_id)
                    }
                })

                // 
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
                  
                   // })
                
                }
                console.log(routes)
                this.setState({ routes: routes })

                // Fetch all stations
         
                    })
            })

    }



    render() {



        // let indexSort=0
        // while(indexSort)
        // scheduleItems.push(this.state.schedules.filter(elem =>{
        //     return (this.state.schedules[indexSort].route_id === elem.route_id)
        // }))
        // indexSort=scheduleItems.length
        if (this.state.routes.length > 0) {


            return (
                <div class="">
                    <h2 class="title is-2">Departures</h2>
                    {this.state.routes.map((route, i) => {

                        return (
                            <div key={i}>
{console.log(route)}
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