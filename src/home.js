import React, { Component } from 'react'
import ScheduleList from './scheduleList'
import StationSelector from './stationSelector'
//import Input from './input'

class HomePage extends Component {


    render () {
        return (
            <div>
                homepage
            
        {/* <ScheduleList  /> */}
        {/* <ArticleList articleData={this.state.articleData} /> */}
        {/* <Input updateState={this.updateState}/> */}
        <StationSelector/>
        
        </div>
        )
        
    }

}

export default HomePage 