import React, { Component } from "react";

class Departures extends Component {

    state = {
        departures: []
    }

    componentDidMount() {


        // fetch current time
        new Date().getTime();
        const dateTime = new Date(Date.now())
        const hours = dateTime.getHours()
        const minutes = dateTime.getMinutes()
        // const hours = 22
        let hours_limit = hours + 2
        if (hours > 21) hours_limit = 23

        // fetch from schedules db

        fetch(`http://localhost:3000/api/db/schedules/route/${this.props.route_id}/?departure_time_from=${hours}:${minutes}&departure_time_to=${hours_limit}:${minutes}`)

            .then(res => {

                if (res.status === 404) return []
                return res.json();
            })
            .then(body => {

                this.setState({
                    departures: body
                })

        //                 fetch(`http://localhost:3000/api/live/stationtimes/${this.props.station_code}`)
        //                 .then(res => {
        //                   console.log('test', res.status)
        //                   if (res.status === 404) return []
        //                   return res.json();
        //                 })
        //                 .then(live => {
        //                  // this.setState({ departures: body })

        //                   // loop through departures
        //                     console.log('db',this.state.departures, 'live',live)

        //                  this.state.departures.forEach( (dep, index) => {
        //                     const liveDeparture = live.departures.all.find(status => {

        //                       return (status.train_uid === dep.train_uid)
        //                     })
        //         if(liveDeparture !== undefined) {
        //                     console.log(liveDeparture)
        //                     const departureUpdate = this.state.departures
        //                     departureUpdate[index].status = liveDeparture.status
        //                     this.setState({departures: departureUpdate})
        //                     if(liveDeparture.status === 'LATE') {

        //                     }
        //                     console.log(liveDeparture.status)
        //                 }
        //         })
        //     //    console.log('departure data',depData)
        //     })
        //     .then(status => {

        //     })
        //     .catch(err => console.log(err))

         })
        // .catch(err => console.log(err))
    }


    render() {
        if (this.state.departures.length > 0) {
            return (
                <div>
                    <table class="table">

                        <tbody>
                            <tr>
                                <td>Departure time</td><td>Train Destination</td><td>Status</td>
                            </tr>
                            {this.state.departures.map((dep, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{dep.departure_time}</td><td>{dep.train_arrival_destination}</td><td>{dep.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (<p>No schedules set up for this station</p>)
        }
    }

}


export default Departures;