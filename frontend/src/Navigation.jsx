import React from 'react'
import {Link} from "react-router-dom"

const Navigation = () => {
  return (<div className = "head">
    <div><h2>Navigation</h2></div>
    <ul>
        <li><Link to="/Calendar">My Calendar</Link></li>
        <li><Link to= "/">My Projects</Link></li>
    </ul>
    </div>
  )
}

export default Navigation