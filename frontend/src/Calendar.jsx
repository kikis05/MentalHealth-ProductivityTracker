import React, {useEffect, useState } from 'react'
import UpdateDisplayDate from './UpdateDisplayDate'
import Navigation from './Navigation'
import "../styles/Calendar.css"


function Calendar () {

    const [listOfUpdates, setListUpdates] = useState([])

    useEffect(() => {
        fetchUpdatesByDate()
      }, [])

    const fetchUpdatesByDate = async () => {
        const response = await fetch("http://127.0.0.1:5000/updates_by_date")
        const data = await response.json()
        if (data.updates != "No updates yet") {
          setListUpdates(data.updates.reverse())
          console.log("updates", data.updates)
        }
      }

  return (
   <div>
        <Navigation></Navigation>
        <UpdateDisplayDate updatesData = {listOfUpdates}></UpdateDisplayDate>
    </div> 
  );
}

export default Calendar