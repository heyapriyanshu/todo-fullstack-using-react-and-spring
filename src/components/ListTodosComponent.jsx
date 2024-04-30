import { useEffect, useState } from "react"
import { deleteTodo, retrieveAllTodosForUsername } from "../api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"


export default function ListTodosComponent() {
    // const today = new Date()

    // const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())
    const [message,setMessage] = useState(null)
    const [todos,setTodos] = useState([])

    const authContext = useAuth()
    const navigate = useNavigate()
    const username = authContext.username

    const [serialNo,setSerialNo] = useState(1)
    // const todos = [
        // { id: 1, description: 'Learn AWS', done: false, targetDate: targetDate },
        // { id: 2, description: 'Learn Full Stack Dev', done: false, targetDate: targetDate },
        // { id: 3, description: 'Learn DevOps', done: false, targetDate: targetDate },
    // ]

    useEffect( () => refreshTodos(), [])

    function refreshTodos() {
        
        retrieveAllTodosForUsername(username)
        .then(response => {
            setTodos(response.data)
        }
            
        )
        .catch(error => console.log(error))
    
    }
    function handleUpdateTodo(id){
        console.log("update"+id)
        navigate(`/todo/${id}`)
    }
    function handleAddTodo(){
        console.log("add")
        navigate(`/todo/-1`)
    }
    function handleDeleteTodo(username,id){
        deleteTodo(username,id)
        .then(

            () => {
                setMessage(`Delete of todo with id = ${id} successful`);
                refreshTodos();
                setTimeout(() => {
                    setMessage(null); // Clear the message after 3 seconds
                }, 1500); // 3000 milliseconds = 3 seconds
            }
            //1: Display message
            //2: Update Todos list
        )
        .catch(error => console.log(error))
    }
    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>
            <div>
            {message && <div className="alert alert-warning">{message}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sl. No.</th>
                            <th>description</th>
                            <th>isDone</th>
                            <th>targetDate</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                (todo,index) => (
                                    <tr key={todo.id}>
                                        <td>{serialNo+index}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-outline-info btn-sm" 
                                                onClick={()=>handleUpdateTodo(todo.id)}> Update </button>
                                                
                                        <button className="btn btn-outline-danger btn-sm" style={{marginLeft : 32}}
                                                onClick={()=>handleDeleteTodo(todo.username,todo.id)}> Delete </button></td>
                                                
                                    </tr>
                                    
                                )
                            )
                        }

                    </tbody>

                </table>
                <button className="btn btn-outline-success btn-lg m-5" 
                                                onClick={handleAddTodo}> Add Todo </button>
            </div>
        </div>
    )
}
