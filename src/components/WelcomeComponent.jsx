import { Link } from 'react-router-dom'
import { useAuth } from "./security/AuthContext";


export default function WelcomeComponent() {

    
	const authContext = useAuth();
	const username = authContext.firstName;


    return (
        <div className="Welcome">
            <h1>Welcome {username} 👋</h1>
            <div>
                Manage your todos - <Link className="btn btn-success"to="/todos">Go here</Link>
            </div>
            
            
        </div>
    )
}