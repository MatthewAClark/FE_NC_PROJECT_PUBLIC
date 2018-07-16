import React, { Component } from 'react'


class ScheduleItem extends Component {





    render() {
        return (

            <div>
                <ul>
                    <li>  {this.props.schedule.train_departure_origin}</li>
                    <li> {this.props.schedule.departure_time}</li>
                    <li>{this.props.schedule.arrival_time}</li>
                    <li>  {this.props.schedule.train_arrival_destination}</li>
                    <li>  {this.props.schedule.train_operator}</li>
                </ul>


            </div>
        )
    }
}

export default ScheduleItem 