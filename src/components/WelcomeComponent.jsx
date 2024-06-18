import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from "./security/AuthContext";
import { retrieveHelloWorldPathVariable } from '../api/HelloWorldApiService'


export default function WelcomeComponent() {

    
	const authContext = useAuth();
	const username = authContext.username;

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi(){
        console.log('called')
        

        // axios.get('http://localhost:8080/hello-world')
        //     .then( (response) => successfulResponse(response) )
        //     .catch ( (error) => errorResponse(error) )
        //     .finally ( () => console.log('cleanup') )

        // retrieveHelloWorldBean()
        //     .then( (response) => successfulResponse(response) )
        //     .catch ( (error) => errorResponse(error) )
        //     .finally ( () => console.log('cleanup') )

            retrieveHelloWorldPathVariable('Priyanshu')
            .then( (response) => successfulResponse(response) )
            .catch ( (error) => errorResponse(error) )
            .finally ( () => console.log('cleanup path variable') )    
    }

    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
        //setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }

    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            
            
        </div>
    )
}