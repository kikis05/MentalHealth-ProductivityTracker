import "../styles/HealthTracker.css"
import {useState, useEffect} from "react"
import moment from 'moment';

const HealthTracker = ({moodIn = "", sleepIn = 6, satisfactionIn = "", stressIn = "", energyIn = "", appetiteIn = "", noteIn = "", timeIn = null, displayMode = false }) => {
    const numbers = [0,1,2,3,4,5]
    const [mood, setMood] = useState(moodIn)
    const [sleep, setHoursSleep] = useState(sleepIn)
    const [satisfaction, setSatisfaction] = useState(satisfactionIn)
    const [stress, setStressLevel] = useState(stressIn)
    const [energy, setEnergy] = useState(energyIn)
    const [appetite, setAppetite] = useState(appetiteIn)
    const [note, setNote] = useState(noteIn)
    const dateFormatted = moment().utc().local().format('ddd, DD MMM YYYY')

    const onSubmit = async (event) => {
        event.preventDefault()
        console.log("Came to onSubmit")
        console.log(dateFormatted,
            mood,
            satisfaction,
            sleep,
            stress, 
            energy,
            appetite,
            note)
        const time = `${moment().get('hour')}:${moment().get('minute')}`;
        const data = {
            dateFormatted,
            time,
            mood,
            satisfaction,
            stress, 
            energy,
            appetite,
            sleep,
            note
        }
        const url = "http://127.0.0.1:5000/create_health_update" 
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
            clear()
        }
    }
    const clear = () => {
        setMood('')
        setSatisfaction('')
        setStressLevel('')
        setEnergy('')
        setAppetite('')
        setNote('')
    }
 
    return (
        <div className="main">
            <div className="content-container">
                    <p className = "labels" ><strong>{displayMode ? timeIn : dateFormatted}</strong></p>
                    <p className = "labels" >Mood</p>
                    <div className = "button-selector">
                        {numbers.map((val) => (
                            <button className ={val === mood ? "button-selection-selected" : "button-selection"} key={val} onClick={(e) => setMood(val)} disabled = {displayMode && "disabled"}>{val}</button>
                        ))}
                    </div>
                    <p className = "labels" >Satisfaction</p>
                    <div className = "button-selector">
                        {numbers.map((val) => (
                            <button className ={val === satisfaction ? "button-selection-selected" : "button-selection"} key={val} onClick={(e) => setSatisfaction(val)} disabled = {displayMode && "disabled"}>{val}</button>
                        ))}
                    </div>
                    <p className = "labels" >Stress</p>
                    <div className = "button-selector">
                        {numbers.map((val) => (
                            <button className ={val === stress ? "button-selection-selected" : "button-selection"} key={val} onClick={(e) => setStressLevel(val)} disabled = {displayMode && "disabled"}>{val}</button>
                        ))}
                    </div>
                    <p className = "labels" >Energy</p>
                    <div className = "button-selector">
                        {numbers.map((val) => (
                            <button className ={val === energy ? "button-selection-selected" : "button-selection"} key={val} onClick={(e) => setEnergy(val)} disabled = {displayMode && "disabled"}>{val}</button>
                        ))}
                    </div>
                    <p className = "labels" >Appetite</p>
                    <div className = "button-selector">
                        {numbers.map((val) => (
                            <button className ={val === appetite ? "button-selection-selected" : "button-selection"} key={val} onClick={(e) => setAppetite(val)} disabled = {displayMode && "disabled"}>{val}</button>
                        ))}
                    </div>
                    <p className = "labels" >Hours Sleep</p>
                    <input
                        name="sleep"
                        type="number"
                        value={sleep}
                        readOnly = {displayMode && "readonly"}
                        onChange = {(e) => setHoursSleep(e.target.value)}
                    />
                    <p className = "labels" >Notes</p>
                    <input 
                        name = "note"
                        type="text"
                        value = {note}
                        readOnly = {displayMode && "readonly"}
                        onChange = {(e) => setNote(e.target.value)}
                    />
                    {!displayMode && <button className="submit-button" onClick={(e) => onSubmit(e)}>Submit</button>}
            </div>
        </div>
    );
    
    }
    
export default HealthTracker;