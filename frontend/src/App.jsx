
//look into ErrorBoundary/errorElement

import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './TaskList'
import Navigation from './Navigation'
import ColorSettings from './ColorSettings'
import UpdateDisplayTask from './UpdateDisplayTask'


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [taskItems, setTaskItems] = useState([])
  const [updates, setUpdates] = useState([])

  const [listOfUpdates, setList] = useState([])
  const [currentDate, setCurrentDate] = useState("")
  const [tempInput, setTempInput] = useState({date: "", upd : []})
  const [tempUpdateList, setTempUpdateList] = useState([])

  const [listOfUpdatesByTask, setListT] = useState([])
  const [listOfUpdatesByDate, setListD] = useState([])
  const [backgroundImage, setBG] = useState("green_wall")
  useEffect(() => {
    fetchTasks()
    fetchTaskUpdates()
    fetchTaskUpdatesByDate()
    fetchTaskUpdatesByTask()
    //formatUpdatesByDate()
    //fetchStartDate()
  }, [])


  const fetchTaskUpdatesByDate = async () => {
    const response = await fetch("http://127.0.0.1:5000/task_updates_by_date")
    const data = await response.json()
    if (data.taskUpdates != "No updates yet") {
      setListD(data.taskUpdates.reverse())
      console.log(data.taskUpdates)
    }
  }
  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:5000/list")
    const data = await response.json()
    setTaskItems(data.taskList.reverse())
    console.log(data.taskList)
  }

  const fetchTaskUpdates = async () => {
    const response = await fetch("http://127.0.0.1:5000/task_updates")
    const data = await response.json()
    setUpdates(data.taskUpdates)
    console.log(data.taskUpdates)
   }

  const fetchTaskUpdatesByTask = async () => {
    const response = await fetch("http://127.0.0.1:5000/task_updates_by_task")
    const data = await response.json()
    if (data.taskUpdates != "No updates yet") {
      setListT(data.taskUpdates.reverse())
      console.log(data.taskUpdates)
    }
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }
  
  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    //closeModal()
    fetchTasks()
    fetchTaskUpdates()
    fetchTaskUpdatesByDate()
    fetchTaskUpdatesByTask()
    //formatUpdatesByDate()
    console.log("coming here")
  }

  return (<>
  <Navigation></Navigation>
  <div className = "title"><h2>My Tasks</h2></div>
  {/* <section className = "main" style = {{"position" : "fixed" , "top" : "200px", "left" : "100px"}}>
    <div>
      <div style = {{"height" : "500px", "width" : "200px", "background-color" : "blue", "margin" : "10px"}}>
      </div>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table>
                <thead>
                  <tr>
                    <th>A table within a table</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Content 1</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section> */}
  <TaskList taskItems = {taskItems} updatesByTask = {listOfUpdatesByTask} updateCallback={onUpdate}/>
  </>
  );
}


export default App
