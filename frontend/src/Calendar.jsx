import React, { useDebugValue, useEffect, useState } from 'react'
import UpdateDisplayDate from './UpdateDisplayDate'
import Navigation from './Navigation'
import UpdateDisplayTask from './UpdateDisplayTask'
import ColorSettings from './ColorSettings'


function Calendar () {

    const [listOfUpdatesByDate, setListD] = useState([])
    const [listOfUpdatesByTask, setListT] = useState([])

    const [backgroundImage, setBG] = useState("green_wall")

    useEffect(() => {
        fetchTaskUpdatesByDate()
        fetchTaskUpdatesByTask()
      }, [])

    const fetchTaskUpdatesByDate = async () => {
        const response = await fetch("http://127.0.0.1:5000/task_updates_by_date")
        const data = await response.json()
        if (data.taskUpdates != "No updates yet") {
          setListD(data.taskUpdates.reverse())
          console.log(data.taskUpdates)
        }
      }
      const fetchTaskUpdatesByTask = async () => {
        const response = await fetch("http://127.0.0.1:5000/task_updates_by_task")
        const data = await response.json()
        if (data.taskUpdates != "No updates yet") {
          setListT(data.taskUpdates.reverse())
          console.log(data.taskUpdates)
        }
      }

//   const onUpdate = () => {
//     fetchTaskUpdatesByDate()
//   }
  return (
   <div style = {{"background-image" : "url(" + "images/" + backgroundImage + ".png\")"}}>
        <Navigation></Navigation>
        <div className = "title"><h2>Calendar</h2></div>
        <br />
        <br />
        <UpdateDisplayDate dateData = {listOfUpdatesByDate}></UpdateDisplayDate>
    </div> 
  );
}

export default Calendar