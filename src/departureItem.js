import React, { Component } from "react";
import Departures from './departures'


class DepartureItem extends Component {

//     state = {
//         stationData: []
//     }

//     componentDidMount() {

//         //Display all stations from db on first load
//         let fetchUrl;
//       //  Fetch all routes
//         fetchUrl = `http://localhost:3000/api/db/routes/start/${this.props.routeItem.route_id}`

//         fetch(fetchUrl)

//             .then(res => {
//                 return res.json();
//             })
//             .then(body => {
//                 console.log(body)
//                 this.setState({ stationData: body })
// console.log(this.props.routeItem)
//             })

//     }



    render() {
       // if (this.state.routes.length > 0) {
            return (
                <div class="card departureItem">
 {console.log(this.props.route)}
                    <h4 class="title is-4">{this.props.route.starting_station.station_name} to {this.props.route.finish_station.station_name}</h4>

                     <div class="card">
                    <table class="table">

                        <tbody>
                            <tr>
                                <td>Departure time</td><td>Train Destination</td><td>Status</td>
                            </tr>
                    {this.props.route.departures.map((departure, i) => {
                        return (
                            
                           
                                
                                <tr key={i}>
                                        <td>{departure.departure_time}</td><td>{departure.train_arrival_destination}</td><td>{departure.status}</td>
                                    </tr>
                                
                                )
                    })}
                    </tbody>
                    </table>
                </div>
                            </div>
                
            )
      //  } else return (<div></div>)
    }


}





export default DepartureItem;