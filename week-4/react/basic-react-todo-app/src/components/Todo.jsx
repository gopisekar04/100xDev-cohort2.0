import { useMemo } from "react"

export const  Todo = ({todos}) => {    
    const memoTodo = useMemo(() => {
        return (
        <ul style={{
            listStyle: "none"
            }}>
                {todos.map((eachTodo) => (
                    <li style={todoStyle} key={eachTodo.id}>
                        <div style={{
                        padding: "0", margin: "0"
                    }}>
                        <h1>{eachTodo.title}</h1>
                        <p>{eachTodo.description}</p>
                        </div>
                        <div style={btnStyle}>
                        <button>Mark as done</button>
                        </div>
                    </li>
                ))
                }
            </ul>
            )
        
    }, [todos])
    return memoTodo

}

const todoStyle = {
        display: "flex",
        flexDirection: "row"    
}

const btnStyle = {
    alignSelf: "center",
    margin: "0 0 0 20px"
}