import React, {Component} from "react";
import AddNewTimes from "./addNewTimes";

class Schedules extends Component {

    state = {
        fromTime: '',
        toTime: '',
        date: '',
        schedules: []
    }

componentDidMount() {
    fetch(`http://localhost:3000/api/db/schedules/route/${this.props.route_id}`)

      .then(res => {
       
        if (res.status === 404) return []
        return res.json();
      })
      .then(body => {
     
        this.setState({
            schedules: body
        })
        console.log(body)
    })
}

createSchedule = (event) => {
    event.preventDefault();

   console.log(this.props.station_code)
    fetch(`http://localhost:3000/api/live/station/route/${this.props.station_code}?destination=${this.props.dest_station_code}`, {
     

  })
  .then(res => {
      return res.json();
  })
  .then(schedules => {
    console.log(schedules)
//     const newRoutes = this.state.routes.concat(route)
    this.setState({
        schedules: schedules.departures.all
    })

  })
    }


handleFromDepartureTime = (event) => {
    const fromTime= event.target.value
    this.setState({
       fromTime
    })

}

handleToDepartureTime = (event) => {
    const toTime= event.target.value
    this.setState({
       toTime
    })

}

handleDate = (event) => {
    const date= event.target.value
    this.setState({
       date
    })

}

// editHeader for Station component
editHeader = (text, index) => {
    const { schedules } = this.state
    const newSchedules = [...schedules]
  //  newSchedules[index].stationName = text
    this.setState({
        lists: newSchedules
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

addSchedule = (index) => {
    fetch(`http://localhost:3000/api/db/schedules/`, {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: 'POST',
        body: JSON.stringify({
            "train_uid": this.state.schedules[index].train_uid,
            "train_departure_origin": this.state.schedules[index].origin_name,
            "train_arrival_destination": this.state.schedules[index].destination_name,
            "arrival_time": this.state.schedules[index].aimed_arrival_time,
            "departure_time": this.state.schedules[index].aimed_departure_time,
            "train_operator": this.state.schedules[index].operator_name,
            "route_id": this.props.route_id
        })
    })
    .then(result => console.log(result))
   // console.log(this.state.schedules[index])
}


    render() {
        return( 
            <div> 
            {this.state.schedules.map((schedule, i) => {
              return (
                <div key={i}>
               <table>
                   <tbody>
                       <tr><td>departure</td><td>destination</td></tr>
                       <tr>
                <td>{schedule.aimed_departure_time}</td><td>{schedule.destination_name}</td>
                </tr>
                </tbody>
                </table>
            <button onClick={ () => this.addSchedule(i)}>Add Schedule </button>
    
            
            </div>
              )
            })}
            <AddNewTimes handleDate={this.handleDate} handleFromDepartureTime={this.handleFromDepartureTime} handleToDepartureTime={this.handleToDepartureTime} createSchedule={this.createSchedule} buttonClicked={this.state.buttonClicked} toggleButton={this.toggleButton}/>
            </div>
        )
    }

}

export default Schedules;