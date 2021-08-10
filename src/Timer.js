// we want to make use of the useState and useEffect hooks here
import {useState,useEffect} from 'react'
// our Timer component is going to destructure a taskName , an id, and a handleDelete function which we defined in the parent and changes the state above
function Timer({taskName,id,handleDelete}) {
    // start our timer at 0
    const [time,setTime] = useState(0)
    // state that tracks whether or not to run the Timer
    const [isRunning,setIsRunning] = useState(false)
    // we call this when we click the start or stop button, it just toggles the state to true or false
    const handleToggle = () => {
        setIsRunning(!isRunning)
    }
    // useEffect is used to create sideEffects in our applications, in this case we are going to use it as a timer 
    useEffect(() => {
        // setInterval returns an id which can be used to stop and clear the interval so we are going to want to capture this value
        let interval
        // if the interval is running then we want to increase the time every second 
        if(isRunning){
            // notice how we capture the interval here , we are going to need this for our cleanup function, otherwise react gets weird
            interval = setInterval(() => {
                // just a simple counter that is adding 1 every second, the setState function (in this case setTime) gives us access to the previous value so we can increment correctly , if we just did setTime(time + 1) there is a chance that it wouldn't be the correct number so this is the surefire way to make sure that we are using the correct time . Shoutout to @Ash 
                setTime(prevTime => prevTime + 1)
            },1000)
        }
        // useEffect can return a cleanup function and in this case we are going to clear the interval for the timer with the id we got above 
        return () => clearInterval(interval)
        // anytime isRunning is changed we want to check if we have to run our useEffect and interval which is why this is the dependency 
    },[isRunning])

    return (
        <div >
            <div>
            <h2>{taskName}</h2>
                <h3>{time}</h3>
                {/* renders a button that says either stop timer or start timer based on the current isRunning state */}
                {isRunning === true ?  <button onClick={handleToggle}>Stop Timer</button>
                : <button onClick={handleToggle}>Start Timer</button>}
                {/* when we click on the delete we run the handleDelete function from the parent component using the specific Timer id we have access to in this component and then it causes a rerender above */}
                <h4 onClick={() => handleDelete(id)}>Delete Me</h4>
                
            </div>
        </div>
    )
}

export default Timer
