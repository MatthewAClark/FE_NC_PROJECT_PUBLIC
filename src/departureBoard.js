import React, {Component} from "react";
import DepartureItem from './departureItem'


const DepartureBoard = (props) => {
// class DepartureBoard extends Component {



//    render() {
        return (
            <div class="">
         <h2 class="title is-2">Departures</h2>

    
        {props.stations.map( (station, i) => {
            return(
         <div key={i}>
     
          <DepartureItem station={station} />
          </div>)
        })}
    
   </div>
    )
    //   }
       

}


 


export default DepartureBoard;