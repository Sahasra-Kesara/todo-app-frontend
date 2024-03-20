import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:3001/to-do-app";

function EditTodo() {
  const [todo, setTodo] = useState({ text: "" });

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        // const response = await fetch(API_BASE + "/delete/" + id, {
        const response = await axios.get(`${API_BASE}/${id}`);
        console.log("response", response.data);

        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async () => {
    try {
      let res = await axios.post(`${API_BASE}/edit/${id}`, todo);
      console.log("res of Edit", res);
      alert("successfully edited")

      // Redirect or show success message
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };
  return (
    <div>
      <div className="edit-todo-container">
        <div className="edit-todo-card">
          <h1 className="edit-todo-title">Edit Todo</h1>
          <div style={{ marginBottom: "20px" }}>
            <input
              className="edit-todo-input"
              type="text"
              name="name"
              value={todo.name}
              onChange={handleChange}
              placeholder="Todo text"
            />
            <input
              className="edit-todo-input"
              type="date"
              name="dueDate"
              value={
                todo.dueDate
                  ? new Date(todo.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              placeholder="Due date"
            />
            {/* {todo.dueDate} */}
            {/* todo.dueDate looks like this 2024-03-20T00:00:00.000Z */}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="edit-todo-button" onClick={handleEdit}>
              Edit
            </button>
            <Link to='/' className="back-to-home-button">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
