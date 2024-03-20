import React, { useState } from "react";
const API_BASE = 'http://localhost:3001/to-do-app';

function TodoItem(props) {
    const { name, id, completed, dueDate, setItems } = props;
    const [isCompleted, setIsCompleted] = useState(completed);

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(API_BASE + "/delete/" + id, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete a task");
            }
            const data = await response.json();
            setItems(items => items.filter(item => item._id !== data._id));
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    }

    const handleCheckboxClick = () => {
        setIsCompleted(!isCompleted);
    }

    return (
        <div className={"todo" + (isCompleted ? " check-complete" : "")} key={id}>
            <div className="checkbox" onClick={handleCheckboxClick}></div>
            <div className={"text" + (isCompleted ? " completed" : "")}>{name}</div>
            <div className={"text" + (isCompleted ? " completed" : "")}>{new Date(dueDate).toISOString().split("T")[0]}</div>
            <div className="open-button">
                <button>
                    <a href={`edit/${id}`}>Open</a>
                </button>
            </div>
            <div className="delete-todo" onClick={() => deleteTodo(id)}><span>X</span></div>
        </div>
    )
}

export default TodoItem;