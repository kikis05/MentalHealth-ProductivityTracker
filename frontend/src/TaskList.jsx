import React from "react"
import {useState, useEffect} from "react"
import UpdateDisplayTask from "./UpdateDisplayTask"

const TaskList = ({taskItems, updatesByTask, updateCallback}) => {

    const [taskName, setTaskDescription] = useState("")
    const numberDays = 0

    const color = ""
    const [description, setUpdateDescription] = useState("")
    const [currentTaskId, setCurrentTaskId] = useState(0)
    const empty = ""
    const [listObject, setListObject] =  useState("")


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

    // const decreaseDays = async (id) => {
    //     try {
    //         const options = {
    //             method: "PATCH"
    //         }
    //         const response = await fetch (`http://127.0.0.1:5000/decrease_task_counter/${id}`, options)
    //         if (response.status === 200) {
    //             updateCallback()
    //         } else {
    //             console.error("Failed to decrease number of days")
    //         }
    //     }  catch (error) {
    //         console.error("Error in decreaseDays")
    //         alert(error)
    //     }
    // }

    const onSubmitUpdate = async (taskId) => {
        console.log("I got called")

        const d = new Date()
        const date = d.toUTCString().substring(0,16)
        
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
        console.log(listObject)

        // console.log("COming to the fnc")
        // for (const task in updatesByTask) {
        //     if(task.taskName == props.taskName){
        //         console.log("coming here")
        //         console.log(task)
        //         setListObject(task)
        //         break;
        //     } 
        // }


    }
    return <div>
    {/* <section className = "main" style = {{"position" : "fixed", "left" : "50px", "top" : "150px", "display" : "inline-flex", "flexDirection" : "row", "flexWrap" : "wrap"}}> */}
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
        <div>
            <div className = "list" style = {{ "position" : "fixed", "width" : "300px", "height" : "400px"}}>
                <div>
                    {(listObject) ? (<h2>{listObject}</h2>) : (<h2>You're doing great! Click on the pins to see details.</h2>)}
                </div>
                <div style = {{"position" : "relative", "margin" : "10px", "overflow" : "scroll"}}>
                    {updatesByTask.map((t) => (
                            (t.taskName == listObject) ? (
                                <table key = {t.id} style = {{ "position" : "relative", "width" : "250px"}}>
                                            <tbody>
                                                {(t.upd) ? (t.upd.map((update) => (
                                                    <tr key = {update.id}>
                                                        <td>{update.date}</td>
                                                        <td>{update.description}</td>
                                                    </tr>
                                                ))) : (
                                                    <div></div>
                                                )
                                                }
                                            </tbody>
                                        </table>
                            ) : (<div></div>)
                        ))
                    }
                </div>
            </div>
        </div>
        <div style = {{"position" :  "fixed", "margin-right" : "5%", "overflow" : "scroll", "height" :"65%", "width": "99%", "left": "300px", "right" : "5%", "bottom" : "15%"}}>
            <table className = "all-note-display">
                <thead></thead>
                <tbody>
                    <tr>
                    {taskItems.map((task) => (
                        <td>
                            <table key = {task.id} style = {{"background": "#e8e7b5", "border" : "0px", "box-shadow" : "5px 5px 5px grey", "transform" : " rotate(5deg)"}}>
                                <thead></thead>
                                <tbody>
                                    <tr >
                                        <td id = "taskName"><button className = "pin" onClick = {(e) => {setTaskBasedUpdate(task.taskName)}} style = {{background: task.color, margin: "2px"}}></button><strong>{task.taskName}</strong><br/></td>
                                        </tr>
                                    <tr  >
                                        <td>Days Worked On:</td>
                                    </tr>
                                    <tr><td><h2><strong>{task.numberDays}</strong></h2></td></tr>
                                    <tr  >
                                        <td>
                                            <input 
                                                name = "description"
                                                type="text"
                                                value = {(task.id == currentTaskId) ? description : null }
                                                onChange = {(e) => distinguishTask(e, task.id)}
                                            />
                                            <button onClick = {() => increaseDays(task.id)}>+</button>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td>
                                            <button onClick = {() => onDelete(task.id)}>Task Complete</button>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>
                        </td>
                    ))}
                    </tr>
                </tbody>
            </table>
        </div>
    {/* </section> */}

        <br />
        <div className = "foo">
            <form onSubmit= {onSubmit}>  
                    <label htmlFor="listItemDescription">Add task:</label>
                    <input type="text" value = {taskName} onChange = {(e) => setTaskDescription(e.target.value)}/>
                    <button type = "submit">Enter</button>
            </form>
        </div>
        <div className = "base">&nbsp;</div>
    </div> 
}

export default TaskList

// {/* <button onClick = {() => decreaseDays(task.id)}>-</button> */}