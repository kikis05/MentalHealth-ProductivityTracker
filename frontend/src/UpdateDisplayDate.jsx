import React from "react"
import {useState, useEffect} from "react"

const UpdateDisplayDate = ({dateData}) => {



    const [listObject, setListObject] = useState({date: "", upd : []})

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

        setListObject(props)
    }
    const setZoomInBoxMouseOut = async () => {


        // setListObject({date: "", upd : []})
    }

    return <div>

    <br />
    <br />
    <br />
    <section className = "main">
    <div className = "list" style = {{"height" : "600px"}}>
    <table style = {{"width" : "500px", "display": "flex", "flex-direction" : "row", "border": "0px solid"}}>
        <thead></thead>
        <tbody>
            {dateData.map((date) => (
                <tr key = {date.date} onMouseEnter = {() => setZoomInBox(date)} >
                    <td style = {{"text-align": "left"}}>{date.date}</td>
                    {date.upd.map((upd) => (
                        <td style = {{ "padding" : "0px", "text-align": "right", "width": "30px"}}>
                            <div className = "square" style = {{background: upd.color, margin: "2px"}}></div>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    <br />
    <div className = "list">
    <table style = {{"width" : "600px", "border": "0px solid"}}>
        <thead >{listObject.date}</thead>
        <tbody className = "scroll">
            {(listObject.upd) ? (listObject.upd.map((update) => (
                <tr key = {update.id} >
                    <td style = {{"width" : "35px"}}><div className = "square" style = {{background: update.color}}></div></td>
                    <td style = {{"text-align" : "left", "width" : "150px"}}>{update.taskName}</td>
                    <td style = {{"width" : "200px", "text-align" : "left"}}>Desc: {update.description}</td>
                </tr>

            ))) : (
                <div></div>
            )

            }

        </tbody>

    </table>
    </div>
    </section>
    </div> 
}

export default UpdateDisplayDate



//     <table className = "display">
//{ <thead>
/*<tr>
    <th>Productivity:</th>
</tr>
</thead>
<tbody>
    {updates.map((update) => (
        <tr key = {update.id} onMouseEnter = {() => setZoomInBox(update)} onMouseLeave = {() => setZoomInBoxMouseOut()} >
            <td>{update.date}</td>
            <td><div className = "square" style = {{background: update.color}}></div></td>
            <td>{update.taskName}</td>
            <td>{update.description}</td>
        </tr>
    )) 
    }
</tbody>
</table>
<table className = "detail" >
<thead></thead>
<tbody>
    <tr>
        <td>{dateDisplay}</td>
        <td><div className = "square" style = {{background: colorDisplay}}></div></td>
        <td>{taskNameDisplay}</td>
        <td>{descriptionDisplay}</td>
    </tr>
</tbody>
//</table>*/