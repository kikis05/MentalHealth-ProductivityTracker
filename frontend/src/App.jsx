import { useState, useEffect } from 'react'
import '../styles/App.css'
import TaskList from './TaskList'
import Navigation from './Navigation'
import HealthTracker from './HealthTracker'


function App() {
  const [taskItems, setTaskItems] = useState([])
  const [listOfUpdatesByTask, setListT] = useState([])

  useEffect(() => {
    fetchTasks()
    fetchTaskUpdates()
    fetchTaskUpdatesByTask()
  }, [])

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

  const onUpdate = () => {
    fetchTasks()
    fetchTaskUpdates()
    fetchTaskUpdatesByTask()
    console.log("coming here")
  }

  return (
    <>
  <Navigation></Navigation>
  <div class="container">
    <div class="content">
      <div class="health-container">
        <HealthTracker></HealthTracker> 
      </div>
      <div class="task-container">
        <TaskList taskItems = {taskItems} updatesByTask = {listOfUpdatesByTask} updateCallback={onUpdate}/>
      </div>
    </div>
  </div>
  </>
  );
}


export default App
