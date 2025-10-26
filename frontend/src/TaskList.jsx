import React from "react"
import {useState, useEffect} from "react"
import UpdateDisplayTask from "./UpdateDisplayTask"
import "../styles/TaskList.css"
import moment from "moment"

const TaskList = ({taskItems, updatesByTask, updateCallback}) => {

    const [taskName, setTaskDescription] = useState("")
    const numberDays = 0

    const color = ""
    const [description, setUpdateDescription] = useState("")
    const [currentTaskId, setCurrentTaskId] = useState(0)
    const empty = ""
    const [listObject, setListObject] =  useState(null)

    const [modalOpen, setModalOpen] = useState(false)


    useEffect(() => {
      }, [])
    const onSubmit = async (e) => {

        console.log("Came to onSubmit")
        e.preventDefault()

        const data = {
            taskName, 
            numberDays, 
            color
        }
        const url = "http://127.0.0.1:5000/create_task" 
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const error_message = await response.json()
            alert(error_message.message)
        } else {
            updateCallback()
        }
        setTaskDescription("")
    }

    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch (`http://127.0.0.1:5000/delete_task/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to Delete")
            }
        } catch (error) {
            console.error("Error in onDelete")
            alert(error)
        }
    }
    const increaseDays = async (id) => {
        try {
            const options = {
                method: "PATCH"
            }
            const response = await fetch (`http://127.0.0.1:5000/increase_task_counter/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to increase number of days")
            }
        }  catch (error) {
            console.error("Error in increaseDays")
            alert(error)
        }
        onSubmitUpdate(id)
    }

    const onSubmitUpdate = async (taskId) => {
        console.log("I got called")

        const date = moment().utc().local().format('ddd, DD MMM YYYY')
        
        if(date == "") {
            console.log("Date isn't dating" + d.toUTCString().substring(0,16))
        }
        const newData = {
            taskId,
            date,
            description,
            color, 
            taskName
        } 
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newData)
        }
        const response = await fetch(`http://127.0.0.1:5000/create_update/${taskId}`, options)
        if (response.status !== 201 && response.status !== 200) {
            const error_message = await response.json()
            alert(error_message.message)
        } else {
            updateCallback()
        }
        setUpdateDescription("")
    }

    const distinguishTask = async (e, taskId) => {
        setCurrentTaskId(taskId) 
        setUpdateDescription(e.target.value)
    }
    const setTaskBasedUpdate = (props) => {
        console.log("came to setTaskBasedUpdate" + props)
        setListObject(props)
        console.log(props)
    }

    return <div className="task-info-container">
        <div className="task-header">
        { listObject == null ? (<p>You're doing great! Click on the pins to see details.</p>) : 
                (updatesByTask.map((t) => (
                        (t.taskName == listObject) ? (
                            <>
                            <strong>{t.taskName}</strong>
                                {(t.upd) ? (t.upd.map((update) => (

                                        <div key = {update.id} style = {{ "display" : "flex", "flex-direction":"row", "gap":"20px"}}>
                                            <td><strong>{update.date}</strong></td>
                                            <br></br>
                                            <td>{update.description}</td>
                                        </div>
        
                                ))) : (
                                    <div></div>
                                )
                                }
                            </>
                        ) : (<div></div>)
                    ))
                )
        }
        </div>
        <div className="task-board">
            {taskItems.map((task) => (
                <div className="task-item" key={task.id}>
                    <button className = "task-pin" style = {{background: task.color, margin: "2px"}} onClick = {(e) => {setTaskBasedUpdate(task.taskName)}}></button>
                    <p><strong>{task.taskName}</strong></p>
                    <p>Days Worked On:</p>
                    <p><strong>{task.numberDays}</strong></p>
                    <input 
                        name = "description"
                        type="text"
                        value = {(task.id == currentTaskId) ? description : null }
                        onChange = {(e) => distinguishTask(e, task.id)}
                    />
                    <div>
                    <button onClick = {() => increaseDays(task.id)} >Add Update</button>
                    </div>
                    <button onClick = {() => onDelete(task.id)} className="task-complete">Task Complete</button>
                </div> 
                    ))}
        </div>
        <div className = "task-entry">
            <form onSubmit= {onSubmit}>  
                    <label htmlFor="listItemDescription">Add task:</label>
                    <input type="text" value = {taskName} onChange = {(e) => setTaskDescription(e.target.value)}/>
                    <button className="enter-button" type = "submit">Enter</button>
            </form>
        </div>
       
    </div> 
}

export default TaskList
