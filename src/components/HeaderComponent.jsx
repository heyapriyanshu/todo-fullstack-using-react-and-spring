import { Link } from 'react-router-dom'
import { useAuth } from './security/AuthContext'




export default function HeaderComponent() {
    //const authContext = useContext(AuthContext)
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated
    // console.log(authContext.number);
  
    function handleLogout(){
        authContext.logout()
        
        
    }
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <p className="navbar-brand ms-2 fs-2 text-muted badge badge-primary text-wrap " style={{ width: "6rem" }} >Todo App</p>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/welcome/Priyanshu">Home</Link>}</li>
                                <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}</li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">{!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}</li>
                            <li className="nav-item fs-5">{!isAuthenticated && <Link className="nav-link" to="/register">Register</Link>}</li>
                            <li className="nav-item fs-5">{isAuthenticated && <Link className="nav-link" to="/logout" onClick={handleLogout}>Logout</Link>}</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

