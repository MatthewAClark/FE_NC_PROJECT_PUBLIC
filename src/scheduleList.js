import React, { Component } from 'react'
import ScheduleItem from './scheduleItem'
//import Input from './input'


class ScheduleList extends Component {
    state = {
        scheduleData: [],

    }


    componentDidMount() {

        //Display all articles on first load
        let fetchUrl;
        // if (this.props.topicId) {
        //     fetchUrl = `http://localhost:3000/api/topics/${this.props.topicId}/articles`

        // } else { 
            fetchUrl = "http://localhost:3000/api/db/schedules/?departure_time_from=13:00&departure_time_to=15:00"
        // }
            fetch(fetchUrl)

                .then(res => {
                    return res.json();
                })
                .then(body => {
                    this.setState({ scheduleData: body })

                })
    }

    addPostToDOM = (newPost) => {
      this.setState({
           scheduleData: [...this.state.scheduleData, newPost]
       })
   
    }

    


    render() {
        return (
            <div>
            <h2>Next trains departing</h2>
                {this.state.scheduleData.map(schedule => {
                    return (
                        <div key={schedule._id}>
                            <ScheduleItem schedule={schedule}/>
                            {/* <h5><a href={"/articles/" + article._id}>{article.title}</a></h5>
                       
                        
                        <p><a href={"/topics/" + article.belongs_to._id + "/articles"}>{article.belongs_to.title}</a></p> */}
                        </div>
                    )
                })}

                {/* <Input addPostToDOM={this.addPostToDOM} state={this.state}/> */}

            </div>
        )

    }
}



export default ScheduleList 