import React from 'react'




const addNewTimes = (props) => {
    if (props.buttonClicked) {
        return (<form>
            {/* <input type="text" onChange={props.handleStationName} name="stationname" size="40" placeholder="Station name" /> */}
            <input type="submit" value="add" name="addStation" onClick={props.createSchedule} />
            
            
             <input type="time" onChange={props.handleFromDepartureTime}/>
             <input type="time" onChange={props.handleToDepartureTime}/>
             <input type="date" onChange={props.handleDate}/>

                   
                    <button onClick={props.toggleButton}>Close</button>
        </form>
        )
    } else {
        return <button onClick = {props.toggleButton}>New Times</button>
    }
}

export default addNewTimes;