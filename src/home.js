import React, { Component } from 'react'
// import ScheduleList from './scheduleList'
import DepartureBoard from './departureBoard'
//import Input from './input'

class HomePage extends Component {


    render () {
        return (
            <div>
                homepage
            
        {/* <ScheduleList  /> */}
        {/* <ArticleList articleData={this.state.articleData} /> */}
        {/* <Input updateState={this.updateState}/> */}
        
        {console.log(this.props.stations)}
        <DepartureBoard stations={this.props.stations}/>
        
        
        </div>
        )
        
    }

}

export default HomePage 