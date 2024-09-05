import React from "react";

const ColorSettings = ({setBG}) => {
    return (
    <div className = "menu">
      <div className = "menu-trigger">WEEHOO</div>
      <div style={{"display" : "inline-flex", "flex-direction" : "column"}}>
        <button onClick = {setBG("blue_wall")}><div><img src="images/blue_wall" alt="blue wall img"/></div></button>
        <button onClick = {setBG("lavender_wall")}><div><img src="images/lavender_wall" alt="lavender wall img"/></div></button>
        <button onClick = {setBG("pink_wall")}><div><img src="images/pink_wall" alt="pink wall img"/></div></button>
        <button onClick = {setBG("green_wall")}><div><img src="images/green_wall" alt="green wall img"/></div></button>
        <button onClick = {setBG("brown_wall")}><div><img src="images/brown_wall" alt="brown wall img"/></div></button>
      </div>
    </div>
  
    );
  }

  export default ColorSettings;