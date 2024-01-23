import { useState } from "react"
import {Todo} from './Todo'
import {v4 as uuid} from 'uuid'


export function CreateTodo () {    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodo] = useState([])
    return <div>
            <input style={inputStyle} type="text" placeholder="Title" onChange={(e) => {
                setTitle(e.target.value)
            }}></input>
            <br></br>
            <input style={inputStyle} type="text" placeholder="Description"  onChange={(e) => {
                setDescription(e.target.value)
            }}></input>
            <br></br>
            <button style={inputStyle} onClick={() => {
                const NewTodo = {
                    id: uuid(),
                    title,
                    description                    
                }

                setTodo([...todos, NewTodo])
            }} >Add Todo</button>            
            {<Todo todos={todos}></Todo>}            
        </div>
}

const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    fontFamily: "Roboto",
    fontSize: "18px",
    marginBottom: "10px",
    cursor: "pointer"
}