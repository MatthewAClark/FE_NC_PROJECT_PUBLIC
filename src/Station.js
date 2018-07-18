import React, { Component } from "react";
//import StationHeader from "./stationHeader" 


const editStation = (props) => {

}

  


class Station extends Component {

  state = {

    editClicked: false
  }

  // Edit button for stations
  editButton = (event) => {
    this.setState({
      editClicked: !this.state.editClicked
    })
  }


  render() {
//const station = (props) => {
    return (
      <div className="station">
        {// Header of list
      }<h3>{this.props.station_name}</h3>
      
      {/* <StationHeader editButton={this.editButton} editClicked={this.state.editClicked} stationName={this.props.stationName} editHeader={this.props.editHeader} index={this.props.index}/> */}
      
        {/* <button onClick = { (event) => {


    

          this.props.deleteStation(this.props.index)}}>Delete Station</button> */}
      </div>
    );
  }
}


export default Station;