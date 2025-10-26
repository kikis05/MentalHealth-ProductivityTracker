import React from "react"
import {useState, useEffect} from "react"
import "../styles/Calendar.css"
import HealthTracker from "./HealthTracker"

const UpdateDisplayDate = ({updatesData}) => {

    const [updates, setUpdates] = useState({date: "", task_updates : [], health_updates : []})

    useEffect(() => {
        // setCurrentDate(updates[0].date)
        // console.log("in here")
        // console.log(updates)
        // for (const update of updates) {
        //     console.log(update.date)
        //     if (update.date != currentDate) {  
        //         console.log("in here 2") 
        //        setTempInput({date: currentDate, upd: tempUpdateList})
        //        const tempList = list.concat(tempInput)
        //        setList(tempList)
        //        setCurrentDate(update.date)
        //     }
        //     const tempTemp = tempUpdateList.concat(update)
        //     setTempUpdateList(tempTemp)
        //     console.log("tempUpdateList " + tempUpdateList)
        // }
        // const temp = list.concat({tempInput})
        // setList(temp)
      }, [])

    const setZoomInBox = async (props) => {

        console.log("Updates are: ", props)
        setUpdates(props)
    }

    return <div class="container">
        <div className = "date-list">
            <strong>Dates</strong>
            <br></br>
            {updatesData.map((date) => (
                <div className="date-info" key= {date.date} onMouseEnter = {() => setZoomInBox(date)}>
                    {date.date}
                    <div className="square-container">
                        {date.task_updates.map((upd) => (
                                <div className = "square" style = {{background: upd.color, margin: "2px"}}></div>   
                        ))}
                    </div>
                </div>
                ))}
        </div>
        { updates.date != "" &&
        <div className = "date-list-details-container">
        <div className = "date-heading"> 
            <strong>{updates.date}</strong>
        </div>
        <div className = "date-list-details">
            <div className="task-details">
                <p><strong>Task Updates</strong></p>
                    {(updates.task_updates && updates.task_updates.map((update) => (
                        <div key = {update.id} >
                            <div className="task-heading"><div className = "square" style = {{background: update.color}}></div>
                            {update.taskName}
                            </div>
                            <p>{update.description}</p>
                        </div>
                    ))) }
            </div>
            <div className="health-details">
                <div className="date-heading">
                    <strong>Health Updates</strong>
                </div>
                <div className="health-list"> 
                    {(updates.health_updates && updates.health_updates.map((update) => (
                        <HealthTracker
                            moodIn = {update.mood} 
                            sleepIn= {update.sleep}
                            satisfactionIn={update.satisfaction}
                            stressIn={update.stress}
                            energyIn={update.energy} 
                            noteIn={update.notes}
                            appetiteIn={update.appetiteIn} 
                            timeIn = {update.time}
                            displayMode={true}></HealthTracker> 
                    ))) }
                </div>
            </div>
        </div>
        </div>
    }
    </div> 
}

export default UpdateDisplayDate