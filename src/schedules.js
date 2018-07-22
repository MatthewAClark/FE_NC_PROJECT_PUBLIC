import React, {Component} from "react";

class Schedules extends Component {

    state = {
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

    render() {
        return( 
            <div> 
            {this.state.schedules.map((schedule, i) => {
              return (
                <div key={i}>
               <table>
                   <tbody>
                       <tr>
                <td>{schedule.departure_time}</td><td>{schedule.train_arrival_destination}</td>
                </tr>
                </tbody>
                </table>
            <button>Delete</button>
    
            
            </div>
              )
            })}
            <button>Fetch new times</button>
            </div>
        )
    }

}

export default Schedules;