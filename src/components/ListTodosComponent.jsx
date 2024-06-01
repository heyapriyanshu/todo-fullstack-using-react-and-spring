import { useEffect, useState } from "react"
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "../api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"


export default function ListTodosComponent() {
   
    const [message,setMessage] = useState(null)
    const [todos,setTodos] = useState([])

    const authContext = useAuth()
    const navigate = useNavigate()
    const username = authContext.username

   
    // eslint-disable-next-line
    useEffect( () => refreshTodos(),[])

    function refreshTodos() {
        
        retrieveAllTodosForUsernameApi(username)
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
        navigate('/todo/-1')
    }
    function handleDeleteTodo(username,id){
        deleteTodoApi(username,id)
        .then(

            () => {
                setMessage(`Delete of todo with id = ${id} successful`);
                refreshTodos();
                setTimeout(() => {
                    setMessage(null); 
                }, 1500); 
            }
           
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
                            <th></th>
                            <th>Description</th>
                            <th>Done</th>
                            <th>Target Date</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                (todo,index) => (
                                    <tr key={todo.id}>
                                        <td>{1+index}</td>
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
