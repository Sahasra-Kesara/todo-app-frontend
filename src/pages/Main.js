import { useEffect, useState } from "react";
import TodoItem from "../TodoItem";
const API_BASE= 'http://localhost:3001/to-do-app';


function MAIN() {

  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const handleInputTextChange = (e) => {
     setInput(e.target.value)
  }

 const GetTodos = () => {
  fetch(API_BASE)
  .then(res => res.json())
  .then(data => setItems(data))
  .catch(err => console.log(err))
 }

 const addItem = async () => {
  const dueDateInput = document.getElementById('dueDateInput').value;
  const nameInput = document.getElementById('nameInput').value;

  if (!nameInput) {
    alert("Please enter a task");
    return;
  }

  if (!dueDateInput) {
    alert("Please enter a date");
    return;
  }

  try {
    const data = await fetch(API_BASE + "/new", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: nameInput,
        completed: false,
        dueDate: dueDateInput // Include the due date in the request body
      })
    }).then(res => res.json());
    
    await GetTodos();
    setInput('');
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

  return (
    
    <div className="container">
      <div className="heading">
        <h1>TASK MANAGER</h1>
      </div>

      <div className="form">
        <input type='text' id="nameInput" placeholder="Enter Task" value={input} onChange={handleInputTextChange}></input>
        <input id='dueDateInput' type='date' ></input>
        <button onClick={()=>addItem()}>
          <span>ADD</span>
        </button>
      </div>

      <div className="todolist">  
      {items.map((item)=> {
        const {_id, name, completed} = item
        return  <TodoItem name={name} id={_id} completed={completed} setItems={setItems} dueDate={item.dueDate}/>   
      })}
     
      </div>
    </div>
  
   
  );
}

export default MAIN;
