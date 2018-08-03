import React, { Component } from "react";
import Departures from './departures'

class DepartureItem extends Component {

    state = {
        routes: []
    }

    componentDidMount() {

        //Display all stations from db on first load
        let fetchUrl;
        // Fetch all routes
        fetchUrl = `http://localhost:3000/api/db/routes/start/${this.props.station.station_id}`

        fetch(fetchUrl)

            .then(res => {
                return res.json();
            })
            .then(body => {
                console.log(body)
                this.setState({ routes: body })

            })

    }



    render() {
        if (this.state.routes.length > 0) {
            return (
                <div class="card departureItem">

                    <h3 class="title is-3">{this.props.station.station_name}</h3>
                    {this.state.routes.map((route, i) => {
                        return (
                            <div class="card" key={i}>
                                <h4 class="title is-4">to {route.station_name}</h4>
                                <Departures route_id={route.route_id} station_code={this.props.station.station_code} />
                            </div>)
                    })}

                </div>
            )
        } else return (<div></div>)
    }


}





export default DepartureItem;