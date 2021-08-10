import { useState } from "react";
// created a Timer component to render with data that we have in our parent component (App.js)
import Timer from "./Timer";
// uuid is a library that generates random strings that you can use as keys to keep track of items you map out (list out) in an array like we do below
import { v4 as uuidv4 } from 'uuid';

function App() {
  // this state is tracking an array of all the task timers we will have 
  const [timers,setTimers] = useState([])
  // setting our state to be an object with empty values so we can reset the field easily once we submit a task
  const initialTaskState = {
    taskName:'',
    id:''
  }
  // our task is an object with the values above initially and when we submit will add one of these task objects to the timers state
  const [task,setTask] = useState(initialTaskState)
  // when you work with forms you need a handle change so you can grab the value in the input field
  const handleChange = (event) => {
    // we extract our text from the event target and grab its value from our input field
    const text = event.target.value
    // we are updating our task with the value of the text as our taskName and giving it an id which is invoked by the uuid library function 
    setTask({
      taskName:text,
    })
  } 
  // how we handle a submission
  const handleSubmit = (event) => {
    // prevent the default from happening on submission which is usually a page refresh
    event.preventDefault();
    // we want to assign a unique identifier to our task so we can delete them later
    task.id = uuidv4()
    // we want to make sure that we have all of our timers and then add on the next one so we spread the previous and add on the latest one using the setTimers function that we initiated in our state above
    setTimers(prevTimers => [...prevTimers,task])
    // this line will reset the task back to be the initial state of an empty field and object
    setTask(initialTaskState)
  }
  // handle delete will be passed down to the Timer component where we can use the id we pass down to filter it out of the timers state when we click on the delete button, this is how we modify state in a parent component from a child component 
  const handleDelete = (id) => {
    // our filter function returns all of the timers that don't match the id in that specific timer
    let filtered = timers.filter((timer) => timer.id !== id)
    // spread the filtered list into our timers array triggering the rerender and removal of the timer we deleted
    setTimers([...filtered])
  } 

  // this handles whether we want the form showing or not
  const [inputShowing,setInputShowing] = useState(false)
  // this is just switching the input from true or false and we use it to manipulate a ternary operator below
  const handleShowInput = () => {
      // sets the input showing (a boolean value) to be the opposite of whatever it currently is 
      setInputShowing(!inputShowing)
  }


  return (
    <div>
      <h2>Timer Tracker</h2>
      {/* we render our Timer components here with the data in our timers state and pass down props so we can display specific timers */}
      {timers.map((task => 
        <Timer id={task.id} key={task.id} taskName={task.taskName} handleDelete={handleDelete}/>
      ))}
      {/* shows a plus or minus based on the state of the handleShowInput clicking this toggles that state and also hides or shows our input*/}
      <button onClick={handleShowInput}>{inputShowing === true ? '-' : '+'}</button>
      {/* another ternary, this is just hiding or showing our form  */}
      {
        inputShowing === true ? (
        // forms in react are kind of weird, you need to handle when they change and when you submit, they won't work without a handle change
        <form onSubmit={handleSubmit}>
        {/* our input value is changing with the object in our task state, our handleChange is telling react how to do that */}
        <input type="text" value={task.taskName} onChange={handleChange} />
        {/* just submits the form and triggers the onSubmit from the form */}
        <button type='submit'>Submit Task</button>
        </form>
        
        )
        :
        // we want to hide the input when the inputShowing state is false so we can just return null
        null
      }
    </div>
  );
}

export default App;
